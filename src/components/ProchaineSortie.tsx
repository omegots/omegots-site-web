import { prochaineSortie } from "@/data/ramassages";
import { FormPrevenir, type EtatPrevenir } from "./FormPrevenir";
import { Reveal } from "./Reveal";

type ProchaineSortieProps = {
  /** Classe du bloc, selon la page : « megothon-next » (accueil) ou « prochaine » (pages intérieures). */
  className: "megothon-next" | "prochaine";
  /** Ancre du bloc, quand la section parente ne la porte pas déjà. */
  id?: string;
  /** Titre en <h2> (avec cet id pour aria-labelledby) ; sinon un simple paragraphe. */
  titreId?: string;
  /** Ligne Date / Lieu / Prix sous le texte (page Ramassages). */
  details?: boolean;
  delay?: number;
  onFocusChange?: (focused: boolean) => void;
  onEtatChange?: (etat: EtatPrevenir) => void;
};

/**
 * Le bloc « Prochaine sortie », le même partout (accueil, Ramassages, Nous
 * rejoindre), alimenté par src/data/contenu.json. Date à fixer : le texte
 * d'attente et l'alerte e-mail. Date annoncée : le rendez-vous, et l'alerte
 * reste là pour recevoir le rappel.
 */
export function ProchaineSortie({
  className,
  id,
  titreId,
  details = false,
  delay = 0.05,
  onFocusChange,
  onEtatChange,
}: ProchaineSortieProps) {
  const p = prochaineSortie();
  const annoncee = p.statut === "annoncee";

  const titre = annoncee ? `${p.libelle || "Prochain ramassage"} : ${p.date}.` : "Le prochain ramassage arrive.";
  const texte = annoncee
    ? [
        `Rendez-vous à ${p.heure}, ${p.lieu}`,
        p.duree ? `, pour ${p.duree} de ramassage. ` : ". ",
        p.note ? `${p.note} ` : "",
        "Laissez votre adresse pour recevoir un rappel. Rien d'autre, promis.",
      ].join("")
    : "Date à fixer. Laissez votre adresse, on vous écrit dès que la date est fixée. Rien d'autre, promis.";

  return (
    <Reveal className={className} id={id} delay={delay}>
      <div>
        <p className="megothon-next-tag">Prochaine sortie</p>
        {titreId ? (
          <h2 id={titreId} className="megothon-next-title display">
            {titre}
          </h2>
        ) : (
          <p className="megothon-next-title display">{titre}</p>
        )}
        <p className="megothon-next-text">{texte}</p>
        {details && (
          <p className="prochaine-quand">
            <span>
              <b>Date</b> : {annoncee ? `${p.date}, ${p.heure}` : "à fixer"}
            </span>
            <span>
              <b>Lieu</b> : {annoncee ? p.lieu : "Saint-Nazaire et alentours"}
            </span>
            <span>
              <b>Prix</b> : gratuit, sans inscription
            </span>
          </p>
        )}
      </div>
      <FormPrevenir onFocusChange={onFocusChange} onEtatChange={onEtatChange} />
    </Reveal>
  );
}
