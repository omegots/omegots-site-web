import { Parcours } from "./mission/Parcours";
import { Reveal } from "./Reveal";

/** Ce qui guide l'association, formulations reprises de son site. */
const principes = [
  "Toujours dans la bonne humeur",
  "Sans juger les fumeurs",
  "Pour tous les âges, de 7 à 77 ans",
  "Avec les acteurs locaux",
  "Ouverts aux assos et aux entreprises",
  "On mesure, on documente, on partage",
];

export function Mission() {
  return (
    <section className="mission" id="mission">
      <div className="wrap">
        <Reveal direction="rise" className="section-head is-center">
          <h2 className="display">Ramasser, compter, partager.</h2>
          <p className="lede">
            Le mégot est le déchet le plus jeté au monde. Notre réponse tient en
            trois gestes simples, répétés à chaque sortie.
          </p>
        </Reveal>

        <Parcours />
      </div>

      {/* Ce qui nous guide : un bandeau qui défile lentement, sans rien à cliquer. */}
      <div className="manifeste" role="list" aria-label="Ce qui nous guide">
        <div className="manifeste-track" aria-hidden="false">
          {[0, 1].map((copie) => (
            <div className="manifeste-run" key={copie} aria-hidden={copie === 1 ? true : undefined}>
              {principes.map((texte) => (
                <span className="manifeste-item" role={copie === 0 ? "listitem" : undefined} key={texte}>
                  <svg className="manifeste-megot" viewBox="-16 -30 32 52" aria-hidden="true">
                    <use href="#megot-mono" />
                  </svg>
                  {texte}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
