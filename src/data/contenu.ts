/**
 * Le contenu modifiable par l'association (src/data/contenu.json) : les sorties
 * déjà faites et la prochaine sortie. Types, validation et calculs partagés par
 * le site (au build), l'interface /admin (dans le navigateur) et l'API
 * /api/admin (sur le serveur). Aucune dépendance serveur ici.
 */

export type Photo = { src: string; alt: string; w: number; h: number };

export type Ramassage = {
  date: string;
  /** Date au format ISO 8601 (AAAA-MM-JJ), pour le balisage schema.org Event. Absente tant que la date n'est pas connue. */
  iso?: string;
  libelle: string;
  lieu: string;
  /** Absente tant que l'association ne l'a pas précisée : la fiche n'affiche alors pas la durée. */
  duree?: string;
  litres: number;
  /** Nombre de mégots annoncé par l'association pour cette sortie. */
  megots: number;
  benevoles: number;
  note: string;
  /** Photos de la sortie, la première en grand. */
  photos?: Photo[];
};

export type StatutProchaine = "a-fixer" | "annoncee";

export type ProchaineSortie = {
  statut: StatutProchaine;
  iso: string;
  date: string;
  libelle: string;
  lieu: string;
  heure: string;
  duree: string;
  note: string;
};

/** Une parole de bénévole (section « Paroles de bénévoles »). */
export type Temoignage = { quote: string; nom: string; role: string };

export type Contenu = {
  prochaineSortie: ProchaineSortie;
  ramassages: Ramassage[];
  temoignages: Temoignage[];
};

/** Longueur maximale d'une parole : une ou deux phrases. */
export const MAX_CARACTERES_PAROLE = 300;
export const MAX_PAROLES = 12;

/** Chiffre de sensibilisation repris du site actuel : un mégot pollue jusqu'à 500 litres d'eau. */
export const LITRES_EAU_PAR_MEGOT = 500;

/* --- Dates ------------------------------------------------------------------ */

const MOIS = [
  "janvier",
  "février",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "août",
  "septembre",
  "octobre",
  "novembre",
  "décembre",
];

/** AAAA-MM-JJ valide (le 31 février est refusé). */
export function isoValide(iso: string): boolean {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return false;
  const [a, mo, j] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const d = new Date(Date.UTC(a, mo - 1, j));
  return d.getUTCFullYear() === a && d.getUTCMonth() === mo - 1 && d.getUTCDate() === j;
}

/** « 2026-05-23 » → « 23 mai 2026 » (« 1er » pour le premier du mois). */
export function dateLongue(iso: string): string {
  if (!isoValide(iso)) return "";
  const [a, mo, j] = iso.split("-").map(Number);
  return `${j === 1 ? "1er" : j} ${MOIS[mo - 1]} ${a}`;
}

/** « 2026-05-23 » → « mai 2026 ». */
export function moisAnnee(iso: string): string {
  if (!isoValide(iso)) return "";
  const [a, mo] = iso.split("-").map(Number);
  return `${MOIS[mo - 1]} ${a}`;
}

/** La date du jour à Saint-Nazaire, en AAAA-MM-JJ. */
export function aujourdhuiIso(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Paris" }).format(new Date());
}

/* --- Calculs ------------------------------------------------------------------ */

/** Mégots par litre de contenant, déduit des comptes annoncés (4 800 pour 6 L : 800). */
export function calculerMegotsParLitre(ramassages: readonly Ramassage[]): number {
  const litres = ramassages.reduce((a, r) => a + r.litres, 0);
  const megots = ramassages.reduce((a, r) => a + r.megots, 0);
  return litres > 0 ? Math.round(megots / litres) : 0;
}

export function calculerTotaux(ramassages: readonly Ramassage[]) {
  const litres = Math.round(ramassages.reduce((a, r) => a + r.litres, 0) * 100) / 100;
  const benevoles = ramassages.reduce((a, r) => a + r.benevoles, 0);
  const megots = ramassages.reduce((a, r) => a + r.megots, 0);
  const eau = megots * LITRES_EAU_PAR_MEGOT;
  return { litres, benevoles, megots, eau, sorties: ramassages.length };
}

/* --- Validation ----------------------------------------------------------------- */

/** Une erreur lisible par un bénévole, rattachée au champ concerné. */
export type ErreurContenu = { champ: string; message: string };

export type ResultatValidation = { ok: true; contenu: Contenu } | { ok: false; erreurs: ErreurContenu[] };

function estObjet(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function texte(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

function nombre(v: unknown): number {
  return typeof v === "number" && Number.isFinite(v) ? v : Number.NaN;
}

/** Nombre maximum de photos par sortie. */
export const MAX_PHOTOS_PAR_SORTIE = 4;

/** Les photos ajoutées depuis /admin vivent ici (public/photos/sorties/). */
export const DOSSIER_PHOTOS_SORTIES = "/photos/sorties/";

/** Chemin public d'une photo : /photos/… en .jpg, .jpeg, .png ou .webp, sans « .. ». */
export function srcPhotoValide(src: string): boolean {
  return /^\/photos\/[a-z0-9][a-z0-9/_-]*\.(jpe?g|png|webp)$/i.test(src) && !src.includes("..");
}

function lirePhotos(v: unknown, champ: string, erreurs: ErreurContenu[]): Photo[] | undefined {
  if (!Array.isArray(v) || v.length === 0) return undefined;
  if (v.length > MAX_PHOTOS_PAR_SORTIE) {
    erreurs.push({ champ, message: `${MAX_PHOTOS_PAR_SORTIE} photos au maximum par sortie.` });
  }
  const photos = v.filter(estObjet).map((p) => ({
    src: texte(p.src),
    alt: texte(p.alt),
    w: nombre(p.w),
    h: nombre(p.h),
  }));
  photos.forEach((p, j) => {
    if (!srcPhotoValide(p.src) || !(p.w > 0) || !(p.h > 0)) {
      erreurs.push({ champ: `${champ}.${j}`, message: "Cette photo est illisible : retirez-la puis ajoutez-la à nouveau." });
    } else if (!p.alt) {
      erreurs.push({
        champ: `${champ}.${j}`,
        message: "Décrivez la photo en quelques mots (pour les personnes qui ne la voient pas).",
      });
    }
  });
  return photos.length > 0 ? photos : undefined;
}

/**
 * Vérifie et normalise le contenu. Utilisée au build (un contenu invalide fait
 * échouer le build plutôt que de publier un site faux), dans /admin avant
 * l'envoi, et dans l'API avant d'écrire quoi que ce soit.
 * `aujourdhui` sert à refuser une sortie faite « dans le futur » ou une
 * prochaine sortie déjà passée ; au build, on ne l'utilise pas.
 */
export function validerContenu(donnees: unknown, aujourdhui?: string): ResultatValidation {
  const erreurs: ErreurContenu[] = [];
  if (!estObjet(donnees)) {
    return { ok: false, erreurs: [{ champ: "contenu", message: "Le contenu est illisible." }] };
  }

  // Prochaine sortie
  const p = estObjet(donnees.prochaineSortie) ? donnees.prochaineSortie : {};
  const statut: StatutProchaine = p.statut === "annoncee" ? "annoncee" : "a-fixer";
  const prochaine: ProchaineSortie = {
    statut,
    iso: texte(p.iso),
    date: "",
    libelle: texte(p.libelle),
    lieu: texte(p.lieu),
    heure: texte(p.heure),
    duree: texte(p.duree),
    note: texte(p.note),
  };
  if (p.statut !== "annoncee" && p.statut !== "a-fixer") {
    erreurs.push({ champ: "prochaine.statut", message: "Choisissez « date à fixer » ou « date annoncée »." });
  }
  if (statut === "annoncee") {
    if (!prochaine.iso) {
      erreurs.push({ champ: "prochaine.iso", message: "Indiquez la date de la prochaine sortie." });
    } else if (!isoValide(prochaine.iso)) {
      erreurs.push({ champ: "prochaine.iso", message: "Cette date n'existe pas." });
    } else if (aujourdhui && prochaine.iso < aujourdhui) {
      erreurs.push({ champ: "prochaine.iso", message: "Cette date est déjà passée." });
    }
    if (!prochaine.heure) erreurs.push({ champ: "prochaine.heure", message: "Indiquez l'heure du rendez-vous." });
    if (!prochaine.lieu) erreurs.push({ champ: "prochaine.lieu", message: "Indiquez le lieu du rendez-vous." });
  }
  // La date en toutes lettres se déduit toujours de la date choisie.
  prochaine.date = dateLongue(prochaine.iso);

  // Ramassages
  const liste = Array.isArray(donnees.ramassages) ? donnees.ramassages : [];
  if (liste.length === 0) {
    erreurs.push({ champ: "ramassages", message: "Il faut au moins une sortie dans la liste." });
  }
  const ramassages: Ramassage[] = liste.map((brut, i) => {
    const r = estObjet(brut) ? brut : {};
    const champ = (nom: string) => `ramassages.${i}.${nom}`;
    const iso = texte(r.iso);
    const litres = nombre(r.litres);
    const megots = nombre(r.megots);
    const benevoles = nombre(r.benevoles);

    if (iso) {
      if (!isoValide(iso)) erreurs.push({ champ: champ("iso"), message: "Cette date n'existe pas." });
      else if (aujourdhui && iso > aujourdhui) {
        erreurs.push({ champ: champ("iso"), message: "Une sortie déjà faite ne peut pas être dans le futur." });
      }
    }
    if (!texte(r.libelle)) erreurs.push({ champ: champ("libelle"), message: "Donnez un nom à la sortie." });
    if (!texte(r.lieu)) erreurs.push({ champ: champ("lieu"), message: "Indiquez le lieu." });
    if (!(litres > 0)) erreurs.push({ champ: champ("litres"), message: "Les litres doivent être un nombre plus grand que 0." });
    if (!(megots > 0) || !Number.isInteger(megots)) {
      erreurs.push({ champ: champ("megots"), message: "Le nombre de mégots doit être un nombre entier plus grand que 0." });
    }
    if (!(benevoles > 0) || !Number.isInteger(benevoles)) {
      erreurs.push({ champ: champ("benevoles"), message: "Le nombre de bénévoles doit être un nombre entier plus grand que 0." });
    }

    // Clés dans un ordre stable et lisible : le fichier reste propre dans l'historique.
    const duree = texte(r.duree);
    const photos = lirePhotos(r.photos, champ("photos"), erreurs);
    return {
      date: iso && isoValide(iso) ? dateLongue(iso) : "Date à préciser",
      ...(iso ? { iso } : {}),
      libelle: texte(r.libelle),
      lieu: texte(r.lieu),
      ...(duree ? { duree } : {}),
      litres,
      megots,
      benevoles,
      note: texte(r.note),
      ...(photos ? { photos } : {}),
    };
  });

  // Paroles de bénévoles
  const brutes = Array.isArray(donnees.temoignages) ? donnees.temoignages : [];
  if (brutes.length > MAX_PAROLES) {
    erreurs.push({ champ: "temoignages", message: `${MAX_PAROLES} paroles au maximum : retirez-en une.` });
  }
  const temoignages: Temoignage[] = brutes.map((brut, i) => {
    const t = estObjet(brut) ? brut : {};
    const quote = texte(t.quote)
      .replace(/^[«"“\s]+|[»"”\s]+$/g, "")
      .trim();
    const nom = texte(t.nom);
    if (!quote) erreurs.push({ champ: `temoignages.${i}.quote`, message: "Écrivez la parole du bénévole." });
    else if (quote.length > MAX_CARACTERES_PAROLE) {
      erreurs.push({
        champ: `temoignages.${i}.quote`,
        message: `Trop long : ${MAX_CARACTERES_PAROLE} caractères au maximum (une ou deux phrases).`,
      });
    }
    if (!nom) erreurs.push({ champ: `temoignages.${i}.nom`, message: "Indiquez le prénom (et l'initiale du nom)." });
    return { quote, nom, role: texte(t.role) };
  });

  if (erreurs.length > 0) return { ok: false, erreurs };
  // Ordre chronologique, les sorties sans date à la fin : la première de la
  // liste reste la toute première sortie (le Mégothon), citée sur l'accueil.
  const tries = ramassages
    .map((r, i) => ({ r, i }))
    .sort((a, b) => {
      if (a.r.iso && b.r.iso) return a.r.iso < b.r.iso ? -1 : a.r.iso > b.r.iso ? 1 : a.i - b.i;
      if (a.r.iso) return -1;
      if (b.r.iso) return 1;
      return a.i - b.i;
    })
    .map(({ r }) => r);
  return { ok: true, contenu: { prochaineSortie: prochaine, ramassages: tries, temoignages } };
}

/* --- Message de commit ------------------------------------------------------------- */

function cle(r: Ramassage): string {
  return JSON.stringify(r);
}

function nomSortie(r: Ramassage): string {
  return r.iso ? `du ${r.date}` : `« ${r.libelle} »`;
}

/**
 * Résume ce qui change entre deux versions, pour l'historique du dépôt :
 * « contenu : ajout du ramassage du 7 novembre 2026 ».
 */
export function decrireChangements(avant: Contenu | null, apres: Contenu): string {
  if (!avant) return "contenu : mise à jour depuis l'interface d'administration";
  const parties: string[] = [];

  const pa = avant.prochaineSortie;
  const pb = apres.prochaineSortie;
  if (JSON.stringify(pa) !== JSON.stringify(pb)) {
    parties.push(pb.statut === "annoncee" ? `prochaine sortie le ${pb.date}` : "prochaine sortie à fixer");
  }

  const clesAvant = new Set(avant.ramassages.map(cle));
  const clesApres = new Set(apres.ramassages.map(cle));
  const ajoutes = apres.ramassages.filter((r) => !clesAvant.has(cle(r)));
  const retires = avant.ramassages.filter((r) => !clesApres.has(cle(r)));
  const modifies = Math.min(ajoutes.length, retires.length);
  // Autant d'entrées disparues que d'apparues : ce sont des modifications.
  ajoutes.slice(0, modifies).forEach((r) => parties.push(`modification du ramassage ${nomSortie(r)}`));
  ajoutes.slice(modifies).forEach((r) => parties.push(`ajout du ramassage ${nomSortie(r)}`));
  retires.slice(modifies).forEach((r) => parties.push(`suppression du ramassage ${nomSortie(r)}`));

  if (JSON.stringify(avant.temoignages) !== JSON.stringify(apres.temoignages)) {
    parties.push("paroles de bénévoles");
  }

  return `contenu : ${parties.length > 0 ? parties.join(" ; ") : "aucun changement"}`;
}

const JOURS = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];

/** « 2026-11-07 » → « samedi 7 novembre » (sans l'année, pour un texte court). */
export function jourEtDate(iso: string): string {
  if (!isoValide(iso)) return "";
  const [a, mo, j] = iso.split("-").map(Number);
  const jour = JOURS[new Date(Date.UTC(a, mo - 1, j)).getUTCDay()];
  return `${jour} ${j === 1 ? "1er" : j} ${MOIS[mo - 1]}`;
}
