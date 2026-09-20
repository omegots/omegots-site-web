import { fr } from "@/data/format";
import { limites, sourcesRecyclage } from "@/data/recyclage";
import { Ref } from "../megot/Ref";
import { Reveal } from "../Reveal";

/**
 * Les ordres de grandeur, sans détour : ce qui est jeté chaque année en France
 * face à ce qu'un recycleur a traité. Trois barres à l'échelle, la plus fine
 * est agrandie à part pour rester lisible.
 */
export function Limites() {
  const partMego = limites.tonnesMego2020 / limites.tonnesJeteesParAn;
  const unSur = Math.round(1 / partMego);

  return (
    <div className="lim">
      <Reveal className="lim-barres" delay={0.05}>
        <div className="lim-barre">
          <span className="lim-barre-label">
            Jetés au sol chaque année en France
            <Ref ids={[1, 4]} liste={sourcesRecyclage} />
          </span>
          <span className="lim-barre-piste">
            <span className="lim-barre-fill is-total" style={{ ["--w" as string]: "100%" }} />
          </span>
          <b className="lim-barre-val display">{fr(limites.tonnesJeteesParAn)} t</b>
        </div>
        <div className="lim-barre">
          <span className="lim-barre-label">
            Traités par MéGO!, premier recycleur français, en 2020
            <Ref ids={[2]} liste={sourcesRecyclage} />
          </span>
          <span className="lim-barre-piste">
            <span className="lim-barre-fill is-mego" style={{ ["--w" as string]: `${Math.max(partMego * 100, 0.4)}%` }} />
          </span>
          <b className="lim-barre-val display">{fr(limites.tonnesMego2020)} t</b>
        </div>
      </Reveal>

      <Reveal className="lim-ratio" delay={0.15}>
        <p className="lim-ratio-chiffre display">
          1<span>sur</span>
          {fr(unSur)}
        </p>
        <p className="lim-ratio-texte">
          C&apos;est la part des mégots jetés en France qu&apos;un recycleur a traitée en 2020. Le recyclage donne une
          seconde vie à ce qui est déjà ramassé ; il ne règle pas ce qui est jeté.
        </p>
      </Reveal>

      <Reveal className="lim-points" delay={0.2}>
        <ul>
          <li>
            <b>L&apos;éco-organisme ne recycle pas.</b> Alcome finance le nettoiement des communes, distribue des
            cendriers et sensibilise. Un mégot mis à la poubelle part avec les ordures ménagères.
            <Ref ids={[6]} liste={sourcesRecyclage} />
          </li>
          <li>
            <b>Brûler peut valoir mieux que recycler.</b> Selon l&apos;analyse de cycle de vie commandée par Alcome, la
            co-incinération en cimenterie est l&apos;option la moins impactante sur le plan climatique, entre autres
            parce que les installations sont proches.
            <Ref ids={[5]} liste={sourcesRecyclage} />
          </li>
          <li>
            <b>Le filtre reste un plastique.</b> Dépollué ou non, l&apos;acétate de cellulose ne disparaît pas : il
            change d&apos;objet. Le mégot le plus propre est celui qui n&apos;a pas été jeté.
          </li>
        </ul>
      </Reveal>
    </div>
  );
}
