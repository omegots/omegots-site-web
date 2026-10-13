import { Fragment, type ReactNode } from "react";

/**
 * Ajoute un point de coupure (<wbr>) après chaque « @ » : sur un petit
 * téléphone, une adresse e-mail passe à la ligne en deux morceaux lisibles
 * (« association.o.megots@ / gmail.com ») plutôt qu'au milieu de « .com ».
 * <wbr> n'ajoute aucun caractère : le copier-coller de l'adresse reste juste.
 */
export function avecCoupureArobase(texte: string): ReactNode {
  if (!texte.includes("@")) return texte;
  return texte.split("@").map((morceau, i) => (
    <Fragment key={i}>
      {i > 0 && (
        <>
          @<wbr />
        </>
      )}
      {morceau}
    </Fragment>
  ));
}
