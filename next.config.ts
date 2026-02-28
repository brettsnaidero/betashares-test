import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
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
