const COLORS = {
  bg: "#F5EFE0",
  navy: "#0F3550",
  navyDeep: "#0B2A40",
  vert: "#2A8C7E",
  orange: "#DD8A2E",
} as const;

type Tone = keyof typeof COLORS;

/**
 * Sinusoïde de période 400 sur 2400 unités (six périodes, moitié visible,
 * moitié en réserve pour la dérive). `phase` décale le tracé d'une demi-période
 * (200) pour la crête arrière, en opposition de phase avec la crête avant.
 */
function sinePath(phase: 0 | 200): string {
  const [a, b] = phase === 0 ? [32, 8] : [8, 32];
  let d = `M0,${a} C100,${a} 100,${b} 200,${b}`;
  for (let x = 400; x <= 2400; x += 400) {
    d += ` S${x - 100},${a} ${x},${a}`;
    if (x < 2400) d += ` S${x + 100},${b} ${x + 200},${b}`;
  }
  return d;
}

const SINE = sinePath(0);
const SINE_BACK = sinePath(200);

/**
 * Vague sinusoïdale entre deux sections : `from` au-dessus, `to` en dessous.
 * Animation CSS uniquement (pas de Motion) : moins de JS, pas de scroll-linked
 * layout, meilleur Speed Index mobile.
 */
export function WaveDivider({ from, to }: { from: Tone; to: Tone }) {
  // Sur un fond sombre vers l'orange, la crête arrière translucide fait une bande brune : on la retire.
  const sansArriere = to === "orange" && from !== "bg" && from !== "orange";
  return (
    <div
      className="wave-divider"
      style={{
        background: `linear-gradient(to bottom, ${COLORS[from]} 0 50%, ${COLORS[to]} 50% 100%)`,
      }}
      aria-hidden="true"
    >
      <div className="wave-divider-body">
        {!sansArriere && (
          <svg
            className="wave-divider-svg is-back"
            viewBox="0 0 2400 64"
            preserveAspectRatio="none"
          >
            <path d={`${SINE_BACK} L2400,64 L0,64 Z`} fill={COLORS[to]} opacity="0.35" />
          </svg>
        )}
        <svg className="wave-divider-svg" viewBox="0 0 2400 64" preserveAspectRatio="none">
          <path d={`${SINE} L2400,64 L0,64 Z`} fill={COLORS[to]} />
        </svg>
      </div>
    </div>
  );
}
