import { zones } from "@/data/ramassages-page";
import { Stagger, StaggerItem } from "../Reveal";

/** Scène parc : arbre, banc, allée. */
function IlluParcs() {
  return (
    <svg viewBox="0 0 200 110" aria-hidden="true" className="zone-svg">
      <defs>
        <linearGradient id="z-parc-ciel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E8F4F1" />
          <stop offset="100%" stopColor="#F5EFE0" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="z-parc-feuillage" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0%" stopColor="#4EBEB0" />
          <stop offset="100%" stopColor="#217A70" />
        </linearGradient>
        <linearGradient id="z-parc-tronc" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0F3550" />
          <stop offset="45%" stopColor="#1A4B6E" />
          <stop offset="100%" stopColor="#0F3550" />
        </linearGradient>
        <radialGradient id="z-parc-ombre" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0F3550" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#0F3550" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="200" height="110" fill="url(#z-parc-ciel)" />

      {/* Herbe */}
      <ellipse cx="100" cy="100" rx="92" ry="10" fill="#C8DED4" />
      <ellipse cx="100" cy="98" rx="86" ry="6" fill="url(#z-parc-ombre)" />
      <g stroke="#2A8C7E" strokeWidth="1.4" strokeLinecap="round" opacity="0.45" fill="none">
        <path d="M18,94 q2,-6 0,-10" />
        <path d="M24,96 q3,-7 1,-12" />
        <path d="M178,95 q-2,-6 0,-11" />
        <path d="M186,97 q-1,-5 1,-9" />
      </g>

      {/* Allée */}
      <path
        d="M108,100 C118,88 128,78 148,72 C162,68 176,70 190,74"
        fill="none"
        stroke="#D4C9B4"
        strokeWidth="10"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M108,100 C118,88 128,78 148,72 C162,68 176,70 190,74"
        fill="none"
        stroke="#E8DFCC"
        strokeWidth="5"
        strokeLinecap="round"
        opacity="0.85"
      />

      {/* Arbre */}
      <rect x="48" y="42" width="10" height="52" rx="4" fill="url(#z-parc-tronc)" />
      <ellipse cx="53" cy="48" rx="3" ry="8" fill="#2A4A5C" opacity="0.25" />
      <circle cx="53" cy="28" r="26" fill="url(#z-parc-feuillage)" />
      <circle cx="36" cy="38" r="15" fill="#2A8C7E" />
      <circle cx="70" cy="36" r="14" fill="#3BA899" />
      <circle cx="48" cy="18" r="12" fill="#6ED4C2" opacity="0.55" />
      {/* Branches discrètes */}
      <path
        d="M53,48 C46,40 40,34 34,32 M53,44 C60,36 66,32 72,30"
        fill="none"
        stroke="#0F3550"
        strokeWidth="1.2"
        opacity="0.2"
        strokeLinecap="round"
      />

      {/* Banc */}
      <g>
        <rect x="96" y="64" width="78" height="7" rx="2" fill="#2A8C7E" />
        <rect x="96" y="74" width="78" height="6" rx="2" fill="#217A70" />
        <rect x="102" y="61" width="5" height="28" rx="1.5" fill="#0F3550" />
        <rect x="163" y="61" width="5" height="28" rx="1.5" fill="#0F3550" />
        {/* Dossier */}
        <rect x="100" y="52" width="70" height="5" rx="2" fill="#3BA899" />
        <rect x="108" y="48" width="4" height="16" rx="1" fill="#0F3550" opacity="0.7" />
        <rect x="158" y="48" width="4" height="16" rx="1" fill="#0F3550" opacity="0.7" />
      </g>

      {/* Mégots au sol */}
      <g>
        <rect x="128" y="92" width="9" height="2.4" rx="1.2" fill="#F5EFE0" stroke="#0F3550" strokeWidth="0.6" />
        <rect x="135" y="92" width="2.2" height="2.4" rx="0.6" fill="#DD8A2E" />
        <rect x="152" y="95" width="7" height="2" rx="1" fill="#F5EFE0" stroke="#0F3550" strokeWidth="0.5" transform="rotate(-18 155 96)" />
        <rect x="157" y="94.2" width="1.8" height="2" rx="0.5" fill="#DD8A2E" transform="rotate(-18 158 95)" />
      </g>
    </svg>
  );
}

/** Scène rue : façade, lampadaire, poubelle, caniveau. */
function IlluRues() {
  return (
    <svg viewBox="0 0 200 110" aria-hidden="true" className="zone-svg">
      <defs>
        <linearGradient id="z-rue-ciel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E4EEF4" />
          <stop offset="100%" stopColor="#F5EFE0" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="z-rue-facade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E8DFCC" />
          <stop offset="100%" stopColor="#D4C9B4" />
        </linearGradient>
        <linearGradient id="z-rue-trottoir" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C8C0B2" />
          <stop offset="100%" stopColor="#A39B90" />
        </linearGradient>
        <radialGradient id="z-rue-lampe" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F5EFE0" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#F5EFE0" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="200" height="110" fill="url(#z-rue-ciel)" />

      {/* Trottoir */}
      <path d="M0,86 H200 V102 H0 Z" fill="url(#z-rue-trottoir)" />
      <path d="M0,86 H200" fill="none" stroke="#8A8278" strokeWidth="1.4" />
      <path d="M0,102 H200" fill="none" stroke="#6E6862" strokeWidth="1" opacity="0.4" />
      {/* Caniveau */}
      <path d="M0,102 H200 V108 H0 Z" fill="#8E8680" />
      <ellipse cx="72" cy="105" rx="18" ry="1.6" fill="#2A8C7E" opacity="0.3" />

      {/* Maison */}
      <g>
        <path d="M18,86 V32 H78 V86 Z" fill="url(#z-rue-facade)" />
        <path d="M14,32 L48,8 L82,32 Z" fill="#1A4B6E" />
        <path
          d="M14,32 L48,8 L82,32"
          fill="none"
          stroke="#0F3550"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <rect x="62" y="14" width="8" height="16" rx="1" fill="#0F3550" />
        <rect x="26" y="40" width="14" height="16" rx="1.5" fill="#F5EFE0" stroke="#1A4B6E" strokeWidth="1.4" />
        <rect x="50" y="40" width="14" height="16" rx="1.5" fill="#F5EFE0" stroke="#1A4B6E" strokeWidth="1.4" />
        <path
          d="M33,40 V56 M26,48 H40 M57,40 V56 M50,48 H64"
          stroke="#1A4B6E"
          strokeWidth="0.9"
          opacity="0.4"
        />
        <rect x="40" y="64" width="12" height="22" rx="1" fill="#0F3550" />
        <circle cx="49" cy="76" r="1" fill="#F5EFE0" opacity="0.7" />
      </g>

      {/* Lampadaire */}
      <g>
        <circle cx="118" cy="18" r="18" fill="url(#z-rue-lampe)" />
        <rect x="115.5" y="28" width="5" height="58" rx="2.5" fill="#1A4B6E" />
        <path
          d="M118,28 C118,28 138,24 142,32 C143.5,35 142,38 138,38 H118 Z"
          fill="#1A4B6E"
        />
        <ellipse cx="138" cy="35" rx="5.5" ry="4" fill="#F5EFE0" opacity="0.95" />
        <ellipse cx="138" cy="35" rx="3" ry="2" fill="#DD8A2E" opacity="0.45" />
      </g>

      {/* Poubelle */}
      <g>
        <rect x="156" y="58" width="30" height="28" rx="3" fill="#2A8C7E" />
        <rect x="156" y="58" width="30" height="6" rx="2" fill="#217A70" />
        <rect x="161" y="52" width="20" height="8" rx="2" fill="#0F3550" />
        <path
          d="M164,68 H178 M164,74 H178"
          stroke="#F5EFE0"
          strokeWidth="1.2"
          opacity="0.35"
          strokeLinecap="round"
        />
      </g>

      {/* Mégots près du caniveau */}
      <g>
        <rect x="94" y="96" width="10" height="2.6" rx="1.2" fill="#F5EFE0" stroke="#0F3550" strokeWidth="0.6" />
        <rect x="101.5" y="96" width="2.5" height="2.6" rx="0.6" fill="#DD8A2E" />
        <rect x="112" y="99" width="8" height="2.2" rx="1" fill="#F5EFE0" stroke="#0F3550" strokeWidth="0.5" transform="rotate(12 116 100)" />
        <rect x="117.5" y="99" width="2" height="2.2" rx="0.5" fill="#DD8A2E" transform="rotate(12 118.5 100)" />
      </g>
    </svg>
  );
}

/** Scène nature : dune, plage, mer, soleil. */
function IlluNature() {
  return (
    <svg viewBox="0 0 200 110" aria-hidden="true" className="zone-svg">
      <defs>
        <linearGradient id="z-nat-ciel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D8EEF0" />
          <stop offset="55%" stopColor="#F0EBE0" />
          <stop offset="100%" stopColor="#E8DFCC" />
        </linearGradient>
        <linearGradient id="z-nat-eau" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4EBEB0" />
          <stop offset="55%" stopColor="#2A8C7E" />
          <stop offset="100%" stopColor="#1F6E63" />
        </linearGradient>
        <linearGradient id="z-nat-sable" x1="0" y1="0" x2="0.2" y2="1">
          <stop offset="0%" stopColor="#F2EAD8" />
          <stop offset="100%" stopColor="#C9B89A" />
        </linearGradient>
        <radialGradient id="z-nat-soleil" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#DD8A2E" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#DD8A2E" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="200" height="110" fill="url(#z-nat-ciel)" />

      {/* Soleil */}
      <circle cx="42" cy="28" r="22" fill="url(#z-nat-soleil)" />
      <circle cx="42" cy="28" r="11" fill="#DD8A2E" />
      <circle cx="38" cy="24" r="3.5" fill="#F5EFE0" opacity="0.35" />

      {/* Mer */}
      <path
        d="M0,62 C30,54 60,58 90,62 C120,66 150,58 200,60 V110 H0 Z"
        fill="url(#z-nat-eau)"
      />
      <path
        d="M0,62 C30,54 60,58 90,62 C120,66 150,58 200,60"
        fill="none"
        stroke="#F5EFE0"
        strokeWidth="1.2"
        opacity="0.35"
      />
      <path
        d="M0,74 q20,-5 40,0 t40,0 t40,0 t40,0 t40,0"
        fill="none"
        stroke="#F5EFE0"
        strokeWidth="1.3"
        opacity="0.3"
      />
      <path
        d="M10,88 q18,-4 36,0 t36,0 t36,0"
        fill="none"
        stroke="#0F3550"
        strokeWidth="1"
        opacity="0.12"
      />

      {/* Dune / plage */}
      <path
        d="M95,110 C110,78 140,58 200,52 V110 Z"
        fill="url(#z-nat-sable)"
      />
      <path
        d="M108,98 C130,78 160,62 200,58"
        fill="none"
        stroke="#F5EFE0"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.5"
      />
      <g stroke="#B9A888" strokeWidth="1.3" strokeLinecap="round" opacity="0.5" fill="none">
        <path d="M140,82 q5,-3 10,0" />
        <path d="M158,90 q5,-3 10,0" />
        <path d="M174,98 q4,-2 8,0" />
      </g>

      {/* Herbes de dune */}
      <g stroke="#1A4B6E" strokeWidth="1.3" strokeLinecap="round" opacity="0.5" fill="none">
        <path d="M168,64 q-1,-8 1,-14" />
        <path d="M172,66 q1,-9 3,-13" />
        <path d="M178,62 q-1,-8 2,-13" />
        <path d="M184,68 q2,-7 4,-11" />
      </g>

      {/* Sentier */}
      <path
        d="M118,110 C128,92 148,78 178,70"
        fill="none"
        stroke="#B9A888"
        strokeWidth="5"
        strokeLinecap="round"
        opacity="0.45"
      />

      {/* Mégots sur le sentier */}
      <g>
        <rect x="132" y="92" width="9" height="2.4" rx="1.2" fill="#F5EFE0" stroke="#0F3550" strokeWidth="0.6" />
        <rect x="139" y="92" width="2.2" height="2.4" rx="0.6" fill="#DD8A2E" />
        <rect x="148" y="84" width="7" height="2" rx="1" fill="#F5EFE0" stroke="#0F3550" strokeWidth="0.5" transform="rotate(-25 151 85)" />
        <rect x="152.5" y="83.2" width="1.8" height="2" rx="0.5" fill="#DD8A2E" transform="rotate(-25 153.5 84)" />
        <rect x="160" y="76" width="8" height="2.2" rx="1" fill="#F5EFE0" stroke="#0F3550" strokeWidth="0.5" transform="rotate(8 164 77)" />
        <rect x="165.5" y="76" width="2" height="2.2" rx="0.5" fill="#DD8A2E" transform="rotate(8 166.5 77)" />
      </g>
    </svg>
  );
}

function Illustration({ id }: { id: (typeof zones)[number]["id"] }) {
  if (id === "parcs") return <IlluParcs />;
  if (id === "rues") return <IlluRues />;
  return <IlluNature />;
}

export function Zones() {
  return (
    <Stagger className="zones" stagger={0.1}>
      {zones.map((z) => (
        <StaggerItem key={z.id} className="zone">
          <div className="zone-illu">
            <Illustration id={z.id} />
          </div>
          <h3 className="display">{z.nom}</h3>
          <p>{z.texte}</p>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
