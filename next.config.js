/** @type {import('next').NextConfig} */
const nextConfig = {
reactStrictMode: true,
  env: {
    NEXTAUTH_SECRET:"/Eg1kdPxQf9mnvVYz+zkQpcbdBy72T80nOvS/jF3I+8=",
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                port: '',
                pathname: '/**',
            }, 
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                port: '',
                pathname: '/**',
            }, 
            {
                protocol: 'https',
                hostname: 'www.google.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'unsplash.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'media.istockphoto.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    }, 
    eslint: {
        dirs: ['app','utils'], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
    },


//     webpack(config, { buildId, dev, isServer, defaultLoaders, webpack }) {
//     config.plugins.push(
//       new webpack.IgnorePlugin({
//         resourceRegExp: /DynamicServerError/,
//       })
//     );
//     return config;
    //    },
    
// output: 'export',
    
}

module.exports = nextConfig


// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     reactStrictMode: true,
//     env: {
//         NEXTAUTH_SECRET: "/Eg1kdPxQf9mnvVYz+zkQpcbdBy72T80nOvS/jF3I+8=",
//     },
//     images: {
//         remotePatterns: [
//             {
//                 protocol: 'https',
//                 hostname: 'lh3.googleusercontent.com',
//                 port: '',
//                 pathname: '/**',
//             },
//             {
//                 protocol: 'https',
//                 hostname: 'res.cloudinary.com',
//                 port: '',
//                 pathname: '/**',
//             },
//             {
//                 protocol: 'https',
//                 hostname: 'images.unsplash.com',
//                 port: '',
//                 pathname: '/**',
//             },
//             {
//                 protocol: 'https',
//                 hostname: 'www.google.com',
//                 port: '',
//                 pathname: '/**',
//             },
//             {
//                 protocol: 'https',
//                 hostname: 'unsplash.com',
//                 port: '',
//                 pathname: '/**',
//             },
//             {
//                 protocol: 'https',
//                 hostname: 'media.istockphoto.com',
//                 port: '',
//                 pathname: '/**',
//             },
//         ],
//     },
//     typescript: {
//         ignoreBuildErrors: true,
//     },
//     eslint: {
//         dirs: ['app', 'utils'],
//     },
//     output: 'export',
//     middleware: (handler) => {
//         // Convert middleware function to match Next.js middleware signature
//         return async (req, res) => {
//             await middleware({ nextUrl: { pathname: req.url }, url: req.url });
//             return handler(req, res);
//         };
//     },
// };

// module.exports = nextConfig;


// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   env: {
//     NEXTAUTH_SECRET: "/Eg1kdPxQf9mnvVYz+zkQpcbdBy72T80nOvS/jF3I+8=",
//   },
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'lh3.googleusercontent.com',
//         port: '',
//         pathname: '/**',
//       },
//       {
//         protocol: 'https',
//         hostname: 'res.cloudinary.com',
//         port: '',
//         pathname: '/**',
//       },
//       {
//         protocol: 'https',
//         hostname: 'images.unsplash.com',
//         port: '',
//         pathname: '/**',
//       },
//       {
//         protocol: 'https',
//         hostname: 'www.google.com',
//         port: '',
//         pathname: '/**',
//       },
//       {
//         protocol: 'https',
//         hostname: 'unsplash.com',
//         port: '',
//         pathname: '/**',
//       },
//       {
//         protocol: 'https',
//         hostname: 'media.istockphoto.com',
//         port: '',
//         pathname: '/**',
//       },
//     ],
//   },
//   typescript: {
//     ignoreBuildErrors: true,
//   },
//   eslint: {
//     dirs: ['app', 'utils'],
//   },
//   async headers() {
//     return [
//       {
//         // Disable caching for specific API route
//         source: "/api/listings/[listingId]",
//         headers: [
//           {
//             key: "Cache-Control",
//             value: "no-store, max-age=0",
//           },
//         ],
//       },
//     ];
//   },
//   // If you're using Next.js 11 or above
//   experimental: {
//     disableStaticImages: true,
//     disableStaticFonts: true,
//     disableStaticImages: true,
//     disableStaticPreview: true,
//   },
//   // Maintain output: 'export'
//   output: 'export',
// };

// module.exports = nextConfig;

