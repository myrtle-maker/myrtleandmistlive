import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Allow images from external sources used in the app
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
