import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUsers";
import prisma from "@/app/libs/prismadb";

interface IParams {
    userId?: string;
}

export async function DELETE(
    request: Request,
    {params} : {params : IParams}
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { userId } = params;

    if (!userId || typeof userId !== 'string') {
        throw new Error('Invalid ID');
    }

    const user = await prisma.user.deleteMany({
        where: {
            id: userId,
            // userId: currentUser.id
        }
    });

    return NextResponse.json(user)
}


export async function GET(
    request: Request,
    { params }: { params: IParams }
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { userId } = params;

    if (!userId || typeof userId !== 'string') {
        throw new Error('Invalid ID');
    }

    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    });
   

    if (!user) {
         return NextResponse.json({ message: "Internal Server Error" }, { status: 404 });
    }

    return NextResponse.json(user);
}
