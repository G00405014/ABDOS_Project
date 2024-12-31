const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const reportRoutes = require('./routes/reportRoutes');
const axios = require('axios');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Route to proxy requests to Flask model API
app.post('/api/analyze', async (req, res) => {
  try {
    const modelResponse = await axios.post('http://localhost:5000/predict', req.body);
    res.json(modelResponse.data);
  } catch (error) {
    console.error('Model API error:', error);
    res.status(500).json({ message: 'Model analysis failed' });
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
  console.log(`Make sure Flask Model API is running on port 5000`);
}); 