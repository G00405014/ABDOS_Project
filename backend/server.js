// Add a check variable at the top level
const CODE_VERSION = 'BASE64_JSON_SENDER_V1';
console.log(`[SERVER START] Loading code version: ${CODE_VERSION}`);

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const reportRoutes = require('./routes/reportRoutes');
const authRoutes = require('./routes/auth');
const analysisRoutes = require('./routes/analysisRoutes');
const axios = require('axios');
const FormData = require('form-data');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: '50mb' })); // Increased limit for base64 images
app.use(cookieParser());

// Configure multer for temporary file storage
const upload = multer({ dest: 'uploads/' });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/report', reportRoutes);
app.use('/api/analysis', analysisRoutes);

// Route to proxy requests to Flask model API
app.post('/api/analyze', upload.single('image'), async (req, res) => {
  console.log('API route: Received image analysis request (sending multipart/form-data)');
  if (!req.file) {
    console.log('API route: No file uploaded');
    return res.status(400).json({ message: 'No image file uploaded' });
  }

  const imagePath = req.file.path;
  const originalFilename = req.file.originalname;
  console.log(`API route: Processing image: ${originalFilename}, size: ${req.file.size} bytes, temp path: ${imagePath}`);

  // --- Prepare FormData ---
  const formData = new FormData();
  formData.append('image', fs.createReadStream(imagePath), { 
      filename: originalFilename, 
      contentType: req.file.mimetype 
  });
  // --- End FormData ---

  try {
    console.log(`API route: Sending multipart request to backend API at http://127.0.0.1:5000/predict`);
    // Use axios to send FormData
    const modelResponse = await axios.post(
      'http://127.0.0.1:5000/predict',
      formData, // Send the FormData instance
      {
        headers: {
           ...formData.getHeaders() // Let form-data generate headers
        }
      }
    );
    
    console.log('API route: Backend response received');
    res.json(modelResponse.data);

  } catch (error) {
    console.error('API route: Backend API error (multipart):', error.response ? error.response.data : error.message);
    res.status(error.response?.status || 500).json({
        message: 'Model analysis failed (request error)',
        error: error.response?.data || error.message
    });
  } finally {
    // Clean up the temporary file uploaded by multer
    fs.unlink(imagePath, (unlinkErr) => {
      if (unlinkErr) {
        console.error(`API route: Error cleaning up temporary file ${imagePath}:`, unlinkErr);
      } else {
        console.log(`API route: Temporary file ${imagePath} cleaned up`);
      }
    });
  }
});

// Basic error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3001;

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)){
    fs.mkdirSync(uploadsDir);
    console.log(`Created temporary uploads directory: ${uploadsDir}`);
}

app.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`);
  console.log(`Make sure Flask Model API is running on port 5000`);
}); 