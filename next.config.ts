import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
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
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
        ],
      },
      {
        source: '/:path*.rsc',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' },
        ],
      },
    ];
  },
};

export default nextConfig;
