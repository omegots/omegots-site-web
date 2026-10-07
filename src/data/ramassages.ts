import brut from "./contenu.json";
import {
  aujourdhuiIso,
  calculerMegotsParLitre,
  calculerTotaux,
  LITRES_EAU_PAR_MEGOT,
  moisAnnee,
  validerContenu,
  type ProchaineSortie,
  type Ramassage,
} from "./contenu";

export type { ProchaineSortie, Ramassage } from "./contenu";
export { LITRES_EAU_PAR_MEGOT } from "./contenu";

/*
 * Les chiffres du site viennent tous de src/data/contenu.json, modifié par
 * l'association depuis /admin. Le fichier est lu et vérifié au build : s'il est
 * invalide, le build échoue et le site en ligne reste le précédent.
 */
const resultat = validerContenu(brut);
if (!resultat.ok) {
  const detail = resultat.erreurs.map((e) => `${e.champ} : ${e.message}`).join("\n");
  throw new Error(`src/data/contenu.json est invalide :\n${detail}`);
}
const contenu = resultat.contenu;

export const ramassages: Ramassage[] = contenu.ramassages;

/** Paroles de bénévoles, gérées depuis /admin. */
export const temoignages = contenu.temoignages;

/** Mégots par litre de contenant, déduit des comptes annoncés (4 800 pour 6 L : 800). */
export function megotsParLitre() {
  return calculerMegotsParLitre(ramassages);
}

/** Les chiffres du Mégothon seul, cités comme tels sur l'accueil et les pages thématiques. */
export function megothon() {
  const { litres, megots, benevoles } = ramassages[0];
  return { litres, megots, benevoles, eau: megots * LITRES_EAU_PAR_MEGOT };
}

/** Totaux de toutes les sorties, pour la section « Nos sorties ». */
export function totals() {
  return calculerTotaux(ramassages);
}

/** Le mois de la toute première sortie datée (« mai 2026 »), pour « depuis… ». */
export function depuisMois(): string {
  const datees = ramassages.flatMap((r) => (r.iso ? [r.iso] : [])).sort();
  return datees.length > 0 ? moisAnnee(datees[0]) : "";
}

/**
 * La prochaine sortie. Une sortie annoncée dont la date est passée au moment du
 * build repasse en « date à fixer » : le site n'affiche jamais un rendez-vous
 * périmé dès qu'il est reconstruit.
 */
export function prochaineSortie(): ProchaineSortie {
  const p = contenu.prochaineSortie;
  // DATE_BUILD est figée au build (next.config.ts) et inlinée côté serveur comme
  // côté client : le HTML et l'hydratation voient toujours le même statut.
  const reference = process.env.DATE_BUILD ?? aujourdhuiIso();
  if (p.statut === "annoncee" && p.iso < reference) return { ...p, statut: "a-fixer" };
  return p;
}
