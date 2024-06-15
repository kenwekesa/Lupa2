import { NextRequest, NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUsers";
import prisma from '@/app/libs/prismadb'
import { NextApiResponse } from "next";


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
        depStart, 
        depEnd,
        operator,
        days,
        day1,
        day2,
        Day3,
        Day4,
        Day5,
        Day6,
        Day7,
        Day8,
        Day9,
        Day10,
        Day11,
        Day12,
        Day13,
        Day14,
        Week3,
        Week4,
        week5,
        week6,
        Week7,
        tripStyle,
        deal,
        overView,
        countries,
        locations,
        locStart,
        locEnd,
        itinery,
        ourLink,
        roomCount,
        bathRoomCount,
        guestCount,
        location,
        counts,
        locs,
        price,
        save,
        country,      
        continent,
        room
    } = body;


    Object.keys(body).forEach((value: any) => {
        if (!body[value]) {
            NextResponse.error();
        }
    });

    const tour = await prisma.tour.create({
        data: {
            title,
            description,
            imageSrc,
            category,
            depStart, 
            depEnd,
            operator,
            days,
            day1,
            day2,
            Day3,
            room: parseInt(save, 10),
            Day4,
            Day5,
            Day6,
            country,
            continent,
            Day7,
            Day8,
            Day9,
            Day10,
            Day11,
            Day12,
            Day13,
            Day14,
            Week3,
            Week4,
            week5,
            week6,
            Week7,
            ourLink,
            tripStyle,
            save: parseInt(save, 10),
            deal,
            counts,
            locs,
            overView,
            countries,
            locations,
            locStart,
            locEnd,
            itinery,
            roomCount,
            bathRoomCount,
            guestCount,
            locationValue: location.value,
            price: parseInt(price, 10),
            userId: currentUser.id
        }
    });

    return NextResponse.json(tour);
}

export async function GET(req:NextRequest, res:NextApiResponse) {

    try {
        
   
    // const { destination } = req.query;
  let countryValue = req.nextUrl.searchParams.get("country")
  let continentValue = req.nextUrl.searchParams.get('continent')

  let country= countryValue !== 'undefined' ? countryValue : '';
   let continent = continentValue !== 'undefined' ? continentValue : '';


  
   



    console.log("Country", country)
    console.log("continent", continent)
    let searchParams: any = {};

        // Remove the userId from the destructuring and handle it separately
       //const { userId: userIdParam, ...restParams } = params || {};
       if(country && country ==='all')
        {
            if (continent && continent!=='') {
                searchParams.continent =  continent.toLowerCase();
            }
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
        else 
        {

       
            if (continent && continent!=='') {
                searchParams.continent =  continent.toLowerCase();
            }


        if (country && country!=='') {
            searchParams.country =  country.toLowerCase();
        }

        console.log("Search params", searchParams)

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
} catch (error) {
       console.log("Error----  ", error) 
}
  }