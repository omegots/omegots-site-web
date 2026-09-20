import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Sortie autonome pour l'image Docker (Dokploy) : server.js + le strict nécessaire.
  output: "standalone",

  experimental: {
    // Charge seulement les modules Motion réellement importés (bundle client plus léger).
    optimizePackageImports: ["motion", "motion/react"],
    // CSS dans le HTML : supprime la requête render-blocking (~300 ms sur Slow 4G).
    inlineCss: true,
  },

  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    qualities: [55, 60, 65, 75],
    // 384 pour mosaïque ~376 CSS px ; 640 reste pour le hero.
    deviceSizes: [384, 640, 828, 1080, 1200],
    imageSizes: [64, 96, 128, 256, 384],
  },
};

export default nextConfig;
