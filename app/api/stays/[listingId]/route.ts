import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUsers";
import prisma from "@/app/libs/prismadb";

interface IParams {
    listingId?: string;
}

export async function DELETE(
    request: Request,
    {params} : {params : IParams}
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { listingId } = params;

    if (!listingId || typeof listingId !== 'string') {
        throw new Error('Invalid ID');
    }

    const listing = await prisma.listing.deleteMany({
        where: {
            id: listingId,
            userId: currentUser.id
        }
    });

    return NextResponse.json(listing)
}


export async function GET(
    request: Request,
    { params }: { params: IParams }
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { listingId } = params;

    if (!listingId || typeof listingId !== 'string') {
        throw new Error('Invalid ID');
    }

    const listing = await prisma.listing.findUnique({
        where: {
            id: listingId
        }
    });
   

    if (!listing) {
         return NextResponse.json({ message: "Internal Server Error" }, { status: 404 });
    }

    return NextResponse.json(listing);
}






const generateDateRange = (startDate:any, endDate:any) => {
  const dates = [];
  let currentDate = new Date(startDate);
  let end = new Date(endDate)

  while (currentDate <= end) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};

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
  
    const { listingId } = params;
    const formData = await request.json(); // Assuming JSON data


    const listing = await prisma.listing.findUnique({ where: { id:listingId } });


    const {id,guestCount,save, roomCount,
      title, overView, house, hotel, hostName,datesUnavailableFrom, datesUnavailableTo, cohostName, hostContact, hotelLink, oneBedroom, twoBedroom, threebedRoom, commonPlace,price, description
    } = formData


    // const finalUpdateValues ={guestCount: parseInt(guestCount, 10),
    //   //title, depStart, depEnd, tripStyle,save, rooms, ourLink, guestCount,price,country,continent,Locations,desciption
    // //   room: parseInt(room, 10),
    //  save: parseInt(save, 10),
    //   roomCount: parseInt(roomCount, 10),
    //   price: parseInt(price, 10),
    //   title:title,
    //   overView:overView,
    //   house:house,
    //   hotel:hotel,
    //   hotelLink:hotelLink,
    //   hostName:hostName,
    //   cohostName:cohostName,
    //   hostContact:hostContact,
    //   oneBedroom:oneBedroom,
    //   twoBedroom: twoBedroom,
      
    //   threebedRoom: threebedRoom,
    //   commonPlace:commonPlace,
    // //   locations:locations,
    //   description:description,
    // //   country:country,
    // //   continent:continent,
    
    // }
    console.log("datesUnavailableFrom dates", datesUnavailableFrom)
    console.log("datesUnavailableTo dates", datesUnavailableTo)
    const dateRange = generateDateRange(datesUnavailableFrom, datesUnavailableTo);  
    console.log("date ranges",dateRange)
    try {

      const updateStay = await prisma.listing.update({
        where: {
          id: listingId,
        },
        data: { datesUnavailable: { push: dateRange } }, // Use updatedTourData object for selective updates
      });
      return NextResponse.json(updateStay);

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