import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/castle", destination: "/castle/index.html" },
    ]
  },
};

export default nextConfig;
