import dynamic from "next/dynamic";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { SvgSprites } from "@/components/SvgSprites";
import { WaveDivider } from "@/components/WaveDivider";
import { faq } from "@/data/faq";
import { articlesPresse } from "@/data/presse";
import { SITE_URL } from "@/data/site";

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

/** Fiche de l'association (schema.org NGO) : uniquement des faits publiés (mentions légales, presse). */
const ngoJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "NGO",
  name: "O'Mégots",
  url: SITE_URL,
  logo: `${SITE_URL}/favicon/favicon-512.png`,
  email: "association.o.megots@gmail.com",
  description:
    "Association citoyenne loi 1901 : ramassage et comptage des mégots à Saint-Nazaire et ses alentours, chiffres publiés, sensibilisation sans jugement.",
  address: { "@type": "PostalAddress", addressLocality: "Besné", postalCode: "44160", addressCountry: "FR" },
  areaServed: { "@type": "City", name: "Saint-Nazaire" },
  identifier: [
    { "@type": "PropertyValue", propertyID: "RNA", value: "W443012511" },
    { "@type": "PropertyValue", propertyID: "SIRET", value: "10448840800014" },
  ],
  subjectOf: articlesPresse.map((a) => ({
    "@type": "NewsArticle",
    headline: a.title,
    url: a.href,
    publisher: { "@type": "Organization", name: a.media },
  })),
}).replace(/</g, "\u003c");

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
          <Faq
            items={faq}
            titre="FAQ : avant de venir ramasser"
            lede="Ce qu'on nous demande le plus souvent. Il manque la vôtre ? Écrivez-nous, on répond à tout le monde."
          />
          <WaveDivider from="bg" to="navy" />
        </main>
        <Footer />
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ngoJsonLd }} />
    </>
  );
}
