import type { Metadata } from "next";
import { Devenir } from "@/components/Devenir";
import { PageShell } from "@/components/PageShell";
import { WaveDivider } from "@/components/WaveDivider";

export const metadata: Metadata = {
  title: "Le recyclage des mégots · O'Mégots",
  description:
    "Que deviennent les mégots ramassés ? Collecte, tri, dépollution, matière régénérée : la filière de recyclage des mégots et l'ambition d'O'Mégots.",
};

export default function RecyclagePage() {
  return (
    <PageShell
      title="Le recyclage des mégots."
      lede="Ramasser c'est bien, recycler c'est mieux. Comment un mégot ramassé peut devenir autre chose qu'un déchet, et ce que l'association vise."
    >
      <WaveDivider from="bg" to="card" />
      <Devenir />
      <WaveDivider from="card" to="bg" />
      <section className="page-note">
        <div className="wrap">
          <p className="lede">
            À venir sur cette page : les étapes de la filière, les acteurs du
            recyclage des mégots en France, et l&apos;état des discussions de
            l&apos;association avec eux.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
