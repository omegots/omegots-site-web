"use client";

import { useId, useState, useSyncExternalStore } from "react";
import { etapesTemps, TEMPS_MAX_ANNEES } from "@/data/megot";
import { Ref } from "./Ref";

/**
 * La ligne du temps d'un mégot jeté aujourd'hui : un curseur de 0 à 30 ans.
 * Le dessin du filtre s'efface et se délite en fibres à mesure qu'on avance,
 * l'étape la plus récemment franchie s'affiche, et la date calculée montre
 * en quelle année il sera encore là. La date du jour vient d'un store externe :
 * absente côté serveur, présente après hydratation, sans décalage de rendu.
 */
const rien = () => () => {};
const dateDuJour = () => new Date().toDateString();
const pasDeDate = () => null;
export function Temps() {
  const [annees, setAnnees] = useState(0);
  const id = useId();
  const cle = useSyncExternalStore(rien, dateDuJour, pasDeDate);
  const aujourdhui = cle ? new Date(cle) : null;

  const etape = [...etapesTemps].reverse().find((e) => e.annees <= annees) ?? etapesTemps[0];
  const p = annees / TEMPS_MAX_ANNEES;
  // Le filtre pâlit progressivement ; les fibres apparaissent à partir de deux ans.
  const filtreOpacite = 1 - Math.min(0.85, p * 1.1);
  const fibres = Math.min(1, Math.max(0, (annees - 2) / 12));
  const dateJet = aujourdhui?.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
  const anneeFin = aujourdhui ? aujourdhui.getFullYear() + 14 : null;

  return (
    <div className="temps">
      <div className="temps-visuel" aria-hidden="true">
        <svg viewBox="0 0 320 120" className="temps-svg">
          <ellipse cx="160" cy="104" rx="130" ry="6" fill="rgba(11, 42, 64, 0.18)" />
          {/* Fibres libérées */}
          <g className="temps-fibres" style={{ opacity: fibres }}>
            {[
              [40, 88, -30], [70, 96, 20], [110, 92, -60], [150, 98, 45], [190, 90, -20],
              [230, 97, 60], [265, 91, -45], [290, 96, 15], [125, 84, 80], [205, 84, -75],
            ].map(([x, y, r], i) => (
              <rect key={i} x={x} y={y} width="16" height="3" rx="1.5" fill="#B36A1E" transform={`rotate(${r} ${x + 8} ${y + 1.5})`} />
            ))}
          </g>
          {/* Le filtre, de plus en plus pâle */}
          <g style={{ opacity: filtreOpacite }}>
            <rect x="90" y="52" width="140" height="44" rx="12" fill="#DD8A2E" stroke="#0B2A40" strokeWidth="3" />
            <rect x="196" y="52" width="5" height="44" fill="#B36A1E" />
            <rect x="212" y="52" width="5" height="44" fill="#B36A1E" />
          </g>
          {/* Le papier et le tabac : disparus après six mois */}
          <g style={{ opacity: annees < 0.5 ? 1 : Math.max(0, 1 - (annees - 0.5) * 4) }}>
            <rect x="230" y="52" width="40" height="44" fill="#F5EFE0" stroke="#0B2A40" strokeWidth="3" />
            <rect x="270" y="52" width="14" height="44" fill="#4E6675" stroke="#0B2A40" strokeWidth="3" />
          </g>
        </svg>
      </div>

      <div className="temps-panneau">
        <label htmlFor={id} className="temps-label">
          <span>Curseur : années après le jet</span>
          <b className="display" aria-live="polite">
            {annees === 0 ? "Aujourd'hui" : `${annees.toLocaleString("fr-FR")} ${annees > 1 ? "ans" : "an"}`}
          </b>
        </label>
        <input
          id={id}
          className="temps-range"
          type="range"
          min={0}
          max={TEMPS_MAX_ANNEES}
          step={0.5}
          value={annees}
          onChange={(e) => setAnnees(Number(e.target.value))}
          style={{ ["--p" as string]: `${p * 100}%` }}
        />
        <ol className="temps-reperes" aria-hidden="true">
          {etapesTemps.map((e) => (
            <li key={e.annees} style={{ left: `${(e.annees / TEMPS_MAX_ANNEES) * 100}%` }} className={e.annees <= annees ? "is-passe" : ""}>
              <span />
            </li>
          ))}
        </ol>

        <div className="temps-etape" key={etape.annees}>
          <h3 className="display">{etape.titre}</h3>
          <p>
            {etape.texte}
            <Ref ids={etape.sourceIds} />
          </p>
        </div>

        <p className="temps-date">
          {dateJet && anneeFin ? (
            <>
              Un mégot jeté aujourd&apos;hui, le {dateJet}, sera encore là en <b>{anneeFin}</b> dans un sol ordinaire.
            </>
          ) : (
            <>Un mégot jeté aujourd&apos;hui sera encore là dans quatorze ans dans un sol ordinaire.</>
          )}
          <Ref ids={[3]} />
        </p>
      </div>
    </div>
  );
}
