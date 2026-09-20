"use client";

import {
  LITRES_EAU_PAR_MEGOT,
  megotsParLitre,
  ramassages,
  totals,
} from "@/data/ramassages";
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FormPrevenir, type EtatPrevenir } from "./FormPrevenir";
import { JarGhost } from "./megothon/JarGhost";
import { StatEau } from "./megothon/StatEau";
import { Reveal } from "./Reveal";
import { fr } from "./motion/useCountUp";

/** Durée de remplissage d'un contenant, en secondes (timeline linéaire). */
const DUREE_PAR_CONTENANT = 0.5;
const DELAI_DEPART = 0.25;
/* restDelta / restSpeed en unités : sur des millions, le ressort doit se caler net. */
const RESSORT = {
  stiffness: 180,
  damping: 24,
  mass: 1,
  restDelta: 0.5,
  restSpeed: 10,
};
const ease = [0.22, 1, 0.36, 1] as const;

type JarProps = {
  index: number;
  /** Timeline maîtresse : 0 → litres, le contenant n se remplit entre n et n + 1. */
  master: MotionValue<number>;
  reduce: boolean;
};

/** Un contenant plein = un litre. Son niveau dérive de la timeline, sans re-rendu. */
function Jar({ index, master, reduce }: JarProps) {
  const scaleY = useTransform(master, (v) => {
    const p = Math.min(1, Math.max(0, v - index));
    return 1 - (1 - p) * (1 - p);
  });
  const [flying, setFlying] = useState(false);
  const fired = useRef(false);

  useMotionValueEvent(master, "change", (v) => {
    if (reduce || fired.current || v < index + 1) return;
    fired.current = true;
    setFlying(true);
  });

  return (
    <span className="jar-slot">
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
          style={{ scaleY, originY: 1 }}
        />
        <use href="#jar-empty" />
      </svg>
      <AnimatePresence>
        {flying && (
          <motion.span
            className="jar-float"
            aria-hidden="true"
            initial={{ opacity: 0, y: 6, scale: 0.8 }}
            animate={{ opacity: 1, y: -24, scale: 1 }}
            exit={{ opacity: 0, y: -38 }}
            transition={{ duration: 0.45, ease }}
            onAnimationComplete={() => setFlying(false)}
          >
            +{fr(megotsParLitre())}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

export function Megothon() {
  const premiere = ramassages[0];
  const { litres, megots, eau } = totals();
  const reduce = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });

  // Une seule timeline : les contenants se remplissent l'un après l'autre,
  // et chaque contenant plein fait bondir les deux compteurs.
  const master = useMotionValue(0);
  const megotsSrc = useMotionValue(0);
  const eauSrc = useMotionValue(0);
  const megotsSpring = useSpring(megotsSrc, RESSORT);
  const eauSpring = useSpring(eauSrc, RESSORT);
  const megotsRef = useRef<HTMLSpanElement>(null);
  const palier = useRef(0);

  // Le HTML sert la valeur finale (robots, agents) ; côté client, le compteur
  // repart de zéro juste avant l'animation.
  useEffect(() => {
    if (reduce || inView) return;
    if (megotsRef.current) megotsRef.current.textContent = fr(0);
  }, [reduce, inView]);

  useMotionValueEvent(master, "change", (v) => {
    const n = Math.floor(v + 1e-6);
    if (n === palier.current) return;
    palier.current = n;
    megotsSrc.set(n * megotsParLitre());
    eauSrc.set(n * megotsParLitre() * LITRES_EAU_PAR_MEGOT);
  });

  useMotionValueEvent(megotsSpring, "change", (v) => {
    if (megotsRef.current) megotsRef.current.textContent = fr(Math.round(v));
  });

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      master.jump(litres);
      megotsSrc.jump(megots);
      megotsSpring.jump(megots);
      eauSrc.jump(eau);
      eauSpring.jump(eau);
      return;
    }
    const ctrl = animate(master, litres, {
      duration: litres * DUREE_PAR_CONTENANT,
      ease: "linear",
      delay: DELAI_DEPART,
    });
    // Filet de sécurité : une fois la timeline finie, les totaux sont exacts.
    ctrl.then(() => {
      megotsSrc.set(megots);
      eauSrc.set(eau);
    });
    return () => ctrl.stop();
  }, [
    inView,
    reduce,
    litres,
    megots,
    eau,
    master,
    megotsSrc,
    eauSrc,
    megotsSpring,
    eauSpring,
  ]);

  // Le contenant fantôme réagit au formulaire.
  const [focused, setFocused] = useState(false);
  const [etat, setEtat] = useState<EtatPrevenir>("idle");
  const inscrit = etat === "ok";
  const hint = inscrit
    ? "Vous y serez."
    : focused
      ? "Celui-là, c'est la prochaine sortie."
      : null;

  return (
    <section className="megothon surface-navy" id="actions">
      <div className="wrap">
        <Reveal direction="rise" className="section-head is-center">
          <h2 className="display">
            {litres} litres de mégots en {premiere.duree}.
          </h2>
          <p className="lede">
            {premiere.libelle} du {premiere.date} : {premiere.benevoles}{" "}
            bénévoles, {premiere.lieu}, en plein centre-ville de Saint-Nazaire.
            Voici ce que les trottoirs ont rendu en une matinée.
          </p>
        </Reveal>

        <div className="megothon-grid">
          <Reveal direction="left" className="megothon-photo">
            <Image
              src="/photos/megothon-2026-05.jpg"
              alt="Mosaïque du Mégothon : les bénévoles devant la mairie de Saint-Nazaire, les bouteilles remplies de mégots, et le ramassage au sol."
              fill
              quality={60}
              sizes="(max-width: 480px) 100vw, (max-width: 860px) 92vw, 560px"
              style={{ objectFit: "cover" }}
            />
          </Reveal>

          <div className="megothon-side" ref={ref}>
            <Reveal direction="right" delay={0.1}>
              <ul className="megothon-stats">
                <li>
                  <b className="display">{premiere.benevoles}</b>
                  <span>bénévoles</span>
                </li>
                <li>
                  <b className="display">{premiere.duree}</b>
                  <span>de ramassage</span>
                </li>
                <li>
                  <b className="display" aria-hidden="true">
                    <span ref={megotsRef}>{fr(megots)}</span>
                  </b>
                  <span className="sr-only">
                    {fr(megots)} mégots environ, à {fr(megotsParLitre())} par
                    litre
                  </span>
                  <span aria-hidden="true">mégots ramassés</span>
                </li>
                <StatEau eau={eau} spring={eauSpring} />
              </ul>
            </Reveal>

            <Reveal direction="right" delay={0.2} className="jars-block">
              <p className="jars-label">Un contenant par litre ramassé</p>
              <div className="jars">
                {Array.from({ length: litres }, (_, i) => (
                  <Jar key={i} index={i} master={master} reduce={reduce} />
                ))}
                <JarGhost awake={focused} inscrit={inscrit} />
              </div>
              <div className="jars-foot">
                <motion.p
                  className="jars-note"
                  initial={false}
                  animate={{ opacity: hint ? 0 : 1 }}
                  transition={{ duration: reduce ? 0 : 0.25 }}
                  aria-hidden={hint ? true : undefined}
                >
                  La liste s&apos;allonge à chaque sortie. Le prochain contenant
                  attend la prochaine date.
                </motion.p>
                <AnimatePresence mode="wait" initial={false}>
                  {hint && (
                    <motion.p
                      key={hint}
                      className="jars-hint"
                      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduce ? { opacity: 0 } : { opacity: 0, y: -4 }}
                      transition={{ duration: reduce ? 0 : 0.28, ease }}
                    >
                      {hint}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.1} className="megothon-next" id="prochaine">
          <div>
            <p className="megothon-next-tag">Prochaine sortie</p>
            <p className="megothon-next-title display">
              Le prochain ramassage arrive.
            </p>
            <p className="megothon-next-text">
              Date à fixer. Laissez votre adresse, on vous écrit dès
              que la date est fixée. Rien d&apos;autre, promis.
            </p>
          </div>
          <FormPrevenir onFocusChange={setFocused} onEtatChange={setEtat} />
        </Reveal>
      </div>
    </section>
  );
}
