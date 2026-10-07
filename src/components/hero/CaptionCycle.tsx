import { megothon, ramassages } from "@/data/ramassages";
import { fr } from "@/data/format";

/**
 * Légende de la photo du hero : le « 6 L » à gauche, « de mégots » puis la
 * phrase fixe à droite (jusqu'à combien de litres d'eau épargnés), puis la date.
 * Plus de défilement : le client garde uniquement cette phrase.
 */
export function CaptionCycle() {
  const { eau } = megothon();
  const date = ramassages[0].date;

  return (
    <span className="hero-cap-text">
      <span className="hero-cap-line">
        de mégots, soit jusqu&apos;à {fr(eau)} litres d&apos;eau épargnés
      </span>
      <span className="hero-cap-date">Mégothon du {date}.</span>
    </span>
  );
}
