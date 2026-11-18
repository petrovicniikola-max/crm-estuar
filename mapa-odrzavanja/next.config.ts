import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Docker/Pi: /mapa. Lokalni root: NEXT_PUBLIC_BASE_PATH=
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "/mapa",
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
