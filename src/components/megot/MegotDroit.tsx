/**
 * Le mégot « réaliste » du site, à réutiliser partout où l'on montre un mégot
 * hors marque (le logo garde son mégot écrasé). Un cylindre d'un seul diamètre,
 * aux proportions d'un vrai mégot : filtre de 27 unités (les deux tiers),
 * reste de papier et de tabac de 13 dont 5 de bout cramé. Couleurs de la charte.
 *
 * Dessiné dans un repère local en unités : origine au coin haut gauche du bout
 * cramé, `U` pixels par unité. Chaque partie a son opacité, pour les scènes qui
 * font disparaître le papier ou pâlir le filtre (ligne du temps).
 */
export const MEGOT = {
  diametre: 11,
  crame: 5,
  tabac: 2.5,
  papier: 5.5,
  filtre: 27,
} as const;

/** Longueur totale, en unités. */
export const MEGOT_LONGUEUR = MEGOT.crame + MEGOT.tabac + MEGOT.papier + MEGOT.filtre;

type MegotDroitProps = {
  /** Pixels par unité. */
  u: number;
  /** Opacité du bout cramé, du tabac et du papier (1 par défaut). */
  papierOpacite?: number;
  /** Opacité du filtre (1 par défaut). */
  filtreOpacite?: number;
  /** Épaisseur du contour bleu, en pixels. */
  contour?: number;
};

export function MegotDroit({ u, papierOpacite = 1, filtreOpacite = 1, contour = 3 }: MegotDroitProps) {
  const h = MEGOT.diametre * u;
  const xTabac = MEGOT.crame * u;
  const xPapier = xTabac + MEGOT.tabac * u;
  const xFiltre = xPapier + MEGOT.papier * u;
  const lFiltre = MEGOT.filtre * u;
  const lTube = xFiltre;

  return (
    <g>
      <g style={{ opacity: papierOpacite }}>
        <rect x={xPapier} y={0} width={MEGOT.papier * u} height={h} fill="#F5EFE0" />
        <rect x={0} y={0} width={MEGOT.crame * u} height={h} fill="#0F3550" />
        <rect x={xTabac} y={0} width={MEGOT.tabac * u} height={h} fill="#4E6675" />
        <rect x={0} y={0} width={lTube} height={h} fill="none" stroke="#1A4B6E" strokeWidth={contour} strokeLinejoin="round" />
      </g>
      <g style={{ opacity: filtreOpacite }}>
        <rect x={xFiltre} y={0} width={lFiltre} height={h} fill="#DD8A2E" />
        <rect x={xFiltre + 1.2 * u} y={0.45 * u} width={0.7 * u} height={h - 0.9 * u} fill="#B36A1E" />
        <rect x={xFiltre + lFiltre - 1.9 * u} y={0.45 * u} width={0.7 * u} height={h - 0.9 * u} fill="#B36A1E" />
        <rect x={xFiltre} y={0} width={lFiltre} height={h} fill="none" stroke="#1A4B6E" strokeWidth={contour} strokeLinejoin="round" />
      </g>
    </g>
  );
}
