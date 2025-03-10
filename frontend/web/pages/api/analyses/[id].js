import { getSession } from 'next-auth/react';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const analysis = await prisma.analysis.findUnique({
        where: {
          id,
        },
      });

      if (!analysis) {
        return res.status(404).json({ error: 'Analysis not found' });
      }

      // Check if the analysis belongs to the current user
      if (analysis.userId !== session.user.id) {
        return res.status(403).json({ error: 'Forbidden' });
      }

      res.status(200).json(analysis);
    } catch (error) {
      console.error('Error fetching analysis:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { notes } = req.body;

      const analysis = await prisma.analysis.findUnique({
        where: {
          id,
        },
      });

      if (!analysis) {
        return res.status(404).json({ error: 'Analysis not found' });
      }

      // Check if the analysis belongs to the current user
      if (analysis.userId !== session.user.id) {
        return res.status(403).json({ error: 'Forbidden' });
      }

      const updatedAnalysis = await prisma.analysis.update({
        where: {
          id,
        },
        data: {
          notes,
        },
      });

      res.status(200).json(updatedAnalysis);
    } catch (error) {
      console.error('Error updating analysis:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const analysis = await prisma.analysis.findUnique({
        where: {
          id,
        },
      });

      if (!analysis) {
        return res.status(404).json({ error: 'Analysis not found' });
      }

      // Check if the analysis belongs to the current user
      if (analysis.userId !== session.user.id) {
        return res.status(403).json({ error: 'Forbidden' });
      }

      await prisma.analysis.delete({
        where: {
          id,
        },
      });

      res.status(204).end();
    } catch (error) {
      console.error('Error deleting analysis:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
} 