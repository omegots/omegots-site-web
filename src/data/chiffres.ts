/**
 * Chiffres de sensibilisation de l'accueil. Les trois chiffres clés sont
 * alignés sur les sources de la page « Le mégot » (data/megot.ts) : 14 ans
 * (Joly et Coulis, 2018), plus de 7 000 substances (Novotny et al., 2009),
 * 1er déchet des plages (Surfrider, Ocean Conservancy).
 */

/** Une unité dans laquelle on peut exprimer les 500 litres. */
export type UniteEquivalence = {
  id: string;
  /** Nom au pluriel, affiché à côté du grand chiffre. */
  nom: string;
  /** Contenance d'une unité, en litres. */
  capaciteL: number;
};

export const chiffreCle = {
  valeur: 500,
  unite: "L",
  uniteLongue: "litres",
  texte: "d'eau polluée par un mégot jeté.",
  equivalences: [
    { id: "baignoire", nom: "baignoires", capaciteL: 200 },
    { id: "bouteille", nom: "bouteilles", capaciteL: 0.5 },
    { id: "verre", nom: "verres", capaciteL: 0.25 },
  ] satisfies UniteEquivalence[],
};

/** Nombre d'unités contenues dans les 500 litres (2,5 baignoires, 1 000 bouteilles...). */
export function quantite(u: UniteEquivalence) {
  return chiffreCle.valeur / u.capaciteL;
}

/** Formate un nombre en français : une décimale sous 10, aucune au-delà. */
export function formatNombre(n: number) {
  return n.toLocaleString("fr-FR", {
    maximumFractionDigits: n < 10 ? 1 : 0,
  });
}

/** Contenance lisible : « 200 L », « 50 cl », « 25 cl ». */
export function formatContenance(litres: number) {
  return litres >= 1
    ? `${formatNombre(litres)} L`
    : `${formatNombre(litres * 100)} cl`;
}

/** Libellé complet d'une pastille : « 2,5 baignoires de 200 L ». */
export function libelleEquivalence(u: UniteEquivalence) {
  return `${formatNombre(quantite(u))} ${u.nom} de ${formatContenance(u.capaciteL)}`;
}

export const chiffres = [
  {
    valeur: "14 ans",
    label: "pour qu'un filtre se dégrade dans un sol ordinaire",
  },
  {
    valeur: "7 000",
    label: "substances dans la fumée, que le filtre retient en partie",
  },
  {
    valeur: "N° 1",
    label: "déchet le plus retrouvé sur les plages françaises",
  },
];
