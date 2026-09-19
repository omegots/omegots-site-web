"use client";

import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
} from "motion/react";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import {
  LITRES_EAU_PAR_MEGOT,
  megotsParLitre,
  ramassages,
  totals,
} from "@/data/ramassages";
import { fr } from "../motion/useCountUp";

/** Temps que met la marée à recouvrir tout le plateau, en secondes. */
export const MAREE_DUREE_S = 8;
const COLS = 6;
const ROWS = 4;
const N = COLS * ROWS;

/** Générateur déterministe : mêmes positions côté serveur et côté client. */
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Pos = { id: number; x: number; y: number; rotate: number };

/** Grille 6 × 4 légèrement brouillée : cibles espacées, même sur 360 px. */
const POSITIONS: Pos[] = (() => {
  const rand = mulberry32(2026);
  const out: Pos[] = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      out.push({
        id: r * COLS + c,
        x: 9 + c * (82 / (COLS - 1)) + (rand() - 0.5) * 7,
        y: 10 + r * (72 / (ROWS - 1)) + (rand() - 0.5) * 8,
        rotate: -50 + rand() * 100,
      });
    }
  }
  return out;
})();

type Sort = "sauve" | "eau";
type Phase = "idle" | "playing" | "done";

const noop = () => () => {};

export function Maree() {
  const reduce = useReducedMotion() ?? false;
  const canShare = useSyncExternalStore(
    noop,
    () => typeof navigator !== "undefined" && typeof navigator.share === "function",
    () => false,
  );

  const [phase, setPhase] = useState<Phase>("idle");
  const [sorts, setSorts] = useState<Map<number, Sort>>(() => new Map());
  // Source de vérité synchrone (les gestes et la vague peuvent arriver dans la
  // même frame) ; l'état React n'en est que le reflet.
  const sortsRef = useRef<Map<number, Sort>>(new Map());
  const resultRef = useRef<HTMLHeadingElement>(null);

  /* Niveau de l'eau : 100 = tout en bas (plateau sec), 0 = plateau recouvert. */
  const level = useMotionValue(104);
  const waterHeight = useTransform(level, (v) => `${100 - v}%`);

  const finish = useCallback(() => {
    const next = new Map(sortsRef.current);
    for (const p of POSITIONS) if (!next.has(p.id)) next.set(p.id, "eau");
    sortsRef.current = next;
    setSorts(next);
    setPhase("done");
  }, []);

  /** Applique un lot de verdicts et termine si tout est réglé. */
  const applique = useCallback(
    (entries: Array<[number, Sort]>) => {
      const next = new Map(sortsRef.current);
      for (const [id, sort] of entries) if (!next.has(id)) next.set(id, sort);
      sortsRef.current = next;
      setSorts(next);
      if (next.size >= N) setPhase("done");
    },
    [],
  );

  // La vague emporte les mégots qu'elle atteint.
  useMotionValueEvent(level, "change", (v) => {
    if (phase !== "playing") return;
    const current = sortsRef.current;
    const touched = POSITIONS.filter((p) => !current.has(p.id) && p.y + 3 >= v);
    if (touched.length === 0) return;
    applique(touched.map((p) => [p.id, "eau"] as [number, Sort]));
  });

  useEffect(() => {
    if (phase !== "playing") return;
    level.set(104);
    let alive = true;
    // Lente au départ, de plus en plus rapide : la fin se joue à la seconde.
    const ctrl = animate(level, -6, {
      duration: MAREE_DUREE_S,
      ease: [0.4, 0.1, 0.7, 0.7],
    });
    ctrl.then(() => {
      if (alive) finish();
    });
    return () => {
      alive = false;
      ctrl.stop();
    };
  }, [phase, level, finish]);

  useEffect(() => {
    if (phase === "done") resultRef.current?.focus();
  }, [phase]);

  const start = () => {
    sortsRef.current = new Map();
    setSorts(new Map());
    setPhase("playing");
  };

  const ramasser = (id: number) => {
    if (phase !== "playing" || sortsRef.current.has(id)) return;
    applique([[id, "sauve"]]);
  };

  let sauves = 0;
  let eau = 0;
  for (const s of sorts.values()) {
    if (s === "sauve") sauves++;
    else eau++;
  }
  const litresPreserves = sauves * LITRES_EAU_PAR_MEGOT;
  const litresPollues = eau * LITRES_EAU_PAR_MEGOT;
  const premiere = ramassages[0];
  const { megots } = totals();

  const share = async () => {
    try {
      await navigator.share({
        text: `J'ai sauvé ${sauves} mégots de la marée sur omegots.fr, soit ${fr(litresPreserves)} litres d'eau préservés.`,
      });
    } catch {
      // Partage annulé : rien à faire.
    }
  };

  return (
    <div className={`maree-jeu is-${phase}`}>
      <div className="maree-score" role="status" aria-live="polite">
        <span>
          <b className="display">{sauves}</b> sauvé{sauves > 1 ? "s" : ""}
        </span>
        <span>
          <b className="display">{eau}</b> à l&apos;eau
        </span>
      </div>
      <div className="maree-plateau" aria-live="off">
        <div className="maree-sable" aria-hidden="true" />

        {POSITIONS.map((p) => {
          const sort = sorts.get(p.id);
          return (
            <motion.button
              key={p.id}
              type="button"
              className={`maree-megot${sort ? ` is-${sort}` : ""}`}
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
              aria-label="Ramasser ce mégot"
              aria-hidden={sort ? true : undefined}
              tabIndex={phase === "playing" && !sort ? 0 : -1}
              disabled={phase !== "playing" || Boolean(sort)}
              onPointerDown={(e) => {
                e.preventDefault();
                ramasser(p.id);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  ramasser(p.id);
                }
              }}
              initial={false}
              animate={
                sort === "sauve"
                  ? { y: reduce ? 0 : -44, scale: reduce ? 1 : 0.5, opacity: 0 }
                  : sort === "eau"
                    ? { y: reduce ? 0 : 14, rotate: reduce ? p.rotate : p.rotate + 35, opacity: 0 }
                    : { y: 0, scale: 1, rotate: p.rotate, opacity: 1 }
              }
              transition={{
                duration: reduce ? 0 : sort === "eau" ? 0.9 : 0.4,
                ease: sort === "eau" ? "easeIn" : [0.22, 1, 0.36, 1],
              }}
              whileTap={reduce || sort ? undefined : { scale: 0.9 }}
            >
              <svg viewBox="-16 -30 32 52" aria-hidden="true">
                <use href="#megot-raw" />
              </svg>
            </motion.button>
          );
        })}

        <motion.div className="maree-eau" style={{ height: waterHeight }} aria-hidden="true">
          <svg className="maree-crete" viewBox="0 0 2000 40" preserveAspectRatio="none">
            <path
              d="M0,26 q80,-22 160,0 t160,0 t160,0 t160,0 t160,0 t160,0 t160,0 t160,0 t160,0 t160,0 t160,0 t160,0 t160,0 L2000,40 L0,40 Z"
              fill="#2A8C7E"
            />
          </svg>
          <svg className="maree-ligne" viewBox="0 0 2000 24" preserveAspectRatio="none">
            <path
              d="M0,12 q80,-14 160,0 t160,0 t160,0 t160,0 t160,0 t160,0 t160,0 t160,0 t160,0 t160,0 t160,0 t160,0 t160,0"
              fill="none"
              stroke="#F5EFE0"
              strokeWidth="1.6"
              opacity=".4"
            />
          </svg>
        </motion.div>


        {phase === "idle" && (
          <div className="maree-voile">
            <p className="maree-voile-kicker">
              {N} mégots sur le sable, {MAREE_DUREE_S} secondes de marée
            </p>
            <button type="button" className="btn btn-lg" onClick={start}>
              Jouer
            </button>
          </div>
        )}

        {phase === "done" && (
          <div className="maree-voile maree-resultat">
            <h3 className="display" tabIndex={-1} ref={resultRef}>
              {sauves} sauvé{sauves > 1 ? "s" : ""}, {eau} parti{eau > 1 ? "s" : ""} à l&apos;eau.
            </h3>
            <p>
              <b>{fr(litresPreserves)} L</b> d&apos;eau préservés,{" "}
              <b>{fr(litresPollues)} L</b> pollués. Le {premiere.date},{" "}
              {premiere.benevoles} bénévoles en ont ramassé environ {fr(megots)}{" "}
              en {premiere.duree}, à {fr(megotsParLitre())} par litre.
            </p>
            <div className="maree-actions">
              <button type="button" className="btn ghost" onClick={start}>
                Rejouer
              </button>
              <Link href="/#prochaine" className="btn">
                Venir ramasser
              </Link>
              {canShare && sauves > 0 && (
                <button type="button" className="maree-share" onClick={share}>
                  Partager mon score
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
