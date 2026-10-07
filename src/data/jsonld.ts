import { articlesPresse } from "@/data/presse";
import { prochaineSortie } from "@/data/ramassages";
import { reseaux } from "@/data/reseaux";
import { SITE_URL } from "@/data/site";

/** Sérialise un objet schema.org pour une balise <script type="application/ld+json">. */
export function jsonLd(data: object) {
  // « < » échappé : aucune chaîne du contenu ne peut fermer la balise <script>.
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

const NGO_ID = `${SITE_URL}/#association`;

/**
 * Fiche de l'association (schema.org NGO), posée sur toutes les pages par le
 * layout : uniquement des faits publiés (mentions légales, presse, réseaux).
 */
export const ngo = {
  "@context": "https://schema.org",
  "@type": "NGO",
  "@id": NGO_ID,
  name: "O'Mégots",
  url: SITE_URL,
  logo: `${SITE_URL}/favicon/favicon-512.png`,
  email: "association.o.megots@gmail.com",
  foundingDate: "2026",
  description:
    "Association citoyenne loi 1901 : ramassage et comptage des mégots à Saint-Nazaire et ses alentours, chiffres publiés, sensibilisation sans jugement.",
  address: { "@type": "PostalAddress", addressLocality: "Besné", postalCode: "44160", addressRegion: "Loire-Atlantique", addressCountry: "FR" },
  areaServed: [
    { "@type": "City", name: "Saint-Nazaire" },
    { "@type": "AdministrativeArea", name: "Loire-Atlantique" },
  ],
  sameAs: reseaux.filter((r) => r.href && r.id !== "email").map((r) => r.href),
  identifier: [
    { "@type": "PropertyValue", propertyID: "RNA", value: "W443012511" },
    { "@type": "PropertyValue", propertyID: "SIRET", value: "10448840800014" },
  ],
  subjectOf: articlesPresse.map((a) => ({
    "@type": "NewsArticle",
    headline: a.title,
    url: a.href,
    publisher: { "@type": "Organization", name: a.media },
  })),
};

/** Le site lui-même, rattaché à l'association. */
export const website = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#site`,
  name: "O'Mégots",
  url: SITE_URL,
  inLanguage: "fr-FR",
  publisher: { "@id": NGO_ID },
};

/** « 10 h », « 9 h 30 » → « 10:00 », « 09:30 » ; vide si l'heure n'est pas lisible. */
function heureIso(heure: string): string {
  const m = /^(\d{1,2})\s*h\s*(\d{2})?$/i.exec(heure.trim());
  if (!m || Number(m[1]) > 23) return "";
  return `${m[1].padStart(2, "0")}:${m[2] ?? "00"}`;
}

/**
 * La prochaine sortie (schema.org Event), pour la page « Nos ramassages ».
 * N'existe que si une date est annoncée : rien n'est émis tant qu'elle est à fixer.
 */
const prochaine = prochaineSortie();
const heure = heureIso(prochaine.heure);
export const evenementProchain =
  prochaine.statut === "annoncee"
    ? {
        "@context": "https://schema.org",
        "@type": "Event",
        name: `${prochaine.libelle || "Ramassage de mégots"} à Saint-Nazaire`,
        description: [
          "Ramassage de mégots gratuit et ouvert à toutes et tous, organisé par l'association O'Mégots.",
          prochaine.note,
        ]
          .filter(Boolean)
          .join(" "),
        startDate: heure ? `${prochaine.iso}T${heure}` : prochaine.iso,
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        isAccessibleForFree: true,
        location: {
          "@type": "Place",
          name: prochaine.lieu,
          address: { "@type": "PostalAddress", addressLocality: "Saint-Nazaire", postalCode: "44600", addressCountry: "FR" },
        },
        organizer: { "@id": NGO_ID, "@type": "NGO", name: "O'Mégots", url: SITE_URL },
      }
    : null;
