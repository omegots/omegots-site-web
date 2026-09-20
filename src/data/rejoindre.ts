import type { FaqItem } from "@/data/faq";

/**
 * Contenus de la page « Nous rejoindre », repris de l'ancien site omegots.fr
 * (trois étapes, adhésion à 1 €, don, autres façons d'aider). Les liens Pay Asso
 * sont ceux du site actuel ; les intégrations (paiement en page) viendront plus tard.
 */
export const PAYASSO_ADHESION = "https://www.payasso.fr/association-o-megots/adhesion";
export const PAYASSO_DON = "https://www.payasso.fr/association-o-megots/nous-soutenir";
export const EMAIL = "association.o.megots@gmail.com";

export const etapes = [
  {
    titre: "Adhérez en ligne",
    texte: "Devenez membre officiel pour 1 € symbolique via l'espace sécurisé Pay Asso. Ou venez d'abord ramasser, c'est gratuit.",
  },
  {
    titre: "On vous intègre",
    texte: "Vous rejoignez le groupe des bénévoles et recevez toutes les infos : dates, lieux de rendez-vous, bilans.",
  },
  {
    titre: "Vous participez",
    texte: "On a juste besoin de votre bonne humeur. Deux heures un samedi matin suffisent à remplir un contenant.",
  },
] as const;

/** Ce que l'adhésion implique, texte de l'ancien site. */
export const implique = ["Être informé·e de nos actions", "Participer selon vos disponibilités", "Voter en assemblée générale"] as const;

/** D'autres façons d'aider, textes de l'ancien site, chacune avec un e-mail pré-rempli. */
export const aides = [
  {
    id: "suggestions",
    titre: "Des suggestions ?",
    texte: "Nous sommes toujours preneurs d'idées pour nous améliorer.",
    lien: `mailto:${EMAIL}?subject=${encodeURIComponent("Suggestions")}`,
    label: "Nous écrire",
  },
  {
    id: "partenariat",
    titre: "Proposer un partenariat",
    texte: "Entreprise, école, mairie ? Ouverts à toute collaboration : matériel, communication, financement.",
    lien: `mailto:${EMAIL}?subject=${encodeURIComponent("Partenariat / entreprise")}`,
    label: "Nous contacter",
  },
  {
    id: "lieu",
    titre: "Signaler un lieu",
    texte: "Vous connaissez une zone particulièrement polluée ? Signalez-la-nous, nous la prioriserons lors de nos prochaines actions.",
    lien: `mailto:${EMAIL}?subject=${encodeURIComponent("Proposer un lieu à nettoyer")}`,
    label: "Signaler un lieu",
  },
  {
    id: "mot",
    titre: "Faire passer le mot",
    texte: "Parlez d'O'Mégots autour de vous. Chaque nouveau bénévole représente des milliers de mégots en moins.",
    lien: null,
    label: "Partager",
  },
] as const;

export const faqRejoindre: FaqItem[] = [
  {
    question: "Faut-il adhérer pour venir ramasser ?",
    reponse:
      "Non. Participer aux ramassages est entièrement gratuit, pas besoin d'adhérer. L'adhésion à 1 € est symbolique et volontaire : elle permet de devenir membre officiel de l'association, avec le droit de voter en assemblée générale.",
    lien: { href: "#adherer", label: "Adhérer" },
  },
  {
    question: "À quoi sert le 1 euro ?",
    reponse:
      "Les cotisations aident à couvrir les frais indispensables de l'association : assurance, matériel de collecte, communication. Elles ne rémunèrent personne.",
  },
  {
    question: "Comment se passe le paiement ?",
    reponse:
      "Par Crédit Mutuel Pay Asso, une solution de paiement sécurisée dédiée aux associations. Vos informations servent uniquement à la gestion de l'association et ne sont jamais partagées, conformément au RGPD.",
    lien: { href: PAYASSO_ADHESION, label: "Ouvrir Pay Asso" },
  },
  {
    question: "Puis-je faire un don sans adhérer ?",
    reponse:
      "Oui, à montant libre, par le même espace sécurisé. Chaque don finance le matériel, l'assurance et les actions sur le terrain.",
    lien: { href: "#don", label: "Faire un don" },
  },
  {
    question: "Je n'ai pas le temps de venir, comment aider ?",
    reponse:
      "Signalez-nous un lieu plein de mégots, proposez un partenariat si vous êtes une entreprise, une école ou une mairie, ou faites passer le mot : chaque nouveau bénévole représente des milliers de mégots en moins.",
    lien: { href: "#aider", label: "D'autres façons d'aider" },
  },
  {
    question: "Comment être prévenu de la prochaine sortie ?",
    reponse:
      "Laissez votre adresse e-mail : vous recevez un message dès qu'une date est fixée, avec le lieu de rendez-vous et l'heure. Rien d'autre.",
    lien: { href: "#prochaine", label: "Laisser mon e-mail" },
  },
];
