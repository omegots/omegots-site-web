"use client";

import { useState } from "react";
import { fr } from "@/data/format";
import { LITRES_EAU_PAR_MEGOT, megotsParLitre, totals } from "@/data/ramassages";
import { sourcesRamassages } from "@/data/ramassages-page";
import { Ref } from "../megot/Ref";

/** Mégots ajoutés à chaque touche. */
const PAS = 50;

/**
 * Remplissez un litre : chaque touche sur le contenant ajoute cinquante mégots.
 * À 800, le litre est plein et le chiffre d'eau s'affiche. C'est exactement ce
 * que fait l'association après une sortie, en plus lent.
 */
export function RemplirLitre() {
  const plein = megotsParLitre();
  const [megots, setMegots] = useState(0);
  const p = Math.min(1, megots / plein);
  const fini = megots >= plein;
  const eau = megots * LITRES_EAU_PAR_MEGOT;

  function ajouter() {
    if (fini) return;
    setMegots((n) => Math.min(plein, n + PAS));
  }

  return (
    <div className={`litre${fini ? " is-plein" : ""}`}>
      <div className="litre-scene">
        <button
          type="button"
          className="litre-jar"
          onClick={ajouter}
          disabled={fini}
          aria-label={fini ? "Le litre est plein" : `Ajouter ${PAS} mégots au contenant`}
        >
          <svg viewBox="0 0 46 72" className="litre-svg" aria-hidden="true" focusable="false">
            <g transform="translate(0,4)">
              <g clipPath="url(#jar-clip)">
                <rect x="8" y="10" width="30" height="50" fill="#2A8C7E" opacity="0.9" className="litre-lvl" style={{ ["--p" as string]: p }} />
                {Array.from({ length: Math.round(p * 14) }, (_, i) => (
                  <svg key={i} x={9 + (i % 4) * 7} y={54 - Math.floor(i / 4) * 9 - (i % 2) * 3} width="9" height="6" viewBox="-30 -30 60 40" className="litre-megot">
                    <use href="#megot" />
                  </svg>
                ))}
              </g>
              {/* Contour du contenant en crème : le sprite #jar-empty impose son bleu, illisible sur bleu nuit */}
              <g fill="none" stroke="#F5EFE0" strokeLinejoin="round" strokeLinecap="round">
                <path d="M8,8 h30 v46 a6,6 0 0 1 -6,6 h-18 a6,6 0 0 1 -6,-6 Z" strokeWidth="1.6" />
                <path d="M5,8 h36" strokeWidth="1.6" />
                <path d="M8,44 h5 M8,32 h3 M8,20 h5" strokeWidth="1.2" />
              </g>
            </g>
          </svg>
          {!fini && (
            <span className="litre-invite display" aria-hidden="true">
              Touchez pour ajouter {PAS} mégots
            </span>
          )}
        </button>
      </div>

      <div className="litre-panneau">
        <p className="litre-chiffre display" aria-live="polite">
          <b>{fr(megots)}</b>
          <span>{fini ? "mégots : le litre est plein" : `mégots sur ${fr(plein)}`}</span>
        </p>
        {!fini ? (
          <p className="litre-texte">
            Un litre de contenant gradué, c&apos;est environ {fr(plein)} mégots : c&apos;est le rapport constaté sur
            les {fr(totals().litres)} litres déjà ramassés. Remplissez-le.
          </p>
        ) : (
          <p className="litre-texte">
            Un litre plein, c&apos;est {fr(eau)} litres d&apos;eau douce qui ne seront pas pollués, à{" "}
            {fr(LITRES_EAU_PAR_MEGOT)} litres par mégot.
            <Ref ids={[2]} liste={sourcesRamassages} />
            {" "}Et une ligne de plus dans nos chiffres publiés.
          </p>
        )}
        <div className="litre-actions">
          {!fini ? (
            <button type="button" className="btn" onClick={ajouter}>
              Ajouter {PAS} mégots
            </button>
          ) : (
            <button type="button" className="btn ghost" onClick={() => setMegots(0)}>
              Vider et recommencer
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
