import prisma from '@/app/libs/prismadb';

export interface IMyHotelReservationsParams {
    userId?: string;
    ListingId?: string;
    numberOfGuests?: number;
    numberOfRooms?: number;
    startDate?: string;
    endDate?: string;
    totalPrice?: number;
    paymentDetails?: JSON;
}

export default async function getOperaReservationsHotels(
    params: IMyHotelReservationsParams
) {
    try {
        const {
            userId,
            numberOfGuests,
            numberOfRooms,
            startDate,
            endDate,
            totalPrice,
            paymentDetails,
        } = params; 
        
        let query: any = {};

        // Remove the userId from the destructuring and handle it separately
       const { userId: userIdParam, ...restParams } = params || {};

        // if (userIdParam) {
        //     query.userId = userIdParam;
        // }

        // if (totalPrice) {
        //     query.totalPrice = totalPrice;
        // }

        // if (numberOfRooms) {
        //     query.numberOfRooms = {
        //         gte: +numberOfRooms
        //     }
        // }

        // if (numberOfGuests) {
        //     query.numberOfGuests = {
        //         gte: +numberOfGuests
        //     }
        // }

        // // if (bathroomCount) {
        // //     query.bathroomCount = {
        // //         gte: +bathroomCount
        // //     }
        // // }

        // if (paymentDetails) {
        //     query.paymentDetails = paymentDetails;
        // }

        // if (startDate) {
        //     query.startDate = startDate;
        // }

        // if (endDate) {
        //     query.endDate = endDate;
        // }


    //    const reservations = await prisma.reservation.findMany({
    //         where: {
    //             userId: userIdParam
    //         },
    //         orderBy: {
    //             createdAt: 'desc' // Assuming 'createAt' is a typo and you meant 'createdAt'
    //         }
        //     });
        
      const reservations = await prisma.reservation.findMany({
            where: {
                Listing: {
                    userId: userIdParam // Replace "YourCity" with the desired city name for filtering
                }
            },
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                Listing: true
            }
        });

        const safeReservation = reservations.map((reservation) => ({
            ...reservation,
            // createAt: listing.createAt.toISOString(),
        }));

        return safeReservation; 
        
    } catch (error: any) {
        throw new Error(error);
    }
}

