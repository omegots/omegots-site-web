/**
 * Scène du hero « L'association » : le pont de Saint-Nazaire du logo se dessine
 * au-dessus de l'eau, la crête dérive, et le mégot du logo flotte. Tout en CSS
 * (association.css, préfixe ha-). Même géométrie que le hero de l'accueil.
 */
export function HeroAssociation() {
  return (
    <div className="ha" aria-hidden="true">
      <svg viewBox="0 0 520 320" className="ha-svg" focusable="false">
        <defs>
          <clipPath id="ha-clip-eau">
            <rect x="0" y="200" width="520" height="120" />
          </clipPath>
        </defs>

        {/* Le pont, tracé progressivement */}
        <g transform="translate(260,182) scale(2.4)" fill="#1A4B6E" stroke="#1A4B6E">
          <path
            className="ha-trait ha-haubans"
            d="M-19,-35 L-50.5,9 M-19,-32 L-40,7.1 M-19,-29 L-30,5 M-19,-35 L-12,1.1 M-19,-31.5 L-6.5,0.4 M-19,-28 L-1.5,0.1 M19,-35 L50.5,9 M19,-32 L40,7.1 M19,-29 L30,5 M19,-35 L12,1.1 M19,-31.5 L6.5,0.4 M19,-28 L1.5,0.1"
            fill="none"
            strokeWidth="0.9"
            strokeLinecap="round"
          />
          <path
            className="ha-trait ha-tablier"
            d="M-110,12.5 C-80,12 -68,11 -58,10 C-32,7 -15,0 0,0 C15,0 32,7 58,10 C68,11 80,12 110,12.5"
            fill="none"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          <rect className="ha-pylone" x="-21.3" y="-38" width="4.6" height="60" rx="2.3" stroke="none" />
          <rect className="ha-pylone" x="16.7" y="-38" width="4.6" height="60" rx="2.3" stroke="none" />
        </g>

        {/* L'eau */}
        <g clipPath="url(#ha-clip-eau)">
          <rect x="0" y="222" width="520" height="100" fill="#2A8C7E" />
          <svg className="ha-crete" x="0" y="198" width="1040" height="30" viewBox="0 0 1040 30" preserveAspectRatio="none">
            <path
              d="M0,20 q32.5,-16 65,0 t65,0 t65,0 t65,0 t65,0 t65,0 t65,0 t65,0 t65,0 t65,0 t65,0 t65,0 t65,0 t65,0 t65,0 t65,0 L1040,30 L0,30 Z"
              fill="#2A8C7E"
            />
          </svg>
          <svg className="ha-ligne" x="0" y="256" width="1040" height="16" viewBox="0 0 1040 16" preserveAspectRatio="none">
            <path d="M0,8 q32.5,-9 65,0 t65,0 t65,0 t65,0 t65,0 t65,0 t65,0 t65,0 t65,0 t65,0 t65,0 t65,0 t65,0 t65,0 t65,0 t65,0" fill="none" stroke="#F5EFE0" strokeWidth="1.6" opacity="0.4" />
          </svg>
          {/* Le mégot du logo, qui flotte */}
          <g className="ha-megot">
            <svg x="-30" y="-24" width="60" height="40" viewBox="-30 -30 60 40" overflow="visible">
              <use href="#megot" />
            </svg>
          </g>
          <g className="ha-megot is-2">
            <svg x="-24" y="-20" width="48" height="32" viewBox="-30 -30 60 40" overflow="visible">
              <use href="#megot" />
            </svg>
          </g>
        </g>
      </svg>
    </div>
  );
}
