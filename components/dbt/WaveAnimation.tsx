"use client";

export default function WaveAnimation() {
  return (
    <div className="wave-animation-wrapper">
      <svg
        viewBox="0 0 400 60"
        preserveAspectRatio="none"
        style={{ width: "100%", height: "32px", display: "block" }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7a6eb8" stopOpacity="0.35" />
            <stop offset="50%" stopColor="#7a6eb8" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#7a6eb8" stopOpacity="0.35" />
          </linearGradient>
        </defs>
        <path
          className="wave-path wave-path-1"
          d="M0,30 C50,10 100,50 150,30 C200,10 250,50 300,30 C350,10 400,50 450,30 C500,10 550,50 600,30 C650,10 700,50 750,30 C800,10 850,50 900,30"
          fill="none"
          stroke="url(#waveGrad)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          className="wave-path wave-path-2"
          d="M0,30 C50,10 100,50 150,30 C200,10 250,50 300,30 C350,10 400,50 450,30 C500,10 550,50 600,30 C650,10 700,50 750,30 C800,10 850,50 900,30"
          fill="none"
          stroke="#7a6eb8"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.2"
        />
      </svg>

      <style>{`
        .wave-animation-wrapper {
          overflow: hidden;
          border-radius: 8px;
          margin-top: 4px;
        }
        .wave-path {
          animation: wave-drift 3s ease-in-out infinite;
          will-change: transform;
        }
        .wave-path-1 {
          animation-duration: 3s;
        }
        .wave-path-2 {
          animation-duration: 4s;
          animation-delay: -1.5s;
        }
        @keyframes wave-drift {
          0% { transform: translateX(0); }
          50% { transform: translateX(-150px); }
          100% { transform: translateX(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .wave-path { animation: none; }
        }
      `}</style>
    </div>
  );
}
