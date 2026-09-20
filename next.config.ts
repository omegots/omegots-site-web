import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Sortie autonome pour l'image Docker (Dokploy) : server.js + le strict nécessaire.
  output: "standalone",

  images: {
    // AVIF d'abord (20 % plus léger que WebP), WebP en repli. Le premier encodage
    // est plus lent, puis l'image reste en cache un an : les photos ne changent pas.
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    // Next 16 n'accepte que les qualités listées : 65 pour les photos, 75 par défaut.
    qualities: [65, 75],
  },

};

export default nextConfig;
