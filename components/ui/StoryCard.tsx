"use client";

interface StoryCardProps {
  quote: string;
  meta: string;
  tags: string[];
  theme: "relationships" | "mindfulness" | "growth" | "healing";
}

export default function StoryCard({ quote, meta, tags, theme }: StoryCardProps) {
  const themeColors: Record<string, string> = {
    mindfulness: "#5c8a5e",
    relationships: "#5a8ab0",
    healing: "#c87a5a",
    growth: "#7a6eb8",
  };
  const quoteColor = themeColors[theme] ?? "#5c8a5e";

  return (
    <div
      className={`story-card theme-${theme}`}
      style={{
        width: "380px",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        <div style={{
          marginBottom: "8px",
          color: quoteColor,
          opacity: 0.75,
          fontSize: "3.2rem",
          fontFamily: "'Playfair Display', serif",
          lineHeight: 0.7,
        }}>&ldquo;</div>
        <p style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "1.2rem",
          fontStyle: "italic",
          color: "#0f0f10",
          fontWeight: 500,
          lineHeight: 1.75,
          marginBottom: "16px",
        }}>
          {quote}
        </p>
      </div>
      <div>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "8px" }}>{meta}</p>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {tags.map((tag) => (
            <span key={tag} style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.75rem",
              fontWeight: 500,
              color: "var(--sage-dark)",
              background: "var(--sage-light)",
              padding: "4px 10px",
              borderRadius: "9999px",
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
