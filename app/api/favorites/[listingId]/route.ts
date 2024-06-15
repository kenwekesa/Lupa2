import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUsers";
import prisma from "@/app/libs/prismadb"

interface IParams {
    listingId?: string;
}

export async function POST(
    request: Request,
    { params } : {params: IParams}
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { listingId } = params;

    if (!listingId || typeof listingId !== 'string') {
        throw new Error('Invalid ID');
    }

    let favoriteIds = [...(currentUser.favoriteIds || [])];

    favoriteIds.push(listingId);

    const user = await prisma.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            favoriteIds
        }
    });

    return NextResponse.json(user);
}

export async function DELETE(
    request: Request,
    {params}: {params: IParams}
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { listingId } = params;

    if (!listingId || typeof listingId !== 'string') {
        throw new Error('Invalid ID');
    }

    let favoriteIds = [...(currentUser.favoriteIds || [])];

    favoriteIds = favoriteIds.filter((id) => id !== listingId);

    const user = await prisma.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            favoriteIds
        }
    })

    return NextResponse.json(user)
}

// import { NextResponse } from "next/server";
// import getCurrentUser from "@/app/actions/getCurrentUsers";
// import prisma from "@/app/libs/prismadb";

// interface IParams {
//     listingId?: string;
// }

// export async function POST(
//     request: Request,
//     { params }: { params: IParams }
// ) {
//     const currentUser = await getCurrentUser();

//     if (!currentUser) {
//         return NextResponse.error();
//     }

//     const { listingId } = params;

//     if (!listingId || typeof listingId !== 'string') {
//         throw new Error('Invalid ID');
//     }

//     let favoriteIds = [...(currentUser.favoriteIds || [])];

//     favoriteIds.push(listingId);

//     const user = await prisma.user.update({
//         where: {
//             id: currentUser.id
//         },
//         data: {
//             favoriteIds
//         }
//     });

//     return NextResponse.json(user);
// }

// export async function DELETE(
//     request: Request,
//     { params }: { params: IParams }
// ) {
//     const currentUser = await getCurrentUser();

//     if (!currentUser) {
//         return NextResponse.error();
//     }

//     const { listingId } = params;

//     if (!listingId || typeof listingId !== 'string') {
//         throw new Error('Invalid ID');
//     }

//     let favoriteIds = [...(currentUser.favoriteIds || [])];

//     favoriteIds = favoriteIds.filter((id) => id !== listingId);

//     const user = await prisma.user.update({
//         where: {
//             id: currentUser.id
//         },
//         data: {
//             favoriteIds
//         }
//     })

//     return NextResponse.json(user);
// }

// export async function generateStaticParams() {
//     const listings = await prisma.listing.findMany();
//     const listingIds = listings.map((listing) => listing.id);
//     return {
//         params: listingIds.map((id) => ({ listingId: id })),
//     };
// }


// import { NextResponse } from "next/server";
// import getCurrentUser from "@/app/actions/getCurrentUsers";
// import prisma from "@/app/libs/prismadb";

// // Define the generateStaticParams function
// export const generateStaticParams = async () => {
//   return { paths: [], fallback: true }; // Allow dynamic fetching
// };

// interface IParams {
//     listingId?: string;
// }

// export async function POST(
//     request: Request,
//     { params } : {params: IParams}
// ) {
//     try {
//         const currentUser = await getCurrentUser();

//         if (!currentUser) {
//             return NextResponse.error();
//         }

//         const { listingId } = params;

//         if (!listingId || typeof listingId !== 'string') {
//             throw new Error('Invalid ID');
//         }

//         let favoriteIds = [...(currentUser.favoriteIds || [])];

//         favoriteIds.push(listingId);

//         const user = await prisma.user.update({
//             where: {
//                 id: currentUser.id
//             },
//             data: {
//                 favoriteIds
//             }
//         });

//         return NextResponse.json(user);
//     } catch (error) {
//         console.error("Error processing POST request:", error);
//         return NextResponse.error();
//     }
// }

// export async function DELETE(
//     request: Request,
//     {params}: {params: IParams}
// ) {
//     try {
//         const currentUser = await getCurrentUser();

//         if (!currentUser) {
//             return NextResponse.error();
//         }

//         const { listingId } = params;

//         if (!listingId || typeof listingId !== 'string') {
//             throw new Error('Invalid ID');
//         }

//         let favoriteIds = [...(currentUser.favoriteIds || [])];

//         favoriteIds = favoriteIds.filter((id) => id !== listingId);

//         const user = await prisma.user.update({
//             where: {
//                 id: currentUser.id
//             },
//             data: {
//                 favoriteIds
//             }
//         })

//         return NextResponse.json(user);
//     } catch (error) {
//         console.error("Error processing DELETE request:", error);
//         return NextResponse.error();
//     }
// }
