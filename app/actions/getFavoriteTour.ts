import prisma from "@/app/libs/prismadb"

import getCurrentUser from "./getCurrentUsers";

export default async function getFavoriteListing() {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return [];
        }

        const favorites = await prisma.tour.findMany({
            where: {
                id: {
                    in: [...(currentUser.favoriteIds || [])]
                }
            }
        });

        const safeFavorites = favorites.map((favorite) => ({
            ...favorite,
            createAt: favorite.createAt.toISOString()
        }));

        return safeFavorites;
    } catch (error: any) {
        throw new Error(error)
    }
}