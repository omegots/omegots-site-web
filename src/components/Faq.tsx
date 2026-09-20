import { faq } from "@/data/faq";
import { Reveal } from "./Reveal";

/**
 * Questions fréquentes : des <details> natifs, groupés par `name` pour qu'une
 * seule réponse soit ouverte à la fois. Aucun JavaScript : lisible dès le HTML,
 * navigable au clavier, et l'arbre d'accessibilité reste plat pour les lecteurs
 * d'écran comme pour les agents. L'ouverture est animée en CSS (faq.css).
 */
export function Faq() {
  return (
    <section className="faq" id="faq" aria-labelledby="faq-title">
      <div className="wrap faq-grid">
        <Reveal direction="rise" className="section-head faq-head">
          <h2 id="faq-title" className="display">
            FAQ : avant de venir ramasser
          </h2>
          <p className="lede">
            Ce qu&apos;on nous demande le plus souvent. Il manque la vôtre ? Écrivez-nous,
            on répond à tout le monde.
          </p>
        </Reveal>

        <Reveal direction="up" delay={0.1} className="faq-list">
          {faq.map((item, i) => (
            <details className="faq-item" name="faq" key={item.question}>
              <summary className="faq-q">
                <span className="faq-n display" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="faq-q-text">{item.question}</span>
                <span className="faq-plus" aria-hidden="true" />
              </summary>
              <div className="faq-a">
                <div className="faq-a-inner">
                  <p>{item.reponse}</p>
                  {item.lien && (
                    <a className="faq-lien" href={item.lien.href}>
                      {item.lien.label}
                      <span aria-hidden="true"> →</span>
                    </a>
                  )}
                </div>
              </div>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
