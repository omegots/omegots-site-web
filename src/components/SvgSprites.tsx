/** Sprites SVG partagés (mégot, contenant gradué). */
export function SvgSprites() {
  return (
    <svg width={0} height={0} className="sprites" aria-hidden="true">
      <defs>
        <g id="megot-raw">
          <path
            d="M-5.5,-26 L5.5,-26 L5.5,5.473 L-2.0,18.46 L-13.0,15.52 L-5.5,2.527 Z"
            fill="#F5EFE0"
          />
          <path
            d="M-5.5,2.527 L5.5,5.473 L-2.0,18.46 L-13.0,15.52 Z"
            fill="#DD8A2E"
          />
          <path
            d="M-5.5,-26 L5.5,-26 L5.5,-21 L-5.5,-21 Z"
            fill="#0F3550"
          />
          <path
            d="M-5.5,-26 L5.5,-26 L5.5,5.473 L-2.0,18.46 L-13.0,15.52 L-5.5,2.527 Z"
            fill="none"
            stroke="#1A4B6E"
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
        </g>
        <g id="megot" transform="translate(0,-8) rotate(-100) scale(0.9)">
          <use href="#megot-raw" />
        </g>
        {/* Mégot monochrome (charte : tube en contour ouvert, filtre et bout cramé pleins, currentColor) */}
        <g id="megot-mono">
          <path
            d="M-5.5,2.527 L5.5,5.473 L-2.0,18.46 L-13.0,15.52 Z"
            fill="currentColor"
          />
          <path d="M-5.5,-26 L5.5,-26 L5.5,-21 L-5.5,-21 Z" fill="currentColor" />
          <path
            d="M-5.5,2.527 L-5.5,-26 L5.5,-26 L5.5,5.473"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
        </g>
        <g id="jar-empty">
          <path
            d="M8,8 h30 v46 a6,6 0 0 1 -6,6 h-18 a6,6 0 0 1 -6,-6 Z"
            fill="none"
            stroke="#1A4B6E"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M5,8 h36"
            stroke="#1A4B6E"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M8,44 h5 M8,32 h3 M8,20 h5"
            stroke="#1A4B6E"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </g>
        <clipPath id="jar-clip">
          <path d="M8,8 h30 v46 a6,6 0 0 1 -6,6 h-18 a6,6 0 0 1 -6,-6 Z" />
        </clipPath>
      </defs>
    </svg>
  );
}
