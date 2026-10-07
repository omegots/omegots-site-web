import Image from "next/image";
import type { CSSProperties } from "react";
import { megothon } from "@/data/ramassages";
import { ApostropheMegot } from "./hero/ApostropheMegot";
import { CaptionCycle } from "./hero/CaptionCycle";
import { HeroCta } from "./hero/HeroCta";
import { HeroProchaine } from "./hero/HeroProchaine";
import { MegotFieldLazy } from "./hero/MegotFieldLazy";

/** Délai d'entrée d'un bloc du hero, en secondes (animation CSS `hero-in`, hero.css). */
const entree = (delay: number): CSSProperties => ({ ["--d" as string]: `${delay}s` });

/**
 * Hero rendu côté serveur, sans Motion : titre, texte, boutons et photo glissent
 * en place par animation CSS (hero.css), dès le premier rendu et sans attendre
 * l'hydratation. Aucun fondu : Chrome ne compte un élément pour le LCP qu'à la
 * fin de son animation d'opacité.
 */
export function Hero() {
  const { litres } = megothon();

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <h1 id="hero-title" className="display hero-in" style={entree(0.15)}>
            Un territoire sans mégots,{" "}
            <span className="accent">
              <span className="cest">
                c<ApostropheMegot delay={0.15 + 0.65} />
                est
              </span>{" "}
              possible.
            </span>
          </h1>
          <p className="hero-sub hero-in" style={entree(0.3)}>
            Association citoyenne à Saint-Nazaire et ses alentours, on dépollue
            les rues, les parcs et les plages des mégots. On les compte, on
            publie les chiffres. Sans juger personne : le mégot est un déchet,
            pas une faute.
          </p>
          <div className="hero-cta hero-in" style={entree(0.42)}>
            <HeroCta />
          </div>
        </div>

        <div className="hero-visuel">
          <HeroProchaine />
          <figure className="hero-photo hero-photo-in">
            <div className="hero-photo-frame">
              <Image
                src="/photos/megothon-bouteilles.jpg"
                alt="Six bouteilles remplies de mégots ramassés dans le centre-ville de Saint-Nazaire, posées sur un muret."
                fill
                priority
                fetchPriority="high"
                quality={60}
                sizes="(max-width: 480px) 360px, (max-width: 860px) 420px, 520px"
                style={{ objectFit: "cover" }}
              />
            </div>
            <figcaption className="hero-photo-cap">
              <span className="hero-photo-num display">{litres} L</span>
              <CaptionCycle />
            </figcaption>
          </figure>
        </div>
      </div>

      {/* Décor (pont, eau) masqué aux lecteurs d'écran ; les mégots à ramasser restent des boutons accessibles. */}
      <div className="hero-scene">
        <div className="hero-bridge" aria-hidden="true">
          {/* Géométrie reprise du logo définitif (pont V2 validé par le bureau) */}
          <svg viewBox="-80 -44 160 58" preserveAspectRatio="xMidYMax meet">
            <g stroke="currentColor" fill="currentColor">
              <path
                className="draw d3"
                style={{ ["--len" as string]: 60 }}
                d="M-19,-35 L-50.5,9 M-19,-32 L-40,7.1 M-19,-29 L-30,5 M-19,-35 L-12,1.1 M-19,-31.5 L-6.5,0.4 M-19,-28 L-1.5,0.1 M19,-35 L50.5,9 M19,-32 L40,7.1 M19,-29 L30,5 M19,-35 L12,1.1 M19,-31.5 L6.5,0.4 M19,-28 L1.5,0.1"
                fill="none"
                strokeWidth="0.9"
                strokeLinecap="round"
              />
              <path
                className="draw d2"
                style={{ ["--len" as string]: 220 }}
                d="M-100,12.5 C-80,12 -68,11 -58,10 C-32,7 -15,0 0,0 C15,0 32,7 58,10 C68,11 80,12 100,12.5"
                fill="none"
                strokeWidth="2.8"
                strokeLinecap="round"
              />
              {/* Le tablier file jusqu'aux bords de l'écran, bien au-delà du cadre */}
              <path
                className="ext"
                d="M-100,12.5 C-160,12.5 -260,9 -900,3 M100,12.5 C160,12.5 260,9 900,3"
                fill="none"
                strokeWidth="2.8"
                strokeLinecap="round"
              />
              <rect className="pyl" x="-21.3" y="-38" width="4.6" height="60" rx="2.3" stroke="none" />
              <rect className="pyl" x="16.7" y="-38" width="4.6" height="60" rx="2.3" stroke="none" />
            </g>
          </svg>
        </div>

        <div className="hero-water">
          <svg className="crest" viewBox="0 0 2000 40" preserveAspectRatio="none" aria-hidden="true">
            <path
              d="M0,26 q80,-22 160,0 t160,0 t160,0 t160,0 t160,0 t160,0 t160,0 t160,0 t160,0 t160,0 t160,0 t160,0 t160,0 L2000,40 L0,40 Z"
              fill="#2A8C7E"
            />
          </svg>
          <svg
            className="ln"
            style={{ top: "34%" }}
            viewBox="0 0 2000 24"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M0,12 q80,-14 160,0 t160,0 t160,0 t160,0 t160,0 t160,0 t160,0 t160,0 t160,0 t160,0 t160,0 t160,0 t160,0"
              fill="none"
              stroke="#F5EFE0"
              strokeWidth="1.6"
              opacity=".45"
            />
          </svg>
          <svg
            className="ln"
            style={{ top: "68%", animationDuration: "26s" }}
            viewBox="0 0 2000 24"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M0,12 q80,-14 160,0 t160,0 t160,0 t160,0 t160,0 t160,0 t160,0 t160,0 t160,0 t160,0 t160,0 t160,0 t160,0"
              fill="none"
              stroke="#F5EFE0"
              strokeWidth="1.6"
              opacity=".35"
            />
          </svg>
          <MegotFieldLazy />
        </div>
      </div>
    </section>
  );
}
