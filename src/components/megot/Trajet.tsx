import { Stagger, StaggerItem } from "../Reveal";
import { MegotDroit, MEGOT_LONGUEUR } from "./MegotDroit";

const etapes = [
  {
    titre: "Le trottoir",
    texte:
      "Jeté, écrasé du pied. Il ne reste pas là : la première pluie le pousse vers la pente.",
    x: 148,
    yLine: 132,
  },
  {
    titre: "Le caniveau",
    texte:
      "L'eau de ruissellement l'emporte avec les feuilles et la poussière, jusqu'à la bouche d'égout la plus proche.",
    x: 328,
    yLine: 168,
  },
  {
    titre: "L'avaloir et le réseau pluvial",
    texte:
      "Dans beaucoup de rues, l'eau de pluie ne passe pas par la station d'épuration : le réseau rejoint directement le cours d'eau ou le bassin le plus proche.",
    x: 468,
    yLine: 238,
  },
  {
    titre: "La Loire et l'estuaire",
    texte:
      "L'estuaire reçoit l'eau des villes. Le mégot y libère ses substances, puis le filtre se délite en fibres.",
    x: 790,
    yLine: 198,
  },
  {
    titre: "La plage et l'océan",
    texte:
      "Ce qui ne s'est pas déposé finit sur le sable ou en mer. C'est là que les collectes le retrouvent, en tête de tous les déchets.",
    x: 1090,
    yLine: 218,
  },
] as const;

/**
 * Chemin du mégot dans la scène : trottoir → caniveau → avaloir →
 * conduite → Loire → océan. Utilisé par <animateMotion> dans Trajet.
 */
export const TRAJET_PATH =
  "M148,148 L278,148 L292,172 L340,182 L357,192 L357,248 C365,256 382,256 400,256 L555,256 C575,256 595,228 615,212 C655,198 720,204 780,210 C850,216 920,208 990,210 C1030,212 1060,216 1095,220";

/**
 * Le trajet d'un mégot, en coupe : ville, réseau pluvial, Loire sous le pont
 * de Saint-Nazaire, plage. Illustration vectorielle de la charte (navy, vert
 * d'eau, crème, orange du filtre).
 */
export function Trajet() {
  return (
    <div className="trajet">
      <div className="trajet-scene" aria-hidden="true">
        <svg
          viewBox="0 0 1200 320"
          className="trajet-svg"
          focusable="false"
          role="img"
        >
          <defs>
            <linearGradient id="trajet-sol" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E6DCC8" />
              <stop offset="42%" stopColor="#D6C9B0" />
              <stop offset="100%" stopColor="#C4B49A" />
            </linearGradient>
            <linearGradient id="trajet-sol-sombre" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#C9BA9E" stopOpacity="0" />
              <stop offset="100%" stopColor="#A89478" stopOpacity="0.35" />
            </linearGradient>
            <linearGradient id="trajet-trottoir" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#D0C8BA" />
              <stop offset="45%" stopColor="#B8AFA3" />
              <stop offset="100%" stopColor="#9A9286" />
            </linearGradient>
            <linearGradient id="trajet-eau" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4EBEB0" />
              <stop offset="28%" stopColor="#2F9A8C" />
              <stop offset="70%" stopColor="#217A70" />
              <stop offset="100%" stopColor="#165A54" />
            </linearGradient>
            <linearGradient id="trajet-eau-haut" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#A8E8DC" stopOpacity="0.45" />
              <stop offset="40%" stopColor="#F5EFE0" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#7ED4C6" stopOpacity="0.28" />
            </linearGradient>
            <linearGradient id="trajet-sable" x1="0" y1="0" x2="0.25" y2="1">
              <stop offset="0%" stopColor="#F2EAD8" />
              <stop offset="55%" stopColor="#DCCDB0" />
              <stop offset="100%" stopColor="#C2AE8C" />
            </linearGradient>
            <linearGradient id="trajet-pipe" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7A8E9C" />
              <stop offset="45%" stopColor="#536B7A" />
              <stop offset="100%" stopColor="#3A4F5C" />
            </linearGradient>
            <linearGradient id="trajet-pipe-in" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#C2CFD6" />
              <stop offset="100%" stopColor="#8A9CAA" />
            </linearGradient>
            <linearGradient id="trajet-berges" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#B8A888" />
              <stop offset="100%" stopColor="#8A9CAA" stopOpacity="0" />
            </linearGradient>
            <radialGradient id="trajet-lampe" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F5EFE0" stopOpacity="0.65" />
              <stop offset="55%" stopColor="#F5EFE0" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#F5EFE0" stopOpacity="0" />
            </radialGradient>
            <filter id="trajet-soft" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.2" />
            </filter>
            <clipPath id="trajet-clip-eau">
              <path d="M560,196 C610,186 670,192 730,198 C810,208 890,196 970,200 C1040,204 1100,208 1200,212 L1200,320 L560,320 Z" />
            </clipPath>
          </defs>

          {/* --- Sol / sous-sol --- */}
          <path
            d="M0,156 H298 V178 H348 V250 H560 V320 H0 Z"
            fill="url(#trajet-sol)"
          />
          <path
            d="M0,240 H560 V320 H0 Z"
            fill="url(#trajet-sol-sombre)"
          />
          {/* Strates de terre */}
          <g stroke="#B5A68C" strokeWidth="1" opacity="0.4" fill="none">
            <path d="M0,210 H300" />
            <path d="M0,248 H348" />
            <path d="M0,286 H520" strokeDasharray="6 8" />
          </g>
          {/* Texture grain discret */}
          <g fill="#A89478" opacity="0.18">
            <circle cx="48" cy="228" r="1.2" />
            <circle cx="92" cy="268" r="1" />
            <circle cx="160" cy="248" r="1.4" />
            <circle cx="220" cy="292" r="1.1" />
            <circle cx="280" cy="236" r="1.3" />
            <circle cx="400" cy="300" r="1.2" />
            <circle cx="480" cy="278" r="1" />
          </g>

          {/* --- Trottoir --- */}
          <path d="M0,156 H298 V168 H0 Z" fill="url(#trajet-trottoir)" />
          <path d="M0,156 H298" fill="none" stroke="#8A8278" strokeWidth="1.6" />
          {/* Joints de dalles */}
          <g stroke="#9A9288" strokeWidth="1" opacity="0.35">
            <path d="M72,156 V168" />
            <path d="M144,156 V168" />
            <path d="M216,156 V168" />
          </g>
          {/* Bordure / nez de trottoir */}
          <path d="M286,156 L298,156 L298,178 L286,170 Z" fill="#8E8680" />
          <path d="M286,156 L298,156 L298,166 L286,162 Z" fill="#C2BAB0" />
          <path d="M286,170 L298,178" fill="none" stroke="#6E6862" strokeWidth="1" opacity="0.5" />

          {/* --- Caniveau --- */}
          <path d="M298,178 H368 V190 H298 Z" fill="#A39B90" />
          <path d="M298,178 H368" fill="none" stroke="#726C64" strokeWidth="1.4" />
          <path d="M298,190 H368" fill="none" stroke="#8A8278" strokeWidth="1" opacity="0.5" />
          {/* Filet d'eau dans le caniveau */}
          <path
            d="M304,184 C318,182 336,182 352,184"
            fill="none"
            stroke="#2A8C7E"
            strokeWidth="2.2"
            strokeLinecap="round"
            opacity="0.4"
          />
          <ellipse cx="330" cy="184" rx="26" ry="2.2" fill="#6ED4C2" opacity="0.28" />

          {/* --- Maison --- */}
          <g className="trajet-ville">
            <path d="M22,156 V100 H98 V156 Z" fill="#D8CFBC" />
            <path d="M22,156 V100 H30 V156 Z" fill="#C8BCA8" opacity="0.55" />
            <path d="M16,100 L60,64 L104,100 Z" fill="#1A4B6E" />
            <path
              d="M16,100 L60,64 L104,100"
              fill="none"
              stroke="#0F3550"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
            {/* Cheminée */}
            <rect x="78" y="72" width="10" height="22" rx="1" fill="#0F3550" />
            <rect x="76" y="70" width="14" height="4" rx="1" fill="#1A4B6E" />
            {/* Façade claire */}
            <rect x="28" y="106" width="64" height="50" fill="#E8DFCC" />
            {/* Fenêtres */}
            <rect x="36" y="114" width="16" height="20" rx="1.5" fill="#F5EFE0" stroke="#1A4B6E" strokeWidth="1.5" />
            <rect x="62" y="114" width="16" height="20" rx="1.5" fill="#F5EFE0" stroke="#1A4B6E" strokeWidth="1.5" />
            <path
              d="M44,114 V134 M36,124 H52 M70,114 V134 M62,124 H78"
              stroke="#1A4B6E"
              strokeWidth="1"
              opacity="0.45"
            />
            {/* Seuil / porte */}
            <rect x="50" y="136" width="14" height="20" rx="1" fill="#0F3550" />
            <circle cx="61" cy="147" r="1.1" fill="#F5EFE0" opacity="0.7" />
            {/* Ombre au sol */}
            <ellipse cx="60" cy="156" rx="38" ry="3" fill="#0F3550" opacity="0.08" />
          </g>

          {/* --- Lampadaire --- */}
          <g className="trajet-lampe">
            <circle cx="172" cy="56" r="32" fill="url(#trajet-lampe)" />
            <rect x="169" y="74" width="6" height="82" rx="3" fill="#1A4B6E" />
            <path
              d="M172,74 C172,74 204,69 210,80 C212,84 210,88 204,88 H172 Z"
              fill="#1A4B6E"
            />
            <ellipse cx="204" cy="84" rx="8" ry="5.5" fill="#F5EFE0" opacity="0.95" />
            <ellipse cx="204" cy="84" rx="4.5" ry="2.8" fill="#DD8A2E" opacity="0.4" />
            <ellipse cx="172" cy="156" rx="8" ry="2" fill="#0F3550" opacity="0.1" />
          </g>

          {/* --- Avaloir --- */}
          <g className="trajet-avaloir">
            <rect x="334" y="178" width="46" height="18" rx="2.5" fill="#2C3E4A" />
            <rect x="337" y="180.5" width="40" height="13" rx="1.5" fill="#4A6070" />
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <rect
                key={i}
                x={340 + i * 6.2}
                y="181.5"
                width="3.2"
                height="11"
                rx="0.7"
                fill="#0F3550"
                opacity="0.55"
              />
            ))}
            <rect
              x="334"
              y="178"
              width="46"
              height="18"
              rx="2.5"
              fill="none"
              stroke="#0F3550"
              strokeWidth="1.6"
            />
            {/* Ombre intérieure */}
            <rect x="337" y="180.5" width="40" height="3" rx="1" fill="#0F3550" opacity="0.25" />
          </g>

          {/* --- Conduite pluviale --- */}
          <g className="trajet-conduite">
            <path
              d="M346,196 V244 C346,252 352,256 360,256 H560"
              fill="none"
              stroke="#2E4050"
              strokeWidth="26"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M346,196 V244 C346,252 352,256 360,256 H560"
              fill="none"
              stroke="url(#trajet-pipe)"
              strokeWidth="22"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M346,196 V244 C346,252 352,256 360,256 H560"
              fill="none"
              stroke="url(#trajet-pipe-in)"
              strokeWidth="13"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Filet d'eau bas de conduite */}
            <path
              d="M346,196 V244 C346,252 352,256 360,256 H552"
              fill="none"
              stroke="#2A8C7E"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.28"
            />
            {/* Joints de tuyau */}
            <g fill="none" stroke="#2E4050" strokeWidth="2.2" opacity="0.7">
              <ellipse cx="346" cy="218" rx="12" ry="5" />
              <ellipse cx="430" cy="256" rx="5" ry="12" />
              <ellipse cx="500" cy="256" rx="5" ry="12" />
            </g>
            {/* Embouchure */}
            <ellipse cx="560" cy="256" rx="12" ry="15" fill="#2E4050" />
            <ellipse cx="560" cy="256" rx="7" ry="10" fill="#4E6675" />
            <ellipse cx="559" cy="256" rx="4" ry="6.5" fill="#1F6E63" opacity="0.8" />
            {/* Jet vers l'estuaire */}
            <path
              d="M570,250 C588,246 602,236 614,222"
              fill="none"
              stroke="#8EE0D2"
              strokeWidth="2.8"
              strokeLinecap="round"
              opacity="0.7"
            />
            <path
              d="M570,260 C590,256 606,246 618,232"
              fill="none"
              stroke="#2A8C7E"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.4"
            />
          </g>

          {/* --- Berge / transition sol → eau --- */}
          <path
            d="M540,198 C548,210 552,230 556,256 L556,320 L540,320 Z"
            fill="url(#trajet-berges)"
            opacity="0.55"
          />

          {/* --- Eau : Loire / estuaire / océan --- */}
          <path
            d="M560,196 C610,186 670,192 730,198 C810,208 890,196 970,200 C1040,204 1100,208 1200,212 L1200,320 L560,320 Z"
            fill="url(#trajet-eau)"
          />
          {/* Bande de surface */}
          <path
            d="M560,196 C610,186 670,192 730,198 C810,208 890,196 970,200 C1040,204 1100,208 1200,212 L1200,230 C1100,226 1040,222 970,218 C890,214 810,226 730,216 C670,210 610,204 560,214 Z"
            fill="url(#trajet-eau-haut)"
          />
          {/* Ligne d'horizon d'eau */}
          <path
            d="M560,196 C610,186 670,192 730,198 C810,208 890,196 970,200 C1040,204 1100,208 1200,212"
            fill="none"
            stroke="#F5EFE0"
            strokeWidth="1.4"
            opacity="0.35"
          />

          <g clipPath="url(#trajet-clip-eau)">
            <path
              className="trajet-vague"
              d="M520,226 q36,-9 72,0 t72,0 t72,0 t72,0 t72,0 t72,0 t72,0 t72,0 t72,0 t72,0"
              fill="none"
              stroke="#F5EFE0"
              strokeWidth="1.6"
              opacity="0.4"
            />
            <path
              className="trajet-vague is-2"
              d="M520,252 q36,-9 72,0 t72,0 t72,0 t72,0 t72,0 t72,0 t72,0 t72,0 t72,0 t72,0"
              fill="none"
              stroke="#F5EFE0"
              strokeWidth="1.35"
              opacity="0.26"
            />
            <path
              className="trajet-vague is-3"
              d="M520,282 q36,-7 72,0 t72,0 t72,0 t72,0 t72,0 t72,0 t72,0 t72,0 t72,0 t72,0"
              fill="none"
              stroke="#0F3550"
              strokeWidth="1.1"
              opacity="0.14"
            />
            {/* Caustiques / reflets */}
            <g opacity="0.12" fill="#F5EFE0">
              <ellipse cx="700" cy="240" rx="40" ry="6" />
              <ellipse cx="880" cy="268" rx="52" ry="5" />
              <ellipse cx="1040" cy="248" rx="36" ry="5" />
            </g>
            {/* Poisson */}
            <g className="trajet-poisson" opacity="0.5">
              <ellipse cx="990" cy="272" rx="13" ry="5.5" fill="#F5EFE0" />
              <path d="M977,272 L970,268.5 L970,275.5 Z" fill="#F5EFE0" />
              <circle cx="997" cy="270.5" r="1.1" fill="#1A4B6E" />
              <path
                d="M984,268 C986,266 990,266 992,268"
                fill="none"
                stroke="#1A4B6E"
                strokeWidth="0.7"
                opacity="0.35"
              />
            </g>
          </g>

          {/* --- Pont de Saint-Nazaire --- */}
          <g className="trajet-pont" transform="translate(820,198)">
            {/* Reflet */}
            <g opacity="0.12" transform="scale(1,0.32) translate(0,70)" filter="url(#trajet-soft)">
              <rect x="-54" y="-90" width="9" height="120" rx="2" fill="#0F3550" />
              <rect x="45" y="-90" width="9" height="120" rx="2" fill="#0F3550" />
              <path
                d="M-128,22 C-76,16 -34,4 0,4 C34,4 76,16 128,22"
                fill="none"
                stroke="#0F3550"
                strokeWidth="5"
              />
            </g>
            {/* Tablier */}
            <path
              d="M-128,22 C-76,16 -34,4 0,4 C34,4 76,16 128,22"
              fill="none"
              stroke="#0F3550"
              strokeWidth="3.4"
              strokeLinecap="round"
            />
            <path
              d="M-128,25.5 C-76,19.5 -34,7.5 0,7.5 C34,7.5 76,19.5 128,25.5"
              fill="none"
              stroke="#1A4B6E"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.5"
            />
            {/* Haubans */}
            <g
              fill="none"
              stroke="#0F3550"
              strokeWidth="1.2"
              strokeLinecap="round"
              opacity="0.9"
            >
              <path d="M-49.5,-88 L-118,20" />
              <path d="M-49.5,-82 L-98,18" />
              <path d="M-49.5,-76 L-78,14" />
              <path d="M-49.5,-70 L-60,10" />
              <path d="M-49.5,-88 L-28,6" />
              <path d="M-49.5,-80 L-14,5" />
              <path d="M-49.5,-72 L-2,4.2" />
              <path d="M49.5,-88 L118,20" />
              <path d="M49.5,-82 L98,18" />
              <path d="M49.5,-76 L78,14" />
              <path d="M49.5,-70 L60,10" />
              <path d="M49.5,-88 L28,6" />
              <path d="M49.5,-80 L14,5" />
              <path d="M49.5,-72 L2,4.2" />
            </g>
            {/* Pylônes (silhouette en Y inversé, type haubané) */}
            <path
              d="M-54,-94 L-49.5,-94 L-46,28 L-53,28 Z"
              fill="#0F3550"
            />
            <path
              d="M45,-94 L49.5,-94 L53,28 L46,28 Z"
              fill="#0F3550"
            />
            <rect x="-58" y="-98" width="17" height="8" rx="2" fill="#1A4B6E" />
            <rect x="41" y="-98" width="17" height="8" rx="2" fill="#1A4B6E" />
          </g>

          {/* --- Plage --- */}
          <path
            d="M1010,320 C1055,255 1120,224 1200,212 V320 Z"
            fill="url(#trajet-sable)"
          />
          {/* Ligne d'écume */}
          <path
            d="M1036,298 C1080,252 1140,224 1200,216"
            fill="none"
            stroke="#F5EFE0"
            strokeWidth="3.5"
            strokeLinecap="round"
            opacity="0.55"
          />
          <path
            d="M1048,304 C1090,262 1148,230 1200,222"
            fill="none"
            stroke="#2A8C7E"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.2"
          />
          {/* Vaguelettes sur le sable */}
          <g stroke="#B9A888" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" fill="none">
            <path d="M1105,250 q7,-4 14,0" />
            <path d="M1132,264 q8,-4 16,0" />
            <path d="M1160,280 q7,-3.5 14,0" />
            <path d="M1182,296 q6,-3 12,0" />
          </g>
          {/* Herbes de dune */}
          <g stroke="#1A4B6E" strokeWidth="1.3" strokeLinecap="round" opacity="0.45" fill="none">
            <path d="M1178,248 q-2,-10 1,-18" />
            <path d="M1182,250 q1,-12 4,-16" />
            <path d="M1188,246 q-1,-11 2,-17" />
            <path d="M1194,252 q2,-10 5,-14" />
          </g>

          {/* Oiseaux au loin */}
          <g
            className="trajet-oiseaux"
            fill="none"
            stroke="#1A4B6E"
            strokeWidth="1.3"
            strokeLinecap="round"
            opacity="0.35"
          >
            <path d="M700,52 q4,-4 8,0 q4,4 8,0" />
            <path d="M726,44 q3.5,-3.5 7,0 q3.5,3.5 7,0" />
            <path d="M748,56 q3,-3 6,0 q3,3 6,0" />
          </g>

          {/* --- Mégot animé (animateMotion = coords SVG fiables) --- */}
          <g className="trajet-megot trajet-megot--motion">
            <animateMotion
              dur="18s"
              repeatCount="indefinite"
              path={TRAJET_PATH}
              rotate="auto"
              calcMode="linear"
            />
            <animate
              attributeName="opacity"
              values="0;1;1;0"
              keyTimes="0;0.05;0.92;1"
              dur="18s"
              repeatCount="indefinite"
            />
            <g transform={`translate(${-(MEGOT_LONGUEUR * 1.45) / 2},-7)`}>
              <MegotDroit u={1.45} contour={1.3} />
            </g>
          </g>
          {/* Position figée si reduced-motion */}
          <g
            className="trajet-megot trajet-megot--static"
            transform="translate(780,203)"
            opacity="1"
          >
            <g transform={`translate(${-(MEGOT_LONGUEUR * 1.45) / 2},-7)`}>
              <MegotDroit u={1.45} contour={1.3} />
            </g>
          </g>

          {/* --- Repères numérotés --- */}
          {etapes.map((e, i) => (
            <g key={e.titre} className="trajet-repere">
              <line
                x1={e.x}
                y1={58}
                x2={e.x}
                y2={e.yLine}
                stroke="#2A8C7E"
                strokeWidth="1.5"
                strokeDasharray="3.5 5"
                opacity="0.6"
              />
              <circle cx={e.x} cy={42} r="17.5" fill="#0F3550" opacity="0.08" />
              <circle
                cx={e.x}
                cy={40}
                r="16"
                fill="#F5EFE0"
                stroke="#0F3550"
                strokeWidth="2.4"
              />
              <circle
                cx={e.x}
                cy={40}
                r="16"
                fill="none"
                stroke="#2A8C7E"
                strokeWidth="1"
                opacity="0.4"
              />
              <text
                x={e.x}
                y={45.5}
                textAnchor="middle"
                fontSize="15"
                fontWeight="800"
                fill="#0F3550"
                fontFamily="var(--font-display), sans-serif"
              >
                {i + 1}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <Stagger className="trajet-etapes" stagger={0.12}>
        {etapes.map((e, i) => (
          <StaggerItem key={e.titre} className="trajet-etape">
            <span className="trajet-n display" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="display">{e.titre}</h3>
            <p>{e.texte}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}
