import type { Metadata } from "next";
import { Admin } from "@/components/admin/Admin";
import "@/styles/admin.css";

export const metadata: Metadata = {
  title: "Administration · O'Mégots",
  robots: { index: false, follow: false, nocache: true },
};

/** Interface de mise à jour des sorties, pour les bénévoles de l'association. */
export default function AdminPage() {
  return <Admin />;
}
