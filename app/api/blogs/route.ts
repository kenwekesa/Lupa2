import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb"
import getCurrentUser from "@/app/actions/getCurrentUsers";


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
        hotelLink,
        subtitle,
        descriptionone,
        subtitleone,
        descriptiontwo,
        subtitletwo,
        descriptionthree,
        subtitlethree,
        descriptionfour,
        subtitlefour,
        descriptionfive,
    } = body;

    Object.keys(body).forEach((value: any) => {
        if (!body[value]) {
            NextResponse.error();
        }
    });

    const blog = await prisma.blog.create({
        data: {
            title,
            description,
            imageSrc,
            category,
            hotelLink,
            subtitle,
            descriptionone,
            subtitleone,
            descriptiontwo,
            subtitletwo,
            descriptionthree,
            subtitlethree,
            descriptionfour,
            subtitlefour,
            descriptionfive,
        }
    });

    return NextResponse.json(blog);
}