import { pageMetadata } from "@/data/seo";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SvgSprites } from "@/components/SvgSprites";
import { Maree, MAREE_DUREE_S } from "@/components/jeu/Maree";
import { LITRES_EAU_PAR_MEGOT } from "@/data/ramassages";

export const metadata = pageMetadata({
  path: "/jeu",
  title: "Mini-jeu : ramassez avant la marée · O'Mégots",
  description:
    "La marée monte, les mégots au sol vont finir dans l'eau. Touchez-les avant la vague : chaque mégot sauvé, c'est jusqu'à 500 litres d'eau épargnés.",
});

export default function JeuPage() {
  return (
    <>
      <SvgSprites />
      <div id="top">
        <Header />
        <main className="jeu-page">
          <div className="wrap">
            <header className="jeu-head">
              <h1 className="display">Mini-jeu : ramassez avant la marée.</h1>
              <p className="lede">
                Un mégot par terre finit dans l&apos;eau. La marée recouvre le
                sable en {MAREE_DUREE_S} secondes : touchez les mégots avant la
                vague. Chaque mégot sauvé, c&apos;est jusqu&apos;à{" "}
                {LITRES_EAU_PAR_MEGOT.toLocaleString("fr-FR")} litres
                d&apos;eau épargnés.
              </p>
            </header>
            <Maree />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
