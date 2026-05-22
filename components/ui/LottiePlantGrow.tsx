"use client";
import { useEffect, useRef, useState } from "react";

export default function LottiePlantGrow({ size = 100 }: { size?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="plant-grow-anim" style={{ width: size, height: size, position: "relative" }}>
      <svg viewBox="0 0 100 120" style={{ width: "100%", height: "100%", overflow: "visible" }} aria-hidden="true">
        <circle cx="50" cy="110" r="3" fill="rgba(92, 138, 94, 0.3)" />

        <line
          x1="50" y1="110" x2="50" y2="40"
          stroke="#5c8a5e"
          strokeWidth="2"
          strokeLinecap="round"
          className={visible ? "plant-stem grow" : "plant-stem"}
        />

        <path
          d="M50,65 C40,55 28,52 24,58 C20,64 30,70 50,65"
          fill="#5c8a5e"
          opacity="0.7"
          className={visible ? "plant-leaf leaf-left grow" : "plant-leaf leaf-left"}
        />

        <path
          d="M50,50 C60,40 72,37 76,43 C80,49 70,55 50,50"
          fill="#5c8a5e"
          opacity="0.6"
          className={visible ? "plant-leaf leaf-right grow" : "plant-leaf leaf-right"}
        />

        <path
          d="M50,40 C45,30 42,20 50,15 C58,20 55,30 50,40"
          fill="#5c8a5e"
          opacity="0.8"
          className={visible ? "plant-leaf leaf-top grow" : "plant-leaf leaf-top"}
        />
      </svg>

      <style>{`
        .plant-stem {
          stroke-dasharray: 70;
          stroke-dashoffset: 70;
          transition: none;
        }
        .plant-stem.grow {
          animation: stem-grow 1s ease-out 0.2s forwards;
        }
        .plant-leaf {
          transform: scale(0);
          transform-origin: 50px 65px;
          opacity: 0;
        }
        .leaf-left { transform-origin: 50px 65px; }
        .leaf-right { transform-origin: 50px 50px; }
        .leaf-top { transform-origin: 50px 40px; }

        .plant-leaf.grow.leaf-left {
          animation: leaf-unfurl 0.6s ease-out 0.9s forwards;
        }
        .plant-leaf.grow.leaf-right {
          animation: leaf-unfurl 0.6s ease-out 1.1s forwards;
        }
        .plant-leaf.grow.leaf-top {
          animation: leaf-unfurl 0.6s ease-out 1.3s forwards;
        }

        @keyframes stem-grow {
          to { stroke-dashoffset: 0; }
        }
        @keyframes leaf-unfurl {
          0% { transform: scale(0) rotate(-10deg); opacity: 0; }
          60% { transform: scale(1.1) rotate(2deg); opacity: 0.8; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .plant-stem.grow {
            animation: none;
            stroke-dashoffset: 0;
          }
          .plant-leaf.grow {
            animation: none;
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
