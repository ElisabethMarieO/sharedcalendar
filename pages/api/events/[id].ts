import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid event ID' });
  }

  try {
    switch (req.method) {
      case 'GET':
        const event = await prisma.event.findUnique({
          where: { id },
        });
        
        if (!event) {
          return res.status(404).json({ error: 'Event not found' });
        }
        
        res.status(200).json(event);
        break;

      case 'PUT':
        const { title, description, startDate, endDate, allDay, color } = req.body;
        
        if (!title || !startDate || !endDate) {
          return res.status(400).json({ error: 'Title, startDate, and endDate are required' });
        }

        const updatedEvent = await prisma.event.update({
          where: { id },
          data: {
            title,
            description,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            allDay: allDay || false,
            color: color || '#3B82F6',
          },
        });
        
        res.status(200).json(updatedEvent);
        break;

      case 'DELETE':
        await prisma.event.delete({
          where: { id },
        });
        
        res.status(204).end();
        break;

      default:
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        res.status(405).json({ error: `Method ${req.method} not allowed` });
    }
  } catch (error: any) {
    console.error('API Error:', error);
    
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    res.status(500).json({ error: 'Internal server error' });
  }
}