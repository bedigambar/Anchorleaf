"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const } },
};

function useCountUp(target: number, duration = 2000, active: boolean) {
  const [count, setCount] = useState(target); // start at target as fallback (non-zero)
  useEffect(() => {
    if (!active) return;
    setCount(0); // reset to 0 before animating
    const startTime = performance.now();
    const raf = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, [active, target, duration]);
  return count;
}

interface StatCardProps {
  number: number;
  suffix?: string;
  label: string;
  sub: string;
  source?: string;
  color: string;
  accentBg: string;
  active: boolean;
}

export default function StatCard({
  number,
  suffix = "",
  label,
  sub,
  source,
  color,
  accentBg,
  active,
}: StatCardProps) {
  const count = useCountUp(number, 2000, active);
  return (
    <motion.div
      variants={reveal}
      className="stat-card"
      style={{
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "260px",
        padding: "36px 24px 24px 24px",
        background: "white",
        border: "1px solid var(--border)",
        borderRadius: "20px",
        boxShadow: "var(--shadow-sm)",
        textAlign: "center",
        transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(92, 138, 94, 0.06)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "var(--shadow-sm)";
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", background: color }} />

      <div>
        <div className="stat-number" style={{ fontSize: "2.2rem", fontWeight: 700, color: color, marginBottom: "8px" }}>
          {count}{suffix}
        </div>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 600,
          fontSize: "0.95rem",
          color: "var(--text-primary)",
          marginBottom: "8px",
          minHeight: "44px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          lineHeight: 1.3,
        }}>
          {label}
        </p>
        <p className="body-sm" style={{
          color: "var(--text-secondary)",
          fontSize: "0.85rem",
          lineHeight: 1.4,
          margin: 0,
          minHeight: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          {sub}
        </p>
      </div>
      {source && (
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.68rem",
          color: "var(--text-secondary)",
          opacity: 0.85,
          fontWeight: 500,
          marginTop: "16px",
          margin: 0,
        }}>
          {source}
        </p>
      )}
    </motion.div>
  );
}
