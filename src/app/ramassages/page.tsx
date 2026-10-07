import { pageMetadata } from "@/data/seo";
import Link from "next/link";
import { Faq } from "@/components/Faq";
import { ProchaineSortie } from "@/components/ProchaineSortie";
import { Bilan } from "@/components/bilan/Bilan";
import { PageShell } from "@/components/PageShell";
import { Rejoindre } from "@/components/Rejoindre";
import { Reveal } from "@/components/Reveal";
import { WaveDivider } from "@/components/WaveDivider";
import { Ref } from "@/components/megot/Ref";
import { Sources } from "@/components/megot/Sources";
import { Deroule } from "@/components/ramassages/Deroule";
import { FicheSortie } from "@/components/ramassages/FicheSortie";
import { HeroRamassages } from "@/components/ramassages/HeroRamassages";
import { RemplirLitre } from "@/components/ramassages/RemplirLitre";
import { Zones } from "@/components/ramassages/Zones";
import { evenementProchain, jsonLd } from "@/data/jsonld";
import { depuisMois, megotsParLitre, ramassages, totals } from "@/data/ramassages";
import { faqRamassages, sourcesRamassages } from "@/data/ramassages-page";
import "@/styles/megot.css";
import "@/styles/ramassages.css";

export const metadata = pageMetadata({
  path: "/ramassages",
  title: "Ramassages de mégots à Saint-Nazaire · O'Mégots",
  description:
    "Ramassages de mégots gratuits à Saint-Nazaire et alentours : prochaine sortie, bilan chiffré de chaque sortie, lieux et déroulé. Ouvert à tous.",
});

const MAILTO_LIEU = "mailto:association.o.megots@gmail.com?subject=Signaler%20un%20lieu";

export default function RamassagesPage() {
  const t = totals();
  const sorties = [...ramassages].reverse();

  return (
    <PageShell
      title="Nos ramassages de mégots à Saint-Nazaire."
      lede="Les sorties, les chiffres, la prochaine date. Des ramassages gratuits, ouverts à toutes et tous, dans les rues, les parcs et sur les plages de Saint-Nazaire et ses alentours, mesurés et publiés ici, litre par litre."
      actions={
        <>
          <a className="btn btn-lg" href="#prochaine">
            Être prévenu de la prochaine sortie
          </a>
          <a className="btn btn-lg ghost" href="#sorties">
            Voir le dernier bilan
            <span className="btn-arrow" aria-hidden="true">
              ↓
            </span>
          </a>
        </>
      }
      visuel={<HeroRamassages />}
      sommaire={[
        { href: "#prochaine", label: "Prochaine sortie" },
        { href: "#sorties", label: "Nos sorties" },
        { href: "#zones", label: "Où on ramasse" },
        { href: "#deroule", label: "Comment ça se passe" },
        { href: "#compter", label: "Pourquoi on compte" },
      ]}
    >
      {/* 1. Prochaine sortie */}
      <section className="megot-section" id="prochaine" aria-labelledby="prochaine-titre">
        <div className="wrap">
          <ProchaineSortie className="prochaine" titreId="prochaine-titre" details />
        </div>
      </section>

      <WaveDivider from="bg" to="navy" />

      {/* 2. Nos sorties */}
      <section className="megot-section surface-navy" id="sorties" aria-labelledby="sorties-titre">
        <div className="wrap">
          <Reveal direction="rise" className="section-head is-center">
            <h2 id="sorties-titre" className="display">
              Nos sorties
            </h2>
            <p className="lede">
              Une fiche par ramassage, la plus récente en premier. Les totaux s&apos;additionnent à chaque sortie.
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <Bilan
              litres={t.litres}
              megots={t.megots}
              eau={t.eau}
              benevoles={t.benevoles}
              sorties={t.sorties}
              depuis={depuisMois()}
              parLitre={megotsParLitre()}
            />
          </Reveal>
          {sorties.map((s, i) => (
            <FicheSortie key={s.date} sortie={s} inverse={i % 2 === 1} />
          ))}
        </div>
      </section>

      <WaveDivider from="navy" to="bg" />

      {/* 3. Où on ramasse */}
      <section className="megot-section" id="zones" aria-labelledby="zones-titre">
        <div className="wrap">
          <Reveal direction="rise" className="section-head">
            <h2 id="zones-titre" className="display">
              Où on ramasse
            </h2>
            <p className="lede">
              Partout où les mégots s&apos;accumulent. Trois types de zones, et les vôtres si vous nous les signalez.
            </p>
          </Reveal>
          <Zones />
          <div className="zones-signaler">
            <a className="btn ghost" href={MAILTO_LIEU}>
              Signaler un lieu plein de mégots
            </a>
          </div>
        </div>
      </section>

      <WaveDivider from="bg" to="vert" />

      {/* 4. Comment ça se passe */}
      <section className="megot-section surface-vert" id="deroule" aria-labelledby="deroule-titre">
        <div className="wrap">
          <Reveal direction="rise" className="section-head is-right">
            <h2 id="deroule-titre" className="display">
              Comment ça se passe
            </h2>
            <p className="lede">Cinq temps, du mail à la publication. Ni matériel à acheter, ni cotisation.</p>
          </Reveal>
          <Deroule />
        </div>
      </section>

      <WaveDivider from="vert" to="navy" />

      {/* 5. Pourquoi on compte */}
      <section className="megot-section surface-navy" id="compter" aria-labelledby="compter-titre">
        <div className="wrap">
          <Reveal direction="rise" className="section-head is-center">
            <h2 id="compter-titre" className="display">
              Pourquoi on compte
            </h2>
            <p className="lede">
              Un sac plein, ça se jette. Un chiffre publié, ça se discute en mairie. Les collectes comptées de Surfrider
              ont pesé jusque dans la directive européenne sur les plastiques à usage unique.
              <Ref ids={[4]} liste={sourcesRamassages} />
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <RemplirLitre />
          </Reveal>
        </div>
      </section>

      <WaveDivider from="navy" to="bg" />

      {/* 6. Mini-jeu */}
      <section className="megot-section" id="jeu" aria-labelledby="jeu-titre">
        <div className="wrap">
          <Reveal className="jeu-ligne" delay={0.05}>
            <p>
              <b id="jeu-titre">Mini-jeu : ramassez avant la marée.</b>
              La marée monte en quatorze secondes : touchez les mégots avant la vague. Chaque mégot sauvé, c&apos;est
              jusqu&apos;à 500 litres d&apos;eau épargnés.
            </p>
            <Link className="btn" href="/jeu">
              Jouer
            </Link>
          </Reveal>
        </div>
      </section>

      {/* 7. Sources */}
      <section className="megot-section megot-sources" id="sources" aria-labelledby="sources-titre">
        <div className="wrap">
          <h2 id="sources-titre" className="sr-only">
            Sources
          </h2>
          <Sources liste={sourcesRamassages} majLe="2026-09-29" />
        </div>
      </section>

      <WaveDivider from="bg" to="orange" />
      <Rejoindre href="#prochaine" />
      <WaveDivider from="orange" to="bg" />
      <Faq
        id="faq"
        items={faqRamassages}
        titre="FAQ : venir ramasser"
        lede="Les réponses courtes avant votre première sortie."
      />
      <WaveDivider from="bg" to="navy" />
      {evenementProchain && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(evenementProchain) }} />
      )}
    </PageShell>
  );
}
