"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { MagneticButton } from "./motion/MagneticButton";

const ease = [0.22, 1, 0.36, 1] as const;

const SECOND_LINE_DELAY = 1;

type RejoindreProps = {
  /** Cible de « Venir ramasser » : l'ancre locale si la page a son bandeau « Prochaine sortie ». */
  href?: string;
};

export function Rejoindre({ href = "/rejoindre#prochaine" }: RejoindreProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const shown = Boolean(reduce) || inView;

  // Même état initial côté serveur et client (pas de décalage d'hydratation) :
  // en mouvement réduit, le titre passe à l'état final sans transition.
  const lineInitial = { opacity: 0, y: 16 };
  const lineTarget = shown ? { opacity: 1, y: 0 } : lineInitial;

  return (
    <section className="rejoindre surface-orange" id="rejoindre" ref={ref}>
      <div className="wrap">
        <div className="rejoindre-inner">
          <h2 className="display rejoindre-title">
            <motion.span
              className="rejoindre-line"
              initial={lineInitial}
              animate={lineTarget}
              transition={{ duration: reduce ? 0 : 0.6, ease, delay: reduce ? 0 : 0.05 }}
            >
              Un mégot de moins.
            </motion.span>
            <br />
            <motion.span
              className="rejoindre-line"
              initial={lineInitial}
              animate={lineTarget}
              transition={{
                duration: reduce ? 0 : 0.6,
                ease,
                delay: reduce ? 0 : SECOND_LINE_DELAY,
              }}
            >
              Une rue plus propre.
            </motion.span>
          </h2>
          <div className="rejoindre-actions">
            <MagneticButton className="btn btn-lg btn-navy" href={href}>
              Venir ramasser
            </MagneticButton>
            <MagneticButton className="btn btn-lg btn-cream" href="/contact">
              Nous écrire
            </MagneticButton>
          </div>
        </div>
      </div>

    </section>
  );
}
