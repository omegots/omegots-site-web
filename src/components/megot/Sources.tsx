"use client";

import { useEffect, useRef } from "react";
import { sources as sourcesMegot, type Source } from "@/data/megot";

/**
 * Sources de la page, condensées : un bloc replié par défaut (« Voir les
 * sources »), une ligne par référence. Un appel de source en exposant
 * (#source-N) ouvre le bloc avant de faire défiler jusqu'à la ligne visée.
 */
export function Sources({
  liste = sourcesMegot,
  majLe,
}: {
  liste?: readonly Source[];
  /** Date de dernière mise à jour du contenu de la page, au format ISO (AAAA-MM-JJ). */
  majLe?: string;
}) {
  const sources = liste;
  const ref = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const ouvrirSiCible = () => {
      if (window.location.hash.startsWith("#source-") && ref.current) {
        ref.current.open = true;
        document.getElementById(window.location.hash.slice(1))?.scrollIntoView({ block: "center" });
      }
    };
    ouvrirSiCible();
    window.addEventListener("hashchange", ouvrirSiCible);
    return () => window.removeEventListener("hashchange", ouvrirSiCible);
  }, []);

  return (
    <>
    <details className="sources" ref={ref}>
      <summary className="sources-resume">
        <span className="sources-resume-n display" aria-hidden="true">
          {sources.length}
        </span>
        <span className="sources-resume-texte">
          <b>Voir les sources</b>
          <small>Ministère, revues scientifiques, associations de terrain.</small>
        </span>
        <span className="faq-plus" aria-hidden="true" />
      </summary>
      <ol className="sources-liste">
        {sources.map((s) => (
          <li key={s.id} id={`source-${s.id}`}>
            <span className="sources-n display" aria-hidden="true">
              {s.id}
            </span>
            <span className="sources-corps">
              <span className="sources-auteur">
                {s.auteur} ({s.annee}).
              </span>{" "}
              <a href={s.url} target="_blank" rel="noopener noreferrer">
                {s.titre}
              </a>
              . <span className="sources-support">{s.support}.</span>
            </span>
          </li>
        ))}
      </ol>
    </details>
    {majLe && (
      <p className="sources-maj">
        Page mise à jour le{" "}
        <time dateTime={majLe}>
          {new Date(`${majLe}T12:00:00`).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
        </time>
        .
      </p>
    )}
    </>
  );
}
