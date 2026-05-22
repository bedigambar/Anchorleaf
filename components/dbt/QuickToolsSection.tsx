"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wind, Waves, Sun, Users, Play, Pause, RotateCcw } from "lucide-react";
import Link from "next/link";

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } };
const reveal = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] as const } } };

const pillars = [
  {
    icon: <Wind size={22} strokeWidth={1.5} />,
    label: "Mindfulness",
    href: "/dbt#mindfulness",
    accent: "#5c8a5e",
    bg: "rgba(92,138,94,0.08)",
    border: "rgba(92,138,94,0.2)",
    desc: "Be present. Observe without judging.",
  },
  {
    icon: <Waves size={22} strokeWidth={1.5} />,
    label: "Distress Tolerance",
    href: "/dbt#distress-tolerance",
    accent: "#c87a5a",
    bg: "rgba(200,122,90,0.08)",
    border: "rgba(200,122,90,0.2)",
    desc: "Survive a crisis without making it worse.",
  },
  {
    icon: <Sun size={22} strokeWidth={1.5} />,
    label: "Emotion Regulation",
    href: "/dbt#emotion-regulation",
    accent: "#7a6eb8",
    bg: "rgba(122,110,184,0.08)",
    border: "rgba(122,110,184,0.2)",
    desc: "Understand and reduce the intensity of emotions.",
  },
  {
    icon: <Users size={22} strokeWidth={1.5} />,
    label: "Interpersonal",
    href: "/dbt#interpersonal",
    accent: "#5a8ab0",
    bg: "rgba(90,138,176,0.08)",
    border: "rgba(90,138,176,0.2)",
    desc: "Ask for what you need. Keep your self-respect.",
  },
];

type Phase = { label: string; sub: string; duration: number; scale: number; color: string };
const PHASES: Phase[] = [
  { label: "Breathe in", sub: "through your nose", duration: 4, scale: 1.35, color: "#5c8a5e" },
  { label: "Hold", sub: "gently", duration: 4, scale: 1.35, color: "#7a6eb8" },
  { label: "Breathe out", sub: "slowly through your mouth", duration: 6, scale: 1, color: "#c87a5a" },
  { label: "Hold", sub: "naturally", duration: 2, scale: 1, color: "#5a8ab0" },
];

function BreathingTool() {
  const [running, setRunning] = useState(false);
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const phase = PHASES[phaseIdx];
  const progress = elapsed / phase.duration;

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setElapsed((prev) => {
          const next = prev + 0.05;
          if (next >= phase.duration) {
            setPhaseIdx((pi) => (pi + 1) % PHASES.length);
            return 0;
          }
          return next;
        });
      }, 50);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running, phase.duration, phaseIdx]);

  const reset = () => { setRunning(false); setPhaseIdx(0); setElapsed(0); };

  const circumference = 2 * Math.PI * 70;
  const strokeDash = circumference - progress * circumference;

  return (
    <div style={{ background: "white", borderRadius: "24px", padding: "36px 32px", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)", textAlign: "center" }}>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "6px" }}>Paced Breathing · T.I.P.P. Skill</p>
      <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 400, color: "var(--text-primary)", marginBottom: "28px" }}>4 · 4 · 6 · 2</p>

      <div style={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: "24px" }}>
        <svg width="180" height="180" style={{ transform: "rotate(-90deg)" }}>
          <circle cx="90" cy="90" r="70" fill="none" stroke="var(--border)" strokeWidth="6" />
          <circle
            cx="90" cy="90" r="70" fill="none"
            stroke={running ? phase.color : "var(--sage)"}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDash}
            style={{ transition: "stroke 0.6s ease" }}
          />
        </svg>

        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <motion.div
            animate={{ scale: running ? phase.scale : 1 }}
            transition={{ duration: phase.duration, ease: "easeInOut" }}
            style={{ width: "80px", height: "80px", borderRadius: "50%", background: running ? `${phase.color}18` : "rgba(92,138,94,0.08)", border: `2px solid ${running ? phase.color : "var(--sage)"}`, display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.6s ease, border-color 0.6s ease" }}
          >
            <Wind size={24} strokeWidth={1.5} style={{ color: running ? phase.color : "var(--sage)", transition: "color 0.6s ease" }} />
          </motion.div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={running ? phaseIdx : "idle"}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3 }}
          style={{ marginBottom: "24px", minHeight: "52px" }}
        >
          {running ? (
            <>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", fontWeight: 400, color: phase.color, marginBottom: "4px" }}>{phase.label}</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "var(--text-muted)" }}>{phase.sub}</p>
            </>
          ) : (
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
              In for 4 · Hold 4 · Out for 6 · Hold 2
            </p>
          )}
        </motion.div>
      </AnimatePresence>

      <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
        <button
          onClick={() => setRunning((r) => !r)}
          style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "var(--sage)", color: "white", border: "none", borderRadius: "12px", padding: "12px 24px", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "0.9rem", cursor: "pointer", boxShadow: "var(--shadow-sage)", transition: "all 0.2s ease" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "var(--sage-dark)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "var(--sage)"; e.currentTarget.style.transform = ""; }}
        >
          {running ? <Pause size={16} strokeWidth={1.5} /> : <Play size={16} strokeWidth={1.5} />}
          {running ? "Pause" : "Begin"}
        </button>
        <button
          onClick={reset}
          style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "white", color: "var(--text-secondary)", border: "1.5px solid var(--border)", borderRadius: "12px", padding: "12px 18px", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "0.9rem", cursor: "pointer", transition: "all 0.2s ease" }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--sage)"; e.currentTarget.style.color = "var(--sage-dark)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-secondary)"; }}
        >
          <RotateCcw size={14} strokeWidth={1.5} />
          Reset
        </button>
      </div>
    </div>
  );
}

export default function QuickToolsSection() {
  return (
    <section
      id="tools"
      style={{
        background: "var(--cream)",
        padding: "120px 0 80px",
        scrollMarginTop: "80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", top: "20%", right: "5%", width: "360px", height: "360px", borderRadius: "50%", background: "radial-gradient(circle, rgba(232,216,240,0.35) 0%, transparent 70%)", filter: "blur(50px)", pointerEvents: "none" }} />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} style={{ marginBottom: "60px", maxWidth: "600px" }}>
          <motion.div variants={reveal}>
            <span className="section-label">Quick Tools</span>
          </motion.div>
          <motion.h2 variants={reveal} className="h2" style={{ color: "var(--text-primary)", marginBottom: "16px" }}>
            Use a skill,<br />right now.
          </motion.h2>
          <motion.p variants={reveal} className="body-lg" style={{ color: "var(--text-secondary)" }}>
            You don&apos;t need to read everything first. Pick what you need in this moment.
          </motion.p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", alignItems: "start" }} className="tools-grid">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
            <motion.p variants={reveal} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "16px" }}>
              Jump to a pillar
            </motion.p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {pillars.map((p) => (
                <motion.div key={p.label} variants={reveal}>
                  <Link
                    href={p.href}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                      background: "white",
                      borderRadius: "16px",
                      padding: "18px 20px",
                      border: "1.5px solid var(--border)",
                      boxShadow: "var(--shadow-sm)",
                      textDecoration: "none",
                      transition: "all 0.25s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-md)";
                      (e.currentTarget as HTMLElement).style.borderColor = p.border;
                      (e.currentTarget as HTMLElement).style.background = p.bg;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = "";
                      (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-sm)";
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                      (e.currentTarget as HTMLElement).style.background = "white";
                    }}
                  >
                    <span style={{ color: p.accent, flexShrink: 0 }}>{p.icon}</span>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "0.9rem", color: "var(--text-primary)", marginBottom: "2px" }}>{p.label}</p>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "var(--text-muted)" }}>{p.desc}</p>
                    </div>
                    <span style={{ color: "var(--text-muted)", fontSize: "1rem", flexShrink: 0 }}>?</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "16px" }}>
              Breathing exercise
            </p>
            <BreathingTool />
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", color: "var(--text-muted)", textAlign: "center", marginTop: "14px", lineHeight: 1.6 }}>
              From the <strong>T.I.P.P.</strong> skill: Paced Breathing activates your parasympathetic nervous system.
            </p>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .tools-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
