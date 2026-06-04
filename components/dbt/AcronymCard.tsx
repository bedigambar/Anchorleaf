"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { isBookmarked, toggleBookmark, markSkillRead, isSkillRead } from "@/lib/storage";

export interface AcronymItem {
  letter: string;
  word: string;
  description: string;
}

interface AcronymCardProps {
  title: string;
  subtitle: string;
  pillar: "mindfulness" | "distress" | "emotion" | "interpersonal";
  items: AcronymItem[];
  featured?: boolean;
  columns?: 2; // for DEAR MAN two-column layout
  leftItems?: AcronymItem[];
  rightItems?: AcronymItem[];
  skillId?: string;
}

const letterVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: "easeOut" as const },
  }),
};

function AcronymRowItem({ item, index }: { item: AcronymItem; index: number }) {
  return (
    <motion.div
      className="acronym-row"
      custom={index}
      variants={letterVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <span className="acronym-letter">{item.letter}</span>
      <div>
        <p className="acronym-word">{item.word}</p>
        <p className="acronym-definition">{item.description}</p>
      </div>
    </motion.div>
  );
}

export default function AcronymCard({
  title,
  subtitle,
  pillar,
  items,
  featured,
  columns,
  leftItems,
  rightItems,
  skillId,
}: AcronymCardProps) {
  const [bookmarked, setBookmarked] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [explored, setExplored] = useState(false);

  useEffect(() => {
    if (skillId) {
      setBookmarked(isBookmarked(skillId));
      setExplored(isSkillRead(skillId));
      markSkillRead(skillId);
      // Update explored state after marking
      setExplored(true);
    }
    setHydrated(true);
  }, [skillId]);

  function handleToggle(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!skillId) return;
    toggleBookmark(skillId);
    setBookmarked((b) => !b);
  }

  return (
    <div
      className={`acronym-card pillar-${pillar}${featured ? " featured" : ""}`}
      style={{ position: "relative" }}
    >
      {skillId && hydrated && (
        <div style={{ position: "absolute", top: "16px", right: "16px", display: "flex", alignItems: "center", gap: "6px" }}>
          {explored && (
            <span
              style={{
                fontSize: "0.65rem",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                color: "var(--sage-dark)",
                background: "rgba(92, 138, 94, 0.12)",
                border: "1px solid rgba(92, 138, 94, 0.2)",
                borderRadius: "9999px",
                padding: "2px 8px",
                letterSpacing: "0.03em",
                userSelect: "none",
              }}
            >
              ✓ Explored
            </span>
          )}
          <button
            type="button"
            onClick={handleToggle}
            aria-label={bookmarked ? "Remove bookmark" : "Bookmark this skill"}
            title={bookmarked ? "Remove bookmark" : "Bookmark this skill"}
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              border: bookmarked
                ? "1px solid var(--pillar-accent)"
                : "1px solid var(--border)",
              background: bookmarked ? "var(--pillar-tint)" : "var(--warm-white)",
              color: bookmarked ? "var(--pillar-accent)" : "var(--text-muted)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s ease",
              zIndex: 2,
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--pillar-accent)";
              e.currentTarget.style.color = "var(--pillar-accent)";
            }}
            onMouseLeave={(e) => {
              if (!bookmarked) {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.color = "var(--text-muted)";
              }
            }}
          >
            {bookmarked ? (
              <BookmarkCheck size={15} strokeWidth={1.75} />
            ) : (
              <Bookmark size={15} strokeWidth={1.75} />
            )}
          </button>
        </div>
      )}

      <div style={{ marginBottom: "0", paddingRight: skillId ? "44px" : "0" }}>
        <p className="acronym-title">{title}</p>
        <p className="acronym-subtitle">{subtitle}</p>
      </div>

      {columns === 2 && leftItems && rightItems ? (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0" }} className="dear-man-grid">
          <div>
            <p style={{ fontFamily: "'Caveat', cursive", fontSize: "0.9rem", fontWeight: 600, color: "var(--pillar-accent)", marginBottom: "4px", paddingLeft: "0" }}>DEAR</p>
            {leftItems.map((item, i) => <AcronymRowItem key={item.letter} item={item} index={i} />)}
          </div>
          <div>
            <p style={{ fontFamily: "'Caveat', cursive", fontSize: "0.9rem", fontWeight: 600, color: "var(--pillar-accent)", marginBottom: "4px" }}>MAN</p>
            {rightItems.map((item, i) => <AcronymRowItem key={item.letter} item={item} index={i + leftItems.length} />)}
          </div>
        </div>
      ) : (
        items.map((item, i) => <AcronymRowItem key={item.letter + i} item={item} index={i} />)
      )}

      <style>{`
        @media (max-width: 600px) { .dear-man-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
