import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Reveal } from "./Reveal";
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
  return (
    <>
      <SvgSprites />
      <div id="top">
        <Header />
        <main>
          <section className={`page-head${visuel ? " has-visuel" : ""}`}>
            <div className="wrap page-head-grid">
              <Reveal direction="rise" className="page-head-inner">
                <h1 className="display">{title}</h1>
                {lede && <p className="lede">{lede}</p>}
                {actions && <div className="page-head-actions">{actions}</div>}
              </Reveal>
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
