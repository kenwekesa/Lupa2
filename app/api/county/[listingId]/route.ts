import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUsers";
import prisma from "@/app/libs/prismadb";

interface IParams {
    countyId?: string;
}

export async function DELETE(
    request: Request,
    {params} : {params : IParams}
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { countyId } = params;

    if (!countyId || typeof countyId !== 'string') {
        throw new Error('Invalid ID');
    }

    const counties = await prisma.county.deleteMany({
        where: {
            id: countyId,
            userId: currentUser.id
        }
    });

    return NextResponse.json(counties)
}


export async function GET(
    request: Request,
    { params }: { params: IParams }
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { countyId } = params;

    if (!countyId || typeof countyId !== 'string') {
        throw new Error('Invalid ID');
    }

    const counties = await prisma.county.findUnique({
        where: {
            id: countyId
        }
    });
   

    if (!counties) {
         return NextResponse.json({ message: "Internal Server Error" }, { status: 404 });
    }

    return NextResponse.json(counties);
}
