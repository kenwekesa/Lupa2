import prisma from '@/app/libs/prismadb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { id } = req.query;
  const tourId = Array.isArray(id) ? id[0] : id; // Extract the ID from the query parameters

  try {
    await prisma.tour.delete({
      where: {
        id: tourId,
      },
    });

    return res.status(200).json({ message: 'Tour deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to delete tour' });
  }
}
