"use client";

import { useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { fr } from "@/data/format";
import { Compteur } from "../motion/Compteur";

type BilanProps = {
  litres: number;
  megots: number;
  eau: number;
  benevoles: number;
  sorties: number;
  /** « mai 2026 » : le mois de la première sortie. */
  depuis: string;
  parLitre: number;
};

/** Équivalences de sensibilisation : une baignoire, une petite bouteille. */
const LITRES_PAR_BAIGNOIRE = 200;
const LITRES_PAR_BOUTEILLE = 0.5;

/** Au-delà, les petites icônes s'arrêtent et un « +n » prend le relais. */
const MAX_PICTOS = 14;

const style = (k: number): CSSProperties => ({ ["--k" as string]: k });

function Picto({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {children}
    </svg>
  );
}

const PERSONNE = (
  <Picto>
    <circle cx="12" cy="7.5" r="4" />
    <path d="M4 22c0-4.6 3.6-7.6 8-7.6s8 3 8 7.6z" />
  </Picto>
);

function Plus({ total }: { total: number }) {
  return total > MAX_PICTOS ? <span className="bilan-plus">+{total - MAX_PICTOS}</span> : null;
}

type Carte = {
  cle: string;
  label: string;
  chiffre: ReactNode;
  detail: ReactNode;
  viz: ReactNode;
};

/**
 * Le bilan chiffré, en quatre cartes orange : un grand chiffre qui défile, une
 * ligne de contexte et un petit visuel qui se construit à l'arrivée (une
 * silhouette par bénévole, un fanion par sortie, un contenant par litre, une
 * vague pour l'eau). Partagé par l'accueil et la page Ramassages.
 */
export function Bilan({ litres, megots, eau, benevoles, sorties, depuis, parLitre }: BilanProps) {
  const ref = useRef<HTMLUListElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [modeEau, setModeEau] = useState<"litres" | "baignoires" | "bouteilles">("litres");

  // Classes d'animation posées côté client seulement : sans JavaScript, tout reste visible.
  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    el.classList.toggle("is-pret", !inView);
    el.classList.toggle("is-vu", inView);
  }, [inView, reduce]);

  const parSortie = sorties > 0 ? Math.round(benevoles / sorties) : 0;
  const contenants = Math.ceil(litres);
  const dernier = litres - Math.floor(litres);

  // Au-delà du million, « 2,9 millions » : le chiffre tient dans sa carte.
  const grand = (n: number, unite: string) =>
    n >= 1_000_000 ? (
      <>
        <Compteur valeur={Math.round(n / 100_000) / 10} />
        <small> millions</small>
      </>
    ) : (
      <>
        <Compteur valeur={Math.round(n)} />
        {unite && <small> {unite}</small>}
      </>
    );
  const eauVues = {
    litres: {
      chiffre: grand(eau, "L"),
      legende: eau >= 1_000_000 ? "de litres d'eau douce que ces mégots pouvaient polluer" : "d'eau douce que ces mégots pouvaient polluer",
      suivant: "baignoires" as const,
      bouton: "en baignoires ?",
    },
    baignoires: {
      chiffre: grand(eau / LITRES_PAR_BAIGNOIRE, ""),
      legende: `baignoires de ${LITRES_PAR_BAIGNOIRE} L épargnées`,
      suivant: "bouteilles" as const,
      bouton: "en bouteilles ?",
    },
    bouteilles: {
      chiffre: grand(eau / LITRES_PAR_BOUTEILLE, ""),
      legende: `bouteilles de ${LITRES_PAR_BOUTEILLE * 100} cl épargnées`,
      suivant: "litres" as const,
      bouton: "en litres ?",
    },
  };
  const vueEau = eauVues[modeEau];

  const cartes: Carte[] = [
    {
      cle: "benevoles",
      label: "Bénévoles",
      chiffre: <Compteur valeur={benevoles} />,
      detail: sorties > 1 ? `environ ${parSortie} par sortie` : "venus ramasser",
      viz: (
        <span className="bilan-viz bilan-personnes">
          {Array.from({ length: Math.min(benevoles, MAX_PICTOS) }, (_, k) => (
            <i key={k} style={style(k)}>
              {PERSONNE}
            </i>
          ))}
          <Plus total={benevoles} />
        </span>
      ),
    },
    {
      cle: "sorties",
      label: "Sorties",
      chiffre: <Compteur valeur={sorties} />,
      detail: depuis ? `depuis ${depuis}` : "de ramassage",
      viz: (
        <span className="bilan-viz bilan-fanions">
          {Array.from({ length: Math.min(sorties, MAX_PICTOS) }, (_, k) => (
            <i key={k} style={style(k)} />
          ))}
          <Plus total={sorties} />
          <i className="is-prochaine" style={style(Math.min(sorties, MAX_PICTOS))} title="La prochaine" />
        </span>
      ),
    },
    {
      cle: "megots",
      label: "Mégots ramassés",
      chiffre: <Compteur valeur={megots} />,
      detail: `environ ${fr(parLitre)} par litre, ${fr(litres)} L en tout`,
      viz: (
        <span className="bilan-viz bilan-contenants">
          {Array.from({ length: Math.min(contenants, MAX_PICTOS) }, (_, k) => {
            const partiel = k === contenants - 1 && dernier > 0 ? dernier : 1;
            return <i key={k} style={{ ...style(k), ["--niveau" as string]: partiel }} />;
          })}
          <Plus total={contenants} />
        </span>
      ),
    },
    {
      cle: "eau",
      label: "Eau épargnée",
      chiffre: vueEau.chiffre,
      detail: (
        <>
          {vueEau.legende}{" "}
          <button type="button" className="bilan-bascule" onClick={() => setModeEau(vueEau.suivant)}>
            {vueEau.bouton}
          </button>
        </>
      ),
      viz: (
        <span className="bilan-viz bilan-vague">
          <svg viewBox="0 0 240 40" preserveAspectRatio="none" aria-hidden="true" focusable="false">
            <path d="M0,22 q30,-10 60,0 t60,0 t60,0 t60,0 t60,0 t60,0 V40 H0 Z" />
          </svg>
          <svg viewBox="0 0 240 40" preserveAspectRatio="none" aria-hidden="true" focusable="false">
            <path d="M0,18 q30,-12 60,0 t60,0 t60,0 t60,0 t60,0 t60,0 V40 H0 Z" />
          </svg>
        </span>
      ),
    },
  ];

  return (
    <ul ref={ref} className="bilan">
      {cartes.map((c, i) => (
        <li key={c.cle} className={`bilan-carte is-${c.cle}`} style={style(i)}>
          <span className="bilan-tete">
            <span className="bilan-ico" aria-hidden="true" />
            <span className="bilan-label">{c.label}</span>
          </span>
          <b className="bilan-chiffre display" aria-live={c.cle === "eau" ? "polite" : undefined}>
            {c.chiffre}
          </b>
          <span className="bilan-detail">{c.detail}</span>
          {c.viz}
        </li>
      ))}
    </ul>
  );
}
