import { getSession } from 'next-auth/react';
import { PrismaClient } from '@prisma/client';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const form = new formidable.IncomingForm({
      uploadDir: path.join(process.cwd(), 'public/uploads'),
      keepExtensions: true,
      maxFileSize: 10 * 1024 * 1024, // 10MB
    });

    // Create uploads directory if it doesn't exist
    if (!fs.existsSync(form.uploadDir)) {
      fs.mkdirSync(form.uploadDir, { recursive: true });
    }

    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    });

    const file = files.image;
    if (!file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedTypes.includes(file.mimetype)) {
      fs.unlinkSync(file.filepath);
      return res.status(400).json({ error: 'Invalid file type. Only JPEG and PNG are allowed.' });
    }

    // Generate public URL for the uploaded file
    const fileName = file.newFilename;
    const publicUrl = `/uploads/${fileName}`;

    // TODO: Call AI model for analysis
    // For now, we'll use mock data
    const mockAnalysis = {
      confidence: 0.92,
      diagnosis: 'Melanoma',
      result: {
        type: 'melanoma',
        characteristics: [
          'Asymmetrical shape',
          'Irregular borders',
          'Color variations',
          'Large diameter'
        ],
        riskLevel: 'High',
      },
    };

    // Save analysis to database
    const analysis = await prisma.analysis.create({
      data: {
        userId: session.user.id,
        imageUrl: publicUrl,
        result: mockAnalysis.result,
        confidence: mockAnalysis.confidence,
        diagnosis: mockAnalysis.diagnosis,
      },
    });

    res.status(200).json({
      success: true,
      analysis,
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Error processing upload' });
  }
} 