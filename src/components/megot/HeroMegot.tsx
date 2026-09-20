/**
 * Scène du hero de la page « Le mégot » : un mégot tombe, touche l'eau, y
 * flotte, relâche ses substances puis coule, en boucle. Tout en CSS
 * (megot.css, préfixe hm-), aucun JavaScript : la scène est visible dès le
 * premier rendu et s'arrête en mouvement réduit.
 */
export function HeroMegot() {
  return (
    <div className="hm" aria-hidden="true">
      <svg viewBox="0 -80 520 500" className="hm-svg" focusable="false">
        <defs>
          <clipPath id="hm-clip-filtre">
            <path d="M-5.5,2.527 L5.5,5.473 L-2.0,18.46 L-13.0,15.52 Z" />
          </clipPath>
          <clipPath id="hm-clip-eau">
            <rect x="0" y="210" width="520" height="210" />
          </clipPath>
        </defs>

        {/* L'eau : masse, crête qui dérive, reflets */}
        <g className="hm-eau">
          <rect x="0" y="222" width="520" height="198" fill="#2A8C7E" />
          <svg className="hm-crete" x="0" y="198" width="1040" height="30" viewBox="0 0 1040 30" preserveAspectRatio="none">
            <path
              d="M0,20 q32.5,-16 65,0 t65,0 t65,0 t65,0 t65,0 t65,0 t65,0 t65,0 t65,0 t65,0 t65,0 t65,0 t65,0 t65,0 t65,0 t65,0 L1040,30 L0,30 Z"
              fill="#2A8C7E"
            />
          </svg>
          <svg className="hm-ligne" x="0" y="262" width="1040" height="16" viewBox="0 0 1040 16" preserveAspectRatio="none">
            <path d="M0,8 q32.5,-9 65,0 t65,0 t65,0 t65,0 t65,0 t65,0 t65,0 t65,0 t65,0 t65,0 t65,0 t65,0 t65,0 t65,0 t65,0 t65,0" fill="none" stroke="#F5EFE0" strokeWidth="1.6" opacity="0.4" />
          </svg>
          <svg className="hm-ligne is-2" x="0" y="330" width="1040" height="16" viewBox="0 0 1040 16" preserveAspectRatio="none">
            <path d="M0,8 q32.5,-9 65,0 t65,0 t65,0 t65,0 t65,0 t65,0 t65,0 t65,0 t65,0 t65,0 t65,0 t65,0 t65,0 t65,0 t65,0 t65,0" fill="none" stroke="#F5EFE0" strokeWidth="1.6" opacity="0.3" />
          </svg>
        </g>

        {/* Ce que le mégot relâche : des traces qui s'étalent sous la surface */}
        <g className="hm-traces" clipPath="url(#hm-clip-eau)">
          {[
            [232, 250, 0], [292, 262, 0.3], [252, 290, 0.6], [304, 306, 0.9], [216, 318, 1.2], [270, 340, 1.5],
          ].map(([x, y, d], i) => (
            <circle key={i} className="hm-trace" cx={x} cy={y} r="7" fill="#4a3a1e" style={{ animationDelay: `${d}s` }} />
          ))}
        </g>

        {/* Le mégot : il tombe, flotte à moitié immergé, puis coule */}
        <g className="hm-megot">
          {/* Le mégot du logo, à l'identique : tube crème, filtre orange rayé, bout brûlé, contour bleu */}
          <g transform="translate(0,6) rotate(-100) scale(3)">
            <path d="M-5.5,-26 L5.5,-26 L5.5,5.473 L-2.0,18.46 L-13.0,15.52 L-5.5,2.527 Z" fill="#F5EFE0" />
            <path d="M-5.5,2.527 L5.5,5.473 L-2.0,18.46 L-13.0,15.52 Z" fill="#DD8A2E" />
            <g clipPath="url(#hm-clip-filtre)">
              <g transform="rotate(30 0 4)">
                <rect x="-9" y="9.2" width="18" height="2.1" fill="#B36A1E" />
                <rect x="-9" y="13.2" width="18" height="2.1" fill="#B36A1E" />
              </g>
            </g>
            <path d="M-5.5,-26 L5.5,-26 L5.5,-21 L-5.5,-21 Z" fill="#0F3550" />
            <path d="M-5.5,-26 L5.5,-26 L5.5,5.473 L-2.0,18.46 L-13.0,15.52 L-5.5,2.527 Z" fill="none" stroke="#1A4B6E" strokeWidth="2.4" strokeLinejoin="round" />
          </g>
        </g>

        {/* Voile d'eau devant le mégot : la partie immergée paraît sous la surface */}
        <rect x="0" y="222" width="520" height="198" fill="#2A8C7E" opacity="0.55" className="hm-voile" />

        {/* Ondes à l'impact */}
        <g className="hm-ondes">
          {[0, 1, 2].map((i) => (
            <ellipse key={i} className="hm-onde" cx="260" cy="220" rx="40" ry="10" fill="none" stroke="#F5EFE0" strokeWidth="2" style={{ animationDelay: `${i * 0.25}s` }} />
          ))}
        </g>

        {/* Deux poissons qui passent, loin du mégot */}
        <g className="hm-poisson">
          <path d="M60,382 q14,-12 30,0 q-16,12 -30,0 Z M90,382 l12,-8 v16 Z" fill="#F5EFE0" opacity="0.55" />
        </g>
        <g className="hm-poisson is-2">
          <path d="M420,330 q14,-12 30,0 q-16,12 -30,0 Z M450,330 l12,-8 v16 Z" fill="#F5EFE0" opacity="0.4" />
        </g>
      </svg>
    </div>
  );
}
