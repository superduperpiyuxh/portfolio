import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async rewrites() {
    return [
      { source: "/castle", destination: "/castle/index.html" },
    ]
  },
};

export default nextConfig;
