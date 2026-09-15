import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Sortie autonome pour l'image Docker (Dokploy) : server.js + le strict nécessaire.
  output: "standalone",
};

export default nextConfig;
