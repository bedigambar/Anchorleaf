"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookmarkCheck,
  CalendarCheck,
  ChevronDown,
  Download,
  Trash2,
  ArrowRight,
  Lock,
  Phone,
  Sparkles,
} from "lucide-react";
import {
  type JournalEntry,
  deleteJournalEntry,
  exportJournalEntries,
  getBookmarks,
  getJournalEntries,
  saveJournalEntry,
  todayKey,
} from "@/lib/storage";
import { SKILLS, type Skill } from "@/lib/companion/skills";

const EMOTIONS = [
  "overwhelmed",
  "angry",
  "anxious",
  "numb",
  "sad",
  "ashamed",
  "lonely",
  "hopeful",
  "okay",
] as const;

const INTENSITY_LABELS = ["barely there", "low", "rolling", "hard", "drowning"] as const;

const reveal = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const } },
};

function formatDate(d: string): string {
  const date = new Date(d + "T00:00:00");
  return date.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
}

function intensityColor(n: number): string {
  switch (n) {
    case 1: return "#d4e8c2";
    case 2: return "#b8d8ba";
    case 3: return "#e8c87a";
    case 4: return "#f5c8a8";
    case 5: return "#c87a5a";
    default: return "var(--border)";
  }
}

export default function JournalClient() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Form state
  const [intensity, setIntensity] = useState<number>(0);
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [note, setNote] = useState("");
  const [justSaved, setJustSaved] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    setEntries(getJournalEntries());
    setBookmarks(getBookmarks());
    setHydrated(true);
  }, []);

  // Pre-fill form from today's existing entry, if any
  useEffect(() => {
    if (!hydrated) return;
    const today = todayKey();
    const existing = entries.find((e) => e.date === today);
    if (existing) {
      setIntensity(existing.intensity);
      setSelectedEmotions(existing.emotions);
      setSelectedSkills(existing.skillsUsed);
      setNote(existing.note ?? "");
    }
  }, [hydrated, entries]);

  const bookmarkedSkills = useMemo<Skill[]>(
    () => SKILLS.filter((s) => bookmarks.includes(s.id)),
    [bookmarks]
  );

  const last30 = useMemo(() => {
    const map = new Map<string, JournalEntry>();
    for (const e of entries) map.set(e.date, e);
    const days: { date: string; intensity: number | null }[] = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      const key = `${y}-${m}-${day}`;
      days.push({ date: key, intensity: map.get(key)?.intensity ?? null });
    }
    return days;
  }, [entries]);

  function toggleEmotion(e: string) {
    setSelectedEmotions((prev) =>
      prev.includes(e) ? prev.filter((x) => x !== e) : [...prev, e]
    );
  }
  function toggleSkill(id: string) {
    setSelectedSkills((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  function handleSave() {
    if (intensity === 0) return;
    const next = saveJournalEntry({
      date: todayKey(),
      intensity,
      emotions: selectedEmotions,
      skillsUsed: selectedSkills,
      note: note.trim() || undefined,
    });
    setEntries(next);
    setJustSaved(true);
    window.setTimeout(() => setJustSaved(false), 2400);
  }

  function handleDelete(id: string) {
    const next = deleteJournalEntry(id);
    setEntries(next);
  }

  return (
    <main style={{ background: "var(--cream)", paddingTop: "120px", paddingBottom: "80px" }}>
        <section className="container" style={{ marginBottom: "40px", textAlign: "center" }}>
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
              style={{
                textDecoration: "none",
                color: "inherit",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--sage)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-secondary)"; }}
            >
              Home
            </Link>
            <span style={{ opacity: 0.35, userSelect: "none" }}>/</span>
            <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>Journal</span>
          </div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } } }}
            style={{ maxWidth: "720px", margin: "0 auto" }}
          >
            <motion.span variants={reveal} className="section-label">
              <CalendarCheck size={12} strokeWidth={1.5} style={{ marginRight: "4px", display: "inline" }} />
              Diary card
            </motion.span>
            <motion.h1
              variants={reveal}
              className="h1"
              style={{ color: "var(--text-primary)", marginTop: "14px", marginBottom: "20px" }}
            >
              How was today,
              <br />
              <em style={{ fontStyle: "italic", color: "var(--sage-dark)" }}>really?</em>
            </motion.h1>
            <motion.p
              variants={reveal}
              className="body-lg"
              style={{ color: "var(--text-secondary)" }}
            >
              A 60-second daily check-in. Notice what you felt, what you used to get through, and
              one thing worth remembering.
            </motion.p>
            <motion.div
              variants={reveal}
              style={{
                marginTop: "20px",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 14px",
                background: "var(--warm-white)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-full)",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.82rem",
                color: "var(--text-muted)",
              }}
            >
              <Lock size={12} strokeWidth={1.5} style={{ color: "var(--sage)" }} />
              Saved only in this browser. Nothing leaves your device.
            </motion.div>
          </motion.div>
        </section>

        <section className="container" style={{ marginBottom: "48px" }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55 }}
            style={{
              background: "var(--warm-white)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-xl)",
              padding: "26px 28px",
              maxWidth: "880px",
              margin: "0 auto",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "20px",
                flexWrap: "wrap",
                gap: "12px",
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: "'Caveat', cursive",
                    fontSize: "1rem",
                    color: "var(--sage-dark)",
                    marginBottom: "4px",
                  }}
                >
                  the last 30 days
                </p>
                <h2
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.4rem",
                    fontWeight: 400,
                    color: "var(--text-primary)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Your emotional weather
                </h2>
              </div>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.82rem",
                  color: "var(--text-muted)",
                }}
              >
                {entries.length === 0
                  ? "First entry shows up here once you save."
                  : `${entries.length} entr${entries.length === 1 ? "y" : "ies"} so far`}
              </p>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(30, 1fr)",
                gap: "4px",
                height: "52px",
                alignItems: "end",
              }}
              className="trend-strip"
            >
              {last30.map((d) => (
                <div
                  key={d.date}
                  title={`${formatDate(d.date)}${d.intensity ? `: intensity ${d.intensity}` : ": no entry"}`}
                  style={{
                    height: d.intensity ? `${20 + d.intensity * 8}%` : "12%",
                    background: d.intensity ? intensityColor(d.intensity) : "var(--border)",
                    borderRadius: "3px",
                    minHeight: "10px",
                    transition: "background 0.4s ease",
                    opacity: d.intensity ? 1 : 0.35,
                  }}
                />
              ))}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "8px",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.72rem",
                color: "var(--text-muted)",
              }}
            >
              <span>30 days ago</span>
              <span>today</span>
            </div>
          </motion.div>
        </section>

        <section className="container" style={{ marginBottom: "48px" }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55 }}
            style={{
              background: "var(--warm-white)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-xl)",
              padding: "36px",
              maxWidth: "720px",
              margin: "0 auto",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                marginBottom: "10px",
              }}
            >
              1. How intense was today?
            </p>
            <div style={{ display: "flex", gap: "8px", marginBottom: "12px", flexWrap: "wrap" }}>
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  onClick={() => setIntensity(n)}
                  style={{
                    flex: "1 1 80px",
                    minWidth: "60px",
                    padding: "14px 8px",
                    borderRadius: "var(--radius-md)",
                    border:
                      intensity === n
                        ? `2px solid ${intensityColor(n)}`
                        : "1.5px solid var(--border)",
                    background:
                      intensity === n ? `${intensityColor(n)}40` : "var(--cream)",
                    color: intensity === n ? "var(--text-primary)" : "var(--text-secondary)",
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: intensity === n ? 600 : 500,
                    fontSize: "0.88rem",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "1.4rem",
                      display: "block",
                      lineHeight: 1,
                      marginBottom: "4px",
                      color: intensity === n ? intensityColor(n) : "var(--text-muted)",
                      fontWeight: 700,
                    }}
                  >
                    {n}
                  </span>
                  {INTENSITY_LABELS[n - 1]}
                </button>
              ))}
            </div>

            {/* Crisis banner at intensity 5 */}
            {intensity === 5 && (
              <div
                style={{
                  marginBottom: "20px",
                  padding: "16px 20px",
                  background: "rgba(200, 122, 90, 0.08)",
                  border: "1px solid rgba(200, 122, 90, 0.28)",
                  borderRadius: "var(--radius-md)",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                <p
                  style={{
                    fontSize: "0.88rem",
                    fontWeight: 600,
                    color: "#8a3c1e",
                    marginBottom: "8px",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <Phone size={14} strokeWidth={1.75} />
                  If you&apos;re in crisis right now, you don&apos;t have to be alone.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "8px" }}>
                  <a
                    href="tel:988"
                    style={{
                      fontSize: "0.82rem",
                      color: "#8a3c1e",
                      fontWeight: 600,
                      textDecoration: "none",
                      background: "rgba(200, 122, 90, 0.12)",
                      padding: "4px 10px",
                      borderRadius: "9999px",
                      border: "1px solid rgba(200, 122, 90, 0.25)",
                    }}
                  >
                    US/Global: 988
                  </a>
                  <a
                    href="sms:741741?body=HOME"
                    style={{
                      fontSize: "0.82rem",
                      color: "#8a3c1e",
                      fontWeight: 600,
                      textDecoration: "none",
                      background: "rgba(200, 122, 90, 0.12)",
                      padding: "4px 10px",
                      borderRadius: "9999px",
                      border: "1px solid rgba(200, 122, 90, 0.25)",
                    }}
                  >
                    Text HOME to 741741
                  </a>
                  <a
                    href="tel:14416"
                    style={{
                      fontSize: "0.82rem",
                      color: "#8a3c1e",
                      fontWeight: 600,
                      textDecoration: "none",
                      background: "rgba(200, 122, 90, 0.12)",
                      padding: "4px 10px",
                      borderRadius: "9999px",
                      border: "1px solid rgba(200, 122, 90, 0.25)",
                    }}
                  >
                    India: 14416
                  </a>
                  <a
                    href="tel:9152987821"
                    style={{
                      fontSize: "0.82rem",
                      color: "#8a3c1e",
                      fontWeight: 600,
                      textDecoration: "none",
                      background: "rgba(200, 122, 90, 0.12)",
                      padding: "4px 10px",
                      borderRadius: "9999px",
                      border: "1px solid rgba(200, 122, 90, 0.25)",
                    }}
                  >
                    India iCall: 9152987821
                  </a>
                </div>
                <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", margin: 0 }}>
                  More resources: IASP crisis centres at{" "}
                  <a
                    href="https://iasp.info/resources/Crisis_Centres/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#8a3c1e" }}
                  >
                    iasp.info
                  </a>
                </p>
                <p style={{ fontSize: "0.78rem", marginTop: "10px", margin: 0 }}>
                  <a
                    href="/tools?crisis=true"
                    style={{
                      color: "#8a3c1e",
                      fontWeight: 600,
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    Go to the grounding toolkit →
                  </a>
                </p>
              </div>
            )}

            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                marginTop: "28px",
                marginBottom: "10px",
              }}
            >
              2. Which emotions came up?
            </p>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {EMOTIONS.map((e) => {
                const active = selectedEmotions.includes(e);
                return (
                  <button
                    key={e}
                    onClick={() => toggleEmotion(e)}
                    style={{
                      padding: "8px 16px",
                      borderRadius: "var(--radius-full)",
                      border: active ? "1.5px solid var(--sage)" : "1.5px solid var(--border)",
                      background: active ? "var(--sage-light)" : "var(--cream)",
                      color: active ? "var(--sage-dark)" : "var(--text-secondary)",
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: active ? 600 : 500,
                      fontSize: "0.85rem",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {e}
                  </button>
                );
              })}
            </div>

            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                marginTop: "28px",
                marginBottom: "10px",
              }}
            >
              3. Which skills did you reach for?
            </p>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {SKILLS.map((s) => {
                const active = selectedSkills.includes(s.id);
                return (
                  <button
                    key={s.id}
                    onClick={() => toggleSkill(s.id)}
                    style={{
                      padding: "8px 14px",
                      borderRadius: "var(--radius-full)",
                      border: active ? "1.5px solid var(--sage)" : "1.5px solid var(--border)",
                      background: active ? "var(--sage-light)" : "var(--cream)",
                      color: active ? "var(--sage-dark)" : "var(--text-secondary)",
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: active ? 600 : 500,
                      fontSize: "0.82rem",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {s.name}
                  </button>
                );
              })}
            </div>

            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                marginTop: "28px",
                marginBottom: "10px",
              }}
            >
              4. One sentence worth remembering (optional)
            </p>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              placeholder="something you noticed, something that helped, something that hurt..."
              style={{
                width: "100%",
                padding: "14px 16px",
                background: "var(--cream)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-md)",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.92rem",
                color: "var(--text-primary)",
                resize: "vertical",
                outline: "none",
                transition: "border-color 0.2s ease",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "var(--sage)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
            />

            <div
              style={{
                marginTop: "28px",
                display: "flex",
                gap: "12px",
                alignItems: "center",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              <p
                style={{
                  fontFamily: "'Caveat', cursive",
                  fontSize: "1rem",
                  color: "var(--text-muted)",
                }}
              >
                {intensity === 0 ? "pick an intensity to save" : "you can edit today's entry anytime"}
              </p>
              <button
                type="button"
                onClick={handleSave}
                disabled={intensity === 0}
                className="btn-primary"
                style={{
                  opacity: intensity === 0 ? 0.5 : 1,
                  cursor: intensity === 0 ? "not-allowed" : "pointer",
                }}
              >
                {justSaved ? "Saved" : "Save today"}
              </button>
            </div>

            <AnimatePresence>
              {justSaved && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  style={{
                    fontFamily: "'Caveat', cursive",
                    fontSize: "1.1rem",
                    color: "var(--sage-dark)",
                    marginTop: "14px",
                    textAlign: "right",
                  }}
                >
                  you showed up. that counts.
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        </section>

        {hydrated && bookmarkedSkills.length > 0 && (
          <section className="container" style={{ marginBottom: "48px", maxWidth: "880px", marginLeft: "auto", marginRight: "auto" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "20px",
              }}
            >
              <BookmarkCheck size={18} strokeWidth={1.5} style={{ color: "var(--sage)" }} />
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.4rem",
                  fontWeight: 400,
                  color: "var(--text-primary)",
                  letterSpacing: "-0.01em",
                }}
              >
                Your bookmarked skills
              </h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "12px" }}>
              {bookmarkedSkills.map((s) => (
                <Link
                  key={s.id}
                  href={`/dbt#${s.pillar === "distress" ? "distress-tolerance" : "emotion-regulation"}`}
                  className="bookmarked-skill"
                  style={{
                    display: "block",
                    padding: "16px 18px",
                    background: "var(--warm-white)",
                    border: "1px solid var(--border)",
                    borderLeft: `3px solid ${s.pillar === "distress" ? "#c87a5a" : "#7a6eb8"}`,
                    borderRadius: "var(--radius-md)",
                    textDecoration: "none",
                    transition: "all 0.2s ease",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "1.05rem",
                      fontWeight: 700,
                      color: s.pillar === "distress" ? "#c87a5a" : "#7a6eb8",
                      letterSpacing: "-0.01em",
                      marginBottom: "2px",
                    }}
                  >
                    {s.name}
                  </p>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.82rem",
                      color: "var(--text-muted)",
                      lineHeight: 1.5,
                    }}
                  >
                    {s.subtitle}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {hydrated && entries.length > 0 && (
          <section className="container" style={{ maxWidth: "880px", marginLeft: "auto", marginRight: "auto" }}>
            <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "0" }}>
              <button
                onClick={() => setShowHistory((s) => !s)}
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "1px solid var(--border)",
                borderRadius: "var(--radius-md)",
                padding: "12px 18px",
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
                fontSize: "0.92rem",
                color: "var(--text-primary)",
                transition: "background 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--warm-white)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              {showHistory ? "Hide" : "Show"} all entries ({entries.length})
              <ChevronDown
                size={16}
                strokeWidth={1.5}
                style={{
                  transform: showHistory ? "rotate(180deg)" : "rotate(0)",
                  transition: "transform 0.3s ease",
                }}
              />
            </button>
            <button
              type="button"
              onClick={() => exportJournalEntries()}
              title="Export your journal data as JSON"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "12px 16px",
                background: "transparent",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-md)",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.85rem",
                fontWeight: 500,
                color: "var(--text-secondary)",
                cursor: "pointer",
                transition: "all 0.2s ease",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "var(--warm-white)";
                (e.currentTarget as HTMLButtonElement).style.color = "var(--text-primary)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                (e.currentTarget as HTMLButtonElement).style.color = "var(--text-secondary)";
              }}
            >
              <Download size={14} strokeWidth={1.5} /> Export
            </button>
            </div>

            <AnimatePresence>
              {showHistory && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ overflow: "hidden" }}
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "16px" }}>
                    {entries.map((e) => (
                      <article
                        key={e.id}
                        style={{
                          background: "var(--warm-white)",
                          border: "1px solid var(--border)",
                          borderRadius: "var(--radius-md)",
                          padding: "16px 18px",
                          display: "grid",
                          gridTemplateColumns: "auto 1fr auto",
                          gap: "16px",
                          alignItems: "center",
                        }}
                      >
                        <span
                          style={{
                            width: "34px",
                            height: "34px",
                            borderRadius: "50%",
                            background: intensityColor(e.intensity),
                            color: "var(--text-primary)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontFamily: "'Playfair Display', serif",
                            fontWeight: 700,
                            fontSize: "1.05rem",
                          }}
                        >
                          {e.intensity}
                        </span>
                        <div>
                          <p
                            style={{
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: "0.85rem",
                              fontWeight: 600,
                              color: "var(--text-primary)",
                              marginBottom: "2px",
                            }}
                          >
                            {formatDate(e.date)}
                          </p>
                          <p
                            style={{
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: "0.82rem",
                              color: "var(--text-muted)",
                              lineHeight: 1.4,
                            }}
                          >
                            {e.emotions.length > 0 && `felt: ${e.emotions.join(", ")}`}
                            {e.emotions.length > 0 && e.skillsUsed.length > 0 && " · "}
                            {e.skillsUsed.length > 0 && `used: ${e.skillsUsed.length} skill${e.skillsUsed.length === 1 ? "" : "s"}`}
                          </p>
                          {e.note && (
                            <p
                              style={{
                                fontFamily: "'Playfair Display', serif",
                                fontStyle: "italic",
                                fontSize: "0.9rem",
                                color: "var(--text-secondary)",
                                marginTop: "6px",
                                lineHeight: 1.4,
                              }}
                            >
                              &ldquo;{e.note}&rdquo;
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => handleDelete(e.id)}
                          aria-label="Delete entry"
                          style={{
                            background: "transparent",
                            border: "none",
                            color: "var(--text-muted)",
                            cursor: "pointer",
                            padding: "8px",
                            borderRadius: "var(--radius-sm)",
                            transition: "all 0.2s ease",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = "#c87a5a";
                            e.currentTarget.style.background = "rgba(245, 200, 176, 0.18)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = "var(--text-muted)";
                            e.currentTarget.style.background = "transparent";
                          }}
                        >
                          <Trash2 size={14} strokeWidth={1.5} />
                        </button>
                      </article>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        )}

        {hydrated && entries.length === 0 && bookmarkedSkills.length === 0 && (
          <section className="container" style={{ maxWidth: "640px", marginLeft: "auto", marginRight: "auto", textAlign: "center", marginTop: "20px" }}>
            <p
              style={{
                fontFamily: "'Caveat', cursive",
                fontSize: "1.2rem",
                color: "var(--text-muted)",
                marginBottom: "20px",
              }}
            >
              don&apos;t have any skills bookmarked yet?
            </p>
            <Link
              href="/dbt"
              className="btn-primary"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
            >
              <Sparkles size={14} strokeWidth={1.75} /> Browse skills
              <ArrowRight size={14} strokeWidth={1.75} />
            </Link>
          </section>
        )}

        <style>{`
          .bookmarked-skill:hover {
            transform: translateY(-2px);
            box-shadow: var(--shadow-md);
          }
        `}</style>
    </main>
  );
}
