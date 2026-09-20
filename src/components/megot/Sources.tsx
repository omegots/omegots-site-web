import { sources } from "@/data/megot";

/** Liste numérotée des sources citées dans la page, cibles des appels en exposant. */
export function Sources() {
  return (
    <ol className="sources">
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
  );
}
