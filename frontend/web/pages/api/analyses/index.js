import { getSession } from 'next-auth/react';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    try {
      const analyses = await prisma.analysis.findMany({
        where: {
          userId: session.user.id,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      res.status(200).json(analyses);
    } catch (error) {
      console.error('Error fetching analyses:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (req.method === 'POST') {
    try {
      const { imageUrl, result, confidence, diagnosis, notes } = req.body;

      const analysis = await prisma.analysis.create({
        data: {
          userId: session.user.id,
          imageUrl,
          result,
          confidence,
          diagnosis,
          notes,
        },
      });

      res.status(201).json(analysis);
    } catch (error) {
      console.error('Error creating analysis:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
} 