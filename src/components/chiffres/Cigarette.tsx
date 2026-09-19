"use client";

import { chiffres } from "@/data/chiffres";
import { animate, motion, useInView, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "../motion/useMediaQuery";

/**
 * La cigarette qui devient mégot.
 * Géométrie de la charte, à l'échelle U = 6 px par unité : tube de 11 de large,
 * filtre de 12,7 × 15 plus large que le tube, pivoté de 30° autour du bas du
 * tube une fois écrasé, bout cramé de 5 unités.
 *
 * Séquence : allumage, combustion (la braise avance, le papier devient cendre,
 * des flocons tombent, la fumée monte), extinction, écrasement, puis les traits
 * partent du mégot vers les chiffres clés.
 */

const U = 4.8;
const CY = 172; // axe de la cigarette
const H = 11 * U; // hauteur du tube : 66
const FILTRE_L = 11 * U; // filtre plus court que dans la marque, à l'échelle d'une vraie cigarette
const FILTRE_H = 11.4 * U; // à peine plus large que le tube
const JONCTION = 436; // x de la jonction tube / filtre
const TUBE_FIN = 30 * U; // longueur du tube restant sur le mégot : 180
const X_MEGOT = JONCTION - TUBE_FIN; // 256, bout cramé du mégot
const X_DEBUT = JONCTION - 62 * U; // 64, bout de la cigarette entière
const CRAME = 5 * U; // 30
const BURN_S = 2.6;

type Phase = "idle" | "burn" | "out" | "megot" | "done";

/** Flocons de cendre : instant de détachement (fraction de la combustion), taille, dérive. */
const FLOCONS = Array.from({ length: 14 }, (_, i) => {
  const t = 0.06 + (i / 14) * 0.9;
  return {
    t,
    x: X_DEBUT + t * (X_MEGOT - X_DEBUT),
    dx: ((i * 37) % 23) - 11,
    r: 3 + ((i * 13) % 4),
    dur: 1.1 + ((i * 7) % 5) * 0.12,
  };
});

/** Ancrages des traits sur le mégot final, et position des étiquettes. */
const CALLOUTS = [
  {
    // bout cramé : les substances libérées
    fait: 1,
    from: [X_MEGOT + 10, CY - 26] as const,
    to: [214, 114] as const,
    label: [40, 66] as const,
    anchor: "start" as const,
  },
  {
    // filtre : le plastique, 12 ans
    fait: 0,
    from: [JONCTION + 34, CY + 4] as const,
    to: [JONCTION + 34, 114] as const,
    label: [600, 66] as const,
    anchor: "end" as const,
  },
  {
    // sous le mégot : l'eau, les plages
    fait: 2,
    from: [JONCTION - 60, CY + 38] as const,
    to: [362, 270] as const,
    label: [330, 306] as const,
    anchor: "middle" as const,
  },
];

function couperLabel(label: string, max = 30): string[] {
  const mots = label.split(" ");
  const lignes: string[] = [];
  let cur = "";
  for (const m of mots) {
    if ((cur + " " + m).trim().length > max) {
      lignes.push(cur.trim());
      cur = m;
    } else {
      cur = cur + " " + m;
    }
  }
  if (cur.trim()) lignes.push(cur.trim());
  return lignes;
}

export function Cigarette() {
  const reduce = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.45 });
  // Mobile : cadrage serré sur la cigarette, les traits sont remplacés par la liste dessous.
  const compact = useMediaQuery("(max-width: 760px)");
  const [phase, setPhase] = useState<Phase>("idle");
  const [run, setRun] = useState(0);
  const [tombes, setTombes] = useState<number>(0);
  // Nombre de chiffres révélés : le premier pendant la combustion, le deuxième
  // vers la fin, le troisième une fois le mégot posé.
  const [shown, setShown] = useState(0);
  const trait0Ref = useRef<SVGPathElement>(null);
  const point0Ref = useRef<SVGCircleElement>(null);

  const papierRef = useRef<SVGRectElement>(null);
  const cendreRef = useRef<SVGPathElement>(null);
  const braiseRef = useRef<SVGGElement>(null);
  const fumeeRef = useRef<SVGGElement>(null);
  const filtreRef = useRef<SVGGElement>(null);

  const placer = useCallback((p: number) => {
    const x = X_DEBUT + p * (X_MEGOT - X_DEBUT);
    const papier = papierRef.current;
    if (papier) {
      papier.setAttribute("x", String(x));
      papier.setAttribute("width", String(Math.max(0, JONCTION - x)));
    }
    // Colonne de cendre accrochée derrière la braise, bord irrégulier.
    const cendre = cendreRef.current;
    if (cendre) {
      const l = Math.min(20, 5 + p * 32);
      const x0 = x - l;
      cendre.setAttribute(
        "d",
        `M${x + 2},${CY - H / 2 + 2} L${x0 + 4},${CY - H / 2 + 6} L${x0},${CY - 8} L${x0 + 3},${CY + 6} L${x0 + 1},${CY + H / 2 - 5} L${x + 2},${CY + H / 2 - 2} Z`,
      );
    }
    braiseRef.current?.setAttribute("transform", `translate(${x} ${CY})`);
    fumeeRef.current?.setAttribute("transform", `translate(${x} ${CY - H / 2})`);
    // Le trait « substances » part de la braise tant que ça brûle.
    const c0 = CALLOUTS[0];
    trait0Ref.current?.setAttribute("d", `M${x + 8},${CY - H / 2 - 2} L${c0.to[0]},${c0.to[1]}`);
    point0Ref.current?.setAttribute("cx", String(x + 8));
    point0Ref.current?.setAttribute("cy", String(CY - H / 2 - 2));
  }, []);

  useEffect(() => {
    if (!inView) return;
    let stopped = false;
    let ctrl: ReturnType<typeof animate> | null = null;
    const timers: number[] = [];
    // Démarrage différé d'une frame : pas de setState synchrone dans l'effet.
    const raf = requestAnimationFrame(() => {
      if (stopped) return;
      if (reduce) {
        setPhase("done");
        setShown(3);
        return;
      }
      setPhase("burn");
      setTombes(0);
      setShown(0);
      placer(0);
      ctrl = animate(0, 1, {
        duration: BURN_S,
        ease: [0.3, 0, 0.75, 1],
        delay: 0.15,
        onUpdate: (p) => {
          placer(p);
          const n = FLOCONS.filter((f) => f.t <= p).length;
          setTombes((prev) => (n !== prev ? n : prev));
          if (p >= 0.2) setShown((prev) => (prev < 1 ? 1 : prev));
          if (p >= 0.68) setShown((prev) => (prev < 2 ? 2 : prev));
        },
      });
      ctrl.then(() => {
        if (stopped) return;
        setPhase("out");
        timers.push(window.setTimeout(() => !stopped && setPhase("megot"), 260));
        timers.push(
          window.setTimeout(() => {
            if (stopped) return;
            setPhase("done");
            // Le mégot est posé : le trait « substances » se fixe sur le bout cramé.
            const c0 = CALLOUTS[0];
            trait0Ref.current?.setAttribute("d", `M${c0.from[0]},${c0.from[1]} L${c0.to[0]},${c0.to[1]}`);
            point0Ref.current?.setAttribute("cx", String(c0.from[0]));
            point0Ref.current?.setAttribute("cy", String(c0.from[1]));
            setShown(3);
          }, 700),
        );
      });
    });
    return () => {
      stopped = true;
      cancelAnimationFrame(raf);
      ctrl?.stop();
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [inView, reduce, run, placer]);

  // Écrasement : le filtre pivote de 30° autour du bas du tube, à la jonction.
  const ecraseNow = phase === "megot" || phase === "done";
  useEffect(() => {
    const g = filtreRef.current;
    if (!g) return;
    const pose = (a: number) => g.setAttribute("transform", `rotate(${a} ${JONCTION} ${CY + H / 2})`);
    if (!ecraseNow) {
      pose(0);
      return;
    }
    if (reduce) {
      pose(30);
      return;
    }
    const ctrl = animate(0, 30, {
      type: "spring",
      stiffness: 170,
      damping: 13,
      onUpdate: pose,
    });
    return () => ctrl.stop();
  }, [ecraseNow, reduce]);

  const burning = phase === "burn";
  const lit = phase === "burn" || phase === "out";
  const ecrase = phase === "megot" || phase === "done";
  const done = phase === "done";

  return (
    <div ref={ref} className={`cig is-${phase}`}>
      <svg viewBox={compact ? "100 60 420 200" : "0 0 640 340"} className="cig-svg" role="img" aria-label="Une cigarette se consume et devient un mégot">
        <defs>
          <radialGradient id="cig-braise" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffd9a0" />
            <stop offset="35%" stopColor="#f0862a" />
            <stop offset="100%" stopColor="#f0862a" stopOpacity="0" />
          </radialGradient>
          <filter id="cig-flou" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>

        {/* Fumée : quelques volutes qui montent depuis la braise */}
        <g ref={fumeeRef} className={`cig-fumee${lit ? " is-on" : ""}`} filter="url(#cig-flou)">
          {[0, 1, 2, 3].map((i) => (
            <circle key={i} className="cig-volute" style={{ animationDelay: `${i * 0.55}s` }} cx={0} cy={0} r={9 + i * 2} fill="#f5efe0" />
          ))}
        </g>

        {/* Flocons de cendre qui se détachent */}
        <g className="cig-flocons">
          {FLOCONS.map((f, i) => (
            <path
              key={i}
              className={`cig-flocon${i < tombes && burning ? " is-off" : ""}`}
              d={`M${-f.r},0 L0,${-f.r * 0.8} L${f.r},${-f.r * 0.2} L${f.r * 0.4},${f.r} Z`}
              fill="#b9b1a4"
              style={{
                transform: `translate(${f.x}px, ${CY + 8}px)`,
                animationDuration: `${f.dur}s`,
                ["--dx" as string]: `${f.dx}px`,
              }}
            />
          ))}
        </g>

        {/* Papier : se raccourcit derrière la braise */}
        <rect
          ref={papierRef}
          className="cig-papier"
          x={X_DEBUT}
          y={CY - H / 2}
          width={JONCTION - X_DEBUT}
          height={H}
          fill="#F5EFE0"
          stroke="#1A4B6E"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        {/* Cendre accrochée */}
        <path ref={cendreRef} className={`cig-cendre${burning ? " is-on" : ""}`} d="" fill="#b9b1a4" />
        {/* Bout cramé du mégot, révélé à l'extinction */}
        <rect
          className={`cig-crame${ecrase || phase === "out" ? " is-on" : ""}`}
          x={X_MEGOT}
          y={CY - H / 2}
          width={CRAME}
          height={H}
          fill="#1A4B6E"
        />
        {/* Contour du tube restant, pour que le bout cramé reste cerné de bleu */}
        <rect
          className={`cig-tube-contour${ecrase ? " is-on" : ""}`}
          x={X_MEGOT}
          y={CY - H / 2}
          width={TUBE_FIN}
          height={H}
          fill="none"
          stroke="#1A4B6E"
          strokeWidth="3"
          strokeLinejoin="round"
        />

        {/* Filtre : plus large que le tube ; pivote de 30° autour du bas du tube quand il est écrasé */}
        <g ref={filtreRef}>
          <rect
            x={JONCTION}
            y={CY - FILTRE_H / 2}
            width={FILTRE_L}
            height={FILTRE_H}
            fill="#DD8A2E"
            stroke="#1A4B6E"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <rect x={JONCTION + 17} y={CY - FILTRE_H / 2 + 3} width={5} height={FILTRE_H - 6} fill="#B36A1E" />
          <rect x={JONCTION + 31} y={CY - FILTRE_H / 2 + 3} width={5} height={FILTRE_H - 6} fill="#B36A1E" />
        </g>

        {/* Braise : point incandescent qui palpite, éteint à la fin */}
        <g ref={braiseRef} className={`cig-braise${lit ? " is-on" : ""}${phase === "out" ? " is-out" : ""}`}>
          <rect x={-2} y={-H / 2 + 2} width={10} height={H - 4} fill="#2b2622" />
          <circle className="cig-braise-halo" cx={3} cy={0} r={26} fill="url(#cig-braise)" />
          <rect className="cig-braise-coeur" x={0} y={-H / 2 + 4} width={6} height={H - 8} fill="#ffb15c" />
        </g>

        {/* Traits et chiffres, par-dessus la cigarette pour que les points d'ancrage restent visibles (desktop seulement) */}
        <g className="cig-callouts">
          {CALLOUTS.map((c, i) => {
            const fait = chiffres[c.fait];
            if (!fait) return null;
            const lignes = couperLabel(fait.label);
            return (
              <g key={i} className={`cig-callout${shown > i ? " is-on" : ""}`}>
                <motion.path
                  ref={i === 0 ? trait0Ref : undefined}
                  d={`M${c.from[0]},${c.from[1]} L${c.to[0]},${c.to[1]}`}
                  fill="none"
                  stroke="#7fd6c6"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  initial={false}
                  animate={{ pathLength: shown > i ? 1 : 0, opacity: shown > i ? 1 : 0 }}
                  transition={{ duration: reduce ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
                />
                <circle ref={i === 0 ? point0Ref : undefined} cx={c.from[0]} cy={c.from[1]} r="4" fill="#7fd6c6" />
                <text className="cig-num" x={c.label[0]} y={c.label[1]} textAnchor={c.anchor}>
                  {fait.valeur}
                </text>
                {lignes.map((l, j) => (
                  <text
                    key={j}
                    className="cig-label"
                    x={c.label[0]}
                    y={c.label[1] + 20 + j * 16}
                    textAnchor={c.anchor}
                  >
                    {l}
                  </text>
                ))}
              </g>
            );
          })}
        </g>
      </svg>

      {/* Mobile : les traits n'ont pas la place, les faits arrivent dessous, au même rythme. */}
      <ol className="cig-faits">
        {CALLOUTS.map((c, i) => {
          const fait = chiffres[c.fait];
          if (!fait) return null;
          return (
            <li key={i} className={`cig-fait${shown > i ? " is-on" : ""}`}>
              <b className="display">{fait.valeur}</b>
              <span>{fait.label}</span>
            </li>
          );
        })}
      </ol>

      {!reduce && done && (
        <button type="button" className="cig-replay" onClick={() => setRun((r) => r + 1)}>
          Revoir
        </button>
      )}
    </div>
  );
}
