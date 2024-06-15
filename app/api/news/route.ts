import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUsers";
import prisma from '@/app/libs/prismadb'


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