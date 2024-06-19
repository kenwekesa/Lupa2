import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb"
import getCurrentUser from "@/app/actions/getCurrentUsers";
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
        roomCount,
        bathRoomCount,
        bedRoomCount,
        toiletCount,
        county,
        category,
        town,
        size,
        deal,
        imageSrc,
        availability,
        type,
        parking_space,
        price,
        offerPrice,
        amenities,
        overview,
    } = body;

    Object.keys(body).forEach((value: any) => {
        if (!body[value]) {
            NextResponse.error();
        }
    });

    const property = await prisma.property.create({
        data: {
        title,
        roomCount,
        bathRoomCount,
        bedRoomCount,
        toiletCount,
        county,
        category,
        town,
        deal,
        size,
        imageSrc,
        availability,
        type,
        parking_space,
        amenities,
        overview,
        price: parseInt(price, 10),
        offerPrice: parseInt(offerPrice, 10),
        userId: currentUser.id
        }
    });

    return NextResponse.json(property);
}


export async function GET(req:NextRequest, res:NextApiResponse) {

    try {
        //const { searchParams } = new URL(req.nextUrl);  

    // const { destination } = req.query;
    let cityValue = req.nextUrl.searchParams.get("city")
    let countyValue = req.nextUrl.searchParams.get("county")
    let continentValue = req.nextUrl.searchParams.get('continent')
    let checkinDateValue = req.nextUrl.searchParams.get('checkinDate')
    let typeValue = req.nextUrl.searchParams.get('type')
    let checkoutDateValue = req.nextUrl.searchParams.get('checkoutDate')
  
    let county = countyValue !== 'undefined' ? countyValue : '';
    let type = typeValue !== 'undefined' ? typeValue : '';
    let city = cityValue !== 'undefined' ? cityValue : '';
    let checkinDate = checkinDateValue !== 'undefined' ? checkinDateValue : '';
    let checkoutDate = checkoutDateValue !== 'undefined' ? checkoutDateValue : '';

    console.log("----->", county)
    console.log("Country----->", county)
    console.log("checkinDate-->", checkinDate)
    console.log("checkoutDate-->", checkoutDate)
    let searchParamss: any = {};

        // Remove the userId from the destructuring and handle it separately
       //const { userId: userIdParam, ...restParams } = params || {};
       if(county && county ==='all')
        {
            
            const properties = await prisma.property.findMany({
                where: searchParamss,
                orderBy: {
                    createdAt: 'desc'
                }
            });
        
            const safeProperty = properties.map((property) => ({
                ...property,
                createAt: property.createdAt.toISOString(),
            }));
        
            return NextResponse.json(safeProperty);
        }
        else 
        {



        if (county && county!=='') {
            searchParamss.county =  county.toLowerCase();
        }
        if (type && type!=='') {
            searchParamss.type =  type;
        }

        console.log("Search params", searchParamss)

        // if (category) {
        //     query.category = category;
        // }
    
    const properties = await prisma.property.findMany({
        where: searchParamss,
        orderBy: {
            createdAt: 'desc'
        }
    });

    const safeProperty = properties.map((property) => ({
        ...property,
        createAt: property.createdAt.toISOString(),
    }));
    console.log("Back end listing---->", safeProperty)
    return NextResponse.json(safeProperty);
}
} catch (error) {
       console.log("Error----  ", error) 
}
}
