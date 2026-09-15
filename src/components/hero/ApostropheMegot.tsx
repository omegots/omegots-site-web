"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Apostrophe de « c'est possible. » : le mégot monochrome de la charte, qui tombe
 * dans le titre. L'apostrophe typographique reste dans un span sr-only pour les
 * lecteurs d'écran, et reprend le dessus sous 480 px (bascule en CSS, hero.css).
 */
export function ApostropheMegot({ delay = 0.8 }: { delay?: number }) {
  const reduce = useReducedMotion();

  return (
    <>
      <span className="sr-only">&apos;</span>
      <span className="apo-text" aria-hidden="true">
        &apos;
      </span>
      <motion.svg
        className="apo"
        viewBox="-19 -29 28 50"
        aria-hidden="true"
        focusable="false"
        initial={reduce ? false : { y: -34, rotate: -28, opacity: 0 }}
        animate={{ y: 0, rotate: 0, opacity: 1 }}
        transition={
          reduce
            ? { duration: 0 }
            : {
                type: "spring",
                stiffness: 320,
                damping: 14,
                delay,
                opacity: { duration: 0.2, delay },
              }
        }
      >
        <use href="#megot-mono" transform="rotate(16)" />
      </motion.svg>
    </>
  );
}
