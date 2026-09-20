"use client";

import { MagneticButton } from "../motion/MagneticButton";
import { useHoverCapable } from "./useHoverCapable";

/** Boutons du hero : attraction magnétique seulement quand un survol est possible. */
export function HeroCta() {
  const hover = useHoverCapable();

  const arrow = (
    <span className="btn-arrow" aria-hidden="true">
      ↓
    </span>
  );

  if (!hover) {
    return (
      <>
        <a className="btn btn-lg" href="/rejoindre">
          Venir ramasser
        </a>
        <a className="btn btn-lg ghost" href="#pourquoi">
          Pourquoi ça compte
          {arrow}
        </a>
      </>
    );
  }

  return (
    <>
      <MagneticButton className="btn btn-lg" href="/rejoindre">
        Venir ramasser
      </MagneticButton>
      <MagneticButton className="btn btn-lg ghost" href="#pourquoi">
        Pourquoi ça compte
        {arrow}
      </MagneticButton>
    </>
  );
}
