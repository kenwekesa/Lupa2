// import prisma from "@/app/libs/prismadb";

// interface IParams {
//     blogId?: string;
// }

// export default async function getNewsById(
//     params: IParams
// ) {
//     try {
//         const { blogId } = params;

//         const blog = await prisma.blog.findUnique({
//             where: {
//                 id: blogId
//             }
//         });

//         if (!blog) {
//             return null;
//         }

//         // Correct the property name to 'createdAt'
//         return {
//             ...blog,
//             createdAt: blog.createdAt.toISOString() // Fix the property name here
//         };
//     } catch (error: any) {
//         throw new Error(error);
//     }
// }


// import prisma from "@/app/libs/prismadb";

// interface IParams {
//     blogId: string; // Make blogId required
// }

// export default async function getNewsById(
//     params: IParams
// ) {
//     try {
//         const { blogId } = params;

//         // Check if blogId is provided
//         if (!blogId) {
//             throw new Error("Blog ID is required.");
           
//         }
//        console.log("Blog Id not found");
//         const blog = await prisma.blog.findUnique({
//             where: {
//                 id: blogId
//             }
//         });

//         if (!blog) {
//             return null;
//         }

//         // Correct the property name to 'createdAt'
//         return {
//             ...blog,
//             createdAt: blog.createdAt.toISOString() // Fix the property name here
//         };
//     } catch (error: any) {
//         throw new Error(error);
//     }
// }


import prisma from "@/app/libs/prismadb";

interface IParams {
    blogId?: string;
}

export default async function getNewsById(
    params: IParams
) {
    try {
        const { blogId } = params;

        // Check if blogId is provided and valid
        if (!blogId) {
            throw new Error("Blog ID is required.");
        }

        const blog = await prisma.blog.findUnique({
            where: {
                id: blogId
            }
        });

        if (!blog) {
            return null;
        }

        // Correct the property name to 'createdAt'
        return {
            ...blog,
            createdAt: blog.createdAt.toISOString() // Fix the property name here
        };
    } catch (error: any) {
        // Handle PrismaClientKnownRequestError separately
        if (error.code === 'P2025') {
            throw new Error(`Blog with ID ${params.blogId} not found.`);
        }
        throw new Error(error);
    }
}
