"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Waves, BookHeart, Layers, BookOpen, ArrowRight } from "lucide-react";

const PATHS = [
  {
    href: "/tools",
    icon: Waves,
    label: "right now",
    title: "I'm overwhelmed.",
    body: "Grounding exercises, breathing tools, and crisis lines you can use in the next sixty seconds.",
    cta: "Open the toolkit",
    accent: "#c87a5a",
    accentDark: "#a05a3a",
    tint: "rgba(245, 200, 176, 0.32)",
    softTint: "rgba(245, 200, 176, 0.10)",
  },
  {
    href: "/learn",
    icon: BookHeart,
    label: "i want to understand",
    title: "What's actually happening to me?",
    body: "Plain-language articles on BPD, emotional intensity, and what the research actually says.",
    cta: "Start learning",
    accent: "#5c8a5e",
    accentDark: "#3d6140",
    tint: "rgba(212, 232, 194, 0.4)",
    softTint: "rgba(212, 232, 194, 0.14)",
  },
  {
    href: "/dbt",
    icon: Layers,
    label: "i want skills",
    title: "Teach me the DBT skills.",
    body: "Every skill from Marsha Linehan's curriculum, including STOP, TIPP, DEAR MAN, and all four pillars.",
    cta: "Explore skills",
    accent: "#7a6eb8",
    accentDark: "#5a50a0",
    tint: "rgba(200, 184, 232, 0.34)",
    softTint: "rgba(200, 184, 232, 0.12)",
  },
  {
    href: "/handbook",
    icon: BookOpen,
    label: "i want to read",
    title: "DBT Skills Handbook",
    body: "Browse, bookmark, and search the complete DBT Skills training handouts and worksheets.",
    cta: "Open the Handbook",
    accent: "#5a8ab0",
    accentDark: "#3a6a90",
    tint: "rgba(176, 200, 232, 0.34)",
    softTint: "rgba(176, 200, 232, 0.12)",
  },
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const reveal = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] as const } },
};

export default function WhereToStart() {
  return (
    <section
      style={{
        background: "var(--cream)",
        padding: "100px 0 80px",
        position: "relative",
      }}
    >
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
          style={{ textAlign: "center", marginBottom: "56px", maxWidth: "620px", margin: "0 auto 56px" }}
        >
          <motion.span variants={reveal} className="section-label">
            Where to start
          </motion.span>
          <motion.h2
            variants={reveal}
            className="h2"
            style={{ color: "var(--text-primary)", marginTop: "14px", marginBottom: "16px" }}
          >
            What brought you here today?
          </motion.h2>
          <motion.p
            variants={reveal}
            className="body-md"
            style={{ color: "var(--text-secondary)" }}
          >
            You don&apos;t have to read the whole site. Pick the door that matches the moment
            you&apos;re in.
          </motion.p>

          <motion.div
            variants={reveal}
            className="handwritten-arrow-wrapper"
            aria-hidden
            style={{
              position: "relative",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              marginTop: "16px",
              transform: "rotate(-4deg)",
            }}
          >
            <span className="handwritten" style={{ color: "var(--text-muted)", fontSize: "1.15rem" }}>
              pick any door
            </span>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" style={{ transform: "rotate(90deg) scaleX(-1)" }}>
              <path
                d="M4 28 C 8 20, 14 12, 26 6"
                stroke="var(--text-muted)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M26 6 L 18 6"
                stroke="var(--text-muted)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M26 6 L 26 14"
                stroke="var(--text-muted)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
            maxWidth: "1080px",
            margin: "0 auto",
          }}
          className="where-grid"
        >
          {PATHS.map((p) => {
            const Icon = p.icon;
            return (
              <motion.div key={p.href} variants={reveal}>
                <Link
                  href={p.href}
                  className="where-card"
                  style={{
                    display: "block",
                    background: `linear-gradient(135deg, ${p.tint} 0%, ${p.softTint} 100%)`,
                    border: `1px solid ${p.accent}28`,
                    borderRadius: "var(--radius-xl)",
                    padding: "36px 32px",
                    textDecoration: "none",
                    transition:
                      "transform 0.32s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.32s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.32s ease",
                    position: "relative",
                    overflow: "hidden",
                    height: "100%",
                  }}
                >
                  <div
                    aria-hidden
                    style={{
                      position: "absolute",
                      top: "-50px",
                      right: "-50px",
                      width: "180px",
                      height: "180px",
                      borderRadius: "50%",
                      background: `${p.accent}1a`,
                      filter: "blur(50px)",
                      pointerEvents: "none",
                    }}
                  />

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      marginBottom: "20px",
                      position: "relative",
                    }}
                  >
                    <span
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "var(--radius-md)",
                        background: "var(--warm-white)",
                        border: `1px solid ${p.accent}33`,
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: p.accent,
                      }}
                    >
                      <Icon size={20} strokeWidth={1.5} />
                    </span>
                    <span
                      style={{
                        fontFamily: "'Caveat', cursive",
                        fontSize: "1.15rem",
                        color: p.accentDark,
                      }}
                    >
                      {p.label}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "1.7rem",
                      fontWeight: 400,
                      letterSpacing: "-0.02em",
                      lineHeight: 1.2,
                      color: "var(--text-primary)",
                      marginBottom: "12px",
                      position: "relative",
                    }}
                  >
                    {p.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.96rem",
                      lineHeight: 1.65,
                      color: "var(--text-secondary)",
                      marginBottom: "24px",
                      position: "relative",
                    }}
                  >
                    {p.body}
                  </p>

                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "7px",
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 600,
                      fontSize: "0.92rem",
                      color: p.accentDark,
                      position: "relative",
                    }}
                  >
                    {p.cta}{" "}
                    <span className="where-arrow" style={{ display: "inline-flex", transition: "transform 0.28s ease" }}>
                      <ArrowRight size={15} strokeWidth={1.75} />
                    </span>
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <style>{`
        .where-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-card-hover);
        }
        .where-card:hover .where-arrow {
          transform: translateX(5px);
        }
        @media (max-width: 760px) {
          .where-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
