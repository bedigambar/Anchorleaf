"use client";

import React, { useMemo, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Leaf,
  Heart,
  Shield,
  Search,
  HelpCircle,
  Sparkles,
  Clock,
  SlidersHorizontal,
} from "lucide-react";
import Link from "next/link";
import RoughNotation from "@/components/ui/RoughNotation";

interface Article {
  slug: string;
  icon: React.ReactNode;
  label: string;
  title: string;
  desc: string;
  color: string;
  readMinutes: number;
}

const articles: Article[] = [
  { slug: "what-does-bpd-feel-like", icon: <Heart size={20} strokeWidth={1.5} />, label: "BPD Basics", title: "What does BPD actually feel like?", desc: "A human, non-clinical guide to understanding Borderline Personality Disorder from the inside.", color: "#c87a5a", readMinutes: 8 },
  { slug: "who-is-marsha-linehan", icon: <BookOpen size={20} strokeWidth={1.5} />, label: "DBT Origins", title: "Who is Marsha Linehan, and why does it matter?", desc: "The story of how DBT was born, and why its creator understood BPD better than almost anyone.", color: "#5c8a5e", readMinutes: 6 },
  { slug: "understanding-emotional-intensity", icon: <Leaf size={20} strokeWidth={1.5} />, label: "Emotions", title: "Understanding your emotional intensity", desc: "Why emotions hit harder in BPD, what's happening in the brain, and what you can do about it.", color: "#7a6eb8", readMinutes: 7 },
  { slug: "fear-of-abandonment", icon: <Shield size={20} strokeWidth={1.5} />, label: "Relationships", title: "Fear of abandonment, and how to work with it", desc: "One of the most painful parts of BPD. How to recognize the pattern and begin to change it.", color: "#5a8ab0", readMinutes: 9 },
];

const ARTICLE_CATEGORIES = ["All", "BPD Basics", "DBT Origins", "Emotions", "Relationships"] as const;
type ArticleCategory = (typeof ARTICLE_CATEGORIES)[number];

const mythsFacts = [
  { myth: "People with BPD are manipulative and toxic.", fact: "Behavior in BPD is almost always a desperate attempt to regulate intolerable emotional pain, not a calculated desire to harm or control others. Understanding is the first step to healing.", color: "#c87a5a" },
  { myth: "BPD is untreatable and a lifelong sentence.", fact: "BPD has one of the highest recovery rates among major mental health conditions! DBT skills have a clinically proven track record of helping people build deeply fulfilling, stable lives.", color: "#5c8a5e" },
  { myth: "Emotional intensity is just being dramatic.", fact: "Brain imaging shows the emotional threat system (amygdala) is physically hyper-reactive in BPD. Feelings are literally felt at full volume without a built-in emotional buffer.", color: "#7a6eb8" },
  { myth: "Only women struggle with and get diagnosed with BPD.", fact: "BPD affects men and women at almost identical rates. However, due to societal expectations and clinical diagnostic bias, men are often misdiagnosed with PTSD, ADHD, or antisocial traits.", color: "#5a8ab0" },
  { myth: "Self-harm or crisis behaviors are just for attention.", fact: "These behaviors represent a severe crisis of emotional overload. They are coping tools used when a person lacks other skills to survive extreme agony. They need immediate safety and support.", color: "#c87a5a" },
  { myth: "People with BPD cannot build stable, loving relationships.", fact: "With proper DBT skills, clear emotional boundaries, and healthy communication patterns, individuals with BPD are fully capable of establishing incredibly deep, nurturing, and stable relationships.", color: "#5c8a5e" },
];

const glossary = [
  { term: "Wise Mind", definition: "The calm, balanced state of mind where logical thinking and emotional experiencing meet. It is the place of deep intuition and steady clarity.", category: "Core Concept" },
  { term: "Radical Acceptance", definition: "Completely accepting reality as it is in the present moment, without fighting, judging, or denying it. Acceptance is not the same as approval.", category: "Distress Tolerance" },
  { term: "Splitting", definition: "A subconscious defense mechanism where things, experiences, or people are viewed in black-and-white: either all good or all bad, with no middle ground.", category: "Relationship Trait" },
  { term: "Validation", definition: "Acknowledging and understanding someone's (or your own) emotions, thoughts, or behaviors as making sense and being understandable in the current context.", category: "Communication" },
  { term: "Dialectics", definition: "The philosophy that two seemingly opposite things can both be true at the same time. For example: 'I accept myself as I am, AND I am working to change.'", category: "Core Concept" },
  { term: "Emotional Dysregulation", definition: "The difficulty or inability to manage intense emotional reactions, leading to rapid mood changes, overwhelming feelings, or difficulty returning to a baseline calm.", category: "Emotion Regulation" },
  { term: "Window of Tolerance", definition: "The emotional zone where you can handle stress without becoming overwhelmed or shutting down. The goal of most DBT work is to widen this window over time.", category: "Core Concept" },
  { term: "TIPP", definition: "Temperature, Intense exercise, Paced breathing, Progressive muscle relaxation. A four-step distress tolerance skill for changing your body chemistry fast during a crisis.", category: "Distress Tolerance" },
  { term: "DEAR MAN", definition: "Describe, Express, Assert, Reinforce, (stay) Mindful, Appear confident, Negotiate. The DBT framework for asking for what you need while keeping the relationship intact.", category: "Communication" },
  { term: "Emotional Reasoning", definition: "Treating feelings as evidence of facts. 'I feel worthless, therefore I am worthless.' One of the most common thought traps in BPD; feelings are real but not always accurate.", category: "Emotion Regulation" },
  { term: "Cope Ahead", definition: "Rehearsing how you'll handle a hard situation BEFORE it happens. Mental rehearsal of the skills you'll use, while you're still calm and clear-headed.", category: "Emotion Regulation" },
  { term: "Self-Validation", definition: "The act of acknowledging your own feelings as real and understandable, without needing anyone else to confirm them. The antidote to chronic self-doubt.", category: "Communication" },
  { term: "Urge Surfing", definition: "Riding out an intense urge (to self-harm, lash out, run, etc.) by observing it as a wave that crests and falls. The urge will pass, as most peak within 20 minutes.", category: "Distress Tolerance" },
  { term: "Opposite Action", definition: "When an emotion doesn't fit the facts of a situation, act opposite to what the emotion is urging you to do. The full opposite, with your whole body.", category: "Emotion Regulation" },
];

export default function LearnClient() {
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [articleCategory, setArticleCategory] = useState<ArticleCategory>("All");

  const renderArticleTitle = (title: string, color: string) => {
    const targets = ["actually feel", "Marsha Linehan", "emotional intensity", "how to work"];
    let matchedTarget = "";
    for (const t of targets) {
      if (title.includes(t)) {
        matchedTarget = t;
        break;
      }
    }

    if (!matchedTarget) return title;

    const parts = title.split(matchedTarget);
    const highlightColor = `${color}33`;

    return (
      <>
        {parts[0]}
        <RoughNotation
          type="highlight"
          color={highlightColor}
          viewportDelay={800}
        >
          {matchedTarget}
        </RoughNotation>
        {parts[1]}
      </>
    );
  };

  const toggleFlip = (index: number) => {
    setFlippedCards((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const lowerQuery = searchQuery.trim().toLowerCase();

  const filteredArticles = useMemo(
    () =>
      articles.filter((a) => {
        if (articleCategory !== "All" && a.label !== articleCategory) return false;
        if (!lowerQuery) return true;
        return (
          a.title.toLowerCase().includes(lowerQuery) ||
          a.desc.toLowerCase().includes(lowerQuery) ||
          a.label.toLowerCase().includes(lowerQuery)
        );
      }),
    [articleCategory, lowerQuery]
  );

  const filteredGlossary = useMemo(
    () =>
      glossary.filter(
        (item) =>
          !lowerQuery ||
          item.term.toLowerCase().includes(lowerQuery) ||
          item.definition.toLowerCase().includes(lowerQuery) ||
          item.category.toLowerCase().includes(lowerQuery)
      ),
    [lowerQuery]
  );

  return (
    <>
      <main style={{ paddingTop: "120px", background: "var(--cream)", minHeight: "100vh" }}>
        <section style={{ padding: "40px 0 56px" }}>
          <div className="container-narrow" style={{ textAlign: "center" }}>
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
              <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>Educational Hub</span>
            </div>

            <span className="section-label">Educational Hub</span>
            <h1 className="h2" style={{ color: "var(--text-primary)", marginTop: "12px", marginBottom: "20px" }}>
              <RoughNotation type="underline" color="rgba(92, 138, 94, 0.75)" strokeWidth={2.5} padding={2} viewportDelay={300}>
                Understanding yourself
              </RoughNotation>
              <br />
              is the first step.
            </h1>
            <p className="body-lg" style={{ color: "var(--text-secondary)" }}>
              Real information about BPD, emotions, and DBT, written like a kind friend who actually
              gets it.
            </p>

            <div
              style={{
                position: "relative",
                maxWidth: "480px",
                margin: "32px auto 0",
              }}
            >
              <Search
                size={18}
                style={{
                  position: "absolute",
                  left: "20px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--text-muted)",
                  pointerEvents: "none",
                }}
              />
              <input
                type="text"
                placeholder="Search articles and glossary..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
                style={{
                  width: "100%",
                  padding: "14px 16px 14px 48px",
                  borderRadius: "var(--radius-full)",
                  border: "1px solid var(--border)",
                  outline: "none",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.95rem",
                  color: "var(--text-primary)",
                  background: "var(--warm-white)",
                  transition: "all 0.25s ease",
                  boxShadow: "var(--shadow-sm)",
                }}
              />
            </div>
          </div>
        </section>

        <section style={{ paddingBottom: "80px" }}>
          <div className="container">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                marginBottom: "24px",
                gap: "20px",
                flexWrap: "wrap",
              }}
            >
              <div>
                <span className="section-label">Articles</span>
                <h2
                  className="h3"
                  style={{
                    color: "var(--text-primary)",
                    marginTop: "10px",
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  Reading list
                </h2>
              </div>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.85rem",
                  color: "var(--text-muted)",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <SlidersHorizontal size={13} strokeWidth={1.5} /> Filter by topic
              </p>
            </div>

            <div
              style={{
                display: "flex",
                gap: "8px",
                marginBottom: "32px",
                flexWrap: "wrap",
              }}
            >
              {ARTICLE_CATEGORIES.map((cat) => {
                const active = articleCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setArticleCategory(cat)}
                    style={{
                      padding: "8px 16px",
                      borderRadius: "var(--radius-full)",
                      border: active
                        ? "1.5px solid var(--sage)"
                        : "1.5px solid var(--border)",
                      background: active ? "var(--sage)" : "var(--warm-white)",
                      color: active ? "white" : "var(--text-secondary)",
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: active ? 600 : 500,
                      fontSize: "0.85rem",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      boxShadow: active ? "0 4px 12px rgba(92, 138, 94, 0.28)" : "none",
                    }}
                    onMouseEnter={(e) => {
                      if (!active) {
                        e.currentTarget.style.borderColor = "var(--sage)";
                        e.currentTarget.style.color = "var(--sage-dark)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!active) {
                        e.currentTarget.style.borderColor = "var(--border)";
                        e.currentTarget.style.color = "var(--text-secondary)";
                      }
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {filteredArticles.length > 0 ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "24px",
                }}
                className="learn-grid"
              >
                {filteredArticles.map((a) => (
                  <Link key={a.title} href={`/learn/${a.slug}`} style={{ textDecoration: "none" }}>
                    <article
                      className="article-card"
                      style={{
                        background: "var(--warm-white)",
                        borderRadius: "var(--radius-xl)",
                        padding: "32px",
                        border: "1px solid var(--border)",
                        boxShadow: "var(--shadow-sm)",
                        transition: "all 0.32s cubic-bezier(0.22, 1, 0.36, 1)",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        // @ts-expect-error custom prop
                        "--accent": a.color,
                      }}
                    >
                      <div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: "18px",
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <span style={{ color: a.color, display: "inline-flex" }}>{a.icon}</span>
                            <span
                              style={{
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: "0.75rem",
                                fontWeight: 600,
                                letterSpacing: "0.1em",
                                textTransform: "uppercase",
                                color: "var(--text-muted)",
                              }}
                            >
                              {a.label}
                            </span>
                          </div>
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "5px",
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: "0.78rem",
                              color: "var(--text-muted)",
                              background: "var(--cream)",
                              border: "1px solid var(--border)",
                              padding: "4px 10px",
                              borderRadius: "var(--radius-full)",
                            }}
                          >
                            <Clock size={11} strokeWidth={1.5} /> {a.readMinutes} min
                          </span>
                        </div>
                        <h3
                          style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: "1.4rem",
                            fontWeight: 400,
                            color: "var(--text-primary)",
                            marginBottom: "12px",
                            lineHeight: 1.4,
                          }}
                        >
                          {renderArticleTitle(a.title, a.color)}
                        </h3>
                        <p
                          style={{
                            color: "var(--text-secondary)",
                            fontSize: "0.95rem",
                            lineHeight: 1.6,
                            marginBottom: "24px",
                            fontFamily: "'DM Sans', sans-serif",
                          }}
                        >
                          {a.desc}
                        </p>
                      </div>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          fontSize: "0.88rem",
                          fontWeight: 600,
                          color: a.color,
                          fontFamily: "'DM Sans', sans-serif",
                        }}
                      >
                        Read article{" "}
                        <span
                          className="card-arrow"
                          style={{
                            display: "inline-flex",
                            transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                          }}
                        >
                          <ArrowRight size={14} strokeWidth={1.5} />
                        </span>
                      </span>
                    </article>
                  </Link>
                ))}
              </div>
            ) : (
              <EmptyState
                onClear={() => {
                  setSearchQuery("");
                  setArticleCategory("All");
                }}
                message={
                  lowerQuery
                    ? `No articles match "${searchQuery}" in ${articleCategory === "All" ? "any category" : articleCategory}.`
                    : `No articles in ${articleCategory} yet.`
                }
              />
            )}
          </div>
        </section>

        <section
          style={{
            background: "rgba(28,28,30,0.02)",
            borderTop: "1px solid var(--border)",
            borderBottom: "1px solid var(--border)",
            padding: "80px 0",
          }}
        >
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <span
                className="section-label"
                style={{ background: "rgba(200, 122, 90, 0.1)", color: "#c87a5a" }}
              >
                De-Stigmatizing BPD
              </span>
              <h2
                className="h2"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: "var(--text-primary)",
                  fontSize: "2.2rem",
                  fontWeight: 400,
                  marginTop: "12px",
                }}
              >
                Myths &amp; Facts
              </h2>
              <p
                className="body-md"
                style={{ color: "var(--text-secondary)", maxWidth: "560px", margin: "12px auto 0" }}
              >
                BPD is heavily misunderstood. Click any card to separate stigma from compassionate truth.
              </p>
            </div>

            <div
              style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}
              className="myths-grid"
            >
              {mythsFacts.map((item, idx) => {
                const isFlipped = !!flippedCards[idx];
                return (
                  <div key={idx} className="flip-card-container" style={{ perspective: "1000px", height: "260px" }}>
                    <div
                      className={`flip-card ${isFlipped ? "flipped" : ""}`}
                      onClick={() => toggleFlip(idx)}
                      style={{
                        position: "relative",
                        width: "100%",
                        height: "100%",
                        transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                        transformStyle: "preserve-3d",
                        cursor: "pointer",
                        transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                      }}
                    >
                      <div
                        className="flip-card-front"
                        style={{
                          position: "absolute",
                          width: "100%",
                          height: "100%",
                          backfaceVisibility: "hidden",
                          background: "white",
                          borderRadius: "24px",
                          padding: "32px",
                          border: "1px solid var(--border)",
                          boxShadow: "var(--shadow-sm)",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "6px",
                              marginBottom: "16px",
                              color: "#d9534f",
                            }}
                          >
                            <HelpCircle size={18} />
                            <span
                              style={{
                                fontSize: "0.75rem",
                                fontWeight: 700,
                                letterSpacing: "0.1em",
                                textTransform: "uppercase",
                                fontFamily: "'DM Sans', sans-serif",
                              }}
                            >
                              Common Myth
                            </span>
                          </div>
                          <p
                            style={{
                              fontFamily: "'Playfair Display', serif",
                              fontSize: "1.25rem",
                              color: "var(--text-primary)",
                              lineHeight: 1.4,
                              margin: 0,
                            }}
                          >
                            &ldquo;{item.myth}&rdquo;
                          </p>
                        </div>
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                            fontSize: "0.8rem",
                            color: "var(--text-muted)",
                            fontFamily: "'DM Sans', sans-serif",
                            fontWeight: 600,
                          }}
                        >
                          Tap to reveal fact <ArrowRight size={12} style={{ opacity: 0.6 }} />
                        </span>
                      </div>

                      <div
                        className="flip-card-back"
                        style={{
                          position: "absolute",
                          width: "100%",
                          height: "100%",
                          backfaceVisibility: "hidden",
                          background: "var(--navy)",
                          color: "white",
                          borderRadius: "24px",
                          padding: "32px",
                          border: "1px solid var(--navy)",
                          boxShadow: "var(--shadow-md)",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          transform: "rotateY(180deg)",
                        }}
                      >
                        <div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "6px",
                              marginBottom: "14px",
                              color: "var(--peach)",
                            }}
                          >
                            <Sparkles size={16} />
                            <span
                              style={{
                                fontSize: "0.75rem",
                                fontWeight: 700,
                                letterSpacing: "0.1em",
                                textTransform: "uppercase",
                                fontFamily: "'DM Sans', sans-serif",
                              }}
                            >
                              Compassionate Fact
                            </span>
                          </div>
                          <p
                            style={{
                              fontSize: "0.92rem",
                              lineHeight: 1.6,
                              color: "rgba(255,255,255,0.9)",
                              margin: 0,
                              fontFamily: "'DM Sans', sans-serif",
                            }}
                          >
                            {item.fact}
                          </p>
                        </div>
                        <span
                          style={{
                            fontSize: "0.8rem",
                            color: "var(--peach)",
                            fontFamily: "'DM Sans', sans-serif",
                            fontWeight: 600,
                          }}
                        >
                          Tap to flip back
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section style={{ padding: "80px 0 100px" }}>
          <div className="container">
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                marginBottom: "32px",
                flexWrap: "wrap",
                gap: "20px",
              }}
            >
              <div>
                <span
                  className="section-label"
                  style={{ background: "rgba(92, 138, 94, 0.1)", color: "#5c8a5e" }}
                >
                  Therapy Vocabulary
                </span>
                <h2
                  className="h2"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    color: "var(--text-primary)",
                    fontSize: "2.2rem",
                    fontWeight: 400,
                    marginTop: "12px",
                    marginBottom: 0,
                  }}
                >
                  The Friendly <RoughNotation type="circle" color="rgba(92, 138, 94, 0.7)" strokeWidth={2.5} padding={8} viewportDelay={400}>DBT Glossary</RoughNotation>
                </h2>
                <p
                  className="body-md"
                  style={{ color: "var(--text-secondary)", marginTop: "8px", maxWidth: "480px" }}
                >
                  Therapy jargon can feel clinical or cold. Here are common terms defined in simple,
                  gentle language.
                </p>
              </div>
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.82rem",
                  color: "var(--text-muted)",
                  background: "var(--warm-white)",
                  border: "1px solid var(--border)",
                  padding: "8px 14px",
                  borderRadius: "var(--radius-full)",
                  whiteSpace: "nowrap",
                }}
              >
                {filteredGlossary.length} of {glossary.length} terms
              </span>
            </div>

            {filteredGlossary.length > 0 ? (
              <div
                style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}
                className="glossary-grid"
              >
                {filteredGlossary.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: "white",
                      border: "1px solid var(--border)",
                      borderRadius: "var(--radius-lg)",
                      padding: "26px 24px",
                      boxShadow: "var(--shadow-sm)",
                      display: "flex",
                      flexDirection: "column",
                      transition: "transform 0.25s ease, box-shadow 0.25s ease",
                    }}
                    className="glossary-card"
                  >
                    <span
                      style={{
                        display: "inline-block",
                        fontSize: "0.72rem",
                        fontWeight: 600,
                        color: "var(--sage-dark)",
                        background: "rgba(92,138,94,0.08)",
                        padding: "4px 10px",
                        borderRadius: "9999px",
                        marginBottom: "14px",
                        fontFamily: "'DM Sans', sans-serif",
                        alignSelf: "flex-start",
                      }}
                    >
                      {item.category}
                    </span>
                    <h3
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "1.25rem",
                        color: "var(--text-primary)",
                        fontWeight: 400,
                        margin: "0 0 10px 0",
                      }}
                    >
                      {item.term}
                    </h3>
                    <p
                      style={{
                        color: "var(--text-secondary)",
                        fontSize: "0.9rem",
                        lineHeight: 1.6,
                        margin: 0,
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    >
                      {item.definition}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                onClear={() => setSearchQuery("")}
                message={`No glossary terms match "${searchQuery}".`}
              />
            )}

            <div style={{ textAlign: "center", marginTop: "64px" }}>
              <p
                style={{
                  fontFamily: "'Caveat', cursive",
                  fontSize: "1.2rem",
                  color: "var(--text-muted)",
                  marginBottom: "20px",
                }}
              >
                Ready to put knowledge into practice?
              </p>
              <Link
                href="/dbt"
                className="btn-primary"
                style={{ display: "inline-flex", alignItems: "center", gap: "8px", margin: "0 auto" }}
              >
                Explore DBT Skills{" "}
                <span className="btn-arrow" style={{ display: "inline-flex", transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)" }}>
                  <ArrowRight size={16} strokeWidth={1.5} />
                </span>
              </Link>
            </div>

            <div style={{
              marginTop: "64px",
              padding: "32px 40px",
              background: "linear-gradient(135deg, rgba(92,138,94,0.06) 0%, rgba(232,200,122,0.08) 100%)",
              border: "1px solid rgba(92,138,94,0.18)",
              borderRadius: "var(--radius-xl)",
              textAlign: "center",
              maxWidth: "620px",
              marginLeft: "auto",
              marginRight: "auto",
            }}>
              <span style={{
                display: "inline-block",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--sage-dark)",
                background: "rgba(92,138,94,0.1)",
                border: "1px solid rgba(92,138,94,0.2)",
                borderRadius: "9999px",
                padding: "4px 14px",
                marginBottom: "16px",
              }}>
                ✦ Important Note
              </span>
              <p style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.25rem",
                fontWeight: 400,
                color: "var(--text-primary)",
                lineHeight: 1.55,
                marginBottom: "12px",
              }}>
                Want to write for Anchorleaf?
              </p>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.95rem",
                lineHeight: 1.7,
                color: "var(--text-secondary)",
                marginBottom: "20px",
              }}>
                If you have a story, skill breakdown, or compassionate perspective on BPD and DBT you&apos;d like to share, we&apos;d love to include it here. Every contributor gets full credit - your name, bio link, and anything else you&apos;d like attached to your work.
              </p>
              <a
                href="https://x.com/digambarcodes"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  color: "var(--sage-dark)",
                  background: "white",
                  border: "1.5px solid rgba(92,138,94,0.3)",
                  borderRadius: "9999px",
                  padding: "10px 24px",
                  textDecoration: "none",
                  transition: "all 0.25s ease",
                  boxShadow: "var(--shadow-sm)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(92,138,94,0.08)";
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--sage)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "white";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(92,138,94,0.3)";
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                Reach out on X · @digambarcodes
              </a>
            </div>
          </div>
        </section>
      </main>

      <style>{`
        .article-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-card-hover);
          border-color: var(--accent) !important;
        }
        .article-card:hover .card-arrow {
          transform: translateX(4px);
        }
        .glossary-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }
        .btn-primary:hover .btn-arrow {
          transform: translateX(4px);
        }
        .search-input:focus {
          border-color: var(--sage) !important;
          box-shadow: 0 0 0 4px rgba(92,138,94,0.12), var(--shadow-sm) !important;
        }
        .flip-card-container:hover .flip-card {
          transform: rotateY(180deg);
        }
        .flip-card-container:hover .flip-card.flipped {
          transform: rotateY(0deg);
        }
        @media (max-width: 991px) {
          .myths-grid, .glossary-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .learn-grid, .myths-grid, .glossary-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}

function EmptyState({ message, onClear }: { message: string; onClear: () => void }) {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "56px 24px",
        background: "var(--warm-white)",
        borderRadius: "var(--radius-xl)",
        border: "1px dashed var(--border)",
      }}
    >
      <p
        style={{
          color: "var(--text-secondary)",
          fontSize: "1rem",
          fontFamily: "'DM Sans', sans-serif",
          marginBottom: "8px",
        }}
      >
        {message}
      </p>
      <button
        onClick={onClear}
        style={{
          background: "none",
          border: "none",
          color: "var(--sage-dark)",
          textDecoration: "underline",
          textUnderlineOffset: "3px",
          fontWeight: 600,
          cursor: "pointer",
          fontFamily: "'DM Sans', sans-serif",
          marginTop: "4px",
          fontSize: "0.9rem",
        }}
      >
        Clear filters
      </button>
    </div>
  );
}
