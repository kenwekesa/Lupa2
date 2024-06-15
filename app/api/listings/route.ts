import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb"
import getCurrentUser from "@/app/actions/getCurrentUsers";
import { NextApiRequest, NextApiResponse } from "next";


export async function POST(
    request: Request
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error()
    }

    const body = await request.json();

    const {
        title,
        description,
        imageSrc,
        category,
        roomCount,
        bathRoomCount,
        guestCount,
        location,
        city,
        cohostName,
        hostContact,
        save,
        country,
        continent, 
        oneBedroom,
        twoBedroom,
        threebedRoom,
        commonPlace,
        hostName,
        house,
        hotel,
        hotelLink,
        startDate,
        endDate,
        distance,
        offers,
        overView,
        price
    } = body;

    Object.keys(body).forEach((value: any) => {
        if (!body[value]) {
            NextResponse.error();
        }
    });

    const listing = await prisma.listing.create({
        data: {
            title,
            description,
            imageSrc,
            category,
            roomCount,
            city,
            hostName,
            startDate,
            endDate,
            distance,
            cohostName,
            hostContact,
            oneBedroom,
            twoBedroom,
            threebedRoom,
            commonPlace,
            offers,
            country,  
            continent, 
            save: parseInt(save, 10),
            house,
            hotel,
            hotelLink,
            overView,
            bathRoomCount,
            guestCount,
            locationValue: location.value,
            price: parseInt(price, 10),
            userId: currentUser.id
        }
    });

    return NextResponse.json(listing);
}

export async function GET(req:NextRequest, res:NextApiResponse) {
    // const { destination } = req.query;
  let destination = req.nextUrl.searchParams.get("destination")
    
    console.log(destination)
    if (!destination) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }
  
    const country = destination
    let searchParams: any = {};

        // Remove the userId from the destructuring and handle it separately
       //const { userId: userIdParam, ...restParams } = params || {};

        if (country) {
            searchParams.country =  country.toLowerCase();
        }

        // if (category) {
        //     query.category = category;
        // }
    
    const tours = await prisma.tour.findMany({
        where: searchParams,
        orderBy: {
            createAt: 'desc'
        }
    });

    const safeTour = tours.map((tour) => ({
        ...tour,
        createAt: tour.createAt.toISOString(),
    }));

    return NextResponse.json(safeTour);
   
  }

// import { NextResponse } from "next/server";
// import prisma from "@/app/libs/prismadb";
// import getCurrentUser from "@/app/actions/getCurrentUsers";

// // Define the generateStaticParams function
// export const generateStaticParams = async () => {
//   try {
//     // Fetch necessary data for generating static paths
//     const listings = await prisma.listing.findMany();
//     const listingIds = listings.map((listing) => listing.id.toString());

//     // Return the paths and fallback value
//     return {
//       paths: listingIds.map((id) => ({ params: { listingId: id } })),
//       fallback: false, // Set to 'false' for static generation
//     };
//   } catch (error) {
//     // Handle errors gracefully
//     console.error("Error fetching listing data:", error);
//     return { paths: [], fallback: false };
//   }
// };

// // Define the POST function
// export async function POST(request: Request) {
//   try {
//     // Ensure user authentication
//     const currentUser = await getCurrentUser();
//     if (!currentUser) {
//       return NextResponse.error();
//     }

//     // Extract request body
//     const body = await request.json();

//     // Validate required fields
//     const requiredFields = [
//       "title",
//       "description",
//       "imageSrc",
//       "category",
//       "roomCount",
//       "bathRoomCount",
//       "guestCount",
//       "location",
//       "city",
//       "cohostName",
//       "hostContact",
//       "save",
//       "country",
//       "continent",
//       "oneBedroom",
//       "twoBedroom",
//       "threebedRoom",
//       "commonPlace",
//       "hostName",
//       "house",
//       "hotel",
//       "hotelLink",
//       "startDate",
//       "endDate",
//       "distance",
//       "offers",
//       "overView",
//       "price",
//     ];
//     if (requiredFields.some((field) => !body[field])) {
//       return NextResponse.error();
//     }

//     // Create new listing
//     const listing = await prisma.listing.create({
//       data: {
//         title: body.title,
//         description: body.description,
//         imageSrc: body.imageSrc,
//         category: body.category,
//         roomCount: body.roomCount,
//         bathRoomCount: body.bathRoomCount,
//         guestCount: body.guestCount,
//         locationValue: body.location.value, // Replace location with locationValue: location.value
//         city: body.city,
//         cohostName: body.cohostName,
//         hostContact: body.hostContact,
//         save: parseInt(body.save, 10),
//         country: body.country,
//         continent: body.continent,
//         oneBedroom: body.oneBedroom,
//         twoBedroom: body.twoBedroom,
//         threebedRoom: body.threebedRoom,
//         commonPlace: body.commonPlace,
//         hostName: body.hostName,
//         house: body.house,
//         hotel: body.hotel,
//         hotelLink: body.hotelLink,
//         startDate: body.startDate,
//         endDate: body.endDate,
//         distance: body.distance,
//         offers: body.offers,
//         overView: body.overView,
//         price: parseInt(body.price, 10),
//         userId: currentUser.id,
//       },
//     });

//     // Return JSON response
//     return NextResponse.json(listing);
//   } catch (error) {
//     // Handle errors gracefully
//     console.error("Error processing POST request:", error);
//     return NextResponse.error();
//   }
// }


// // Import necessary modules
// import { NextResponse } from "next/server";
// import prisma from "@/app/libs/prismadb";
// import getCurrentUser from "@/app/actions/getCurrentUsers";

// // Define the generateStaticParams function
// export const generateStaticParams = async () => {
//   // Return empty paths and set fallback to true
//   return { paths: [], fallback: true };
// };

// // Define the POST function
// export async function POST(request: Request) {
//   try {
//     // Ensure user authentication
//     const currentUser = await getCurrentUser();
//     if (!currentUser) {
//       return NextResponse.error();
//     }

//     // Extract request body
//     const body = await request.json();

//     // Validate required fields
//     const requiredFields = [
//       "title",
//       "description",
//       "imageSrc",
//       "category",
//       "roomCount",
//       "bathRoomCount",
//       "guestCount",
//       "location",
//       "city",
//       "cohostName",
//       "hostContact",
//       "save",
//       "country",
//       "continent",
//       "oneBedroom",
//       "twoBedroom",
//       "threebedRoom",
//       "commonPlace",
//       "hostName",
//       "house",
//       "hotel",
//       "hotelLink",
//       "startDate",
//       "endDate",
//       "distance",
//       "offers",
//       "overView",
//       "price",
//     ];
//     if (requiredFields.some((field) => !body[field])) {
//       return NextResponse.error();
//     }

//     // Extract listingId from URL
//     const listingId = request.url.split('/')[3];

//     // Fetch specific listing data
//     const listing = await prisma.listing.findUnique({
//       where: { id: listingId },
//     });

//     // Handle missing listing
//     if (!listing) {
//     //   return NextResponse.notFound(); // Return 404 for non-existent listings
//     }

//     // Rest of existing POST logic using listing data
//     // Create new listing
//     const createdListing = await prisma.listing.create({
//       data: {
//         title: body.title,
//         description: body.description,
//         imageSrc: body.imageSrc,
//         category: body.category,
//         roomCount: body.roomCount,
//         bathRoomCount: body.bathRoomCount,
//         guestCount: body.guestCount,
//         locationValue: body.location.value, // Replace location with locationValue: location.value
//         city: body.city,
//         cohostName: body.cohostName,
//         hostContact: body.hostContact,
//         save: parseInt(body.save, 10),
//         country: body.country,
//         continent: body.continent,
//         oneBedroom: body.oneBedroom,
//         twoBedroom: body.twoBedroom,
//         threebedRoom: body.threebedRoom,
//         commonPlace: body.commonPlace,
//         hostName: body.hostName,
//         house: body.house,
//         hotel: body.hotel,
//         hotelLink: body.hotelLink,
//         startDate: body.startDate,
//         endDate: body.endDate,
//         distance: body.distance,
//         offers: body.offers,
//         overView: body.overView,
//         price: parseInt(body.price, 10),
//         userId: currentUser.id,
//       },
//     });

//     // Return JSON response
//     return NextResponse.json(createdListing);
//   } catch (error) {
//     // Handle errors gracefully
//     console.error("Error processing POST request:", error);
//     return NextResponse.error();
//   }
// }

// export const dynamic = process.env.NODE_ENV === "production" ? 'auto' : 'force-dynamic';


// import { NextResponse } from "next/server";
// import prisma from "@/app/libs/prismadb";
// import getCurrentUser from "@/app/actions/getCurrentUsers";

// export async function POST(request: Request) {
//     const currentUser = await getCurrentUser();

//     if (!currentUser) {
//         return NextResponse.error();
//     }

//     const body = await request.json();

//     const {
//         title,
//         description,
//         imageSrc,
//         category,
//         roomCount,
//         bathRoomCount,
//         guestCount,
//         location,
//         city,
//         cohostName,
//         hostContact,
//         save,
//         country,
//         continent, 
//         oneBedroom,
//         twoBedroom,
//         threebedRoom,
//         commonPlace,
//         hostName,
//         house,
//         hotel,
//         hotelLink,
//         startDate,
//         endDate,
//         distance,
//         offers,
//         overView,
//         price
//     } = body;

//     // Check if any required field is missing
//     for (const key in body) {
//         if (!body[key]) {
//             return NextResponse.error();
//         }
//     }

//     try {
//         const listing = await prisma.listing.create({
//             data: {
//                 title,
//                 description,
//                 imageSrc,
//                 category,
//                 roomCount,
//                 city,
//                 hostName,
//                 startDate,
//                 endDate,
//                 distance,
//                 cohostName,
//                 hostContact,
//                 oneBedroom,
//                 twoBedroom,
//                 threebedRoom,
//                 commonPlace,
//                 offers,
//                 country,  
//                 continent, 
//                 save: parseInt(save, 10),
//                 house,
//                 hotel,
//                 hotelLink,
//                 overView,
//                 bathRoomCount,
//                 guestCount,
//                 locationValue: location.value,
//                 price: parseInt(price, 10),
//                 userId: currentUser.id
//             }
//         });

//         return NextResponse.json(listing);
//     } catch (error) {
//         console.error("Error creating listing:", error);
//         return NextResponse.error();
//     }
// }

// export async function generateStaticParams() {
//     try {
//         // Fetch listing IDs from your database
//         const listingIds = await prisma.listing.findMany({ select: { id: true } });

//         return {
//             listingIds: listingIds.map((listing) => listing.id),
//         };
//     } catch (error) {
//         console.error("Error fetching listing IDs:", error);
//         return { listingIds: [] }; // Return empty array if there's an error
//     }
// }
