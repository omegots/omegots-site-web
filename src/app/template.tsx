import type { ReactNode } from "react";

/**
 * Fondu court à chaque navigation. Le template est remonté à chaque changement
 * de route, donc l'animation CSS `.page-enter` (globals.css) repart d'elle-même :
 * aucun JavaScript, la page est visible dès le HTML, avant l'hydratation.
 */
export default function Template({ children }: { children: ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
