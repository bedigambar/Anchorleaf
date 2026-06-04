"use client";
import Link from "next/link";
import { Printer, ArrowLeft, Leaf } from "lucide-react";
import { SKILLS, type Pillar } from "@/lib/companion/skills";

const EXTRA_SKILLS: Array<{
  id: string;
  name: string;
  pillar: Pillar | "mindfulness" | "interpersonal";
  subtitle: string;
  steps: { letter: string; word: string; instruction: string }[];
}> = [
  {
    id: "wise-mind",
    name: "Wise Mind",
    pillar: "mindfulness",
    subtitle: "Where logic and emotion meet.",
    steps: [
      { letter: "R", word: "Rational", instruction: "Ruled by thinking, facts, and logic." },
      { letter: "E", word: "Emotional", instruction: "Ruled by feelings, urges, and bodily sensations." },
      { letter: "W", word: "Wise", instruction: "The synthesis. You know this, and you feel this, so you do this." },
    ],
  },
  {
    id: "what-skills",
    name: "WHAT Skills",
    pillar: "mindfulness",
    subtitle: "What you do in mindfulness practice.",
    steps: [
      { letter: "O", word: "Observe", instruction: "Notice the present moment without words." },
      { letter: "D", word: "Describe", instruction: "Attach words to your experience. Label it." },
      { letter: "P", word: "Participate", instruction: "Throw yourself fully into the current moment." },
    ],
  },
  {
    id: "how-skills",
    name: "HOW Skills",
    pillar: "mindfulness",
    subtitle: "How you practice mindfulness.",
    steps: [
      { letter: "NJ", word: "Non-Judgmental", instruction: "Notice without labeling good or bad." },
      { letter: "OM", word: "One-Mindful", instruction: "Focus on one thing at a time." },
      { letter: "BE", word: "Be Effective", instruction: "Focus on what works, not what feels right." },
    ],
  },
  {
    id: "dear-man",
    name: "D.E.A.R. M.A.N.",
    pillar: "interpersonal",
    subtitle: "How to ask for what you need.",
    steps: [
      { letter: "D", word: "Describe", instruction: "Describe the situation clearly and factually." },
      { letter: "E", word: "Express", instruction: "Express your feelings and opinions about it." },
      { letter: "A", word: "Assert", instruction: "Ask for what you want. Say no clearly." },
      { letter: "R", word: "Reinforce", instruction: "Reward the other person ahead of time." },
      { letter: "M", word: "Mindful", instruction: "Keep your focus on your goals." },
      { letter: "A", word: "Appear confident", instruction: "Eye contact. Voice steady. Posture upright." },
      { letter: "N", word: "Negotiate", instruction: "Be willing to give to get." },
    ],
  },
  {
    id: "fast",
    name: "F.A.S.T.",
    pillar: "interpersonal",
    subtitle: "Keep your self-respect.",
    steps: [
      { letter: "F", word: "Fair", instruction: "Be fair to yourself and the other." },
      { letter: "A", word: "Apologies", instruction: "No over-apologizing. Apologize only when warranted." },
      { letter: "S", word: "Stick to values", instruction: "Don't sell out what you believe in." },
      { letter: "T", word: "Truthful", instruction: "Don't exaggerate, lie, or act helpless." },
    ],
  },
  {
    id: "give",
    name: "G.I.V.E.",
    pillar: "interpersonal",
    subtitle: "Keep the relationship.",
    steps: [
      { letter: "G", word: "Gentle", instruction: "No attacks, threats, or judging." },
      { letter: "I", word: "Interested", instruction: "Listen and look at the other person." },
      { letter: "V", word: "Validate", instruction: "Acknowledge their feelings and perspective." },
      { letter: "E", word: "Easy manner", instruction: "Use humor. Smile. Be diplomatic." },
    ],
  },
];

const PILLAR_META: Record<string, { name: string; accent: string }> = {
  mindfulness: { name: "Mindfulness", accent: "#5c8a5e" },
  distress: { name: "Distress Tolerance", accent: "#c87a5a" },
  emotion: { name: "Emotion Regulation", accent: "#7a6eb8" },
  interpersonal: { name: "Interpersonal Effectiveness", accent: "#5a8ab0" },
};

export default function CheatsheetClient() {
  const allSkills = [...EXTRA_SKILLS, ...SKILLS];
  const byPillar = allSkills.reduce<Record<string, typeof allSkills>>((acc, s) => {
    (acc[s.pillar] = acc[s.pillar] ?? []).push(s as never);
    return acc;
  }, {});

  return (
    <main
      style={{
        background: "var(--cream)",
        minHeight: "100vh",
        padding: "120px 24px 80px",
      }}
      className="cheatsheet-page"
    >
      <div
        className="cheatsheet-toolbar"
        style={{
          maxWidth: "920px",
          margin: "0 auto 32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <Link
          href="/dbt"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            color: "var(--text-secondary)",
            textDecoration: "none",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.9rem",
            fontWeight: 500,
            transition: "color 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
        >
          <ArrowLeft size={16} strokeWidth={1.5} /> Back to DBT hub
        </Link>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button
            type="button"
            onClick={() => window.print()}
            className="btn-primary"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
          >
            <Printer size={15} strokeWidth={1.75} /> Print cheatsheet
          </button>
          <button
            type="button"
            onClick={() => {
              document.body.setAttribute("data-print-mode", "wallet");
              window.print();
              setTimeout(() => document.body.removeAttribute("data-print-mode"), 500);
            }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 18px",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              fontSize: "0.88rem",
              color: "var(--sage-dark)",
              background: "rgba(92, 138, 94, 0.10)",
              border: "1.5px solid rgba(92, 138, 94, 0.25)",
              borderRadius: "9999px",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(92, 138, 94, 0.18)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(92, 138, 94, 0.10)";
            }}
          >
            <Printer size={15} strokeWidth={1.75} /> Print wallet cards
          </button>
        </div>
      </div>

      <article
        style={{
          maxWidth: "920px",
          margin: "0 auto",
          background: "var(--warm-white)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-xl)",
          padding: "48px",
          boxShadow: "var(--shadow-sm)",
        }}
        className="cheatsheet-article"
      >
        <header style={{ marginBottom: "40px", textAlign: "center", borderBottom: "1px solid var(--border)", paddingBottom: "28px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
            <Leaf size={18} strokeWidth={1.5} style={{ color: "var(--sage)" }} />
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.3rem",
                color: "var(--text-primary)",
                letterSpacing: "-0.01em",
              }}
            >
              Anchorleaf
            </span>
          </div>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 5vw, 2.8rem)",
              fontWeight: 400,
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              marginBottom: "12px",
            }}
          >
            The DBT Cheat Sheet
          </h1>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.96rem",
              color: "var(--text-secondary)",
              maxWidth: "520px",
              margin: "0 auto",
              lineHeight: 1.55,
            }}
          >
            Every acronym from the four DBT pillars on one page. Print it. Stick it on the fridge.
            Glance at it on the bad days.
          </p>
        </header>

        {(["mindfulness", "distress", "emotion", "interpersonal"] as const).map((pillarKey) => {
          const meta = PILLAR_META[pillarKey];
          const skills = byPillar[pillarKey] ?? [];
          if (skills.length === 0) return null;
          return (
            <section
              key={pillarKey}
              style={{ marginBottom: "44px", pageBreakInside: "avoid" }}
              className="cheatsheet-section"
            >
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.6rem",
                  fontWeight: 700,
                  color: meta.accent,
                  letterSpacing: "-0.02em",
                  marginBottom: "8px",
                  paddingBottom: "8px",
                  borderBottom: `2px solid ${meta.accent}33`,
                }}
              >
                {meta.name}
              </h2>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "20px",
                  marginTop: "20px",
                }}
                className="cheatsheet-grid"
              >
                {skills.map((s) => (
                  <div
                    key={s.id}
                    style={{
                      padding: "18px 20px",
                      background: "var(--cream)",
                      border: `1px solid ${meta.accent}25`,
                      borderRadius: "var(--radius-md)",
                      pageBreakInside: "avoid",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "1.15rem",
                        fontWeight: 700,
                        color: meta.accent,
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
                        fontStyle: "italic",
                        marginBottom: "10px",
                      }}
                    >
                      {s.subtitle}
                    </p>
                    <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "5px" }}>
                      {s.steps.map((step, i) => (
                        <li
                          key={i}
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "0.84rem",
                            color: "var(--text-secondary)",
                            lineHeight: 1.5,
                            display: "flex",
                            gap: "8px",
                          }}
                        >
                          <strong
                            style={{
                              color: meta.accent,
                              fontWeight: 700,
                              minWidth: "22px",
                              fontFamily: "'Playfair Display', serif",
                              fontSize: "0.95rem",
                            }}
                          >
                            {step.letter}
                          </strong>
                          <span>
                            <strong style={{ color: "var(--text-primary)", fontWeight: 600 }}>{step.word}.</strong>{" "}
                            {step.instruction}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          );
        })}

        <footer
          style={{
            marginTop: "40px",
            paddingTop: "24px",
            borderTop: "1px solid var(--border)",
            textAlign: "center",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.78rem",
            color: "var(--text-muted)",
            lineHeight: 1.6,
          }}
        >
          <p>
            Skills sourced from Dr. Marsha M. Linehan&apos;s DBT curriculum · Educational only,
            not a substitute for professional care.
          </p>
          <p style={{ marginTop: "6px" }}>
            In crisis? Call <strong>14416</strong> (India Tele-MANAS) or Call/Text <strong>988</strong> (US/Global Suicide &amp; Crisis Lifeline).
          </p>
        </footer>
      </article>

      {/* Wallet Cards Section — hidden on screen, shown only in wallet print mode */}
      <section className="wallet-cards-section">
        <div className="wallet-cards-grid">
          {allSkills.map((s) => {
            const meta = PILLAR_META[s.pillar] ?? { name: s.pillar, accent: "#5c8a5e" };
            return (
              <div key={s.id} className="wallet-card">
                <div className="wallet-card-accent" style={{ background: meta.accent }} />
                <p className="wallet-card-title" style={{ color: meta.accent }}>{s.name}</p>
                <p className="wallet-card-sub">{s.subtitle}</p>
                <ul className="wallet-card-steps">
                  {s.steps.map((step, i) => (
                    <li key={i} className="wallet-card-step">
                      <span className="wallet-card-step-letter" style={{ color: meta.accent }}>
                        {step.letter}
                      </span>
                      <span><strong>{step.word}.</strong> {step.instruction}</span>
                    </li>
                  ))}
                </ul>
                <p className="wallet-card-footer">anchorleaf.com · {meta.name}</p>
              </div>
            );
          })}
        </div>
      </section>

      <style>{`
        @media (max-width: 720px) {
          .cheatsheet-grid { grid-template-columns: 1fr !important; }
          .cheatsheet-article { padding: 28px !important; }
        }

        /* ── Standard print: cheatsheet all-on-one-page ─────────────────── */
        @media print {
          .cheatsheet-page { padding: 0 !important; background: white !important; }
          .cheatsheet-toolbar { display: none !important; }
          .cheatsheet-article {
            border: none !important;
            box-shadow: none !important;
            padding: 0 !important;
            background: white !important;
            max-width: 100% !important;
            border-radius: 0 !important;
          }
          .cheatsheet-section { page-break-inside: avoid; margin-bottom: 28px !important; }
          /* Hide wallet cards in standard print */
          .wallet-cards-section { display: none !important; }
        }

        /* ── Wallet card print mode ──────────────────────────────────────── */
        body[data-print-mode="wallet"] .cheatsheet-article { display: none !important; }
        body[data-print-mode="wallet"] .cheatsheet-toolbar { display: none !important; }
        body[data-print-mode="wallet"] .wallet-cards-section { display: block !important; }

        @media print {
          body[data-print-mode="wallet"] .wallet-cards-section {
            display: block !important;
            padding: 0 !important;
            background: white !important;
          }
          body[data-print-mode="wallet"] .wallet-card {
            width: 3.5in;
            height: 2in;
            page-break-inside: avoid;
            page-break-after: always;
            break-after: page;
            border: 1.5px solid #ccc !important;
            border-radius: 8px !important;
            margin: 0 auto 0.25in !important;
            overflow: hidden !important;
          }
        }

        /* Wallet card screen preview */
        .wallet-cards-section {
          display: none;
          max-width: 920px;
          margin: 0 auto;
          padding: 48px 24px;
        }
        .wallet-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 20px;
        }
        .wallet-card {
          background: white;
          border: 1.5px solid var(--border);
          border-radius: 10px;
          padding: 16px 18px;
          position: relative;
          overflow: hidden;
          min-height: 160px;
          display: flex;
          flex-direction: column;
        }
        .wallet-card-accent {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
        }
        .wallet-card-title {
          font-family: 'Playfair Display', serif;
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: -0.01em;
          margin-bottom: 2px;
          margin-top: 8px;
        }
        .wallet-card-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.72rem;
          font-style: italic;
          color: #888;
          margin-bottom: 8px;
        }
        .wallet-card-steps {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 3px;
          flex: 1;
        }
        .wallet-card-step {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.72rem;
          color: #333;
          line-height: 1.4;
          display: flex;
          gap: 6px;
        }
        .wallet-card-step-letter {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          font-size: 0.78rem;
          min-width: 18px;
        }
        .wallet-card-footer {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.6rem;
          color: #aaa;
          margin-top: 8px;
          padding-top: 6px;
          border-top: 1px solid #eee;
        }
      `}</style>
    </main>
  );
}
