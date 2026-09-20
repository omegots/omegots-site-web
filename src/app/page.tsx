import { Chiffres } from "@/components/Chiffres";
import { Devenir } from "@/components/Devenir";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { MareeSection } from "@/components/MareeSection";
import { Megothon } from "@/components/Megothon";
import { Mission } from "@/components/Mission";
import { Presse } from "@/components/Presse";
import { Rejoindre } from "@/components/Rejoindre";
import { SvgSprites } from "@/components/SvgSprites";
import { Temoignages } from "@/components/Temoignages";
import { WaveDivider } from "@/components/WaveDivider";
import { faq } from "@/data/faq";

/** Balisage FAQPage (schema.org) : les mêmes questions et réponses que la section. */
const faqJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.reponse },
  })),
}).replace(/</g, "\\u003c");

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
          <Rejoindre />
          <WaveDivider from="orange" to="bg" />
          <Faq />
          <WaveDivider from="bg" to="navy" />
        </main>
        <Footer />
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd }} />
    </>
  );
}
