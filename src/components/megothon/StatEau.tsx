"use client";

import { LITRES_EAU_PAR_MEGOT } from "@/data/ramassages";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import { useRef, useState } from "react";
import { fr } from "../motion/useCountUp";

/** Équivalences de sensibilisation : une baignoire, une petite bouteille. */
export const LITRES_PAR_BAIGNOIRE = 200;
export const LITRES_PAR_BOUTEILLE = 0.5;

type Mode = "litres" | "baignoires" | "bouteilles";
const ORDRE: Mode[] = ["litres", "baignoires", "bouteilles"];
const ease = [0.22, 1, 0.36, 1] as const;

type StatEauProps = {
  /** Total d'eau douce préservée, en litres (totals().eau). */
  eau: number;
  /** Valeur lissée du compteur, pilotée par la timeline du Mégothon. */
  spring: MotionValue<number>;
};

/** La stat « eau » avec bascule litres / baignoires / bouteilles. */
export function StatEau({ eau, spring }: StatEauProps) {
  const reduce = useReducedMotion();
  const [mode, setMode] = useState<Mode>("litres");
  const ref = useRef<HTMLSpanElement>(null);

  useMotionValueEvent(spring, "change", (v) => {
    if (ref.current) ref.current.textContent = fr(Math.round(v));
  });

  const baignoires = Math.round(eau / LITRES_PAR_BAIGNOIRE);
  const bouteilles = Math.round(eau / LITRES_PAR_BOUTEILLE);
  const suivant = ORDRE[(ORDRE.indexOf(mode) + 1) % ORDRE.length];

  const vues: Record<
    Mode,
    { legende: string; phrase: string; bouton: string; label: string }
  > = {
    litres: {
      legende: "d'eau douce préservés",
      phrase: `${fr(eau)} litres d'eau douce préservés, à ${fr(LITRES_EAU_PAR_MEGOT)} litres par mégot`,
      bouton: "en litres ?",
      label: "Afficher l'équivalent en litres d'eau douce",
    },
    baignoires: {
      legende: `baignoires de ${fr(LITRES_PAR_BAIGNOIRE)} L préservées`,
      phrase: `${fr(baignoires)} baignoires de ${fr(LITRES_PAR_BAIGNOIRE)} litres d'eau douce préservées`,
      bouton: "en baignoires ?",
      label: `Afficher l'équivalent en baignoires de ${fr(LITRES_PAR_BAIGNOIRE)} litres`,
    },
    bouteilles: {
      legende: `bouteilles de ${fr(LITRES_PAR_BOUTEILLE * 100)} cl préservées`,
      phrase: `${fr(bouteilles)} bouteilles de ${fr(LITRES_PAR_BOUTEILLE * 100)} cl d'eau douce préservées`,
      bouton: "en bouteilles ?",
      label: `Afficher l'équivalent en bouteilles de ${fr(LITRES_PAR_BOUTEILLE * 100)} cl`,
    },
  };

  const faceInitial = reduce ? { opacity: 0 } : { rotateX: 90, opacity: 0, y: 10 };
  const faceExit = reduce ? { opacity: 0 } : { rotateX: -90, opacity: 0, y: -10 };

  return (
    <li className="stat-eau">
      <b className="display stat-eau-num" aria-hidden="true">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={mode}
            className="stat-eau-face"
            initial={faceInitial}
            animate={{ rotateX: 0, opacity: 1, y: 0 }}
            exit={faceExit}
            transition={{ duration: reduce ? 0 : 0.38, ease }}
          >
            {mode === "litres" && (
              <>
                <span ref={ref}>{fr(Math.round(spring.get()))}</span> L
              </>
            )}
            {mode === "baignoires" && fr(baignoires)}
            {mode === "bouteilles" && fr(bouteilles)}
          </motion.span>
        </AnimatePresence>
      </b>
      <span className="sr-only" aria-live="polite" aria-atomic="true">
        {vues[mode].phrase}
      </span>
      <span aria-hidden="true">{vues[mode].legende}</span>
      <button
        type="button"
        className="stat-eau-toggle"
        aria-label={vues[suivant].label}
        onClick={() => setMode(suivant)}
      >
        {vues[suivant].bouton}
      </button>
    </li>
  );
}
