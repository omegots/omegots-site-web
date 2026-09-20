"use client";

import { useState } from "react";
import { etapesFiliere, sourcesRecyclage, type Etape } from "@/data/recyclage";
import { MegotDroit, MEGOT_LONGUEUR } from "../megot/MegotDroit";
import { Ref } from "../megot/Ref";

/**
 * La filière, étape par étape : cinq stations reliées par une ligne de
 * progression, un dessin par station (le mégot se transforme), un texte
 * sourcé. Stations et dessin sont cliquables ; les onglets restent la
 * commande au clavier.
 */
export function Filiere() {
  const [actif, setActif] = useState<Etape["id"]>("collecte");
  const index = etapesFiliere.findIndex((e) => e.id === actif);
  const etape = etapesFiliere[index];
  const u = 2.2;
  const l = MEGOT_LONGUEUR * u;

  return (
    <div className="fil">
      <div className="fil-stations" role="tablist" aria-label="Étapes de la filière">
        <span className="fil-ligne" aria-hidden="true">
          <span className="fil-ligne-fait" style={{ width: `${(index / (etapesFiliere.length - 1)) * 100}%` }} />
        </span>
        {etapesFiliere.map((e, i) => (
          <button
            key={e.id}
            type="button"
            role="tab"
            id={`fil-tab-${e.id}`}
            aria-selected={actif === e.id}
            aria-controls="fil-texte"
            tabIndex={actif === e.id ? 0 : -1}
            className={`fil-station${actif === e.id ? " is-on" : ""}${i < index ? " is-fait" : ""}`}
            onClick={() => setActif(e.id)}
            onKeyDown={(ev) => {
              if (ev.key !== "ArrowRight" && ev.key !== "ArrowLeft") return;
              ev.preventDefault();
              const d = ev.key === "ArrowRight" ? 1 : -1;
              const suivant = etapesFiliere[(i + d + etapesFiliere.length) % etapesFiliere.length];
              setActif(suivant.id);
              document.getElementById(`fil-tab-${suivant.id}`)?.focus();
            }}
          >
            <span className="fil-station-n display">{String(i + 1).padStart(2, "0")}</span>
            <span className="fil-station-nom">{e.nom}</span>
          </button>
        ))}
      </div>

      <div className="fil-corps">
        <div className="fil-visuel" aria-hidden="true">
          <svg viewBox="0 0 520 300" className="fil-svg" focusable="false">
            <ellipse cx="260" cy="262" rx="190" ry="9" fill="rgba(26, 75, 110, 0.14)" />

            {/* 1. Collecte : un cendrier de rue, des mégots qui tombent dedans */}
            {actif === "collecte" && (
              <g className="fil-scene" key="collecte">
                <rect x="200" y="120" width="120" height="140" rx="10" fill="#1A4B6E" />
                <rect x="190" y="106" width="140" height="22" rx="6" fill="#0F3550" />
                <rect x="236" y="112" width="48" height="10" rx="5" fill="#F5EFE0" />
                <text x="260" y="200" textAnchor="middle" fontSize="13" fontWeight="800" fill="#F5EFE0" fontFamily="var(--font-display)">
                  MÉGOTS
                </text>
                {/* Le positionnement (attribut transform) et l'animation (CSS transform) sont sur deux <g> : l'un écraserait l'autre. */}
                {[0, 1, 2].map((i) => (
                  <g key={i} transform={`translate(${260 - l / 2},40) rotate(${-20 + i * 20} ${l / 2} 8)`}>
                    <g className="fil-chute" style={{ animationDelay: `${i * 0.9}s` }}>
                      <MegotDroit u={u} contour={1.6} />
                    </g>
                  </g>
                ))}
              </g>
            )}

            {/* 2. Tri : une rangée de mégots, un intrus qui s'efface */}
            {actif === "tri" && (
              <g className="fil-scene" key="tri">
                <rect x="60" y="150" width="400" height="60" rx="8" fill="#DED5C0" />
                <rect x="60" y="150" width="400" height="6" fill="#B9B1A4" />
                {[90, 190, 350].map((x, i) => (
                  <g key={i} transform={`translate(${x},168)`}>
                    <MegotDroit u={u} contour={1.6} />
                  </g>
                ))}
                <g className="fil-intrus">
                  <circle cx="290" cy="180" r="14" fill="#7FD6C6" stroke="#0B2A40" strokeWidth="2.5" />
                  <path d="M280,170 l20,20 M300,170 l-20,20" stroke="#0B2A40" strokeWidth="3" strokeLinecap="round" />
                </g>
                <path d="M60,150 h400" className="fil-tapis" fill="none" stroke="#1A4B6E" strokeWidth="3" strokeDasharray="14 10" />
              </g>
            )}

            {/* 3. Dépollution : bain d'eau à gauche, chambre CO2 à droite */}
            {actif === "depollution" && (
              <g className="fil-scene" key="depollution">
                <path d="M60,120 h170 v120 a10,10 0 0 1 -10,10 h-150 a10,10 0 0 1 -10,-10 Z" fill="none" stroke="#1A4B6E" strokeWidth="3" />
                <rect x="63" y="150" width="164" height="97" fill="#2A8C7E" opacity="0.85" />
                {[90, 130, 170, 200].map((x, i) => (
                  <circle key={i} className="fil-bulle" cx={x} cy="230" r={4 + (i % 2) * 2} fill="#F5EFE0" opacity="0.7" style={{ animationDelay: `${i * 0.5}s` }} />
                ))}
                <g transform={`translate(${145 - l / 2},188) rotate(-12 ${l / 2} 8)`}>
                  <MegotDroit u={u} contour={1.6} />
                </g>
                <text x="145" y="108" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1A4B6E" fontFamily="var(--font-body)">
                  Bains d&apos;eau en circuit fermé
                </text>
                <rect x="290" y="120" width="170" height="130" rx="14" fill="none" stroke="#1A4B6E" strokeWidth="3" />
                <text x="375" y="108" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1A4B6E" fontFamily="var(--font-body)">
                  CO2 supercritique, sans eau
                </text>
                <text x="375" y="240" textAnchor="middle" fontSize="18" fontWeight="800" fill="#2A8C7E" fontFamily="var(--font-display)">
                  CO2
                </text>
                <g transform={`translate(${375 - l / 2},170)`}>
                  <MegotDroit u={u} contour={1.6} />
                </g>
                {[320, 350, 400, 430].map((x, i) => (
                  <circle key={i} className="fil-bulle" cx={x} cy="230" r="3" fill="#2A8C7E" opacity="0.7" style={{ animationDelay: `${i * 0.4}s` }} />
                ))}
              </g>
            )}

            {/* 4. Matière : une pile de plaques et une botte de fibres */}
            {actif === "matiere" && (
              <g className="fil-scene" key="matiere">
                {[0, 1, 2].map((i) => (
                  <path key={i} d={`M70,${226 - i * 22} l150,-30 l30,14 l-150,30 Z`} fill={i === 2 ? "#4E6675" : "#3A4F5C"} stroke="#0B2A40" strokeWidth="2.5" strokeLinejoin="round" />
                ))}
                <text x="150" y="258" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1A4B6E" fontFamily="var(--font-body)">
                  Plaques rigides de 2 cm
                </text>
                <g stroke="#DD8A2E" strokeWidth="3" strokeLinecap="round" fill="none">
                  {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                    <path key={i} d={`M${330 + i * 12},150 q6,30 -4,80`} opacity={0.6 + (i % 3) * 0.15} />
                  ))}
                </g>
                <text x="380" y="258" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1A4B6E" fontFamily="var(--font-body)">
                  Fibres nettoyées
                </text>
              </g>
            )}

            {/* 5. Objet : le banc, un cendrier, un panneau isolant */}
            {actif === "objet" && (
              <g className="fil-scene" key="objet">
                <rect x="60" y="160" width="200" height="16" rx="4" fill="#2A8C7E" stroke="#0B2A40" strokeWidth="2.5" />
                <rect x="60" y="184" width="200" height="16" rx="4" fill="#2A8C7E" stroke="#0B2A40" strokeWidth="2.5" />
                <rect x="76" y="126" width="168" height="14" rx="4" fill="#2A8C7E" stroke="#0B2A40" strokeWidth="2.5" />
                <rect x="84" y="118" width="12" height="136" rx="3" fill="#1A4B6E" />
                <rect x="224" y="118" width="12" height="136" rx="3" fill="#1A4B6E" />
                <rect x="300" y="150" width="60" height="100" rx="8" fill="#1A4B6E" />
                <rect x="294" y="140" width="72" height="16" rx="5" fill="#0F3550" />
                <rect x="390" y="130" width="80" height="120" rx="6" fill="#F5EFE0" stroke="#0B2A40" strokeWidth="2.5" />
                <g stroke="#DD8A2E" strokeWidth="2.5" strokeLinecap="round">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <path key={i} d={`M${400 + i * 15},142 q4,50 0,96`} />
                  ))}
                </g>
              </g>
            )}
          </svg>
        </div>

        <div id="fil-texte" role="tabpanel" aria-labelledby={`fil-tab-${etape.id}`} className="fil-texte" key={etape.id}>
          <h3 className="display">{etape.accroche}</h3>
          <p>
            {etape.texte}
            <Ref ids={etape.sourceIds} liste={sourcesRecyclage} />
          </p>
          <div className="fil-nav">
            <button
              type="button"
              className="btn ghost"
              disabled={index === 0}
              onClick={() => setActif(etapesFiliere[index - 1].id)}
            >
              Précédent
            </button>
            <button
              type="button"
              className="btn"
              disabled={index === etapesFiliere.length - 1}
              onClick={() => setActif(etapesFiliere[index + 1].id)}
            >
              Étape suivante
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
