import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Sortie autonome pour l'image Docker (Dokploy) : server.js + le strict nécessaire.
  output: "standalone",

  experimental: {
    // Charge seulement les modules Motion réellement importés (bundle client plus léger).
    optimizePackageImports: ["motion", "motion/react"],
  },

  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    qualities: [60, 65, 75],
    // Tailles serrées pour le mobile (évite de servir du 1080+ pour ~400 px).
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [64, 96, 128, 256, 384],
  },
};

export default nextConfig;
