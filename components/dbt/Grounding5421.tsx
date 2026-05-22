"use client";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Hand, Ear, Citrus, Coffee, Check, RotateCcw, Sparkles } from "lucide-react";

type Sense = {
  count: number;
  label: string;
  prompt: string;
  examples: string[];
  icon: typeof Eye;
  accent: string;
  tint: string;
};

const SENSES: Sense[] = [
  {
    count: 5,
    label: "see",
    prompt: "Name 5 things you can see.",
    examples: ["a window", "the texture of the wall", "your hands", "a light source", "a color you didn't notice before"],
    icon: Eye,
    accent: "#5c8a5e",
    tint: "rgba(212, 232, 194, 0.4)",
  },
  {
    count: 4,
    label: "feel",
    prompt: "Name 4 things you can physically feel.",
    examples: ["your feet on the floor", "fabric on your skin", "the temperature of the air", "your breath in your chest"],
    icon: Hand,
    accent: "#5a8ab0",
    tint: "rgba(176, 200, 232, 0.36)",
  },
  {
    count: 3,
    label: "hear",
    prompt: "Name 3 things you can hear.",
    examples: ["a faint hum (fridge, traffic, fan)", "your own breathing", "a sound you'd normally tune out"],
    icon: Ear,
    accent: "#7a6eb8",
    tint: "rgba(200, 184, 232, 0.36)",
  },
  {
    count: 2,
    label: "smell",
    prompt: "Name 2 things you can smell.",
    examples: ["the air in this room", "your skin or clothes", "(or find one: coffee, a candle, soap)"],
    icon: Citrus,
    accent: "#e8c87a",
    tint: "rgba(232, 200, 122, 0.32)",
  },
  {
    count: 1,
    label: "taste",
    prompt: "Name 1 thing you can taste.",
    examples: ["the inside of your mouth", "the last thing you drank", "(or take a sip of water and notice it)"],
    icon: Coffee,
    accent: "#c87a5a",
    tint: "rgba(245, 200, 176, 0.36)",
  },
];

export default function Grounding5421() {
  const [stage, setStage] = useState<"intro" | "active" | "done">("intro");
  const [stepIdx, setStepIdx] = useState(0);
  const [progress, setProgress] = useState<number[]>(SENSES.map(() => 0));

  const current = SENSES[stepIdx];
  const totalNoted = useMemo(() => progress.reduce((a, b) => a + b, 0), [progress]);
  const totalRequired = useMemo(() => SENSES.reduce((a, s) => a + s.count, 0), []);

  function start() {
    setStage("active");
    setStepIdx(0);
    setProgress(SENSES.map(() => 0));
  }

  function tick() {
    const filled = [...progress];
    if (filled[stepIdx] < current.count) {
      filled[stepIdx] += 1;
      setProgress(filled);
      if (filled[stepIdx] >= current.count) {
        if (stepIdx < SENSES.length - 1) {
          setTimeout(() => setStepIdx(stepIdx + 1), 350);
        } else {
          setTimeout(() => setStage("done"), 400);
        }
      }
    }
  }

  function restart() {
    setStepIdx(0);
    setProgress(SENSES.map(() => 0));
    setStage("active");
  }

  return (
    <div
      style={{
        background: "var(--warm-white)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-xl)",
        padding: "36px 32px",
        boxShadow: "var(--shadow-sm)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px", gap: "16px", flexWrap: "wrap" }}>
        <div>
          <p
            style={{
              fontFamily: "'Caveat', cursive",
              fontSize: "1.1rem",
              color: "var(--sage-dark)",
              marginBottom: "4px",
            }}
          >
            an in-the-moment exercise
          </p>
          <h3
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.7rem",
              fontWeight: 700,
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
              marginBottom: "8px",
            }}
          >
            5 · 4 · 3 · 2 · 1 grounding
          </h3>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.95rem",
              color: "var(--text-secondary)",
              lineHeight: 1.55,
              maxWidth: "440px",
            }}
          >
            When your mind is racing or you feel detached from your body, force your senses
            back online, one at a time.
          </p>
        </div>
        {stage !== "intro" && (
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.78rem",
              color: "var(--text-muted)",
              background: "var(--cream)",
              padding: "6px 14px",
              borderRadius: "var(--radius-full)",
              border: "1px solid var(--border)",
              whiteSpace: "nowrap",
            }}
          >
            {totalNoted} / {totalRequired} noted
          </div>
        )}
      </div>

      <div style={{ display: "flex", gap: "6px", marginBottom: "28px" }}>
        {SENSES.map((s, i) => {
          const isCurrent = stage === "active" && i === stepIdx;
          const isDone = progress[i] >= s.count;
          return (
            <div
              key={s.label}
              style={{
                flex: 1,
                height: "4px",
                background: isDone
                  ? s.accent
                  : isCurrent
                    ? `${s.accent}55`
                    : "var(--border)",
                borderRadius: "999px",
                transition: "background 0.4s ease",
              }}
            />
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {stage === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
                gap: "10px",
                marginBottom: "28px",
              }}
              className="grounding-row"
            >
              {SENSES.map((s) => {
                const Icon = s.icon;
                return (
                  <div
                    key={s.label}
                    style={{
                      background: s.tint,
                      border: `1px solid ${s.accent}33`,
                      borderRadius: "var(--radius-md)",
                      padding: "16px 12px",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        color: s.accent,
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: "8px",
                      }}
                    >
                      <Icon size={20} strokeWidth={1.5} />
                    </div>
                    <p
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "1.6rem",
                        fontWeight: 700,
                        color: s.accent,
                        lineHeight: 1,
                        marginBottom: "4px",
                      }}
                    >
                      {s.count}
                    </p>
                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.78rem",
                        color: "var(--text-secondary)",
                      }}
                    >
                      {s.label}
                    </p>
                  </div>
                );
              })}
            </div>
            <button
              onClick={start}
              className="btn-primary"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                width: "100%",
                justifyContent: "center",
              }}
            >
              <Sparkles size={15} strokeWidth={1.5} /> Start the exercise
            </button>
          </motion.div>
        )}

        {stage === "active" && current && (
          <motion.div
            key={`active-${stepIdx}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div
              style={{
                background: current.tint,
                border: `1px solid ${current.accent}33`,
                borderRadius: "var(--radius-lg)",
                padding: "28px 26px",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  marginBottom: "18px",
                }}
              >
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    background: "var(--warm-white)",
                    border: `1.5px solid ${current.accent}55`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: current.accent,
                    flexShrink: 0,
                  }}
                >
                  <current.icon size={22} strokeWidth={1.5} />
                </div>
                <div>
                  <p
                    style={{
                      fontFamily: "'Caveat', cursive",
                      fontSize: "1rem",
                      color: current.accent,
                      marginBottom: "2px",
                    }}
                  >
                    step {stepIdx + 1} of {SENSES.length}
                  </p>
                  <h4
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "1.4rem",
                      fontWeight: 700,
                      color: "var(--text-primary)",
                      letterSpacing: "-0.02em",
                      lineHeight: 1.2,
                    }}
                  >
                    {current.prompt}
                  </h4>
                </div>
              </div>

              <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
                {Array.from({ length: current.count }).map((_, i) => {
                  const filled = i < progress[stepIdx];
                  return (
                    <motion.div
                      key={i}
                      initial={false}
                      animate={{
                        scale: filled ? 1 : 0.85,
                        background: filled ? current.accent : "transparent",
                      }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "50%",
                        border: `2px solid ${current.accent}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: filled ? "white" : current.accent,
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "1.05rem",
                        fontWeight: 700,
                      }}
                    >
                      {filled ? <Check size={16} strokeWidth={2.2} /> : i + 1}
                    </motion.div>
                  );
                })}
              </div>

              <div
                style={{
                  background: "rgba(254, 250, 245, 0.5)",
                  borderRadius: "var(--radius-md)",
                  padding: "14px 16px",
                  marginBottom: "20px",
                }}
              >
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    color: "var(--text-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginBottom: "6px",
                  }}
                >
                  Stuck? Try
                </p>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.92rem",
                    color: "var(--text-secondary)",
                    lineHeight: 1.55,
                  }}
                >
                  {current.examples.join(" · ")}
                </p>
              </div>

              <button
                onClick={tick}
                disabled={progress[stepIdx] >= current.count}
                style={{
                  width: "100%",
                  padding: "14px 20px",
                  background: current.accent,
                  color: "white",
                  border: "none",
                  borderRadius: "var(--radius-md)",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  cursor: progress[stepIdx] >= current.count ? "default" : "pointer",
                  opacity: progress[stepIdx] >= current.count ? 0.5 : 1,
                  transition: "opacity 0.25s ease",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                {progress[stepIdx] >= current.count
                  ? "Moving on..."
                  : `I noticed one: ${current.count - progress[stepIdx]} to go`}
              </button>
            </div>
          </motion.div>
        )}

        {stage === "done" && (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              textAlign: "center",
              padding: "20px 0",
            }}
          >
            <div
              style={{
                width: "72px",
                height: "72px",
                borderRadius: "50%",
                background: "var(--sage-light)",
                border: "1px solid rgba(92,138,94,0.25)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--sage-dark)",
                marginBottom: "20px",
              }}
            >
              <Check size={28} strokeWidth={2} />
            </div>
            <h4
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.6rem",
                fontWeight: 700,
                color: "var(--text-primary)",
                letterSpacing: "-0.02em",
                marginBottom: "10px",
              }}
            >
              You&apos;re back.
            </h4>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.98rem",
                color: "var(--text-secondary)",
                lineHeight: 1.6,
                maxWidth: "400px",
                margin: "0 auto 24px",
              }}
            >
              You moved your attention from the inside of your head to the world around you. That
              is the whole exercise. If you still feel scattered, do it again.
            </p>
            <button
              onClick={restart}
              style={{
                background: "transparent",
                border: "1.5px solid var(--border)",
                borderRadius: "var(--radius-full)",
                padding: "10px 20px",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
                fontSize: "0.9rem",
                color: "var(--text-secondary)",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--sage)";
                e.currentTarget.style.color = "var(--sage-dark)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.color = "var(--text-secondary)";
              }}
            >
              <RotateCcw size={14} strokeWidth={1.5} /> Run it again
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 600px) {
          .grounding-row { grid-template-columns: repeat(5, 1fr) !important; gap: 6px !important; }
        }
      `}</style>
    </div>
  );
}
