import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Load the MobileNet model
    const model = await mobilenet.load();
    
    // Convert image to tensor
    const imageElement = document.createElement('img');
    imageElement.src = req.body.imageUrl;
    
    // Classify the image
    const predictions = await model.classify(imageElement);

    // Format the response
    const analysis = `Analysis Results:
    - Primary observation: ${predictions[0].className} (${Math.round(predictions[0].probability * 100)}% confidence)
    - Secondary observation: ${predictions[1].className} (${Math.round(predictions[1].probability * 100)}% confidence)
    
    Note: This is a preliminary analysis. Please consult a healthcare professional for proper diagnosis.`;

    return res.status(200).json({ analysis });
  } catch (error) {
    console.error('Analysis error:', error);
    return res.status(500).json({ 
      error: 'Error analyzing image',
      details: error.message 
    });
  }
} 