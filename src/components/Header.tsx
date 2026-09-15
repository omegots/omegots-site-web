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


const ease = [0.22, 1, 0.36, 1] as const;

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } },
  exit: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: -10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.32, ease } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.14 } },
};

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();
  const mobile = useMediaQuery("(max-width: 760px)");
  const pathname = usePathname();

  /* Le tablier : ligne vert d'eau qui se remplit avec le défilement. */
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

  const inkTransition = reduce
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 200, damping: 26, mass: 0.6 };

  /* Sur mobile la liste n'existe que menu ouvert : les liens tombent en cascade. */
  const showList = !mobile || open;

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="wrap nav">
        <Link href="/#top" className="nav-brand" aria-label="Accueil O'Mégots">
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

        <nav id="nav-menu" className={`nav-menu${open ? " is-open" : ""}`}>
          <LayoutGroup id="nav">
            <AnimatePresence initial={false}>
              {showList && (
                <motion.ul
                  key="list"
                  variants={reduce || !mobile ? undefined : listVariants}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                >
                  {links.map((l) => {
                    const isActive =
                      pathname === l.href || (l.href !== "/" && pathname.startsWith(`${l.href}/`));
                    return (
                      <motion.li key={l.href} variants={reduce || !mobile ? undefined : itemVariants}>
                        <Link
                          href={l.href}
                          className={isActive ? "is-active" : undefined}
                          aria-current={isActive ? "page" : undefined}
                          onClick={() => setOpen(false)}
                        >
                          {l.label}
                          {isActive && (
                            <motion.span
                              className="nav-ink"
                              layoutId="nav-ink"
                              transition={inkTransition}
                              aria-hidden="true"
                            />
                          )}
                        </Link>
                      </motion.li>
                    );
                  })}
                  <motion.li variants={reduce || !mobile ? undefined : itemVariants}>
                    <Link href="/rejoindre" className="btn" onClick={() => setOpen(false)}>
                      Nous rejoindre
                    </Link>
                  </motion.li>
                </motion.ul>
              )}
            </AnimatePresence>
          </LayoutGroup>
        </nav>
      </div>

      <motion.div
        className="header-progress"
        style={{ scaleX: reduce ? scrollYProgress : progress }}
        aria-hidden="true"
      />
    </header>
  );
}
