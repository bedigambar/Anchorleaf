"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import StatCard from "@/components/ui/StatCard";

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } };

const stats = [
  {
    number: 1,
    suffix: " in 100",
    label: "adults have BPD",
    sub: "That's millions of people worldwide",
    source: "Source: NIMH / WHO",
    color: "var(--sage)",
    accentBg: "rgba(92, 138, 94, 0.08)",
  },
  {
    number: 70,
    suffix: "%",
    label: "misdiagnosed before BPD diagnosis",
    sub: "Often confused with depression, bipolar, or anxiety",
    source: "Source: NAMI / Clinical Research",
    color: "#c87a5a",
    accentBg: "rgba(200, 122, 90, 0.08)",
  },
  {
    number: 77,
    suffix: "%",
    label: "highly effective for many people",
    sub: "Many people benefit from DBT as a primary path to stability",
    source: "Source: Cochrane Database / NIH",
    color: "#7a6eb8",
    accentBg: "rgba(122, 110, 184, 0.08)",
  },
];

export default function YouAreNotAlone() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setActive(true); obs.disconnect(); } }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="dot-grid-bg section" style={{ background: "white" }}>
      <div className="container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          style={{
            position: "relative",
            textAlign: "center",
            marginBottom: "72px",
            padding: "24px 32px",
            borderRadius: "32px",
            background: "linear-gradient(180deg, #fdfbf7 0%, #f6fbf4 100%)",
            border: "1px solid rgba(92, 138, 94, 0.08)",
            boxShadow: "0 12px 32px rgba(92, 138, 94, 0.03)",
          }}
        >
          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(5.5rem, 13vw, 9.5rem)",
            fontWeight: 700,
            color: "rgba(92, 138, 94, 0.22)",
            lineHeight: 1,
            marginBottom: "12px",
            letterSpacing: "-0.04em",
          }}>
            78%
          </div>

          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "clamp(1.15rem, 2.5vw, 1.4rem)",
            color: "var(--text-primary)",
            fontWeight: 600,
            maxWidth: "600px",
            margin: "0 auto",
            lineHeight: 1.4,
          }}>
            of people with BPD feel deeply misunderstood.
          </p>

          <div style={{ width: "40px", height: "3px", background: "var(--sage)", margin: "20px auto 16px", borderRadius: "2px" }} />

          <p style={{ fontFamily: "'Caveat', cursive", fontSize: "1.45rem", color: "#4a5a4d", opacity: 0.95, margin: 0 }}>
            You are not alone in this.
          </p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}
          className="stats-grid"
        >
          {stats.map((s) => (
            <StatCard
              key={s.label}
              number={s.number}
              suffix={s.suffix}
              label={s.label}
              sub={s.sub}
              source={s.source}
              color={s.color}
              accentBg={s.accentBg}
              active={active}
            />
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) { .stats-grid { grid-template-columns: 1fr !important; } }
        @media (min-width: 480px) and (max-width: 768px) { .stats-grid { grid-template-columns: 1fr 1fr !important; } }
      `}</style>
    </section>
  );
}
