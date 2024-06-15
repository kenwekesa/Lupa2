import prisma from '@/app/libs/prismadb';

export interface IListingsParams {
    userId?: string;
    category?: string;
}

export default async function getGallery(
    params: IListingsParams
) {
    try {
        const {
            userId,
            category
        } = params; 
        
        let query: any = {};

        // Remove the userId from the destructuring and handle it separately
       const { userId: userIdParam, ...restParams } = params || {};

        if (userIdParam) {
            query.userId = userIdParam;
        }

        // Add condition for continent to be "america"
        if (category && category.toLowerCase() === 'gallery') {
            query.category = category.toLowerCase();
        }

        const news = await prisma.blog.findMany({
            where: query,
            orderBy: {
                createdAt: 'desc'
            }
        });

        // const safeBlog = news.map((listing) => ({
        //     ...listing,
        //     createAt: listing.createdAt?.toISOString() || null,
        // }));

        const safeBlog = news
            .filter(listing => listing.createdAt !== null) // Filter out records with null createdAt
            .map((listing) => ({
                ...listing,
                createAt: listing.createdAt.toISOString(),
            }));

        return safeBlog; 
        
    } catch (error: any) {
        throw new Error(error);
    }
}

