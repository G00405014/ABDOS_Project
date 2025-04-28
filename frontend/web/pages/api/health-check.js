export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const backendUrl = process.env.BACKEND_URL;
    if (!backendUrl) {
      throw new Error('BACKEND_URL is not defined');
    }

    console.log(`Checking health of backend at ${backendUrl}`);
    
    const response = await fetch(`${backendUrl}/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 5000 // 5 second timeout
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      return res.status(response.status).json({ 
        status: 'error',
        message: 'Backend health check failed',
        statusCode: response.status,
        error: errorMessage
      });
    }

    const data = await response.json();
    res.status(200).json({
      status: 'success',
      message: 'Backend is running',
      details: data
    });
  } catch (error) {
    console.error('Backend health check failed:', error);
    res.status(500).json({ 
      status: 'error',
      message: 'Failed to connect to backend server',
      error: error.message 
    });
  }
} 