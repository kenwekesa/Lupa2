// import prisma from "@/app/libs/prismadb";

// interface IParams {
//     listingId?: string;
//     tourId?: string;
//     userId?: string;
//     authorId?: string;
// }

// export default async function getReservations(params: IParams) {
//     try {
//         const { listingId, userId, tourId, authorId } = params;

//         const query: any = {};

//         if (listingId) {
//             query.listingId = listingId;
//         }

//         if (tourId) {
//             query.tourId = tourId;
//         }

//         if (userId) {
//             query.userId = userId;
//         }

//         if (authorId) {
//             query.Tour = {
//                 userId: authorId,
//             };
            
//         }

//         // const reservations = await prisma.reservation.findMany({
//         //     where: query,
//         //     include: {
//         //         Listing: true,
//         //     },
//         //     orderBy: {
//         //         createdAt: 'desc',
//         //     },
//         // });

//         // const safeReservation = reservations.map((reservation) => ({
//         //     ...reservation,
//         //     createdAt: reservation.createdAt.toISOString(),
//         //     startDate: reservation.startDate.toISOString(),
//         //     endDate: reservation.endDate.toISOString(),
//         //     Listing: {
//         //         ...reservation.Listing,
//         //         createAt: reservation.Listing?.createAt.toISOString(),
//         //     },
//         // }));

//         // return safeReservation;
//     } catch (error: any) {
//         throw new Error(error);
//     }
// }




// import prisma from "@/app/libs/prismadb";

// interface IParams {
//     listingId?: string;
//     tourId?: string;
//     userId?: string;
//     authorId?: string;
// }

// export default async function getReservations(params: IParams) {
//     try {
//         const { listingId, userId, tourId, authorId } = params || {};

//         const query: any = {};

//         // Remove the userId from the destructuring and handle it separately
//         const { userId: userIdParam, ...restParams } = params;

//         if (listingId) {
//             query.listingId = listingId;
//         }

//         if (tourId) {
//             query.tourId = tourId;
//         }

//         // Add userIdParam directly to query if it exists
//         if (userIdParam) {
//             query.userId = userIdParam;
//         }

//         if (authorId) {
//             query.Tour = {
//                 userId: authorId,
//             };
//         }

//         const reservations = await prisma.reservation.findMany({
//             where: query,
//             include: {
//                 Listing: true,
//             },
//             orderBy: {
//                 createdAt: 'desc',
//             },
//         });

//         const safeReservation = reservations.map((reservation) => ({
//             ...reservation,
//             createdAt: reservation.createdAt.toISOString(),
//             startDate: reservation.startDate.toISOString(),
//             endDate: reservation.endDate.toISOString(),
//             Listing: {
//                 ...reservation.Listing,
//                 createAt: reservation.Listing?.createAt.toISOString(),
//             },
//         }));

//          return safeReservation;
//     } catch (error: any) {
//         throw new Error(error);
//     }
// }

import prisma from "@/app/libs/prismadb";

interface IParams {
    listingId?: string;
    tourId?: string;
    userId?: string;
    authorId?: string;
}

export default async function getReservations(params: IParams) {
    try {
        const { listingId, userId, tourId, authorId } = params || {};

        const query: any = {};

        if (listingId) {
            query.listingId = listingId;
        }

        if (tourId) {
            query.tourId = tourId;
        }

        if (userId) {
            query.userId = userId;
        }

        if (authorId) {
            query.Listing = {
                userId: authorId,
            };
        }

        const reservations = await prisma.reservation.findMany({
            where: query,
            include: {
                Listing: true,
                user:true
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        const safeReservations = reservations.map((reservation) => ({
            ...reservation,
            createdAt: reservation.createdAt.toISOString(),
            startDate: reservation.startDate.toISOString(),
            endDate: reservation.endDate.toISOString(),
            Listing: {
                ...reservation.Listing,
                createAt: reservation.Listing?.createAt.toISOString(), // Corrected field name
            },
        }));

        return safeReservations;
    } catch (error: any) {
        throw new Error(error);
    }
}

