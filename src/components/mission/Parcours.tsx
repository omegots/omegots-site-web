"use client";

import { MEGOTS_PAR_LITRE } from "@/data/ramassages";
import { useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { fr } from "../motion/useCountUp";

/**
 * Le parcours d'un mégot : ramassé au sol, compté dans le contenant, publié.
 * Une seule scène SVG : trois postes reliés par une ligne, un mégot qui vole
 * du sol au contenant, une impulsion qui court du contenant au chiffre.
 * Sur mobile, les trois postes sont empilés, sans la scène.
 */

const ETAPES = [
  {
    n: "01",
    title: "On ramasse",
    text: "Des sorties dans les rues, les parcs et sur les plages de Saint-Nazaire et ses environs. Gratuites, ouvertes à toutes et tous, de 7 à 77 ans.",
  },
  {
    n: "02",
    title: "On compte",
    text: `Chaque sortie est mesurée dans un contenant gradué. Un litre plein, c'est environ ${fr(MEGOTS_PAR_LITRE)} mégots qui ne finiront pas dans l'eau.`,
  },
  {
    n: "03",
    title: "On partage",
    text: "Les chiffres sont publiés ici, sortie après sortie. Pour faire prendre conscience de ce qui traîne vraiment sur nos trottoirs.",
  },
];

const NX = [200, 600, 1000];
const NY = 150;
const R = 78;

/* Vol du mégot : du sol du poste 1 à l'ouverture du contenant du poste 2. */
const VOL = "M212,178 C300,20 520,10 598,84";
/* Impulsion : du contenant au chiffre, le long de la ligne. */
const PULSE = `M${NX[1] + R + 6},${NY} L${NX[2] - R - 6},${NY}`;

type Etat = {
  main: boolean; // la main descend ramasser
  vole: boolean; // le mégot est en vol
  compte: boolean; // le contenant a reçu le mégot
  pulse: boolean; // l'impulsion court vers le chiffre
  partage: boolean; // les barres sont montées
};

const REPOS: Etat = { main: false, vole: false, compte: false, pulse: false, partage: false };
const FINAL: Etat = { main: false, vole: false, compte: true, pulse: false, partage: true };

function Poste({ kind, etat, clip }: { kind: 0 | 1 | 2; etat: Etat; clip: string }) {
  if (kind === 0) {
    return (
      <g className={`poste poste-main${etat.main ? " is-play" : ""}`} clipPath={`url(#${clip})`}>
        <path d="M-50,34 H50" stroke="#1A4B6E" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        <g className={`poste-megot-sol${etat.vole || etat.compte ? " is-off" : ""}`} transform="translate(-4 24) scale(0.62)">
          <use href="#megot" />
        </g>
        <g className="poste-main-glove">
          {/* Gant de jardinage vu de dessus, poignet hors du cercle, doigts vers le sol */}
          <path
            d="M-19,-96 h38 v44 a4,4 0 0 1 -4,4 h-30 a4,4 0 0 1 -4,-4 Z"
            fill="#FFFDF8"
            stroke="#1A4B6E"
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
          <rect x="-19" y="-90" width="38" height="7" fill="#2A8C7E" opacity="0.7" />
          {/* quatre doigts */}
          {[-18, -8.5, 1, 10.5].map((x, i) => (
            <rect key={i} x={x} y={-50 - (i === 1 || i === 2 ? 2 : 0)} width="8.5" height={20 + (i === 1 || i === 2 ? 3 : 0)} rx="4.2" fill="#FFFDF8" stroke="#1A4B6E" strokeWidth="2.2" />
          ))}
          {/* pouce */}
          <rect x="17" y="-82" width="9" height="24" rx="4.5" fill="#FFFDF8" stroke="#1A4B6E" strokeWidth="2.2" transform="rotate(-28 21 -70)" />
        </g>
      </g>
    );
  }
  if (kind === 1) {
    return (
      <g className={`poste poste-jauge${etat.compte ? " is-full" : ""}`} transform="translate(-37 -54) scale(1.6)">
        <rect className="poste-niveau" x="8" y="10" width="30" height="50" fill="#2A8C7E" opacity="0.85" clipPath="url(#jar-clip)" />
        <use href="#jar-empty" />
      </g>
    );
  }
  return (
    <g className={`poste poste-barres${etat.partage ? " is-up" : ""}`}>
      <path d="M-46,36 H46" stroke="#1A4B6E" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      {[
        [-34, 26],
        [-10, 44],
        [14, 62],
      ].map(([x, h], i) => (
        <rect key={i} className="poste-barre" x={x} y={36 - h} width={20} height={h} rx="3" fill={i === 2 ? "#DD8A2E" : "#2A8C7E"} style={{ transitionDelay: `${i * 0.12}s` }} />
      ))}
    </g>
  );
}

export function Parcours() {
  const reduce = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5 });
  const [etat, setEtat] = useState<Etat>(REPOS);
  const [trace, setTrace] = useState(false);
  // La séquence rejoue en boucle tant que la section est visible.
  const [cycle, setCycle] = useState(0);
  const volRef = useRef<SVGAnimateMotionElement>(null);
  const pulseRef = useRef<SVGAnimateMotionElement>(null);

  useEffect(() => {
    if (!inView) return;
    const timers: number[] = [];
    const at = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms));
    if (reduce) {
      at(0, () => {
        setTrace(true);
        setEtat(FINAL);
      });
      return () => timers.forEach((t) => window.clearTimeout(t));
    }
    at(0, () => setTrace(true));
    at(700, () => setEtat((e) => ({ ...e, main: true })));
    at(1500, () => {
      setEtat((e) => ({ ...e, vole: true }));
      volRef.current?.beginElement();
    });
    at(3000, () => setEtat((e) => ({ ...e, vole: false, compte: true })));
    at(3500, () => {
      setEtat((e) => ({ ...e, pulse: true }));
      pulseRef.current?.beginElement();
    });
    at(4600, () => setEtat((e) => ({ ...e, pulse: false, partage: true })));
    // Pause sur l'état final, puis on remet tout au sol et on rejoue.
    at(7600, () => setEtat(REPOS));
    at(8400, () => setCycle((c) => c + 1));
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [inView, reduce, cycle]);

  return (
    <div ref={ref} className={`parcours${trace ? " is-trace" : ""}`}>
      <svg className="parcours-svg" viewBox="0 0 1200 300" aria-hidden="true">
        <defs>
          <clipPath id="poste-clip">
            <circle r={R - 1} />
          </clipPath>
        </defs>

        {/* La ligne qui relie les trois postes */}
        <path
          className="parcours-ligne"
          d={`M30,${NY} H1170`}
          fill="none"
          stroke="#1A4B6E"
          strokeWidth="2"
          strokeDasharray="6 10"
          strokeLinecap="round"
        />

        {/* Trois postes */}
        {NX.map((x, i) => (
          <g key={i} className={`parcours-poste${trace ? " is-on" : ""}`} style={{ transitionDelay: `${0.15 + i * 0.25}s` }} transform={`translate(${x} ${NY})`}>
            <circle r={R} fill="#FFFDF8" stroke="#1A4B6E" strokeWidth="2" />
            <Poste kind={i as 0 | 1 | 2} etat={etat} clip="poste-clip" />
          </g>
        ))}

        {/* Le mégot qui vole du sol au contenant */}
        <g className={`parcours-vol${etat.vole ? " is-on" : ""}`}>
          <g transform="scale(0.62)">
            <use href="#megot" />
          </g>
          <animateMotion ref={volRef} dur="1.5s" begin="indefinite" fill="freeze" rotate="auto" path={VOL} calcMode="spline" keySplines="0.3 0 0.4 1" keyTimes="0;1" />
        </g>

        {/* L'impulsion qui court du contenant au chiffre */}
        <circle className={`parcours-pulse${etat.pulse ? " is-on" : ""}`} r="7" fill="#DD8A2E">
          <animateMotion ref={pulseRef} dur="1.1s" begin="indefinite" fill="freeze" path={PULSE} calcMode="spline" keySplines="0.4 0 0.2 1" keyTimes="0;1" />
        </circle>
      </svg>

      <ol className="parcours-etapes">
        {ETAPES.map((e, i) => (
          <li key={e.n} className={`parcours-etape${trace ? " is-on" : ""}`} style={{ transitionDelay: `${0.3 + i * 0.25}s` }}>
            <svg className="parcours-mini" viewBox="-84 -84 168 168" aria-hidden="true">
              <defs>
                <clipPath id={`poste-clip-mini-${i}`}>
                  <circle r={R - 1} />
                </clipPath>
              </defs>
              <circle r={R} fill="#FFFDF8" stroke="#1A4B6E" strokeWidth="2" />
              <Poste kind={i as 0 | 1 | 2} etat={FINAL} clip={`poste-clip-mini-${i}`} />
            </svg>
            <span className="parcours-n">{e.n}</span>
            <h3>{e.title}</h3>
            <p>{e.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
