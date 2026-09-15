export type ArticlePresse = {
  media: string;
  title: string;
  href: string;
  /** Fragments du titre à surligner (chiffres clés), tels qu'ils apparaissent dans le titre. */
  highlights: string[];
};

/** Articles « Ils parlent de nous », repris du site actuel omegots.fr */
export const articlesPresse: ArticlePresse[] = [
  {
    media: "Saint-Nazaire News",
    title:
      "Mégothon de Saint-Nazaire : 6 litres de mégots récoltés en 2h, de la mairie au Paquebot",
    href: "https://www.saintnazairenews.fr/news/megothon-de-saint-nazaire-6-litres-de-megots-recoltes-en-2h-de-la-mairie-au-paquebot",
    highlights: ["6 litres", "2h"],
  },
  {
    media: "Saint-Nazaire News",
    title:
      "Saint-Nazaire : 2 jeunes créent une association pour lutter contre la pollution des mégots",
    href: "https://www.saintnazairenews.fr/news/saint-nazaire-2-jeunes-creent-une-association-pour-lutter-contre-la-pollution-des-megots",
    highlights: ["2 jeunes"],
  },
  {
    media: "Ouest-France",
    title:
      "Malgré les cendriers, à Saint-Nazaire, des mégots plein les trottoirs et les rues",
    href: "https://www.ouest-france.fr/pays-de-la-loire/saint-nazaire-44600/malgre-les-cendriers-a-saint-nazaire-des-megots-plein-les-trottoirs-et-les-rues-5bd94d56-34be-11f1-aa8d-862764c4f0ec",
    highlights: ["cendriers"],
  },
];
