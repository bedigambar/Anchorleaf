"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } } };
const reveal  = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const } } };

const steps = [
  {
    num: "01",
    title: "Learn",
    body: "Understand BPD and DBT through real, empathetic content. No jargon. No judgment. Just clarity.",
    accent: "#5c8a5e",
  },
  {
    num: "02",
    title: "Practice",
    body: "Use interactive DBT skill exercises tailored to how you feel today. Skills that meet you where you are.",
    accent: "#c8b8e8",
  },
  {
    num: "03",
    title: "Track",
    body: "Notice patterns, celebrate growth. Small wins compound. You are building something real.",
    accent: "#f5c8a8",
  },
];

export default function TheApproach() {
  return (
    <section style={{ background: "var(--navy)", position: "relative", overflow: "hidden" }} className="section">
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.025, pointerEvents: "none", zIndex: 0 }} xmlns="http://www.w3.org/2000/svg">
        <filter id="approach-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#approach-noise)" />
      </svg>

      <div style={{ position: "absolute", top: "20%", left: "10%", width: "300px", height: "300px", borderRadius: "50%", background: "rgba(92,138,94,0.06)", filter: "blur(60px)", zIndex: 0 }} />
      <div style={{ position: "absolute", bottom: "20%", right: "10%", width: "250px", height: "250px", borderRadius: "50%", background: "rgba(200,184,232,0.07)", filter: "blur(60px)", zIndex: 0 }} />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          style={{ textAlign: "center", marginBottom: "48px" }}
        >
          <motion.div variants={reveal}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(92,138,94,0.8)", display: "inline-block", marginBottom: "16px" }}>
              How Anchorleaf Works
            </span>
          </motion.div>
          <motion.h2 
            variants={reveal} 
            className="h2" 
            style={{ 
              color: "var(--text-on-dark)", 
              marginBottom: "0",
              maxWidth: "480px",
              marginLeft: "auto",
              marginRight: "auto",
              lineHeight: 1.2
            }}
          >
            Your emotions
            <br />
            have patterns.
            <br />
            We help you
            <br />
            find them.
          </motion.h2>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          style={{ position: "relative" }}
        >
          <div style={{ position: "absolute", top: "48px", left: "calc(16.67% + 48px)", right: "calc(16.67% + 48px)", height: "1px", borderTop: "2px dashed rgba(255,255,255,0.26)", zIndex: 0 }} className="connector-line" />

          <div className="grid-steps" style={{ position: "relative", zIndex: 1 }}>
            {steps.map((step) => (
              <motion.div
                key={step.num}
                variants={reveal}
                className="approach-step"
                style={{ 
                  textAlign: "center", 
                  padding: "0 16px",
                  borderRadius: "16px",
                  transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                  cursor: "pointer",
                }}
              >
                <div 
                  className="approach-circle" 
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    background: "var(--navy)", 
                    border: `2px solid ${step.accent}40`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 24px",
                    boxShadow: `0 0 32px ${step.accent}15`,
                    transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                    "--accent-color": step.accent,
                    "--shadow-glow": `0 0 24px ${step.accent}40`,
                  } as React.CSSProperties}
                >
                  <span style={{ fontFamily: "'Caveat', cursive", fontSize: "1.5rem", fontWeight: 700, color: step.accent }}>
                    {step.num}
                  </span>
                </div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 400, color: "var(--text-on-dark)", marginBottom: "12px" }}>
                  {step.title}
                </h3>
                <p 
                  className="body-md" 
                  style={{ 
                    color: "var(--text-on-dark-muted)", 
                    transition: "color 0.3s ease",
                    maxWidth: "280px",
                    marginLeft: "auto",
                    marginRight: "auto"
                  }}
                >
                  {step.body}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ textAlign: "center", marginTop: "56px" }}
        >
          <Link href="/dbt" style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "var(--sage-light)", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, textDecoration: "none", fontSize: "0.95rem" }}
            onMouseEnter={(e) => { (e.currentTarget.querySelector(".cta-arrow") as HTMLElement).style.transform = "translateX(4px)"; }}
            onMouseLeave={(e) => { (e.currentTarget.querySelector(".cta-arrow") as HTMLElement).style.transform = "translateX(0)"; }}
          >
            Explore the full toolkit <span className="cta-arrow" style={{ display: "inline-flex", transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)" }}><ArrowRight size={16} strokeWidth={1.5} /></span>
          </Link>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) { .connector-line { display: none !important; } }
        
        .approach-step {
          will-change: transform;
        }
        .approach-step:hover {
          transform: translateY(-4px);
        }
        .approach-step:hover .approach-circle {
          border-color: var(--accent-color) !important;
          box-shadow: var(--shadow-glow) !important;
          background: #25253d !important; 
          transform: scale(1.05);
        }
        .approach-step:hover p {
          color: rgba(254, 250, 245, 0.9) !important;
        }
      `}</style>
    </section>
  );
}
