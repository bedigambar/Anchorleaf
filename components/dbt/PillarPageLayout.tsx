"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedBlobs from "@/components/ui/AnimatedBlobs";

interface PillarPageLayoutProps {
  num: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  themeColor: string; // e.g., "var(--sage)"
  themeBg: string;    // e.g., "#f0f7ec"
  pillarClass: string; // e.g., "pillar-mindfulness"
  nextPillarName?: string;
  nextPillarHref?: string;
  nextThemeColor?: string;
  nextThemeColorDark?: string;
  children: React.ReactNode;
}

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const } }
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } }
};

export default function PillarPageLayout({
  num,
  title,
  subtitle,
  icon,
  themeColor,
  themeBg,
  pillarClass,
  nextPillarName,
  nextPillarHref,
  nextThemeColor,
  nextThemeColorDark,
  children
}: PillarPageLayoutProps) {
  return (
    <div className={pillarClass} style={{ background: "white", minHeight: "100vh" }}>
      <section
        style={{
          background: themeBg,
          paddingTop: "140px",
          paddingBottom: "80px",
          position: "relative",
          overflow: "hidden"
        }}
      >
        <AnimatedBlobs
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.45,
            pointerEvents: "none",
            zIndex: 0
          }}
        />

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "8px",
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
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = themeColor; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-secondary)"; }}
            >
              Home
            </Link>
            <span style={{ opacity: 0.35, userSelect: "none" }}>/</span>
            <Link
              href="/dbt"
              style={{
                textDecoration: "none",
                color: "inherit",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = themeColor; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-secondary)"; }}
            >
              DBT Toolkit
            </Link>
            <span style={{ opacity: 0.35, userSelect: "none" }}>/</span>
            <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>{title}</span>
          </div>

          <motion.div variants={stagger} initial="hidden" animate="visible">
            <motion.div variants={reveal} style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "56px",
                  height: "56px",
                  borderRadius: "16px",
                  background: "white",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.03)",
                  color: themeColor
                }}
              >
                {icon}
              </span>
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  color: "var(--text-secondary)"
                }}
              >
                {num}
              </span>
            </motion.div>

            <motion.h1
              variants={reveal}
              className="h1"
              style={{
                color: "var(--text-primary)",
                marginBottom: "20px",
                letterSpacing: "-0.02em"
              }}
            >
              {title}
            </motion.h1>

            <motion.p
              variants={reveal}
              className="body-lg"
              style={{
                color: "var(--text-secondary)",
                maxWidth: "600px",
                lineHeight: 1.6
              }}
            >
              {subtitle}
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="section" style={{ position: "relative", zIndex: 2, background: "white" }}>
        <div className="container">
          {children}
        </div>
      </section>

      <section
        style={{
          background: "var(--cream)",
          borderTop: "1px solid var(--border)",
          padding: "80px 0",
          textAlign: "center"
        }}
      >
        <div className="container-narrow">
          {nextPillarName && nextPillarHref ? (
            <div>
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--text-secondary)",
                  display: "inline-block",
                  marginBottom: "16px"
                }}
              >
                Continue Learning
              </span>
              <h3
                className="h2"
                style={{
                  fontSize: "2rem",
                  color: "var(--text-primary)",
                  marginBottom: "32px"
                }}
              >
                Next Up: {nextPillarName}
              </h3>
              <Link
                href={nextPillarHref}
                className="btn-primary"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: nextThemeColor || "var(--pillar-accent)",
                  borderColor: nextThemeColor || "var(--pillar-accent)",
                  color: "white",
                  transition: "all 0.3s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = nextThemeColorDark || "var(--pillar-accent-dark)";
                  e.currentTarget.style.borderColor = nextThemeColorDark || "var(--pillar-accent-dark)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = nextThemeColor || "var(--pillar-accent)";
                  e.currentTarget.style.borderColor = nextThemeColor || "var(--pillar-accent)";
                  e.currentTarget.style.transform = "none";
                }}
              >
                Explore {nextPillarName} <ArrowRight size={16} strokeWidth={1.5} />
              </Link>
            </div>
          ) : (
            <div>
              <h3
                className="h2"
                style={{
                  fontSize: "2rem",
                  color: "var(--text-primary)",
                  marginBottom: "32px"
                }}
              >
                You&apos;ve explored all DBT Pillars
              </h3>
              <Link
                href="/dbt"
                className="btn-primary"
                style={{
                  background: "var(--pillar-accent)",
                  borderColor: "var(--pillar-accent)",
                  color: "white",
                  transition: "all 0.3s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--pillar-accent-dark)";
                  e.currentTarget.style.borderColor = "var(--pillar-accent-dark)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--pillar-accent)";
                  e.currentTarget.style.borderColor = "var(--pillar-accent)";
                  e.currentTarget.style.transform = "none";
                }}
              >
                Return to DBT Toolkit
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
