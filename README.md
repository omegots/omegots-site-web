# O'Mégots — site

Site vitrine Next.js (App Router) pour l'association O'Mégots.

## Démarrer

```bash
npm install
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000).

## Stack

- Next.js 16 + React 19
- Motion (apparitions au scroll)
- Polices auto-hébergées via `next/font` (Poppins, Unbounded) — pas de CDN Google
- CSS global (identité : `#1A4B6E`, `#2A8C7E`, `#F5EFE0`, `#DD8A2E`)

## Structure

```
src/app/           pages (accueil, mentions légales)
src/components/    Header, Hero, Chiffres, Mission, Megothon, Temoignages,
                   Presse, Devenir, Rejoindre, Footer, Reveal, SvgSprites
src/components/motion/  useCountUp (compteurs), MagneticButton
src/data/          ramassages.ts (sorties + totaux), chiffres.ts, presse.ts, temoignages.ts
public/photos/     photos du Mégothon (recadrées depuis ../images)
public/logo/       SVG logo
public/favicon/    favicons
public/__forms.html  déclaration statique du formulaire « prevenir » (Netlify Forms)
```

## Page d'accueil (V2, 15/09/2026)

Une seule page, huit sections, sans scroll épinglé : hero (photo + grand pont qui se
dessine sur l'eau), chiffres « pourquoi ça compte » (le 500 L se remplit d'eau en vague),
ce qu'on fait, Mégothon en chiffres et en mosaïque photo avec le bandeau « prochaine sortie »
(formulaire e-mail Netlify Forms, composant `FormPrevenir`), témoignages, presse, recyclage,
CTA orange plein : un titre blanc centré et deux boutons. Des vagues sinus animées
(`WaveDivider`, 32 s par boucle) séparent chaque section.

Le formulaire poste en `application/x-www-form-urlencoded` vers `/__forms.html`
(motif recommandé par Netlify pour Next.js). En local, l'envoi échoue et le site
propose l'adresse e-mail en repli : c'est attendu.

### Six pages (15/09/2026, fin de journée)

Architecture arrêtée : `/` (accueil qui résume), `/le-megot` (pédagogie, SEO national), `/ramassages`
(SEO local, calendrier et bilans), `/recyclage`, `/rejoindre` (conversion), `/association` (confiance,
presse, contact), plus `/jeu` et `/mentions-legales` hors menu. Gabarit commun `PageShell`. Les pages
intérieures sont pour l'instant assemblées à partir des sections de l'accueil, avec un encart « à venir » :
elles seront enrichies de contenus sourcés. Menu et footer branchés sur ces pages, état actif par URL.
Liste des manques à demander à l'association : `../CONTENUS-MANQUANTS.md`.

### Lots d'animation (15/09/2026, après-midi)

Lot 1 et lot 2 de `../maquette/IDEES-ANIMATIONS.md` implémentés, plus le mini-jeu
« La marée monte » (`src/components/jeu/Maree.tsx`) : section `#jeu` sur l'accueil et page
`/jeu` en version plus haute. L'eau monte en 14 s, chaque mégot atteint part à l'eau, chaque
mégot touché est sauvé ; le résultat compare aux chiffres du Mégothon. Le premier jeu
(« 10 secondes de ramassage ») est archivé dans `../maquette/composants-v1-archive/jeu-10s/`.
Témoignages signés (noms tels que publiés sur omegots.fr) et logos typographiques des médias
(`presse/MediaLogo.tsx`, à remplacer par les fichiers officiels si l'association les obtient).
Chaque fonctionnalité a son CSS dans `src/styles/*.css`, importé après `globals.css`
dans `layout.tsx` (le jeu importe le sien depuis sa page). Composants par section :
`hero/`, `megothon/`, `devenir/`, `presse/`, `jeu/`.

Piège connu : Chrome considère qu'un élément entièrement rogné par `clip-path` n'est
pas visible pour IntersectionObserver ; la direction « rise » de `Reveal` pose donc le
clip sur un enfant et observe le parent.

Les composants de la V1 (hero épinglé, 500 L épinglé, pipeline, carte, citation
défilante) sont archivés dans `../maquette/composants-v1-archive/`.

## Performance, accessibilité, FAQ (20/09/2026)

Build de production audité avec Lighthouse 12 : desktop 100 / 100 / 100 / 100,
mobile 88 à 92 en performance (le reste à 100). Ce qui a été fait, et pourquoi :

- **Entrées du hero et de la page en CSS, sans opacité.** `template.tsx` et `Hero.tsx` sont
  des composants serveur ; les blocs glissent en place (`.hero-in`, `.page-enter`). Chrome ne
  compte un élément pour le LCP qu'à la fin de son animation d'opacité : un fondu Motion après
  hydratation décalait la mesure de 2,5 s.
- **Images** : AVIF puis WebP (`next.config.ts`), qualité 65 pour les photos (Next 16 n'accepte
  que les qualités listées dans `images.qualities`), `fetchPriority="high"` sur la photo du hero,
  logo GHIS en SVG (`public/logo/ghis-blanc.svg`) au lieu d'un PNG de 1 800 px.
- **Polices** : Unbounded en une seule graisse (800) : Google renvoie la police variable de 51 Ko
  dès que deux graisses sont demandées, contre 22 Ko pour une instance statique. Les anciens
  `600`/`700` de la police titre sont passés en 800, les questions de la FAQ sont en Poppins 600.
- **Liens** : `prefetch={false}` sur le menu et le pied de page (préchargement au survol seulement).
- **Limite connue sur mobile** : Lighthouse simule un réseau 4G lent et compte tout fichier
  téléchargé avant le LCP, JavaScript compris (React + Next ≈ 120 Ko gz, Motion ≈ 45 Ko). Le 100
  mobile demanderait de retirer Motion ou de ne plus hydrater la page d'accueil.
- **Accessibilité 100** : une seule liste `<ul role="list">` dans le bandeau « Ce qui nous guide »
  (la copie de défilement est `aria-hidden`), boutons dans l'orange exact de la charte
  `#DD8A2E` avec texte blanc, choix assumé : ce blanc fait 2,7:1, sous le seuil AA de 4,5, Lighthouse
  signale donc « color-contrast » sur les boutons (accessibilité 92 au lieu de 100 ; le bleu nuit sur
  orange passait mais ne ressortait pas), `--orange-ink` et `--vert-ink` pour les textes orange
  et vert d'eau sur fond clair, anneau de focus bleu nuit + crème lisible sur tous les fonds.
- **Palette** : une seule couleur claire, le crème `#F5EFE0` (`--card` = `--bg`) ; plus de blanc ni
  de teinte intermédiaire. Les sections alternent crème, bleu nuit (`surface-navy`, Mégothon et
  Recyclage y compris), vert d'eau et orange. Les boutons seuls dans leur section sont pleins.
- **FAQ** (`Faq.tsx`, `data/faq.ts`, `styles/faq.css`) après la section orange : `<details name="faq">`
  natifs, une réponse ouverte à la fois, balisage `FAQPage` (schema.org) dans `page.tsx`. Les
  réponses ne reprennent que des faits déjà publiés par l'association.
- `fr()` (format des nombres) vit dans `src/data/format.ts`, importable côté serveur.
