"use client";
import { AlertCircle, Wind, Flame, Users, Minus, Leaf, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import RoughNotation from "@/components/ui/RoughNotation";

const filters = [
  { id: "crisis", label: "I'm in crisis", icon: <AlertCircle size={15} strokeWidth={1.5} />, color: "#c87a5a" },
  { id: "overwhelmed", label: "I feel overwhelmed", icon: <Wind size={15} strokeWidth={1.5} />, color: "#7a6eb8" },
  { id: "angry", label: "I'm angry", icon: <Flame size={15} strokeWidth={1.5} />, color: "#c87a5a" },
  { id: "conflict", label: "Relationship conflict", icon: <Users size={15} strokeWidth={1.5} />, color: "#5a8ab0" },
  { id: "numb", label: "I feel numb", icon: <Minus size={15} strokeWidth={1.5} />, color: "#8a8a96" },
  { id: "grow", label: "I want to grow", icon: <Leaf size={15} strokeWidth={1.5} />, color: "#5c8a5e" },
];

export const filterSkillMap: Record<string, string[]> = {
  crisis: ["stop", "tipp", "accepts", "self-soothe", "radical-acceptance"],
  overwhelmed: ["stop", "tipp", "mindfulness-what", "mindfulness-how", "abc"],
  angry: ["stop", "tipp", "opposite-action", "think"],
  conflict: ["dear-man", "fast", "give", "think", "raven"],
  numb: ["self-soothe", "improve", "abc", "please", "vitals"],
  grow: ["abc", "please", "vitals", "mindfulness-what", "mindfulness-how"],
};

const feedbackMessages: Record<string, { title: string; text: string; tint: string; border: string; textCol: string }> = {
  crisis: {
    title: "You are safe here.",
    text: "We've highlighted your distress tolerance crisis skills below. Take a deep breath and start with the S.T.O.P. or T.I.P.P. skill. You don't have to navigate this wave alone.",
    tint: "rgba(200, 122, 90, 0.06)",
    border: "rgba(200, 122, 90, 0.16)",
    textCol: "#a65233"
  },
  overwhelmed: {
    title: "One moment at a time.",
    text: "When everything piles up, we return to the present. We've highlighted core Mindfulness and physical grounding skills below. Start with the 'Observe' practice.",
    tint: "rgba(122, 110, 184, 0.06)",
    border: "rgba(122, 110, 184, 0.16)",
    textCol: "#53488d"
  },
  angry: {
    title: "Anger is information.",
    text: "Your anger is valid, but you can choose how to act on it. We've highlighted skills like 'Opposite Action' and the 'T.H.I.N.K.' template to give you space before reacting.",
    tint: "rgba(200, 122, 90, 0.06)",
    border: "rgba(200, 122, 90, 0.16)",
    textCol: "#a65233"
  },
  conflict: {
    title: "Navigating connections.",
    text: "Healthy relationships require boundaries and clarity. We've highlighted the D.E.A.R. M.A.N. and F.A.S.T. interpersonal skills below to support your voice.",
    tint: "rgba(90, 138, 176, 0.06)",
    border: "rgba(90, 138, 176, 0.16)",
    textCol: "#2d6085"
  },
  numb: {
    title: "Gently waking up.",
    text: "Feeling numb is your system's way of protecting itself. We've highlighted sensory 'Self-Soothe' and physical 'P.L.E.A.S.E.' skills below to help you gently re-engage.",
    tint: "rgba(138, 138, 150, 0.06)",
    border: "rgba(138, 138, 150, 0.16)",
    textCol: "#5e5e68"
  },
  grow: {
    title: "Building your mastery.",
    text: "Ready to thrive? We've highlighted your foundational mindfulness 'HOW' skills and the daily emotional 'A.B.C.' toolkit below to cultivate lasting resilience.",
    tint: "rgba(92, 138, 94, 0.06)",
    border: "rgba(92, 138, 94, 0.16)",
    textCol: "#355e37"
  }
};

interface SkillFilterBarProps {
  activeFilter: string | null;
  onFilterChange: (id: string | null) => void;
}

export default function SkillFilterBar({ activeFilter, onFilterChange }: SkillFilterBarProps) {
  const currentFeedback = activeFilter ? feedbackMessages[activeFilter] : null;

  return (
    <div className="skill-filter-bar">
      <div className="container">
        <h2 className="filter-title">What are you <RoughNotation type="highlight" color="rgba(232, 200, 122, 0.35)" viewportDelay={200}>feeling</RoughNotation> right now?</h2>
        <p className="filter-subtitle">
          Select an emotional state below. Anchorleaf will highlight the evidence-based DBT skills custom-suited for this exact moment.
        </p>

        <div className="filter-chips-container">
          {filters.map((f) => (
            <button
              key={f.id}
              className={`filter-chip${activeFilter === f.id ? " active" : ""}`}
              onClick={() => onFilterChange(activeFilter === f.id ? null : f.id)}
              style={activeFilter === f.id ? {} : { "--chip-icon-color": f.color } as React.CSSProperties}
            >
              <span style={{ color: activeFilter === f.id ? "white" : f.color }}>{f.icon}</span>
              {f.label}
            </button>
          ))}

          {activeFilter && (
            <button
              onClick={() => onFilterChange(null)}
              className="filter-chip"
              style={{ background: "#fefaf5", borderColor: "#c87a5a", color: "#c87a5a", display: "inline-flex", alignItems: "center", gap: "4px" }}
            >
              <X size={13} />
              Clear Filter
            </button>
          )}
        </div>

        <AnimatePresence mode="wait">
          {activeFilter && currentFeedback && (
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{
                maxWidth: "720px",
                margin: "32px auto 0 auto",
                padding: "20px 24px",
                background: currentFeedback.tint,
                border: `1.5px dashed ${currentFeedback.border}`,
                borderRadius: "16px",
                textAlign: "left",
                position: "relative",
              }}
            >
              <h4 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.25rem",
                fontWeight: 600,
                color: currentFeedback.textCol,
                marginBottom: "6px"
              }}>
                {currentFeedback.title}
              </h4>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.88rem",
                color: "var(--text-secondary)",
                lineHeight: 1.6
              }}>
                {currentFeedback.text}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {activeFilter && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: -12, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.92 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => onFilterChange(null)}
            aria-label="Clear active filter"
            className="floating-clear-filter"
          >
            <X size={14} strokeWidth={2} />
            <span>Clear filter</span>
            <span className="floating-clear-pulse" aria-hidden />
          </motion.button>
        )}
      </AnimatePresence>

      <style>{`
        .floating-clear-filter {
          position: fixed;
          top: 92px;
          right: 24px;
          z-index: 80;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 10px 16px 10px 14px;
          background: linear-gradient(180deg, #d68a6a 0%, #c87a5a 50%, #a96042 100%);
          color: white;
          border: 1px solid rgba(168, 90, 60, 0.6);
          border-radius: var(--radius-full);
          font-family: 'DM Sans', sans-serif;
          font-weight: 600;
          font-size: 0.85rem;
          letter-spacing: 0.005em;
          cursor: pointer;
          box-shadow:
            0 10px 28px rgba(200, 122, 90, 0.42),
            0 2px 6px rgba(0, 0, 0, 0.08),
            inset 0 1px 0 rgba(255, 255, 255, 0.28);
          transition: transform 0.28s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.28s ease;
          -webkit-tap-highlight-color: transparent;
        }
        .floating-clear-filter:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow:
            0 14px 36px rgba(200, 122, 90, 0.52),
            0 2px 6px rgba(0, 0, 0, 0.08),
            inset 0 1px 0 rgba(255, 255, 255, 0.32);
        }
        .floating-clear-filter:active {
          transform: translateY(0) scale(0.96);
        }
        .floating-clear-filter:focus-visible {
          outline: 2px solid #c87a5a;
          outline-offset: 3px;
        }
        .floating-clear-pulse {
          position: absolute;
          inset: -3px;
          border-radius: var(--radius-full);
          border: 1.5px solid rgba(200, 122, 90, 0.55);
          pointer-events: none;
          animation: floatingClearPulse 2.2s ease-in-out infinite;
        }
        @keyframes floatingClearPulse {
          0%, 100% { opacity: 0; transform: scale(1); }
          40% { opacity: 0.6; transform: scale(1.08); }
          70% { opacity: 0; transform: scale(1.18); }
        }
        @media (max-width: 768px) {
          .floating-clear-filter {
            top: 78px;
            right: 12px;
            font-size: 0.8rem;
            padding: 9px 14px 9px 12px;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .floating-clear-pulse { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
