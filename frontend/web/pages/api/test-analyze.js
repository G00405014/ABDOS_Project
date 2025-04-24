// This is a test endpoint to verify that the analyze API route is working correctly
// It doesn't require an actual image upload, it just tests the connection to the backend

export default async function handler(req, res) {
  try {
    console.log('Test API route: Testing connection to backend API');
    
    // Test the health endpoint of the backend API
    const response = await fetch('http://localhost:5000/health', {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Test API route: Received response from backend API:', response.status);
    console.log('Test API route: Response data:', JSON.stringify(data));
    
    return res.status(200).json({
      success: true,
      backendStatus: data,
      message: 'Successfully connected to the backend API'
    });
  } catch (error) {
    console.error('Test API route: Error connecting to backend API:', error);
    
    // Handle different types of errors
    if (error.name === 'FetchError') {
      console.error('Test API route: Backend service unavailable:', error.message);
      return res.status(503).json({ 
        success: false,
        error: 'Backend service unavailable', 
        details: 'Could not connect to the backend API. Please make sure the backend server is running.' 
      });
    } else if (error.message.includes('HTTP error!')) {
      console.error('Test API route: Backend API error:', error.message);
      return res.status(500).json({ 
        success: false,
        error: 'Backend API error',
        details: error.message
      });
    } else {
      console.error('Test API route: Internal server error:', error.message);
      return res.status(500).json({ 
        success: false,
        error: 'Internal server error', 
        details: error.message 
      });
    }
  }
} 