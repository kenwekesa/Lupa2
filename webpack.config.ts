// next.config.ts

import { Configuration } from 'webpack';
import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack: (config: Configuration, { isServer }: { isServer: boolean }): Configuration => {
    if (config.module) {
      // Add HTML loader for handling HTML files
      config.module.rules.push({
        test: /\.html$/,
        use: 'html-loader',
      });
    }

    return config;
  },
};

export default nextConfig;
