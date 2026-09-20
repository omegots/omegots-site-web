import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { WaveDivider } from "@/components/WaveDivider";
import { Anatomie } from "@/components/megot/Anatomie";
import { Bocal } from "@/components/megot/Bocal";
import { ChiffresSources } from "@/components/megot/ChiffresSources";
import { Ref } from "@/components/megot/Ref";
import { Sources } from "@/components/megot/Sources";
import { Temps } from "@/components/megot/Temps";
import { Trajet } from "@/components/megot/Trajet";
import { chiffreCle, formatNombre, libelleEquivalence, quantite } from "@/data/chiffres";
import { fr } from "@/data/format";
import { MEGOTS_PAR_METRE } from "@/data/megot";
import { LITRES_EAU_PAR_MEGOT, ramassages, totals } from "@/data/ramassages";
import "@/styles/megot.css";

export const metadata: Metadata = {
  alternates: { canonical: "/le-megot" },
  title: "Le mégot, un petit déchet, un gros pollueur · O'Mégots",
  description:
    "De quoi est fait un mégot, ce qu'il libère dans l'eau, combien d'années il reste au sol, comment il arrive jusqu'à l'estuaire de la Loire. Des faits sourcés, expliqués simplement.",
};

export default function LeMegotPage() {
  const { megots } = totals();
  const premiere = ramassages[0];
  // À la densité moyenne nationale au sol (1,3 mégot tous les 10 m), les mégots
  // du Mégothon représentent autant de mètres de rue.
  const kmEquivalent = megots / MEGOTS_PAR_METRE / 1000;

  return (
    <PageShell
      title="Un petit déchet, un gros pollueur."
      lede="Un mégot n'est pas un bout de tabac qui se décompose dans un coin. C'est un filtre en plastique imbibé de milliers de substances, qui part avec la pluie jusqu'à l'estuaire. Voici ce qu'on en sait, avec les sources."
    >
      <WaveDivider from="bg" to="navy" />

      {/* 1. Anatomie */}
      <section className="megot-section surface-navy" id="anatomie" aria-labelledby="anat-titre">
        <div className="wrap">
          <Reveal direction="rise" className="section-head">
            <h2 id="anat-titre" className="display">
              De quoi est fait un mégot
            </h2>
            <p className="lede">
              Quatre parties, quatre problèmes différents. Touchez chacune d&apos;elles.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <Anatomie />
          </Reveal>
        </div>
      </section>

      <WaveDivider from="navy" to="bg" />

      {/* 2. Dans l'eau */}
      <section className="megot-section" id="eau" aria-labelledby="eau-titre">
        <div className="wrap">
          <Reveal direction="rise" className="section-head">
            <h2 id="eau-titre" className="display">
              Ce qu&apos;il fait dans un litre d&apos;eau
            </h2>
            <p className="lede">
              Une équipe de l&apos;université de San Diego a mis des mégots dans l&apos;eau de poissons pendant quatre
              jours. Voici ce qu&apos;il en faut pour en tuer la moitié.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <Bocal />
          </Reveal>

          <Reveal className="cinq-cents" delay={0.05}>
            <div>
              <h3 className="megot-h3">Et les 500 litres, alors ?</h3>
              <p>
                « Un mégot pollue jusqu&apos;à {fr(LITRES_EAU_PAR_MEGOT)} litres d&apos;eau » : c&apos;est le chiffre que
                nous reprenons sur nos affiches, et c&apos;est celui du ministère de la Transition écologique quand
                il a créé la filière mégots en 2021.
                <Ref ids={[1]} />
              </p>
              <p>
                Ce n&apos;est pas une mesure de laboratoire, c&apos;est un ordre de grandeur : la quantité d&apos;eau
                dans laquelle les substances d&apos;un seul mégot restent détectables. L&apos;essai du bocal, lui, dit
                autre chose, de plus brutal : un litre suffit pour tuer.
              </p>
            </div>
            <ul className="equiv" aria-label={`${fr(chiffreCle.valeur)} litres, en équivalences`}>
              {chiffreCle.equivalences.map((u) => (
                <li key={u.id}>
                  <b>{formatNombre(quantite(u))}</b>
                  <span>{libelleEquivalence(u).replace(/^[\d,\s]+/, "")}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <WaveDivider from="bg" to="vert" />

      {/* 3. Le temps */}
      <section className="megot-section surface-vert" id="temps" aria-labelledby="temps-titre">
        <div className="wrap">
          <Reveal direction="rise" className="section-head">
            <h2 id="temps-titre" className="display">
              Combien de temps il reste là
            </h2>
            <p className="lede">
              Deux chercheurs ont enterré des filtres dans du compost et dans de la terre, et les ont pesés pendant
              deux ans. Faites glisser le curseur.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <Temps />
          </Reveal>
        </div>
      </section>

      <WaveDivider from="vert" to="bg" />

      {/* 4. Le trajet */}
      <section className="megot-section" id="trajet" aria-labelledby="trajet-titre">
        <div className="wrap">
          <Reveal direction="rise" className="section-head">
            <h2 id="trajet-titre" className="display">
              Du trottoir à l&apos;estuaire
            </h2>
            <p className="lede">
              Un mégot jeté en centre-ville ne reste pas en centre-ville. Il suit l&apos;eau, et à Saint-Nazaire
              l&apos;eau va à la Loire et à l&apos;océan.
            </p>
          </Reveal>
          <Trajet />
        </div>
      </section>

      <WaveDivider from="bg" to="navy" />

      {/* 5. Chiffres sourcés */}
      <section className="megot-section surface-navy" id="chiffres" aria-labelledby="chiffres-titre">
        <div className="wrap">
          <Reveal direction="rise" className="section-head">
            <h2 id="chiffres-titre" className="display">
              L&apos;échelle du problème
            </h2>
            <p className="lede">
              Quatre chiffres, quatre sources : l&apos;État, l&apos;éco-organisme de la filière, et les associations qui
              comptent ce qu&apos;elles ramassent.
            </p>
          </Reveal>
          <ChiffresSources />
        </div>
      </section>

      <WaveDivider from="navy" to="bg" />

      {/* 6. Et à Saint-Nazaire */}
      <section className="megot-section" id="saint-nazaire" aria-labelledby="local-titre">
        <div className="wrap">
          <Reveal direction="rise" className="section-head">
            <h2 id="local-titre" className="display">
              Et à Saint-Nazaire ?
            </h2>
          </Reveal>
          <Reveal className="megot-local" delay={0.1}>
            <div>
              <p className="megot-local-chiffre">
                {formatNombre(kmEquivalent)} km
                <small>
                  de rue, c&apos;est ce que représentent les {fr(megots)} mégots du Mégothon du {premiere.date}, à la
                  densité moyenne française d&apos;un peu plus d&apos;un mégot tous les dix mètres.
                  <Ref ids={[7]} />
                </small>
              </p>
            </div>
            <div>
              <p>
                Sept bénévoles, deux heures, un parcours de la mairie au Paquebot : {fr(premiere.litres)} litres de
                mégots, comptés et publiés. Ce n&apos;est pas une statistique nationale, c&apos;est ce qu&apos;il y avait
                vraiment par terre, un samedi matin, dans nos rues.
              </p>
              <p>
                La suite se passe dehors : une sortie, une pince, un contenant gradué, et des chiffres de plus sur
                cette page.
              </p>
              <div className="actions">
                <Link href="/ramassages" className="btn btn-lg">
                  Voir nos ramassages
                </Link>
                <Link href="/rejoindre" className="btn btn-lg ghost">
                  Venir ramasser
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 7. Sources */}
      <section className="megot-section" id="sources" aria-labelledby="sources-titre" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal direction="rise" className="section-head">
            <h2 id="sources-titre" className="display">
              Sources
            </h2>
            <p className="lede">
              Les chiffres de cette page renvoient aux documents ci-dessous. Nous préférons un chiffre juste à un
              chiffre qui frappe.
            </p>
          </Reveal>
          <Sources />
        </div>
      </section>

      <WaveDivider from="bg" to="navy" />
    </PageShell>
  );
}
