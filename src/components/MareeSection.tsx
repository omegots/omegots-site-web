import { LITRES_EAU_PAR_MEGOT } from "@/data/ramassages";
import { Maree } from "./jeu/Maree";
import { Reveal } from "./Reveal";

export function MareeSection() {
  return (
    <section className="maree" id="jeu">
      <div className="wrap maree-grid">
        <Reveal direction="rise" className="section-head maree-head">
          <h2 className="display">Mini-jeu : ramassez avant la marée.</h2>
          <p className="lede">
            À vous de jouer. Un mégot par terre finit dans l&apos;eau : touchez
            les mégots avant que la vague les emporte : chaque mégot sauvé, c&apos;est jusqu&apos;à{" "}
            {LITRES_EAU_PAR_MEGOT.toLocaleString("fr-FR")} litres d&apos;eau
            épargnés.
          </p>
        </Reveal>
        <Reveal direction="right" delay={0.1} className="maree-col">
          <Maree />
        </Reveal>
      </div>
    </section>
  );
}
