import type { FaqItem } from "@/data/faq";
import type { Source } from "@/data/megot";
import { fr } from "@/data/format";
import { megotsParLitre, ramassages } from "@/data/ramassages";

/**
 * Contenus de la page « Nos ramassages » : sources, zones d'action (reprises de
 * l'ancien site), déroulé d'une sortie (volontairement général : à préciser avec
 * l'association), FAQ. Les sorties elles-mêmes vivent dans ramassages.ts.
 */
export const sourcesRamassages: Source[] = [
  {
    id: 1,
    auteur: "Saint-Nazaire News",
    titre: "Mégothon de Saint-Nazaire : 6 litres de mégots récoltés en 2h, de la mairie au Paquebot",
    support: "Article de presse locale",
    annee: 2026,
    url: "https://www.saintnazairenews.fr/news/megothon-de-saint-nazaire-6-litres-de-megots-recoltes-en-2h-de-la-mairie-au-paquebot",
  },
  {
    id: 2,
    auteur: "Ministère de la Transition écologique",
    titre:
      "Pollution due aux mégots de cigarettes : un éco-organisme pour la mise en œuvre d'une nouvelle filière pollueur-payeur",
    support: "Communiqué de presse du 10 août 2021",
    annee: 2021,
    url: "https://archive-2017-2022.ecologie.gouv.fr/presse/pollution-due-aux-megots-cigarettes-eco-organisme-mise-en-oeuvre-dune-nouvelle-filiere-pollueur",
  },
  {
    id: 3,
    auteur: "Alcome, éco-organisme agréé (avec l'ADEME)",
    titre: "Stratégie zéro mégot : comptage national des mégots au sol",
    support: "La Gazette des communes, entretien",
    annee: 2024,
    url: "https://www.lagazettedescommunes.com/929492/strategie-zero-megot-comment-alcome-aide-les-collectivites-a-lutter-contre-un-fleau/",
  },
  {
    id: 4,
    auteur: "Surfrider Foundation Europe",
    titre: "Rapport annuel 2025 sur les déchets aquatiques (Initiatives Océanes)",
    support: "Communiqué du 16 mars 2026",
    annee: 2026,
    url: "https://www.surfrider.fr/press/surfrider-foundation-devoile-son-rapport-annuel-sur-les-dechets-aquatiques/",
  },
];

/** Les zones ciblées, texte de l'ancien site omegots.fr. */
export const zones = [
  {
    id: "parcs",
    nom: "Espaces verts et parcs",
    texte: "Parcs urbains, jardins publics et bords de Loire autour de Saint-Nazaire.",
  },
  {
    id: "rues",
    nom: "Rues et quartiers",
    texte: "Zones urbaines et abords des commerces, là où les mégots s'accumulent.",
  },
  {
    id: "nature",
    nom: "Zones naturelles",
    texte: "Sentiers, bords de route et plages.",
  },
] as const;

/**
 * Le déroulé d'une sortie. Général et prudent : l'association n'a pas encore
 * écrit le sien (matériel, horaires, enfants, météo restent à confirmer).
 */
export const deroule = [
  {
    titre: "On vous prévient",
    texte: "Un e-mail dès qu'une date est fixée, avec le lieu de rendez-vous et l'heure. Pas d'inscription, pas de cotisation : venir suffit.",
  },
  {
    titre: "On se retrouve",
    texte: "Au point de rendez-vous, on forme les groupes et on se répartit le parcours. Tous les âges sont les bienvenus, dans la bonne humeur.",
  },
  {
    titre: "On ramasse",
    texte: `Rues, abords des commerces, parcs, plages : on parcourt la zone choisie et on ramasse tout ce qui est mégot.${
      ramassages[0].duree ? ` Le ${ramassages[0].libelle} a duré ${ramassages[0].duree}.` : ""
    }`,
  },
  {
    titre: "On mesure",
    texte: `Tout est versé dans un contenant gradué. Un litre plein, c'est environ ${fr(megotsParLitre())} mégots. Pas d'estimation à l'œil : on compte.`,
  },
  {
    titre: "On publie",
    texte: "Litres, mégots, bénévoles, parcours : le bilan de chaque sortie est publié ici, et les chiffres de l'association s'additionnent.",
  },
] as const;

export const faqRamassages: FaqItem[] = [
  {
    question: "Faut-il s'inscrire pour venir ramasser ?",
    reponse:
      "Non. Les sorties sont gratuites et ouvertes à toutes et tous, sans adhésion. Laissez simplement votre adresse e-mail pour recevoir la date et le lieu de rendez-vous de la prochaine sortie.",
    lien: { href: "#prochaine", label: "Être prévenu" },
  },
  {
    question: "Combien de temps dure une sortie ?",
    reponse:
      "En moyenne deux heures. Chaque sortie est annoncée avec son heure de début et sa durée ; on vient pour tout ou partie.",
  },
  {
    question: "Peut-on venir avec des enfants ?",
    reponse:
      "Oui, les sorties sont ouvertes à tous les âges. Les moins de 16 ans doivent venir accompagnés d'un adulte. Les détails pratiques de chaque sortie (matériel, gants, parcours) sont à consulter sur nos réseaux sociaux.",
  },
  {
    question: "Que deviennent les mégots ramassés ?",
    reponse:
      `Ils sont comptés dans un contenant gradué, environ ${fr(megotsParLitre())} par litre, puis les chiffres sont publiés. Rejoindre une filière de recyclage est l'étape suivante que l'association prépare.`,
    lien: { href: "/recyclage", label: "Voir la page recyclage" },
  },
  {
    question: "Pourquoi compter les mégots plutôt que simplement les ramasser ?",
    reponse:
      "Parce qu'un chiffre publié pèse plus qu'un sac plein. Les collectes comptées de Surfrider ont nourri la directive européenne sur les plastiques à usage unique. À notre échelle, compter, c'est montrer à la ville ce qu'il y a vraiment par terre.",
    lien: { href: "#compter", label: "Pourquoi on compte" },
  },
  {
    question: "Je connais un endroit plein de mégots, que faire ?",
    reponse:
      "Signalez-le-nous par e-mail avec le lieu précis : nous le prioriserons pour une prochaine sortie. Et si vous voulez lancer un ramassage près de chez vous, écrivez-nous aussi.",
    lien: {
      href: "mailto:association.o.megots@gmail.com?subject=Signaler%20un%20lieu",
      label: "Signaler un lieu",
    },
  },
];
