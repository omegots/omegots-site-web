"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { chiffreCle, formatContenance } from "@/data/chiffres";
import { ramassages, totals } from "@/data/ramassages";
import { fr } from "../motion/useCountUp";

const INTERVAL_MS = 2800;

/** Durée « 2 h » de la fiche de ramassage, écrite en toutes lettres. */
function dureeLongue(duree: string) {
  const n = parseInt(duree, 10);
  if (Number.isNaN(n)) return duree;
  return `${n} heure${n > 1 ? "s" : ""}`;
}

/** Contenance d'une baignoire (200 L), lue dans les équivalences du chiffre clé. */
function baignoire() {
  return chiffreCle.equivalences.find((e) => e.id === "baignoire") ?? chiffreCle.equivalences[0];
}

export function captionLines() {
  const { megots, eau } = totals();
  const premier = ramassages[0];
  const b = baignoire();
  return [
    `de mégots ramassés en ${dureeLongue(premier.duree)}`,
    `soit environ ${fr(megots)} mégots`,
    `soit environ ${fr(eau)} L d'eau préservés`,
    `soit environ ${fr(Math.round(eau / b.capaciteL))} ${b.nom} de ${formatContenance(b.capaciteL).replace(" ", " ")}`,
  ];
}

/**
 * Légende de la photo : le « 6 L » reste, la phrase à droite glisse toutes les
 * 2,8 s. Un seul cycle, puis figé sur la dernière ligne. Pause au survol.
 * Mouvement réduit : même balisage (hydratation), mais on saute directement à la
 * dernière ligne, sans glissement.
 */
export function CaptionCycle() {
  const reduce = useReducedMotion();
  const lines = captionLines();
  const last = lines.length - 1;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || index >= last) return;
    const t = setTimeout(
      () => setIndex((i) => (reduce ? last : Math.min(i + 1, last))),
      reduce ? 0 : INTERVAL_MS,
    );
    return () => clearTimeout(t);
  }, [index, paused, last, reduce]);

  const date = ramassages[0].date;
  const phrase = `${lines[0]}, ${lines.slice(1).join(", ")}. Mégothon du ${date}.`;

  return (
    <span
      className="hero-cap-text"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <span className="sr-only">{phrase}</span>
      <span className="hero-cap-cycle" aria-hidden="true">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={index}
            className="hero-cap-line"
            initial={reduce ? false : { y: "110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { y: "-110%", opacity: 0 }}
            transition={reduce ? { duration: 0 } : { duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {lines[index]}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="hero-cap-date" aria-hidden="true">
        Mégothon du {date}.
      </span>
    </span>
  );
}
