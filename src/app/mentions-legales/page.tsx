import { pageMetadata } from "@/data/seo";
import { PageShell } from "@/components/PageShell";

export const metadata = pageMetadata({
  path: "/mentions-legales",
  title: "Mentions légales et confidentialité · O'Mégots",
  description:
    "Éditeur, directeur de la publication, hébergement, données personnelles et cookies du site omegots.fr de l'association O'Mégots.",
  robots: { index: false, follow: true },
});

const EMAIL = "association.o.megots@gmail.com";
const TEL = "07 80 39 48 78";
const TEL_HREF = "tel:+33780394878";

export default function MentionsLegalesPage() {
  return (
    <PageShell
      title="Mentions légales et confidentialité."
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
            l&apos;association. Pour tout contact,{" "}
            <a href="/contact">écrivez-nous via le formulaire</a> ou à{" "}
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

          <h2 id="confidentialite">Données personnelles et confidentialité</h2>
          <p>
            Le responsable du traitement est l&apos;association O&apos;Mégots,
            représentée par son président. Le site ne collecte que les données
            que vous saisissez vous-même dans ses formulaires.
          </p>
          <ul>
            <li>
              <b>«&nbsp;Être prévenu de la prochaine sortie&nbsp;»</b> : votre adresse
              e-mail, pour vous annoncer les prochains ramassages. Base légale :
              votre consentement, que vous pouvez retirer à tout moment en nous
              écrivant. Conservation : jusqu&apos;à votre désinscription, et au
              plus trois ans après notre dernier échange.
            </li>
            <li>
              <b>Formulaire de contact</b> : prénom, nom, e-mail, objet et
              message, pour répondre à votre demande. Base légale : l&apos;intérêt
              légitime de l&apos;association à répondre aux personnes qui la
              sollicitent. Conservation : le temps de traiter la demande, et au
              plus trois ans après notre dernier échange.
            </li>
            <li>
              <b>Adhésion et dons</b> : ils se font sur la plateforme Crédit
              Mutuel Pay Asso, qui collecte et traite vos coordonnées et votre
              paiement pour le compte de l&apos;association, selon sa propre
              politique de confidentialité. L&apos;association ne voit jamais
              vos coordonnées bancaires.
            </li>
          </ul>
          <p>
            Ces données sont réservées aux membres du bureau de
            l&apos;association. Elles ne sont ni cédées, ni vendues, ni
            utilisées à des fins publicitaires. Les envois des formulaires sont
            reçus et stockés par l&apos;hébergeur du site, Netlify, établi aux
            États-Unis : ce transfert hors de l&apos;Union européenne est
            encadré par les garanties prévues par le RGPD (clauses
            contractuelles types de la Commission européenne).
          </p>
          <p>
            Conformément au règlement général sur la protection des données
            (RGPD) et à la loi Informatique et Libertés, vous disposez
            d&apos;un droit d&apos;accès, de rectification, d&apos;effacement,
            de limitation, d&apos;opposition et de portabilité des données vous
            concernant. Pour les exercer, écrivez à{" "}
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a> : nous répondons dans un
            délai d&apos;un mois. Si vous estimez, après nous avoir contactés,
            que vos droits ne sont pas respectés, vous pouvez adresser une
            réclamation à la CNIL (<a href="https://www.cnil.fr">www.cnil.fr</a>).
          </p>

          <h2>Cookies</h2>
          <p>
            Ce site ne dépose aucun cookie de mesure d&apos;audience, de
            traçage ou de publicité, et n&apos;enregistre rien dans votre
            navigateur. Aucun bandeau de consentement n&apos;est donc
            nécessaire. Des cookies techniques strictement nécessaires au
            fonctionnement du site peuvent être déposés par l&apos;hébergeur ;
            ils ne servent pas à vous suivre.
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
