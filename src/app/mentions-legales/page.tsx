import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  alternates: { canonical: "/mentions-legales" },
  title: "Mentions légales · O'Mégots",
  description:
    "Informations légales relatives au site omegots.fr et à l'association O'Mégots : éditeur, directeur de la publication, hébergement, données personnelles.",
  robots: { index: false, follow: true },
};

const EMAIL = "association.o.megots@gmail.com";
const TEL = "07 80 39 48 78";
const TEL_HREF = "tel:+33780394878";

export default function MentionsLegalesPage() {
  return (
    <PageShell
      title="Mentions légales."
      lede="Informations légales relatives au site omegots.fr et à l'association O'Mégots."
    >
      <section className="page-section">
        <div className="wrap">
          <div className="legal">
          <h2>Éditeur du site</h2>
          <ul>
            <li>Nom de l&apos;association : O&apos;Mégots</li>
            <li>Forme juridique : association loi 1901</li>
            <li>Numéro RNA : W443012511</li>
            <li>Numéro de SIRET : 104 488 408 00014</li>
            <li>Siège social : Besné (44160), Loire-Atlantique</li>
            <li>
              Adresse e-mail : <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </li>
            <li>
              Téléphone : <a href={TEL_HREF}>{TEL}</a>
            </li>
            <li>Site web : omegots.fr</li>
          </ul>

          <h2>Directeur de la publication</h2>
          <p>
            Le directeur de la publication est Romain Perrais, président de
            l&apos;association. Pour tout contact, écrivez à{" "}
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
          </p>

          <h2>Hébergement</h2>
          <ul>
            <li>Hébergeur : Netlify, Inc.</li>
            <li>Siège social : 512 2nd Street, Suite 200, San Francisco, CA 94107, États-Unis</li>
            <li>Site web : www.netlify.com</li>
          </ul>

          <h2>Conception et réalisation</h2>
          <p>
            Le site a été conçu et réalisé par{" "}
            <a href="https://ghis.fr">GHIS</a>, studio de création de sites
            et d&apos;outils numériques, dans le cadre d&apos;un partenariat
            associatif.
          </p>

          <h2>Propriété intellectuelle</h2>
          <p>
            L&apos;ensemble des contenus présents sur ce site (textes, images,
            graphismes, logo, icônes) est la propriété exclusive de
            l&apos;association O&apos;Mégots, sauf mention contraire. Toute
            reproduction, représentation, modification ou adaptation, même
            partielle, est interdite sans l&apos;accord préalable écrit de
            l&apos;association.
          </p>
          <p>
            Les marques et logos éventuellement reproduits avec l&apos;accord de
            leurs propriétaires restent la propriété exclusive de ces derniers.
          </p>

          <h2>Données personnelles</h2>
          <p>
            Conformément au règlement général sur la protection des données
            (RGPD) et à la loi Informatique et Libertés, vous disposez
            d&apos;un droit d&apos;accès, de rectification, d&apos;opposition
            et de suppression des données vous concernant.
          </p>
          <p>
            Les données collectées via les formulaires du site (adresse e-mail,
            et le cas échéant nom et message) sont utilisées uniquement pour
            vous prévenir des prochaines sorties et répondre à vos demandes.
            Elles ne sont ni cédées, ni vendues à des tiers.
          </p>
          <p>
            Pour exercer vos droits ou pour toute question relative à vos
            données personnelles, contactez-nous à{" "}
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
          </p>

          <h2>Cookies</h2>
          <p>
            Ce site n&apos;utilise pas de cookies de traçage ou de publicité.
            Des cookies techniques strictement nécessaires au bon fonctionnement
            du site peuvent être déposés par l&apos;hébergeur Netlify. Ces
            cookies ne collectent pas de données personnelles.
          </p>

          <h2>Limitation de responsabilité</h2>
          <p>
            L&apos;association O&apos;Mégots s&apos;efforce de maintenir les
            informations de ce site à jour et exactes. Toutefois, elle ne peut
            garantir l&apos;exactitude, la complétude ou l&apos;actualité des
            informations diffusées.
          </p>
          <p>
            O&apos;Mégots ne saurait être tenue responsable des dommages directs
            ou indirects résultant de l&apos;accès au site ou de
            l&apos;utilisation de son contenu. Les liens hypertextes présents
            sur ce site pointant vers des sites tiers n&apos;engagent pas la
            responsabilité de l&apos;association quant à leur contenu.
          </p>

          <h2>Droit applicable</h2>
          <p>
            Le présent site et ses mentions légales sont soumis au droit
            français. En cas de litige, les tribunaux français seront seuls
            compétents.
          </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
