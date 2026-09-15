import { Chiffres } from "@/components/Chiffres";
import { Devenir } from "@/components/Devenir";
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
          <WaveDivider from="bg" to="card" />
          <Megothon />
          <WaveDivider from="card" to="bg" />
          <MareeSection />
          <WaveDivider from="bg" to="vert" />
          <Temoignages />
          <WaveDivider from="vert" to="bg" />
          <Presse />
          <WaveDivider from="bg" to="card" />
          <Devenir />
          <WaveDivider from="card" to="orange" />
          <Rejoindre />
          <WaveDivider from="orange" to="navy" />
        </main>
        <Footer />
      </div>
    </>
  );
}
