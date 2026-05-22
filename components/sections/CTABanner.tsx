"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import LottiePlantGrow from "@/components/ui/LottiePlantGrow";

export default function CTABanner() {
  return (
    <section className="cta-animated-bg section-sm" style={{ position: "relative", overflow: "hidden" }}>
      <div className="container-narrow" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "8px" }}>
            <LottiePlantGrow size={80} />
          </div>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(212,232,194,0.8)", display: "inline-block", marginBottom: "20px" }}>
            Begin Your Journey
          </span>
          <h2 className="h2" style={{ color: "white", marginBottom: "20px" }}>
            Ready to feel
            <br />
            understood?
          </h2>
          <p className="body-lg" style={{ color: "rgba(255,255,255,0.78)", marginBottom: "40px", maxWidth: "520px", margin: "0 auto 40px" }}>
            No account. No paywall. Just the skills, and a comprehensive handbook to study them
            wherever you are.
          </p>
          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/handbook"
              className="cta-primary"
              style={{
                background: "white",
                color: "var(--sage-dark)",
                padding: "14px 26px",
                borderRadius: "var(--radius-full)",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                fontSize: "0.95rem",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: "0 10px 28px rgba(0,0,0,0.22)",
                transition: "all 0.25s ease",
              }}
            >
              <BookOpen size={15} strokeWidth={1.75} /> Open DBT Handbook
            </Link>
            <Link
              href="/dbt"
              className="cta-secondary"
              style={{
                background: "transparent",
                color: "white",
                border: "1.5px solid rgba(255,255,255,0.4)",
                padding: "14px 26px",
                borderRadius: "var(--radius-full)",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
                fontSize: "0.95rem",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                transition: "all 0.25s ease",
              }}
            >
              Explore the Skills <ArrowRight size={14} strokeWidth={1.75} className="cta-arrow" />
            </Link>
          </div>
          <p
            style={{
              fontFamily: "'Caveat', cursive",
              fontSize: "1.15rem",
              color: "rgba(254, 250, 245, 0.55)",
              marginTop: "28px",
            }}
          >
            free · no ads · no tracking
          </p>
        </motion.div>
      </div>
      <style>{`
        .cta-primary:hover { background: var(--sage-light) !important; transform: translateY(-2px); box-shadow: 0 14px 36px rgba(0,0,0,0.28); }
        .cta-secondary:hover { background: rgba(255,255,255,0.10) !important; border-color: rgba(255,255,255,0.7) !important; }
        .cta-secondary:hover .cta-arrow { transform: translateX(4px); }
        .cta-arrow { transition: transform 0.25s ease; }
      `}</style>
    </section>
  );
}
