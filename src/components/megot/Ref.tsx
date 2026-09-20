import { source } from "@/data/megot";

/** Appel de source en exposant : renvoie à la liste numérotée en bas de page. */
export function Ref({ ids }: { ids: readonly number[] }) {
  return (
    <sup className="ref">
      {ids.map((id, i) => {
        const s = source(id);
        return (
          <span key={id}>
            {i > 0 && ", "}
            <a href={`#source-${id}`} title={`${s.auteur}, ${s.annee}`} aria-label={`Source ${id} : ${s.auteur}, ${s.annee}`}>
              {id}
            </a>
          </span>
        );
      })}
    </sup>
  );
}
