// This is a test endpoint to verify that the analyze API route is working correctly
// It doesn't require an actual image upload, it just tests the connection to the backend

import axios from 'axios';

export default async function handler(req, res) {
  try {
    console.log('Test API route: Testing connection to backend API');
    
    // Test the health endpoint of the backend API
    const response = await axios.get(`${backendUrl}/api/health`, {
      timeout: 5000,
    });
    
    console.log('Test API route: Received response from backend API:', response.status);
    console.log('Test API route: Response data:', JSON.stringify(response.data));
    
    return res.status(200).json({
      success: true,
      backendStatus: response.data,
      message: 'Successfully connected to the backend API'
    });
  } catch (error) {
    console.error('Test API route: Error connecting to backend API:', error);
    
    // Handle different types of errors
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Test API route: Backend API error:', error.response.status, error.response.data);
      return res.status(error.response.status).json({ 
        success: false,
        error: 'Backend API error',
        details: error.response.data
      });
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Test API route: Backend service unavailable - no response received');
      return res.status(503).json({ 
        success: false,
        error: 'Backend service unavailable', 
        details: 'Could not connect to the backend API. Please make sure the backend server is running.' 
      });
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Test API route: Internal server error:', error.message);
      return res.status(500).json({ 
        success: false,
        error: 'Internal server error', 
        details: error.message 
      });
    }
  }
} 