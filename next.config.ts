import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Sortie autonome pour l'image Docker (Dokploy) : server.js + le strict nécessaire.
  output: "standalone",

  env: {
    // Date du build (heure de Paris), pour masquer une « prochaine sortie » déjà
    // passée sans que le serveur et le navigateur ne divergent (src/data/ramassages.ts).
    DATE_BUILD: new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Paris" }).format(new Date()),
  },

  experimental: {
    // Charge seulement les modules Motion réellement importés (bundle client plus léger).
    optimizePackageImports: ["motion", "motion/react"],
    // Pas d'inlineCss : ~14 Ko de CSS dans chaque HTML dégrade le TTFB / LCP
    // sur Slow 4G (score redescendu de 94 à 92). Le <link> CSS reste cacheable.
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
