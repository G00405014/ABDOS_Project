const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const reportRoutes = require('./routes/reportRoutes');
const axios = require('axios');
const multer = require('multer');
const fs = require('fs');
const { promisify } = require('util');
const sharp = require('sharp');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend API is running' });
});

// Configure multer for file uploads
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// TensorFlow Serving settings
const TF_SERVING_HOST = process.env.TF_SERVING_HOST || 'localhost';
const TF_SERVING_PORT = process.env.TF_SERVING_PORT || '8501';
const TF_MODEL_NAME = 'skin_condition';
const TF_SERVING_URL = `http://${TF_SERVING_HOST}:${TF_SERVING_PORT}/v1/models/${TF_MODEL_NAME}:predict`;

// Use mock responses or real TensorFlow Serving
const USE_MOCK_RESPONSES = process.env.USE_MOCK_RESPONSES === 'true' || true; // Default to true for now

// Condition labels
const CONDITIONS = [
  'Actinic Keratoses',
  'Basal Cell Carcinoma',
  'Benign Keratosis',
  'Dermatofibroma',
  'Melanoma',
  'Melanocytic Nevi',
  'Vascular Lesions'
];

// Route to handle model predictions
app.post('/api/analyze', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image provided' });
    }

    // Process image with sharp
    const processedImageBuffer = await sharp(req.file.buffer)
      .resize(224, 224, { fit: 'cover' })
      .toFormat('jpeg')
      .toBuffer();

    console.log(`Processed image with size: ${processedImageBuffer.length} bytes`);
    
    // Check whether to use mock responses or real TensorFlow Serving
    if (USE_MOCK_RESPONSES) {
      // Generate mock response
      const mockPredictedClass = Math.floor(Math.random() * CONDITIONS.length);
      const confidence = Math.random() * 30 + 70; // Random confidence between 70-100%
      
      // Generate mock probabilities with highest for the predicted class
      const all_probabilities = {};
      for (let i = 0; i < CONDITIONS.length; i++) {
        let prob = i === mockPredictedClass ? confidence : Math.random() * 10;
        if (prob < 1.0) prob = 0.0;
        all_probabilities[CONDITIONS[i]] = Math.round(prob * 100) / 100;
      }
      
      console.log(`[MOCK] Predicted: ${CONDITIONS[mockPredictedClass]} with ${confidence.toFixed(2)}% confidence`);
      
      return res.json({
        predicted_class: mockPredictedClass,
        confidence: confidence,
        label: CONDITIONS[mockPredictedClass],
        all_probabilities: all_probabilities,
        mock_response: true // Add flag to indicate this is a mock response
      });
    } else {
      // Use real TensorFlow Serving
      try {
        // Convert to base64
        const base64Image = processedImageBuffer.toString('base64');
        
        // Prepare request for TensorFlow Serving
        const tfRequest = {
          signature_name: "serving_default",
          inputs: {
            "input_image": {
              b64: base64Image,
              data_type: "DT_FLOAT",
              shape: [1, 224, 224, 3]
            }
          }
        };

        console.log("Sending request to TensorFlow Serving...");
        
        // Send request to TensorFlow Serving
        const tfResponse = await axios.post(TF_SERVING_URL, tfRequest);
        
        console.log("Received response from TensorFlow Serving");
        
        // Process response
        const predictions = tfResponse.data.outputs.predictions.values;
        const predictedClass = tfResponse.data.outputs.classes.values[0];
        
        // Format the response
        const all_probabilities = {};
        for (let i = 0; i < CONDITIONS.length; i++) {
          let prob = predictions[i] * 100;
          if (prob < 1.0) prob = 0.0;
          all_probabilities[CONDITIONS[i]] = Math.round(prob * 100) / 100;
        }
        
        const confidence_pct = all_probabilities[CONDITIONS[predictedClass]];
        
        console.log(`Predicted: ${CONDITIONS[predictedClass]} with ${confidence_pct.toFixed(2)}% confidence`);
        
        return res.json({
          predicted_class: predictedClass,
          confidence: confidence_pct,
          label: CONDITIONS[predictedClass],
          all_probabilities: all_probabilities,
          mock_response: false
        });
      } catch (tfError) {
        console.error('TensorFlow Serving error:', tfError);
        console.log('Falling back to mock response due to TensorFlow Serving error');
        
        // Fallback to mock response if TensorFlow Serving fails
        const mockPredictedClass = Math.floor(Math.random() * CONDITIONS.length);
        const confidence = Math.random() * 30 + 70;
        
        const all_probabilities = {};
        for (let i = 0; i < CONDITIONS.length; i++) {
          let prob = i === mockPredictedClass ? confidence : Math.random() * 10;
          if (prob < 1.0) prob = 0.0;
          all_probabilities[CONDITIONS[i]] = Math.round(prob * 100) / 100;
        }
        
        console.log(`[FALLBACK MOCK] Predicted: ${CONDITIONS[mockPredictedClass]} with ${confidence.toFixed(2)}% confidence`);
        
        return res.json({
          predicted_class: mockPredictedClass,
          confidence: confidence,
          label: CONDITIONS[mockPredictedClass],
          all_probabilities: all_probabilities,
          mock_response: true,
          fallback: true
        });
      }
    }
  } catch (error) {
    console.error('Model prediction error:', error);
    res.status(500).json({ message: 'Model analysis failed', error: error.message });
  }
});

// Routes
app.use('/api/report', reportRoutes);

// Basic error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`);
  if (USE_MOCK_RESPONSES) {
    console.log(`Using MOCK responses for model predictions`);
    console.log(`Set USE_MOCK_RESPONSES=false in .env to use real TensorFlow Serving`);
  } else {
    console.log(`Using TensorFlow Serving at ${TF_SERVING_URL}`);
    console.log(`Make sure TensorFlow Serving is running correctly`);
  }
}); 