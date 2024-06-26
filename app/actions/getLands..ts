import prisma from '@/app/libs/prismadb';

export interface LandParams {
    userId?: string;
    guestCount?: number;
    roomCount?: number;
    bathroomCount?: number;
    startDate?: string;
    endDate?: string;
    locationValue?: string;
    category?: string;
}

export default async function getLands(
    params: LandParams
) {
    try {
        const {
            userId,
            roomCount,
            guestCount,
            // bathRoomCount,
            locationValue,
            startDate,
            endDate,
            category
        } = params || {}; 
        
        let query: any = {};

        // Remove the userId from the destructuring and handle it separately
       const { userId: userIdParam, ...restParams } = params || {};

        if (userIdParam) {
            query.userId = userIdParam;
        }

        if (category) {
            query.category = category;
        }

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

        const lands = await prisma.land.findMany({
            where: query,
            orderBy: {
                createdAt: 'desc'
            }
        });

        const safeLand = lands.map((land) => ({
            ...land,
            createAt: land.createdAt.toISOString(),
        }));

        return safeLand;
      
        
    } catch (error: any) {
        throw new Error(error);
    }
}

