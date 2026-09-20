import { sources as sourcesMegot, type Source } from "@/data/megot";

/** Appel de source en exposant : renvoie à la liste numérotée en bas de page. */
export function Ref({ ids, liste = sourcesMegot }: { ids: readonly number[]; liste?: readonly Source[] }) {
  return (
    <sup className="ref">
      {ids.map((id, i) => {
        const s = liste.find((x) => x.id === id);
        if (!s) return null;
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
