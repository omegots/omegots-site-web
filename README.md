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
