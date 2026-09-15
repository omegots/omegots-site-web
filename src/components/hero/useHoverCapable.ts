"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(hover: hover)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

/** Vrai quand l'appareil dispose d'un pointeur capable de survol (souris, pavé tactile). Faux côté serveur. */
export function useHoverCapable() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
