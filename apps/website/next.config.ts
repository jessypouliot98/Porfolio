import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
      },
    ],
  },
  redirects: () => Promise.resolve([
    {
      source: "/projects",
      destination: "/#projects",
      permanent: false,
    }
  ])
};

const withVercelToolbar = require('@vercel/toolbar/plugins/next')();

export default withVercelToolbar(nextConfig);
