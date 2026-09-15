"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { LITRES_EAU_PAR_MEGOT, totals } from "@/data/ramassages";
import { fr } from "../motion/useCountUp";

type Spot = { left: string; top: string; width: number; delay?: string };

/** Les deux mégots visibles au chargement (positions et délais d'origine du hero). */
const INITIAL: Spot[] = [
  { left: "12%", top: "18%", width: 74 },
  { left: "78%", top: "44%", width: 56, delay: "1.2s" },
];

/** Positions des mégots qui dérivent après un ramassage. Liste fixe : rien d'aléatoire au rendu. */
const RESPAWN: Spot[] = [
  { left: "22%", top: "40%", width: 62 },
  { left: "70%", top: "16%", width: 68 },
  { left: "6%", top: "46%", width: 54 },
  { left: "86%", top: "30%", width: 60 },
  { left: "30%", top: "14%", width: 58 },
  { left: "62%", top: "48%", width: 52 },
];

const RESPAWN_MS = 1500;
const CTA_AT = 3;

type Megot = Spot & { id: number; fresh: boolean };

const exitSpring = { type: "spring", stiffness: 260, damping: 18 } as const;

/**
 * Les mégots qui flottent dans l'eau du hero. Chacun est un bouton :
 * on le ramasse, il sort de l'eau, une pastille factuelle apparaît au bord de
 * l'eau, et un autre mégot dérive dans le champ 1,5 s plus tard.
 */
export function MegotField() {
  const reduce = useReducedMotion();
  const [megots, setMegots] = useState<Megot[]>(() =>
    INITIAL.map((s, i) => ({ ...s, id: i, fresh: false })),
  );
  const [picked, setPicked] = useState(0);
  const nextId = useRef(INITIAL.length);
  const nextSpot = useRef(0);
  const timers = useRef(new Set<ReturnType<typeof setTimeout>>());

  useEffect(() => {
    const pending = timers.current;
    return () => {
      pending.forEach(clearTimeout);
      pending.clear();
    };
  }, []);

  function pick(id: number) {
    setMegots((list) => list.filter((m) => m.id !== id));
    setPicked((n) => n + 1);
    const t = setTimeout(() => {
      timers.current.delete(t);
      const spot = RESPAWN[nextSpot.current % RESPAWN.length];
      nextSpot.current += 1;
      const megot: Megot = { ...spot, id: nextId.current, fresh: true };
      nextId.current += 1;
      setMegots((list) => [...list, megot]);
    }, RESPAWN_MS);
    timers.current.add(t);
  }

  const eau = picked * LITRES_EAU_PAR_MEGOT;
  const cta = picked >= CTA_AT;

  return (
    <>
      <AnimatePresence>
        {megots.map((m) => {
          const style: CSSProperties = { left: m.left, top: m.top, width: m.width };
          if (m.delay) style.animationDelay = m.delay;
          if (m.fresh) style.animationDelay = "0s";
          return (
            <div key={m.id} className="hero-megot" style={style}>
              <motion.button
                type="button"
                className="hero-megot-btn"
                aria-label="Ramasser ce mégot"
                onClick={() => pick(m.id)}
                initial={m.fresh && !reduce ? { x: -70, opacity: 0 } : false}
                animate={{ x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 }}
                exit={
                  reduce
                    ? { opacity: 0, transition: { duration: 0 } }
                    : {
                        y: -70,
                        rotate: 40,
                        scale: 0,
                        opacity: 0,
                        transition: { ...exitSpring, opacity: { duration: 0.35 } },
                      }
                }
                whileHover={reduce ? undefined : { y: -4, rotate: -8 }}
                whileTap={reduce ? undefined : { scale: 0.92 }}
                transition={
                  reduce ? { duration: 0 } : { duration: 1.1, ease: [0.22, 1, 0.36, 1] }
                }
              >
                <svg viewBox="-30 -30 60 40" aria-hidden="true" focusable="false">
                  <use href="#megot" />
                </svg>
              </motion.button>
            </div>
          );
        })}
      </AnimatePresence>

      <div className="hero-pick-slot" role="status" aria-live="polite">
        <AnimatePresence mode="wait">
          {picked > 0 && (
            <motion.div
              key={cta ? "cta" : `n${picked}`}
              className="hero-pick"
              initial={reduce ? false : { opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: reduce ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              {cta ? (
                <>
                  <span>
                    Il y en avait environ {fr(totals().megots)} rien qu&apos;au
                    centre-ville.
                  </span>
                  <a className="hero-pick-link" href="#prochaine">
                    Venir ramasser <span aria-hidden="true">→</span>
                  </a>
                </>
              ) : (
                <span>
                  {picked} mégot{picked > 1 ? "s" : ""} ramassé{picked > 1 ? "s" : ""},{" "}
                  {fr(eau)}&nbsp;L d&apos;eau préservés
                </span>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
