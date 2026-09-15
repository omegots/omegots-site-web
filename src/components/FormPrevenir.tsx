"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState, type FormEvent } from "react";

const EMAIL = "association.o.megots@gmail.com";
const ease = [0.22, 1, 0.36, 1] as const;

export type EtatPrevenir = "idle" | "sending" | "ok" | "error";

type FormPrevenirProps = {
  /** Le champ e-mail prend ou perd le focus. */
  onFocusChange?: (focused: boolean) => void;
  /** L'état d'envoi change (idle, sending, ok, error). */
  onEtatChange?: (etat: EtatPrevenir) => void;
};

/** Formulaire « être prévenu·e » : Netlify Forms, déclaré dans public/__forms.html. */
export function FormPrevenir({ onFocusChange, onEtatChange }: FormPrevenirProps) {
  const reduce = useReducedMotion();
  const [email, setEmail] = useState("");
  const [etat, setEtat] = useState<EtatPrevenir>("idle");
  // Après envoi : la coche se dessine, puis le libellé « C'est noté » apparaît.
  const [note, setNote] = useState(false);

  useEffect(() => {
    onEtatChange?.(etat);
  }, [etat, onEtatChange]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (etat === "sending" || etat === "ok") return;
    setEtat("sending");
    try {
      const body = new URLSearchParams({ "form-name": "prevenir", email });
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

  const ok = etat === "ok";
  const fade = {
    initial: { opacity: 0, y: 4 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -4 },
    transition: { duration: reduce ? 0 : 0.22, ease },
  };

  return (
    <div>
      <form
        className="prevenir-form"
        name="prevenir"
        method="POST"
        data-netlify="true"
        onSubmit={onSubmit}
      >
        <input type="hidden" name="form-name" value="prevenir" />
        <p hidden>
          <label>
            Ne pas remplir : <input name="bot-field" />
          </label>
        </p>
        <label className="sr-only" htmlFor="prevenir-email">
          Votre adresse e-mail
        </label>
        <input
          id="prevenir-email"
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="votre@email.fr"
          value={email}
          readOnly={ok}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={() => onFocusChange?.(true)}
          onBlur={() => onFocusChange?.(false)}
        />
        <motion.button
          type={ok ? "button" : "submit"}
          className={`btn prevenir-btn${ok ? " is-ok" : ""}`}
          disabled={etat === "sending"}
          aria-disabled={ok || undefined}
          layout={reduce ? false : "size"}
          transition={{ layout: { duration: reduce ? 0 : 0.32, ease } }}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {ok ? (
              <motion.span key="ok" className="prevenir-btn-ok" {...fade}>
                <svg
                  className="prevenir-check"
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  aria-hidden="true"
                >
                  <motion.path
                    d="M4.5 12.5l5 5L19.5 7.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                      duration: reduce ? 0 : 0.5,
                      ease: "easeOut",
                      delay: reduce ? 0 : 0.1,
                    }}
                    onAnimationComplete={() => setNote(true)}
                  />
                </svg>
                <AnimatePresence initial={false}>
                  {note && (
                    <motion.span
                      key="note"
                      initial={{ opacity: 0, x: reduce ? 0 : -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: reduce ? 0 : 0.28, ease }}
                    >
                      C&apos;est noté
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.span>
            ) : etat === "sending" ? (
              <motion.span key="sending" {...fade}>
                Envoi…
              </motion.span>
            ) : (
              <motion.span key="label" {...fade}>
                Me prévenir
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </form>
      {ok && (
        <p className="prevenir-ok" role="status">
          À bientôt sur le terrain ! On vous écrit dès que la date est fixée.
        </p>
      )}
      {etat === "error" && (
        <p className="prevenir-err" role="alert">
          L&apos;envoi n&apos;a pas fonctionné. Écrivez-nous à{" "}
          <a href={`mailto:${EMAIL}?subject=Prochain%20ramassage`}>{EMAIL}</a>.
        </p>
      )}
    </div>
  );
}
