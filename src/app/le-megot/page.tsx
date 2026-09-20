import type { Metadata } from "next";
import { Chiffres } from "@/components/Chiffres";
import { PageShell } from "@/components/PageShell";
import { WaveDivider } from "@/components/WaveDivider";

export const metadata: Metadata = {
  alternates: { canonical: "/le-megot" },
  title: "Le mégot, un déchet toxique · O'Mégots",
  description:
    "De quoi est fait un mégot, ce qu'il libère dans l'eau, combien de temps il met à disparaître et pourquoi c'est le déchet le plus ramassé sur les plages.",
};

export default function LeMegotPage() {
  return (
    <PageShell
      title="Le mégot, un déchet toxique."
      lede="Petit, banal, partout. Un mégot jeté par terre n'est pas une poussière : c'est un filtre en plastique chargé de substances toxiques, qui finit dans l'eau."
    >
      <WaveDivider from="bg" to="navy" />
      <Chiffres />
      <WaveDivider from="navy" to="bg" />
      <section className="page-note">
        <div className="wrap">
          <p className="lede">
            Cette page sera complétée avec des faits sourcés : la composition
            du mégot, son parcours du trottoir à l&apos;estuaire, ce que dit la
            loi, et une foire aux questions.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
