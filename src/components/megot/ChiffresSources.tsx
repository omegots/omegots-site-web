"use client";

import { useInView } from "motion/react";
import { useRef } from "react";
import { chiffresSources } from "@/data/megot";
import { useCountUp } from "../motion/useCountUp";
import { Ref } from "./Ref";

function Tuile({ tuile, active }: { tuile: (typeof chiffresSources)[number]; active: boolean }) {
  // Les compteurs ne gèrent que des entiers : on compte en dixièmes pour 1,3.
  const decimal = !Number.isInteger(tuile.valeur);
  const cible = decimal ? Math.round(tuile.valeur * 10) : tuile.valeur;
  const brut = useCountUp(cible, active, 1600);
  const valeur = decimal ? brut / 10 : brut;
  const statique = tuile.id === "plages";

  return (
    <li className="cs-tuile">
      <b className="display">
        {statique ? (
          <>
            1<sup>er</sup>
          </>
        ) : (
          <>
            <span className="cs-num" aria-hidden="true">
              {valeur.toLocaleString("fr-FR", { minimumFractionDigits: decimal ? 1 : 0 })}
            </span>
            <span className="sr-only">{tuile.valeur.toLocaleString("fr-FR")}</span>
            {tuile.unite === "%" ? " %" : ` ${tuile.unite}`}
          </>
        )}
      </b>
      <p>
        {tuile.label}
        <Ref ids={tuile.sourceIds} />
      </p>
    </li>
  );
}

/** Quatre chiffres nationaux, chacun avec sa source, compteurs lancés à l'arrivée à l'écran. */
export function ChiffresSources() {
  const ref = useRef<HTMLUListElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <ul className="cs-grid" ref={ref}>
      {chiffresSources.map((t) => (
        <Tuile key={t.id} tuile={t} active={inView} />
      ))}
    </ul>
  );
}
