import type { Metadata } from "next";

/** Visuel de partage commun (1200 × 630), dans public/reseaux. */
export const OG_IMAGE = {
  url: "/reseaux/og-partage-1200x630.png",
  width: 1200,
  height: 630,
  alt: "O'Mégots, association de ramassage de mégots à Saint-Nazaire",
};

type PageSeo = {
  /** Chemin canonique de la page, « / » pour l'accueil. */
  path: string;
  /** Balise <title>, 60 caractères au plus. */
  title: string;
  /** Meta description, 155 caractères au plus (au-delà, Google la coupe). */
  description: string;
  /** Titre de partage, s'il doit différer du <title>. */
  ogTitle?: string;
  robots?: Metadata["robots"];
};

/**
 * Métadonnées d'une page : title, description, canonique, Open Graph et carte
 * Twitter propres à la page. Sans cela, Next reprend l'openGraph du layout tel
 * quel et toutes les pages partagent le même titre et la même description.
 */
export function pageMetadata({ path, title, description, ogTitle, robots }: PageSeo): Metadata {
  const titrePartage = ogTitle ?? title;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: titrePartage,
      description,
      url: path,
      siteName: "O'Mégots",
      images: [OG_IMAGE],
      type: "website",
      locale: "fr_FR",
    },
    twitter: {
      card: "summary_large_image",
      title: titrePartage,
      description,
      images: [OG_IMAGE.url],
    },
    ...(robots ? { robots } : {}),
  };
}
