import { jourEtDate } from "@/data/contenu";
import { prochaineSortie } from "@/data/ramassages";

/**
 * L'étiquette « Prochaine sortie » collée sur la photo du hero, dans le trait du
 * logo : fond crème, contour bleu, ombre pleine, le mégot en tête. Elle mène au
 * bloc d'inscription de l'accueil. Rendue côté serveur (src/data/contenu.json).
 */
export function HeroProchaine() {
  const p = prochaineSortie();
  const annoncee = p.statut === "annoncee";

  return (
    <a className="hero-notif" href="#prochaine">
      <span className="hero-notif-tag">
        <svg viewBox="-30 -30 60 40" aria-hidden="true" focusable="false">
          <use href="#megot" />
        </svg>
        Prochaine sortie
      </span>
      <span className="hero-notif-date display">{annoncee ? jourEtDate(p.iso) : "Bientôt !"}</span>
      <span className="hero-notif-info">
        {annoncee ? `${p.heure || "Horaire à venir"} · ${p.lieu}` : "Date à fixer, soyez prévenu"}
        <span aria-hidden="true"> →</span>
      </span>
    </a>
  );
}
