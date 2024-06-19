import prisma from '@/app/libs/prismadb';

export interface CountiesParams {
    // userId?: string;
    // guestCount?: number;
    // roomCount?: number;
    // bathroomCount?: number;
    // startDate?: string;
    // endDate?: string;
    // locationValue?: string;
    // category?: string;
}

export default async function getCounties(
    params: CountiesParams = {} // Default value added here
) {
    try {
        const {
            // userId,
            // roomCount,
            // guestCount,
            // bathRoomCount,
            // locationValue,
            // startDate,
            // endDate,
            // category
        } = params; 
        
        let query: any = {};

        // Uncomment and handle these parameters as needed

        // if (userId) {
        //     query.userId = userId;
        // }

        // if (category) {
        //     query.category = category;
        // }

        // if (roomCount) {
        //     query.roomCount = {
        //         gte: +roomCount
        //     }
        // }

        // if (guestCount) {
        //     query.guestCount = {
        //         gte: +guestCount
        //     }
        // }

        // if (bathroomCount) {
        //     query.bathroomCount = {
        //         gte: +bathroomCount
        //     }
        // }

        // if (locationValue) {
        //     query.locationValue = locationValue;
        // }

        // if (startDate && endDate) {
        //     query.NOT = {
        //         reservations: {
        //             some: {
        //                 OR: [
        //                     {
        //                         endDate: { gte: startDate },
        //                         startDate: {lte: startDate},
        //                     },
        //                     {
        //                         startDate: { lte: endDate },
        //                         endDate: {gte: endDate}
        //                     }
        //                ] 
        //             }
        //         }
        //     }
        // }

        const countries = await prisma.county.findMany({
            where: query,
            orderBy: {
                createdAt: 'desc'
            }
        });

        const safeListing = countries.map((country) => ({
            ...country,
            createdAt: country.createdAt.toISOString(),
        }));

        return safeListing; 
        
    } catch (error: any) {
        throw new Error(error.message);
    }
}
