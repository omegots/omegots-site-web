"use client";

import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import { useEffect, useRef, useState } from "react";

/** Même tracé que le sprite #jar-clip : contour pulsant quand le contenant se réveille. */
const CONTOUR = "M8,8 h30 v46 a6,6 0 0 1 -6,6 h-18 a6,6 0 0 1 -6,-6 Z";

export const EMAIL_INPUT_ID = "prevenir-email";

type JarGhostProps = {
  /** Le champ e-mail a le focus : le contenant se redresse. */
  awake: boolean;
  /** L'adresse a été envoyée : un mégot tombe dedans. */
  inscrit: boolean;
};

/**
 * Le septième contenant, celui de la prochaine sortie. Bouton : au tap il se
 * remplit d'un trait, se vide, puis envoie le focus au champ e-mail.
 */
export function JarGhost({ awake, inscrit }: JarGhostProps) {
  const reduce = useReducedMotion();
  const fill = useMotionValue(0);
  const [busy, setBusy] = useState(false);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  function focusEmail() {
    const el = document.getElementById(EMAIL_INPUT_ID);
    if (el instanceof HTMLElement) el.focus();
  }

  async function onTap() {
    if (busy) return;
    if (reduce) {
      focusEmail();
      return;
    }
    setBusy(true);
    await animate(fill, 1, { duration: 0.45, ease: [0.3, 0.8, 0.3, 1] });
    await animate(fill, 0, { duration: 0.3, ease: "easeIn" });
    if (!mounted.current) return;
    setBusy(false);
    focusEmail();
  }

  const eveille = awake || inscrit;

  return (
    <motion.button
      type="button"
      className={`jar-ghost${eveille ? " is-awake" : ""}${inscrit ? " is-inscrit" : ""}`}
      aria-label="Aller au champ e-mail pour être prévenu de la prochaine sortie"
      onClick={onTap}
      initial={false}
      animate={eveille ? "awake" : "idle"}
      variants={{
        idle: { scale: 1, y: 0, opacity: 0.3 },
        awake: { scale: 1.08, y: -3, opacity: 0.85 },
      }}
      transition={
        reduce ? { duration: 0 } : { type: "spring", stiffness: 320, damping: 18 }
      }
      whileTap={reduce ? undefined : { scale: 0.94 }}
    >
      <svg className="jar" viewBox="0 0 46 64" aria-hidden="true">
        <motion.rect
          className="jar-lvl"
          x="8"
          y="10"
          width="30"
          height="50"
          fill="#2A8C7E"
          opacity=".9"
          clipPath="url(#jar-clip)"
          style={{ scaleY: fill, originY: 1 }}
        />
        <use href="#jar-empty" />
        <path className="jar-ghost-ring" d={CONTOUR} />
        {!inscrit && (
          <path className="jar-ghost-plus" d="M23,28 v12 M17,34 h12" />
        )}
        <g clipPath="url(#jar-clip)">
          <g transform="translate(23 49) scale(0.58)">
            <AnimatePresence>
              {inscrit && (
                <motion.g
                  key="megot"
                  initial={
                    reduce
                      ? { opacity: 0 }
                      : { y: -95, opacity: 0, rotate: -35 }
                  }
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  transition={
                    reduce
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 180, damping: 14, mass: 0.9 }
                  }
                >
                  <use href="#megot" />
                </motion.g>
              )}
            </AnimatePresence>
          </g>
        </g>
      </svg>
    </motion.button>
  );
}
