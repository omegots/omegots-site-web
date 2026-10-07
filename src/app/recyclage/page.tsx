import { pageMetadata } from "@/data/seo";
import Link from "next/link";
import { DevenirUsages } from "@/components/devenir/DevenirUsages";
import { Faq } from "@/components/Faq";
import { PageShell } from "@/components/PageShell";
import { Rejoindre } from "@/components/Rejoindre";
import { Reveal } from "@/components/Reveal";
import { WaveDivider } from "@/components/WaveDivider";
import { Ref } from "@/components/megot/Ref";
import { Sources } from "@/components/megot/Sources";
import { Bancs } from "@/components/recyclage/Bancs";
import { Filiere } from "@/components/recyclage/Filiere";
import { HeroRecyclage } from "@/components/recyclage/HeroRecyclage";
import { Limites } from "@/components/recyclage/Limites";
import { fr } from "@/data/format";
import { megotsParLitre, totals } from "@/data/ramassages";
import { faqRecyclage, MEGOTS_PAR_BANC, sourcesRecyclage } from "@/data/recyclage";
import "@/styles/megot.css";
import "@/styles/recyclage.css";

export const metadata = pageMetadata({
  path: "/recyclage",
  title: "Que deviennent les mégots ramassés ? Le recyclage · O'Mégots",
  description:
    "Collecte, tri, dépollution : comment un mégot devient un banc ou un isolant, qui le recycle en France, ce que dit la loi et ses limites. Sources à l'appui.",
});

const MAILTO_PARTENARIAT = "mailto:association.o.megots@gmail.com?subject=Proposer%20un%20partenariat";

export default function RecyclagePage() {
  // « Aujourd'hui » : le cumul de toutes les sorties.
  const t = totals();
  const partBanc = t.megots / MEGOTS_PAR_BANC;

  return (
    <PageShell
      title="Que deviennent les mégots ramassés ?"
      lede="Ramasser c'est bien, recycler c'est mieux. Mais recycler quoi, comment, et pour en faire quoi ? Voici la filière telle qu'elle existe en France, ses acteurs, la loi, et ses limites. Avec les sources."
      actions={
        <>
          <a className="btn btn-lg" href={MAILTO_PARTENARIAT}>
            Proposer un partenariat
          </a>
          <a className="btn btn-lg ghost" href="#filiere">
            Suivre la filière
            <span className="btn-arrow" aria-hidden="true">
              ↓
            </span>
          </a>
        </>
      }
      visuel={<HeroRecyclage />}
      sommaire={[
        { href: "#aujourdhui", label: "Aujourd'hui, à O'Mégots" },
        { href: "#filiere", label: "La filière, étape par étape" },
        { href: "#usages", label: "Ce que ça devient" },
        { href: "#loi", label: "Ce que dit la loi" },
        { href: "#limites", label: "Les limites" },
      ]}
    >
      <WaveDivider from="bg" to="navy" />

      {/* 1. Aujourd'hui */}
      <section className="megot-section surface-navy" id="aujourdhui" aria-labelledby="auj-titre">
        <div className="wrap">
          <Reveal direction="rise" className="section-head is-center">
            <h2 id="auj-titre" className="display">
              Aujourd&apos;hui, à O&apos;Mégots
            </h2>
            <p className="lede">
              Nos mégots sont comptés, mesurés et publiés. Les recycler est l&apos;étape suivante, et elle ne dépend
              pas que de nous.
            </p>
          </Reveal>
          <Reveal className="rec-auj" delay={0.1}>
            <ul className="cs-grid">
              <li className="cs-tuile">
                <b className="display">{fr(t.megots)}</b>
                <p>
                  mégots ramassés et comptés {t.sorties > 1 ? `en ${t.sorties} sorties` : "lors de notre première sortie"}, à{" "}
                  {fr(megotsParLitre())} par litre.
                </p>
              </li>
              <li className="cs-tuile">
                <b className="display">{partBanc.toLocaleString("fr-FR", { maximumFractionDigits: 1 })}</b>
                <p>
                  banc : ce que ces mégots représentent une fois dépollués, à {fr(MEGOTS_PAR_BANC)} mégots par banc.
                  <Ref ids={[3]} liste={sourcesRecyclage} />
                </p>
              </li>
              <li className="cs-tuile">
                <b className="display">0</b>
                <p>
                  filière de recyclage à Saint-Nazaire pour l&apos;instant. Les recycleurs français sont en Bretagne et
                  dans l&apos;Oise ; c&apos;est le partenariat que l&apos;association cherche.
                </p>
              </li>
            </ul>
          </Reveal>
        </div>
      </section>

      <WaveDivider from="navy" to="bg" />

      {/* 2. La filière */}
      <section className="megot-section" id="filiere" aria-labelledby="fil-titre">
        <div className="wrap">
          <Reveal direction="rise" className="section-head">
            <h2 id="fil-titre" className="display">
              La filière, étape par étape
            </h2>
            <p className="lede">
              Cinq étapes entre le mégot ramassé et l&apos;objet fini. Deux recycleurs français, deux procédés
              différents.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <Filiere />
          </Reveal>
        </div>
      </section>

      <WaveDivider from="bg" to="vert" />

      {/* 3. Ce que ça devient */}
      <section className="megot-section surface-vert" id="usages" aria-labelledby="usages-titre">
        <div className="wrap">
          <Reveal direction="rise" className="section-head is-center">
            <h2 id="usages-titre" className="display">
              Ce que ça devient
            </h2>
            <p className="lede">
              Quatre débouchés : trois gardent la matière, le quatrième en tire de
              l&apos;énergie.
            </p>
          </Reveal>
          <div className="rec-usages devenir">
            <DevenirUsages />
          </div>
        </div>
      </section>

      <WaveDivider from="vert" to="navy" />

      {/* 4. Mégots par banc */}
      <section className="megot-section surface-navy" id="bancs" aria-labelledby="bancs-titre">
        <div className="wrap">
          <Reveal direction="rise" className="section-head is-center">
            <h2 id="bancs-titre" className="display">
              Combien de mégots pour un banc ?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Bancs />
          </Reveal>
        </div>
      </section>

      <WaveDivider from="navy" to="bg" />

      {/* 5. Ce que dit la loi */}
      <section className="megot-section" id="loi" aria-labelledby="loi-titre">
        <div className="wrap">
          <Reveal direction="rise" className="section-head">
            <h2 id="loi-titre" className="display">
              Ce que dit la loi
            </h2>
            <p className="lede">
              Depuis 2021, le mégot a une filière, un financeur et un pictogramme. Pas encore d&apos;obligation de
              recyclage.
            </p>
          </Reveal>
          <Reveal className="loi" delay={0.1}>
            <article className="loi-carte">
              <span className="loi-date">2021</span>
              <h3>Une filière pollueur-payeur</h3>
              <p>
                Les fabricants de tabac financent le nettoiement des mégots via un éco-organisme, Alcome, à hauteur de
                80 millions d&apos;euros par an pour les collectivités. Objectif fixé par l&apos;État : 40 % de mégots
                en moins au sol en six ans.
                <Ref ids={[1]} liste={sourcesRecyclage} />
              </p>
            </article>
            <article className="loi-carte">
              <span className="loi-date">3 juillet 2021</span>
              <h3>Un pictogramme sur chaque paquet</h3>
              <p>
                La directive européenne sur les plastiques à usage unique impose un marquage sur les produits du tabac
                avec filtre : du plastique dans le produit, à ne pas jeter dans la nature. Transposée en France par
                décret le 30 septembre 2021.
                <Ref ids={[7, 8]} liste={sourcesRecyclage} />
              </p>
              <span className="loi-picto" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M4,15 q8,-10 16,0 q-8,8 -16,0 Z" />
                  <path d="M12,8 v-3 M8,9 l-2,-2 M16,9 l2,-2" />
                </svg>
                Plastique dans le produit
              </span>
            </article>
            <article className="loi-carte">
              <span className="loi-date">Nettoyer, pas recycler</span>
              <h3>Le rôle de l&apos;éco-organisme</h3>
              <p>
                Alcome soutient les communes pour le nettoiement, distribue des cendriers de rue et de poche, et
                sensibilise. Le recyclage des mégots, lui, repose sur des entreprises privées et des collectes
                volontaires.
                <Ref ids={[6]} liste={sourcesRecyclage} />
              </p>
            </article>
          </Reveal>
        </div>
      </section>

      <WaveDivider from="bg" to="navy" />

      {/* 6. Les limites */}
      <section className="megot-section surface-navy" id="limites" aria-labelledby="lim-titre">
        <div className="wrap">
          <Reveal direction="rise" className="section-head is-right">
            <h2 id="lim-titre" className="display">
              Les limites, sans détour
            </h2>
            <p className="lede">
              Le recyclage des mégots existe. À l&apos;échelle de ce qui est jeté, il reste une goutte d&apos;eau.
            </p>
          </Reveal>
          <Limites />
        </div>
      </section>

      <WaveDivider from="navy" to="bg" />

      {/* 7. Et à Saint-Nazaire */}
      <section className="megot-section" id="saint-nazaire" aria-labelledby="local-titre">
        <div className="wrap">
          <Reveal direction="rise" className="section-head is-center">
            <h2 id="local-titre" className="display">
              Et à Saint-Nazaire ?
            </h2>
          </Reveal>
          <Reveal className="rec-local" delay={0.1}>
            <div>
              <p>
                Notre ambition est de faire évoluer l&apos;association pour collaborer avec des filières de recyclage :
                trouver un recycleur, organiser le transport des mégots ramassés, et publier ce qu&apos;ils
                deviennent, comme nous publions déjà ce que nous ramassons.
              </p>
              <p>
                Entreprise, école, mairie, recycleur : nous sommes ouverts à toute collaboration, en matériel, en
                communication ou en financement.
              </p>
              <div className="actions">
                <a className="btn btn-lg" href={MAILTO_PARTENARIAT}>
                  Proposer un partenariat
                </a>
                <Link className="btn btn-lg ghost" href="/rejoindre">
                  Venir ramasser
                </Link>
              </div>
            </div>
            <div className="rec-local-objectif">
              <b>0 mégot</b>
              <p>
                dans nos rues et nos espaces publics : c&apos;est l&apos;objectif. Chaque don, chaque bénévole et
                chaque partenariat nous en rapproche.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 8. Sources */}
      <section className="megot-section megot-sources" id="sources" aria-labelledby="sources-titre">
        <div className="wrap">
          <h2 id="sources-titre" className="sr-only">
            Sources
          </h2>
          <Sources liste={sourcesRecyclage} majLe="2026-09-29" />
        </div>
      </section>

      <WaveDivider from="bg" to="orange" />
      <Rejoindre />
      <WaveDivider from="orange" to="bg" />
      <Faq
        id="faq"
        items={faqRecyclage}
        titre="FAQ : le recyclage en questions"
        lede="Les réponses courtes, adossées aux sources de la page."
      />
      <WaveDivider from="bg" to="navy" />
    </PageShell>
  );
}
