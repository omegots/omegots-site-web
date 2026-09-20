import { valeurs } from "@/data/association";
import { Stagger, StaggerItem } from "../Reveal";

/** Les six valeurs de l'association, chacune avec le mégot du logo en repère. */
export function Valeurs() {
  return (
    <Stagger className="valeurs" stagger={0.08}>
      {valeurs.map((v, i) => (
        <StaggerItem key={v.id} className="valeur">
          <span className="valeur-n display" aria-hidden="true">
            {String(i + 1).padStart(2, "0")}
          </span>
          <svg className="valeur-megot" viewBox="-16 -30 32 52" aria-hidden="true">
            <use href="#megot-mono" />
          </svg>
          <h3 className="display">{v.nom}</h3>
          <p>{v.texte}</p>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
