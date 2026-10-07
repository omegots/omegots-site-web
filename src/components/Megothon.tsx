import Image from "next/image";
import { fr } from "@/data/format";
import { depuisMois, megotsParLitre, ramassages, totals } from "@/data/ramassages";
import { Bilan } from "./bilan/Bilan";
import { ProchaineSortie } from "./ProchaineSortie";
import { Reveal } from "./Reveal";

/**
 * Le bilan de l'accueil : le total de toutes les sorties en quatre cartes,
 * puis les trois sorties les plus récentes, et la prochaine. Tout vient de
 * src/data/contenu.json (géré depuis /admin).
 */
export function Megothon() {
  const t = totals();
  const dernieres = ramassages.slice(-3).reverse();

  return (
    <section className="megothon surface-navy" id="actions">
      <div className="wrap">
        <Reveal direction="rise" className="section-head is-center">
          <h2 className="display">
            <span className="accent-orange">{fr(t.litres)} litres</span> de mégots en {t.sorties}{" "}
            {t.sorties > 1 ? "sorties" : "sortie"}.
          </h2>
          <p className="lede">
            {t.benevoles} bénévoles depuis {depuisMois()}, dans les rues, les parcs et sur les plages de
            Saint-Nazaire. Voici ce que les trottoirs ont rendu.
          </p>
        </Reveal>

        <Bilan
          litres={t.litres}
          megots={t.megots}
          eau={t.eau}
          benevoles={t.benevoles}
          sorties={t.sorties}
          depuis={depuisMois()}
          parLitre={megotsParLitre()}
        />

        <Reveal className="bilan-sorties" delay={0.05}>
          <div className="bilan-sorties-tete">
            <h3 className="bilan-sorties-titre">
              {t.sorties > 3 ? "Les trois dernières sorties" : "Nos sorties"}
            </h3>
            <a className="bilan-sorties-lien" href="/ramassages#sorties">
              Tous les bilans détaillés <span aria-hidden="true">→</span>
            </a>
          </div>
          <ul>
            {dernieres.map((r) => (
              <li key={`${r.date}-${r.libelle}`}>
                <article className="bilan-sortie">
                  <div className="bilan-sortie-photo">
                    {r.photos?.[0] ? (
                      <Image
                        src={r.photos[0].src}
                        alt={r.photos[0].alt}
                        fill
                        quality={60}
                        sizes="(max-width: 860px) 120px, 380px"
                      />
                    ) : (
                      <svg viewBox="-30 -30 60 40" aria-hidden="true">
                        <use href="#megot" />
                      </svg>
                    )}
                  </div>
                  <div className="bilan-sortie-corps">
                    <p className="bilan-sortie-date">{r.date}</p>
                    <h4 className="bilan-sortie-nom">
                      {r.libelle}, {r.lieu}
                    </h4>
                    <p className="bilan-sortie-chiffres">
                      <span>{fr(r.litres)} L</span>
                      <span>{fr(r.megots)} mégots</span>
                      <span>{r.benevoles} bénévoles</span>
                    </p>
                  </div>
                </article>
              </li>
            ))}
            {dernieres.length < 3 && (
              <li>
                <a className="bilan-sortie is-prochaine" href="#prochaine">
                  <b>La prochaine fiche, c&apos;est peut-être vous dessus.</b>
                  <span>Être prévenu de la prochaine sortie →</span>
                </a>
              </li>
            )}
          </ul>
        </Reveal>

        <ProchaineSortie className="megothon-next" id="prochaine" delay={0.1} />
      </div>
    </section>
  );
}
