import type { Metadata } from "next";
import Link from "next/link";
import { FormContact } from "@/components/association/FormContact";
import { HeroAssociation } from "@/components/association/HeroAssociation";
import { Valeurs } from "@/components/association/Valeurs";
import { Faq } from "@/components/Faq";
import { PageShell } from "@/components/PageShell";
import { Presse } from "@/components/Presse";
import { Rejoindre } from "@/components/Rejoindre";
import { Reveal } from "@/components/Reveal";
import { Temoignages } from "@/components/Temoignages";
import { WaveDivider } from "@/components/WaveDivider";
import { actions, faqAssociation, identite } from "@/data/association";
import "@/styles/megot.css";
import "@/styles/association.css";

export const metadata: Metadata = {
  alternates: { canonical: "/association" },
  title: "L'association O'Mégots · Saint-Nazaire",
  description:
    "O'Mégots, association citoyenne loi 1901 née à Saint-Nazaire en 2026 : notre mission, ce qui nous guide, la fiche d'identité, la presse et le formulaire de contact.",
};

export default function AssociationPage() {
  return (
    <PageShell
      title={
        <>
          Une association citoyenne, née à <span className="accent-orange">Saint-Nazaire.</span>
        </>
      }
      lede="Déterminée à agir pour les espaces naturels, urbains et littoraux. Un premier Mégothon en mai 2026, et une conviction : notre territoire mérite d'être propre."
      actions={
        <>
          <a className="btn btn-lg" href="#contact">
            Nous écrire
          </a>
          <Link className="btn btn-lg ghost" href="/rejoindre">
            Venir ramasser
          </Link>
        </>
      }
      visuel={<HeroAssociation />}
      sommaire={[
        { href: "#mission", label: "Notre mission" },
        { href: "#valeurs", label: "Ce qui nous guide" },
        { href: "#temoignages", label: "Paroles de bénévoles" },
        { href: "#presse", label: "Ils parlent de nous" },
        { href: "#identite", label: "Fiche d'identité" },
        { href: "#contact", label: "Contact" },
      ]}
    >
      <WaveDivider from="bg" to="navy" />

      {/* 1. Notre mission */}
      <section className="megot-section surface-navy" id="mission" aria-labelledby="mission-titre">
        <div className="wrap">
          <Reveal direction="rise" className="section-head is-center">
            <h2 id="mission-titre" className="display">
              Notre mission
            </h2>
            <p className="lede">
              Notre association agit partout où les mégots s&apos;accumulent : rues, parcs, bords de route, espaces
              naturels.
            </p>
          </Reveal>
          <Reveal className="mission-actions" delay={0.1}>
            {actions.map((a) => (
              <article key={a.id} className="mission-action">
                <h3>{a.titre}</h3>
                <p>{a.texte}</p>
                <Link href={a.lien.href}>{a.lien.label}</Link>
              </article>
            ))}
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mission-devise">Notre territoire mérite d&apos;être propre.</p>
          </Reveal>
        </div>
      </section>

      <WaveDivider from="navy" to="bg" />

      {/* 2. Ce qui nous guide */}
      <section className="megot-section" id="valeurs" aria-labelledby="valeurs-titre">
        <div className="wrap">
          <Reveal direction="rise" className="section-head">
            <h2 id="valeurs-titre" className="display">
              Ce qui nous guide
            </h2>
            <p className="lede">Six principes, écrits par l&apos;association elle-même, et tenus à chaque sortie.</p>
          </Reveal>
          <Valeurs />
        </div>
      </section>

      <WaveDivider from="bg" to="vert" />

      {/* 3. Paroles de bénévoles (section de l'accueil) */}
      <Temoignages />

      <WaveDivider from="vert" to="bg" />

      {/* 4. Ils parlent de nous (section de l'accueil) */}
      <Presse />

      <WaveDivider from="bg" to="navy" />

      {/* 5. Fiche d'identité */}
      <section className="megot-section surface-navy" id="identite" aria-labelledby="identite-titre">
        <div className="wrap">
          <Reveal direction="rise" className="section-head is-right">
            <h2 id="identite-titre" className="display">
              Fiche d&apos;identité
            </h2>
            <p className="lede">Une association déclarée, avec un siège, un président et des comptes à rendre.</p>
          </Reveal>
          <Reveal className="identite" delay={0.1}>
            <div className="identite-texte">
              <p>
                O&apos;Mégots est née en {identite.naissance} à Saint-Nazaire et est présidée par {identite.president}. Elle est déclarée en préfecture comme association loi 1901, à but non lucratif,
                et son siège est à Besné, en Loire-Atlantique.
              </p>
              <p>
                L&apos;association se construit maintenant. Participer aux ramassages est gratuit ; l&apos;adhésion,
                symbolique, permet de devenir membre et de voter en assemblée générale, et couvre l&apos;assurance, le
                matériel de collecte et la communication.
              </p>
            </div>
            <div className="identite-carte">
              <dl>
                <dt>Nom</dt>
                <dd>{identite.nom}</dd>
                <dt>Forme</dt>
                <dd>{identite.forme}</dd>
                <dt>RNA</dt>
                <dd>{identite.rna}</dd>
                <dt>SIRET</dt>
                <dd>{identite.siret}</dd>
                <dt>Siège</dt>
                <dd>{identite.siege}</dd>
                <dt>Territoire</dt>
                <dd>{identite.territoire}</dd>
                <dt>Président</dt>
                <dd>{identite.president}</dd>
                <dt>E-mail</dt>
                <dd>
                  <a href={`mailto:${identite.email}`}>{identite.email}</a>
                </dd>
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      <WaveDivider from="navy" to="bg" />

      {/* 6. Contact */}
      <section className="megot-section" id="contact" aria-labelledby="contact-titre">
        <div className="wrap">
          <Reveal direction="rise" className="section-head is-center">
            <h2 id="contact-titre" className="display">
              Nous contacter
            </h2>
            <p className="lede">Une question, une idée, envie de rejoindre l&apos;aventure ? On vous répond rapidement.</p>
          </Reveal>
          <Reveal className="contact" delay={0.1}>
            <div className="contact-infos">
              <ul>
                <li>
                  <b>Localisation</b>
                  {identite.territoire}
                </li>
                <li>
                  <b>E-mail</b>
                  <a href={`mailto:${identite.email}`}>{identite.email}</a>
                </li>
                <li>
                  <b>Statut</b>
                  {identite.forme}
                </li>
                <li>
                  <b>Délai de réponse</b>
                  Nous nous engageons à vous répondre en {identite.delai}.
                </li>
              </ul>
            </div>
            <FormContact />
          </Reveal>
        </div>
      </section>

      <WaveDivider from="bg" to="orange" />
      <Rejoindre />
      <WaveDivider from="orange" to="bg" />
      <Faq
        id="faq"
        items={faqAssociation}
        titre="FAQ : l'association en questions"
        lede="Qui nous sommes, où nous agissons, comment nous joindre."
      />
      <WaveDivider from="bg" to="navy" />
    </PageShell>
  );
}
