import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/app/libs/prismadb"

export async function getSession() {
    return await getServerSession(authOptions)
}

export default async function getCurrentUser() {
    try {
        const session = await getSession();

        if (!session?.user?.email) {
            return null;
        }

        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email as string
            }
        })

        if (!currentUser) {
            return null;
        }

        return currentUser;
    } catch (error: any) {
        return null;
    }
}

export const dynamic = process.env.NODE_ENV === "production" ? 'auto' : 'force-dynamic';


// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/pages/api/auth/[...nextauth]";
// import prisma from "@/app/libs/prismadb";

// // Function to retrieve session data
// export async function getSession() {
//   return await getServerSession(authOptions);
// }

// // Function to retrieve the current user, handling potential errors
// export default async function getCurrentUser() {
//   try {
//     const session = await getSession();

//     // Check for session validity and user email
//     if (!session?.user?.email) {
//       return null;
//     }

//     const currentUser = await prisma.user.findUnique({
//       where: {
//         email: session.user.email as string,
//       },
//     });

//     if (!currentUser) {
//       return null;
//     }

//     // Return the current user if found
//     return currentUser;
//   } catch (error) {
//     // Handle errors gracefully
//     console.error("Error fetching current user:", error);
//     // Optionally implement additional error handling logic here
//     return null;
//   }
// }

// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/pages/api/auth/[...nextauth]";
// import prisma from "@/app/libs/prismadb";

// export async function getSession() {
//   return await getServerSession(authOptions);
// }

// export default async function getCurrentUser() {
//   try {
//     const session = await getSession();

//     console.log("Session:", session);

//     if (!session?.user?.email) {
//       console.log("Session user email not found");
//       return null;
//     }

//     const currentUser = await prisma.user.findUnique({
//       where: {
//         email: session.user.email as string,
//       },
//     });

//     console.log("Current User:", currentUser);

//     if (!currentUser) {
//       console.log("Current user not found in database");
//       return null;
//     }

//     return currentUser;
//   } catch (error) {
//     console.error("Error fetching current user:", error);
//     // Handle error gracefully
//     return null;
//   }
// }


