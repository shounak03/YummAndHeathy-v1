import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    
};

module.exports = {
  ...nextConfig,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/a/**',
      },
    ],
  },

}

export default nextConfig;
