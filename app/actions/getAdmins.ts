import prisma from '@/app/libs/prismadb';

export interface IAdminsParams {
    id?: string; // Making id optional
    name?: string;
    email?: string;
    userType?: string;
}

export default async function getAdmins(params: IAdminsParams) {
    try {
        const {
            id,
            name,
            email,
            userType
        } = params || {};

        let query: any = {};

        if (id) {
            query.id = id;
        }

        if (name) {
            query.name = name;
        }

        if (email) {
            query.email = email;
        }

        if (userType === "admin") {
            query.userType = "admin";
        }

        // ... (other filters)

        const users = await prisma.user.findMany({
            where: query,
            // orderBy: {
            //     createAt: 'desc'
            // }
        });

        const safeUsers = users.map((user) => ({
            ...user,
            // createAt: user.createAt.toISOString(),
        }));

        return safeUsers;
    } catch (error: any) {
        throw new Error(error);
    }
}
