"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Lit une media query sans setState dans un effet : `false` côté serveur et
 * pendant l'hydratation, puis la valeur réelle dès que le navigateur répond.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      if (typeof window === "undefined" || !window.matchMedia) return () => {};
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query],
  );

  const getSnapshot = useCallback(
    () => typeof window !== "undefined" && !!window.matchMedia && window.matchMedia(query).matches,
    [query],
  );

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
