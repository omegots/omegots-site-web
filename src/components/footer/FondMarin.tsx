"use client";

import { useInView } from "motion/react";
import { useRef, type ReactNode } from "react";

/**
 * Fond de l'eau, tout en bas de la page : sable, algues qui ondulent, quelques
 * mégots sombres posés au fond, des bulles. Les mentions légales sont posées
 * dessus, dans la pénombre du fond. Décor en pause hors écran.
 */

const FLOOR = 158;

type Kelp = { x: number; h: number; lean: number; blades: number; dur: number; delay: number; dim?: boolean };
type Grass = { x: number; h: number; dur: number; delay: number };

/* Deux familles : laminaires (tige + lames) et touffes d'herbe. */
const KELPS: Kelp[] = [
  { x: 96, h: 122, lean: 16, blades: 5, dur: 8.2, delay: 0 },
  { x: 402, h: 84, lean: -12, blades: 4, dur: 7.1, delay: 2.1, dim: true },
  { x: 712, h: 132, lean: 14, blades: 6, dur: 8.8, delay: 1.2 },
  { x: 1064, h: 96, lean: -14, blades: 4, dur: 7.6, delay: 0.6 },
  { x: 1352, h: 118, lean: 12, blades: 5, dur: 8.4, delay: 2.8 },
];

const GRASSES: Grass[] = [
  { x: 170, h: 40, dur: 5.6, delay: 0.4 },
  { x: 470, h: 34, dur: 5.1, delay: 1.9 },
  { x: 640, h: 44, dur: 5.9, delay: 0.1 },
  { x: 960, h: 38, dur: 5.4, delay: 1.1 },
  { x: 1240, h: 42, dur: 5.7, delay: 2.5 },
];

const MEGOTS = [
  { x: 40, rotate: 86, scale: 1.05 },
  { x: 215, rotate: 98, scale: 1.1 },
  { x: 330, rotate: 76, scale: 0.95 },
  { x: 520, rotate: 104, scale: 1.05 },
  { x: 610, rotate: 82, scale: 0.9 },
  { x: 800, rotate: 94, scale: 1.15 },
  { x: 930, rotate: 79, scale: 0.95 },
  { x: 1120, rotate: 100, scale: 1.05 },
  { x: 1245, rotate: 88, scale: 0.9 },
  { x: 1400, rotate: 95, scale: 1.1 },
];

const BULLES = [
  { x: 330, r: 2.4, dur: 7.5, delay: 0 },
  { x: 735, r: 3, dur: 9, delay: 2.6 },
  { x: 1110, r: 2.1, dur: 6.8, delay: 1.3 },
];

/** Point de la tige à la fraction t (0 au sol, 1 à la cime), courbe quadratique. */
function stemPoint(k: Kelp, t: number) {
  const x0 = k.x;
  const y0 = FLOOR;
  const cx = k.x + k.lean * 1.4;
  const cy = FLOOR - k.h * 0.55;
  const x1 = k.x + k.lean * 0.5;
  const y1 = FLOOR - k.h;
  const u = 1 - t;
  return {
    x: u * u * x0 + 2 * u * t * cx + t * t * x1,
    y: u * u * y0 + 2 * u * t * cy + t * t * y1,
  };
}

function kelpStem(k: Kelp) {
  const cx = k.x + k.lean * 1.4;
  const cy = FLOOR - k.h * 0.55;
  return `M${k.x},${FLOOR} Q${cx},${cy} ${k.x + k.lean * 0.5},${FLOOR - k.h}`;
}

/** Lame en goutte allongée, attachée à la tige, orientée vers l'extérieur. */
function kelpBlade(k: Kelp, i: number) {
  const t = 0.22 + (i / k.blades) * 0.7;
  const p = stemPoint(k, t);
  const side = i % 2 === 0 ? 1 : -1;
  const len = 22 + (1 - t) * 18;
  const wid = 5 + (1 - t) * 3;
  const dx = side * len;
  const dy = -len * 0.55;
  return `M${p.x},${p.y} Q${p.x + dx * 0.45 + side * wid},${p.y + dy * 0.2} ${p.x + dx},${p.y + dy} Q${p.x + dx * 0.55 - side * wid * 0.4},${p.y + dy * 0.75} ${p.x},${p.y} Z`;
}

function grassPaths(g: Grass) {
  const out: string[] = [];
  const n = 5;
  for (let i = 0; i < n; i++) {
    const off = (i - (n - 1) / 2) * 4;
    const lean = (i - (n - 1) / 2) * 6;
    const h = g.h * (0.7 + 0.3 * Math.abs(Math.sin(i + 1)));
    out.push(`M${g.x + off},${FLOOR} Q${g.x + off + lean},${FLOOR - h * 0.6} ${g.x + off + lean * 1.4},${FLOOR - h}`);
  }
  return out;
}

export function FondMarin({ children }: { children?: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "120px 0px 120px 0px" });

  return (
    <div ref={ref} className={`foot-fond${inView ? "" : " is-idle"}`}>
      <svg viewBox="0 0 1440 200" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
        {/* Sable */}
        <path
          d="M0,166 C120,158 220,170 360,164 C500,158 620,172 760,166 C900,160 1040,172 1180,166 C1300,161 1380,168 1440,164 L1440,200 L0,200 Z"
          fill="#11334b"
        />

        {/* Mégots posés au fond, sombres */}
        <g className="foot-megots">
          {MEGOTS.map((m, i) => (
            <g key={i} transform={`translate(${m.x} ${FLOOR + 6}) rotate(${m.rotate}) scale(${m.scale})`}>
              <use href="#megot-raw" />
            </g>
          ))}
        </g>

        {/* Herbes courtes, en arrière */}
        {GRASSES.map((g, i) => (
          <g
            key={`g${i}`}
            className="foot-algue"
            style={{
              transformOrigin: `${g.x}px ${FLOOR}px`,
              animationDuration: `${g.dur}s`,
              animationDelay: `-${g.delay}s`,
            }}
          >
            {grassPaths(g).map((d, j) => (
              <path key={j} d={d} fill="none" stroke="#2a8c7e" strokeWidth="2" strokeLinecap="round" opacity="0.45" />
            ))}
          </g>
        ))}

        {/* Laminaires : tige et lames alternées */}
        {KELPS.map((k, i) => (
          <g
            key={`k${i}`}
            className="foot-algue"
            opacity={k.dim ? 0.5 : 0.85}
            style={{
              transformOrigin: `${k.x}px ${FLOOR}px`,
              animationDuration: `${k.dur}s`,
              animationDelay: `-${k.delay}s`,
            }}
          >
            {Array.from({ length: k.blades }, (_, j) => (
              <path key={j} d={kelpBlade(k, j)} fill="#2a8c7e" opacity="0.8" />
            ))}
            <path d={kelpStem(k)} fill="none" stroke="#1f6e63" strokeWidth="3.2" strokeLinecap="round" />
          </g>
        ))}

        {/* Bulles */}
        {BULLES.map((b, i) => (
          <circle
            key={`u${i}`}
            className="foot-bulle"
            cx={b.x}
            cy={FLOOR - 12}
            r={b.r}
            fill="#7fd6c6"
            style={{ animationDuration: `${b.dur}s`, animationDelay: `-${b.delay}s` }}
          />
        ))}
      </svg>

      {children}
    </div>
  );
}
