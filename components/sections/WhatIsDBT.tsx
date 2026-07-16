"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Wind, Waves, Sun, Users } from "lucide-react";
import PillarCard from "@/components/ui/PillarCard";
import RoughNotation from "@/components/ui/RoughNotation";

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } };
const reveal  = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const } } };

const pillars = [
  {
    icon: <Wind size={28} strokeWidth={1.5} />,
    title: "Mindfulness",
    desc: "The foundation of all DBT skills. Being fully present, not judging, not reacting, just noticing.",
    accent: "#5c8a5e",
    bg: "#d4e8c2",
    href: "/dbt/mindfulness",
  },
  {
    icon: <Waves size={28} strokeWidth={1.5} />,
    title: "Distress Tolerance",
    desc: "Survive a crisis without making it worse. Skills for when the pain is unbearable.",
    accent: "#c87a5a",
    bg: "#fde8d8",
    href: "/dbt/distress-tolerance",
  },
  {
    icon: <Sun size={28} strokeWidth={1.5} />,
    title: "Emotion Regulation",
    desc: "Understand your emotions, reduce their intensity, and cope before the crisis hits.",
    accent: "#7a6eb8",
    bg: "#e8d8f0",
    href: "/dbt/emotion-regulation",
  },
  {
    icon: <Users size={28} strokeWidth={1.5} />,
    title: "Interpersonal Effectiveness",
    desc: "Ask for what you need, say no, and keep your self-respect, all at once.",
    accent: "#5a8ab0",
    bg: "#d8e8f0",
    href: "/dbt/interpersonal",
  },
];

export default function WhatIsDBT() {
  const [headingAnimationComplete, setHeadingAnimationComplete] = useState(false);
  return (
    <section style={{ background: "var(--cream)", position: "relative", overflow: "hidden" }} className="section">
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        background: "linear-gradient(135deg, #f0f7ec 50%, #fdf8f3 50%)",
      }} />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          onAnimationComplete={() => setHeadingAnimationComplete(true)}
          style={{ textAlign: "center", marginBottom: "48px" }}
        >
          <motion.div variants={reveal}>
            <span className="section-label">The Toolkit</span>
          </motion.div>
          <motion.h2 variants={reveal} className="h2" style={{ color: "var(--text-primary)", marginBottom: "20px" }}>
            DBT offers <RoughNotation type="underline" color="rgba(92, 138, 94, 0.75)" strokeWidth={2.5} padding={2} show={headingAnimationComplete} delay={150}>practical skills</RoughNotation>
            <br />
            for difficult moments.
          </motion.h2>
          <motion.p variants={reveal} className="body-lg" style={{ color: "var(--text-secondary)", maxWidth: "600px", margin: "0 auto" }}>
            Dialectical Behavior Therapy was developed by Dr. Marsha Linehan, whose lived experiences helped
            shape its compassionate approach. It combines mindfulness with concrete behavioral skills. And it works.
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          style={{ textAlign: "center", marginBottom: "28px" }}
        >
          <motion.div
            variants={reveal}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.72rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              color: "var(--text-muted)",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span style={{ width: "8px", height: "1px", background: "var(--border)" }} />
            The 4 core DBT skill areas
            <span style={{ width: "8px", height: "1px", background: "var(--border)" }} />
          </motion.div>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid-pillars"
        >
          {pillars.map((p) => (
            <motion.div key={p.title} variants={reveal}>
              <PillarCard
                icon={p.icon}
                title={p.title}
                desc={p.desc}
                accent={p.accent}
                bg={p.bg}
                href={p.href}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
