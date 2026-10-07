import { Stagger, StaggerItem } from "../Reveal";
import { MegotDroit, MEGOT_LONGUEUR } from "./MegotDroit";

const etapes = [
  {
    titre: "Le trottoir",
    texte:
      "Jeté au sol, il attend la première pluie.",
    x: 148,
    yLine: 132,
  },
  {
    titre: "Le caniveau",
    texte:
      "La pluie l'emporte jusqu'à la bouche d'égout.",
    x: 328,
    yLine: 140,
  },
  {
    titre: "L'avaloir et le réseau pluvial",
    texte:
      "Souvent sans station d'épuration, droit vers le cours d'eau.",
    x: 468,
    yLine: 238,
  },
  {
    titre: "La Loire et l'estuaire",
    texte:
      "Il y libère ses substances, puis se délite en fibres.",
    x: 700,
    yLine: 198,
  },
  {
    titre: "La plage et l'océan",
    texte:
      "Il finit sur le sable ou en mer, premier déchet des plages.",
    x: 1090,
    yLine: 140,
  },
] as const;

/**
 * Chemin du mégot dans la scène : trottoir → caniveau → avaloir →
 * conduite → Loire → océan. Utilisé par <animateMotion> dans Trajet.
 */
export const TRAJET_PATH =
  "M148,148 L330,148 C345,148 357,160 357,176 L357,248 C365,256 382,256 400,256 L600,256 C618,256 635,232 650,215 C680,202 720,204 780,210 C850,216 920,208 975,210 C990,210 1002,208 1012,204";

/** Surface de l'eau, de la berge (cachée sous le talus) jusqu'au bord droit. */
const EAU_SURFACE =
  "M480,200 C510,198 535,197 560,196 C610,186 670,192 730,198 C810,208 890,196 970,200 C1040,204 1100,208 1200,212";
const EAU = `${EAU_SURFACE} L1200,320 L480,320 Z`;

/** Sol de la ville, au niveau du trottoir, qui descend en talus dans l'eau. */
const SOL = "M0,156 H470 C505,158 525,176 540,196 C558,220 590,268 625,320 H0 Z";

/** Le poisson, sous le trajet du mégot. */
const POISSON = { x: 905, y: 258 };

/** Fraction des 18 s où le mégot passe au-dessus du poisson (mesurée sur TRAJET_PATH). */
const T_PASSAGE = 0.89;

/** Instant relatif au passage du mégot, en keyTime. */
function t(delta: number) {
  return (T_PASSAGE + delta).toFixed(3);
}

/** Le poisson dessiné autour de l'origine ; animé, il pâlit et ses yeux deviennent des croix. */
function Poisson({ anime = false }: { anime?: boolean }) {
  const palit = anime ? (
    <animate
      attributeName="fill"
      values="#F5EFE0;#F5EFE0;#C9C2B4;#C9C2B4"
      keyTimes={`0;${t(0.015)};${t(0.08)};1`}
      dur="18s"
      repeatCount="indefinite"
    />
  ) : null;
  return (
    <>
      <ellipse rx="13" ry="5.5" fill="#F5EFE0">
        {palit}
      </ellipse>
      <path d="M-13,0 L-20,-3.5 L-20,3.5 Z" fill="#F5EFE0">
        {palit}
      </path>
      <path
        d="M-6,-4 C-4,-6 0,-6 2,-4"
        fill="none"
        stroke="#1A4B6E"
        strokeWidth="0.7"
        opacity="0.35"
      />
      <circle cx="7" cy="-1.5" r="1.1" fill="#1A4B6E">
        {anime && (
          <animate
            attributeName="opacity"
            values="1;1;0;0"
            keyTimes={`0;${t(0.015)};${t(0.02)};1`}
            dur="18s"
            repeatCount="indefinite"
          />
        )}
      </circle>
      {anime && (
        <path
          d="M5.6,-2.9 L8.4,-0.1 M8.4,-2.9 L5.6,-0.1"
          stroke="#1A4B6E"
          strokeWidth="0.9"
          strokeLinecap="round"
          opacity="0"
        >
          <animate
            attributeName="opacity"
            values="0;0;1;1"
            keyTimes={`0;${t(0.015)};${t(0.02)};1`}
            dur="18s"
            repeatCount="indefinite"
          />
        </path>
      )}
    </>
  );
}

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
            <linearGradient id="trajet-sol" gradientUnits="userSpaceOnUse" x1="0" y1="156" x2="0" y2="320">
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
            <radialGradient id="trajet-lampe" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F5EFE0" stopOpacity="0.65" />
              <stop offset="55%" stopColor="#F5EFE0" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#F5EFE0" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="trajet-berge-eau" gradientUnits="userSpaceOnUse" x1="530" y1="0" x2="600" y2="0">
              <stop offset="0%" stopColor="#217A70" stopOpacity="0" />
              <stop offset="100%" stopColor="#217A70" stopOpacity="0.55" />
            </linearGradient>
            <filter id="trajet-soft" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.2" />
            </filter>
            <clipPath id="trajet-clip-cadre">
              <rect width="1200" height="320" />
            </clipPath>
            <clipPath id="trajet-clip-eau">
              <path d={EAU} />
            </clipPath>
          </defs>

          {/* --- Eau : Loire / estuaire / océan --- */}
          <path
            d={EAU}
            fill="url(#trajet-eau)"
          />
          {/* Bande de surface */}
          <path
            d={`${EAU_SURFACE} L1200,230 C1100,226 1040,222 970,218 C890,214 810,226 730,216 C670,210 610,204 560,214 C535,215 510,216 480,218 Z`}
            fill="url(#trajet-eau-haut)"
          />
          {/* Ligne d'horizon d'eau */}
          <path
            d={EAU_SURFACE}
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
            {/* Poisson : il nage, le mégot passe au-dessus de lui, il meurt et remonte le ventre en l'air */}
            <g className="trajet-poisson trajet-poisson--motion">
              <animate
                attributeName="opacity"
                values="0;0.55;0.55;0"
                keyTimes="0;0.04;0.95;1"
                dur="18s"
                repeatCount="indefinite"
              />
              <g transform={`translate(${POISSON.x},${POISSON.y})`}>
                <g>
                  <animateTransform
                    attributeName="transform"
                    type="translate"
                    values="0 0;-22 4;0 0;0 0;3 -1;-3 1;0 0;6 -46;6 -46"
                    keyTimes={`0;0.4;${t(-0.03)};${t(0)};${t(0.015)};${t(0.03)};${t(0.045)};0.98;1`}
                    dur="18s"
                    repeatCount="indefinite"
                  />
                  <g>
                    <animateTransform
                      attributeName="transform"
                      type="scale"
                      values="1 1;1 1;1 -1;1 -1"
                      keyTimes={`0;${t(0.045)};${t(0.075)};1`}
                      dur="18s"
                      repeatCount="indefinite"
                    />
                    <Poisson anime />
                  </g>
                </g>
              </g>
            </g>
            <g
              className="trajet-poisson trajet-poisson--static"
              transform={`translate(${POISSON.x},${POISSON.y})`}
              opacity="0.5"
            >
              <Poisson />
            </g>
          </g>

          {/* --- Pont de Saint-Nazaire : géométrie du logo (voir Hero.tsx), à l'échelle 2.
               Dessiné avant le sol et la plage : le tablier file derrière le talus et sort du cadre. --- */}
          <g clipPath="url(#trajet-clip-cadre)">
            <g className="trajet-pont" transform="translate(820,156) scale(2)" fill="#1A4B6E" stroke="#1A4B6E">
              {/* Reflet */}
              <g opacity="0.12" transform="translate(0,33) scale(1,-0.32)" filter="url(#trajet-soft)" stroke="none">
                <rect x="-21.3" y="-38" width="4.6" height="78" rx="2.3" />
                <rect x="16.7" y="-38" width="4.6" height="78" rx="2.3" />
              </g>
              <path
                d="M-19,-35 L-50.5,9 M-19,-32 L-40,7.1 M-19,-29 L-30,5 M-19,-35 L-12,1.1 M-19,-31.5 L-6.5,0.4 M-19,-28 L-1.5,0.1 M19,-35 L50.5,9 M19,-32 L40,7.1 M19,-29 L30,5 M19,-35 L12,1.1 M19,-31.5 L6.5,0.4 M19,-28 L1.5,0.1"
                fill="none"
                strokeWidth="0.9"
                strokeLinecap="round"
              />
              <path
                d="M-100,12.5 C-80,12 -68,11 -58,10 C-32,7 -15,0 0,0 C15,0 32,7 58,10 C68,11 80,12 100,12.5"
                fill="none"
                strokeWidth="2.8"
                strokeLinecap="round"
              />
              {/* Le tablier se prolonge au-delà des deux rives, comme sur l'accueil */}
              <path
                d="M-100,12.5 C-160,12.5 -260,9 -900,3 M100,12.5 C160,12.5 260,9 900,3"
                fill="none"
                strokeWidth="2.8"
              />
              <rect x="-21.3" y="-38" width="4.6" height="78" rx="2.3" stroke="none" />
              <rect x="16.7" y="-38" width="4.6" height="78" rx="2.3" stroke="none" />
            </g>
          </g>
          {/* Pied des pylônes sous la surface : voilé d'eau, avec un remous */}
          <g clipPath="url(#trajet-clip-eau)" fill="#217A70" opacity="0.65">
            <rect x="775" y="190" width="14" height="50" />
            <rect x="851" y="190" width="14" height="50" />
          </g>
          <g fill="none" stroke="#F5EFE0" strokeWidth="1.2" opacity="0.5">
            <ellipse cx="782" cy="207" rx="9" ry="1.8" />
            <ellipse cx="858" cy="208" rx="9" ry="1.8" />
          </g>

          {/* --- Sol / sous-sol --- */}
          <path d={SOL} fill="url(#trajet-sol)" />
          <path d="M0,240 H571 L625,320 H0 Z" fill="url(#trajet-sol-sombre)" />
          {/* Partie immergée du talus, voilée d'eau : la berge se fond dans l'estuaire */}
          <g clipPath="url(#trajet-clip-eau)">
            <path
              d="M540,196 C558,220 590,268 625,320 L540,320 C528,280 520,240 516,196 Z"
              fill="url(#trajet-berge-eau)"
            />
          </g>
          <path
            d="M470,156 C505,158 525,176 540,196"
            fill="none"
            stroke="#B5A68C"
            strokeWidth="1.2"
            opacity="0.6"
          />
          {/* Strates de terre */}
          <g stroke="#B5A68C" strokeWidth="1" opacity="0.4" fill="none">
            <path d="M0,210 H520" />
            <path d="M0,248 H560" />
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

          {/* --- Caniveau : au niveau du trottoir, fond creusé qui mène l'eau à la grille --- */}
          <path d="M298,156 C306,156 310,160 318,160 H328 V168 H298 Z" fill="#A39B90" />
          <path
            d="M298,156 C306,156 310,160 318,160 H328"
            fill="none"
            stroke="#726C64"
            strokeWidth="1.4"
          />
          <path d="M298,156 V168" fill="none" stroke="#8A8278" strokeWidth="1" opacity="0.5" />
          {/* Filet d'eau qui file vers la grille */}
          <path
            d="M306,158 C312,159.5 318,159.5 328,159.5"
            fill="none"
            stroke="#2A8C7E"
            strokeWidth="2.2"
            strokeLinecap="round"
            opacity="0.5"
          />

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

          {/* --- Bouche d'égout : grille en fonte au ras du sol, regard en dessous --- */}
          <g className="trajet-avaloir">
            {/* Regard : cadre béton et puits sombre où plonge la conduite */}
            <rect x="326" y="156" width="40" height="32" fill="#8E8680" />
            <rect x="331" y="159" width="30" height="29" fill="#1F2E38" />
            <rect x="331" y="159" width="30" height="5" fill="#0F1C24" opacity="0.6" />
            {/* Gouttes qui tombent dans le regard */}
            <g fill="#6ED4C2" opacity="0.7">
              <ellipse cx="337" cy="170" rx="1" ry="1.9" />
              <ellipse cx="354" cy="167" rx="1" ry="1.8" />
              <ellipse cx="346" cy="178" rx="0.9" ry="1.6" />
            </g>
            {/* Grille */}
            <rect x="327" y="154.6" width="38" height="5" rx="1.2" fill="#2C3E4A" stroke="#0F3550" strokeWidth="1.2" />
            <g fill="#0F1C24">
              <rect x="331" y="156.4" width="3.2" height="2.6" rx="0.6" />
              <rect x="337" y="156.4" width="3.2" height="2.6" rx="0.6" />
              <rect x="343" y="156.4" width="3.2" height="2.6" rx="0.6" />
              <rect x="349" y="156.4" width="3.2" height="2.6" rx="0.6" />
              <rect x="355" y="156.4" width="3.2" height="2.6" rx="0.6" />
            </g>
          </g>

          {/* --- Conduite pluviale --- */}
          <g className="trajet-conduite">
            <path
              d="M346,186 V244 C346,252 352,256 360,256 H600"
              fill="none"
              stroke="#2E4050"
              strokeWidth="26"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M346,186 V244 C346,252 352,256 360,256 H600"
              fill="none"
              stroke="url(#trajet-pipe)"
              strokeWidth="22"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M346,186 V244 C346,252 352,256 360,256 H600"
              fill="none"
              stroke="url(#trajet-pipe-in)"
              strokeWidth="13"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Filet d'eau bas de conduite */}
            <path
              d="M346,186 V244 C346,252 352,256 360,256 H592"
              fill="none"
              stroke="#2A8C7E"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.28"
            />
            {/* Joints de tuyau */}
            <g fill="none" stroke="#2E4050" strokeWidth="2.2" opacity="0.7">
              <ellipse cx="346" cy="214" rx="12" ry="5" />
              <ellipse cx="430" cy="256" rx="5" ry="12" />
              <ellipse cx="500" cy="256" rx="5" ry="12" />
            </g>
            {/* Embouchure */}
            <ellipse cx="600" cy="256" rx="12" ry="15" fill="#2E4050" />
            <ellipse cx="600" cy="256" rx="7" ry="10" fill="#4E6675" />
            <ellipse cx="599" cy="256" rx="4" ry="6.5" fill="#1F6E63" opacity="0.8" />
            {/* Jet vers l'estuaire */}
            <path
              d="M610,250 C628,246 642,236 654,222"
              fill="none"
              stroke="#8EE0D2"
              strokeWidth="2.8"
              strokeLinecap="round"
              opacity="0.7"
            />
            <path
              d="M610,260 C630,256 646,246 658,232"
              fill="none"
              stroke="#2A8C7E"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.4"
            />
          </g>

          {/* --- Plage : colline de sable qui cache la fin du tablier --- */}
          <path
            d="M950,320 C975,250 1000,196 1040,176 C1090,152 1150,148 1200,148 V320 Z"
            fill="url(#trajet-sable)"
          />
          {/* Ligne d'écume au pied de la colline */}
          <path
            d="M958,316 C978,262 994,228 1010,206"
            fill="none"
            stroke="#F5EFE0"
            strokeWidth="3.5"
            strokeLinecap="round"
            opacity="0.55"
          />
          <path
            d="M970,318 C990,266 1006,232 1020,212"
            fill="none"
            stroke="#2A8C7E"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.2"
          />
          {/* Vaguelettes sur le sable */}
          <g stroke="#B9A888" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" fill="none">
            <path d="M1062,196 q7,-4 14,0" />
            <path d="M1092,214 q8,-4 16,0" />
            <path d="M1124,236 q7,-3.5 14,0" />
            <path d="M1156,262 q6,-3 12,0" />
          </g>
          {/* Herbes de dune */}
          <g stroke="#1A4B6E" strokeWidth="1.3" strokeLinecap="round" opacity="0.45" fill="none">
            <path d="M1150,150 q-2,-10 1,-18" />
            <path d="M1154,152 q1,-12 4,-16" />
            <path d="M1160,149 q-1,-11 2,-17" />
            <path d="M1166,152 q2,-10 5,-14" />
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
