"use client";

import { useId, useState } from "react";
import { fr } from "@/data/format";
import { MEGOTS_PAR_BANC, sourcesRecyclage } from "@/data/recyclage";
import { Ref } from "../megot/Ref";

const MAX_SORTIES = 30;

function Banc({ fantome = false }: { fantome?: boolean }) {
  return (
    <svg viewBox="0 0 64 40" className={`bancs-banc${fantome ? " is-fantome" : ""}`} aria-hidden="true">
      <rect x="6" y="14" width="52" height="7" rx="2" fill="#2A8C7E" stroke="#0B2A40" strokeWidth="1.5" />
      <rect x="6" y="24" width="52" height="7" rx="2" fill="#2A8C7E" stroke="#0B2A40" strokeWidth="1.5" />
      <rect x="10" y="4" width="44" height="6" rx="2" fill="#2A8C7E" stroke="#0B2A40" strokeWidth="1.5" />
      <rect x="12" y="2" width="4" height="36" rx="1.5" fill="#1A4B6E" />
      <rect x="48" y="2" width="4" height="36" rx="1.5" fill="#1A4B6E" />
    </svg>
  );
}

/**
 * Compteur de bancs : un curseur du nombre de sorties comme le Mégothon,
 * et le nombre de bancs qu'on pourrait en tirer, à 7 500 mégots par banc
 * (deux bancs pour 15 000 mégots, filière MéGO!). Tous les bancs se dessinent,
 * jusqu'à 19 pour trente sorties ; la fraction restante est un banc estompé.
 */
export function Bancs({ megotsParSortie }: { megotsParSortie: number }) {
  const [sorties, setSorties] = useState(1);
  const id = useId();
  const megots = sorties * megotsParSortie;
  const bancs = Math.floor(megots / MEGOTS_PAR_BANC);
  const reste = (megots % MEGOTS_PAR_BANC) / MEGOTS_PAR_BANC;

  return (
    <div className="bancs">
      <div className="bancs-panneau">
        <label htmlFor={id} className="bancs-label">
          <span>Nombre de sorties comme le Mégothon</span>
          <b className="display" aria-live="polite">
            {sorties} {sorties > 1 ? "sorties" : "sortie"}
          </b>
        </label>
        <input
          id={id}
          className="bancs-range"
          type="range"
          min={1}
          max={MAX_SORTIES}
          step={1}
          value={sorties}
          onChange={(e) => setSorties(Number(e.target.value))}
          style={{ ["--p" as string]: `${((sorties - 1) / (MAX_SORTIES - 1)) * 100}%` }}
        />
        <p className="bancs-chiffre display" aria-live="polite">
          <b>{bancs}</b>
          <span>
            {bancs > 1 ? "bancs" : "banc"} pour {fr(megots)} mégots
          </span>
        </p>
        <p className="bancs-texte">
          À {fr(MEGOTS_PAR_BANC)} mégots par banc, c&apos;est le rapport constaté sur deux bancs livrés à la mairie du 9e
          arrondissement de Paris : 15 000 mégots, soit 4,5 kg d&apos;acétate de cellulose dépollué.
          <Ref ids={[3]} liste={sourcesRecyclage} />
          {bancs === 0 && " Une seule sortie ne suffit pas encore : il en faudrait deux."}
        </p>
      </div>

      <div className="bancs-grille" aria-hidden="true">
        {Array.from({ length: bancs }, (_, i) => (
          <Banc key={i} />
        ))}
        {reste > 0 && (
          <span className="bancs-reste" style={{ ["--reste" as string]: reste }}>
            <Banc fantome />
            <span className="bancs-reste-fill">
              <Banc />
            </span>
          </span>
        )}
      </div>
    </div>
  );
}
