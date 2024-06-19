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
    days,
    action,
    category,
    type,
    town,
    county, 
    subtitle,
    inclusion,
    imageSrc,
    price,
    offerprice,
    } = body;

    Object.keys(body).forEach((value: any) => {
        if (!body[value]) {
            NextResponse.error();
        }
    });

    const offer = await prisma.offers.create({
        data: {
            title,
            days,
            action,
            category,
            type,
            subtitle,
            inclusion,
            imageSrc,
            town, 
            county,
            price: parseInt(price, 10),
            offerprice: parseInt(offerprice, 10),
            userId: currentUser.id
        }
    });

    return NextResponse.json(offer);
}

export async function GET(req:NextRequest, res:NextApiResponse) {

    try {
        //const { searchParams } = new URL(req.nextUrl);  

    // const { destination } = req.query;
    let userIdValue = req.nextUrl.searchParams.get("userId")
    let categoryValue = req.nextUrl.searchParams.get("category")
    
  
    let userId= userIdValue !== 'undefined' ? userIdValue : '';
    let category = categoryValue !== 'undefined' ? categoryValue : '';
    

    let query: any = {};

    // Use optional chaining to handle null or undefined userId
    if (userId !== null && userId !== undefined) {
      query.userId = userId;
    }

    if (category) {
      query.category = category;
    }

    const offers = await prisma.offers.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc',
      },
    });

    const safeOffer = offers.map((offer) => ({
      ...offer,
      createdAt: offer.createdAt.toISOString(),
    }));

    // return safeOffer;
    return NextResponse.json(safeOffer);
  } catch (error: any) {
    throw new Error(error.message);
  }
}