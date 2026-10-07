"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import {
  aujourdhuiIso,
  calculerMegotsParLitre,
  calculerTotaux,
  dateLongue,
  DOSSIER_PHOTOS_SORTIES,
  MAX_CARACTERES_PAROLE,
  MAX_PAROLES,
  MAX_PHOTOS_PAR_SORTIE,
  validerContenu,
  type Contenu,
  type ErreurContenu,
  type Ramassage,
  type StatutProchaine,
} from "@/data/contenu";
import { fr } from "@/data/format";

/* --- Formulaires : tout est texte, converti au moment de vérifier ------------ */

type SortieForm = {
  cle: string;
  iso: string;
  libelle: string;
  lieu: string;
  duree: string;
  litres: string;
  megots: string;
  benevoles: string;
  note: string;
  photos: PhotoForm[];
};

/** Une photo de sortie. Les nouvelles portent leur aperçu et leurs octets (JPEG en base64). */
type PhotoForm = {
  src: string;
  alt: string;
  w: number;
  h: number;
  apercu?: string;
  donnees?: string;
};

type ProchaineForm = {
  statut: StatutProchaine;
  iso: string;
  /** Heure au format du champ <input type="time"> : « 10:00 ». */
  heure: string;
  lieu: string;
  libelle: string;
  duree: string;
  note: string;
};

type Reponse =
  | { ok: true; contenu: Contenu; sha: string; message?: string }
  | { ok: false; erreur: string; erreurs?: ErreurContenu[] };

let compteur = 0;
const nouvelleCle = () => `s${++compteur}`;

/** « 10:30 » → « 10 h 30 », « 10:00 » → « 10 h ». */
function heureTexte(heure: string): string {
  const m = /^(\d{2}):(\d{2})$/.exec(heure);
  if (!m) return "";
  const h = String(Number(m[1]));
  return m[2] === "00" ? `${h} h` : `${h} h ${m[2]}`;
}

/** « 10 h 30 » → « 10:30 ». */
function heureChamp(texte: string): string {
  const m = /^(\d{1,2})\s*h\s*(\d{2})?$/i.exec(texte.trim());
  return m ? `${m[1].padStart(2, "0")}:${m[2] ?? "00"}` : "";
}

/** « 1,25 » ou « 1.25 » → 1.25 ; vide → NaN (signalé par la vérification). */
function nombreSaisi(v: string): number {
  const t = v.replace(/\s/g, "").replace(",", ".");
  return t === "" ? Number.NaN : Number(t);
}

function versSortieForm(r: Ramassage): SortieForm {
  return {
    cle: nouvelleCle(),
    iso: r.iso ?? "",
    libelle: r.libelle,
    lieu: r.lieu,
    duree: r.duree ?? "",
    litres: String(r.litres).replace(".", ","),
    megots: String(r.megots),
    benevoles: String(r.benevoles),
    note: r.note,
    photos: (r.photos ?? []).map((p) => ({ ...p })),
  };
}

function sortieVide(): SortieForm {
  return {
    cle: nouvelleCle(),
    iso: "",
    libelle: "",
    lieu: "",
    duree: "2 h",
    litres: "",
    megots: "",
    benevoles: "",
    note: "",
    photos: [],
  };
}

function versProchaineForm(c: Contenu): ProchaineForm {
  const p = c.prochaineSortie;
  return {
    statut: p.statut,
    iso: p.iso,
    heure: heureChamp(p.heure),
    lieu: p.lieu,
    libelle: p.libelle,
    duree: p.duree,
    note: p.note,
  };
}

/** Une parole de bénévole en cours d'édition. */
type ParoleForm = { cle: string; quote: string; nom: string; role: string };

type Onglet = "sorties" | "paroles";

/** Le contenu tel qu'il partirait, encore à vérifier. */
function brouillon(prochaine: ProchaineForm, sorties: SortieForm[], paroles: ParoleForm[]): unknown {
  return {
    prochaineSortie: {
      statut: prochaine.statut,
      iso: prochaine.iso,
      date: "",
      libelle: prochaine.libelle,
      lieu: prochaine.lieu,
      heure: heureTexte(prochaine.heure),
      duree: prochaine.duree,
      note: prochaine.note,
    },
    ramassages: sorties.map((s) => ({
      iso: s.iso,
      libelle: s.libelle,
      lieu: s.lieu,
      duree: s.duree,
      litres: nombreSaisi(s.litres),
      megots: nombreSaisi(s.megots),
      benevoles: nombreSaisi(s.benevoles),
      note: s.note,
      photos: s.photos.length > 0 ? s.photos.map(({ src, alt, w, h }) => ({ src, alt, w, h })) : undefined,
    })),
    temoignages: paroles.map(({ quote, nom, role }) => ({ quote, nom, role })),
  };
}

/** Sorties lisibles pour l'aperçu des totaux (les champs encore vides comptent pour 0). */
function sortiesPourTotaux(sorties: SortieForm[]): Ramassage[] {
  return sorties.map((s) => {
    const n = (v: string) => (Number.isFinite(nombreSaisi(v)) ? nombreSaisi(v) : 0);
    return {
      date: "",
      libelle: s.libelle,
      lieu: s.lieu,
      litres: n(s.litres),
      megots: n(s.megots),
      benevoles: n(s.benevoles),
      note: s.note,
    };
  });
}

/** Côté le plus long d'une photo publiée, en pixels : assez pour l'écran, léger pour le site. */
const COTE_MAX = 1600;
const OCTETS_VISES = 600_000;

function lireDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const lecteur = new FileReader();
    lecteur.onload = () => resolve(String(lecteur.result));
    lecteur.onerror = () => reject(lecteur.error);
    lecteur.readAsDataURL(blob);
  });
}

function versJpeg(canvas: HTMLCanvasElement, qualite: number): Promise<Blob | null> {
  return new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", qualite));
}

/**
 * Réduit une photo du téléphone (souvent 4 à 8 Mo) en JPEG d'environ 1600 px
 * et quelques centaines de Ko, orientation corrigée. Rien ne part en pleine taille.
 */
async function preparerPhoto(fichier: File, iso: string): Promise<PhotoForm> {
  const image = await createImageBitmap(fichier, { imageOrientation: "from-image" });
  const echelle = Math.min(1, COTE_MAX / Math.max(image.width, image.height));
  const w = Math.round(image.width * echelle);
  const h = Math.round(image.height * echelle);
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas");
  ctx.drawImage(image, 0, 0, w, h);
  image.close();

  let blob = await versJpeg(canvas, 0.82);
  if (blob && blob.size > OCTETS_VISES) blob = await versJpeg(canvas, 0.7);
  if (!blob) throw new Error("jpeg");
  const apercu = await lireDataUrl(blob);
  const nom = `${iso || "sortie"}-${crypto.randomUUID().slice(0, 8)}`;
  return {
    src: `${DOSSIER_PHOTOS_SORTIES}${nom}.jpg`,
    alt: "",
    w,
    h,
    apercu,
    donnees: apercu.slice(apercu.indexOf(",") + 1),
  };
}

async function appeler(corps: object): Promise<Reponse> {
  try {
    const res = await fetch("/api/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(corps),
    });
    const json: unknown = await res.json().catch(() => null);
    if (json && typeof json === "object" && "ok" in json) return json as Reponse;
    return { ok: false, erreur: "Le serveur a répondu de façon inattendue. Réessayez dans un instant." };
  } catch {
    return { ok: false, erreur: "Pas de connexion. Vérifiez votre réseau, puis réessayez." };
  }
}

/* --- Petits éléments de formulaire ----------------------------------------- */

function Champ({
  id,
  label,
  aide,
  erreur,
  children,
}: {
  id: string;
  label: string;
  aide?: string;
  erreur?: string;
  children: ReactNode;
}) {
  return (
    <div className={erreur ? "adm-champ is-erreur" : "adm-champ"}>
      <label htmlFor={id}>{label}</label>
      {children}
      {aide && !erreur && <p className="adm-aide">{aide}</p>}
      {erreur && (
        <p className="adm-erreur" id={`${id}-erreur`} role="alert">
          {erreur}
        </p>
      )}
    </div>
  );
}

/* --- L'interface ---------------------------------------------------------------- */

export function Admin() {
  const [motDePasse, setMotDePasse] = useState("");
  const [connecte, setConnecte] = useState(false);
  const [chargement, setChargement] = useState(false);
  const [erreurGlobale, setErreurGlobale] = useState("");
  const [succes, setSucces] = useState("");

  const [sha, setSha] = useState("");
  const [publie, setPublie] = useState<Contenu | null>(null);
  const [prochaine, setProchaine] = useState<ProchaineForm | null>(null);
  const [sorties, setSorties] = useState<SortieForm[]>([]);
  const [paroles, setParoles] = useState<ParoleForm[]>([]);
  const [onglet, setOnglet] = useState<Onglet>("sorties");
  const [paroleASupprimer, setParoleASupprimer] = useState<string | null>(null);
  const [erreurs, setErreurs] = useState<ErreurContenu[]>([]);

  /** Sortie en cours d'édition (copie de travail) ; null si aucune. */
  const [edition, setEdition] = useState<{ sortie: SortieForm; nouvelle: boolean } | null>(null);
  const [erreursEdition, setErreursEdition] = useState<Record<string, string>>({});
  const [aSupprimer, setASupprimer] = useState<string | null>(null);

  const aujourdhui = aujourdhuiIso();

  function charger(contenu: Contenu, nouveauSha: string) {
    setPublie(contenu);
    setSha(nouveauSha);
    setProchaine(versProchaineForm(contenu));
    setSorties(contenu.ramassages.map(versSortieForm));
    setParoles(contenu.temoignages.map((t) => ({ cle: nouvelleCle(), ...t })));
    setParoleASupprimer(null);
    setErreurs([]);
    setEdition(null);
    setASupprimer(null);
  }

  async function seConnecter(e: FormEvent) {
    e.preventDefault();
    setChargement(true);
    setErreurGlobale("");
    const r = await appeler({ action: "lire", motDePasse });
    setChargement(false);
    if (!r.ok) {
      setErreurGlobale(r.erreur);
      return;
    }
    charger(r.contenu, r.sha);
    setConnecte(true);
  }

  function seDeconnecter() {
    setConnecte(false);
    setMotDePasse("");
    setPublie(null);
    setSucces("");
    setErreurGlobale("");
  }

  if (!connecte || !publie || !prochaine) {
    return (
      <main className="adm adm-connexion">
        <form className="adm-carte" onSubmit={seConnecter}>
          <p className="adm-marque">O&apos;Mégots</p>
          <h1>Mettre à jour les sorties</h1>
          <p className="adm-intro">Espace réservé aux bénévoles de l&apos;association.</p>
          <Champ id="mdp" label="Mot de passe" erreur={erreurGlobale || undefined}>
            <input
              id="mdp"
              type="password"
              autoComplete="current-password"
              value={motDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
              required
              aria-invalid={erreurGlobale ? true : undefined}
            />
          </Champ>
          <button className="adm-btn" type="submit" disabled={chargement || !motDePasse}>
            {chargement ? "Connexion…" : "Se connecter"}
          </button>
        </form>
      </main>
    );
  }

  // Erreurs rattachées aux champs : « prochaine.iso », « ramassages.2.litres »…
  const erreurDe = (champ: string) => erreurs.find((e) => e.champ === champ)?.message;
  const indexDe = (cle: string) => sorties.findIndex((s) => s.cle === cle);

  const ratio = calculerMegotsParLitre(publie.ramassages) || 800;
  const avant = calculerTotaux(publie.ramassages);
  const apres = calculerTotaux(sortiesPourTotaux(sorties));

  const verifie = validerContenu(brouillon(prochaine, sorties, paroles));
  const modifie = !verifie.ok || JSON.stringify(verifie.contenu) !== JSON.stringify(publie);

  function majProchaine(champ: keyof ProchaineForm, valeur: string) {
    setProchaine((p) => (p ? { ...p, [champ]: valeur } : p));
    setSucces("");
  }

  /* Édition d'une sortie */

  function ouvrir(sortie: SortieForm, nouvelle: boolean) {
    setEdition({ sortie: { ...sortie }, nouvelle });
    setErreursEdition({});
    setASupprimer(null);
    setSucces("");
  }

  function majPhotosEdition(photos: PhotoForm[]) {
    setEdition((e) => (e ? { ...e, sortie: { ...e.sortie, photos } } : e));
  }

  function majEdition(champ: Exclude<keyof SortieForm, "photos">, valeur: string) {
    setEdition((e) => (e ? { ...e, sortie: { ...e.sortie, [champ]: valeur } } : e));
  }

  function validerEdition() {
    if (!edition) return;
    const liste = edition.nouvelle
      ? [...sorties, edition.sortie]
      : sorties.map((s) => (s.cle === edition.sortie.cle ? edition.sortie : s));
    const i = liste.findIndex((s) => s.cle === edition.sortie.cle);
    const r = validerContenu(brouillon(prochaine as ProchaineForm, liste, paroles), aujourdhui);
    const prefixe = `ramassages.${i}.`;
    const propres = r.ok ? [] : r.erreurs.filter((e) => e.champ.startsWith(prefixe));
    if (propres.length > 0) {
      setErreursEdition(Object.fromEntries(propres.map((e) => [e.champ.slice(prefixe.length), e.message])));
      return;
    }
    setSorties(liste);
    setEdition(null);
    setErreursEdition({});
    setErreurs([]);
  }

  function supprimer(cle: string) {
    setSorties((l) => l.filter((s) => s.cle !== cle));
    setASupprimer(null);
    setErreurs([]);
    setSucces("");
  }

  /* Paroles de bénévoles */

  function majParole(cle: string, champ: "quote" | "nom" | "role", valeur: string) {
    setParoles((l) => l.map((t) => (t.cle === cle ? { ...t, [champ]: valeur } : t)));
    setSucces("");
  }

  function ajouterParole() {
    setParoles((l) => [{ cle: nouvelleCle(), quote: "", nom: "", role: "" }, ...l]);
    setSucces("");
  }

  function supprimerParole(cle: string) {
    setParoles((l) => l.filter((t) => t.cle !== cle));
    setParoleASupprimer(null);
    setErreurs([]);
    setSucces("");
  }

  const erreursSorties = erreurs.some((e) => !e.champ.startsWith("temoignages"));
  const erreursParoles = erreurs.some((e) => e.champ.startsWith("temoignages"));

  /* Enregistrement */

  async function enregistrer() {
    setErreurGlobale("");
    setSucces("");
    const r = validerContenu(brouillon(prochaine as ProchaineForm, sorties, paroles), aujourdhui);
    if (!r.ok) {
      setErreurs(r.erreurs);
      setErreurGlobale("Certaines informations sont à corriger : elles sont signalées en rouge.");
      setOnglet(r.erreurs[0]?.champ.startsWith("temoignages") ? "paroles" : "sorties");
      return;
    }
    setChargement(true);
    // Seules les photos nouvelles (pas encore en ligne) partent avec leurs octets.
    const nouvelles = sorties.flatMap((so) =>
      so.photos.flatMap((ph) => (ph.donnees ? [{ src: ph.src, donnees: ph.donnees }] : [])),
    );
    const rep = await appeler({ action: "enregistrer", motDePasse, contenu: r.contenu, sha, photos: nouvelles });
    setChargement(false);
    if (!rep.ok) {
      setErreurs(rep.erreurs ?? []);
      setErreurGlobale(rep.erreur);
      return;
    }
    charger(rep.contenu, rep.sha);
    setSucces(
      "C'est enregistré. Le site se met à jour tout seul : comptez environ une minute avant de voir les changements en ligne.",
    );
  }

  const sortiesAffichees = [...sorties].reverse();

  return (
    <main className="adm">
      <header className="adm-tete">
        <div>
          <p className="adm-marque">O&apos;Mégots</p>
          <h1>Mettre à jour le site</h1>
        </div>
        <button className="adm-lien" type="button" onClick={seDeconnecter}>
          Se déconnecter
        </button>
      </header>

      <nav className="adm-onglets" aria-label="Rubriques">
        <button
          type="button"
          className={onglet === "sorties" ? "is-on" : undefined}
          aria-pressed={onglet === "sorties"}
          onClick={() => setOnglet("sorties")}
        >
          Sorties{erreursSorties && <span className="adm-onglet-alerte" aria-label="(à corriger)" />}
        </button>
        <button
          type="button"
          className={onglet === "paroles" ? "is-on" : undefined}
          aria-pressed={onglet === "paroles"}
          onClick={() => setOnglet("paroles")}
        >
          Paroles de bénévoles
          {erreursParoles && <span className="adm-onglet-alerte" aria-label="(à corriger)" />}
        </button>
      </nav>

      {succes && (
        <p className="adm-bandeau is-ok" role="status">
          {succes}
        </p>
      )}

      {onglet === "sorties" && (
        <>
          {/* --- Prochaine sortie --- */}
          <section className="adm-carte" aria-labelledby="adm-prochaine">
            <h2 id="adm-prochaine">Prochaine sortie</h2>
            <fieldset className="adm-choix">
              <legend className="sr-only">Statut de la prochaine sortie</legend>
              <label className={prochaine.statut === "a-fixer" ? "is-on" : undefined}>
                <input
                  type="radio"
                  name="statut"
                  checked={prochaine.statut === "a-fixer"}
                  onChange={() => majProchaine("statut", "a-fixer")}
                />
                Date à fixer
              </label>
              <label className={prochaine.statut === "annoncee" ? "is-on" : undefined}>
                <input
                  type="radio"
                  name="statut"
                  checked={prochaine.statut === "annoncee"}
                  onChange={() => majProchaine("statut", "annoncee")}
                />
                Date annoncée
              </label>
            </fieldset>

            {prochaine.statut === "a-fixer" ? (
              <p className="adm-aide">
                Le site affiche « Date à fixer » et propose de laisser son e-mail pour être prévenu.
              </p>
            ) : (
              <>
                <div className="adm-ligne">
                  <Champ id="p-iso" label="Date" erreur={erreurDe("prochaine.iso")}>
                    <input
                      id="p-iso"
                      type="date"
                      min={aujourdhui}
                      value={prochaine.iso}
                      onChange={(e) => majProchaine("iso", e.target.value)}
                    />
                  </Champ>
                  <Champ id="p-heure" label="Heure du rendez-vous" erreur={erreurDe("prochaine.heure")}>
                    <input
                      id="p-heure"
                      type="time"
                      step={900}
                      value={prochaine.heure}
                      onChange={(e) => majProchaine("heure", e.target.value)}
                    />
                  </Champ>
                </div>
                <Champ
                  id="p-lieu"
                  label="Lieu du rendez-vous"
                  aide="Par exemple : devant la mairie de Saint-Nazaire"
                  erreur={erreurDe("prochaine.lieu")}
                >
                  <input id="p-lieu" value={prochaine.lieu} onChange={(e) => majProchaine("lieu", e.target.value)} />
                </Champ>
                <div className="adm-ligne">
                  <Champ id="p-libelle" label="Nom de la sortie (facultatif)" aide="Par exemple : Mois sans tabac">
                    <input
                      id="p-libelle"
                      value={prochaine.libelle}
                      onChange={(e) => majProchaine("libelle", e.target.value)}
                    />
                  </Champ>
                  <Champ id="p-duree" label="Durée (facultatif)" aide="Par exemple : 2 h">
                    <input id="p-duree" value={prochaine.duree} onChange={(e) => majProchaine("duree", e.target.value)} />
                  </Champ>
                </div>
                <Champ id="p-note" label="Précision (facultatif)" aide="Une phrase affichée sous le rendez-vous.">
                  <textarea
                    id="p-note"
                    rows={2}
                    value={prochaine.note}
                    onChange={(e) => majProchaine("note", e.target.value)}
                  />
                </Champ>
                {prochaine.iso && prochaine.heure && (
                  <p className="adm-apercu">
                    Sur le site : <b>{prochaine.libelle || "Prochain ramassage"} : {dateLongue(prochaine.iso)}.</b> Rendez-vous
                    à {heureTexte(prochaine.heure)}
                    {prochaine.lieu ? `, ${prochaine.lieu}` : ""}.
                  </p>
                )}
              </>
            )}
          </section>

          {/* --- Ramassages --- */}
          <section className="adm-carte" aria-labelledby="adm-ramassages">
            <div className="adm-carte-tete">
              <h2 id="adm-ramassages">Ramassages faits</h2>
              {!edition && (
                <button className="adm-btn is-petit" type="button" onClick={() => ouvrir(sortieVide(), true)}>
                  + Ajouter une sortie
                </button>
              )}
            </div>

            {edition?.nouvelle && (
              <FormSortie
                sortie={edition.sortie}
                erreurs={erreursEdition}
                ratio={ratio}
                aujourdhui={aujourdhui}
                onChange={majEdition}
                onPhotos={majPhotosEdition}
                onValider={validerEdition}
                onAnnuler={() => setEdition(null)}
              />
            )}

            <ul className="adm-liste">
              {sortiesAffichees.map((s) => {
                const enEdition = edition && !edition.nouvelle && edition.sortie.cle === s.cle;
                const i = indexDe(s.cle);
                const aCorriger = erreurs.some((e) => e.champ.startsWith(`ramassages.${i}.`));
                if (enEdition) {
                  return (
                    <li key={s.cle}>
                      <FormSortie
                        sortie={edition.sortie}
                        erreurs={erreursEdition}
                        ratio={ratio}
                        aujourdhui={aujourdhui}
                        onChange={majEdition}
                        onPhotos={majPhotosEdition}
                        onValider={validerEdition}
                        onAnnuler={() => setEdition(null)}
                      />
                    </li>
                  );
                }
                return (
                  <li key={s.cle} className={aCorriger ? "adm-sortie is-erreur" : "adm-sortie"}>
                    <div className="adm-sortie-info">
                      <p className="adm-sortie-date">{s.iso ? dateLongue(s.iso) : "Date à préciser"}</p>
                      <p className="adm-sortie-nom">
                        {s.libelle || "Sans nom"}
                        {s.lieu ? `, ${s.lieu}` : ""}
                      </p>
                      <p className="adm-sortie-chiffres">
                        {s.litres || "?"} L · {s.megots ? fr(nombreSaisi(s.megots)) : "?"} mégots · {s.benevoles || "?"}{" "}
                        bénévoles
                      </p>
                      {s.photos.length > 0 && (
                        <p className="adm-aide">
                          {s.photos.length} photo{s.photos.length > 1 ? "s" : ""}
                        </p>
                      )}
                      {aCorriger && <p className="adm-erreur">À corriger : ouvrez « Modifier ».</p>}
                    </div>
                    {aSupprimer === s.cle ? (
                      <div className="adm-confirmer" role="group" aria-label="Confirmer la suppression">
                        <p>Supprimer cette sortie ?</p>
                        <button className="adm-btn is-danger" type="button" onClick={() => supprimer(s.cle)}>
                          Oui, supprimer
                        </button>
                        <button className="adm-btn is-second" type="button" onClick={() => setASupprimer(null)}>
                          Annuler
                        </button>
                      </div>
                    ) : (
                      !edition && (
                        <div className="adm-actions">
                          <button className="adm-btn is-second" type="button" onClick={() => ouvrir(s, false)}>
                            Modifier
                          </button>
                          <button
                            className="adm-btn is-second is-danger-texte"
                            type="button"
                            onClick={() => setASupprimer(s.cle)}
                            disabled={sorties.length <= 1}
                            title={sorties.length <= 1 ? "Il faut garder au moins une sortie." : undefined}
                          >
                            Supprimer
                          </button>
                        </div>
                      )
                    )}
                  </li>
                );
              })}
            </ul>
            {erreurDe("ramassages") && <p className="adm-erreur">{erreurDe("ramassages")}</p>}
          </section>

          {/* --- Aperçu des totaux --- */}
          <section className="adm-carte" aria-labelledby="adm-totaux">
            <h2 id="adm-totaux">Ce qui s&apos;affichera sur le site</h2>
            <ul className="adm-totaux">
              <Total label="sorties" avant={avant.sorties} apres={apres.sorties} />
              <Total label="litres de mégots" avant={avant.litres} apres={apres.litres} />
              <Total label="mégots" avant={avant.megots} apres={apres.megots} />
              <Total label="bénévoles" avant={avant.benevoles} apres={apres.benevoles} />
              <Total label="litres d'eau épargnés" avant={avant.eau} apres={apres.eau} />
              <Total
                label="mégots par litre"
                avant={calculerMegotsParLitre(publie.ramassages)}
                apres={calculerMegotsParLitre(sortiesPourTotaux(sorties))}
              />
            </ul>
          </section>

        </>
      )}

      {/* --- Paroles de bénévoles --- */}
      {onglet === "paroles" && (
        <section className="adm-carte" aria-labelledby="adm-paroles">
          <div className="adm-carte-tete">
            <h2 id="adm-paroles">Paroles de bénévoles</h2>
            {paroles.length < MAX_PAROLES && (
              <button className="adm-btn is-petit" type="button" onClick={ajouterParole}>
                + Ajouter une parole
              </button>
            )}
          </div>
          <p className="adm-aide adm-paroles-intro">
            Une ou deux phrases d&apos;un bénévole, avec son accord. Elles s&apos;affichent sur la page d&apos;accueil
            et la page L&apos;association, dans l&apos;ordre de cette liste.
          </p>
          {paroles.length === 0 && <p className="adm-aide">Aucune parole pour le moment.</p>}
          <ul className="adm-liste">
            {paroles.map((t, i) => {
              const id = (n: string) => `${t.cle}-${n}`;
              return (
                <li key={t.cle} className="adm-parole">
                  <Champ
                    id={id("quote")}
                    label="Ce qu'il ou elle a dit"
                    aide={`${t.quote.length} / ${MAX_CARACTERES_PAROLE} caractères, sans les guillemets.`}
                    erreur={erreurDe(`temoignages.${i}.quote`)}
                  >
                    <textarea
                      id={id("quote")}
                      rows={3}
                      value={t.quote}
                      onChange={(e) => majParole(t.cle, "quote", e.target.value)}
                    />
                  </Champ>
                  <div className="adm-ligne">
                    <Champ
                      id={id("nom")}
                      label="Prénom et initiale"
                      aide="Par exemple : Pamela D."
                      erreur={erreurDe(`temoignages.${i}.nom`)}
                    >
                      <input id={id("nom")} value={t.nom} onChange={(e) => majParole(t.cle, "nom", e.target.value)} />
                    </Champ>
                    <Champ id={id("role")} label="Précision (facultatif)" aide="Par exemple : bénévole depuis mai">
                      <input id={id("role")} value={t.role} onChange={(e) => majParole(t.cle, "role", e.target.value)} />
                    </Champ>
                  </div>
                  {paroleASupprimer === t.cle ? (
                    <div className="adm-confirmer" role="group" aria-label="Confirmer la suppression">
                      <p>Supprimer cette parole ?</p>
                      <button className="adm-btn is-danger" type="button" onClick={() => supprimerParole(t.cle)}>
                        Oui, supprimer
                      </button>
                      <button className="adm-btn is-second" type="button" onClick={() => setParoleASupprimer(null)}>
                        Annuler
                      </button>
                    </div>
                  ) : (
                    <button
                      className="adm-lien is-danger"
                      type="button"
                      onClick={() => setParoleASupprimer(t.cle)}
                    >
                      Supprimer cette parole
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
          {erreurDe("temoignages") && <p className="adm-erreur">{erreurDe("temoignages")}</p>}
        </section>
      )}

      {/* --- Enregistrer --- */}
      <div className="adm-pied">
        {erreurGlobale && (
          <p className="adm-bandeau is-erreur" role="alert">
            {erreurGlobale}
          </p>
        )}
        <button
          className="adm-btn is-grand"
          type="button"
          onClick={enregistrer}
          disabled={chargement || !modifie || edition !== null}
        >
          {chargement ? "Enregistrement…" : modifie ? "Enregistrer et mettre en ligne" : "Aucune modification"}
        </button>
        {edition && <p className="adm-aide">Validez ou annulez la sortie en cours avant d&apos;enregistrer.</p>}
      </div>
    </main>
  );
}

function Total({ label, avant, apres }: { label: string; avant: number; apres: number }) {
  const change = avant !== apres;
  return (
    <li className={change ? "is-change" : undefined}>
      <b>{fr(apres)}</b>
      <span>{label}</span>
      {change && <small>avant : {fr(avant)}</small>}
    </li>
  );
}

function FormSortie({
  sortie,
  erreurs,
  ratio,
  aujourdhui,
  onChange,
  onPhotos,
  onValider,
  onAnnuler,
}: {
  sortie: SortieForm;
  erreurs: Record<string, string>;
  ratio: number;
  aujourdhui: string;
  onChange: (champ: Exclude<keyof SortieForm, "photos">, valeur: string) => void;
  onPhotos: (photos: PhotoForm[]) => void;
  onValider: () => void;
  onAnnuler: () => void;
}) {
  const id = (n: string) => `${sortie.cle}-${n}`;
  const litres = nombreSaisi(sortie.litres);
  const estimation = Number.isFinite(litres) && litres > 0 ? Math.round(litres * ratio) : null;

  return (
    <div className="adm-form" role="group" aria-label="Sortie">
      <Champ
        id={id("iso")}
        label="Date de la sortie"
        aide="Laissez vide si vous ne la connaissez pas encore : le site affichera « Date à préciser »."
        erreur={erreurs.iso}
      >
        <input
          id={id("iso")}
          type="date"
          max={aujourdhui}
          value={sortie.iso}
          onChange={(e) => onChange("iso", e.target.value)}
        />
      </Champ>
      <Champ id={id("libelle")} label="Nom de la sortie" aide="Par exemple : Mégothon, Ramassage du port" erreur={erreurs.libelle}>
        <input id={id("libelle")} value={sortie.libelle} onChange={(e) => onChange("libelle", e.target.value)} />
      </Champ>
      <Champ id={id("lieu")} label="Lieu" aide="Par exemple : de la mairie au Paquebot" erreur={erreurs.lieu}>
        <input id={id("lieu")} value={sortie.lieu} onChange={(e) => onChange("lieu", e.target.value)} />
      </Champ>
      <div className="adm-ligne">
        <Champ id={id("litres")} label="Litres ramassés" aide="Par exemple : 6 ou 1,25" erreur={erreurs.litres}>
          <input
            id={id("litres")}
            inputMode="decimal"
            value={sortie.litres}
            onChange={(e) => onChange("litres", e.target.value)}
          />
        </Champ>
        <Champ id={id("benevoles")} label="Bénévoles" erreur={erreurs.benevoles}>
          <input
            id={id("benevoles")}
            inputMode="numeric"
            value={sortie.benevoles}
            onChange={(e) => onChange("benevoles", e.target.value)}
          />
        </Champ>
      </div>
      <Champ id={id("megots")} label="Nombre de mégots" erreur={erreurs.megots}>
        <input
          id={id("megots")}
          inputMode="numeric"
          value={sortie.megots}
          onChange={(e) => onChange("megots", e.target.value)}
        />
      </Champ>
      {estimation !== null && (
        <button className="adm-lien" type="button" onClick={() => onChange("megots", String(estimation))}>
          Remplir avec l&apos;estimation : {sortie.litres} L × {fr(ratio)} = {fr(estimation)} mégots
        </button>
      )}
      <div className="adm-ligne">
        <Champ id={id("duree")} label="Durée (facultatif)" aide="Par exemple : 2 h">
          <input id={id("duree")} value={sortie.duree} onChange={(e) => onChange("duree", e.target.value)} />
        </Champ>
      </div>
      <Champ id={id("note")} label="Une phrase sur la sortie (facultatif)">
        <textarea id={id("note")} rows={2} value={sortie.note} onChange={(e) => onChange("note", e.target.value)} />
      </Champ>
      <PhotosSortie sortie={sortie} erreurs={erreurs} onPhotos={onPhotos} />
      <div className="adm-actions">
        <button className="adm-btn" type="button" onClick={onValider}>
          Valider cette sortie
        </button>
        <button className="adm-btn is-second" type="button" onClick={onAnnuler}>
          Annuler
        </button>
      </div>
    </div>
  );
}

function PhotosSortie({
  sortie,
  erreurs,
  onPhotos,
}: {
  sortie: SortieForm;
  erreurs: Record<string, string>;
  onPhotos: (photos: PhotoForm[]) => void;
}) {
  const [preparation, setPreparation] = useState(false);
  const [probleme, setProbleme] = useState("");
  const reste = MAX_PHOTOS_PAR_SORTIE - sortie.photos.length;
  const idChoix = `${sortie.cle}-photos`;

  async function ajouter(fichiers: FileList | null) {
    if (!fichiers || fichiers.length === 0) return;
    setProbleme("");
    setPreparation(true);
    const choisis = Array.from(fichiers).slice(0, reste);
    const prets: PhotoForm[] = [];
    for (const f of choisis) {
      try {
        prets.push(await preparerPhoto(f, sortie.iso));
      } catch {
        setProbleme(`« ${f.name} » n'a pas pu être lue. Essayez une photo au format JPEG ou PNG.`);
      }
    }
    setPreparation(false);
    if (fichiers.length > reste) {
      setProbleme(`${MAX_PHOTOS_PAR_SORTIE} photos au maximum par sortie : les suivantes n'ont pas été ajoutées.`);
    }
    onPhotos([...sortie.photos, ...prets]);
  }

  function majAlt(i: number, alt: string) {
    onPhotos(sortie.photos.map((p, j) => (j === i ? { ...p, alt } : p)));
  }

  function retirer(i: number) {
    onPhotos(sortie.photos.filter((_, j) => j !== i));
  }

  return (
    <div className="adm-photos">
      <p className="adm-photos-titre">Photos (facultatif)</p>
      {sortie.photos.length > 0 && (
        <ul className="adm-photos-liste">
          {sortie.photos.map((p, i) => {
            const erreur = erreurs[`photos.${i}`];
            const idAlt = `${sortie.cle}-alt-${i}`;
            return (
              <li key={p.src} className={erreur ? "is-erreur" : undefined}>
                {/* Aperçu local : la photo n'est pas encore en ligne, next/image ne s'applique pas. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.apercu ?? p.src} alt="" width={p.w} height={p.h} />
                <div className="adm-photo-champs">
                  <Champ
                    id={idAlt}
                    label={i === 0 ? "Description (photo en grand)" : "Description"}
                    aide="Ce qu'on voit, en quelques mots. Par exemple : les bénévoles devant la mairie."
                    erreur={erreur}
                  >
                    <input id={idAlt} value={p.alt} onChange={(e) => majAlt(i, e.target.value)} />
                  </Champ>
                  <button className="adm-lien is-danger" type="button" onClick={() => retirer(i)}>
                    Retirer cette photo
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      {erreurs.photos && <p className="adm-erreur">{erreurs.photos}</p>}
      {probleme && <p className="adm-erreur">{probleme}</p>}
      {reste > 0 ? (
        <label className={preparation ? "adm-btn is-second is-occupe" : "adm-btn is-second"} htmlFor={idChoix}>
          {preparation ? "Préparation des photos…" : "+ Ajouter des photos"}
          <input
            id={idChoix}
            className="sr-only"
            type="file"
            accept="image/*"
            multiple
            disabled={preparation}
            onChange={(e) => {
              void ajouter(e.target.files);
              e.target.value = "";
            }}
          />
        </label>
      ) : (
        <p className="adm-aide">{MAX_PHOTOS_PAR_SORTIE} photos au maximum : retirez-en une pour en ajouter une autre.</p>
      )}
      <p className="adm-aide">Les photos sont réduites sur votre téléphone avant l&apos;envoi : rien ne part en pleine taille.</p>
    </div>
  );
}
