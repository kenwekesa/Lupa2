// import prisma from "@/app/libs/prismadb"

// interface IParams {
//     offerId?: string;
// }

// export default async function getOfferById(
//     params: IParams
// ) {
//     try {
//         const { offerId } = params;

//         const offer = await prisma.offers.findUnique({
//             where: {
//                 id: offerId
//             },
//             include: {
//                 user: true
//             }
//         });

//         if (!offer) {
//             return null;
//         }

//         return {
//             ...offer,
//             createdAt: offer.createdAt.toISOString(),
//             user: {
//                 ...offer,
//                 userType:offer.user?.userType?.toString(),
//                 createdAt: offer.user?.createdAt.toISOString(),
//                 updatedAt: offer.user?.updatedAt.toISOString(),
//                 emailVerified: offer.user?.emailVerified?.toISOString() || null,
//             }
//         };
//     } catch (error: any) {
//         throw new Error(error)
//     }

// }

import prisma from "@/app/libs/prismadb";

interface IParams {
    offerId?: string;
}

export default async function getOfferById(
    params: IParams
) {
    try {
        const { offerId } = params;

        if (!offerId) {
            throw new Error("offerId is required");
        }

        const offer = await prisma.offers.findUnique({
            where: {
                id: offerId
            },
            include: {
                user: true
            }
        });

        if (!offer) {
            return null;
        }

        return {
            ...offer,
            createdAt: offer.createdAt.toISOString(),
            user: {
                ...offer.user,
                userType: offer.user?.userType?.toString(),
                createdAt: offer.user?.createdAt.toISOString(),
                updatedAt: offer.user?.updatedAt.toISOString(),
                emailVerified: offer.user?.emailVerified?.toISOString() || null,
            }
        };
    } catch (error: any) {
        throw new Error(error.message);
    }
}
