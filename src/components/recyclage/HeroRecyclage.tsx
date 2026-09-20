import { MegotDroit, MEGOT_LONGUEUR } from "../megot/MegotDroit";

/**
 * Scène du hero « Le recyclage » : des mégots ramassés deviennent une plaque
 * de plastique, puis un banc. Trois états qui se relaient en boucle, tout en
 * CSS (recyclage.css, préfixe hr-). Le banc reprend celui de l'accueil.
 */
export function HeroRecyclage() {
  const u = 1.6;
  const l = MEGOT_LONGUEUR * u;
  const megots = [
    [150, 120, -14], [232, 104, 12], [300, 132, -30], [200, 168, 24], [280, 186, -8], [352, 168, 40], [180, 214, 8],
  ];

  return (
    <div className="hr" aria-hidden="true">
      <svg viewBox="0 0 520 320" className="hr-svg" focusable="false">
        {/* Sol */}
        <ellipse cx="260" cy="272" rx="200" ry="10" fill="rgba(26, 75, 110, 0.14)" />

        {/* 1. Les mégots ramassés */}
        <g className="hr-etape hr-megots">
          {megots.map(([x, y, r], i) => (
            <g key={i} transform={`translate(${x - l / 2},${y}) rotate(${r} ${l / 2} 8)`}>
              <MegotDroit u={u} contour={1.4} />
            </g>
          ))}
        </g>

        {/* 2. La plaque de 2 cm */}
        <g className="hr-etape hr-plaque">
          <path d="M140,190 l220,-40 l40,20 l-220,40 Z" fill="#4E6675" stroke="#0B2A40" strokeWidth="3" strokeLinejoin="round" />
          <path d="M140,190 v14 l40,20 v-14 Z" fill="#3A4F5C" stroke="#0B2A40" strokeWidth="3" strokeLinejoin="round" />
          <path d="M180,224 v-14 l220,-40 v14 Z" fill="#2F4250" stroke="#0B2A40" strokeWidth="3" strokeLinejoin="round" />
          <g fill="#B9B1A4" opacity="0.5">
            {[[190, 176], [240, 168], [290, 160], [340, 150], [220, 190], [270, 182], [320, 172]].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="3" />
            ))}
          </g>
        </g>

        {/* 3. Le banc, comme sur l'accueil */}
        <g className="hr-etape hr-banc">
          <rect x="130" y="150" width="260" height="20" rx="4" fill="#2A8C7E" stroke="#0B2A40" strokeWidth="3" />
          <rect x="130" y="180" width="260" height="20" rx="4" fill="#2A8C7E" stroke="#0B2A40" strokeWidth="3" />
          <rect x="150" y="110" width="220" height="18" rx="4" fill="#2A8C7E" stroke="#0B2A40" strokeWidth="3" />
          <rect x="160" y="100" width="16" height="170" rx="4" fill="#1A4B6E" />
          <rect x="344" y="100" width="16" height="170" rx="4" fill="#1A4B6E" />
        </g>

        {/* Flèche de progression */}
        <g className="hr-fleche" fill="none" stroke="#2A8C7E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M60,60 q100,-40 200,-10 t200,30" strokeDasharray="6 10" />
          <path d="M440,66 l20,14 l-24,6" />
        </g>
      </svg>
    </div>
  );
}
