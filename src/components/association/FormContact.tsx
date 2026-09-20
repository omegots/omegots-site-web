"use client";

import { useId, useState, type FormEvent } from "react";
import { identite, objetsContact } from "@/data/association";

type Etat = "idle" | "sending" | "ok" | "error";

/**
 * Formulaire de contact de l'ancien site (prénom, nom, e-mail, objet, message),
 * sur le même mécanisme que « Me prévenir » : Netlify Forms, déclaré dans
 * public/__forms.html, envoi en x-www-form-urlencoded. Hors Netlify, l'envoi
 * échoue et l'adresse e-mail est proposée en repli, avec l'objet pré-rempli.
 */
export function FormContact() {
  const [etat, setEtat] = useState<Etat>("idle");
  const [objet, setObjet] = useState<(typeof objetsContact)[number]>(objetsContact[0]);
  const id = useId();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (etat === "sending" || etat === "ok") return;
    setEtat("sending");
    const data = new FormData(e.currentTarget);
    const body = new URLSearchParams();
    data.forEach((v, k) => body.append(k, String(v)));
    try {
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });
      setEtat(res.ok ? "ok" : "error");
    } catch {
      setEtat("error");
    }
  }

  const mailto = `mailto:${identite.email}?subject=${encodeURIComponent(objet)}`;

  if (etat === "ok") {
    return (
      <p className="contact-ok" role="status">
        <b>C&apos;est envoyé.</b> Nous vous répondons en {identite.delai}.
      </p>
    );
  }

  return (
    <form className="contact-form" name="contact" method="POST" data-netlify="true" onSubmit={onSubmit}>
      <input type="hidden" name="form-name" value="contact" />
      <p hidden>
        <label>
          Ne pas remplir : <input name="bot-field" />
        </label>
      </p>

      <div className="contact-ligne">
        <label>
          <span>Prénom</span>
          <input id={`${id}-prenom`} type="text" name="prenom" required autoComplete="given-name" placeholder="Marie" />
        </label>
        <label>
          <span>Nom</span>
          <input id={`${id}-nom`} type="text" name="nom" required autoComplete="family-name" placeholder="Dupont" />
        </label>
      </div>

      <label>
        <span>E-mail</span>
        <input id={`${id}-email`} type="email" name="email" required autoComplete="email" placeholder="marie@exemple.fr" />
      </label>

      <label>
        <span>Objet</span>
        <select id={`${id}-objet`} name="objet" value={objet} onChange={(e) => setObjet(e.target.value as typeof objet)}>
          {objetsContact.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </label>

      <label>
        <span>Message</span>
        <textarea id={`${id}-message`} name="message" required rows={5} placeholder="Parlez-nous de vous, de votre idée…" />
      </label>

      <div className="contact-actions">
        <button type="submit" className="btn btn-lg" disabled={etat === "sending"}>
          {etat === "sending" ? "Envoi…" : "Envoyer le message"}
        </button>
        {etat === "error" && (
          <p className="contact-err" role="alert">
            L&apos;envoi n&apos;a pas abouti. Écrivez-nous directement :{" "}
            <a href={mailto}>{identite.email}</a>
          </p>
        )}
      </div>
    </form>
  );
}
