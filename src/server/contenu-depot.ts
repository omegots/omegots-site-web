/**
 * Lecture et écriture de src/data/contenu.json pour l'API /api/admin.
 * À n'importer que depuis le serveur (route handler) : jetons et mot de passe
 * ne quittent jamais le serveur.
 *
 * - Production : l'API GitHub Contents, avec le jeton de l'association
 *   (GITHUB_TOKEN, GITHUB_REPO « proprio/depot », GITHUB_BRANCH). Chaque
 *   enregistrement est un commit ; Netlify reconstruit le site.
 * - Développement : le fichier sur le disque, sans jeton.
 */
import { createHash, timingSafeEqual } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const CHEMIN_DEPOT = "src/data/contenu.json";
const DELAI_GITHUB_MS = 10_000;

/** Une erreur à montrer telle quelle à un bénévole. */
export class ErreurAdmin extends Error {
  constructor(
    message: string,
    readonly statut: number,
  ) {
    super(message);
  }
}

export const enProduction = process.env.NODE_ENV === "production";

/* --- Mot de passe ------------------------------------------------------------ */

/**
 * Nettoie un mot de passe avant comparaison : espaces et retours à la ligne en
 * bord (copier-coller depuis un mail), guillemets autour de la valeur (collés
 * dans Netlify avec la valeur), et forme Unicode unique (é composé ou non).
 */
function normaliser(mdp: string): string {
  return mdp
    .normalize("NFC")
    .trim()
    .replace(/^(["'«“])\s*(.*?)\s*(["'»”])$/u, "$2")
    .trim();
}

/** Comparaison à temps constant : les deux côtés sont hachés à la même longueur. */
export function motDePasseValide(saisi: string): boolean {
  const attendu = normaliser(process.env.ADMIN_PASSWORD ?? "");
  if (!attendu) {
    throw new ErreurAdmin(
      "L'interface n'est pas encore configurée : le mot de passe n'a pas été défini sur l'hébergement.",
      503,
    );
  }
  const a = createHash("sha256").update(normaliser(saisi), "utf8").digest();
  const b = createHash("sha256").update(attendu, "utf8").digest();
  return timingSafeEqual(a, b);
}

/* --- Limitation des tentatives (en mémoire, par adresse IP) ------------------ */

const MAX_ECHECS = 5;
const BLOCAGE_MS = 15 * 60 * 1000;
const echecs = new Map<string, { nombre: number; depuis: number }>();

export function adresseClient(request: Request): string {
  const h = request.headers;
  return (
    h.get("x-nf-client-connection-ip") ??
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    h.get("x-real-ip") ??
    "inconnue"
  );
}

/** Minutes restantes avant de pouvoir réessayer, ou 0 si l'adresse n'est pas bloquée. */
export function minutesDeBlocage(ip: string): number {
  const e = echecs.get(ip);
  if (!e) return 0;
  const reste = e.depuis + BLOCAGE_MS - Date.now();
  if (reste <= 0) {
    echecs.delete(ip);
    return 0;
  }
  return e.nombre >= MAX_ECHECS ? Math.ceil(reste / 60_000) : 0;
}

export function noterEchec(ip: string) {
  const e = echecs.get(ip);
  if (!e || e.depuis + BLOCAGE_MS < Date.now()) echecs.set(ip, { nombre: 1, depuis: Date.now() });
  else e.nombre += 1;
}

export function effacerEchecs(ip: string) {
  echecs.delete(ip);
}

/* --- Dépôt ------------------------------------------------------------------- */

export type FichierContenu = { texte: string; sha: string };

function configGithub() {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || "main";
  if (!token || !repo) {
    throw new ErreurAdmin(
      "L'enregistrement n'est pas encore configuré sur l'hébergement (jeton GitHub ou nom du dépôt manquant).",
      503,
    );
  }
  if (!/^[\w.-]+\/[\w.-]+$/.test(repo)) {
    throw new ErreurAdmin("Le nom du dépôt configuré sur l'hébergement est mal écrit (attendu : proprietaire/depot).", 503);
  }
  return { token, repo, branch };
}

async function appelGithub(url: string, token: string, init?: RequestInit): Promise<Response> {
  try {
    return await fetch(url, {
      ...init,
      cache: "no-store",
      signal: AbortSignal.timeout(DELAI_GITHUB_MS),
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${token}`,
        "X-GitHub-Api-Version": "2022-11-28",
        "User-Agent": "omegots-admin",
        ...(init?.body ? { "Content-Type": "application/json" } : {}),
      },
    });
  } catch {
    throw new ErreurAdmin("GitHub ne répond pas pour le moment. Réessayez dans quelques minutes.", 502);
  }
}

/** Traduit une réponse d'erreur GitHub en message pour un bénévole. */
function erreurGithub(res: Response): ErreurAdmin {
  switch (res.status) {
    case 401:
      return new ErreurAdmin(
        "Le jeton GitHub est refusé : il a sans doute expiré. Il faut en créer un nouveau et le remplacer sur Netlify.",
        502,
      );
    case 403:
    case 429:
      if (res.headers.get("x-ratelimit-remaining") === "0" || res.status === 429) {
        return new ErreurAdmin("GitHub limite temporairement les demandes. Réessayez dans quelques minutes.", 503);
      }
      return new ErreurAdmin(
        "Le jeton GitHub n'a pas le droit de modifier le dépôt. Vérifiez la permission « Contents : read and write ».",
        502,
      );
    case 404:
      return new ErreurAdmin(
        "Le dépôt, la branche ou le fichier de contenu est introuvable. Vérifiez GITHUB_REPO et GITHUB_BRANCH sur Netlify.",
        502,
      );
    case 409:
    case 422:
      return new ErreurAdmin(
        "Quelqu'un a modifié les données entre-temps. Rechargez la page pour repartir de la dernière version, puis refaites votre modification.",
        409,
      );
    default:
      return new ErreurAdmin(`GitHub a renvoyé une erreur (${res.status}). Réessayez dans quelques minutes.`, 502);
  }
}

function urlContenu(repo: string): string {
  return `https://api.github.com/repos/${repo}/contents/${CHEMIN_DEPOT}`;
}

function cheminLocal(): string {
  return path.join(process.cwd(), CHEMIN_DEPOT);
}

function empreinte(texte: string): string {
  return createHash("sha1").update(texte, "utf8").digest("hex");
}

/** Lit la version actuelle du fichier et son identifiant de version (SHA). */
export async function lireContenu(): Promise<FichierContenu> {
  if (!enProduction) {
    const texte = await readFile(cheminLocal(), "utf8");
    return { texte, sha: empreinte(texte) };
  }
  const { token, repo, branch } = configGithub();
  const res = await appelGithub(`${urlContenu(repo)}?ref=${encodeURIComponent(branch)}`, token);
  if (!res.ok) throw erreurGithub(res);
  const json: unknown = await res.json();
  if (typeof json !== "object" || json === null || !("content" in json) || !("sha" in json)) {
    throw new ErreurAdmin("La réponse de GitHub est illisible. Réessayez dans quelques minutes.", 502);
  }
  const { content, sha } = json as { content: unknown; sha: unknown };
  if (typeof content !== "string" || typeof sha !== "string") {
    throw new ErreurAdmin("La réponse de GitHub est illisible. Réessayez dans quelques minutes.", 502);
  }
  return { texte: Buffer.from(content, "base64").toString("utf8"), sha };
}

/** Une photo à ajouter au dépôt : chemin dans le dépôt (public/…) et octets. */
export type FichierPhoto = { chemin: string; octets: Buffer };

async function jsonGithub<T>(res: Response): Promise<T> {
  if (!res.ok) throw erreurGithub(res);
  return (await res.json()) as T;
}

/**
 * Écrit la nouvelle version, avec ses éventuelles nouvelles photos.
 * `shaAttendu` est la version du fichier sur laquelle le bénévole a travaillé :
 * si le fichier a changé depuis, rien n'est écrasé. Renvoie la nouvelle version.
 *
 * En production, tout part dans UN seul commit (API Git Data : blobs, arbre,
 * commit, puis avancée de la branche sans forcer), donc une seule
 * reconstruction Netlify. Ces appels relèvent de la permission « Contents ».
 */
export async function ecrireContenu(
  texte: string,
  shaAttendu: string,
  message: string,
  photos: FichierPhoto[] = [],
): Promise<string> {
  const conflit = new ErreurAdmin(
    "Quelqu'un a modifié les données entre-temps. Rechargez la page pour repartir de la dernière version, puis refaites votre modification.",
    409,
  );

  if (!enProduction) {
    const actuel = await readFile(cheminLocal(), "utf8");
    if (empreinte(actuel) !== shaAttendu) throw conflit;
    for (const photo of photos) {
      const cible = path.join(process.cwd(), photo.chemin);
      await mkdir(path.dirname(cible), { recursive: true });
      await writeFile(cible, photo.octets);
    }
    await writeFile(cheminLocal(), texte, "utf8");
    return empreinte(texte);
  }

  const { token, repo, branch } = configGithub();
  const api = `https://api.github.com/repos/${repo}/git`;
  const ref = `heads/${encodeURIComponent(branch)}`;

  // 1. Le dernier commit de la branche, et la version actuelle du fichier de contenu.
  const tete = await jsonGithub<{ object: { sha: string } }>(await appelGithub(`${api}/ref/${ref}`, token));
  const actuel = await lireContenu();
  if (actuel.sha !== shaAttendu) throw conflit;
  const commitTete = await jsonGithub<{ tree: { sha: string } }>(
    await appelGithub(`${api}/commits/${tete.object.sha}`, token),
  );

  // 2. Un blob par fichier : les photos, puis le contenu.
  const blob = async (contenu: string, encodage: "base64" | "utf-8") =>
    (
      await jsonGithub<{ sha: string }>(
        await appelGithub(`${api}/blobs`, token, {
          method: "POST",
          body: JSON.stringify({ content: contenu, encoding: encodage }),
        }),
      )
    ).sha;
  const entrees: { path: string; mode: "100644"; type: "blob"; sha: string }[] = [];
  for (const photo of photos) {
    entrees.push({ path: photo.chemin, mode: "100644", type: "blob", sha: await blob(photo.octets.toString("base64"), "base64") });
  }
  const shaContenu = await blob(texte, "utf-8");
  entrees.push({ path: CHEMIN_DEPOT, mode: "100644", type: "blob", sha: shaContenu });

  // 3. L'arbre, le commit, puis la branche avance (refusé si elle a bougé entre-temps).
  const arbre = await jsonGithub<{ sha: string }>(
    await appelGithub(`${api}/trees`, token, {
      method: "POST",
      body: JSON.stringify({ base_tree: commitTete.tree.sha, tree: entrees }),
    }),
  );
  const commit = await jsonGithub<{ sha: string }>(
    await appelGithub(`${api}/commits`, token, {
      method: "POST",
      body: JSON.stringify({ message, tree: arbre.sha, parents: [tete.object.sha] }),
    }),
  );
  const maj = await appelGithub(`${api}/refs/${ref}`, token, {
    method: "PATCH",
    body: JSON.stringify({ sha: commit.sha, force: false }),
  });
  if (maj.status === 422) throw conflit;
  if (!maj.ok) throw erreurGithub(maj);
  return shaContenu;
}
