import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? "/betashares-test" : "",
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
