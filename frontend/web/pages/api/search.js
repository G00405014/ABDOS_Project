import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { query } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a helpful AI health assistant specializing in skin conditions and cancer detection. 
          You have access to the ABDOS (AI-Based Detection of Skin Cancer) system.
          - Keep responses concise and medical-focused
          - Be empathetic and professional
          - Always remind users this is preliminary advice
          - Suggest consulting healthcare professionals for medical concerns
          - You can analyze skin conditions from uploaded photos
          - You have knowledge about: melanoma, basal cell carcinoma, melanocytic nevi, benign keratosis, actinic keratoses, vascular lesions, dermatofibroma
          - Provide emergency contact information when necessary`
        },
        {
          role: "user",
          content: query
        }
      ],
      temperature: 0.7,
      max_tokens: 200
    });

    res.status(200).json({ 
      answer: completion.choices[0].message.content,
      suggestions: [
        "Upload a photo for analysis",
        "Learn about prevention",
        "Find a specialist"
      ]
    });

  } catch (error) {
    console.error('OpenAI API error:', error);
    res.status(500).json({ 
      message: 'Sorry, I encountered an error. Please try again in a moment.' 
    });
  }
} 