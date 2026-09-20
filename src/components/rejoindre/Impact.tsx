"use client";

import { useId, useState } from "react";
import { fr } from "@/data/format";
import { LITRES_EAU_PAR_MEGOT, ramassages } from "@/data/ramassages";

const MAX = 12;

/**
 * Votre impact : combien de personnes vous venez, et ce que ça représente en
 * mégots et en eau, au rythme constaté au Mégothon (mégots ramassés divisés
 * par le nombre de bénévoles). Une projection, présentée comme telle.
 */
export function Impact() {
  const [personnes, setPersonnes] = useState(1);
  const id = useId();
  const premiere = ramassages[0];
  const parPersonne = Math.round(premiere.megots / premiere.benevoles);
  const megots = personnes * parPersonne;
  const eau = megots * LITRES_EAU_PAR_MEGOT;

  return (
    <div className="impact">
      <div className="impact-panneau">
        <label htmlFor={id} className="impact-label">
          <span>Vous venez à combien ?</span>
          <b className="display" aria-live="polite">
            {personnes} {personnes > 1 ? "personnes" : "personne"}
          </b>
        </label>
        <input
          id={id}
          className="impact-range"
          type="range"
          min={1}
          max={MAX}
          step={1}
          value={personnes}
          onChange={(e) => setPersonnes(Number(e.target.value))}
          style={{ ["--p" as string]: `${((personnes - 1) / (MAX - 1)) * 100}%` }}
        />
        <p className="impact-chiffre display" aria-live="polite">
          <b>{fr(megots)}</b>
          <span>mégots en moins par terre, en une matinée</span>
        </p>
        <p className="impact-texte">
          Soit {fr(eau)} litres d&apos;eau douce préservés. Au Mégothon, {premiere.benevoles} bénévoles ont ramassé{" "}
          {fr(premiere.megots)} mégots en {premiere.duree} : environ {fr(parPersonne)} chacun. Une projection, pas une
          promesse.
        </p>
      </div>
      <div className="impact-groupe" aria-hidden="true">
        {Array.from({ length: personnes }, (_, i) => (
          <svg key={i} viewBox="0 0 40 56" className="impact-personne" style={{ animationDelay: `${i * 0.05}s` }}>
            <circle cx="20" cy="12" r="9" fill="#F5EFE0" stroke="#0B2A40" strokeWidth="2.5" />
            <path d="M6,54 v-16 a14,14 0 0 1 28,0 v16 Z" fill={i % 3 === 0 ? "#DD8A2E" : i % 3 === 1 ? "#2A8C7E" : "#F5EFE0"} stroke="#0B2A40" strokeWidth="2.5" strokeLinejoin="round" />
          </svg>
        ))}
      </div>
    </div>
  );
}
