import { Stagger, StaggerItem } from "../Reveal";

const etapes = [
  {
    titre: "Le trottoir",
    texte: "Jeté, écrasé du pied. Il ne reste pas là : la première pluie le pousse vers la pente.",
  },
  {
    titre: "Le caniveau",
    texte: "L'eau de ruissellement l'emporte avec les feuilles et la poussière, jusqu'à la bouche d'égout la plus proche.",
  },
  {
    titre: "L'avaloir et le réseau pluvial",
    texte: "Dans beaucoup de rues, l'eau de pluie ne passe pas par la station d'épuration : le réseau rejoint directement le cours d'eau ou le bassin le plus proche.",
  },
  {
    titre: "La Brière, la Loire, l'estuaire",
    texte: "Les marais et l'estuaire reçoivent l'eau des villes. Le mégot y libère ses substances, puis le filtre se délite en fibres.",
  },
  {
    titre: "La plage et l'océan",
    texte: "Ce qui ne s'est pas déposé finit sur le sable ou en mer. C'est là que les collectes le retrouvent, en tête de tous les déchets.",
  },
];

/**
 * Le trajet d'un mégot, du trottoir à l'océan : cinq étapes reliées par un
 * fil d'eau, et un mégot qui dérive le long du fil (animation CSS).
 */
export function Trajet() {
  return (
    <div className="trajet">
      <div className="trajet-fil" aria-hidden="true">
        <svg viewBox="0 0 1000 40" preserveAspectRatio="none">
          <path d="M0,20 q60,-14 120,0 t120,0 t120,0 t120,0 t120,0 t120,0 t120,0 t120,0 t40,0" fill="none" stroke="#2A8C7E" strokeWidth="3" strokeLinecap="round" />
        </svg>
        <svg className="trajet-megot" viewBox="-30 -30 60 40">
          <use href="#megot" />
        </svg>
      </div>
      <Stagger className="trajet-etapes" stagger={0.12}>
        {etapes.map((e, i) => (
          <StaggerItem key={e.titre} className="trajet-etape">
            <span className="trajet-n display" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="display">{e.titre}</h3>
            <p>{e.texte}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}
