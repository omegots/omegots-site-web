"use client";

import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { useRef } from "react";

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

const SCALE_MAX = 1.7;

/**
 * Vague sinusoïdale animée entre deux sections : `from` au-dessus, `to` en dessous.
 * « Vagues vivantes » : l'amplitude suit la vitesse de défilement (scaleY depuis
 * le bas), une seconde crête plus lente et translucide donne la profondeur.
 */
export function WaveDivider({ from, to }: { from: Tone; to: Tone }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "120px 0px 120px 0px" });

  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const amplitude = useTransform(velocity, [-2500, 0, 2500], [1.6, 1, 1.6]);
  const sprung = useSpring(amplitude, { stiffness: 120, damping: 20 });
  const scaleY = useTransform(sprung, (v) => Math.min(Math.max(v, 1), SCALE_MAX));

  return (
    <div
      ref={ref}
      className={`wave-divider${inView ? "" : " is-idle"}`}
      style={{
        // Moitié haute : couleur de la section du dessus ; moitié basse : celle
        // du dessous. La crête vit dans la moitié haute, donc le liseré de
        // sous-pixel en bas du séparateur prend la couleur de la section
        // suivante et disparaît.
        background: `linear-gradient(to bottom, ${COLORS[from]} 0 50%, ${COLORS[to]} 50% 100%)`,
      }}
      aria-hidden="true"
    >
      <motion.div
        className="wave-divider-body"
        style={{ scaleY: reduce ? 1 : scaleY, transformOrigin: "50% 100%" }}
      >
        <svg
          className="wave-divider-svg is-back"
          viewBox="0 0 2400 64"
          preserveAspectRatio="none"
        >
          <path d={`${SINE_BACK} L2400,64 L0,64 Z`} fill={COLORS[to]} opacity="0.35" />
        </svg>
        <svg className="wave-divider-svg" viewBox="0 0 2400 64" preserveAspectRatio="none">
          <path d={`${SINE} L2400,64 L0,64 Z`} fill={COLORS[to]} />
        </svg>
      </motion.div>
    </div>
  );
}
