"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, Waves, Sun } from "lucide-react";
import { SKILLS, type Skill } from "@/lib/companion/skills";
import RoughNotation from "@/components/ui/RoughNotation";

function dayOfYear(d: Date): number {
  const start = new Date(d.getFullYear(), 0, 0);
  const diff = d.getTime() - start.getTime();
  return Math.floor(diff / 86_400_000);
}

const PILLAR_META = {
  distress: { name: "Distress Tolerance", icon: Waves, accent: "#c87a5a", tint: "rgba(245, 200, 176, 0.32)" },
  emotion: { name: "Emotion Regulation", icon: Sun, accent: "#7a6eb8", tint: "rgba(200, 184, 232, 0.32)" },
} as const;

export default function SkillInFocus() {
  const [headingAnimationComplete, setHeadingAnimationComplete] = useState(false);
  const skill: Skill = useMemo(() => {
    const idx = dayOfYear(new Date()) % SKILLS.length;
    return SKILLS[idx];
  }, []);
  const meta = PILLAR_META[skill.pillar];
  const PillarIcon = meta.icon;
  const previewStep = skill.steps[0];

  return (
    <section
      style={{
        background: "var(--warm-white)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        padding: "80px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "-100px",
          left: "10%",
          width: "320px",
          height: "320px",
          borderRadius: "50%",
          background: meta.tint,
          filter: "blur(80px)",
          opacity: 0.6,
          zIndex: 0,
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
          onAnimationComplete={() => setHeadingAnimationComplete(true)}
          style={{ textAlign: "center", marginBottom: "40px", maxWidth: "620px", margin: "0 auto 40px" }}
        >
          <span
            className="section-label"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: `${meta.accent}15`,
              color: meta.accent,
            }}
          >
            <Calendar size={12} strokeWidth={1.5} /> Today&apos;s focus
          </span>
          <h2
            className="h2"
            style={{ color: "var(--text-primary)", marginTop: "12px", marginBottom: "12px" }}
          >
            A skill worth <RoughNotation type="highlight" color={`${meta.accent}33`} show={headingAnimationComplete} delay={150}>knowing</RoughNotation> today.
          </h2>
          <p
            className="body-md"
            style={{ color: "var(--text-secondary)" }}
          >
            One skill rotates into focus each day. Read it now; it&apos;ll be easier to reach for
            when you actually need it.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            maxWidth: "780px",
            margin: "0 auto",
            background: `linear-gradient(135deg, ${meta.tint} 0%, rgba(254,250,245,0.3) 100%)`,
            border: `1px solid ${meta.accent}28`,
            borderRadius: "var(--radius-xl)",
            padding: "40px",
            display: "grid",
            gridTemplateColumns: "1fr 1.4fr",
            gap: "40px",
            alignItems: "center",
          }}
          className="skill-focus-grid"
        >
          <div>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 12px",
                background: "var(--warm-white)",
                border: `1px solid ${meta.accent}33`,
                borderRadius: "var(--radius-full)",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: meta.accent,
                marginBottom: "20px",
              }}
            >
              <PillarIcon size={13} strokeWidth={1.5} /> {meta.name}
            </span>
            <p
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2.4rem, 5vw, 3.4rem)",
                fontWeight: 700,
                color: meta.accent,
                letterSpacing: "-0.03em",
                lineHeight: 1,
                marginBottom: "14px",
              }}
            >
              {skill.name}
            </p>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "1rem",
                lineHeight: 1.55,
                color: "var(--text-secondary)",
                marginBottom: "20px",
              }}
            >
              {skill.subtitle}
            </p>
            <Link
              href="/dbt"
              className="focus-cta"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "7px",
                padding: "11px 20px",
                background: meta.accent,
                color: "white",
                borderRadius: "var(--radius-full)",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                fontSize: "0.9rem",
                textDecoration: "none",
                boxShadow: `0 6px 18px ${meta.accent}45`,
                transition: "all 0.25s ease",
              }}
            >
              Read full skill
              <span className="focus-arrow" style={{ display: "inline-flex", transition: "transform 0.25s ease" }}>
                <ArrowRight size={14} strokeWidth={1.75} />
              </span>
            </Link>
          </div>

          <div
            style={{
              background: "var(--warm-white)",
              border: `1px solid ${meta.accent}22`,
              borderRadius: "var(--radius-lg)",
              padding: "26px 28px",
            }}
          >
            <p
              style={{
                fontFamily: "'Caveat', cursive",
                fontSize: "1rem",
                color: "var(--text-muted)",
                marginBottom: "10px",
              }}
            >
              when to reach for it
            </p>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.95rem",
                lineHeight: 1.6,
                color: "var(--text-secondary)",
                marginBottom: "22px",
                textTransform: "capitalize",
              }}
            >
              {skill.when_to_use.slice(0, 3).join(" · ")}
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "16px",
                padding: "14px 16px",
                background: meta.tint,
                borderRadius: "var(--radius-md)",
                border: `1px solid ${meta.accent}1f`,
              }}
            >
              <span
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "2rem",
                  fontWeight: 700,
                  color: meta.accent,
                  lineHeight: 1,
                  flexShrink: 0,
                }}
              >
                {previewStep.letter}
              </span>
              <div>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.92rem",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    marginBottom: "4px",
                  }}
                >
                  {previewStep.word}
                </p>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.88rem",
                    lineHeight: 1.55,
                    color: "var(--text-secondary)",
                  }}
                >
                  {previewStep.instruction}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        .focus-cta:hover { transform: translateY(-2px); box-shadow: 0 10px 24px ${meta.accent}55; }
        .focus-cta:hover .focus-arrow { transform: translateX(3px); }
        @media (max-width: 760px) {
          .skill-focus-grid { grid-template-columns: 1fr !important; padding: 28px !important; gap: 24px !important; }
        }
      `}</style>
    </section>
  );
}
