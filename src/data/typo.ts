/**
 * Espaces insécables de la typographie française, pour l'affichage : un « ? »
 * ou un « : » ne commence plus une ligne, et un nombre reste collé à ce qui le
 * suit (« 7 novembre », « 1 euro », « 15 000 mégots ») sur un écran étroit.
 * Espace insécable classique (U+00A0) : la fine (U+202F) n'existe pas dans les
 * polices du site et s'afficherait sans largeur.
 */
export function insecables(texte: string): string {
  return texte
    .replace(/ ([?!:;»])/g, " $1")
    .replace(/« /g, "« ")
    .replace(/(\d) (?=[\d\p{L}€%])/gu, "$1 ");
}
