"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Leaf, ArrowRight, Sparkles, Home, Waves, BookOpen } from "lucide-react";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
const reveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] as const } },
};

const PATHS = [
  {
    href: "/",
    icon: Home,
    label: "Take me home",
    desc: "Back to the front door of Anchorleaf.",
    accent: "var(--sage)",
  },
  {
    href: "/tools",
    icon: Waves,
    label: "I need grounding",
    desc: "Right-now tools for distress and overwhelm.",
    accent: "#c87a5a",
  },
  {
    href: "/handbook",
    icon: BookOpen,
    label: "Open the Handbook",
    desc: "Read and search the DBT Skills Handbook.",
    accent: "#5a8ab0",
  },
];

export default function NotFound() {
  return (
    <>
      <main
        style={{
          minHeight: "calc(100dvh - 80px)",
          background: "var(--cream)",
          paddingTop: "120px",
          paddingBottom: "80px",
          position: "relative",
          overflow: "hidden",
        }}
        className="bpd-animated-bg"
      >
        <motion.div
          aria-hidden
          initial={{ opacity: 0, rotate: -8 }}
          animate={{ opacity: 0.08, rotate: 0 }}
          transition={{ duration: 1.6, ease: "easeOut" }}
          style={{
            position: "absolute",
            top: "8%",
            right: "-40px",
            color: "var(--sage)",
            pointerEvents: "none",
            transform: "rotate(-15deg)",
          }}
        >
          <Leaf size={280} strokeWidth={0.6} />
        </motion.div>

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            style={{
              maxWidth: "760px",
              margin: "0 auto",
              textAlign: "center",
            }}
          >
            <motion.span
              variants={reveal}
              style={{
                fontFamily: "'Caveat', cursive",
                fontSize: "1.4rem",
                color: "var(--sage-dark)",
                display: "inline-block",
                marginBottom: "20px",
              }}
            >
              you wandered a little
            </motion.span>

            <motion.div
              variants={reveal}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(5rem, 14vw, 8.5rem)",
                fontWeight: 400,
                color: "var(--sage)",
                lineHeight: 1,
                letterSpacing: "-0.04em",
                marginBottom: "10px",
              }}
            >
              <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                4
                <span style={{ position: "relative", display: "inline-flex" }}>
                  <Leaf
                    size={96}
                    strokeWidth={1.2}
                    style={{
                      color: "var(--sage-dark)",
                      transform: "rotate(-12deg)",
                    }}
                  />
                </span>
                4
              </span>
            </motion.div>

            <motion.h1
              variants={reveal}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
                fontWeight: 400,
                color: "var(--text-primary)",
                letterSpacing: "-0.02em",
                lineHeight: 1.25,
                marginBottom: "20px",
              }}
            >
              This page got lost in the breeze.
            </motion.h1>

            <motion.p
              variants={reveal}
              className="body-md"
              style={{
                color: "var(--text-secondary)",
                maxWidth: "520px",
                margin: "0 auto 48px",
              }}
            >
              We can&apos;t find what you were looking for. That&apos;s okay, there are a few
              steady places below you can land instead.
            </motion.p>

            <motion.div
              variants={stagger}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "16px",
                marginBottom: "40px",
              }}
              className="notfound-grid"
            >
              {PATHS.map((p) => {
                const Icon = p.icon;
                return (
                  <motion.div key={p.href} variants={reveal}>
                    <Link
                      href={p.href}
                      className="notfound-card"
                      style={{
                        display: "block",
                        padding: "24px 22px",
                        background: "var(--warm-white)",
                        border: "1px solid var(--border)",
                        borderRadius: "var(--radius-lg)",
                        textDecoration: "none",
                        textAlign: "left",
                        transition: "all 0.28s ease",
                        boxShadow: "var(--shadow-sm)",
                        // @ts-expect-error custom prop
                        "--accent": p.accent,
                      }}
                    >
                      <span
                        style={{
                          display: "inline-flex",
                          width: "40px",
                          height: "40px",
                          borderRadius: "var(--radius-md)",
                          background: `${p.accent}18`,
                          border: `1px solid ${p.accent}33`,
                          alignItems: "center",
                          justifyContent: "center",
                          color: p.accent,
                          marginBottom: "16px",
                        }}
                      >
                        <Icon size={18} strokeWidth={1.5} />
                      </span>
                      <p
                        style={{
                          fontFamily: "'Playfair Display', serif",
                          fontSize: "1.15rem",
                          fontWeight: 700,
                          color: "var(--text-primary)",
                          letterSpacing: "-0.01em",
                          marginBottom: "6px",
                        }}
                      >
                        {p.label}
                      </p>
                      <p
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.88rem",
                          lineHeight: 1.55,
                          color: "var(--text-secondary)",
                          marginBottom: "12px",
                        }}
                      >
                        {p.desc}
                      </p>
                      <span
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.85rem",
                          fontWeight: 600,
                          color: p.accent,
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        Go there{" "}
                        <span className="notfound-arrow" style={{ display: "inline-flex", transition: "transform 0.25s ease" }}>
                          <ArrowRight size={13} strokeWidth={1.75} />
                        </span>
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>

            <motion.p
              variants={reveal}
              style={{
                fontFamily: "'Caveat', cursive",
                fontSize: "1.15rem",
                color: "var(--text-muted)",
              }}
            >
              if you&apos;re here because something&apos;s wrong, help is always available (988 in US/Global, 14416 in India)
            </motion.p>
          </motion.div>
        </div>
      </main>

      <style>{`
        .notfound-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-card-hover);
          border-color: var(--accent) !important;
        }
        .notfound-card:hover .notfound-arrow {
          transform: translateX(4px);
        }
        @media (max-width: 720px) {
          .notfound-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
