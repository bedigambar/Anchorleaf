"use client";

export default function ThreeMindsDiagram() {
  return (
    <svg viewBox="0 0 380 340" style={{ width: "100%", maxWidth: "420px", overflow: "visible" }} aria-label="Three Minds Venn Diagram">
      <defs>
        <linearGradient id="rationalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5a8ab0" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#5a8ab0" stopOpacity="0.14" />
        </linearGradient>
        <linearGradient id="emotionalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c87a5a" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#c87a5a" stopOpacity="0.14" />
        </linearGradient>
        <linearGradient id="wiseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5c8a5e" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#5c8a5e" stopOpacity="0.38" />
        </linearGradient>

        <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="7" floodColor="#1c1c1e" floodOpacity="0.06" />
        </filter>
      </defs>

      <circle
        className="venn-circle rational"
        cx="145"
        cy="170"
        r="130"
        fill="url(#rationalGrad)"
        style={{ filter: "url(#softShadow)" }}
      />
      <circle
        className="venn-circle emotional"
        cx="235"
        cy="170"
        r="130"
        fill="url(#emotionalGrad)"
        style={{ filter: "url(#softShadow)" }}
      />

      <clipPath id="rational-clip">
        <circle cx="145" cy="170" r="130" />
      </clipPath>
      <circle
        className="venn-overlap"
        cx="235"
        cy="170"
        r="130"
        clipPath="url(#rational-clip)"
        fill="url(#wiseGrad)"
      />

      <circle cx="190" cy="170" r="4.5" fill="#5c8a5e" opacity="0.9">
        <animate attributeName="r" values="3.5;6.5;3.5" dur="2.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.9;0.4;0.9" dur="2.5s" repeatCount="indefinite" />
      </circle>

      <text x="88" y="115" className="venn-label rational" textAnchor="middle" fontSize="13" fontFamily="'Playfair Display', serif" fill="#5a8ab0" fontWeight="500">
        Rational Mind
      </text>
      <text x="292" y="115" className="venn-label emotional" textAnchor="middle" fontSize="13" fontFamily="'Playfair Display', serif" fill="#c87a5a" fontWeight="500">
        Emotional Mind
      </text>

      <text x="190" y="152" className="venn-label wise" textAnchor="middle" fontSize="11" fontFamily="'DM Sans', sans-serif" fontWeight="700" fill="#2c4c2f" style={{ letterSpacing: "0.06em" }}>
        WISE MIND
      </text>

      <text x="68" y="185" textAnchor="middle" fontSize="10" fontFamily="'DM Sans', sans-serif" fill="#6e6e76" opacity="0.95" fontWeight="500">
        <tspan x="68" dy="0">· Facts &amp; Logic</tspan>
        <tspan x="68" dy="14">· Objective Data</tspan>
        <tspan x="68" dy="14">· Planful Reason</tspan>
      </text>

      <text x="312" y="185" textAnchor="middle" fontSize="10" fontFamily="'DM Sans', sans-serif" fill="#6e6e76" opacity="0.95" fontWeight="500">
        <tspan x="312" dy="0">· Urges &amp; Feelings</tspan>
        <tspan x="312" dy="14">· Raw Experience</tspan>
        <tspan x="312" dy="14">· High Intensity</tspan>
      </text>

      <text x="190" y="210" textAnchor="middle" fontSize="9" fontFamily="'DM Sans', sans-serif" fill="#5c8a5e" opacity="0.85" fontWeight="600">
        <tspan x="190" dy="0">The Integration</tspan>
        <tspan x="190" dy="12">of Both Sides</tspan>
      </text>
    </svg>
  );
}
