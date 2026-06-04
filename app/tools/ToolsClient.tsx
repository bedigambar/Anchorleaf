"use client";
import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Bookmark, Phone, MessageSquare, ExternalLink, Snowflake, Wind, Thermometer, Music, Hand, Droplets, X, Frown, Meh, Smile } from "lucide-react";
import QuickToolsSection from "@/components/dbt/QuickToolsSection";
import DBTBottomCTA from "@/components/dbt/DBTBottomCTA";
import SelfSootheCard from "@/components/dbt/SelfSootheCard";
import Grounding5421 from "@/components/dbt/Grounding5421";

const reveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] as const } },
};

const PHYSICAL_ANCHORS = [
  {
    icon: Snowflake,
    title: "Cold water on your face",
    body: "Splash cold water on your face, or hold an ice cube. This triggers the mammalian dive reflex: your heart rate drops within seconds. This is the fastest way out of a panic spike.",
    accent: "#5a8ab0",
    tint: "rgba(176, 200, 232, 0.32)",
  },
  {
    icon: Wind,
    title: "Box breathing (4-4-4-4)",
    body: "In for 4. Hold for 4. Out for 4. Hold for 4. Repeat 5 times. Slower than 4-7-8 and gentler on lightheadedness, this works well when sitting at a desk.",
    accent: "#5c8a5e",
    tint: "rgba(212, 232, 194, 0.36)",
  },
  {
    icon: Thermometer,
    title: "Tense, then release",
    body: "Pick a muscle group (like fists, shoulders, or jaw). Tense as hard as you can for 5 seconds, then release. Work up the body. This burns the adrenaline off without leaving your chair.",
    accent: "#7a6eb8",
    tint: "rgba(200, 184, 232, 0.32)",
  },
  {
    icon: Hand,
    title: "Push against a wall",
    body: "Push hard against a wall or counter for 30 seconds. Or carry something heavy: a stack of books or a bag of laundry. Proprioception is grounding when nothing else is.",
    accent: "#c87a5a",
    tint: "rgba(245, 200, 176, 0.32)",
  },
  {
    icon: Music,
    title: "One specific song",
    body: "Not a playlist. Pick ONE song you know by heart. Play it. Sing along, even just in your head. Familiar music recruits memory networks that pull you out of panic.",
    accent: "#e8c87a",
    tint: "rgba(232, 200, 122, 0.30)",
  },
  {
    icon: Droplets,
    title: "Take the shower",
    body: "When all else fails, try warm water: 10 minutes, no decisions required. Skin contact + warmth + sound + the structural reset of leaving the room you were spiraling in.",
    accent: "#5c8a5e",
    tint: "rgba(212, 232, 194, 0.36)",
  },
];

type MoodLevel = 1 | 2 | 3;
const MOODS: { level: MoodLevel; icon: React.ElementType; label: string; color: string }[] = [
  { level: 1, icon: Frown, label: "Struggling", color: "#c87a5a" },
  { level: 2, icon: Meh,   label: "Getting by", color: "#e8c87a" },
  { level: 3, icon: Smile, label: "Okay",       color: "#5c8a5e" },
];

const MOOD_RECS: Record<MoodLevel, { heading: string; hint: string; section: string }> = {
  1: {
    heading: "Distress tolerance tools are below.",
    hint: "When it's this hard, grounding and body-first techniques work fastest. Scroll down — they're ready.",
    section: "#grounding",
  },
  2: {
    heading: "Emotion regulation tools may help.",
    hint: "You're managing. These tools can help steady things out.",
    section: "#anchors",
  },
  3: {
    heading: "Mindfulness is a good place to start.",
    hint: "You're in a good place to practice. The grounding exercises below work well when you're not in crisis.",
    section: "#anchors",
  },
};

// Detect broad region from timezone — no GPS, no server calls
function detectRegion(): "india" | "uk" | "australia" | "canada" | "global" {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
    if (tz.startsWith("Asia/Kolkata") || tz.startsWith("Asia/Calcutta")) return "india";
    if (tz.startsWith("Europe/London") || tz.startsWith("Europe/Dublin")) return "uk";
    if (tz.startsWith("Australia/")) return "australia";
    if (
      tz.startsWith("America/Toronto") ||
      tz.startsWith("America/Vancouver") ||
      tz.startsWith("America/Winnipeg") ||
      tz.startsWith("America/Halifax") ||
      tz.startsWith("America/St_Johns")
    )
      return "canada";
  } catch {}
  return "global";
}

const REGIONAL_RESOURCES: Record<string, Array<{ name: string; desc: string; href: string }>> = {
  india: [
    { name: "iCall (TISS)", desc: "9152987821 · Mon–Sat 8am–10pm IST", href: "tel:9152987821" },
    { name: "Vandrevala Foundation", desc: "1860-2662-345 · 24/7", href: "tel:18602662345" },
  ],
  uk: [{ name: "Samaritans", desc: "116 123 · Free, 24/7", href: "tel:116123" }],
  australia: [{ name: "Lifeline", desc: "13 11 14 · 24/7", href: "tel:131114" }],
  canada: [
    { name: "Crisis Services Canada", desc: "1-833-456-4566 · 24/7", href: "tel:18334564566" },
  ],
};

const CHECKIN_SKIP_KEY = "anchorleaf.tools.checkin.skipped.v1";

/**
 * Returns true if the mood check-in should be skipped.
 * Two conditions:
 *   1. User already skipped this session (sessionStorage key set)
 *   2. User arrived via ?crisis=true (i.e. from the journal crisis banner)
 * Skipping via the X button writes the sessionStorage key so the check-in
 * stays hidden for the rest of the tab session.
 */
function useSkipCheckIn(): [boolean, () => void] {
  const [skip, setSkip] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const isCrisisEntry = params.get("crisis") === "true";
    const sessionSkipped = (() => {
      try { return sessionStorage.getItem(CHECKIN_SKIP_KEY) === "1"; }
      catch { return false; }
    })();
    if (isCrisisEntry || sessionSkipped) setSkip(true);
  }, []);

  const skipAndPersist = () => {
    try { sessionStorage.setItem(CHECKIN_SKIP_KEY, "1"); } catch {}
    setSkip(true);
  };

  return [skip, skipAndPersist];
}

export default function ToolsClient() {
  const [mood, setMood] = useState<MoodLevel | null>(null);
  const [checkInDone, skipCheckIn] = useSkipCheckIn();
  const [region, setRegion] = useState<string>("global");

  useEffect(() => {
    setRegion(detectRegion());
  }, []);

  const regionalResources = REGIONAL_RESOURCES[region] ?? [];

  return (
    <main style={{ background: "var(--cream)", paddingTop: "120px" }}>
      <section className="container tools-hero" style={{ marginBottom: "40px", textAlign: "center" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            marginBottom: "24px",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.85rem",
            fontWeight: 500,
            color: "var(--text-secondary)",
          }}
        >
          <Link
            href="/"
            style={{ textDecoration: "none", color: "inherit", transition: "color 0.2s ease" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = "var(--sage)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-secondary)";
            }}
          >
            Home
          </Link>
          <span style={{ opacity: 0.35, userSelect: "none" }}>/</span>
          <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>Tools</span>
        </div>

        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="section-label"
        >
          For right-now moments
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="h1"
          style={{ color: "var(--text-primary)", marginTop: "16px", marginBottom: "20px" }}
        >
          The Toolkit
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="body-lg"
          style={{ color: "var(--text-secondary)", maxWidth: "600px", margin: "0 auto 24px" }}
        >
          Concrete things you can do in the next sixty seconds. Bookmark this page;
          it&apos;s easier to find a tool you&apos;ve already saved than to search for one
          mid-storm.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bookmark-hint"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            background: "var(--warm-white)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-full)",
            padding: "10px 18px",
            boxShadow: "var(--shadow-sm)",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.85rem",
            color: "var(--text-secondary)",
          }}
        >
          <Bookmark size={14} strokeWidth={1.5} style={{ color: "var(--sage)" }} />
          Press{" "}
          <kbd
            style={{
              background: "var(--cream)",
              border: "1px solid var(--border)",
              borderRadius: "4px",
              padding: "2px 6px",
              fontFamily: "inherit",
              fontSize: "0.78rem",
            }}
          >
            Ctrl+D
          </kbd>{" "}
          /{" "}
          <kbd
            style={{
              background: "var(--cream)",
              border: "1px solid var(--border)",
              borderRadius: "4px",
              padding: "2px 6px",
              fontFamily: "inherit",
              fontSize: "0.78rem",
            }}
          >
            ⌘+D
          </kbd>{" "}
          to save this for later
        </motion.div>
      </section>

      {/* Mood Check-In */}
      <AnimatePresence>
        {!checkInDone && (
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
            transition={{ duration: 0.4 }}
            className="container"
            style={{
              marginBottom: "32px",
              maxWidth: "600px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <div
              style={{
                background: "var(--warm-white)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-lg)",
                padding: "24px 28px",
                position: "relative",
              }}
            >
              <button
                type="button"
                onClick={() => skipCheckIn()}
                aria-label="Skip check-in"
                style={{
                  position: "absolute",
                  top: "14px",
                  right: "14px",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--text-muted)",
                  display: "flex",
                  alignItems: "center",
                  padding: "4px",
                  borderRadius: "50%",
                }}
              >
                <X size={16} strokeWidth={1.5} />
              </button>
              <p
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.15rem",
                  fontWeight: 400,
                  color: "var(--text-primary)",
                  marginBottom: "6px",
                }}
              >
                How are you right now?
              </p>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.84rem",
                  color: "var(--text-muted)",
                  marginBottom: "20px",
                }}
              >
                This helps surface the most relevant tools.
              </p>
              <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
                {MOODS.map((m) => (
                  <button
                    key={m.level}
                    type="button"
                    onClick={() => {
                      setMood(m.level);
                      skipCheckIn();
                    }}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "6px",
                      padding: "16px 24px",
                      background: mood === m.level ? `${m.color}18` : "var(--cream)",
                      border: mood === m.level ? `2px solid ${m.color}` : "1.5px solid var(--border)",
                      borderRadius: "var(--radius-md)",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      minWidth: "90px",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = `${m.color}10`;
                      (e.currentTarget as HTMLButtonElement).style.borderColor = m.color;
                    }}
                    onMouseLeave={(e) => {
                      if (mood !== m.level) {
                        (e.currentTarget as HTMLButtonElement).style.background = "var(--cream)";
                        (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)";
                      }
                    }}
                  >
                    <m.icon
                      size={28}
                      strokeWidth={1.5}
                      style={{ color: m.color }}
                    />
                    <span
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        color: "var(--text-secondary)",
                      }}
                    >
                      {m.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Mood recommendation banner */}
      <AnimatePresence>
        {checkInDone && mood && (
          <motion.section
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="container"
            style={{
              marginBottom: "28px",
              maxWidth: "600px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <div
              style={{
                background: "rgba(92, 138, 94, 0.07)",
                border: "1px solid rgba(92, 138, 94, 0.2)",
                borderRadius: "var(--radius-md)",
                padding: "14px 20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "12px",
                flexWrap: "wrap",
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.88rem",
                    fontWeight: 600,
                    color: "var(--sage-dark)",
                    marginBottom: "2px",
                  }}
                >
                  {(() => { const m = MOODS.find((m) => m.level === mood); return m ? <m.icon size={14} strokeWidth={1.75} style={{ color: m.color, display: "inline", verticalAlign: "middle", marginRight: "4px" }} /> : null; })()} {MOOD_RECS[mood].heading}
                </p>
                <p
                  style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", color: "var(--text-muted)" }}
                >
                  {MOOD_RECS[mood].hint}
                </p>
              </div>
              <a
                href={MOOD_RECS[mood].section}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  color: "var(--sage-dark)",
                  textDecoration: "underline",
                  textUnderlineOffset: "2px",
                  whiteSpace: "nowrap",
                }}
              >
                Jump to tools ↓
              </a>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="container"
        style={{ marginBottom: "80px" }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, rgba(245, 200, 176, 0.18) 0%, rgba(245, 200, 176, 0.06) 100%)",
            border: "1px solid rgba(200, 122, 90, 0.22)",
            borderRadius: "var(--radius-lg)",
            padding: "24px 28px",
            gap: "20px",
            alignItems: "center",
          }}
          className="crisis-banner"
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "var(--radius-md)",
              background: "var(--warm-white)",
              border: "1px solid rgba(200, 122, 90, 0.28)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#a05a3a",
              flexShrink: 0,
            }}
          >
            <Phone size={20} strokeWidth={1.5} />
          </div>
          <div>
            <p
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.2rem",
                fontWeight: 700,
                color: "var(--text-primary)",
                letterSpacing: "-0.01em",
                marginBottom: "4px",
              }}
            >
              If you&apos;re in crisis right now, please reach a human.
            </p>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.92rem",
                color: "var(--text-secondary)",
                lineHeight: 1.5,
              }}
            >
              These tools are for moments of distress, not for emergencies. Trained crisis
              counselors are available 24/7, free and confidential.
            </p>
          </div>
          <div className="crisis-actions">
            <a
              href="tel:14416"
              className="btn-primary crisis-btn"
              style={{ padding: "12px 18px", fontSize: "0.88rem", display: "inline-flex", alignItems: "center", gap: "8px" }}
            >
              <Phone size={14} strokeWidth={1.75} /> India: Call 14416
            </a>
            <a
              href="tel:988"
              className="btn-primary crisis-btn"
              style={{ padding: "12px 18px", fontSize: "0.88rem", display: "inline-flex", alignItems: "center", gap: "8px" }}
            >
              <Phone size={14} strokeWidth={1.75} /> US/Global: Call 988
            </a>
            <a
              href="sms:741741?body=HOME"
              className="btn-ghost crisis-btn"
              style={{
                color: "#a05a3a",
                border: "1.5px solid rgba(200, 122, 90, 0.3)",
                padding: "12px 18px",
                fontSize: "0.88rem",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "var(--warm-white)",
              }}
            >
              <MessageSquare size={14} strokeWidth={1.75} /> Text HOME to 741741
            </a>
          </div>
        </div>
      </motion.section>

      <QuickToolsSection />

      <section id="grounding" className="container" style={{ paddingTop: "80px", paddingBottom: "40px" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "48px", maxWidth: "600px", marginLeft: "auto", marginRight: "auto" }}
        >
          <span className="section-label">Bring yourself back</span>
          <h2 className="h2" style={{ color: "var(--text-primary)", marginTop: "12px", marginBottom: "16px" }}>
            Ground yourself
          </h2>
          <p className="body-md" style={{ color: "var(--text-secondary)" }}>
            When your head is spinning or you feel like you&apos;re floating outside your body,
            these are the exercises that pull you back fastest.
          </p>
        </motion.div>

        <div style={{ gap: "28px", alignItems: "stretch" }} className="grounding-grid">
          <motion.div initial={reveal.hidden} whileInView={reveal.visible} viewport={{ once: true, amount: 0.2 }}>
            <Grounding5421 />
          </motion.div>
          <motion.div
            initial={reveal.hidden}
            whileInView={reveal.visible}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ ...reveal.visible.transition, delay: 0.1 }}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <SelfSootheCard />
          </motion.div>
        </div>
      </section>

      <section
        id="anchors"
        style={{
          background: "var(--warm-white)",
          padding: "100px 0",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: "center", marginBottom: "56px", maxWidth: "600px", marginLeft: "auto", marginRight: "auto" }}
          >
            <span className="section-label">Body-first techniques</span>
            <h2 className="h2" style={{ color: "var(--text-primary)", marginTop: "12px", marginBottom: "16px" }}>
              Six anchors you can use anywhere.
            </h2>
            <p className="body-md" style={{ color: "var(--text-secondary)" }}>
              Each one shifts your body chemistry, not just your thoughts. That&apos;s why they
              work even when reasoning won&apos;t.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px" }}
            className="anchors-grid"
          >
            {PHYSICAL_ANCHORS.map((a) => {
              const Icon = a.icon;
              return (
                <motion.article
                  key={a.title}
                  variants={reveal}
                  whileHover={{ y: -4, transition: { duration: 0.25 } }}
                  style={{
                    background: "var(--warm-white)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-lg)",
                    padding: "26px 24px",
                    boxShadow: "var(--shadow-sm)",
                    position: "relative",
                    overflow: "hidden",
                    transition: "box-shadow 0.25s ease",
                  }}
                >
                  <div
                    aria-hidden
                    style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: a.accent }}
                  />
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "var(--radius-md)",
                      background: a.tint,
                      border: `1px solid ${a.accent}33`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: a.accent,
                      marginBottom: "16px",
                    }}
                  >
                    <Icon size={20} strokeWidth={1.5} />
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "1.2rem",
                      fontWeight: 700,
                      color: "var(--text-primary)",
                      letterSpacing: "-0.01em",
                      marginBottom: "10px",
                    }}
                  >
                    {a.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.92rem",
                      lineHeight: 1.6,
                      color: "var(--text-secondary)",
                    }}
                  >
                    {a.body}
                  </p>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="container" style={{ paddingTop: "100px", paddingBottom: "100px" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          style={{ maxWidth: "720px", margin: "0 auto" }}
        >
          <span className="section-label">Beyond this page</span>
          <h2 className="h2" style={{ color: "var(--text-primary)", marginTop: "12px", marginBottom: "20px" }}>
            Other places to go.
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              { name: "Tele-MANAS", desc: "Free, 24/7, India: call 14416 or 1800-891-4416 (NIMHANS)", href: "tel:14416" },
              { name: "988 Suicide & Crisis Lifeline", desc: "Free, 24/7, US/Global: call or text 988", href: "tel:988" },
              { name: "Crisis Text Line", desc: "Text HOME to 741741: anonymous text-based support", href: "sms:741741?body=HOME" },
              {
                name: "International Association for Suicide Prevention",
                desc: "Crisis lines by country, worldwide",
                href: "https://iasp.info/resources/Crisis_Centres",
              },
              ...regionalResources,
              { name: "Behavioral Tech (Linehan Institute)", desc: "Find a DBT-trained clinician near you", href: "https://behavioraltech.org" },
            ].map((r) => (
              <a
                key={r.name}
                href={r.href}
                target={r.href.startsWith("http") ? "_blank" : undefined}
                rel={r.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="resource-link"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "16px",
                  padding: "18px 22px",
                  background: "var(--warm-white)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-md)",
                  textDecoration: "none",
                  color: "var(--text-primary)",
                  transition: "all 0.2s ease",
                }}
              >
                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 600,
                      fontSize: "0.98rem",
                      color: "var(--text-primary)",
                      marginBottom: "2px",
                    }}
                  >
                    {r.name}
                  </p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.86rem", color: "var(--text-muted)" }}>
                    {r.desc}
                  </p>
                </div>
                <ExternalLink size={16} strokeWidth={1.5} style={{ color: "var(--sage)", flexShrink: 0 }} />
              </a>
            ))}
          </div>
        </motion.div>
      </section>

      <DBTBottomCTA />

      <style>{`
        .resource-link:hover {
          border-color: var(--sage) !important;
          background: var(--sage-light) !important;
          transform: translateX(4px);
        }
        .crisis-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          align-items: center;
          justify-content: flex-end;
        }
        .crisis-banner {
          display: grid;
          grid-template-columns: auto 1fr auto;
        }
        .grounding-grid {
          display: grid;
          grid-template-columns: 1.15fr 1fr;
        }
        @media (max-width: 880px) {
          .crisis-banner {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          .crisis-banner > div:first-child {
            justify-self: center;
          }
          .crisis-actions {
            flex-direction: column;
            align-items: stretch;
            width: 100%;
            margin-top: 12px;
          }
          .crisis-btn {
            width: 100%;
            justify-content: center;
          }
          .grounding-grid {
            grid-template-columns: 1fr !important;
          }
          .anchors-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 768px) {
          .bookmark-hint {
            display: none !important;
          }
          .tools-hero {
            margin-bottom: 24px !important;
          }
          .tools-hero p.body-lg {
            margin-bottom: 0 !important;
          }
        }
        @media (max-width: 540px) {
          .anchors-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}
