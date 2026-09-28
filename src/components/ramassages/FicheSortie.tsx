import Image from "next/image";
import { fr } from "@/data/format";
import { MEGOTS_PAR_METRE } from "@/data/megot";
import { articlesPresse } from "@/data/presse";
import { LITRES_EAU_PAR_MEGOT, megotsParLitre, type Ramassage } from "@/data/ramassages";
import { sourcesRamassages } from "@/data/ramassages-page";
import { Ref } from "../megot/Ref";
import { Reveal } from "../Reveal";

const PHOTOS = [
  { src: "/photos/megothon-groupe.jpg", alt: "Les bénévoles du Mégothon réunis devant la mairie de Saint-Nazaire.", w: 1200, h: 900 },
  { src: "/photos/megothon-ramassage.jpg", alt: "Un bénévole ramasse des mégots au sol, à la pince.", w: 1200, h: 900 },
  { src: "/photos/megothon-bouteilles.jpg", alt: "Six bouteilles remplies de mégots ramassés, posées sur un muret.", w: 1200, h: 1026 },
];

/**
 * La fiche d'une sortie : date, parcours, les quatre chiffres, les équivalents,
 * les photos et l'article de presse s'il existe. Générée depuis ramassages.ts,
 * donc chaque nouvelle sortie ajoute une fiche sans toucher au code.
 */
export function FicheSortie({ sortie, premiere }: { sortie: Ramassage; premiere: boolean }) {
  const eau = sortie.megots * LITRES_EAU_PAR_MEGOT;
  const metres = sortie.megots / MEGOTS_PAR_METRE;
  const article = articlesPresse.find((a) => a.title.toLowerCase().includes(sortie.libelle.toLowerCase()));

  return (
    <article className="fiche" aria-labelledby={`fiche-${sortie.date.replace(/\s/g, "-")}`}>
      <Reveal direction="rise" className="fiche-tete">
        <p className="fiche-date display">{sortie.date}</p>
        <h3 id={`fiche-${sortie.date.replace(/\s/g, "-")}`} className="display">
          {sortie.libelle}, {sortie.lieu}
        </h3>
        <p className="fiche-note">{sortie.note}</p>
      </Reveal>

      <div className="fiche-corps">
        <Reveal className="fiche-chiffres" delay={0.05}>
          <ul>
            <li>
              <b className="display">{sortie.benevoles}</b>
              <span>bénévoles</span>
            </li>
            <li>
              <b className="display">{sortie.duree}</b>
              <span>de ramassage</span>
            </li>
            <li>
              <b className="display">{sortie.litres} L</b>
              <span>de mégots, mesurés au contenant gradué</span>
            </li>
            <li>
              <b className="display">{fr(sortie.megots)}</b>
              <span>mégots environ, à {fr(megotsParLitre())} par litre</span>
            </li>
          </ul>
          <ul className="fiche-equiv">
            <li>
              jusqu&apos;à <b>{fr(eau)} L</b> d&apos;eau douce épargnés, à {fr(LITRES_EAU_PAR_MEGOT)} litres par mégot (ordre de grandeur)
              <Ref ids={[2]} liste={sourcesRamassages} />
            </li>
            <li>
              <b>{fr(Math.round(metres / 100) / 10)} km</b> de rue à la densité moyenne française, 1,3 mégot tous les dix
              mètres
              <Ref ids={[3]} liste={sourcesRamassages} />
            </li>
          </ul>
          {article && (
            <a className="fiche-presse" href={article.href} target="_blank" rel="noopener noreferrer">
              <span className="fiche-presse-media">{article.media}</span>
              <span className="fiche-presse-titre">{article.title}</span>
              <span aria-hidden="true">↗</span>
            </a>
          )}
        </Reveal>

        {premiere && (
          <Reveal className="fiche-photos" delay={0.1}>
            {PHOTOS.map((p, i) => (
              <figure key={p.src} className={`fiche-photo is-${i + 1}`}>
                <Image src={p.src} alt={p.alt} width={p.w} height={p.h} sizes="(max-width: 860px) 100vw, 360px" quality={65} />
              </figure>
            ))}
          </Reveal>
        )}
      </div>
    </article>
  );
}
