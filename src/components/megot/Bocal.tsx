"use client";

import { useState } from "react";
import { essais, type Essai } from "@/data/megot";
import { Ref } from "./Ref";

const POISSONS = 10;

/**
 * Le bocal d'un litre : on choisit ce qu'on y met (mégot fumé, filtre fumé,
 * filtre neuf) et on voit combien il en faut pour que la moitié des poissons
 * meurent en quatre jours. Les trois valeurs sont celles mesurées par
 * Slaughter et al. (2011), concentration létale médiane à 96 h.
 */
export function Bocal() {
  const [actif, setActif] = useState<Essai["id"]>("fume");
  const essai = essais.find((e) => e.id === actif) ?? essais[0];
  const nb = Math.ceil(essai.megotsParLitre);
  // Teinte de l'eau : plus il y a de mégots, plus elle brunit, sans dépasser un seuil lisible.
  const trouble = Math.min(0.55, 0.18 + nb * 0.03);

  return (
    <div className="bocal">
      <div className="bocal-visuel" key={essai.id}>
        <svg viewBox="0 0 260 300" className="bocal-svg" aria-hidden="true" focusable="false">
          <defs>
            <clipPath id="bocal-clip">
              <path d="M40,60 h180 v200 a22,22 0 0 1 -22,22 h-136 a22,22 0 0 1 -22,-22 Z" />
            </clipPath>
          </defs>
          {/* Eau */}
          <g clipPath="url(#bocal-clip)">
            <rect x="40" y="96" width="180" height="200" fill="#2A8C7E" />
            <rect x="40" y="96" width="180" height="200" fill="#4a3a1e" opacity={trouble} className="bocal-trouble" />
            <path className="bocal-houle" d="M20,100 q20,-8 40,0 t40,0 t40,0 t40,0 t40,0 t40,0 v200 h-240 Z" fill="#F5EFE0" opacity="0.18" />
            {/* Les mégots qui tombent */}
            {Array.from({ length: nb }, (_, i) => (
              <svg
                key={i}
                className="bocal-megot"
                x={52 + (i % 4) * 40 + (Math.floor(i / 4) % 2) * 18}
                y={120 + Math.floor(i / 4) * 34}
                width="40"
                height="28"
                viewBox="-30 -30 60 40"
                style={{ animationDelay: `${i * 0.12}s` }}
              >
                <use href="#megot" transform={`rotate(${(i * 37) % 60 - 30})`} />
              </svg>
            ))}
          </g>
          {/* Verre */}
          <path d="M40,60 h180 v200 a22,22 0 0 1 -22,22 h-136 a22,22 0 0 1 -22,-22 Z" fill="none" stroke="#1A4B6E" strokeWidth="4" strokeLinejoin="round" />
          <path d="M30,60 h200" stroke="#1A4B6E" strokeWidth="4" strokeLinecap="round" />
          <path d="M44,210 h10 M44,170 h6 M44,130 h10" stroke="#1A4B6E" strokeWidth="3" strokeLinecap="round" />
          <text x="196" y="90" textAnchor="end" fontSize="14" fontWeight="800" fill="#1A4B6E" fontFamily="var(--font-display)">
            1 L
          </text>
        </svg>

        <div className="bocal-poissons" aria-hidden="true">
          {Array.from({ length: POISSONS }, (_, i) => (
            <svg key={i} viewBox="0 0 32 20" className={`bocal-poisson${i >= POISSONS / 2 ? " is-mort" : ""}`} style={{ animationDelay: `${0.8 + i * 0.08}s` }}>
              <path d="M4,10 q8,-9 18,0 q-10,9 -18,0 Z" fill="currentColor" />
              <path d="M22,10 l8,-6 v12 Z" fill="currentColor" />
              <circle cx="9" cy="9" r="1.6" fill="#F5EFE0" />
            </svg>
          ))}
        </div>
      </div>

      <div className="bocal-panneau">
        <div className="bocal-choix" role="group" aria-label="Ce qu'on met dans le litre d'eau">
          {essais.map((e) => (
            <button
              key={e.id}
              type="button"
              className={`bocal-btn${actif === e.id ? " is-on" : ""}`}
              aria-pressed={actif === e.id}
              onClick={() => setActif(e.id)}
            >
              {e.nom}
            </button>
          ))}
        </div>
        <p className="bocal-chiffre display" aria-live="polite">
          <b>{essai.megotsParLitre.toLocaleString("fr-FR")}</b>
          <span>
            {essai.megotsParLitre === 1 ? "mégot" : "mégots"} par litre : la moitié des poissons meurent en 4 jours
          </span>
        </p>
        <p className="bocal-texte">
          {essai.texte}
          <Ref ids={[2]} />
        </p>
        <p className="bocal-note">
          Dose létale médiane (CL50) à 96 heures, mesurée sur un poisson d&apos;eau douce et un poisson marin selon
          le protocole de l&apos;agence américaine de l&apos;environnement.
        </p>
      </div>
    </div>
  );
}
