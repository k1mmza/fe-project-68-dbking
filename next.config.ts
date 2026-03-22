import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cedt-be-for-fe-proj.vercel.app',
        port: '',
        pathname: '/**', // This allows all image paths from this host
      },
    ],
  },
  /* You can add other config options like rewrites or redirects here if needed */
};

export default nextConfig;