import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { WaveDivider } from "@/components/WaveDivider";

export const metadata: Metadata = {
  title: "Page introuvable · O'Mégots",
};

const chemins = [
  {
    href: "/le-megot",
    titre: "Le mégot",
    texte: "Ce qu'il contient, ce qu'il pollue, et pourquoi le ramasser compte.",
  },
  {
    href: "/ramassages",
    titre: "Nos ramassages",
    texte: "La prochaine sortie, le déroulé et le bilan chiffré de chaque ramassage.",
  },
  {
    href: "/recyclage",
    titre: "Le recyclage",
    texte: "Ce que deviennent les mégots ramassés, et les limites de la filière.",
  },
  {
    href: "/rejoindre",
    titre: "Nous rejoindre",
    texte: "Venir ramasser, adhérer pour 1 € ou aider autrement.",
  },
];

/**
 * Page 404 : toute adresse inconnue arrive ici, avec l'en-tête, le menu et le
 * pied de page du site, et quatre chemins pour repartir.
 */
export default function NotFound() {
  return (
    <PageShell
      title="Page introuvable."
      lede="Elle a peut-être changé d'adresse, ou une lettre s'est glissée de travers dans le lien. Voici les chemins qui marchent."
      actions={
        <>
          <Link className="btn btn-lg" href="/">
            Retour à l&apos;accueil
          </Link>
          <Link className="btn btn-lg ghost" href="/ramassages#prochaine">
            Voir la prochaine sortie
          </Link>
        </>
      }
    >
      <section className="page-section" aria-label="Les pages du site">
        <div className="wrap">
          <ul className="voies-grid introuvable-chemins">
            {chemins.map((c, i) => (
              <li key={c.href}>
                <Link className="voie-card" href={c.href}>
                  <span className="voie-n" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2>{c.titre}</h2>
                  <p>{c.texte}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <WaveDivider from="bg" to="navy" />
    </PageShell>
  );
}
