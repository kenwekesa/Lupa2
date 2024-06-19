import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUsers";
import prisma from "@/app/libs/prismadb";

interface IParams {
    offerId?: string;
}

export async function DELETE(
    request: Request,
    {params} : {params : IParams}
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { offerId } = params;

    if (!offerId || typeof offerId !== 'string') {
        throw new Error('Invalid ID');
    }

    const listing = await prisma.offers.deleteMany({
        where: {
            id: offerId,
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

    const { offerId } = params;

    if (!offerId || typeof offerId !== 'string') {
        throw new Error('Invalid ID');
    }

    const listing = await prisma.offers.findUnique({
        where: {
            id: offerId
        }
    });
   

    if (!listing) {
         return NextResponse.json({ message: "Internal Server Error" }, { status: 404 });
    }

    return NextResponse.json(listing);
}
