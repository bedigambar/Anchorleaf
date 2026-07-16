"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Users, Heart, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import RoughNotation from "@/components/ui/RoughNotation";

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } };
const reveal  = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const } } };

export default function WhatIsBPD() {
  const [headingAnimationComplete, setHeadingAnimationComplete] = useState(false);
  const stats = [
    { 
      number: "1 in 100", 
      label: "people have BPD", 
      sub: "More common than you think",
      source: "Source: NIMH / WHO",
      color: "var(--sage)",
      bg: "rgba(92, 138, 94, 0.08)",
      icon: <Users size={20} strokeWidth={2} style={{ color: "var(--sage)" }} />
    },
    { 
      number: "Affects", 
      label: "emotional regulation, identity & relationships", 
      sub: "All at once, all the time",
      source: "Source: APA / DSM-5",
      color: "#c87a5a",
      bg: "rgba(200, 122, 90, 0.08)",
      icon: <Heart size={20} strokeWidth={2} style={{ color: "#c87a5a" }} />
    },
    { 
      number: "77%", 
      label: "DBT effectiveness rate", 
      sub: "For people who complete treatment",
      source: "Source: Cochrane Database / NIH",
      color: "#7a6eb8",
      bg: "rgba(122, 110, 184, 0.08)",
      icon: <CheckCircle2 size={20} strokeWidth={2} style={{ color: "#7a6eb8" }} />
    },
  ];

  return (
    <section className="bpd-animated-bg section">
      <div className="container">
        <div className="grid-editorial">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            <motion.div variants={reveal}>
              <span className="section-label">Understanding BPD</span>
            </motion.div>

            <motion.h2
              variants={reveal}
              onAnimationComplete={() => setHeadingAnimationComplete(true)}
              className="h2"
              style={{ color: "var(--text-primary)", marginBottom: "24px" }}
            >
              An emotion that feels
              <br />
              like a <RoughNotation type="underline" color="#c87a5a" strokeWidth={3} padding={1} show={headingAnimationComplete}>tidal wave.</RoughNotation>
            </motion.h2>

            <motion.p variants={reveal} className="body-lg" style={{ color: "var(--text-secondary)", marginBottom: "20px", lineHeight: 1.6 }}>
              You know that feeling where one moment you&apos;re fine, and the next everything is falling apart?
            </motion.p>

            <motion.div 
              variants={reveal} 
              style={{ 
                color: "var(--text-primary)", 
                fontSize: "1.15rem", 
                fontWeight: 500, 
                marginBottom: "20px", 
                lineHeight: 1.5, 
                borderLeft: "2px solid var(--sage-light)", 
                paddingLeft: "16px" 
              }}
            >
              That&apos;s not weakness.
              <br />
              That&apos;s not drama.
            </motion.div>

            <motion.p variants={reveal} className="body-md" style={{ color: "var(--text-secondary)", marginBottom: "32px", lineHeight: 1.6 }}>
              For people with BPD, emotions can arrive faster, deeper, and stay longer. It&apos;s exhausting. And it&apos;s real.
            </motion.p>

            <motion.p variants={reveal} className="body-md" style={{ color: "var(--text-secondary)", marginBottom: "32px", lineHeight: 1.6 }}>
              BPD affects the way you experience emotions, relationships, and your sense of self. Acting before you think,
              and hating yourself for it after. Feeling deeply misunderstood by the people you love most.
              The good news: there is a way through.
            </motion.p>

            <motion.blockquote 
              variants={reveal} 
              className="pull-quote" 
              style={{ 
                margin: "12px 0 40px 0",
                color: "var(--text-primary)",
                fontWeight: 500,
                fontSize: "1.15rem",
                borderLeft: "6px solid var(--peach)",
                paddingLeft: "24px",
                lineHeight: 1.7,
              }}
            >
              &ldquo;It&apos;s not attention-seeking. It&apos;s an attempt to cope with overwhelming pain.&rdquo;
            </motion.blockquote>

            <motion.div variants={reveal}>
              <Link href="/learn" className="bpd-cta-btn">
                Explore Symptoms
                <span className="bpd-cta-arrow" style={{ display: "inline-flex" }}>
                  <ArrowRight size={18} strokeWidth={2} />
                </span>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="bpd-stats-column"
            style={{ 
              display: "flex", 
              flexDirection: "column", 
              gap: "20px", 
              justifyContent: "flex-start" 
            }}
          >
            {stats.map((s, i) => (
              <motion.div
                key={i}
                variants={reveal}
                className="stat-card"
                style={{ 
                  position: "relative", 
                  overflow: "hidden",
                  display: "flex",
                  gap: "20px",
                  alignItems: "center",
                  padding: "28px 24px",
                  background: "white",
                  border: "1px solid var(--border)",
                  borderRadius: "20px",
                  boxShadow: "var(--shadow-sm)"
                }}
              >
                <div style={{ position: "absolute", top: 0, left: 0, width: "4px", height: "100%", background: s.color, borderRadius: "0 0 0 20px" }} />
                
                <div style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  width: "40px", 
                  height: "40px", 
                  borderRadius: "50%", 
                  background: s.bg,
                  flexShrink: 0
                }}>
                  {s.icon}
                </div>

                <div style={{ flex: 1 }}>
                  <div className="stat-number" style={{ marginBottom: "4px", fontSize: "1.6rem", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.1 }}>{s.number}</div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "0.92rem", color: "var(--text-primary)", marginBottom: "4px", lineHeight: 1.3 }}>{s.label}</p>
                  <p className="body-sm" style={{ color: "var(--text-muted)", marginBottom: "6px" }}>{s.sub}</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", color: "var(--text-secondary)", opacity: 0.85, fontWeight: 500, margin: 0 }}>{s.source}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <style>{`
        .bpd-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #d4e8c2;
          color: #2c4c2e;
          font-family: 'DM Sans', sans-serif;
          font-weight: 600;
          text-decoration: none;
          font-size: 1.02rem;
          padding: 12px 28px;
          border-radius: 9999px;
          box-shadow: 0 6px 16px rgba(92, 138, 94, 0.1);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .bpd-cta-btn:hover {
          background: #c7dfb1;
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(92, 138, 94, 0.18);
        }
        
        .bpd-cta-arrow {
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .bpd-cta-btn:hover .bpd-cta-arrow {
          transform: translateX(4px);
        }

        @media (min-width: 769px) {
          .grid-editorial {
            align-items: start !important;
          }
          .bpd-stats-column {
            margin-top: 120px !important;
          }
        }
      `}</style>
    </section>
  );
}
