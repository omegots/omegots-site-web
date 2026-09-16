"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { FondMarin } from "./footer/FondMarin";

const nav = [
  { href: "/", label: "Accueil" },
  { href: "/le-megot", label: "Le mégot" },
  { href: "/ramassages", label: "Nos ramassages" },
  { href: "/recyclage", label: "Le recyclage" },
  { href: "/association", label: "L'association" },
];

/**
 * Bouton rond « Haut de page » portant le pont réduit à 20 px : tablier et
 * deux mâts sur l'eau (réduction prévue par la charte). Au repos, seul le
 * tronçon central du tablier est tracé ; au survol, il se déploie des deux côtés.
 */
function TopLink() {
  const reduce = useReducedMotion();
  const deck = reduce
    ? { rest: { pathLength: 1, pathOffset: 0 }, hover: { pathLength: 1, pathOffset: 0 } }
    : { rest: { pathLength: 0.35, pathOffset: 0.325 }, hover: { pathLength: 1, pathOffset: 0 } };

  return (
    <motion.a
      href="#top"
      className="foot-top"
      aria-label="Haut de page"
      title="Haut de page"
      initial="rest"
      animate="rest"
      whileHover="hover"
      whileFocus="hover"
    >
      <svg viewBox="-40 -26 80 48" width="20" height="24" aria-hidden="true">
        <g fill="currentColor" stroke="currentColor" strokeLinecap="round">
          {/* Mâts : deux tiers au-dessus du tablier, comme dans la marque. */}
          <rect x="-15" y="-24" width="6" height="34" rx="3" stroke="none" />
          <rect x="9" y="-24" width="6" height="34" rx="3" stroke="none" />
          <motion.path
            d="M-38,8 C-30,7 -22,5 -12,1 C-6,-1.5 6,-1.5 12,1 C22,5 30,7 38,8"
            fill="none"
            strokeWidth="5"
            variants={deck}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          />
          <path
            d="M-36,16 q9,-6 18,0 t18,0 t18,0 t18,0"
            fill="none"
            strokeWidth="3"
            opacity="0.7"
          />
        </g>
      </svg>
    </motion.a>
  );
}

export function Footer() {
  return (
    <footer className="foot">
      <div className="wrap foot-grid">
        <div className="foot-brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo/omegots-logo-vertical-blanc.svg"
            alt="O'Mégots, Saint-Nazaire"
            className="foot-logo"
            width={160}
            height={138}
          />
          <p>
            Association citoyenne loi 1901, engagée dans le ramassage et la
            valorisation des mégots à Saint-Nazaire et ses alentours.
          </p>
          <Link href="/mentions-legales" className="foot-mentions">
            Mentions légales
          </Link>
        </div>

        <nav className="foot-nav" aria-label="Plan du site">
          <p className="foot-label">Le site</p>
          <ul>
            {nav.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="foot-contact">
          <p className="foot-label">Contact</p>
          <ul>
            <li>
              <Link href="/rejoindre">Nous rejoindre</Link>
            </li>
            <li>
              <a href="mailto:association.o.megots@gmail.com">
                association.o.megots@gmail.com
              </a>
            </li>
            <li>Besné, Loire-Atlantique</li>
          </ul>
        </div>
      </div>

      <FondMarin>
        <TopLink />
        <div className="wrap foot-legal">
          <p>© 2026 O&apos;Mégots</p>
          <a href="https://ghis.fr" className="foot-ghis">
            <span>Site réalisé par</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo/ghis-blanc.png" alt="GHIS" width={110} height={40} />
          </a>
        </div>
      </FondMarin>
    </footer>
  );
}
