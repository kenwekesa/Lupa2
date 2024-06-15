import bcrypt from 'bcrypt'
import prisma from '@/app/libs/prismadb'
import { NextResponse } from 'next/server';

export async function POST(
    request: Request
) {
    const body = await request.json();
    const {
        email,
        name,
        country,
        contact,
        password,
        userType,
        image,
    } = body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
        data: {
            email,
            name,
            country, 
            contact,
            image,
            hashedPassword,
            userType
        }
    });

    return NextResponse.json(user);
}