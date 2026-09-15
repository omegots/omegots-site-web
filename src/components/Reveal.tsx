"use client";

import {
  motion,
  useInView,
  useReducedMotion,
  type HTMLMotionProps,
} from "motion/react";
import { useRef, type ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

type Direction = "up" | "down" | "left" | "right" | "rise" | "none";

const offsets: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 40 },
  down: { y: -28 },
  left: { x: -48 },
  right: { x: 48 },
  rise: { y: 24 },
  none: {},
};

/* « Sortie de l'eau » : l'élément émerge d'une ligne d'eau invisible. */
const RISE_FROM = "inset(100% 0% 0% 0%)";
const RISE_TO = "inset(-10% 0% -10% 0%)";

type RevealProps = {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
  id?: string;
} & Omit<HTMLMotionProps<"div">, "children" | "id">;

export function Reveal({
  children,
  direction = "up",
  delay = 0,
  className,
  onAnimationComplete,
  ...rest
}: RevealProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const from = offsets[direction];
  const rise = direction === "rise" && !reduce;
  // « rise » : le clip-path est posé sur un enfant, jamais sur l'élément
  // observé (Chrome considère un élément entièrement rogné comme invisible
  // pour IntersectionObserver, whileInView ne se déclencherait jamais).
  const inView = useInView(ref, {
    once: true,
    amount: 0.22,
    margin: "0px 0px -6% 0px",
  });
  const initial = reduce ? false : { opacity: 0, ...from };
  const target = { opacity: 1, x: 0, y: 0 };

  if (rise) {
    return (
      <motion.div
        ref={ref}
        className={className}
        initial={initial}
        animate={inView ? target : undefined}
        transition={{ duration: 0.8, delay, ease }}
        onAnimationComplete={onAnimationComplete}
        {...rest}
      >
        <motion.div
          ref={innerRef}
          initial={{ clipPath: RISE_FROM }}
          animate={inView ? { clipPath: RISE_TO } : undefined}
          transition={{ duration: 0.8, delay, ease }}
          onAnimationComplete={() => {
            // Une fois sorti de l'eau, on retire le clip pour ne rogner ni
            // ombre ni débordement volontaire (survol qui se soulève).
            if (innerRef.current) innerRef.current.style.clipPath = "";
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={initial}
      whileInView={target}
      viewport={{ once: true, amount: 0.22, margin: "0px 0px -6% 0px" }}
      transition={{ duration: reduce ? 0 : 0.62, delay, ease }}
      onAnimationComplete={onAnimationComplete}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

type StaggerProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
};

export function Stagger({ children, className, stagger = 0.08 }: StaggerProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.18 }}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: reduce ? 0 : stagger },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  direction?: Direction;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const from = offsets[direction];
  const rise = direction === "rise" && !reduce;

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={{
        hidden: { opacity: 0, ...from, ...(rise ? { clipPath: RISE_FROM } : {}) },
        show: {
          opacity: 1,
          x: 0,
          y: 0,
          ...(rise ? { clipPath: RISE_TO } : {}),
          transition: { duration: rise ? 0.7 : 0.55, ease },
        },
      }}
      onAnimationComplete={() => {
        if (rise && ref.current) ref.current.style.clipPath = "";
      }}
    >
      {children}
    </motion.div>
  );
}
