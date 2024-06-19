import prisma from '@/app/libs/prismadb';

export interface OffersParams {
  userId?: string;
  category?: string;
}

export default async function getOffers(params: OffersParams) {
  try {
    const { userId, category } = params || {};

    let query: any = {};

    // Use optional chaining to handle null or undefined userId
    if (userId !== null && userId !== undefined) {
      query.userId = userId;
    }

    if (category) {
      query.category = category;
    }

    const offers = await prisma.offers.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc',
      },
    });

    const safeOffer = offers.map((offer) => ({
      ...offer,
      createdAt: offer.createdAt.toISOString(),
    }));

    return safeOffer;
  } catch (error: any) {
    throw new Error(error.message);
  }
}