"use client";

import { chiffreCle } from "@/data/chiffres";
import { useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { Cigarette } from "./chiffres/Cigarette";
import { Reveal } from "./Reveal";

/** Niveau d'eau final, en % depuis le haut : l'eau s'arrête sous le sommet, la houle reste visible. */
const NIVEAU_PLEIN = 16;

/** Découpe en vague : `top` en % (0 = plein, 100 = vide), `phase` fait onduler la crête. */
function waveClip(top: number, phase: number) {
  const amp = 4.5;
  const steps = 28;
  const pts: string[] = [];
  for (let i = 0; i <= steps; i++) {
    // Le contour du texte déborde d'un pixel de la boîte : la découpe va de -2 % à 102 %.
    const x = -2 + (i / steps) * 104;
    const y = top + Math.sin(i * 0.75 + phase) * amp + Math.sin(i * 0.31 - phase * 0.6) * 1.8;
    pts.push(`${x.toFixed(2)}% ${y.toFixed(2)}%`);
  }
  return `polygon(${pts.join(", ")}, 102% 120%, -2% 120%)`;
}

/**
 * « Pourquoi un mégot, ça compte » : le 500 L se remplit d'eau en vague,
 * trois chiffres clés à droite. Les équivalences (baignoires, bouteilles,
 * verres) restent dans chiffres.ts pour la page « Le mégot ».
 */
export function Chiffres() {
  const ref = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduce = useReducedMotion();
  // Une fois rempli, on ne rejoue pas la montée : seule la houle continue.
  const filled = useRef(false);

  useEffect(() => {
    const el = fillRef.current;
    if (!el) return;
    if (reduce) {
      el.style.clipPath = waveClip(NIVEAU_PLEIN, 0);
      return;
    }
    if (!inView) return;
    const t0 = performance.now();
    const fillMs = filled.current ? 0 : 2200;
    let raf = 0;
    const tick = (t: number) => {
      const p = fillMs === 0 ? 1 : Math.min(1, (t - t0) / fillMs);
      const eased = 1 - Math.pow(1 - p, 3);
      const top = 106 - eased * (106 - NIVEAU_PLEIN);
      el.style.clipPath = waveClip(top, (t - t0) / 320);
      if (p >= 1) filled.current = true;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce]);

  return (
    <section className="chiffres surface-navy" id="pourquoi">
      <div className="wrap chiffres-grid">
        <div className="chiffres-main" ref={ref}>
          <p className="chiffres-big display">
            <span className="chiffres-num" aria-hidden="true">
              <span className="chiffres-num-stroke">{chiffreCle.valeur}</span>
              <span className="chiffres-num-fill" ref={fillRef}>
                {chiffreCle.valeur}
              </span>
            </span>
            <span className="chiffres-unit" aria-hidden="true">
              {chiffreCle.unite}
            </span>
            <span className="sr-only">
              {chiffreCle.valeur} {chiffreCle.uniteLongue}
            </span>
          </p>
          <Reveal delay={0.1}>
            <p className="chiffres-lead">{chiffreCle.texte}</p>
          </Reveal>
        </div>

        <div className="chiffres-side">
          <Cigarette />
        </div>

      </div>
    </section>
  );
}
