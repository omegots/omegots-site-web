export type Ramassage = {
  date: string;
  libelle: string;
  lieu: string;
  duree: string;
  litres: number;
  benevoles: number;
  note: string;
};

/** Ordre de grandeur utilisé par l'association : un litre de contenant, environ mille mégots. */
export const MEGOTS_PAR_LITRE = 1000;
/** Chiffre de sensibilisation repris du site actuel : un mégot pollue jusqu'à 500 litres d'eau. */
export const LITRES_EAU_PAR_MEGOT = 500;

export const ramassages: Ramassage[] = [
  {
    date: "23 mai 2026",
    libelle: "Mégothon",
    lieu: "de la mairie au Paquebot",
    duree: "2 h",
    litres: 6,
    benevoles: 7,
    note: "Première action de l'association, dans le centre-ville.",
  },
];

export function totals() {
  const litres = ramassages.reduce((a, r) => a + r.litres, 0);
  const benevoles = ramassages.reduce((a, r) => a + r.benevoles, 0);
  const megots = Math.round(litres * MEGOTS_PAR_LITRE);
  const eau = megots * LITRES_EAU_PAR_MEGOT;
  return { litres, benevoles, megots, eau, sorties: ramassages.length };
}
