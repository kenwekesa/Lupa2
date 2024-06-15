import prisma from '@/app/libs/prismadb';

export interface IUsersParams {
    id?: string; // Making id optional
    name?: string;
    email?: string;
    userType?: string;
}

export default async function getOperators(params: IUsersParams) {
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

        if (userType === "operator") {
            query.userType = "operator";
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
