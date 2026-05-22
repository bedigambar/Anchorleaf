"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } };
const reveal = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const } } };

const facts = [
  { num: "1979", label: "Year DBT was developed by Marsha Linehan at the University of Washington." },
  { num: "77%", label: "Effectiveness rate: the most evidence-backed therapy for BPD." },
  { num: "4", label: "Core skill pillars, each targeting a different dimension of your inner life." },
];

export default function WiseMindSection() {
  return (
    <section
      id="about"
      style={{
        background: "#ffffff",
        padding: "120px 0",
        position: "relative",
        overflow: "hidden",
        scrollMarginTop: "80px",
      }}
    >
      <div style={{ position: "absolute", top: "10%", left: "0%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(212,232,194,0.25) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "5%", right: "0%", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(200,184,232,0.2) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center", marginBottom: "80px" }} className="about-grid">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }}>
            <motion.div variants={reveal}>
              <div className="section-marker" style={{ marginBottom: "20px" }}>
                <span className="line" style={{ background: "#5c8a5e", width: "32px" }} />
                <span className="dot" style={{ background: "#5c8a5e" }} />
                <span className="line" style={{ background: "#5c8a5e", width: "32px" }} />
              </div>
              <span style={{ fontFamily: "'Caveat', cursive", fontSize: "1rem", fontWeight: 600, color: "#5c8a5e", letterSpacing: "0.04em", display: "block", marginBottom: "12px" }}>
                Where it all begins
              </span>
            </motion.div>

            <motion.h2 variants={reveal} className="h2" style={{ color: "var(--text-primary)", marginBottom: "28px" }}>
              Finding your<br />
              <em style={{ fontStyle: "italic" }}>Wise Mind.</em>
            </motion.h2>

            <motion.p variants={reveal} className="body-lg" style={{ color: "var(--text-secondary)", marginBottom: "20px", maxWidth: "480px" }}>
              We all have a <strong>Rational Mind</strong>, ruled by facts and logic. We have an <strong>Emotional Mind</strong>, ruled by feelings and urges. Wise Mind is the space where both come together.
            </motion.p>

            <motion.p variants={reveal} className="body-md" style={{ color: "var(--text-secondary)", marginBottom: "32px", maxWidth: "480px" }}>
              DBT doesn&apos;t ask you to stop feeling. It asks you to build a life so full of skills, safety, and self-knowledge that the waves of emotion stop pulling you under.
            </motion.p>

            <motion.blockquote variants={reveal} className="pull-quote" style={{ borderLeft: "3px solid #5c8a5e", paddingLeft: "20px", margin: "0 0 32px 0", fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontStyle: "italic", color: "var(--text-secondary)", lineHeight: 1.6 }}>
              &ldquo;I feel this <em>and</em> I know this, so I will do this.&rdquo;
              <br />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontStyle: "normal", fontSize: "0.78rem", color: "var(--text-muted)", display: "block", marginTop: "8px", letterSpacing: "0.06em", textTransform: "uppercase" }}>The Wise Mind synthesis</span>
            </motion.blockquote>

            <motion.div variants={reveal}>
              <Link href="/dbt#mindfulness" className="btn-ghost-dark" style={{ display: "inline-flex" }}>
                Explore the four pillars
                <ArrowRight size={16} strokeWidth={1.5} />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ display: "flex", justifyContent: "center" }}
            className="about-visual-col"
          >
            <DialecticsVisual />
          </motion.div>
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}
          className="about-facts-grid"
        >
          {facts.map((f) => (
            <motion.div key={f.num} variants={reveal} style={{ background: "var(--cream)", borderRadius: "16px", padding: "28px 24px", border: "1px solid var(--border)" }}>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.5rem", fontWeight: 700, color: "var(--sage)", letterSpacing: "-0.03em", marginBottom: "10px" }}>{f.num}</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>{f.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .about-visual-col { max-width: 340px; margin: 0 auto; }
          .about-facts-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function DialecticsVisual() {
  const sides = [
    {
      label: "Acceptance",
      sub: "You are doing the best you can in this moment.",
      color: "#c87a5a",
      bg: "rgba(200,122,90,0.06)",
      border: "rgba(200,122,90,0.2)",
    },
    {
      label: "Change",
      sub: "You need to do better, try harder, grow.",
      color: "#5c8a5e",
      bg: "rgba(92,138,94,0.06)",
      border: "rgba(92,138,94,0.2)",
    },
  ];

  return (
    <div style={{ width: "100%", maxWidth: "420px" }}>
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "8px" }}>The core dialectic</p>
        <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", fontWeight: 400, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>Both things are true.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
        {sides.map((s) => (
          <div key={s.label} style={{ background: s.bg, borderRadius: "16px", padding: "24px 20px", border: `1.5px solid ${s.border}`, transition: "transform 0.2s ease" }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.15rem", fontWeight: 700, color: s.color, marginBottom: "10px" }}>{s.label}</p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>{s.sub}</p>
          </div>
        ))}
      </div>

      <div style={{ background: "linear-gradient(135deg, rgba(212,232,194,0.4) 0%, rgba(200,184,232,0.3) 100%)", borderRadius: "16px", padding: "24px", border: "1.5px solid rgba(92,138,94,0.15)", textAlign: "center" }}>
        <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#5c8a5e", margin: "0 auto 14px", animation: "pulse-dot 2.5s ease-in-out infinite" }} />
        <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 700, color: "#3d6140", marginBottom: "8px" }}>Wise Mind</p>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>The integration of both. Your inner wisdom, accessible to everyone.</p>
      </div>

      <style>{`
        @keyframes pulse-dot {
          0%, 100% { transform: scale(1); opacity: 0.9; }
          50% { transform: scale(1.6); opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
