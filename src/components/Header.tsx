"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { useMediaQuery } from "./motion/useMediaQuery";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/le-megot", label: "Le mégot" },
  { href: "/ramassages", label: "Ramassages" },
  { href: "/recyclage", label: "Recyclage" },
  { href: "/association", label: "L'association" },
];

const EMAIL = "association.o.megots@gmail.com";

const ease = [0.22, 1, 0.36, 1] as const;

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055, delayChildren: 0.06 } },
  exit: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.34, ease } },
  exit: { opacity: 0, y: 6, transition: { duration: 0.14 } },
};

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();
  const mobile = useMediaQuery("(max-width: 900px)");
  const pathname = usePathname();

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Verrou de défilement sur <html> : posé sur <body>, il ferait de body le
     conteneur de défilement et l'en-tête collant partirait avec la page. */
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  /* Fermer le menu si on repasse en desktop. */
  useEffect(() => {
    if (!mobile && open) setOpen(false);
  }, [mobile, open]);

  const inkTransition = reduce
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 200, damping: 26, mass: 0.6 };

  const showList = !mobile || open;

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}${open ? " is-nav-open" : ""}`}>
      <div className="wrap nav">
        <Link
          href="/#top"
          prefetch={false}
          className="nav-brand"
          aria-label="Accueil O'Mégots"
          onClick={() => setOpen(false)}
        >
          <Logo />
        </Link>

        <button
          type="button"
          className={`nav-toggle${open ? " is-open" : ""}`}
          aria-expanded={open}
          aria-controls="nav-menu"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <nav id="nav-menu" className={`nav-menu${open ? " is-open" : ""}`}>
        <div className="nav-menu-panel">
          <LayoutGroup id="nav">
            <AnimatePresence initial={false}>
              {showList && (
                <motion.ul
                  key="list"
                  className="nav-menu-list"
                  variants={reduce || !mobile ? undefined : listVariants}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                >
                  {links.map((l, i) => {
                    const isActive =
                      pathname === l.href ||
                      (l.href !== "/" && pathname.startsWith(`${l.href}/`));
                    return (
                      <motion.li
                        key={l.href}
                        variants={reduce || !mobile ? undefined : itemVariants}
                      >
                        <Link
                          href={l.href}
                          prefetch={false}
                          className={isActive ? "is-active" : undefined}
                          aria-current={isActive ? "page" : undefined}
                          onClick={() => setOpen(false)}
                        >
                          <span className="nav-menu-index" aria-hidden="true">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="nav-menu-label">
                            {l.label}
                            {isActive && (
                              <motion.span
                                className="nav-ink"
                                layoutId="nav-ink"
                                transition={inkTransition}
                                aria-hidden="true"
                              />
                            )}
                          </span>
                        </Link>
                      </motion.li>
                    );
                  })}
                  <motion.li
                    className="nav-menu-cta"
                    variants={reduce || !mobile ? undefined : itemVariants}
                  >
                    <Link
                      href="/rejoindre"
                      prefetch={false}
                      className="btn"
                      onClick={() => setOpen(false)}
                    >
                      Nous rejoindre
                    </Link>
                  </motion.li>
                </motion.ul>
              )}
            </AnimatePresence>
          </LayoutGroup>

          <div className="nav-menu-foot">
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <p>Besné, Loire-Atlantique</p>
          </div>
        </div>
      </nav>

      <motion.div
        className="header-progress"
        style={{ scaleX: reduce ? scrollYProgress : progress }}
        aria-hidden="true"
      />
    </header>
  );
}
