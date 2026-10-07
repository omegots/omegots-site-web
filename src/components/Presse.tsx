import { articlesPresse } from "@/data/presse";
import { HighlightedTitle } from "./presse/HighlightedTitle";
import { MediaLogo } from "./presse/MediaLogo";
import { Reveal, Stagger, StaggerItem } from "./Reveal";

export function Presse() {
  return (
    <section className="presse" id="presse">
      <div className="wrap presse-grid">
        <Reveal direction="rise" className="section-head presse-head is-right">
          <h2 className="display">La presse locale suit nos actions.</h2>
        </Reveal>

        <Stagger className="presse-list" stagger={0.1}>
          {articlesPresse.map((a) => (
            <StaggerItem key={a.href}>
              <a
                className="presse-row"
                href={a.href}
                aria-label={`Lire : ${a.title} (${a.media})`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MediaLogo media={a.media} />
                <span className="presse-title">
                  <HighlightedTitle title={a.title} highlights={a.highlights} />
                </span>
                <span className="presse-cta" aria-hidden="true">
                  Lire ↗
                </span>
              </a>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
