// import { NextResponse } from "next/server";

// import prisma from "@/app/libs/prismadb";
// import getCurrentUser from "@/app/actions/getCurrentUsers";

// export async function POST(
//     request: Request
// ) {
//     try {
//         const currentUser = await getCurrentUser();
        
//     if (!currentUser) {
//         return NextResponse.error();
//     }

//     const body = await request.json();

//     const {
//         listingId,
//         startDate,
//         endDate,
//         amountPayable, 
//         totalPrice,
//         paymentDetails,
//         guestDetails
//     } = body;

//     if (!listingId || !startDate || !endDate || !amountPayable) {
//         return NextResponse.error();
//     }
    
//     const listingAndReservation = await prisma.listing.update({
//         where: {
//             id: listingId
//         },
//         data: {
//             reservations: {
//                 create: {
//                     userId: currentUser.id,
//                     startDate,
//                     endDate,
//                     totalPrice,
//                     paymentDetails,
//                     numberOfRooms:guestDetails.rooms,
//                     numberOfGuests: guestDetails.guests,
                    
//                 }
//             }
//         }
//     });
    
//     return NextResponse.json(listingAndReservation);
    
// } catch (error) {
//  console.log("server error occured:-  ", error)   
// }
// }



import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUsers";

export async function POST(
  request: Request
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const {
      listingId,
      startDate,
      endDate,
      totalPrice,
      paymentDetails,
      guestDetails,
    } = body;

    // if (!listingId || !startDate || !endDate || !amountPayable) {
    //   return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    // }

    if (!listingId || !startDate || !endDate  || !totalPrice || !paymentDetails || !guestDetails) {
        console.error("Missing required fields:", { listingId, startDate, endDate, totalPrice, paymentDetails, guestDetails });
        return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
      }
    const listingAndReservation = await prisma.listing.update({
      where: {
        id: listingId,
      },
      data: {
        reservations: {
          create: {
            userId: currentUser.id,
            startDate,
            endDate,
            totalPrice,
            paymentDetails,
            numberOfRooms: guestDetails.rooms,
            numberOfGuests: guestDetails.guests,
          },
        },
      },
    });

    return NextResponse.json(listingAndReservation);
  } catch (error) {
    console.error("server error occured:- ", error);
    // Set a generic error status code with a JSON response (optional)
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
