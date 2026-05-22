"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wind, Waves, Sun, Users, type LucideIcon } from "lucide-react";

interface Pillar {
  id: string;
  name: string;
  icon: LucideIcon;
  accent: string;
}

const PILLARS: Pillar[] = [
  { id: "mindfulness", name: "Mindfulness", icon: Wind, accent: "#5c8a5e" },
  { id: "distress-tolerance", name: "Distress Tolerance", icon: Waves, accent: "#c87a5a" },
  { id: "emotion-regulation", name: "Emotion Regulation", icon: Sun, accent: "#7a6eb8" },
  { id: "interpersonal", name: "Interpersonal", icon: Users, accent: "#5a8ab0" },
];

export default function DBTScrollIndicator() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  useEffect(() => {
    const sections = PILLARS.map((p) => document.getElementById(p.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          const id = (visible[0].target as HTMLElement).id;
          const idx = PILLARS.findIndex((p) => p.id === id);
          if (idx >= 0) setActiveIdx(idx);
        }
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0.05, 0.25, 0.5] }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const activePillar = activeIdx !== null ? PILLARS[activeIdx] : null;

  return (
    <AnimatePresence>
      {activePillar && (
        <motion.div
          key={activePillar.id}
          initial={{ opacity: 0, y: 12, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.32, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            position: "fixed",
            bottom: 24,
            right: 24,
            zIndex: 90,
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "12px 18px 12px 14px",
            background: "rgba(253, 248, 243, 0.92)",
            backdropFilter: "blur(14px) saturate(140%)",
            WebkitBackdropFilter: "blur(14px) saturate(140%)",
            border: `1px solid ${activePillar.accent}33`,
            borderRadius: "var(--radius-full)",
            boxShadow: "0 12px 32px rgba(28, 35, 28, 0.12), 0 2px 6px rgba(0,0,0,0.04)",
            pointerEvents: "auto",
            maxWidth: "260px",
          }}
          className="dbt-indicator"
        >
          <span
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: `${activePillar.accent}1f`,
              border: `1px solid ${activePillar.accent}55`,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              color: activePillar.accent,
              flexShrink: 0,
            }}
          >
            <activePillar.icon size={15} strokeWidth={1.5} />
          </span>
          <div style={{ minWidth: 0 }}>
            <p
              style={{
                fontFamily: "'Caveat', cursive",
                fontSize: "0.85rem",
                color: "var(--text-muted)",
                margin: 0,
                lineHeight: 1,
              }}
            >
              pillar {(activeIdx ?? 0) + 1} of {PILLARS.length}
            </p>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.86rem",
                fontWeight: 600,
                color: activePillar.accent,
                margin: 0,
                lineHeight: 1.3,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {activePillar.name}
            </p>
          </div>
          <div style={{ display: "flex", gap: "4px", marginLeft: "4px" }}>
            {PILLARS.map((p, i) => (
              <span
                key={p.id}
                aria-hidden
                style={{
                  width: "5px",
                  height: "5px",
                  borderRadius: "50%",
                  background: i === activeIdx ? p.accent : "var(--border)",
                  transition: "background 0.3s ease",
                }}
              />
            ))}
          </div>
          <style>{`
            @media (max-width: 600px) {
              .dbt-indicator { right: 12px !important; bottom: 12px !important; padding: 10px 14px 10px 12px !important; }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

