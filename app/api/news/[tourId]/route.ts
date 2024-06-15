import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUsers";
import prisma from "@/app/libs/prismadb";
import { IoLocationSharp } from "react-icons/io5";

interface IParams {
    tourId?: string;
}

export async function DELETE(
    request: Request,
    {params} : {params : IParams}
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { tourId } = params;

    if (!tourId || typeof tourId !== 'string') {
        throw new Error('Invalid ID');
    }

    const tour = await prisma.tour.deleteMany({
        where: {
            id: tourId,
            userId: currentUser.id
        }
    });

    return NextResponse.json(tour)
}



export async function PUT(
    request: Request,
    { params }: { params: IParams }
  ) {
  
    console.log("Update reached...")
    const currentUser = await getCurrentUser();
  
    if (!currentUser) {
      return NextResponse.json({
          message: "Unauthorised"
        }, {
          status: 401,
        }) // Return 401 for unauthorized access
    }
  
    const { tourId } = params;
    const formData = await request.json(); // Assuming JSON data

    const from_flag = formData.from_flag

    const tour = await prisma.tour.findUnique({ where: { id:tourId } });
    if(from_flag === 'reservation')
    {
    const slots = formData.slots;

    if (tour?.guestCount !== undefined && tour?.tourists !== undefined && slots > (tour.guestCount - tour.tourists.length)) {
   
      throw new Error("Slots availabe not enough for the requested number of slots"); 
    }

    const updateData = {
      ...formData,
      tourists: [...formData.tourists, ...Array.from({ length: formData.slots }).fill(formData.userId)],
    };
  
    console.log("form data",formData)
    console.log("updates data",updateData)

    console.log("tour ID----->", formData.tourId)
  
    if (!tourId || typeof tourId !== "string") {
      throw new Error("Invalid tour ID"); // Throw error for invalid IDs
    }
  
    if (!updateData.hasOwnProperty("tourists")) {
      throw new Error("Missing 'tourists' field in update data"); // Ensure tourists field exists
    }
  
    const newTourists = updateData.tourists;


    const newPaymentDetails = {
      userId: formData.userId,
      totalPrice: formData.totalPrice,
      paymentDetails: formData.paymentDetails
    };
    
    const newPaymentDets = Array.isArray(tour?.paymentDetails) ?
      [...tour.paymentDetails, newPaymentDetails] : [newPaymentDetails];
    // const newPaymentDets = [...tour.paymentDetails, {userId: formData.userId, totalPrice: formData.totalPrice, paymentDetails:formData.paymentDetails}]
  
    // Validate newTourists array:
    if (!Array.isArray(newTourists)) {
      throw new Error("'tourists' field must be an array");
    }
  
    if (newTourists.length === 0) {
      throw new Error("'tourists' array cannot be empty");
    }
  
    // Check for valid user IDs:
    const areAllIdsValid = newTourists.every((userId) => typeof userId === "string");
    if (!areAllIdsValid) {
      throw new Error("'tourists' array must contain strings (user IDs)");
    }
  

    // Check for limit (replace with your desired limit):
    const MAX_TOURISTS = tour?.guestCount? tour.guestCount : 0 ; // Example limit, adjust as needed
  if (newTourists.length > MAX_TOURISTS) {
    throw new Error(`Maximum tourists reached: ${MAX_TOURISTS}`);
  }
  
   
  
    // Update tour with Prisma:
    try {
      const updatedTour = await prisma.tour.update({
        where: {
          id: tourId,
        },
        data: {
          tourists: {
            set: newTourists, // Use "set" for replacing the entire array
          },
          paymentDetails: {
            set: newPaymentDets,
          },
        },
      });
  
      return NextResponse.json(updatedTour);
    } catch (error) {
      console.error("Error updating tour:", error);
      return NextResponse.json({
          message: "Internal Server error"
        }, {
          status: 500,
        }) 
        // Return 500 for unexpected errors
    }
  }

  else if(from_flag === 'update')
  {


    const {from_flag,id,guestCount,save, room,roomCount,
      title, depStart, depEnd, tripStyle, rooms, ourLink,price,country,continent,locations,description
    } = formData

    const finalUpdateValues ={guestCount: parseInt(guestCount, 10),
      //title, depStart, depEnd, tripStyle,save, rooms, ourLink, guestCount,price,country,continent,Locations,desciption
      room: parseInt(room, 10),
      save: parseInt(save, 10),
      roomCount: parseInt(roomCount, 10),
      price: parseInt(price, 10),
      title:title,
      depEnd:depEnd,
      depStart:depStart,
      tripStyle:tripStyle,
      ourLink:ourLink,
      country:country,
      locations:locations,
      description:description,
      rooms:rooms,
     continent:continent,
    
    }

    try {

      const updateTour = await prisma.tour.update({
        where: {
          id: tourId,
        },
        data: finalUpdateValues, // Use updatedTourData object for selective updates
      });
      return NextResponse.json(updateTour);

    } catch (error) {

      console.error("Error updating tour:", error);
      return NextResponse.json({
          message: "Internal Server error"
        }, {
          status: 500,
        }) 
        // Return 500 for unexpected errors
    }
      
    }
  }
  

// import { NextResponse } from "next/server";
// import getCurrentUser from "@/app/actions/getCurrentUsers";
// import prisma from "@/app/libs/prismadb";

// interface IParams {
//     tourId?: string;
// }

// export async function DELETE(
//     request: Request,
//     {params} : {params : IParams}
// ) {
//     const currentUser = await getCurrentUser();

//     if (!currentUser) {
//         return NextResponse.error();
//     }

//     const { tourId } = params;

//     if (!tourId || typeof tourId !== 'string') {
//         throw new Error('Invalid ID');
//     }

//     const tour = await prisma.tour.deleteMany({
//         where: {
//             id: tourId,
//             userId: currentUser.id
//         }
//     });

//     return NextResponse.json(tour)
// }

// // Exporting generateStaticParams function to fix the issue
// export function generateStaticParams() {
//     // You may return an array of possible values for dynamic route parameters here if needed.
//     // For example, if tourId is always a string, you can return an array of strings.
//     // This function is used by Next.js for static optimization.
//     return [];
// }