import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Silence monorepo lockfile warning when `npm run build` is run from this directory.
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
