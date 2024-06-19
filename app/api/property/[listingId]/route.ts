import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUsers";
import prisma from "@/app/libs/prismadb";

interface IParams {
  propertyId?: string;
}

export async function DELETE(
    request: Request,
    {params} : {params : IParams}
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { propertyId } = params;

    if (!propertyId || typeof propertyId !== 'string') {
        throw new Error('Invalid ID');
    }

    const property = await prisma.property.deleteMany({
        where: {
            id: propertyId,
            userId: currentUser.id
        }
    });

    return NextResponse.json(property)
}


export async function GET(
    request: Request,
    { params }: { params: IParams }
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { propertyId } = params;

    if (!propertyId || typeof propertyId !== 'string') {
        throw new Error('Invalid ID');
    }

    const property = await prisma.property.findUnique({
        where: {
            id: propertyId
        }
    });
   

    if (!property) {
         return NextResponse.json({ message: "Internal Server Error" }, { status: 404 });
    }

    return NextResponse.json(property);
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
  
    const { propertyId } = params;
    const formData = await request.json(); // Assuming JSON data


    const property = await prisma.property.findUnique({ where: { id:propertyId } });


    const {id,guestCount,save, roomCount,
      title, overView, house, hotel, hostName, cohostName, hostContact, hotelLink, oneBedroom, twoBedroom, threebedRoom, commonPlace,price, description
    } = formData


    const finalUpdateValues ={guestCount: parseInt(guestCount, 10),
      //title, depStart, depEnd, tripStyle,save, rooms, ourLink, guestCount,price,country,continent,Locations,desciption
    //   room: parseInt(room, 10),
     save: parseInt(save, 10),
      roomCount: parseInt(roomCount, 10),
      price: parseInt(price, 10),
      title:title,
      overView:overView,
      house:house,
      hotel:hotel,
      hotelLink:hotelLink,
      hostName:hostName,
      cohostName:cohostName,
      hostContact:hostContact,
      oneBedroom:oneBedroom,
      twoBedroom: twoBedroom,
      threebedRoom: threebedRoom,
      commonPlace:commonPlace,
    //   locations:locations,
      description:description,
    //   country:country,
    //   continent:continent,
    
    }

    try {

      const updateTour = await prisma.property.update({
        where: {
          id: propertyId,
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