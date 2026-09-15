"use client";

import { motion, useReducedMotion } from "motion/react";
import { Fragment } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

type Part = { text: string; hit: boolean };

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Découpe un titre en segments, en marquant les occurrences à surligner. */
export function splitHighlights(title: string, highlights: string[]): Part[] {
  const list = highlights.filter((h) => h.length > 0);
  if (list.length === 0) return [{ text: title, hit: false }];
  const re = new RegExp(`(${list.map(escapeRegExp).join("|")})`, "g");
  return title
    .split(re)
    .filter((s) => s !== "")
    .map((s) => ({ text: s, hit: list.includes(s) }));
}

/**
 * Titre d'article dont les chiffres clés sont surlignés : le fond orange (25 %)
 * du <mark> se dessine de gauche à droite via la variable --hl, pilotée par
 * les variants hidden/show que propage le StaggerItem parent.
 */
export function HighlightedTitle({
  title,
  highlights,
}: {
  title: string;
  highlights: string[];
}) {
  const reduce = useReducedMotion();
  const parts = splitHighlights(title, highlights);

  return (
    <>
      {parts.map((p, i) =>
        p.hit ? (
          <motion.mark
            key={i}
            className="presse-hl"
            variants={{
              hidden: { "--hl": "0%" },
              show: {
                "--hl": "100%",
                transition: {
                  duration: reduce ? 0 : 0.6,
                  delay: reduce ? 0 : 0.35,
                  ease,
                },
              },
            }}
          >
            {p.text}
          </motion.mark>
        ) : (
          <Fragment key={i}>{p.text}</Fragment>
        ),
      )}
    </>
  );
}
