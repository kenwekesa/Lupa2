// import { IUsersParams } from "@/app/actions/getClients";
// import getUsers from "@/app/actions/getUsers";
 import getCurrentUser from '@/app/actions/getCurrentUsers';
import prisma from '@/app/libs/prismadb';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

// import { NextApiRequest, NextApiResponse } from "next";

// export async function GET(req:NextApiRequest, res:NextApiResponse) {

//     if (req.method === 'GET') {
//       try {
//         const {
//             id,
//             name,
//             email,
//             userType
//         } = req.body || {};

//         let query: any = {};

//         if (id) {
//             query.id = id;
//         }

//         if (name) {
//             query.name = name;
//         }

//         if (email) {
//             query.email = email;
//         }

//         if (userType === "client") {
//             query.userType = "client";
//         }

//         // ... (other filters)...
        
//         const users = await prisma.user.findMany({
//             where: query,
//             // orderBy: {
//             //     createAt: 'desc'
//             // }
//         });

//         const safeUsers = users.map((user: any) => ({
//             ...user,
//             // createAt: user.createAt.toISOString(),
//         }));

//         console.log("Users from backend", safeUsers)
//         return safeUsers;
//     } catch (error: any) {
//         throw new Error(error);
//     }
// } else {
//     res.status(405).json({ message: 'Method Not Allowed' }); // Handle unsupported methods
//   }
// }



import { getServerSession } from 'next-auth/next';
import { NextRequest, NextResponse } from 'next/server';

// export async function getSession() {
//     return await getServerSession(authOptions)
// }

export async function GET(req: NextRequest) {
 
    
    console.log("Back end reached....")
    try {
            const currentUser = await getCurrentUser()
            console.log("current userrrr---", currentUser)
    //  const session = await getServerSession({ req, ...authOptions });
    
    //        if (!session?.user?.email) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }
    
    //         const currentUser = await prisma.user.findUnique({
    //             where: {
    //                 email: session.user.email as string
    //             }
    //         })
    
    //        if (!currentUser) {
    //           return NextResponse.json({ error: 'User not found' }, { status: 404 });
    // }
    
         return NextResponse.json(currentUser);
        } catch (error: any) {
            console.log(error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
        }
        // try {
        //     const { id, name, email, userType } = req.query;

        //     let query: any = {};

        //     if (id) {
        //         query.id = Number(id);
        //     }

        //     if (name) {
        //         query.name = String(name);
        //     }

        //     if (email) {
        //         query.email = String(email);
        //     }

        //     if (userType === 'client') {
        //         query.userType = 'client';
        //     }

        //     // ... (other filters)...

        //     const users = await prisma.user.findMany({
        //         where: query,
        //         // orderBy: {
        //         //     createAt: 'desc'
        //         // }
        //     });

        //     const safeUsers = users.map((user: any) => ({
        //         ...user,
        //         // createAt: user.createAt.toISOString(),
        //     }));

        //     console.log('Users from backend', safeUsers);
        //     res.status(200).json(safeUsers);
        // } catch (error) {
        //     console.error('An error occurred:', error);
        //     res.status(500).json({ error: 'An error occurred' });
        // }


     
}
