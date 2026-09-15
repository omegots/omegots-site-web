import type { Metadata } from "next";
import { Mission } from "@/components/Mission";
import { PageShell } from "@/components/PageShell";
import { Presse } from "@/components/Presse";
import { Temoignages } from "@/components/Temoignages";
import { WaveDivider } from "@/components/WaveDivider";

export const metadata: Metadata = {
  title: "L'association O'Mégots · Saint-Nazaire",
  description:
    "O'Mégots, association citoyenne loi 1901 créée à Saint-Nazaire : notre mission, ce qui nous guide, les bénévoles, la presse et le contact.",
};

export default function AssociationPage() {
  return (
    <PageShell
      title="Une association citoyenne, née à Saint-Nazaire."
      lede="Deux jeunes, un premier Mégothon en mai 2026, et une conviction : un territoire sans mégots, c'est possible. Sans juger personne."
    >
      <Mission />
      <WaveDivider from="bg" to="vert" />
      <Temoignages />
      <WaveDivider from="vert" to="bg" />
      <Presse />
      <section className="page-note">
        <div className="wrap">
          <p className="lede">
            À venir sur cette page : l&apos;histoire de l&apos;association, le
            bureau, les statuts, les réseaux sociaux et le formulaire de
            contact.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
