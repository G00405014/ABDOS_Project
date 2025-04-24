import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import FormData from 'form-data';

// Disable the default body parser to handle form data
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('API route: Received image analysis request');
    
    // Parse the incoming form data - updated for formidable v4
    const form = formidable({
      keepExtensions: true,
    });
    
    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve([fields, files]);
      });
    });

    // Check if an image was uploaded
    if (!files.image) {
      console.log('API route: No image provided in the request');
      return res.status(400).json({ error: 'No image provided' });
    }

    const imageFile = files.image[0]; // Access the first file in the array
    console.log(`API route: Processing image: ${imageFile.originalFilename}, size: ${imageFile.size} bytes`);
    
    // Create form data for the API request
    const formData = new FormData();
    const fileStream = fs.createReadStream(imageFile.filepath);
    formData.append('image', fileStream);

    console.log('API route: Sending request to backend API at http://localhost:5000/predict');
    
    // Send the image to the Flask backend API
    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          ...formData.getHeaders(),
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('API route: Received response from backend API:', response.status);
      console.log('API route: Response data:', JSON.stringify(responseData));
      
      // Check if the response contains an error
      if (responseData.error) {
        console.error('API route: Backend returned an error:', responseData.error);
        return res.status(500).json({ 
          error: responseData.error,
          details: responseData.details || 'No additional details provided'
        });
      }
      
      // Map the model's numeric class to human-readable labels and descriptions
      const classLabels = {
        0: 'Actinic Keratoses',
        1: 'Basal Cell Carcinoma',
        2: 'Benign Keratosis',
        3: 'Dermatofibroma',
        4: 'Melanoma',
        5: 'Melanocytic Nevi',
        6: 'Vascular Lesions'
      };
      
      const classDescriptions = {
        0: 'Rough, scaly patches caused by years of sun exposure. Precancerous and may develop into squamous cell carcinoma if untreated.',
        1: 'The most common type of skin cancer. Appears as a pearly or waxy bump, or a flat, flesh-colored or brown scar-like lesion.',
        2: 'A non-cancerous growth that develops from keratinocytes. Usually appears as a waxy, scaly, slightly raised growth.',
        3: 'A common, benign skin growth that often appears as a small, firm bump. Usually pink to light brown in color.',
        4: 'The most serious form of skin cancer. May appear as a new spot or an existing spot that changes in size, shape, or color.',
        5: 'Common, usually benign moles. Can be flat or raised, and range from pale to dark brown or black.',
        6: 'Benign growths made up of blood vessels. Includes cherry angiomas, hemangiomas, and other vascular anomalies.'
      };
      
      const riskLevels = {
        0: 'Moderate',
        1: 'High',
        2: 'Low',
        3: 'Low',
        4: 'Very High',
        5: 'Low',
        6: 'Low'
      };
      
      const recommendedActions = {
        0: 'Consult a dermatologist within 1-2 months for evaluation and possible treatment.',
        1: 'Seek medical attention within 2-4 weeks. Early treatment has excellent outcomes.',
        2: 'Regular monitoring recommended. Consult a dermatologist during your next regular check-up.',
        3: 'No immediate action required. Monitor for changes in appearance.',
        4: 'Urgent medical attention required. Schedule an appointment with a dermatologist within 1-2 weeks.',
        5: 'Regular self-examination recommended. Consult a dermatologist if you notice changes.',
        6: 'No immediate action required. Monitor for changes in size or color.'
      };

      // Get the predicted class and confidence from the model response
      const { predicted_class, confidence } = responseData;
      console.log(`API route: Prediction result - Class: ${predicted_class}, Confidence: ${confidence}`);
      
      // Prepare the enhanced response
      const result = {
        predicted_class: predicted_class,
        confidence: confidence,
        label: classLabels[predicted_class] || 'Unknown',
        description: classDescriptions[predicted_class] || 'No description available',
        riskLevel: riskLevels[predicted_class] || 'Unknown',
        recommendedAction: recommendedActions[predicted_class] || 'Consult a healthcare professional',
        timestamp: new Date().toISOString()
      };

      // Clean up the temporary file
      fs.unlinkSync(imageFile.filepath);
      console.log('API route: Temporary file cleaned up');

      // Return the enhanced result
      console.log('API route: Sending analysis result to client');
      return res.status(200).json(result);
    } catch (error) {
      // Clean up the temporary file
      if (imageFile && imageFile.filepath) {
        try {
          fs.unlinkSync(imageFile.filepath);
          console.log('API route: Temporary file cleaned up after error');
        } catch (cleanupError) {
          console.error('API route: Error cleaning up temporary file:', cleanupError);
        }
      }
      
      // Handle different types of errors
      if (error.name === 'FetchError') {
        console.error('API route: Backend service unavailable:', error.message);
        return res.status(503).json({ 
          error: 'Backend service unavailable', 
          details: 'Could not connect to the analysis service. Please make sure the backend server is running.' 
        });
      } else if (error.message.includes('HTTP error!')) {
        console.error('API route: Backend API error:', error.message);
        return res.status(500).json({ 
          error: 'Backend API error',
          details: error.message
        });
      } else {
        console.error('API route: Internal server error:', error.message);
        return res.status(500).json({ 
          error: 'Internal server error', 
          details: error.message 
        });
      }
    }
  } catch (error) {
    console.error('API route: Error processing image:', error);
    return res.status(500).json({ 
      error: 'Error processing image', 
      details: error.message 
    });
  }
} 