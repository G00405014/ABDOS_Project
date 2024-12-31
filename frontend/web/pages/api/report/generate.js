export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const backendUrl = process.env.BACKEND_URL;
    if (!backendUrl) {
      throw new Error('BACKEND_URL is not defined');
    }

    const response = await fetch(`${backendUrl}/api/report/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to generate report');
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('Report generation failed:', error);
    res.status(500).json({ 
      message: 'Failed to generate report',
      error: error.message 
    });
  }
} 