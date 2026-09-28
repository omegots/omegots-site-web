"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { MegotDroit, MEGOT_LONGUEUR } from "./MegotDroit";
import { Ref } from "./Ref";

const POISSONS = 10;
/** Poissons morts, cumulés, à la fin de chaque jour de l'essai (la moitié au bout de quatre jours). */
const MORTS_PAR_JOUR = [0, 1, 2, 4, 5];
const JOUR_MS = 1000;
const CHUTE_MS = 900;

/** Dix poissons : chacun sa hauteur, sa vitesse et son sens de départ. */
const BANC = Array.from({ length: POISSONS }, (_, i) => ({
  y: 110 + i * 16,
  duree: 9 + ((i * 3) % 7),
  delai: -((i * 2.3) % 11),
  taille: 0.85 + ((i * 7) % 4) * 0.08,
  xMort: 90 + ((i * 67) % 250),
}));

/**
 * Un litre d'eau, dix poissons, un seul mégot. On le jette, les jours passent,
 * la moitié du banc remonte le ventre en l'air : c'est l'essai de Slaughter et
 * al. (2011), concentration létale médiane à 96 h. Une seule action, un seul
 * chiffre à retenir.
 */
export function Bocal({ titre }: { titre?: ReactNode }) {
  const [jete, setJete] = useState(false);
  const [jour, setJour] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  function jeter() {
    if (jete) return;
    setJete(true);
    for (let j = 1; j <= 4; j++) {
      timers.current.push(setTimeout(() => setJour(j), CHUTE_MS + j * JOUR_MS));
    }
  }

  function recommencer() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setJete(false);
    setJour(0);
  }

  const morts = MORTS_PAR_JOUR[jour];
  const fini = jour === 4;
  const trouble = jete ? 0.12 + jour * 0.07 : 0;

  return (
    <div className={`aqua${jete ? " is-jete" : ""}${fini ? " is-fini" : ""}`}>
      <div className="aqua-scene">
        <button
          type="button"
          className="aqua-eau"
          onClick={jeter}
          disabled={jete}
          aria-label={jete ? "Le mégot est dans l'eau" : "Jeter un mégot dans le litre d'eau"}
        >
          <svg viewBox="0 0 420 320" className="aqua-svg" aria-hidden="true" focusable="false">
            <defs>
              <clipPath id="aqua-clip">
                <path d="M30,64 h360 v214 a20,20 0 0 1 -20,20 h-320 a20,20 0 0 1 -20,-20 Z" />
              </clipPath>
            </defs>

            <g clipPath="url(#aqua-clip)">
              {/* Eau, puis le trouble qui monte avec les jours */}
              <rect x="30" y="86" width="360" height="234" fill="#2A8C7E" />
              <rect x="30" y="86" width="360" height="234" fill="#4a3a1e" style={{ opacity: trouble }} className="aqua-trouble" />
              <path className="aqua-houle" d="M0,92 q30,-8 60,0 t60,0 t60,0 t60,0 t60,0 t60,0 t60,0 t60,0 v240 h-480 Z" fill="#F5EFE0" opacity="0.16" />

              {/* Le banc : vivants qui nagent, morts qui remontent le ventre en l'air */}
              {BANC.map((f, i) => {
                const mort = i < morts;
                return (
                  <g
                    key={i}
                    className={`aqua-poisson${mort ? " is-mort" : ""}`}
                    style={{
                      ["--y" as string]: `${f.y}px`,
                      ["--ymort" as string]: `${100 + (i % 3) * 9}px`,
                      ["--xmort" as string]: `${f.xMort}px`,
                      ["--duree" as string]: `${f.duree}s`,
                      ["--delai" as string]: `${f.delai}s`,
                      ["--taille" as string]: f.taille,
                    }}
                  >
                    <g className="aqua-poisson-corps">
                      <path d="M-14,0 q14,-11 28,0 q-14,11 -28,0 Z" fill="#F5EFE0" />
                      <path d="M12,0 l12,-8 v16 Z" fill="#F5EFE0" />
                      <circle cx="-6" cy="-2" r="1.8" fill="#0F3550" />
                    </g>
                  </g>
                );
              })}

              {/* Le mégot : au-dessus du bocal, puis il tombe et flotte */}
              <g className="aqua-megot">
                <g transform={`translate(${210 - (MEGOT_LONGUEUR * 2) / 2},0) rotate(-8 ${(MEGOT_LONGUEUR * 2) / 2} 0)`}>
                  <MegotDroit u={2} contour={1.6} />
                </g>
              </g>
            </g>

            {/* Le verre et sa graduation */}
            <path d="M30,64 h360 v214 a20,20 0 0 1 -20,20 h-320 a20,20 0 0 1 -20,-20 Z" fill="none" stroke="#1A4B6E" strokeWidth="4" strokeLinejoin="round" />
            <path d="M18,64 h384" stroke="#1A4B6E" strokeWidth="4" strokeLinecap="round" />
            <path d="M34,230 h10 M34,180 h6 M34,130 h10" stroke="#1A4B6E" strokeWidth="3" strokeLinecap="round" />
            <text x="378" y="112" textAnchor="end" fontSize="15" fontWeight="800" fill="#F5EFE0" fontFamily="var(--font-display)">
              1 L
            </text>
          </svg>
          {!jete && (
            <span className="aqua-invite display" aria-hidden="true">
              Touchez l&apos;eau pour jeter le mégot
            </span>
          )}
        </button>

        <div className="aqua-jours" aria-hidden="true">
          {[1, 2, 3, 4].map((j) => (
            <span key={j} className={`aqua-jour${jour >= j ? " is-on" : ""}`}>
              Jour {j}
            </span>
          ))}
        </div>
      </div>

      <div className="aqua-panneau">
        {titre}
        <p className="aqua-chiffre display" aria-live="polite">
          <b>{jete ? morts : 1}</b>
          <span>
            {jete
              ? `poisson${morts > 1 ? "s" : ""} sur ${POISSONS}${fini ? ", en quatre jours" : ""}`
              : "seul mégot dans un litre d'eau"}
          </span>
        </p>

        {!jete && (
          <p className="aqua-texte">
            Dix poissons, un litre d&apos;eau, un seul mégot fumé. C&apos;est l&apos;essai qu&apos;une équipe de
            l&apos;université de San Diego a mené en laboratoire, avec un poisson d&apos;eau douce et un poisson
            de mer. Jetez le mégot et laissez passer quatre jours.
          </p>
        )}
        {jete && !fini && (
          <p className="aqua-texte">
            Les substances du tabac et du filtre se dissolvent. L&apos;eau se trouble, les premiers poissons
            remontent.
          </p>
        )}
        {fini && (
          <p className="aqua-texte">
            La moitié du banc est morte. C&apos;est la dose létale médiane mesurée : un mégot fumé par litre
            d&apos;eau, en 96 heures, pour les deux espèces testées.
            <Ref ids={[2]} />
          </p>
        )}

        <div className="aqua-actions">
          {!jete ? (
            <button type="button" className="btn" onClick={jeter}>
              Jeter le mégot
            </button>
          ) : (
            <button type="button" className="btn ghost" onClick={recommencer} disabled={!fini}>
              Recommencer
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
