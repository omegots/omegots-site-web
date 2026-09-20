import type { Metadata, Viewport } from "next";
import { Poppins, Unbounded } from "next/font/google";
import { NOINDEX, SITE_URL } from "@/data/site";
import "./globals.css";
import "../styles/hero.css";
import "../styles/megothon.css";
import "../styles/chrome.css";
import "../styles/cta-devenir-presse.css";
import "../styles/chiffres-mission.css";
import "../styles/maree.css";
import "../styles/faq.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-poppins",
  display: "swap",
});

const unbounded = Unbounded({
  subsets: ["latin"],
  // Une seule graisse : instance statique de 22 Ko au lieu de la police variable
  // (51 Ko) que Google renvoie dès que deux graisses sont demandées.
  weight: ["800"],
  variable: "--font-unbounded",
  display: "swap",
});

export const metadata: Metadata = {
  title: "O'Mégots · Ramassage et valorisation des mégots à Saint-Nazaire",
  description:
    "O'Mégots, association citoyenne de Saint-Nazaire : on ramasse les mégots, on les mesure, on publie les chiffres. Rejoignez un ramassage.",
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  // Démo (SITE_NOINDEX=1) : aucune indexation, le vrai site reste omegots.fr.
  robots: NOINDEX ? { index: false, follow: false } : undefined,
  openGraph: {
    title: "O'Mégots · Saint-Nazaire",
    description:
      "Un territoire sans mégots, c'est possible. À Saint-Nazaire, on les ramasse, on les compte, et on publie les chiffres.",
    images: ["/reseaux/og-partage-1200x630.png"],
    type: "website",
    locale: "fr_FR",
  },
  icons: {
    icon: [
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/favicon/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#F5EFE0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${poppins.variable} ${unbounded.variable}`}>
      <body>{children}</body>
    </html>
  );
}
