import { deroule } from "@/data/ramassages-page";
import { Stagger, StaggerItem } from "../Reveal";

/** Le déroulé d'une sortie : cinq temps numérotés, reliés par un filet. */
export function Deroule() {
  return (
    <Stagger className="deroule" stagger={0.12}>
      {deroule.map((d, i) => (
        <StaggerItem key={d.titre} className="deroule-etape">
          <span className="deroule-n display" aria-hidden="true">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="display">{d.titre}</h3>
          <p>{d.texte}</p>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
