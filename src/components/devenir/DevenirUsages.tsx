"use client";

import { LayoutGroup, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type FocusEvent } from "react";
import { StaggerItem } from "../Reveal";
import { SCENES } from "./Scenes";

/** Cadence du mégot voyageur, en millisecondes. */
const STEP_MS = 3500;

type Usage = {
  title: string;
  text: string;
};

const usages: Usage[] = [
  {
    title: "Mobilier urbain",
    text: "Bancs, bacs à fleurs, potelets fabriqués à partir du plastique des filtres.",
  },
  {
    title: "Cendriers",
    text: "Les mégots servent à fabriquer de nouveaux cendriers. La boucle est bouclée.",
  },
  {
    title: "Emballages",
    text: "Matière régénérée intégrée dans des emballages industriels.",
  },
  {
    title: "Énergie",
    text: "Valorisation énergétique : la matière sert de combustible.",
  },
];

/**
 * Grille des quatre usages, parcourue par le mégot voyageur (jeton partagé
 * qui saute de case en case).
 */
export function DevenirUsages() {
  const reduce = Boolean(useReducedMotion());
  const gridRef = useRef<HTMLDivElement>(null);
  const inView = useInView(gridRef, { amount: 0.3 });
  const [active, setActive] = useState(0);
  const [started, setStarted] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  // Auto-défilement : seulement visible, après l'entrée, sans pointeur ni
  // focus sur la grille, et jamais en mouvement réduit.
  const running = started && inView && !hovered && !focused && !reduce;

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % usages.length);
    }, STEP_MS);
    return () => window.clearInterval(id);
  }, [running]);

  function onBlur(e: FocusEvent<HTMLDivElement>) {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
  }

  return (
    <LayoutGroup id="devenir-usages">
      <motion.div
        ref={gridRef}
        className="devenir-list"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.18 }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: reduce ? 0 : 0.08 } },
        }}
        onAnimationComplete={(definition) => {
          if (definition === "show") setStarted(true);
        }}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onFocus={() => setFocused(true)}
        onBlur={onBlur}
      >
        {usages.map((u, i) => {
          const isActive = i === active;
          const Scene = SCENES[i];
          return (
            <StaggerItem key={u.title}>
              <article
                className={isActive ? "devenir-item is-active" : "devenir-item"}
                tabIndex={0}
                onPointerEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
              >
                <div className="devenir-tile" aria-hidden="true">
                  <Scene active={isActive} />
                  {isActive && (
                    <motion.span
                      className="devenir-token"
                      layoutId="megot-token"
                      transition={{
                        layout: reduce
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 260, damping: 26 },
                      }}
                    >
                      <svg viewBox="-30 -30 60 40">
                        <use href="#megot" />
                      </svg>
                    </motion.span>
                  )}
                </div>
                <div className="devenir-body">
                  <h3>{u.title}</h3>
                  <p>{u.text}</p>
                </div>
              </article>
            </StaggerItem>
          );
        })}
      </motion.div>
    </LayoutGroup>
  );
}
