import { Reveal } from "./Reveal";
import { DevenirUsages } from "./devenir/DevenirUsages";

export function Devenir() {
  return (
    <section className="devenir surface-navy" id="devenir">
      <div className="wrap devenir-grid">
        <Reveal direction="rise" className="section-head devenir-head is-center">
          <h2 className="display">Ramasser c&apos;est bien, recycler c&apos;est mieux.</h2>
          <p className="lede">
            Notre ambition : collaborer avec des filières de recyclage pour que
            les mégots ramassés deviennent autre chose qu&apos;un déchet.
          </p>
          <a
            className="btn"
            href="mailto:association.o.megots@gmail.com?subject=Proposer%20un%20partenariat"
          >
            Proposer un partenariat
          </a>
        </Reveal>

        <DevenirUsages />
      </div>
    </section>
  );
}
