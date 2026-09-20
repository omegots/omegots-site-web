import { Parcours } from "./mission/Parcours";
import { Reveal } from "./Reveal";

/** Ce qui guide l'association, formulations reprises de son site. */
const principes = [
  "Toujours dans la bonne humeur",
  "Sans juger les fumeurs",
  "Pour tous les âges",
  "Avec les acteurs locaux",
  "Ouverts aux assos et aux entreprises",
  "On mesure, on documente, on partage",
];

/** Le mégot monochrome qui sert de tiret entre les principes. */
function Megot() {
  return (
    <svg className="manifeste-megot" viewBox="-16 -30 32 52" aria-hidden="true">
      <use href="#megot-mono" />
    </svg>
  );
}

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
      <div className="manifeste">
        <div className="manifeste-track">
          {/* La vraie liste : un <ul> dont les <li> sont les seuls enfants (arbre d'accessibilité bien formé). */}
          <ul className="manifeste-run" role="list" aria-label="Ce qui nous guide">
            {principes.map((texte) => (
              <li className="manifeste-item" key={texte}>
                <Megot />
                {texte}
              </li>
            ))}
          </ul>
          {/* Copie purement visuelle pour boucler le défilement, ignorée des technologies d'assistance. */}
          <div className="manifeste-run" aria-hidden="true">
            {principes.map((texte) => (
              <span className="manifeste-item" key={texte}>
                <Megot />
                {texte}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
