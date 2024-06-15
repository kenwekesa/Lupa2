import prisma from '@/app/libs/prismadb';
import getCurrentUser from './getCurrentUsers';

export interface IToursParams {
    userId?: string;
    guestCount?: number;
    roomCount?: number;
    tourists?:string[];
    bathroomCount?: number;
    startDate?: string;
    endDate?: string;
    locationValue?: string;
    category?: string;
}

export default async function getToursClient(
    params: IToursParams
) {
    const currentUser =await getCurrentUser();


    try {
        const {
            userId,
            roomCount,
            guestCount,
            // bathRoomCount,
            tourists,
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

        if(tourists)
        {
            query.tourists = tourists
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

        // const tours = await prisma.tour.findMany({
        //     where: query,
        //     orderBy: {
        //         createAt: 'desc'
        //     }
        // });
        // const tours = await prisma.tour.findMany({
        //     where: {
        //         tourists: {
        //             has: currentUser?.id // Replace userId with the current user's ID
        //         }
        //     },
        //     orderBy: {
        //         createAt: 'desc'
        //     }
        // });

        const tours = await prisma.tour.findMany({
            where: {
                // Filter tours if the user ID is not null and the tourists list contains the user ID
                ...(currentUser?.id && {
                    tourists: {
                        has: currentUser.id
                    }
                })
            },
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

