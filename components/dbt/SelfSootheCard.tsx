"use client";
import { useState } from "react";

const senses = [
  { label: "Sight",    examples: "Watch a candle flame, look at the sky, observe nature slowly." },
  { label: "Sound",   examples: "Listen to calming music, rain sounds, birds, or silence." },
  { label: "Smell",   examples: "Light a candle, step outside for fresh air, essential oils." },
  { label: "Taste",   examples: "Sip herbal tea, eat something mindfully, let flavor linger." },
  { label: "Touch",   examples: "Hold a soft blanket, take a warm bath, hug a pet." },
  { label: "Movement",examples: "Gentle stretching, rock gently, walk slowly and feel each step." },
];

export default function SelfSootheCard() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="acronym-card pillar-distress" style={{ height: "100%" }}>
      <p className="acronym-title">Self-Soothe</p>
      <p className="acronym-subtitle" style={{ marginBottom: "20px" }}>with the Six Senses</p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "16px" }}>
        {senses.map((s) => (
          <button
            key={s.label}
            className={`sense-btn${active === s.label ? " active" : ""}`}
            onClick={() => setActive(active === s.label ? null : s.label)}
          >
            {s.label}
          </button>
        ))}
      </div>

      {active && (
        <div className="sense-examples">
          <strong style={{ color: "var(--pillar-accent-dark)", fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>{active}</strong>
          <p style={{ marginTop: "6px" }}>{senses.find((s) => s.label === active)?.examples}</p>
        </div>
      )}

      {!active && (
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", color: "var(--text-muted)", fontStyle: "italic" }}>
          Tap a sense to explore examples
        </p>
      )}
    </div>
  );
}
