import type { Metadata } from "next";
import { Megothon } from "@/components/Megothon";
import { PageShell } from "@/components/PageShell";
import { WaveDivider } from "@/components/WaveDivider";

export const metadata: Metadata = {
  title: "Nos ramassages de mégots à Saint-Nazaire · O'Mégots",
  description:
    "Les sorties de ramassage de mégots d'O'Mégots à Saint-Nazaire et ses alentours : bilans chiffrés, photos, prochaine date, comment participer.",
};

export default function RamassagesPage() {
  return (
    <PageShell
      title="Nos ramassages."
      lede="Des sorties gratuites, ouvertes à toutes et tous, dans les rues, les parcs et sur les plages de Saint-Nazaire et ses alentours. On ramasse, on mesure, on publie."
    >
      <WaveDivider from="bg" to="card" />
      <Megothon />
      <WaveDivider from="card" to="bg" />
      <section className="page-note">
        <div className="wrap">
          <p className="lede">
            À venir sur cette page : le calendrier des prochaines sorties, le
            bilan de chaque ramassage, les lieux d&apos;action et le
            déroulé d&apos;une sortie (matériel fourni, durée, sécurité).
          </p>
        </div>
      </section>
    </PageShell>
  );
}
