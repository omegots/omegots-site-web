import { fr } from "@/data/format";
import { MEGOTS_PAR_BANC, sourcesRecyclage } from "@/data/recyclage";
import { Ref } from "../megot/Ref";

/**
 * Combien de mégots pour un banc : 7 500, le rapport constaté sur deux bancs
 * livrés à la mairie du 9e arrondissement de Paris (15 000 mégots, filière MéGO!).
 */
export function Bancs() {
  return (
    <div className="bancs">
      <div className="bancs-panneau">
        <p className="bancs-chiffre display">
          <b>{fr(MEGOTS_PAR_BANC)}</b>
          <span>mégots pour fabriquer un banc</span>
        </p>
        <p className="bancs-texte">
          C&apos;est le rapport constaté sur deux bancs livrés à la mairie du 9e arrondissement de Paris : 15 000
          mégots, soit 4,5 kg d&apos;acétate de cellulose dépollué.
          <Ref ids={[3]} liste={sourcesRecyclage} />
        </p>
      </div>

      <svg viewBox="0 0 64 40" className="bancs-banc" aria-hidden="true">
        <rect x="6" y="14" width="52" height="7" rx="2" fill="#2A8C7E" stroke="#0B2A40" strokeWidth="1.5" />
        <rect x="6" y="24" width="52" height="7" rx="2" fill="#2A8C7E" stroke="#0B2A40" strokeWidth="1.5" />
        <rect x="10" y="4" width="44" height="6" rx="2" fill="#2A8C7E" stroke="#0B2A40" strokeWidth="1.5" />
        <rect x="12" y="2" width="4" height="36" rx="1.5" fill="#1A4B6E" />
        <rect x="48" y="2" width="4" height="36" rx="1.5" fill="#1A4B6E" />
      </svg>
    </div>
  );
}
