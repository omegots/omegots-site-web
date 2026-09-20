"use client";

import { useState } from "react";
import { parties, type Partie } from "@/data/megot";
import { Ref } from "./Ref";

/**
 * Anatomie interactive du mégot : un grand dessin dans le style de la charte,
 * quatre parties cliquables (boutons, donc au clavier aussi). La partie choisie
 * s'allume, les autres s'estompent, et le texte de droite change.
 */
export function Anatomie() {
  const [actif, setActif] = useState<Partie["id"]>("filtre");
  const partie = parties.find((p) => p.id === actif) ?? parties[0];
  const cls = (id: Partie["id"]) => `anat-part${actif === id ? " is-on" : ""}`;

  return (
    <div className="anat">
      <div className="anat-visuel">
        {/* Le mégot, à plat : filtre à gauche, papier et tabac, bout brûlé à droite. */}
        <svg viewBox="0 0 640 200" className="anat-svg" aria-hidden="true" focusable="false">
          <defs>
            <pattern id="anat-liege" width="14" height="14" patternUnits="userSpaceOnUse">
              <rect width="14" height="14" fill="#DD8A2E" />
              <circle cx="4" cy="4" r="1.6" fill="#B36A1E" />
              <circle cx="10" cy="10" r="1.6" fill="#B36A1E" />
            </pattern>
            <clipPath id="anat-clip-filtre">
              <rect x="24" y="60" width="200" height="80" rx="16" />
            </clipPath>
          </defs>

          {/* Ombre au sol */}
          <ellipse cx="320" cy="176" rx="290" ry="8" fill="rgba(11, 42, 64, 0.35)" />

          {/* Papier : tube crème */}
          <g className={cls("papier")}>
            <rect x="200" y="60" width="300" height="80" rx="4" fill="#F5EFE0" stroke="#0B2A40" strokeWidth="4" />
            <path d="M212,60 v80 M226,60 v80" stroke="#DED5C0" strokeWidth="2" />
          </g>

          {/* Filtre : liège rayé */}
          <g className={cls("filtre")}>
            <rect x="24" y="60" width="200" height="80" rx="16" fill="url(#anat-liege)" stroke="#0B2A40" strokeWidth="4" />
            <g clipPath="url(#anat-clip-filtre)">
              <rect x="168" y="60" width="6" height="80" fill="#B36A1E" />
              <rect x="184" y="60" width="6" height="80" fill="#B36A1E" />
            </g>
          </g>

          {/* Ce que le filtre a piégé : pointillés dans le filtre */}
          <g className={cls("fumee")}>
            {[52, 84, 116, 148].map((x, i) =>
              [78, 100, 122].map((y, j) => (
                <circle key={`${i}-${j}`} cx={x + (j % 2) * 10} cy={y} r="5" fill="#0B2A40" opacity="0.75" />
              )),
            )}
          </g>

          {/* Tabac restant et bout brûlé */}
          <g className={cls("tabac")}>
            <rect x="500" y="60" width="52" height="80" fill="#4E6675" stroke="#0B2A40" strokeWidth="4" />
            <path d="M552,64 l38,-14 l-6,22 l14,8 l-14,10 l8,22 l-40,-12 Z" fill="#B9B1A4" stroke="#0B2A40" strokeWidth="4" strokeLinejoin="round" />
            <path d="M552,86 l14,-2 M552,110 l16,4" stroke="#DD8A2E" strokeWidth="4" strokeLinecap="round" />
          </g>

          {/* Repères numérotés */}
          {[
            { n: "1", x: 124, y: 36, id: "filtre" as const },
            { n: "4", x: 100, y: 164, id: "fumee" as const },
            { n: "3", x: 350, y: 36, id: "papier" as const },
            { n: "2", x: 560, y: 36, id: "tabac" as const },
          ].map((r) => (
            <g key={r.id} className={`anat-repere${actif === r.id ? " is-on" : ""}`}>
              <circle cx={r.x} cy={r.y} r="14" fill="#F5EFE0" stroke="#0B2A40" strokeWidth="3" />
              <text x={r.x} y={r.y + 5} textAnchor="middle" fontSize="15" fontWeight="800" fill="#0B2A40" fontFamily="var(--font-display)">
                {r.n}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div className="anat-panneau">
        <div className="anat-tabs" role="tablist" aria-label="Parties du mégot">
          {parties.map((p, i) => (
            <button
              key={p.id}
              type="button"
              role="tab"
              id={`anat-tab-${p.id}`}
              aria-selected={actif === p.id}
              aria-controls="anat-texte"
              tabIndex={actif === p.id ? 0 : -1}
              className={`anat-tab${actif === p.id ? " is-on" : ""}`}
              onClick={() => setActif(p.id)}
              onKeyDown={(e) => {
                if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
                e.preventDefault();
                const d = e.key === "ArrowRight" ? 1 : -1;
                const suivant = parties[(i + d + parties.length) % parties.length];
                setActif(suivant.id);
                document.getElementById(`anat-tab-${suivant.id}`)?.focus();
              }}
            >
              <span className="anat-tab-n display">{String(i + 1).padStart(2, "0")}</span>
              <span>{p.nom}</span>
            </button>
          ))}
        </div>

        <div id="anat-texte" role="tabpanel" aria-labelledby={`anat-tab-${partie.id}`} className="anat-texte" key={partie.id}>
          <h3 className="display">{partie.accroche}</h3>
          <p>
            {partie.texte}
            <Ref ids={partie.sourceIds} />
          </p>
        </div>
      </div>
    </div>
  );
}
