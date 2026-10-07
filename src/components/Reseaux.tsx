import { reseaux, type Reseau } from "@/data/reseaux";

function Icone({ id }: { id: Reseau["id"] }) {
  const common = { viewBox: "0 0 24 24", "aria-hidden": true, focusable: false } as const;
  if (id === "instagram") {
    return (
      <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
        <circle cx="12" cy="12" r="4.3" />
        <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (id === "email") {
    return (
      <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
        <rect x="2.5" y="5" width="19" height="14" rx="3" />
        <path d="M3.5 6.5l8.5 6.5 8.5-6.5" strokeLinecap="round" />
      </svg>
    );
  }
  if (id === "facebook") {
    return (
      <svg {...common} fill="currentColor">
        <path d="M13.6 21.5v-7.4h2.5l.4-3h-2.9V9.2c0-.9.3-1.5 1.5-1.5h1.5V5.1c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.3H8.2v3h2.5v7.4h2.9z" />
      </svg>
    );
  }
  return (
    <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
      <path d="M12 2.8a9.2 9.2 0 0 0-7.9 13.9L2.8 21.2l4.6-1.2A9.2 9.2 0 1 0 12 2.8z" />
      <path
        d="M9.1 8.2c.3-.6.9-.6 1.2-.4l.9 1.9c.1.3 0 .6-.3.9l-.4.4c.6 1.3 1.6 2.3 2.9 2.9l.4-.4c.3-.3.6-.4.9-.3l1.9.9c.2.3.2.9-.4 1.2-1 .9-2.4.9-3.9-.1-1.6-1-2.9-2.3-3.9-3.9-1-1.5-1-2.9-.1-3.9z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

type Props = {
  /** « icones » : une rangée d'icônes (footer). « cartes » : nom et texte (page Nous rejoindre). */
  variant: "icones" | "cartes";
};

/**
 * Liens vers les réseaux. Sans URL, rien n'est inventé : les cartes de la page
 * Nous rejoindre restent masquées, les icônes du footer s'affichent quand même.
 */
export function Reseaux({ variant }: Props) {
  const cartes = variant === "cartes";
  // L'e-mail n'a sa carte que sur la page Nous rejoindre : le footer l'affiche déjà en toutes lettres.
  const actifs = reseaux.filter((r) => {
    if (r.id === "email") return cartes && Boolean(r.href);
    if (cartes) return Boolean(r.href);
    return true;
  });
  if (actifs.length === 0) return null;
  return (
    <ul className={`reseaux is-${variant}`}>
      {actifs.map((r) => {
        const inner = (
          <>
            <span className="reseau-icone">
              <Icone id={r.id} />
            </span>
            <span className="reseau-texte">
              <span className="reseau-nom">{r.nom}</span>
              {cartes && <span className="reseau-desc">{r.texte}</span>}
            </span>
          </>
        );
        return (
          <li key={r.id}>
            {r.href ? (
              <a
                className="reseau"
                href={r.href}
                {...(r.id === "email" ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                aria-label={cartes ? undefined : r.nom}
                title={cartes ? undefined : r.nom}
              >
                {inner}
              </a>
            ) : (
              <span
                className="reseau is-off"
                title="Lien à venir"
                {...(cartes ? {} : { "aria-label": `${r.nom}, lien à venir` })}
              >
                {inner}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
