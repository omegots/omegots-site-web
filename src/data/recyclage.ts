import type { FaqItem } from "@/data/faq";
import type { Source } from "@/data/megot";

/**
 * Faits et sources de la page « Le recyclage ». Comme pour « Le mégot » :
 * uniquement des documents publiés (administration, presse économique, sites
 * officiels des recycleurs, textes de loi). Les chiffres des recycleurs sont
 * ceux qu'ils communiquent eux-mêmes, et sont présentés comme tels.
 */
export const sourcesRecyclage: Source[] = [
  {
    id: 1,
    auteur: "Ministère de la Transition écologique",
    titre:
      "Pollution due aux mégots de cigarettes : un éco-organisme pour la mise en œuvre d'une nouvelle filière pollueur-payeur",
    support: "Communiqué de presse du 10 août 2021",
    annee: 2021,
    url: "https://archive-2017-2022.ecologie.gouv.fr/presse/pollution-due-aux-megots-cigarettes-eco-organisme-mise-en-oeuvre-dune-nouvelle-filiere-pollueur",
  },
  {
    id: 2,
    auteur: "Bretagne Économique",
    titre: "Bourg-Blanc (29). MéGO ! met le paquet sur le recyclage des filtres de cigarettes",
    support: "Article du 21 septembre 2020",
    annee: 2020,
    url: "https://www.bretagne-economique.com/portraits/bourg-blanc-29-mego-met-le-paquet-sur-le-recyclage-des-filtres-de-cigarettes/",
  },
  {
    id: 3,
    auteur: "CKFD (collecte pour la Mairie du 9e arrondissement de Paris)",
    titre: "Des bancs assis à base de mégots recyclés : 15 000 mégots pour deux bancs, traités par la filière MéGO!",
    support: "Note de blog",
    annee: 2023,
    url: "https://www.ckfd.fr/blog/des-bancs-assis-a-base-de-megots-recycles",
  },
  {
    id: 4,
    auteur: "TchaoMegot",
    titre: "Solution de dépollution des mégots : sans eau ni solvant (CO2 supercritique)",
    support: "Site officiel, page Dépollution",
    annee: 2026,
    url: "https://tchaomegot.com/depollution/",
  },
  {
    id: 5,
    auteur: "Actu-Environnement",
    titre: "REP tabac : la co-incinération en cimenterie, meilleure option de traitement des mégots selon Alcome (analyse de cycle de vie)",
    support: "Article du 24 juillet 2026",
    annee: 2026,
    url: "https://www.actu-environnement.com/ae/news/etude-alcome-rep-tabac-acv-gestion-fin-de-vie-megots-48360.php4",
  },
  {
    id: 6,
    auteur: "Maire-Info",
    titre: "Alcome, une nouvelle filière pour aider les communes au nettoiement des mégots",
    support: "Quotidien d'information des élus locaux",
    annee: 2021,
    url: "https://www.maire-info.com/alcome-une-nouvelle-filiere-pour-aider-les-communes-au-nettoiement-des-megots-article2-26204",
  },
  {
    id: 7,
    auteur: "Parlement européen et Conseil",
    titre: "Directive (UE) 2019/904 relative à la réduction de l'incidence de certains produits en plastique sur l'environnement, article 7 (marquage)",
    support: "Journal officiel de l'Union européenne, 5 juin 2019",
    annee: 2019,
    url: "https://eur-lex.europa.eu/legal-content/FR/TXT/HTML/?uri=CELEX:32019L0904",
  },
  {
    id: 8,
    auteur: "République française",
    titre: "Décret n° 2021-1279 du 30 septembre 2021 relatif au marquage de certains produits en plastique à usage unique",
    support: "Légifrance",
    annee: 2021,
    url: "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000044153885",
  },
];

/** Les cinq étapes de la filière, pour le parcours interactif. */
export type Etape = {
  id: "collecte" | "tri" | "depollution" | "matiere" | "objet";
  nom: string;
  accroche: string;
  texte: string;
  sourceIds: number[];
};

export const etapesFiliere: Etape[] = [
  {
    id: "collecte",
    nom: "Collecte séparée",
    accroche: "Tout commence par un cendrier à part.",
    texte:
      "Un mégot jeté dans une poubelle ordinaire part avec les ordures ménagères et finit incinéré. Pour être recyclé, il doit être collecté séparément : cendriers de rue, cendriers de poche, bacs dédiés, ou ramassages comme les nôtres.",
    sourceIds: [6],
  },
  {
    id: "tri",
    nom: "Tri",
    accroche: "À la main, pour écarter les intrus.",
    texte:
      "Chez MéGO!, en Bretagne, les mégots sont triés manuellement pour écarter les déchets intrus : capsules, chewing-gums, papiers. Le tabac et la cendre sont séparés du filtre, seule partie qui a de la valeur.",
    sourceIds: [2],
  },
  {
    id: "depollution",
    nom: "Dépollution",
    accroche: "Deux procédés français, deux idées.",
    texte:
      "MéGO! broie les filtres puis les immerge dans des bains d'eau successifs, l'eau clarifiée étant réutilisée en circuit fermé. TchaoMegot, dans l'Oise, n'utilise ni eau ni solvant : du CO2 supercritique lave les fibres et concentre 0,3 % de matière toxique à part.",
    sourceIds: [2, 4],
  },
  {
    id: "matiere",
    nom: "Matière",
    accroche: "Des plaques ou des fibres.",
    texte:
      "Chez MéGO!, la pâte riche en acétate de cellulose est thermocompressée en plaques de plastique rigide de 2 cm. Chez TchaoMegot, la fibre nettoyée est gardée telle quelle pour servir d'isolant. En 2020, MéGO! a transformé environ 15 tonnes de mégots en plus de 10 tonnes de matière.",
    sourceIds: [2, 4],
  },
  {
    id: "objet",
    nom: "Objet",
    accroche: "Un banc, un cendrier, un isolant.",
    texte:
      "Les plaques deviennent du mobilier urbain, des cendriers, des pompes à gel ou des pièces de coffrage. Les fibres deviennent un isolant thermique pour le bâtiment ou un rembourrage textile. Deux bancs pour la mairie du 9e arrondissement de Paris ont demandé 15 000 mégots.",
    sourceIds: [2, 3, 4],
  },
];

/** Deux bancs pour 15 000 mégots (CKFD, filière MéGO!) : 7 500 par banc. */
export const MEGOTS_PAR_BANC = 7500;

/** Ordres de grandeur pour la section « Les limites ». */
export const limites = {
  /** Mégots jetés au sol en France chaque année, en unités (ministère : plus de 23 milliards). */
  jetesParAn: 23_000_000_000,
  /** Tonnage jeté chaque année en France, ordre de grandeur repris par TchaoMegot. */
  tonnesJeteesParAn: 25_000,
  /** Tonnes de mégots traitées par MéGO! en 2020. */
  tonnesMego2020: 15,
} as const;

export const faqRecyclage: FaqItem[] = [
  {
    question: "Les mégots sont-ils recyclables ?",
    reponse:
      "Le filtre, en acétate de cellulose, peut être dépollué puis transformé : en plaques de plastique rigide (MéGO!, Bretagne) ou en fibres isolantes (TchaoMegot, Oise). Le tabac et la cendre, eux, ne se recyclent pas. Encore faut-il que le mégot ait été collecté à part.",
    lien: { href: "#filiere", label: "Suivre la filière" },
  },
  {
    question: "Où va un mégot jeté dans une poubelle ordinaire ?",
    reponse:
      "Avec les ordures ménagères, donc à l'incinération. L'éco-organisme de la filière, Alcome, ne recycle pas : il finance le nettoiement des communes, distribue des cendriers et fait de la sensibilisation. Selon son analyse de cycle de vie, la co-incinération en cimenterie est même l'option la moins impactante sur le plan climatique.",
    lien: { href: "#limites", label: "Voir les limites" },
  },
  {
    question: "Combien de mégots pour fabriquer un banc ?",
    reponse:
      "Environ 7 500. Deux bancs livrés à la mairie du 9e arrondissement de Paris ont demandé 15 000 mégots, soit 4,5 kg d'acétate de cellulose dépollué. Notre Mégothon du 23 mai 2026 en a ramassé 4 800 : un peu plus d'un demi-banc.",
    lien: { href: "#bancs", label: "Compter les bancs" },
  },
  {
    question: "Pourquoi y a-t-il un pictogramme sur les paquets de cigarettes ?",
    reponse:
      "Depuis le 3 juillet 2021, les produits du tabac avec filtre doivent porter un marquage indiquant que le filtre contient du plastique et qu'il ne doit pas être jeté dans la nature. C'est l'article 7 de la directive européenne sur les plastiques à usage unique, transposé en France par décret.",
    lien: { href: "#loi", label: "Ce que dit la loi" },
  },
  {
    question: "Le recyclage est-il la solution ?",
    reponse:
      "Non, pas à l'échelle du problème : il se jette environ 25 000 tonnes de mégots par an en France, et le premier recycleur français en a traité 15 tonnes en 2020. Le recyclage donne une seconde vie à ce qui est déjà ramassé. La vraie solution, c'est le mégot qui n'est pas jeté.",
    lien: { href: "#limites", label: "Voir les ordres de grandeur" },
  },
  {
    question: "Que deviennent les mégots ramassés par O'Mégots ?",
    reponse:
      "Ils sont comptés, mesurés et les chiffres sont publiés. Rejoindre une filière de recyclage est l'étape suivante que l'association prépare : si vous êtes une entreprise, une collectivité ou un recycleur, écrivez-nous.",
    lien: {
      href: "mailto:association.o.megots@gmail.com?subject=Proposer%20un%20partenariat",
      label: "Proposer un partenariat",
    },
  },
];
