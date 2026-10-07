import { fr } from "@/data/format";
import { LITRES_EAU_PAR_MEGOT, megotsParLitre, prochaineSortie, ramassages, totals } from "@/data/ramassages";

/** llms.txt, généré au build : les chiffres suivent src/data/contenu.json. */
export const dynamic = "force-static";

export function GET() {
  const premiere = ramassages[0];
  const t = totals();
  const p = prochaineSortie();
  const prochaine =
    p.statut === "annoncee"
      ? `${p.libelle || "Ramassage"} le ${p.date} à ${p.heure}, ${p.lieu}. Gratuit, ouvert à toutes et tous.`
      : "Date à fixer. Alerte e-mail sur https://omegots.fr/ramassages#prochaine.";

  const texte = `# O'Mégots

> Association citoyenne loi 1901 basée à Besné (Loire-Atlantique, France). Elle organise des ramassages de mégots à Saint-Nazaire et dans ses alentours, compte ce qui est ramassé et publie les chiffres. Participer est gratuit et ouvert à tout âge ; l'adhésion est symbolique (1 euro).

Site : https://omegots.fr
Contact : association.o.megots@gmail.com
Instagram : https://www.instagram.com/asso.omegots/
Siège : Besné (44160), Loire-Atlantique
Statut : association loi 1901, RNA W443012511, SIRET 104 488 408 00014
Directeur de la publication : Romain Perrais (président)

## Ce que fait l'association

- Ramassages ponctuels de mégots dans les rues, parcs, espaces verts, bords de Loire, sentiers, bords de route et plages de Saint-Nazaire et ses environs, ouverts à toutes et tous.
- Comptage : chaque sortie est mesurée dans un contenant gradué (environ ${fr(megotsParLitre())} mégots par litre) et les chiffres sont publiés.
- Sensibilisation sans jugement des fumeurs : le mégot est un déchet, pas une faute.
- Ambition : collaborer avec des filières de recyclage (mobilier urbain, cendriers, emballages industriels, valorisation énergétique).

## Première action : le ${premiere.libelle} du ${premiere.date}

- Centre-ville de Saint-Nazaire, ${premiere.lieu}.
- ${premiere.benevoles} bénévoles${premiere.duree ? `, ${premiere.duree} de ramassage` : ""}, ${fr(premiere.litres)} litres de mégots, soit environ ${fr(premiere.megots)} mégots.
- Chiffre de sensibilisation utilisé par l'association : un mégot peut polluer jusqu'à ${LITRES_EAU_PAR_MEGOT} litres d'eau.

## Toutes les sorties

- ${t.sorties} ${t.sorties > 1 ? "sorties" : "sortie"}, ${t.benevoles} bénévoles, ${fr(t.litres)} litres de mégots, soit environ ${fr(t.megots)} mégots.

## Prochaine sortie

- ${prochaine}

## Chiffres sourcés (détail et références sur https://omegots.fr/le-megot)

- Le filtre d'une cigarette est en acétate de cellulose, un plastique : 7,5 ans (compost) à 14 ans (sol) pour se dégrader, jusqu'à 30 ans dans la rue (Joly et Coulis, Waste Management, 2018).
- Plus de 7 000 substances dans la fumée d'une cigarette ; le filtre en retient une partie et la relâche dans l'eau (Novotny et al., 2009).
- Plus de 23 milliards de mégots jetés au sol chaque année en France ; objectif de l'État : 40 % de moins d'ici 2027 (ministère de la Transition écologique, 2021).
- En moyenne 1,3 mégot tous les dix mètres de rue en France, 4,5 dans les grandes villes (Alcome et ADEME, 2024).
- « Jusqu'à ${LITRES_EAU_PAR_MEGOT} litres d'eau polluée par mégot » est un ordre de grandeur, pas une mesure de laboratoire.

## Presse

- Saint-Nazaire News : « Mégothon de Saint-Nazaire : 6 litres de mégots récoltés en 2h, de la mairie au Paquebot » https://www.saintnazairenews.fr/news/megothon-de-saint-nazaire-6-litres-de-megots-recoltes-en-2h-de-la-mairie-au-paquebot
- Saint-Nazaire News : « Saint-Nazaire : 2 jeunes créent une association pour lutter contre la pollution des mégots » https://www.saintnazairenews.fr/news/saint-nazaire-2-jeunes-creent-une-association-pour-lutter-contre-la-pollution-des-megots
- Ouest-France : « Malgré les cendriers, à Saint-Nazaire, des mégots plein les trottoirs et les rues » https://www.ouest-france.fr/pays-de-la-loire/saint-nazaire-44600/malgre-les-cendriers-a-saint-nazaire-des-megots-plein-les-trottoirs-et-les-rues-5bd94d56-34be-11f1-aa8d-862764c4f0ec

## Pages

- [Accueil](https://omegots.fr/) : présentation, chiffres clés, Mégothon, témoignages, presse, recyclage, FAQ.
- [Le mégot](https://omegots.fr/le-megot) : de quoi est fait un mégot et ce qu'il libère dans l'eau.
- [Nos ramassages](https://omegots.fr/ramassages) : sorties, bilans chiffrés, prochaine date.
- [Le recyclage](https://omegots.fr/recyclage) : que deviennent les mégots ramassés.
- [Nous rejoindre](https://omegots.fr/rejoindre) : venir ramasser, adhérer, proposer un partenariat.
- [Contact](https://omegots.fr/contact) : formulaire, adhésion, don.
- [L'association](https://omegots.fr/association) : mission, principes, presse, fiche d'identité.
- [Mentions légales et confidentialité](https://omegots.fr/mentions-legales)
`;

  return new Response(texte, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
