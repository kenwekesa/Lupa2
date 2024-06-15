import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// import primsa from '@/app/libs/prismadb';
import prisma from "@/app/libs/prismadb";
import CredentialsProviders from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions: AuthOptions = {
  // Use PrismaAdapter with the Prisma instance for session management
  adapter: PrismaAdapter(prisma),

  // Authentication providers for various strategies
  providers: [
    // Google OAuth provider configuration
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    // Custom credentials provider for email/password authentication
    CredentialsProviders({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      // Authorization function for handling email/password authentication
      async authorize(credentials) {
        // Check if email and password are provided
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        // Retrieve user information from the database based on the provided email
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        // Check if the user or hashedPassword is not available
        if (!user || !user?.hashedPassword) {
          throw new Error("Invalid credentials");
        }

        // Compare the provided password with the hashed password stored in the database
        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        // If the password is incorrect, throw an error
        if (!isCorrectPassword) {
          throw new Error("Incorrect credentials");
        }

        console.log(user)
        // Return the user information if authentication is successful
        return user;
      },
    }),
  ],

  // Secret used for signing cookies and tokens
  secret: process.env.NEXTAUTH_SECRET as string,

  // Customization of authentication pages, in this case, redirect to the home page for signIn
  pages: {
    signIn: "/",
  },

  // Enable debugging in development environment
  debug: process.env.NODE_ENV === "development",

  // Configuration for session handling using JWT
  session: {
    strategy: "jwt",
  },

  jwt: {
    // The secret used to sign and verify JWT tokens
    secret: process.env.NEXTAUTH_SECRET,

    // The amount of time (in seconds) before a JWT token expires
    maxAge: 30 * 24 * 60 * 60, // 30 days

    // The encryption algorithm used to sign JWT tokens
  },

  
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          // Add relevant user details (excluding sensitive data) to the token
          token.userData = {
            id: user.id,
            name: user.name,
            email: user.email, // Consider omitting email for enhanced security
            // Add other non-sensitive details as needed
          };
        }
        return token;
      },
  },
};

console.log("NextAuth Secret:", process.env.NEXTAUTH_SECRET);

// Initialize NextAuth with the specified configuration options
export default NextAuth(authOptions);

// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import NextAuth, { AuthOptions } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// // import primsa from '@/app/libs/prismadb';
// import prisma from "@/app/libs/prismadb";
// import CredentialsProviders from "next-auth/providers/credentials";
// import bcrypt from 'bcrypt'



// export const authOptions: AuthOptions = {
//     // Use PrismaAdapter with the Prisma instance for session management
//     adapter: PrismaAdapter(prisma), 
    
//     // Authentication providers for various strategies
//     providers: [
//         // Google OAuth provider configuration
//         GoogleProvider({
//             clientId: process.env.GOOGLE_CLIENT_ID as string,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//         }),
        
//         // Custom credentials provider for email/password authentication
//         CredentialsProviders({
//             name: 'credentials',
//             credentials: {
//                 email: { label: 'email', type: 'text' },
//                 password: { label: 'password', type: 'password' },
//             },
//             // Authorization function for handling email/password authentication
//             async authorize(credentials) {
//                 // Check if email and password are provided
//                 if (!credentials?.email || !credentials?.password) {
//                     throw new Error('Invalid credentials');
//                 }

//                 // Retrieve user information from the database based on the provided email
//                 const user = await prisma.user.findUnique({
//                     where: {
//                         email: credentials.email
//                     }
//                 });

//                 // Check if the user or hashedPassword is not available
//                 if (!user || !user?.hashedPassword) {
//                     throw new Error('Invalid credentials');
//                 }

//                 // Compare the provided password with the hashed password stored in the database
//                 const isCorrectPassword = await bcrypt.compare(
//                     credentials.password,
//                     user.hashedPassword
//                 );

//                 // If the password is incorrect, throw an error
//                 if (!isCorrectPassword) {
//                     throw new Error('Incorrect credentials');
//                 }

//                 // Return the user information if authentication is successful
//                 // return user;
//                 return user
//             }
//         })
//     ],

//     // Secret used for signing cookies and tokens
//     secret: process.env.NEXTAUTH_SECRET as string,

    
    
//     // Customization of authentication pages, in this case, redirect to the home page for signIn
//     pages: {
//         signIn: '/',
//     },

//     // Enable debugging in development environment
//     debug: process.env.NODE_ENV === 'development',
    
//     // Configuration for session handling using JWT
    
//     session: {
//         strategy: 'jwt',
        
        
//     },

//     jwt: {
//         // The secret used to sign and verify JWT tokens
//         secret: process.env.NEXTAUTH_SECRET,
      
//         // The amount of time (in seconds) before a JWT token expires
//         maxAge: 30 * 24 * 60 * 60, // 30 days
      
//         // The encryption algorithm used to sign JWT tokens
//       },
     
    
    

// }
// console.log("NextAuth Secret:", process.env.NEXTAUTH_SECRET);

// //Initialize NextAuth with the specified configuration options
// export default NextAuth(authOptions)


// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import NextAuth, { AuthOptions, DefaultUser } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import prisma from "@/app/libs/prismadb";
// import CredentialsProviders from "next-auth/providers/credentials";
// import bcrypt from 'bcrypt'
// import { JWTEncodeParams } from "next-auth/jwt"
// import { JWT } from "next-auth/jwt";




// callbacks: {
//     async session({ session, token }) {
//         session.user.role = token.role;
//         return session;
//       },
//       async jwt({ token, user }) {
//         if (user) {
//           token.role = user.userType;
//         }
//         return token;
//       },
//       async signIn({ user, account, profile, email, credentials }) {
//         const userFromDB = await prisma.user.findUnique({
//           where: { email: user.email },
//         });
  
//         if (userFromDB) {
//           user.role = userFromDB.userType;
//         }
  
//         return true;
//       },

    
//   }

// interface User extends DefaultUser {
//     user_type: string;
//   }

// interface JWTEncodeParamsWithUser extends JWTEncodeParams {
//     user: User;
//     token: JWT,
//   }
// export const authOptions: AuthOptions = {
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//     }),
//     CredentialsProviders({
//       name: 'credentials',
//       credentials: {
//         email: { label: 'email', type: 'text' },
//         password: { label: 'password', type: 'password' },
//       },
//       async authorize(credentials) {
//         // Check if email and password are provided
//         if (!credentials?.email || !credentials?.password) {
//             throw new Error('Invalid credentials');
//         }

//         // Retrieve user information from the database based on the provided email
//         const user = await prisma.user.findUnique({
//             where: {
//                 email: credentials.email
//             }
//         });

//         // Check if the user or hashedPassword is not available
//         if (!user || !user?.hashedPassword) {
//             throw new Error('Invalid credentials');
//         }

//         // Compare the provided password with the hashed password stored in the database
//         const isCorrectPassword = await bcrypt.compare(
//             credentials.password,
//             user.hashedPassword
//         );

//         // If the password is incorrect, throw an error
//         if (!isCorrectPassword) {
//             throw new Error('Incorrect credentials');
//         }

//         // Return the user information if authentication is successful
//         return user;

        
//       }
//     })
//   ],
//   secret: process.env.NEXTAUTH_SECRET as string,
//   pages: {
//     signIn: '/',
//   },
//   debug: process.env.NODE_ENV === 'development',
//   session: {
//     strategy: 'jwt',
//   },
//   jwt: {
//     // Customize the JWT payload
//     encode: async ({ token, user }: JWTEncodeParamsWithUser) => {
//         if (user) {
//           token.role = (user as User).user_type; // Add the role to the token
//         }
//         return Promise.resolve(JSON.stringify(token)); // Stringify the token and return a Promise<string>
//       },
//   },
//   callbacks: {
//     // Customize the session object
//     session: async ({ session, token }) => {
//       if (token.user_type) {
//         session.user.user_type = token.user_type || ""; // Add the role to the session
//       }
//       return session;
//     },
//   },
// }

// export default NextAuth(authOptions)