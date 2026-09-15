import { temoignages } from "@/data/temoignages";
import { Reveal, Stagger, StaggerItem } from "./Reveal";

export function Temoignages() {
  return (
    <section className="temoignages surface-vert" id="temoignages">
      <div className="wrap">
        <Reveal direction="rise" className="section-head is-center">
          <h2 className="display">Paroles de bénévoles.</h2>
          <p className="lede">
            Ce qu&apos;en disent celles et ceux qui ont ramassé avec nous le 23
            mai. Et bientôt vous ?
          </p>
        </Reveal>
        <Stagger className="temoignages-grid" stagger={0.12}>
          {temoignages.map((t) => (
            <StaggerItem key={t.nom}>
              <figure className="temoignage">
                <blockquote>
                  <span className="temoignage-mark" aria-hidden="true">
                    «
                  </span>
                  {t.quote}
                  <span className="temoignage-mark is-end" aria-hidden="true">
                    »
                  </span>
                </blockquote>
                <figcaption>
                  <span className="temoignage-nom">{t.nom}</span>
                  {t.role && <span className="temoignage-role">{t.role}</span>}
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
          <StaggerItem>
            <a
              className="temoignage temoignage-vide"
              href="mailto:association.o.megots@gmail.com?subject=Mon%20t%C3%A9moignage"
            >
              <span className="temoignage-vide-titre">À vous la parole</span>
              <span className="temoignage-vide-texte">
                Vous étiez là, ou vous viendrez ? Racontez-nous votre
                ramassage en une phrase, elle rejoindra celles-ci.
              </span>
              <span className="btn ghost temoignage-vide-btn">Témoigner</span>
            </a>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}
