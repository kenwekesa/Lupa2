
import prisma from "@/app/libs/prismadb";

interface IParams {
    landId?: string;
}

export default async function getLandById(
    params: IParams
) {
    try {
        const { landId } = params;

        if (!landId) {
            throw new Error("landId is required");
        }

        const land = await prisma.land.findUnique({
            where: {
                id: landId
            },
            include: {
                user: true
            }
        });

        if (!land) {
            return null;
        }

        return {
            ...land,
            createdAt: land.createdAt.toISOString(),
            user: {
                ...land.user,
                userType: land.user?.userType?.toString(),
                createdAt: land.user?.createdAt.toISOString(),
                updatedAt: land.user?.updatedAt.toISOString(),
                emailVerified: land.user?.emailVerified?.toISOString() || null,
            }
        };
    } catch (error: any) {
        throw new Error(error.message);
    }
}
