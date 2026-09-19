export type Ramassage = {
  date: string;
  libelle: string;
  lieu: string;
  duree: string;
  litres: number;
  /** Nombre de mégots annoncé par l'association pour cette sortie. */
  megots: number;
  benevoles: number;
  note: string;
};

/** Chiffre de sensibilisation repris du site actuel : un mégot pollue jusqu'à 500 litres d'eau. */
export const LITRES_EAU_PAR_MEGOT = 500;

export const ramassages: Ramassage[] = [
  {
    date: "23 mai 2026",
    libelle: "Mégothon",
    lieu: "de la mairie au Paquebot",
    duree: "2 h",
    litres: 6,
    megots: 4800,
    benevoles: 7,
    note: "Première action de l'association, dans le centre-ville.",
  },
];

/** Mégots par litre de contenant, déduit des comptes annoncés (4 800 pour 6 L : 800). */
export function megotsParLitre() {
  const litres = ramassages.reduce((a, r) => a + r.litres, 0);
  const megots = ramassages.reduce((a, r) => a + r.megots, 0);
  return litres > 0 ? Math.round(megots / litres) : 0;
}

export function totals() {
  const litres = ramassages.reduce((a, r) => a + r.litres, 0);
  const benevoles = ramassages.reduce((a, r) => a + r.benevoles, 0);
  const megots = ramassages.reduce((a, r) => a + r.megots, 0);
  const eau = megots * LITRES_EAU_PAR_MEGOT;
  return { litres, benevoles, megots, eau, sorties: ramassages.length };
}
