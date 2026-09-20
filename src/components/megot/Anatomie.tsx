"use client";

import { useState } from "react";
import { parties, type Partie } from "@/data/megot";
import { Ref } from "./Ref";

/*
 * Le mégot dans le style du logo (mêmes proportions, couleurs et contour bleu),
 * mais droit, pas écrasé, et aux proportions d'un vrai mégot : un cylindre de
 * 11 unités de diamètre, filtre de 27 (environ 20 mm), reste de papier et de
 * tabac de 13 dont 5 de bout cramé. Le filtre fait les deux tiers du mégot. Échelle U = 5 px.
 */
const U = 7;
const CY = 190;
const H = 11 * U;
const X0 = 180;
const CRAME = 5 * U;
const TABAC = 2.5 * U;
const TUBE_L = 13 * U;
const JONCTION = X0 + TUBE_L;
const FILTRE_L = 27 * U;
const FILTRE_H = H;

/** Ancrage de chaque trait sur le mégot, repère numéroté et étiquette. */
const CALLOUTS: {
  id: Partie["id"];
  from: [number, number];
  to: [number, number];
  label: [number, number];
  anchor: "start" | "end";
}[] = [
  { id: "filtre", from: [JONCTION + FILTRE_L * 0.55, CY - FILTRE_H / 2 - 2], to: [500, 78], label: [478, 83], anchor: "end" },
  { id: "tabac", from: [X0 + CRAME / 2, CY - H / 2 - 2], to: [150, 78], label: [172, 83], anchor: "start" },
  { id: "papier", from: [X0 + TUBE_L * 0.55, CY + H / 2 + 2], to: [170, 300], label: [192, 305], anchor: "start" },
  { id: "fumee", from: [JONCTION + FILTRE_L * 0.5, CY + 10], to: [520, 300], label: [498, 305], anchor: "end" },
];

/**
 * Anatomie interactive du mégot : quatre parties cliquables, sur le dessin
 * (parties, traits, repères) comme dans les onglets. La partie choisie
 * s'allume, les autres s'estompent, et le texte change. Les onglets restent
 * la commande accessible au clavier et aux lecteurs d'écran.
 */
export function Anatomie() {
  const [actif, setActif] = useState<Partie["id"]>("filtre");
  const partie = parties.find((p) => p.id === actif) ?? parties[0];
  const cls = (id: Partie["id"]) => `anat-part${actif === id ? " is-on" : ""}`;

  return (
    <div className="anat">
      <div className="anat-visuel">
        <svg viewBox="0 0 640 360" className="anat-svg" aria-hidden="true" focusable="false">
          {/* Ombre au sol */}
          <ellipse cx={(X0 + JONCTION + FILTRE_L) / 2} cy={CY + FILTRE_H / 2 + 14} rx="150" ry="7" fill="rgba(11, 42, 64, 0.35)" />

          {/* 3. Papier : le tube */}
          <g className={cls("papier")} onClick={() => setActif("papier")}>
            {/* Seule la partie papier, après le bout cramé et le tabac, pour que le halo ne les englobe pas */}
            <rect x={X0 + CRAME + TABAC} y={CY - H / 2} width={TUBE_L - CRAME - TABAC} height={H} fill="#F5EFE0" />
          </g>

          {/* 2. Tabac restant et bout cramé */}
          <g className={cls("tabac")} onClick={() => setActif("tabac")}>
            <rect x={X0} y={CY - H / 2} width={CRAME} height={H} fill="#0F3550" />
            <rect x={X0 + CRAME} y={CY - H / 2} width={TABAC} height={H} fill="#4E6675" />
          </g>

          {/* 1. Filtre : orange, un peu plus large que le tube, deux rayures comme sur le logo */}
          <g className={`${cls("filtre")}${actif === "fumee" ? " is-fond" : ""}`} onClick={() => setActif("filtre")}>
            <rect x={JONCTION} y={CY - FILTRE_H / 2} width={FILTRE_L} height={FILTRE_H} fill="#DD8A2E" />
            <rect x={JONCTION + 8} y={CY - FILTRE_H / 2 + 3} width={5} height={FILTRE_H - 6} fill="#B36A1E" />
            <rect x={JONCTION + FILTRE_L - 13} y={CY - FILTRE_H / 2 + 3} width={5} height={FILTRE_H - 6} fill="#B36A1E" />
          </g>

          {/* 4. Ce que le filtre a piégé : dépôts dans le filtre */}
          <g className={cls("fumee")} onClick={() => setActif("fumee")}>
            {[14, 44, 74, 104, 134, 164].map((dx, i) =>
              [-16, 2, 18].map((dy, j) => (
                <circle
                  key={`${i}-${j}`}
                  className="anat-depot"
                  cx={JONCTION + dx + (j % 2) * 4}
                  cy={CY + dy}
                  r={actif === "fumee" ? 5.5 : 4}
                  fill={actif === "fumee" ? "#7fd6c6" : "#0B2A40"}
                  opacity="0.9"
                />
              )),
            )}
          </g>

          {/* Contours bleus du logo, par-dessus, sans capter les clics */}
          <g fill="none" stroke="#1A4B6E" strokeWidth="3" strokeLinejoin="round" style={{ pointerEvents: "none" }}>
            <rect x={X0} y={CY - H / 2} width={TUBE_L} height={H} />
            <rect x={JONCTION} y={CY - FILTRE_H / 2} width={FILTRE_L} height={FILTRE_H} />
          </g>

          {/* Traits et repères, comme les chiffres de l'accueil */}
          {CALLOUTS.map((c) => {
            const i = parties.findIndex((p) => p.id === c.id);
            const on = actif === c.id;
            return (
              <g key={c.id} className={`anat-callout${on ? " is-on" : ""}`} onClick={() => setActif(c.id)}>
                <path d={`M${c.from[0]},${c.from[1]} L${c.to[0]},${c.to[1]}`} fill="none" stroke="#7fd6c6" strokeWidth="1.6" />
                <circle cx={c.from[0]} cy={c.from[1]} r="4" fill="#7fd6c6" />
                <circle className="anat-callout-n" cx={c.to[0]} cy={c.to[1]} r="15" fill="#F5EFE0" stroke="#0B2A40" strokeWidth="3" />
                <text x={c.to[0]} y={c.to[1] + 5.5} textAnchor="middle" fontSize="16" fontWeight="800" fill="#0B2A40" fontFamily="var(--font-display)">
                  {i + 1}
                </text>
                <text
                  className="anat-callout-label"
                  x={c.label[0]}
                  y={c.label[1]}
                  textAnchor={c.anchor}
                  fontSize="15"
                  fontWeight="600"
                  fill="#F5EFE0"
                  fontFamily="var(--font-body)"
                >
                  {parties[i].nom}
                </text>
              </g>
            );
          })}
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
