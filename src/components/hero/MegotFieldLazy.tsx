"use client";

import dynamic from "next/dynamic";

/** Charge les mégots après le JS client : hors chemin LCP du hero serveur. */
export const MegotFieldLazy = dynamic(
  () => import("./MegotField").then((m) => ({ default: m.MegotField })),
  { ssr: false, loading: () => null },
);
