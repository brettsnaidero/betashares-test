import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/betashares-test",
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "instruments.wealth.betashares.com.au",
      },
      {
        protocol: "https",
        hostname: "powerful-oasis-c2085bc978.media.strapiapp.com",
      },
    ],
  },
};

export default nextConfig;
