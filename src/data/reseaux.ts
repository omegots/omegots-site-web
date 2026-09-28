export type Reseau = {
  id: "instagram" | "facebook" | "whatsapp";
  nom: string;
  /** Ce qu'on y trouve, affiché sur la page Nous rejoindre. */
  texte: string;
  /** Lien à renseigner dès que l'association l'a communiqué. Vide : affiché sans lien. */
  href: string;
};

/** Réseaux de l'association : Instagram, Facebook et la communauté WhatsApp. */
export const reseaux: Reseau[] = [
  {
    id: "instagram",
    nom: "Instagram",
    texte: "Les photos des sorties et les chiffres, au fil des ramassages.",
    href: "https://www.instagram.com/asso.omegots/",
  },
  {
    id: "facebook",
    nom: "Facebook",
    texte: "Les annonces, les événements et les articles qui parlent de nous.",
    href: "",
  },
  {
    id: "whatsapp",
    nom: "Communauté WhatsApp",
    texte: "Les prochaines dates en direct, pour ne rater aucune sortie.",
    href: "",
  },
];
