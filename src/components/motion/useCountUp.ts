"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

/** Compteur animé de 0 à `target`, déclenché quand `active` passe à true. */
export function useCountUp(target: number, active: boolean, duration = 1400) {
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active || reduce) return;
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration, reduce]);

  // Mouvement réduit : pas d'animation, la valeur finale s'affiche directement.
  return reduce && active ? target : value;
}

// Le formateur vit dans src/data/format.ts (module partagé serveur/client) ; réexport pour les composants client existants.
export { fr } from "@/data/format";
