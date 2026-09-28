import type { FaqItem } from "@/data/faq";

/**
 * Contenus de la page « L'association » : tout vient de l'ancien site omegots.fr
 * (mission, valeurs, contact, mentions légales), fautes corrigées et « de 7 à
 * 77 ans » remplacé par « à tout âge », comme demandé.
 */

/** Ce que fait l'association, texte de l'ancien site. */
export const actions = [
  {
    id: "ramassages",
    titre: "Ramassages ponctuels",
    texte:
      "Des sorties organisées dans les rues, parcs, espaces verts et zones naturelles de Saint-Nazaire et ses environs. Ouvertes à toutes et tous.",
    lien: { href: "/ramassages", label: "Nos ramassages" },
  },
  {
    id: "donnees",
    titre: "Collecte des données",
    texte:
      "En plus du ramassage, notre objectif est de créer un suivi local pour faire prendre conscience de la quantité de mégots jetés dans nos rues.",
    lien: { href: "/ramassages#compter", label: "Pourquoi on compte" },
  },
] as const;

/** Les six valeurs, avec leur nom, comme sur l'ancien site. */
export const valeurs = [
  { id: "convivialite", nom: "Convivialité", texte: "Un ramassage, c'est toujours dans la bonne humeur." },
  { id: "serieux", nom: "Sérieux", texte: "On mesure, on documente, on partage en transparence." },
  { id: "inclusivite", nom: "Inclusivité", texte: "Pour tous les âges, que vous soyez petit ou grand : à tout âge." },
  {
    id: "bienveillance",
    nom: "Bienveillance",
    texte: "Nous ne sommes pas là pour juger les fumeurs, simplement sensibiliser à ne pas jeter ses mégots au sol.",
  },
  { id: "ancrage", nom: "Ancrage local", texte: "On agit sur le territoire, avec les acteurs locaux." },
  { id: "reseau", nom: "Réseau", texte: "Ouverts aux partenariats, aux assos et aux entreprises." },
] as const;

/** Fiche d'identité, reprise des mentions légales du site. */
export const identite = {
  nom: "O'Mégots",
  forme: "Association loi 1901, à but non lucratif",
  rna: "W443012511",
  siret: "104 488 408 00014",
  siege: "Besné (44160), Loire-Atlantique",
  territoire: "Saint-Nazaire et ses alentours",
  president: "Romain Perrais",
  email: "association.o.megots@gmail.com",
  delai: "moins de 3 jours ouvrés",
  naissance: "2026",
} as const;

/** Objets du formulaire de contact, ceux de l'ancien site. */
export const objetsContact = [
  "Suggestions",
  "Proposer un lieu à nettoyer",
  "Partenariat / entreprise",
  "Presse / média",
  "Don / soutien financier",
  "Autre",
] as const;

export const faqAssociation: FaqItem[] = [
  {
    question: "Qui est derrière O'Mégots ?",
    reponse:
      "Une association citoyenne loi 1901, créée en 2026 à Saint-Nazaire et présidée par Romain Perrais. Elle est déclarée en préfecture (RNA W443012511) et son siège est à Besné, en Loire-Atlantique.",
    lien: { href: "#identite", label: "Voir la fiche d'identité" },
  },
  {
    question: "Où agissez-vous ?",
    reponse:
      "À Saint-Nazaire et dans ses alentours : rues, parcs, bords de Loire, sentiers, bords de route et plages. Partout où les mégots s'accumulent.",
    lien: { href: "/ramassages#zones", label: "Où on ramasse" },
  },
  {
    question: "Comment devenir membre ?",
    reponse:
      "Participer aux ramassages est gratuit et ne demande pas d'adhésion. L'adhésion, symbolique, à 1 euro, permet de devenir membre officiel et de voter en assemblée générale. Elle aide à couvrir l'assurance, le matériel de collecte et la communication.",
    lien: { href: "/contact#adherer", label: "Adhérer" },
  },
  {
    question: "Vous êtes journaliste, comment vous contacter ?",
    reponse:
      "Par e-mail à association.o.megots@gmail.com, objet « Presse / média », ou avec le formulaire de la page Contact. Nous répondons en moins de trois jours ouvrés.",
    lien: { href: "/contact", label: "Nous écrire" },
  },
  {
    question: "Une entreprise, une école ou une mairie peut-elle travailler avec vous ?",
    reponse:
      "Oui, nous sommes ouverts à toute collaboration : matériel, communication, financement, ou un ramassage organisé ensemble. Écrivez-nous avec l'objet « Partenariat ».",
    lien: { href: "/contact", label: "Proposer un partenariat" },
  },
  {
    question: "Jugez-vous les fumeurs ?",
    reponse:
      "Non. Nous ne sommes pas là pour juger, simplement pour sensibiliser à ne pas jeter ses mégots au sol. Le mégot est un déchet, pas une faute.",
  },
];
