import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'GET':
        const events = await prisma.event.findMany({
          orderBy: {
            startDate: 'asc',
          },
        });
        res.status(200).json(events);
        break;

      case 'POST':
        const { title, description, startDate, endDate, allDay, color } = req.body;
        
        if (!title || !startDate || !endDate) {
          return res.status(400).json({ error: 'Title, startDate, and endDate are required' });
        }

        const newEvent = await prisma.event.create({
          data: {
            title,
            description,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            allDay: allDay || false,
            color: color || '#3B82F6',
          },
        });
        
        res.status(201).json(newEvent);
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).json({ error: `Method ${req.method} not allowed` });
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}