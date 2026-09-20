import type { Metadata } from "next";
import { FormPrevenir } from "@/components/FormPrevenir";
import { PageShell } from "@/components/PageShell";
import { Reseaux } from "@/components/Reseaux";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { WaveDivider } from "@/components/WaveDivider";
import { Rejoindre } from "@/components/Rejoindre";

export const metadata: Metadata = {
  title: "Nous rejoindre · O'Mégots",
  description:
    "Venir ramasser, adhérer pour 1 €, faire un don, proposer un partenariat : toutes les façons de rejoindre O'Mégots à Saint-Nazaire.",
};

const EMAIL = "association.o.megots@gmail.com";

const voies = [
  {
    title: "Venir ramasser",
    text: "Gratuit et ouvert à toutes et tous, à tous les âges. Des gants, une bouteille vide, et c'est parti. Laissez votre e-mail pour être prévenu·e de la prochaine date.",
  },
  {
    title: "Adhérer pour 1 €",
    text: "Une adhésion symbolique et volontaire pour devenir membre officiel et voter en assemblée générale. Les cotisations couvrent l'assurance, le matériel et la communication.",
  },
  {
    title: "Faire un don",
    text: "Chaque don finance le matériel de collecte, l'assurance et les actions sur le terrain.",
  },
  {
    title: "Proposer un partenariat",
    text: "Entreprises, écoles, collectivités, autres associations : on agit sur le territoire, avec les acteurs locaux.",
  },
];

export default function RejoindrePage() {
  return (
    <PageShell
      title="L'association se construit maintenant."
      lede="C'est le bon moment pour en faire partie dès le début. Quatre façons d'aider, de la plus simple à la plus engagée."
    >
      <section className="page-section">
        <div className="wrap">
          <Stagger className="voies-grid" stagger={0.08}>
            {voies.map((v, i) => (
              <StaggerItem key={v.title}>
                <article className="voie-card">
                  <span className="voie-n" aria-hidden="true">
                    0{i + 1}
                  </span>
                  <h2>{v.title}</h2>
                  <p>{v.text}</p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal className="voie-form" id="prochaine">
            <h2 className="display">Le prochain ramassage arrive.</h2>
            <p className="lede">
              Date à fixer. Laissez votre adresse, on vous écrit dès
              que la date est fixée. Rien d&apos;autre, promis.
            </p>
            <FormPrevenir />
            <p className="voie-contact">
              Une question, un lieu à signaler, un partenariat ?{" "}
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </p>
          </Reveal>

          <Reveal className="voie-reseaux" delay={0.1}>
            <h2 className="display">On se retrouve aussi ici.</h2>
            <p className="lede">
              Les photos, les dates et les annonces passent d&apos;abord par
              nos réseaux.
            </p>
            <Reseaux variant="cartes" />
          </Reveal>
        </div>
      </section>
      <WaveDivider from="bg" to="orange" />
      <Rejoindre />
      <WaveDivider from="orange" to="navy" />
    </PageShell>
  );
}
