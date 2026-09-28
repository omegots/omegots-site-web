import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { SvgSprites } from "./SvgSprites";

type Chapitre = { href: string; label: string };

type PageShellProps = {
  title: ReactNode;
  lede?: ReactNode;
  /** Boutons sous le chapeau (liens ou boutons déjà stylés). */
  actions?: ReactNode;
  /** Illustration ou scène animée, à droite du titre sur grand écran. */
  visuel?: ReactNode;
  /** Sommaire de la page : une rangée de chapitres numérotés, avec ancres. */
  sommaire?: Chapitre[];
  children: ReactNode;
};

/** Gabarit des pages intérieures : en-tête, titre de page, sections, pied de page. */
export function PageShell({ title, lede, actions, visuel, sommaire, children }: PageShellProps) {
  const headClass = ["page-head", visuel ? "has-visuel" : "is-center"].filter(Boolean).join(" ");

  return (
    <>
      <SvgSprites />
      <div id="top">
        <Header />
        <main>
          <section className={headClass}>
            <div className="wrap page-head-grid">
              {/* Entrée en CSS (.hero-in, hero.css), sans fondu ni JavaScript : le titre
                  est visible dès le HTML et compte tout de suite pour le LCP. */}
              <div className="page-head-inner hero-in">
                <h1 className="display">{title}</h1>
                {lede && <p className="lede">{lede}</p>}
                {actions && <div className="page-head-actions">{actions}</div>}
              </div>
              {visuel && <div className="page-head-visuel">{visuel}</div>}
            </div>
            {sommaire && sommaire.length > 0 && (
              <nav className="page-sommaire" aria-label="Sommaire de la page">
                <ol className="wrap">
                  {sommaire.map((c, i) => (
                    <li key={c.href}>
                      <a href={c.href}>
                        <span className="page-sommaire-n display" aria-hidden="true">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {c.label}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}
          </section>
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}
