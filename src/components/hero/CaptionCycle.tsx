import { ramassages, totals } from "@/data/ramassages";
import { fr } from "@/data/format";

/**
 * Légende de la photo du hero : le « 6 L » à gauche, une seule phrase fixe à
 * droite (jusqu'à combien de litres d'eau épargnés), puis la date de la sortie.
 * Plus de défilement : le client garde uniquement cette phrase.
 */
export function CaptionCycle() {
  const { eau } = totals();
  const date = ramassages[0].date;

  return (
    <span className="hero-cap-text">
      <span className="hero-cap-line">
        soit jusqu&apos;à {fr(eau)} litres d&apos;eau épargnés
      </span>
      <span className="hero-cap-date">Mégothon du {date}.</span>
    </span>
  );
}
