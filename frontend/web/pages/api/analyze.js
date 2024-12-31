import formidable from 'formidable';
import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  console.log('Received request to analyze');

  try {
    const form = formidable({});
    const [fields, files] = await form.parse(req);

    if (!files.image || !files.image[0]) {
      console.error('No image file found in request');
      return res.status(400).json({ message: 'No image provided' });
    }

    const imageFile = files.image[0];
    console.log('Processing image:', imageFile.originalFilename);

    // Create form data
    const formData = new FormData();
    formData.append('image', fs.createReadStream(imageFile.filepath));

    console.log('Sending request to Flask API...');

    // Send to Flask API
    const flaskResponse = await axios.post('http://localhost:5000/predict', formData, {
      headers: {
        ...formData.getHeaders(),
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    });

    console.log('Received response from Flask:', flaskResponse.data);

    const analysisResult = {
      condition: flaskResponse.data.predicted_class,
      confidence: Math.round(flaskResponse.data.confidence * 100),
      riskLevel: flaskResponse.data.confidence > 0.7 ? "High" : flaskResponse.data.confidence > 0.4 ? "Medium" : "Low",
      recommendations: "Please consult with a healthcare professional for a thorough evaluation."
    };

    // Clean up the temporary file
    fs.unlink(imageFile.filepath, (err) => {
      if (err) console.error('Error deleting temp file:', err);
    });

    console.log('Sending analysis result to frontend:', analysisResult);
    res.status(200).json(analysisResult);

  } catch (error) {
    console.error('Analysis failed:', error);
    res.status(500).json({
      condition: 'Error',
      confidence: null,
      riskLevel: 'Unknown',
      recommendations: 'An error occurred during analysis. Please try again.'
    });
  }
} 