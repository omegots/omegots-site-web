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
    // Sans 750 : à ~360–420 CSS px (DPR 1.75) le navigateur prend 640, pas 750.
    deviceSizes: [640, 828, 1080, 1200],
    imageSizes: [64, 96, 128, 256, 384],
  },
};

export default nextConfig;
