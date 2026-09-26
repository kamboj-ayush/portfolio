import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/projects/:slug',
        destination: '/projects',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
