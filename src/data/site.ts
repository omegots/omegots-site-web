/**
 * Identité du site pour les métadonnées, le sitemap et robots.txt.
 * Domaine de référence : omegots.fr (hébergement final chez l'association).
 * Sur la démo Dokploy, poser SITE_NOINDEX=1 : robots noindex + robots.txt bloquant,
 * pour que la démo ne prenne pas la place du vrai site dans les moteurs.
 */
export const SITE_URL = "https://omegots.fr";

export const NOINDEX = process.env.SITE_NOINDEX === "1";

/** Pages publiques, avec la fréquence de mise à jour attendue et leur poids relatif. */
export const PAGES: { path: string; changeFrequency: "weekly" | "monthly" | "yearly"; priority: number }[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/ramassages", changeFrequency: "weekly", priority: 0.9 },
  { path: "/rejoindre", changeFrequency: "monthly", priority: 0.9 },
  { path: "/le-megot", changeFrequency: "monthly", priority: 0.8 },
  { path: "/recyclage", changeFrequency: "monthly", priority: 0.7 },
  { path: "/association", changeFrequency: "monthly", priority: 0.7 },
  { path: "/jeu", changeFrequency: "yearly", priority: 0.3 },
  { path: "/mentions-legales", changeFrequency: "yearly", priority: 0.1 },
];
