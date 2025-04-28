export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const backendUrl = process.env.BACKEND_URL;
    if (!backendUrl) {
      throw new Error('BACKEND_URL is not defined');
    }

    console.log('Auth header received:', req.headers.authorization);
    console.log('Attempting to connect to Flask backend at:', backendUrl);

    // Extract token from the authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.error('No valid authorization header found');
      return res.status(401).json({ error: 'Authorization token is required' });
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
      
      const response = await fetch(`${backendUrl}/api/generate-report`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authHeader  // Pass the entire header as is
        },
        body: JSON.stringify(req.body),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      // Debug response information
      console.log('Flask response status:', response.status);
      console.log('Flask response headers:', JSON.stringify(Object.fromEntries([...response.headers])));
      
      // Check content type before trying to parse as JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        // If not JSON, likely an HTML error page - get the text
        const text = await response.text();
        console.error('Server returned non-JSON response:', text.substring(0, 200) + '...');
        
        return res.status(500).json({ 
          error: 'Server returned HTML instead of JSON. The backend server may not be configured correctly.',
          details: `Content-Type: ${contentType}, Status: ${response.status}`,
          statusText: response.statusText
        });
      }

      // Now we can safely parse as JSON
      const data = await response.json();

      if (!response.ok) {
        return res.status(response.status).json(data);
      }

      res.status(200).json(data);
    } catch (fetchError) {
      console.error('Fetch to Flask backend failed:', fetchError);
      
      // Try to make a simple health check to verify Flask is running
      try {
        const healthResponse = await fetch(`${backendUrl}/health`, { timeout: 3000 });
        const isFlaskRunning = healthResponse.ok;
        
        if (isFlaskRunning) {
          return res.status(500).json({
            error: 'Failed to connect to specific endpoint, but Flask server is running',
            details: fetchError.message
          });
        } else {
          return res.status(503).json({
            error: 'Flask server appears to be down',
            details: fetchError.message
          });
        }
      } catch (healthError) {
        return res.status(503).json({
          error: 'Failed to connect to Flask backend server',
          details: fetchError.message,
          isServerDown: true
        });
      }
    }
  } catch (error) {
    console.error('Report generation failed:', error);
    res.status(500).json({ 
      message: 'Failed to generate report',
      error: error.message 
    });
  }
} 