import { etapes } from "@/data/rejoindre";

/**
 * Scène du hero « Nous rejoindre » : les trois étapes simples de l'ancien
 * site, reliées par un fil, et le mégot du logo qui saute de l'une à l'autre en
 * boucle. Tout en CSS (rejoindre.css, préfixe hj-).
 */
export function HeroRejoindre() {
  const xs = [90, 260, 430];
  return (
    <div className="hj" aria-hidden="true">
      <svg viewBox="0 0 520 300" className="hj-svg" focusable="false">
        <path d={`M${xs[0]},170 C150,120 200,120 ${xs[1]},170 C320,220 370,220 ${xs[2]},170`} fill="none" stroke="#2A8C7E" strokeWidth="3" strokeDasharray="6 10" className="hj-fil" />
        {etapes.map((e, i) => (
          <g key={e.titre} className="hj-etape" style={{ ["--i" as string]: i }}>
            <circle cx={xs[i]} cy="170" r="34" fill="#F5EFE0" stroke="#1A4B6E" strokeWidth="4" />
            <text x={xs[i]} y="181" textAnchor="middle" fontSize="28" fontWeight="800" fill="#1A4B6E" fontFamily="var(--font-display)">
              {i + 1}
            </text>
            <text x={xs[i]} y="232" textAnchor="middle" fontSize="15" fontWeight="600" fill="#1A4B6E" fontFamily="var(--font-body)">
              <tspan x={xs[i]}>{e.hero[0]}</tspan>
              <tspan x={xs[i]} dy="19">
                {e.hero[1]}
              </tspan>
            </text>
          </g>
        ))}
        <g className="hj-megot">
          <svg x="-26" y="-20" width="52" height="36" viewBox="-30 -30 60 40" overflow="visible">
            <use href="#megot" />
          </svg>
        </g>
      </svg>
    </div>
  );
}
