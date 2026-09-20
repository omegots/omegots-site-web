import type { FaqItem } from "@/data/faq";
import { Reveal } from "./Reveal";

type FaqProps = {
  /** Questions et réponses de la page. */
  items: FaqItem[];
  /** Titre affiché, qui commence par « FAQ : ». */
  titre: string;
  lede?: string;
  /** Identifiant unique par page, pour l'ancre et le groupe de <details>. */
  id?: string;
};

/**
 * Questions fréquentes : des <details> natifs, groupés par `name` pour qu'une
 * seule réponse soit ouverte à la fois. Aucun JavaScript : lisible dès le HTML,
 * navigable au clavier, et l'arbre d'accessibilité reste plat pour les lecteurs
 * d'écran comme pour les agents. L'ouverture est animée en CSS (faq.css).
 * Le balisage FAQPage (schema.org) est généré à partir des mêmes données.
 */
export function Faq({ items, titre, lede, id = "faq" }: FaqProps) {
  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.reponse },
    })),
  }).replace(/</g, "\\u003c");

  return (
    <section className="faq" id={id} aria-labelledby={`${id}-title`}>
      <div className="wrap faq-grid">
        <Reveal direction="rise" className="section-head faq-head">
          <h2 id={`${id}-title`} className="display">
            {titre}
          </h2>
          {lede && <p className="lede">{lede}</p>}
        </Reveal>

        <Reveal direction="up" delay={0.1} className="faq-list">
          {items.map((item, i) => (
            <details className="faq-item" name={id} key={item.question}>
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
    </section>
  );
}
