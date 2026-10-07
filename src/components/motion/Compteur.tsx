"use client";

import { useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { fr } from "@/data/format";

/**
 * Un nombre qui défile de 0 à sa valeur quand il entre à l'écran. Le HTML
 * porte toujours la valeur finale (robots, sans JavaScript, mouvement réduit) :
 * seul le texte est réécrit, sans re-rendu React.
 */
export function Compteur({ valeur, duree = 1400 }: { valeur: number; duree?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const decimales = Number.isInteger(valeur) ? 0 : 2;
  const format = (v: number) => fr(Number(v.toFixed(decimales)));

  // Avant l'entrée à l'écran, côté client : on repart de zéro.
  useEffect(() => {
    if (reduce || inView || !ref.current) return;
    ref.current.textContent = format(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce, inView]);

  useEffect(() => {
    if (!inView || reduce || !ref.current) return;
    const el = ref.current;
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duree);
      el.textContent = format(valeur * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      el.textContent = format(valeur);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce, valeur, duree]);

  return <span ref={ref}>{format(valeur)}</span>;
}
