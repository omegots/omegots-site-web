import { pageMetadata } from "@/data/seo";
import Link from "next/link";
import { FormContact } from "@/components/association/FormContact";
import { Faq } from "@/components/Faq";
import { PageShell } from "@/components/PageShell";
import { Rejoindre } from "@/components/Rejoindre";
import { Reveal } from "@/components/Reveal";
import { WaveDivider } from "@/components/WaveDivider";
import { identite } from "@/data/association";
import { implique, PAYASSO_ADHESION, PAYASSO_DON } from "@/data/rejoindre";
import type { FaqItem } from "@/data/faq";
import "@/styles/megot.css";
import "@/styles/association.css";
import "@/styles/rejoindre.css";

export const metadata = pageMetadata({
  path: "/contact",
  title: "Contacter O'Mégots · Association à Saint-Nazaire",
  description:
    "Écrire à O'Mégots, adhérer pour 1 euro ou faire un don. Association citoyenne à Saint-Nazaire, réponse en moins de trois jours ouvrés.",
});

const faqContact: FaqItem[] = [
  {
    question: "En combien de temps répondez-vous ?",
    reponse: `Nous nous engageons à vous répondre en ${identite.delai}.`,
  },
  {
    question: "Faut-il adhérer pour venir ramasser ?",
    reponse:
      "Non. Participer aux ramassages est entièrement gratuit. L'adhésion à 1 € est symbolique et volontaire : elle permet de devenir membre officiel et de voter en assemblée générale.",
    lien: { href: "#adherer", label: "Adhérer" },
  },
  {
    question: "Comment se passe le paiement de l'adhésion ou d'un don ?",
    reponse:
      "Par Crédit Mutuel Pay Asso, une solution sécurisée dédiée aux associations. Vos informations servent uniquement à la gestion de l'association, conformément au RGPD.",
    lien: { href: PAYASSO_ADHESION, label: "Ouvrir Pay Asso" },
  },
];

export default function ContactPage() {
  return (
    <PageShell
      title={
        <>
          Une question, une idée, envie de rejoindre&nbsp;?
        </>
      }
      lede="Écrivez-nous, adhérez pour 1 €, ou faites un don. On répond rapidement."
      actions={
        <>
          <a className="btn btn-lg" href="#ecrire">
            Nous écrire
          </a>
          <a className="btn btn-lg ghost" href="#adherer">
            Adhérer pour 1 €
            <span className="btn-arrow" aria-hidden="true">
              ↓
            </span>
          </a>
        </>
      }
      sommaire={[
        { href: "#ecrire", label: "Nous écrire" },
        { href: "#adherer", label: "Adhérer" },
        { href: "#don", label: "Faire un don" },
      ]}
    >
      {/* 1. Formulaire */}
      <section className="megot-section" id="ecrire" aria-labelledby="ecrire-titre">
        <div className="wrap">
          <Reveal direction="rise" className="section-head is-center">
            <h2 id="ecrire-titre" className="display">
              Nous écrire
            </h2>
            <p className="lede">
              Suggestions, lieu à nettoyer, partenariat, presse : on vous répond en {identite.delai}.
            </p>
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

      <WaveDivider from="bg" to="vert" />

      {/* 2. Adhérer */}
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
              <p>
                Envie de venir sur le terrain&nbsp;?{" "}
                <Link href="/rejoindre">Voir comment rejoindre un ramassage</Link>.
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

      {/* 3. Faire un don */}
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

      <WaveDivider from="bg" to="orange" />
      <Rejoindre />
      <WaveDivider from="orange" to="bg" />
      <Faq
        id="faq"
        items={faqContact}
        titre="FAQ : contact et adhésion"
        lede="Délai de réponse, adhésion, paiement."
      />
      <WaveDivider from="bg" to="navy" />
    </PageShell>
  );
}
