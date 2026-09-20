"use client";

import { useState } from "react";
import { SITE_URL } from "@/data/site";

type Etat = "idle" | "copie" | "erreur";

/**
 * « Faire passer le mot » : la feuille de partage du téléphone quand elle
 * existe (Web Share), sinon le lien est copié dans le presse-papiers. L'ancien
 * site avait un bouton Partager qui ne faisait rien ; celui-ci fait quelque chose.
 */
export function Partager({ className = "btn ghost" }: { className?: string }) {
  const [etat, setEtat] = useState<Etat>("idle");

  async function partager() {
    const data = {
      title: "O'Mégots, ramassage de mégots à Saint-Nazaire",
      text: "Un territoire sans mégots, c'est possible. Venez ramasser avec nous.",
      url: `${SITE_URL}/rejoindre`,
    };
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share(data);
        return;
      }
      await navigator.clipboard.writeText(data.url);
      setEtat("copie");
      setTimeout(() => setEtat("idle"), 2500);
    } catch {
      setEtat("erreur");
      setTimeout(() => setEtat("idle"), 2500);
    }
  }

  return (
    <button type="button" className={className} onClick={partager} aria-live="polite">
      {etat === "copie" ? "Lien copié" : etat === "erreur" ? "Copiez l'adresse de la page" : "Partager"}
    </button>
  );
}
