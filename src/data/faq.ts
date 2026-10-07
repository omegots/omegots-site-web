/**
 * Questions fréquentes de l'accueil. Chaque réponse ne reprend que des faits
 * déjà publiés par l'association (../CONTENU-SITE-ACTUEL.md) ou affichés sur
 * le site. Les réponses sont du texte brut : elles servent aussi au balisage
 * FAQPage (schema.org) de la page d'accueil.
 */
export type FaqItem = {
  question: string;
  reponse: string;
  /** Lien facultatif sous la réponse, vers une section de l'accueil ou un e-mail. */
  lien?: { href: string; label: string };
};

export const faq: FaqItem[] = [
  {
    question: "Qui peut venir ramasser ?",
    reponse:
      "Tout le monde, à tout âge. Les sorties sont ouvertes à toutes et tous, gratuites, et il n'y a pas besoin d'être membre pour participer. Venez comme vous êtes, toujours dans la bonne humeur.",
    lien: { href: "#prochaine", label: "Être prévenu de la prochaine sortie" },
  },
  {
    question: "Faut-il adhérer à l'association ?",
    reponse:
      "L'adhésion est symbolique, 1 euro, et permet de devenir membre et de voter en assemblée générale. L'association se construit maintenant : c'est le bon moment pour en faire partie dès le début.",
  },
  {
    question: "Où ont lieu les ramassages ?",
    reponse:
      "À Saint-Nazaire et dans ses alentours, partout où les mégots s'accumulent : rues et abords des commerces, parcs et jardins publics, bords de Loire, sentiers, bords de route et plages.",
  },
  {
    question: "Comment être prévenu de la prochaine sortie ?",
    reponse:
      "Laissez votre adresse e-mail dans le bandeau « Prochaine sortie » : vous recevez un message dès qu'une date est fixée. Vous pouvez aussi suivre l'association sur ses réseaux.",
    lien: { href: "#prochaine", label: "Laisser mon e-mail" },
  },
  {
    question: "Que deviennent les mégots ramassés ?",
    reponse:
      "Ils sont comptés et mesurés, puis les chiffres sont publiés. Notre ambition est de collaborer avec des filières de recyclage : les mégots peuvent devenir du mobilier urbain, des cendriers ou des emballages industriels, ou servir à la valorisation énergétique.",
    lien: { href: "#devenir", label: "Voir ce qu'ils peuvent devenir" },
  },
  {
    question: "Pourquoi un seul mégot, ça compte ?",
    reponse:
      "C'est le déchet le plus répandu au monde. Jeté au sol, un mégot peut polluer jusqu'à 500 litres d'eau, met jusqu'à 14 ans à se dégrader dans le sol et relâche dans l'eau une partie des milliers de substances piégées par son filtre. Nous ne jugeons pas les fumeurs : le mégot est un déchet, pas une faute.",
    lien: { href: "#pourquoi", label: "Les chiffres" },
  },
  {
    question: "Comment aider sans venir ramasser ?",
    reponse:
      "Signalez-nous un lieu où les mégots s'accumulent, proposez un partenariat si vous êtes une association ou une entreprise, un e-mail suffit, faites passer le mot autour de vous, ou soutenez l'association par un don.",
    lien: {
      href: "/contact",
      label: "Nous écrire",
    },
  },
];
