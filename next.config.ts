import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Oak National Academy's Cloudinary subdomain
      {
        protocol: 'https',
        hostname: 'cloudinary-res.thenational.academy',
        port: '',
        pathname: '/image/upload/**',
      },
      // Standard Cloudinary domain (used by Oak for some assets)
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
      // Oak video thumbnails and assets
      {
        protocol: 'https',
        hostname: '*.thenational.academy',
        port: '',
        pathname: '/**',
      },
      // Mux video thumbnails (Oak uses Mux for video streaming)
      {
        protocol: 'https',
        hostname: 'image.mux.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
