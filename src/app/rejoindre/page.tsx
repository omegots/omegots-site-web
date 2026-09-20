import type { Metadata } from "next";
import Link from "next/link";
import { Faq } from "@/components/Faq";
import { FormPrevenir } from "@/components/FormPrevenir";
import { PageShell } from "@/components/PageShell";
import { Rejoindre } from "@/components/Rejoindre";
import { Reseaux } from "@/components/Reseaux";
import { Reveal } from "@/components/Reveal";
import { WaveDivider } from "@/components/WaveDivider";
import { HeroRejoindre } from "@/components/rejoindre/HeroRejoindre";
import { Impact } from "@/components/rejoindre/Impact";
import { Partager } from "@/components/rejoindre/Partager";
import { aides, etapes, faqRejoindre, implique, PAYASSO_ADHESION, PAYASSO_DON } from "@/data/rejoindre";
import { reseaux } from "@/data/reseaux";
import "@/styles/megot.css";
import "@/styles/ramassages.css";
import "@/styles/rejoindre.css";

export const metadata: Metadata = {
  alternates: { canonical: "/rejoindre" },
  title: "Nous rejoindre · O'Mégots",
  description:
    "Venir ramasser gratuitement, adhérer pour 1 euro, faire un don, proposer un partenariat ou signaler un lieu : toutes les façons de rejoindre O'Mégots à Saint-Nazaire.",
};

export default function RejoindrePage() {
  const reseauxActifs = reseaux.some((r) => r.href);

  return (
    <PageShell
      title="L'association se construit maintenant. C'est le bon moment."
      lede="Venir ramasser est gratuit et sans inscription. Adhérer coûte 1 euro symbolique. Et il y a mille autres façons d'aider, même sans venir."
      actions={
        <>
          <a className="btn btn-lg" href="#prochaine">
            Être prévenu de la prochaine sortie
          </a>
          <a className="btn btn-lg ghost" href="#adherer">
            Adhérer pour 1 €
            <span className="btn-arrow" aria-hidden="true">
              ↓
            </span>
          </a>
        </>
      }
      visuel={<HeroRejoindre />}
      sommaire={[
        { href: "#venir", label: "Venir ramasser" },
        { href: "#etapes", label: "Trois étapes simples" },
        { href: "#adherer", label: "Adhérer" },
        { href: "#don", label: "Faire un don" },
        { href: "#aider", label: "Aider autrement" },
      ]}
    >
      <WaveDivider from="bg" to="navy" />

      {/* 1. Venir ramasser */}
      <section className="megot-section surface-navy" id="venir" aria-labelledby="venir-titre">
        <div className="wrap venir">
          <Reveal direction="rise" className="section-head is-center">
            <h2 id="venir-titre" className="display">
              Venir ramasser
            </h2>
            <p className="lede">
              Gratuit, sans adhésion, à tout âge. On vous prévient par e-mail, vous venez, on ramasse, on compte.
            </p>
          </Reveal>
          <Reveal className="prochaine" id="prochaine" delay={0.05}>
            <div>
              <p className="megothon-next-tag">Prochaine sortie</p>
              <p className="megothon-next-title display">Le prochain ramassage arrive.</p>
              <p className="megothon-next-text">
                Date à fixer. Laissez votre adresse, on vous écrit dès que la date est fixée. Rien d&apos;autre, promis.
              </p>
            </div>
            <FormPrevenir />
          </Reveal>
          <Reveal delay={0.1}>
            <Impact />
          </Reveal>
        </div>
      </section>

      <WaveDivider from="navy" to="bg" />

      {/* 2. Trois étapes simples */}
      <section className="megot-section" id="etapes" aria-labelledby="etapes-titre">
        <div className="wrap">
          <Reveal direction="rise" className="section-head">
            <h2 id="etapes-titre" className="display">
              Trois étapes simples
            </h2>
            <p className="lede">Comment ça marche, de l&apos;adhésion à la première sortie.</p>
          </Reveal>
          <Reveal className="etapes" delay={0.1}>
            {etapes.map((e, i) => (
              <article key={e.titre} className="etape">
                <span className="etape-n display" aria-hidden="true">
                  {i + 1}
                </span>
                <h3>{e.titre}</h3>
                <p>{e.texte}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      <WaveDivider from="bg" to="vert" />

      {/* 3. Adhérer */}
      <section className="megot-section surface-vert" id="adherer" aria-labelledby="adherer-titre">
        <div className="wrap">
          <Reveal direction="rise" className="section-head is-right">
            <h2 id="adherer-titre" className="display">
              Adhérer à O&apos;Mégots
            </h2>
            <p className="lede">Symbolique, volontaire, et utile : 1 euro pour devenir membre et voter.</p>
          </Reveal>
          <Reveal className="adherer" delay={0.1}>
            <div className="adherer-texte">
              <span className="adherer-gratuit">Participer aux ramassages reste gratuit, sans adhérer</span>
              <p>
                L&apos;adhésion à 1 € est symbolique et volontaire. Elle permet à ceux qui le souhaitent de devenir
                membre officiel de l&apos;association, avec le droit de voter en assemblée générale.
              </p>
              <p>
                Ces cotisations nous aident à couvrir nos frais indispensables : assurance, matériel de collecte,
                communication.
              </p>
            </div>
            <div className="adherer-carte">
              <p className="adherer-prix">
                <b>1 €</b>
                <span>symbolique, pour devenir membre</span>
              </p>
              <ul aria-label="Ce que ça implique">
                {implique.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
              <a className="btn btn-lg" href={PAYASSO_ADHESION} target="_blank" rel="noopener noreferrer">
                Adhérer en ligne
              </a>
              <p className="adherer-securite">
                Paiement sécurisé par Crédit Mutuel Pay Asso, solution dédiée aux associations. Vos informations servent
                uniquement à la gestion de l&apos;association, jamais partagées, conformément au RGPD.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <WaveDivider from="vert" to="bg" />

      {/* 4. Faire un don */}
      <section className="megot-section" id="don" aria-labelledby="don-titre">
        <div className="wrap">
          <Reveal direction="rise" className="section-head is-center">
            <h2 id="don-titre" className="display">
              Faire un don
            </h2>
          </Reveal>
          <Reveal className="don" delay={0.1}>
            <p>
              Vous souhaitez soutenir O&apos;Mégots financièrement ? Chaque don nous aide à financer notre matériel,
              notre assurance et nos actions sur le terrain. Montant libre.
            </p>
            <a className="btn btn-lg" href={PAYASSO_DON} target="_blank" rel="noopener noreferrer">
              Faire un don
            </a>
            <span className="don-securite">Paiement sécurisé par Crédit Mutuel Pay Asso.</span>
          </Reveal>
        </div>
      </section>

      <WaveDivider from="bg" to="navy" />

      {/* 5. D'autres façons d'aider */}
      <section className="megot-section surface-navy" id="aider" aria-labelledby="aider-titre">
        <div className="wrap">
          <Reveal direction="rise" className="section-head is-center">
            <h2 id="aider-titre" className="display">
              D&apos;autres façons d&apos;aider
            </h2>
            <p className="lede">Même sans venir ramasser, il y a de quoi faire.</p>
          </Reveal>
          <Reveal className="aides" delay={0.1}>
            {aides.map((a) => (
              <article key={a.id} className="aide">
                <h3>{a.titre}</h3>
                <p>{a.texte}</p>
                {a.lien ? (
                  <a className="btn ghost" href={a.lien}>
                    {a.label}
                  </a>
                ) : (
                  <Partager className="btn ghost" />
                )}
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      <WaveDivider from="navy" to="bg" />

      {/* 6. Réseaux, seulement quand les adresses existent */}
      {reseauxActifs && (
        <section className="megot-section" id="reseaux" aria-labelledby="reseaux-titre">
          <div className="wrap">
            <Reveal direction="rise" className="section-head">
              <h2 id="reseaux-titre" className="display">
                On se retrouve aussi ici
              </h2>
            </Reveal>
            <Reseaux variant="cartes" />
          </div>
        </section>
      )}

      {/* 7. Voir aussi */}
      <section className="megot-section" id="voir-aussi" aria-labelledby="voir-titre">
        <div className="wrap">
          <Reveal className="jeu-ligne" delay={0.05}>
            <p>
              <b id="voir-titre">Une question avant de venir ?</b>
              Le déroulé d&apos;une sortie, les lieux, ce que deviennent les mégots : tout est sur la page des
              ramassages.
            </p>
            <Link className="btn" href="/ramassages">
              Voir nos ramassages
            </Link>
          </Reveal>
        </div>
      </section>

      <WaveDivider from="bg" to="orange" />
      <Rejoindre />
      <WaveDivider from="orange" to="bg" />
      <Faq
        id="faq"
        items={faqRejoindre}
        titre="FAQ : rejoindre O'Mégots"
        lede="Adhésion, don, paiement, et ce qu'on peut faire sans venir."
      />
      <WaveDivider from="bg" to="navy" />
    </PageShell>
  );
}
