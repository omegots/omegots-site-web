import dynamic from "next/dynamic";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { SvgSprites } from "@/components/SvgSprites";
import { WaveDivider } from "@/components/WaveDivider";
import { faq } from "@/data/faq";
import { pageMetadata } from "@/data/seo";

export const metadata = pageMetadata({
  path: "/",
  title: "O'Mégots · Ramassage citoyen de mégots à Saint-Nazaire",
  description:
    "O'Mégots, association citoyenne de Saint-Nazaire : on ramasse les mégots, on les mesure, on publie les chiffres. Rejoignez un ramassage.",
  ogTitle: "Un territoire sans mégots, c'est possible · O'Mégots Saint-Nazaire",
});

/** Sections sous le hero : chunks JS séparés, hors du chemin critique mobile. */
const Chiffres = dynamic(() =>
  import("@/components/Chiffres").then((m) => ({ default: m.Chiffres })),
);
const Mission = dynamic(() =>
  import("@/components/Mission").then((m) => ({ default: m.Mission })),
);
const Megothon = dynamic(() =>
  import("@/components/Megothon").then((m) => ({ default: m.Megothon })),
);
const MareeSection = dynamic(() =>
  import("@/components/MareeSection").then((m) => ({ default: m.MareeSection })),
);
const Temoignages = dynamic(() =>
  import("@/components/Temoignages").then((m) => ({ default: m.Temoignages })),
);
const Presse = dynamic(() =>
  import("@/components/Presse").then((m) => ({ default: m.Presse })),
);
const Devenir = dynamic(() =>
  import("@/components/Devenir").then((m) => ({ default: m.Devenir })),
);
const Rejoindre = dynamic(() =>
  import("@/components/Rejoindre").then((m) => ({ default: m.Rejoindre })),
);


export default function HomePage() {
  return (
    <>
      <SvgSprites />
      <div id="top">
        <Header />
        <main>
          <Hero />
          <WaveDivider from="vert" to="navy" />
          <Chiffres />
          <WaveDivider from="navy" to="bg" />
          <Mission />
          <WaveDivider from="bg" to="navy" />
          <Megothon />
          <WaveDivider from="navy" to="bg" />
          <MareeSection />
          <WaveDivider from="bg" to="vert" />
          <Temoignages />
          <WaveDivider from="vert" to="bg" />
          <Presse />
          <WaveDivider from="bg" to="navy" />
          <Devenir />
          <WaveDivider from="navy" to="orange" />
          <Rejoindre href="#prochaine" />
          <WaveDivider from="orange" to="bg" />
          <Faq
            items={faq}
            titre="FAQ : avant de venir ramasser"
            lede="Ce qu'on nous demande le plus souvent. Il manque la vôtre ? Écrivez-nous, on répond à tout le monde."
          />
          <WaveDivider from="bg" to="navy" />
        </main>
        <Footer />
      </div>
    </>
  );
}
