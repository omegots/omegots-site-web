"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type HTMLMotionProps,
} from "motion/react";
import {
  useRef,
  type AnchorHTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from "react";
import { useMediaQuery } from "./useMediaQuery";

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  strength?: number;
} & Omit<HTMLMotionProps<"a">, "children" | "href">;

/**
 * Lien CTA avec attraction légère au pointeur.
 * L'aimant n'existe que pour un pointeur fin capable de survol (souris, pavé
 * tactile) et hors préférence de mouvement réduit : ailleurs, un simple lien.
 */
export function MagneticButton({
  children,
  className = "btn",
  href = "#",
  strength = 0.28,
  ...rest
}: MagneticButtonProps) {
  const reduce = useReducedMotion();
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 280, damping: 22, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 280, damping: 22, mass: 0.35 });

  if (reduce || !finePointer) {
    // Les gestionnaires Motion (onDrag, onAnimationStart...) n'ont pas la
    // même signature sur un <a> natif : on ne transmet que les attributs HTML.
    const plain = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a href={href} className={className} {...plain}>
        {children}
      </a>
    );
  }

  function onMove(e: MouseEvent<HTMLAnchorElement>) {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    x.set(dx * strength);
    y.set(dy * strength);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      className={className}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.97 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      {...rest}
    >
      {children}
    </motion.a>
  );
}
