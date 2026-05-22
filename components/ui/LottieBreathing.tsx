"use client";

export default function LottieBreathing({ size = 80 }: { size?: number }) {
  return (
    <div className="breathing-anim" style={{ width: size, height: size, position: "relative" }}>
      <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }} aria-hidden="true">
        <circle
          cx="50" cy="50" r="38"
          fill="none"
          stroke="#5c8a5e"
          strokeWidth="1"
          opacity="0.2"
          className="breathing-ring-outer"
        />
        <circle
          cx="50" cy="50" r="28"
          fill="rgba(92, 138, 94, 0.08)"
          stroke="#5c8a5e"
          strokeWidth="1.5"
          opacity="0.6"
          className="breathing-circle-main"
        />
        <circle
          cx="50" cy="50" r="6"
          fill="#5c8a5e"
          opacity="0.5"
          className="breathing-core"
        />
      </svg>

      <style>{`
        .breathing-ring-outer {
          animation: breathe-ring 4s ease-in-out infinite;
          transform-origin: center;
        }
        .breathing-circle-main {
          animation: breathe-main 4s ease-in-out infinite;
          transform-origin: center;
        }
        .breathing-core {
          animation: breathe-core 4s ease-in-out infinite;
          transform-origin: center;
        }
        @keyframes breathe-ring {
          0%, 100% { r: 38; opacity: 0.15; }
          50% { r: 44; opacity: 0.3; }
        }
        @keyframes breathe-main {
          0%, 100% { r: 28; opacity: 0.5; }
          50% { r: 34; opacity: 0.75; }
        }
        @keyframes breathe-core {
          0%, 100% { r: 6; opacity: 0.4; }
          50% { r: 8; opacity: 0.7; }
        }
        @media (prefers-reduced-motion: reduce) {
          .breathing-ring-outer,
          .breathing-circle-main,
          .breathing-core {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
