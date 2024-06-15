import prisma from '@/app/libs/prismadb';

export interface IToursParams {
    userId?: string;
    guestCount?: number;
    roomCount?: number;
    continent?: string; // Corrected to lowercase 'continent'
    country?: string;
    bathroomCount?: number;
    startDate?: string;
    endDate?: string;
    locationValue?: string;
    category?: string;
}

export default async function getIsraelTours(
    params: IToursParams
) {
    try {
        const {
            userId,
            roomCount,
            guestCount,
            // bathRoomCount,
            locationValue,
            startDate,
            country,
            endDate,
            continent,
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

        if (roomCount) {
            query.roomCount = {
                gte: +roomCount
            }
        }

        if (guestCount) {
            query.guestCount = {
                gte: +guestCount
            }
        }

        // if (bathroomCount) {
        //     query.bathroomCount = {
        //         gte: +bathroomCount
        //     }
        // }

        if (locationValue) {
            query.locationValue = locationValue;
        }

        if (startDate && endDate) {
            query.NOT = {
                reservations: {
                    some: {
                        OR: [
                            {
                                endDate: { gte: startDate },
                                startDate: {lte: startDate},
                            },
                            {
                                startDate: { lte: endDate },
                                endDate: {gte: endDate}
                            }
                       ] 
                    }
                }
            }
        }

        // Add condition for continent to be "africa"
        if (country && country.toLowerCase() === 'israel') {
            query.country = country.toLowerCase();
        }

        const tours = await prisma.tour.findMany({
            where: query,
            orderBy: {
                createAt: 'desc'
            }
        });

        const safeTour = tours.map((tour) => ({
            ...tour,
            createAt: tour.createAt.toISOString(),
        }));

        return safeTour;

    } catch (error: any) {
        throw new Error(error);
    }
}
