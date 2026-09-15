import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Reveal } from "./Reveal";
import { SvgSprites } from "./SvgSprites";

type PageShellProps = {
  title: ReactNode;
  lede?: ReactNode;
  children: ReactNode;
};

/** Gabarit des pages intérieures : en-tête, titre de page, sections, pied de page. */
export function PageShell({ title, lede, children }: PageShellProps) {
  return (
    <>
      <SvgSprites />
      <div id="top">
        <Header />
        <main>
          <section className="page-head">
            <div className="wrap">
              <Reveal direction="rise" className="page-head-inner">
                <h1 className="display">{title}</h1>
                {lede && <p className="lede">{lede}</p>}
              </Reveal>
            </div>
          </section>
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}
