/** Formate un nombre à la française (espaces fines de milliers) : 4 800, 2 400 000. Utilisable côté serveur comme côté client. */
export function fr(n: number) {
  return n.toLocaleString("fr-FR");
}
