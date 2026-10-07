import Image from "next/image";
import { fr } from "@/data/format";
import { MEGOTS_PAR_METRE } from "@/data/megot";
import { articlesPresse } from "@/data/presse";
import { LITRES_EAU_PAR_MEGOT, megotsParLitre, type Ramassage } from "@/data/ramassages";
import { sourcesRamassages } from "@/data/ramassages-page";
import { Ref } from "../megot/Ref";
import { MediaLogo } from "../presse/MediaLogo";
import { Reveal } from "../Reveal";

/**
 * La fiche d'une sortie : date, parcours, les quatre chiffres, les équivalents,
 * les photos et l'article de presse s'il existe. Générée depuis ramassages.ts,
 * donc chaque nouvelle sortie ajoute une fiche sans toucher au code.
 * Les fiches alternent : chiffres à gauche, puis à droite (`inverse`).
 */
export function FicheSortie({ sortie, inverse }: { sortie: Ramassage; inverse: boolean }) {
  const eau = sortie.megots * LITRES_EAU_PAR_MEGOT;
  const metres = sortie.megots / MEGOTS_PAR_METRE;
  const article = articlesPresse.find((a) => a.title.toLowerCase().includes(sortie.libelle.toLowerCase()));

  return (
    <article className={inverse ? "fiche is-inverse" : "fiche"} aria-labelledby={`fiche-${sortie.date.replace(/\s/g, "-")}`}>
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
            {sortie.duree && (
              <li>
                <b className="display">{sortie.duree}</b>
                <span>de ramassage</span>
              </li>
            )}
            <li>
              <b className="display">{fr(sortie.litres)} L</b>
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
              <MediaLogo media={article.media} />
              <span className="fiche-presse-titre">{article.title}</span>
              <span aria-hidden="true">↗</span>
            </a>
          )}
        </Reveal>

        {sortie.photos && (
          <Reveal className="fiche-photos" delay={0.1}>
            {sortie.photos.map((p, i) => (
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
