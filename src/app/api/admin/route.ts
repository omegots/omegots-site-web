import { aujourdhuiIso, decrireChangements, validerContenu, type Contenu } from "@/data/contenu";
import {
  adresseClient,
  ecrireContenu,
  effacerEchecs,
  ErreurAdmin,
  type FichierPhoto,
  lireContenu,
  minutesDeBlocage,
  motDePasseValide,
  noterEchec,
} from "@/server/contenu-depot";

/*
 * API de l'interface /admin. Une seule route, en POST :
 * - { action: "lire", motDePasse } → le contenu actuel et sa version (sha) ;
 * - { action: "enregistrer", motDePasse, contenu, sha, photos? } → vérifie, écrit, renvoie la nouvelle version.
 *   `photos` : les nouvelles photos, déjà réduites dans le navigateur ({ src, donnees } en base64 JPEG).
 * Le mot de passe est vérifié à chaque appel : rien n'est gardé en session.
 */

/* Netlify refuse les requêtes de plus de 6 Mo : on reste en dessous. */
const TAILLE_MAX = 5_500_000;
const MAX_NOUVELLES_PHOTOS = 8;
const OCTETS_MAX_PHOTO = 1_500_000;
const SRC_NOUVELLE_PHOTO = /^\/photos\/sorties\/[a-z0-9-]{1,80}\.jpg$/;

/** Vérifie les nouvelles photos : chemin attendu, vraiment citées par le contenu, vrai JPEG, taille raisonnable. */
function lirePhotos(brut: unknown, contenu: Contenu): FichierPhoto[] | string {
  if (brut === undefined) return [];
  if (!Array.isArray(brut)) return "Photos illisibles. Rechargez la page.";
  if (brut.length > MAX_NOUVELLES_PHOTOS) {
    return `${MAX_NOUVELLES_PHOTOS} nouvelles photos au maximum par enregistrement : enregistrez en plusieurs fois.`;
  }
  const citees = new Set(contenu.ramassages.flatMap((r) => (r.photos ?? []).map((p) => p.src)));
  const fichiers: FichierPhoto[] = [];
  for (const f of brut) {
    if (typeof f !== "object" || f === null) return "Photos illisibles. Rechargez la page.";
    const { src, donnees } = f as Record<string, unknown>;
    if (typeof src !== "string" || !SRC_NOUVELLE_PHOTO.test(src) || !citees.has(src) || typeof donnees !== "string") {
      return "Une photo est illisible : retirez-la puis ajoutez-la à nouveau.";
    }
    const octets = Buffer.from(donnees, "base64");
    if (octets.length > OCTETS_MAX_PHOTO) return "Une photo est trop lourde. Retirez-la puis ajoutez-la à nouveau.";
    if (octets[0] !== 0xff || octets[1] !== 0xd8 || octets[2] !== 0xff) {
      return "Une photo n'est pas au bon format. Retirez-la puis ajoutez-la à nouveau.";
    }
    fichiers.push({ chemin: `public${src}`, octets });
  }
  return fichiers;
}

function reponse(statut: number, corps: object) {
  return Response.json(corps, { status: statut, headers: { "Cache-Control": "no-store" } });
}

function erreur(statut: number, message: string) {
  return reponse(statut, { ok: false, erreur: message });
}

function lireJson(texte: string): unknown {
  try {
    return JSON.parse(texte);
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  const ip = adresseClient(request);
  const blocage = minutesDeBlocage(ip);
  if (blocage > 0) {
    return erreur(429, `Trop d'essais de mot de passe. Réessayez dans ${blocage} minute${blocage > 1 ? "s" : ""}.`);
  }

  const brut = await request.text();
  if (brut.length > TAILLE_MAX) return erreur(413, "Les données envoyées sont trop volumineuses.");
  const corps = lireJson(brut);
  if (typeof corps !== "object" || corps === null) return erreur(400, "Demande illisible. Rechargez la page.");
  const { action, motDePasse, contenu, sha, photos } = corps as Record<string, unknown>;

  try {
    if (typeof motDePasse !== "string" || !motDePasseValide(motDePasse)) {
      noterEchec(ip);
      return erreur(401, "Mot de passe refusé.");
    }
    effacerEchecs(ip);

    if (action === "lire") {
      const fichier = await lireContenu();
      const lu = validerContenu(lireJson(fichier.texte));
      if (!lu.ok) {
        return erreur(500, "Le fichier de contenu en ligne est abîmé. Contactez la personne qui gère le site.");
      }
      return reponse(200, { ok: true, contenu: lu.contenu, sha: fichier.sha });
    }

    if (action === "enregistrer") {
      if (typeof sha !== "string" || !sha) return erreur(400, "Version inconnue. Rechargez la page.");
      const verifie = validerContenu(contenu, aujourdhuiIso());
      if (!verifie.ok) {
        return reponse(422, {
          ok: false,
          erreur: "Certaines informations sont à corriger.",
          erreurs: verifie.erreurs,
        });
      }

      const fichiers = lirePhotos(photos, verifie.contenu);
      if (typeof fichiers === "string") return erreur(400, fichiers);

      // La version actuelle sert à décrire le changement dans l'historique.
      const actuel = await lireContenu();
      const avantLu = validerContenu(lireJson(actuel.texte));
      const avant: Contenu | null = avantLu.ok ? avantLu.contenu : null;
      const message =
        decrireChangements(avant, verifie.contenu) +
        (fichiers.length > 0 ? ` (${fichiers.length} photo${fichiers.length > 1 ? "s" : ""} ajoutée${fichiers.length > 1 ? "s" : ""})` : "");

      const texte = `${JSON.stringify(verifie.contenu, null, 2)}\n`;
      const nouveauSha = await ecrireContenu(texte, sha, message, fichiers);
      return reponse(200, { ok: true, contenu: verifie.contenu, sha: nouveauSha, message });
    }

    return erreur(400, "Action inconnue.");
  } catch (e) {
    if (e instanceof ErreurAdmin) return erreur(e.statut, e.message);
    console.error("[admin]", e);
    return erreur(500, "Une erreur inattendue est survenue. Réessayez dans quelques minutes.");
  }
}
