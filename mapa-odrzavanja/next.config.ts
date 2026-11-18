import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Na Pi se mapa služi na :3847 u root-u (bez /mapa basePath)
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
