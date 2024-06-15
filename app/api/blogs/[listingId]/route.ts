import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUsers";
import prisma from "@/app/libs/prismadb";

interface IParams {
    blogId?: string;
}

export async function DELETE(
    request: Request,
    {params} : {params : IParams}
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { blogId } = params;

    if (!blogId || typeof blogId !== 'string') {
        throw new Error('Invalid ID');
    }

    const listing = await prisma.blog.deleteMany({
        where: {
            id: blogId,
            // userId: currentUser.id
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

    const { blogId } = params;

    if (!blogId || typeof blogId !== 'string') {
        throw new Error('Invalid ID');
    }

    const listing = await prisma.blog.findUnique({
        where: {
            id: blogId
        }
    });
   

    if (!listing) {
         return NextResponse.json({ message: "Internal Server Error" }, { status: 404 });
    }

    return NextResponse.json(listing);
}
