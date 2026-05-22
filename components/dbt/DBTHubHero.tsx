"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Wind, Waves, Sun, Users } from "lucide-react";
import ThreeMindsDiagram from "./ThreeMindsDiagram";

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } };
const reveal = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const } } };

const pillars = [
  { icon: <Wind size={14} strokeWidth={1.5} />, label: "Mindfulness", href: "#mindfulness" },
  { icon: <Waves size={14} strokeWidth={1.5} />, label: "Distress Tolerance", href: "#distress-tolerance" },
  { icon: <Sun size={14} strokeWidth={1.5} />, label: "Emotion Regulation", href: "#emotion-regulation" },
  { icon: <Users size={14} strokeWidth={1.5} />, label: "Interpersonal", href: "#interpersonal" },
];

export default function DBTHubHero() {
  return (
    <section className="dbt-hero-section" style={{ background: "var(--cream)", paddingTop: "105px", paddingBottom: "80px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "10%", right: "5%", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(212,232,194,0.5) 0%, transparent 70%)", filter: "blur(40px)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "absolute", bottom: "10%", left: "5%", width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(circle, rgba(232,216,240,0.4) 0%, transparent 70%)", filter: "blur(40px)", pointerEvents: "none", zIndex: 0 }} />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginTop: "24px",
            marginBottom: "32px",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.85rem",
            fontWeight: 500,
            color: "var(--text-secondary)",
          }}
        >
          <Link
            href="/"
            style={{
              textDecoration: "none",
              color: "inherit",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--sage)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-secondary)"; }}
          >
            Home
          </Link>
          <span style={{ opacity: 0.35, userSelect: "none" }}>/</span>
          <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>DBT Toolkit</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }} className="dbt-hero-grid">
          <motion.div variants={stagger} initial="hidden" animate="visible">
            <motion.div variants={reveal}>
              <span className="section-label">The Toolkit</span>
            </motion.div>
            <motion.h1 variants={reveal} className="h1" style={{ color: "var(--text-primary)", marginBottom: "24px" }}>
              Skills that
              <br />
              actually work.
            </motion.h1>
            <motion.p variants={reveal} className="body-lg" style={{ color: "var(--text-secondary)", marginBottom: "40px", maxWidth: "440px" }}>
              DBT gives you concrete tools for the moments that feel impossible. Here&apos;s everything, explained.
            </motion.p>

            <motion.div variants={reveal} className="chip-scroll" style={{ flexWrap: "wrap" }}>
              {pillars.map((p) => (
                <a
                  key={p.label}
                  href={p.href}
                  className="chip-pill"
                  style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "var(--sage-dark)", borderColor: "var(--sage-light)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--sage-light)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "white"; }}
                >
                  <span style={{ color: "var(--sage)" }}>{p.icon}</span>
                  {p.label}
                </a>
              ))}
            </motion.div>

            <motion.div
              variants={reveal}
              className="handwritten-arrow-wrapper"
              aria-hidden
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                marginTop: "14px",
                transform: "rotate(-3deg)",
              }}
            >
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                <path d="M4 28 C 8 20, 14 12, 26 6" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M26 6 L 18 6" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M26 6 L 26 14" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span className="handwritten" style={{ color: "var(--text-muted)", fontSize: "1.05rem" }}>
                start here
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            style={{ display: "flex", justifyContent: "center" }}
            className="dbt-venn-col"
          >
            <ThreeMindsDiagram />
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .dbt-hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .dbt-venn-col { max-width: 300px; margin: 0 auto; }
        }
        .venn-circle {
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
        }
        .venn-circle.rational:hover {
          stroke-width: 3.5px;
          fill: rgba(90, 138, 176, 0.18) !important;
        }
        .venn-circle.emotional:hover {
          stroke-width: 3.5px;
          fill: rgba(200, 122, 90, 0.18) !important;
        }
        .venn-overlap {
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
        }
        .venn-overlap:hover {
          fill: rgba(92, 138, 94, 0.45) !important;
        }
      `}</style>
    </section>
  );
}


