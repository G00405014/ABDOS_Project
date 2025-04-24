const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const reportRoutes = require('./routes/reportRoutes');
const authRoutes = require('./routes/auth');
const fetch = require('node-fetch');

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
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/report', reportRoutes);

// Route to proxy requests to Flask model API
app.post('/api/analyze', async (req, res) => {
  try {
    const modelResponse = await fetch('http://localhost:5000/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body)
    });
    const data = await modelResponse.json();
    res.json(data);
  } catch (error) {
    console.error('Model API error:', error);
    res.status(500).json({ message: 'Model analysis failed' });
  }
});

// Basic error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`);
  console.log(`Make sure Flask Model API is running on port 5000`);
}); 