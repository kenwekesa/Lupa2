
import prisma from "@/app/libs/prismadb";

interface IParams {
    propertyId?: string;
}

export default async function getPropertyById(
    params: IParams
) {
    try {
        const { propertyId } = params;

        if (!propertyId) {
            throw new Error("offerId is required");
        }

        const property = await prisma.property.findUnique({
            where: {
                id: propertyId
            },
            include: {
                user: true
            }
        });

        if (!property) {
            return null;
        }

        return {
            ...property,
            createdAt: property.createdAt.toISOString(),
            user: {
                ...property.user,
                userType: property.user?.userType?.toString(),
                createdAt: property.user?.createdAt.toISOString(),
                updatedAt: property.user?.updatedAt.toISOString(),
                emailVerified: property.user?.emailVerified?.toISOString() || null,
            }
        };
    } catch (error: any) {
        throw new Error(error.message);
    }
}
