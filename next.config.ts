import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  output: "standalone",
  images: {
    loader: "default",
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.eztek.net",
        port: "",
        pathname: "/Eztek/saladwill/",
      },
    ],
  },
};

export default nextConfig;
