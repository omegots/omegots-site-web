/**
 * Scène du hero « Nos ramassages » : les contenants gradués de l'accueil se
 * remplissent l'un après l'autre, puis tout se vide et recommence. Tout en
 * CSS (ramassages.css, préfixe hs-).
 */
const N = 6;

export function HeroRamassages() {
  return (
    <div className="hs" aria-hidden="true">
      <svg viewBox="0 0 560 300" className="hs-svg" focusable="false">
        <ellipse cx="280" cy="272" rx="250" ry="9" fill="rgba(26, 75, 110, 0.14)" />
        {Array.from({ length: N }, (_, i) => (
          <g key={i} transform={`translate(${20 + i * 86},100) scale(2)`} className="hs-jar" style={{ ["--i" as string]: i }}>
            <rect className="hs-lvl" x="8" y="10" width="30" height="50" fill="#2A8C7E" opacity="0.9" clipPath="url(#jar-clip)" />
            <use href="#jar-empty" />
            <text x="23" y="72" textAnchor="middle" fontSize="8" fontWeight="800" fill="#1A4B6E" fontFamily="var(--font-display)">
              {i + 1} L
            </text>
          </g>
        ))}
        {/* Le mégot qui tombe dans le contenant en cours */}
        <g className="hs-megot">
          <svg x="-14" y="-10" width="28" height="20" viewBox="-30 -30 60 40" overflow="visible">
            <use href="#megot" />
          </svg>
        </g>
      </svg>
    </div>
  );
}
