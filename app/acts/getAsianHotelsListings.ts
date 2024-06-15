import prisma from '@/app/libs/prismadb';

export interface IListingsParams {
    userId?: string;
    guestCount?: number;
    house?: string;
    hotel?: string;
    continent?: string;
    roomCount?: number;
    bathroomCount?: number;
    startDate?: string;
    endDate?: string;
    locationValue?: string;
    category?: string;
}

export default async function getAsianHotelLisings(
    params: IListingsParams
) {
    try {
        const {
            userId,
            roomCount,
            guestCount,
            house,
            hotel,
            continent,
            // bathRoomCount,
            locationValue,
            startDate,
            endDate,
            category
        } = params; 
        
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

        // Add condition for continent to be "america"
        if (hotel && hotel.toLowerCase() === 'hotel') {
            query.hotel = hotel.toLowerCase();
        }

        if (continent && continent.toLowerCase() === 'asia') {
            query.continent = continent.toLowerCase();
        }

        const listings = await prisma.listing.findMany({
            where: query,
            orderBy: {
                createAt: 'desc'
            }
        });

        const safeListing = listings.map((listing) => ({
            ...listing,
            createAt: listing.createAt.toISOString(),
        }));

        return safeListing; 
        
    } catch (error: any) {
        throw new Error(error);
    }
}

