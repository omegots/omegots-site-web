/**
 * Quatre petites scènes illustrées, à plat, dans la palette du site.
 * viewBox 0 0 240 140. Le sol est commun : une bande de sable clair.
 */

const SOL = "#EBDFC5";
const NAVY = "#1A4B6E";
const VERT = "#2A8C7E";
const ORANGE = "#DD8A2E";
const CREAM = "#FFFDF8";
const CARTON = "#E9D8B8";

function Sol() {
  return <rect x="0" y="108" width="240" height="32" fill={SOL} />;
}

/** Mobilier urbain : un banc et un potelet, sur un sol propre. */
export function SceneMobilier({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 240 140" className="scene" aria-hidden="true">
      <Sol />
      {/* dossier */}
      <rect x="52" y="44" width="116" height="9" rx="4" fill={VERT} />
      <rect x="52" y="58" width="116" height="9" rx="4" fill={VERT} />
      {/* assise */}
      <rect x="44" y="76" width="132" height="10" rx="4" fill={VERT} className={active ? "scene-pop" : undefined} />
      {/* montants */}
      <rect x="62" y="40" width="8" height="70" rx="3" fill={NAVY} />
      <rect x="150" y="40" width="8" height="70" rx="3" fill={NAVY} />
      <rect x="54" y="86" width="8" height="24" rx="3" fill={NAVY} />
      <rect x="158" y="86" width="8" height="24" rx="3" fill={NAVY} />
      {/* potelet */}
      <rect x="198" y="62" width="12" height="48" rx="5" fill={NAVY} />
      <rect x="196" y="58" width="16" height="8" rx="4" fill={ORANGE} />
    </svg>
  );
}

/** Cendrier de rue : un fût sur pied, une fente, un mégot qui y tombe. */
export function SceneCendrier({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 240 140" className="scene" aria-hidden="true">
      <Sol />
      <rect x="112" y="72" width="16" height="38" rx="4" fill={NAVY} />
      <rect x="96" y="104" width="48" height="8" rx="4" fill={NAVY} />
      {/* fût */}
      <rect x="86" y="30" width="68" height="48" rx="10" fill={VERT} />
      <rect x="86" y="30" width="68" height="12" rx="6" fill={NAVY} />
      <rect x="104" y="46" width="32" height="6" rx="3" fill={NAVY} opacity="0.55" />
      <rect x="92" y="66" width="56" height="5" rx="2.5" fill={ORANGE} />
      {/* mégot qui tombe dans la fente */}
      <g className={active ? "scene-drop" : undefined} transform="translate(120 18) rotate(80) scale(0.45)">
        <use href="#megot-raw" />
      </g>
    </svg>
  );
}

/** Emballages : trois cartons empilés, rubans vert d'eau. */
export function SceneEmballages({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 240 140" className="scene" aria-hidden="true">
      <Sol />
      <g className={active ? "scene-pop" : undefined}>
        <rect x="46" y="62" width="74" height="48" rx="4" fill={CARTON} stroke={NAVY} strokeWidth="2.5" />
        <rect x="78" y="62" width="10" height="48" fill={VERT} opacity="0.85" />
        <rect x="126" y="46" width="70" height="64" rx="4" fill={CARTON} stroke={NAVY} strokeWidth="2.5" />
        <rect x="126" y="72" width="70" height="9" fill={VERT} opacity="0.85" />
        <rect x="80" y="20" width="60" height="42" rx="4" fill={CARTON} stroke={NAVY} strokeWidth="2.5" />
        <rect x="106" y="20" width="8" height="42" fill={VERT} opacity="0.85" />
      </g>
    </svg>
  );
}

/** Énergie : une flamme dans un foyer, chaleur qui s'échappe. */
export function SceneEnergie({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 240 140" className="scene" aria-hidden="true">
      <Sol />
      <rect x="70" y="40" width="100" height="70" rx="12" fill={NAVY} />
      <rect x="80" y="50" width="80" height="50" rx="8" fill="#0F3550" />
      <g className={active ? "scene-flame" : undefined} style={{ transformOrigin: "120px 98px" }}>
        <path d="M120,58 C132,70 146,78 140,94 C136,104 128,108 120,108 C110,108 102,102 100,92 C98,80 108,74 110,66 C112,74 118,76 120,70 Z" fill={ORANGE} />
        <path d="M120,76 C126,84 132,88 129,96 C127,102 123,104 120,104 C115,104 111,100 111,94 C111,88 117,84 120,76 Z" fill={CREAM} opacity="0.9" />
      </g>
      {[96, 120, 144].map((x, i) => (
        <path
          key={x}
          className={active ? "scene-heat" : undefined}
          style={{ animationDelay: `${i * 0.35}s` }}
          d={`M${x},34 q4,-6 0,-12 q-4,-6 0,-12`}
          fill="none"
          stroke={VERT}
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.7"
        />
      ))}
    </svg>
  );
}

export const SCENES = [SceneMobilier, SceneCendrier, SceneEmballages, SceneEnergie] as const;
