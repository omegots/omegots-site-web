import { Reveal } from "@/components/Reveal";
import { donFinance, PAYASSO_DON } from "@/data/rejoindre";

/** Panneau « Faire un don », partagé entre Nous rejoindre et Nous contacter. */
export function FaireUnDon() {
  return (
    <Reveal className="don" delay={0.1}>
      <div className="don-accroche">
        <svg className="don-megot" viewBox="-30 -30 60 40" aria-hidden="true">
          <use href="#megot" />
        </svg>
        <svg className="don-megot is-2" viewBox="-30 -30 60 40" aria-hidden="true">
          <use href="#megot" />
        </svg>
        <h2 id="don-titre" className="display">
          Votre don, ce sont <em>des mégots en moins</em>.
        </h2>
        <p>
          O&apos;Mégots avance grâce à ses bénévoles et à vos dons. Chaque euro part sur le terrain : du matériel,
          une assurance, des sorties de plus. Le montant est libre, même un petit geste compte.
        </p>
      </div>
      <div className="don-action">
        <p className="don-liste-titre">Ce que votre don finance</p>
        <ul className="don-liste">
          {donFinance.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
        <a className="btn btn-lg don-btn" href={PAYASSO_DON} target="_blank" rel="noopener noreferrer">
          Je fais un don
          <span className="btn-arrow" aria-hidden="true">
            →
          </span>
        </a>
        <p className="don-securite">Montant libre · paiement sécurisé par Crédit Mutuel Pay Asso</p>
      </div>
    </Reveal>
  );
}
