import { articlesPresse } from "@/data/presse";
import { ramassages } from "@/data/ramassages";
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
  sameAs: reseaux.filter((r) => r.href).map((r) => r.href),
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

/** Les sorties de ramassage (schema.org Event), pour la page « Nos ramassages ». */
export const evenements = ramassages.map((r) => ({
  "@context": "https://schema.org",
  "@type": "Event",
  name: `${r.libelle} de Saint-Nazaire`,
  description: `${r.note} ${r.benevoles} bénévoles, ${r.duree} de ramassage, ${r.litres} litres de mégots, soit environ ${r.megots} mégots.`,
  startDate: r.iso,
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  isAccessibleForFree: true,
  location: {
    "@type": "Place",
    name: `Saint-Nazaire, ${r.lieu}`,
    address: { "@type": "PostalAddress", addressLocality: "Saint-Nazaire", postalCode: "44600", addressCountry: "FR" },
  },
  organizer: { "@id": NGO_ID, "@type": "NGO", name: "O'Mégots", url: SITE_URL },
}));
