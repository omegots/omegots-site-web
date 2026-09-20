/**
 * Faits et sources de la page « Le mégot ». Chaque fait renvoie à une source
 * numérotée, affichée en bas de page. Rien ici ne vient d'une estimation maison :
 * ce sont des chiffres publiés par des administrations, des ONG de terrain ou des
 * revues à comité de lecture. Les chiffres de sensibilisation de l'association
 * (500 L, 12 ans, 4 500 substances) sont remis en perspective avec ces sources.
 */

export type Source = {
  id: number;
  /** Auteur ou organisme. */
  auteur: string;
  titre: string;
  /** Support, revue ou nature du document. */
  support: string;
  annee: number;
  url: string;
};

export const sources: Source[] = [
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
    auteur: "Slaughter E., Gersberg R. M., Watanabe K., Rudolph J., Stransky C., Novotny T. E.",
    titre: "Toxicity of cigarette butts, and their chemical components, to marine and freshwater fish",
    support: "Tobacco Control, vol. 20, suppl. 1",
    annee: 2011,
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3088407/",
  },
  {
    id: 3,
    auteur: "Joly F.-X., Coulis M.",
    titre: "Comparison of cellulose vs. plastic cigarette filter decomposition under distinct disposal environments",
    support: "Waste Management, vol. 72, p. 349-353",
    annee: 2018,
    url: "https://www.sciencedirect.com/science/article/abs/pii/S0956053X17308474",
  },
  {
    id: 4,
    auteur: "Novotny T. E., Lum K., Smith E., Wang V., Barnes R.",
    titre: "Cigarettes butts and the case for an environmental policy on hazardous cigarette waste",
    support: "International Journal of Environmental Research and Public Health, vol. 6, n° 5",
    annee: 2009,
    url: "https://www.researchgate.net/publication/26308106_Cigarettes_Butts_and_the_Case_for_an_Environmental_Policy_on_Hazardous_Cigarette_Waste",
  },
  {
    id: 5,
    auteur: "Surfrider Foundation Europe",
    titre: "Rapport annuel 2025 sur les déchets aquatiques (Initiatives Océanes)",
    support: "Communiqué du 16 mars 2026",
    annee: 2026,
    url: "https://www.surfrider.fr/press/surfrider-foundation-devoile-son-rapport-annuel-sur-les-dechets-aquatiques/",
  },
  {
    id: 6,
    auteur: "Ocean Conservancy",
    titre: "Cigarette butts are a plague on our beaches (International Coastal Cleanup)",
    support: "Article du 9 décembre 2022",
    annee: 2022,
    url: "https://oceanconservancy.org/blog/2022/12/09/cigarette-butts-are-a-plague-on-our-beaches/",
  },
  {
    id: 7,
    auteur: "Alcome, éco-organisme agréé (avec l'ADEME)",
    titre: "Stratégie zéro mégot : comptage national des mégots au sol",
    support: "La Gazette des communes, entretien",
    annee: 2024,
    url: "https://www.lagazettedescommunes.com/929492/strategie-zero-megot-comment-alcome-aide-les-collectivites-a-lutter-contre-un-fleau/",
  },
];

export function source(id: number): Source {
  const s = sources.find((x) => x.id === id);
  if (!s) throw new Error(`Source ${id} inconnue`);
  return s;
}

/** Les quatre parties du mégot, pour l'anatomie interactive. */
export type Partie = {
  id: "filtre" | "tabac" | "papier" | "fumee";
  nom: string;
  accroche: string;
  texte: string;
  sourceIds: number[];
};

export const parties: Partie[] = [
  {
    id: "filtre",
    nom: "Le filtre",
    accroche: "Du plastique, pas du coton.",
    texte:
      "Le filtre est fait d'acétate de cellulose, un plastique. Il ne pourrit pas comme une feuille : dans le sol, il met de 7 à 14 ans à se dégrader selon les conditions, et il se délite en microfibres bien avant d'avoir disparu.",
    sourceIds: [3],
  },
  {
    id: "tabac",
    nom: "Le tabac restant",
    accroche: "Ce qui part dans l'eau en premier.",
    texte:
      "Le bout de tabac non fumé et la cendre concentrent la nicotine, des métaux (arsenic, plomb, cadmium) et des hydrocarbures. Ils se dissolvent dès les premières heures dans l'eau : c'est cette part qui rend le mégot toxique pour les poissons.",
    sourceIds: [2, 4],
  },
  {
    id: "papier",
    nom: "Le papier",
    accroche: "Il disparaît vite, et libère le reste.",
    texte:
      "Le papier de la cigarette se délite en quelques semaines. Ce n'est pas lui le problème : en se défaisant, il libère le tabac et laisse le filtre nu, qui reste seul pendant des années.",
    sourceIds: [3],
  },
  {
    id: "fumee",
    nom: "Ce que le filtre a piégé",
    accroche: "Des milliers de substances, en dépôt.",
    texte:
      "Plus de 7 000 substances circulent dans la fumée d'une cigarette, dont des dizaines de cancérogènes reconnus. Le filtre en retient une partie pendant qu'on fume, puis la relâche dans l'eau de pluie : nicotine, phénols, métaux lourds.",
    sourceIds: [4],
  },
];

/** Concentrations létales mesurées par Slaughter et al. (2011), en mégots par litre, 96 h, deux espèces de poissons. */
export const essais = [
  {
    id: "fume",
    nom: "Mégot fumé, filtre et tabac",
    megotsParLitre: 1,
    texte:
      "Un seul mégot fumé dans un litre d'eau : au bout de quatre jours, la moitié des poissons de l'essai sont morts. C'est le résultat pour les deux espèces testées, l'une d'eau douce, l'autre de mer.",
  },
  {
    id: "filtre",
    nom: "Filtre fumé, sans tabac",
    megotsParLitre: 4.3,
    texte:
      "Le filtre seul, une fois fumé, reste toxique : il en faut un peu plus de quatre par litre pour le même effet. Ce qu'il a piégé en brûlant suffit.",
  },
  {
    id: "neuf",
    nom: "Filtre neuf, jamais fumé",
    megotsParLitre: 13.5,
    texte:
      "Même un filtre jamais allumé finit par tuer : treize par litre. Le plastique et ses additifs ne sont pas neutres.",
  },
] as const;

export type Essai = (typeof essais)[number];

/** Étapes de la dégradation du filtre, en années après le jet (Joly et Coulis, 2018). */
export const etapesTemps = [
  {
    annees: 0,
    titre: "Jour du jet",
    texte: "À la première pluie, le tabac et ce que le filtre a piégé partent dans l'eau. Le mégot a déjà fait l'essentiel de ses dégâts.",
    sourceIds: [2],
  },
  {
    annees: 0.5,
    titre: "Six mois",
    texte: "Posé au sol, le filtre n'a perdu que 5 à 10 % de sa masse. Il a jauni, il est toujours entier.",
    sourceIds: [3],
  },
  {
    annees: 2,
    titre: "Deux ans",
    texte: "Le filtre est toujours là. Il se délite en fibres d'acétate, des microplastiques que la pluie emporte.",
    sourceIds: [3],
  },
  {
    annees: 7.5,
    titre: "Sept ans et demi",
    texte: "Durée estimée pour qu'un filtre se dégrade dans le meilleur des cas, enfoui dans un compost actif.",
    sourceIds: [3],
  },
  {
    annees: 14,
    titre: "Quatorze ans",
    texte: "Durée estimée dans un sol ordinaire. Dans la rue, sur un trottoir ou une plage, c'est plus long encore : les auteurs évoquent jusqu'à trente ans.",
    sourceIds: [3],
  },
] as const;

export const TEMPS_MAX_ANNEES = 30;

/** Chiffres nationaux et internationaux, avec leur source. */
export const chiffresSources = [
  {
    id: "france",
    valeur: 23,
    unite: "milliards",
    label: "de mégots jetés au sol chaque année en France",
    sourceIds: [1],
  },
  {
    id: "voirie",
    valeur: 1.3,
    unite: "mégot",
    label: "tous les dix mètres de rue en moyenne en France, 4,5 dans les grandes villes",
    sourceIds: [7],
  },
  {
    id: "plages",
    valeur: 1,
    unite: "er",
    label: "déchet retrouvé lors des collectes sur les plages françaises, présent dans 100 % des ramassages",
    sourceIds: [5, 6],
  },
  {
    id: "objectif",
    valeur: 40,
    unite: "%",
    label: "de mégots en moins au sol d'ici 2027 : l'objectif fixé par l'État à la filière",
    sourceIds: [1],
  },
] as const;

/** Densité moyenne nationale de mégots au sol, en mégots par mètre de voirie (1,3 tous les 10 m). */
export const MEGOTS_PAR_METRE = 0.13;

/** FAQ de la page « Le mégot » : réponses courtes, chacune adossée à une source de la page. */
export const faqMegot: { question: string; reponse: string; lien?: { href: string; label: string } }[] = [
  {
    question: "Le filtre d'une cigarette est-il biodégradable ?",
    reponse:
      "Non. Il est fait d'acétate de cellulose, un plastique. Enterré, il met de 7 ans et demi (compost) à 14 ans (sol) pour se dégrader, et jusqu'à 30 ans dans des conditions moins favorables. Avant cela, il se délite en microfibres.",
    lien: { href: "#temps", label: "Voir la ligne du temps" },
  },
  {
    question: "Un mégot pollue-t-il vraiment 500 litres d'eau ?",
    reponse:
      "C'est l'ordre de grandeur repris par le ministère de la Transition écologique à la création de la filière mégots en 2021, pas une mesure de laboratoire. Ce qui est mesuré, c'est qu'un seul mégot fumé dans un litre d'eau tue la moitié des poissons exposés en quatre jours.",
    lien: { href: "#eau", label: "Voir l'essai du bocal" },
  },
  {
    question: "Que contient un mégot jeté ?",
    reponse:
      "De la nicotine, des métaux comme l'arsenic, le plomb et le cadmium, des hydrocarbures aromatiques et des phénols, retenus par le filtre pendant qu'on fume. La fumée d'une cigarette compte plus de 7 000 substances, dont des dizaines de cancérogènes reconnus.",
    lien: { href: "#anatomie", label: "Voir l'anatomie du mégot" },
  },
  {
    question: "Combien de mégots sont jetés par terre en France ?",
    reponse:
      "Plus de 23 milliards par an d'après le ministère, soit en moyenne 1,3 mégot tous les dix mètres de rue selon le comptage national d'Alcome et de l'ADEME, et 4,5 dans les grandes villes. L'État a fixé un objectif de 40 % de mégots en moins au sol d'ici 2027.",
    lien: { href: "#chiffres", label: "Voir les chiffres sourcés" },
  },
  {
    question: "Pourquoi retrouve-t-on autant de mégots sur les plages ?",
    reponse:
      "Parce que la pluie les emporte du trottoir au caniveau, puis dans le réseau d'eaux pluviales, qui rejoint souvent directement le cours d'eau, puis l'estuaire et la mer. Sur les plages françaises, le mégot est le déchet le plus ramassé, présent dans toutes les collectes de Surfrider.",
    lien: { href: "#trajet", label: "Suivre le trajet d'un mégot" },
  },
  {
    question: "Que faire de son mégot quand il n'y a pas de cendrier ?",
    reponse:
      "Le garder : un cendrier de poche tient dans n'importe quelle poche et se vide dans une poubelle. L'éco-organisme de la filière en distribue des millions aux communes. Et si vous voulez aller plus loin, venez en ramasser avec nous.",
    lien: { href: "/rejoindre", label: "Venir ramasser" },
  },
];
