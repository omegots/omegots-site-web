export type Reseau = {
  id: "instagram" | "facebook" | "whatsapp" | "email";
  nom: string;
  /** Ce qu'on y trouve, affiché sur la page Nous rejoindre. */
  texte: string;
  /** Lien à renseigner dès que l'association l'a communiqué. Vide : affiché sans lien. */
  href: string;
};

/** Réseaux de l'association : Instagram, Facebook, la chaîne WhatsApp et l'e-mail (cartes de la page Nous rejoindre). */
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
    nom: "Chaîne WhatsApp",
    texte: "Les prochaines dates en direct, pour ne rater aucune sortie.",
    href: "",
  },
  {
    id: "email",
    nom: "association.o.megots@gmail.com",
    texte: "Une question, une idée, un lieu à signaler : on vous répond.",
    href: "mailto:association.o.megots@gmail.com",
  },
];
