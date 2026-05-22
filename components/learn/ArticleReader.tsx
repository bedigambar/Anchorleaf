"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Clock, ChevronUp, Bookmark } from "lucide-react";
import { articlesData } from "@/data/articles";

const ARTICLE_ORDER = Object.keys(articlesData);

export default function ArticlePage() {
  const params = useParams();
  const slug = params.slug as string;
  const article = articlesData[slug];

  const { neighbors } = useMemo(() => {
    const idx = ARTICLE_ORDER.indexOf(slug);
    if (idx < 0) return { neighbors: { prev: null, next: null } };
    const prevSlug = idx > 0 ? ARTICLE_ORDER[idx - 1] : null;
    const nextSlug = idx < ARTICLE_ORDER.length - 1 ? ARTICLE_ORDER[idx + 1] : null;
    return {
      neighbors: {
        prev: prevSlug ? { slug: prevSlug, ...articlesData[prevSlug] } : null,
        next: nextSlug ? { slug: nextSlug, ...articlesData[nextSlug] } : null,
      },
    };
  }, [slug]);

  const { scrollYProgress } = useScroll();
  const progressScaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 36,
    mass: 0.4,
  });

  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (!article) {
    return (
      <>
        <main
          style={{
            paddingTop: "100px",
            paddingBottom: "100px",
            background: "var(--cream)",
            minHeight: "80vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <h1 className="h2" style={{ color: "var(--text-primary)", marginBottom: "20px" }}>
              Article Not Found
            </h1>
            <p className="body-md" style={{ color: "var(--text-secondary)", marginBottom: "32px" }}>
              We couldn&apos;t find the article you are looking for.
            </p>
            <Link href="/learn" className="btn-primary">
              Back to Learn Hub
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>

      <motion.div
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: article.color,
          transformOrigin: "0% 50%",
          scaleX: progressScaleX,
          zIndex: 95,
          opacity: 0.95,
        }}
      />

      <main style={{ paddingTop: "100px", background: "var(--cream)", minHeight: "100vh" }}>
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "8px",
            paddingBottom: "20px",
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
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = article.color || "var(--sage)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-secondary)"; }}
          >
            Home
          </Link>
          <span style={{ opacity: 0.35, userSelect: "none" }}>/</span>
          <Link
            href="/learn"
            style={{
              textDecoration: "none",
              color: "inherit",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = article.color || "var(--sage)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-secondary)"; }}
          >
            Educational Hub
          </Link>
          <span style={{ opacity: 0.35, userSelect: "none" }}>/</span>
          <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>{article.title}</span>
        </div>

        <section style={{ paddingBottom: "40px" }}>
          <div className="container-narrow" style={{ textAlign: "left" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "20px",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  color: article.color,
                  background: `${article.color}15`,
                  padding: "6px 14px",
                  borderRadius: "9999px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  fontFamily: "'DM Sans', sans-serif",
                  border: `1px solid ${article.color}25`,
                }}
              >
                {article.icon} {article.label}
              </span>
              <span
                style={{
                  color: "var(--text-muted)",
                  fontSize: "0.85rem",
                  fontFamily: "'DM Sans', sans-serif",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <Clock size={14} strokeWidth={1.5} /> {article.readTime}
              </span>
            </div>

            <p
              style={{
                fontFamily: "'Caveat', cursive",
                fontSize: "1.2rem",
                color: "var(--text-muted)",
                marginBottom: "10px",
              }}
            >
              take your time with this one
            </p>

            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2.2rem, 5vw, 3.2rem)",
                fontWeight: 400,
                color: "var(--text-primary)",
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
                marginBottom: "32px",
                maxWidth: "800px",
              }}
            >
              {article.title}
            </h1>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                borderBottom: "1px solid rgba(28,28,30,0.08)",
                paddingBottom: "24px",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "var(--sage-light)",
                  color: "var(--sage-dark)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                }}
              >
                AL
              </div>
              <div style={{ flex: 1 }}>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    margin: 0,
                  }}
                >
                  Anchorleaf Editorial
                </p>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.8rem",
                    color: "var(--text-muted)",
                    margin: 0,
                  }}
                >
                  Reviewed against the DBT curriculum
                </p>
              </div>
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: article.title,
                      url: window.location.href,
                    }).catch(() => undefined);
                  } else if (navigator.clipboard) {
                    navigator.clipboard.writeText(window.location.href);
                  }
                }}
                aria-label="Share or copy link"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "8px 14px",
                  background: "var(--warm-white)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-full)",
                  color: "var(--text-secondary)",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.82rem",
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = article.color;
                  e.currentTarget.style.color = article.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.color = "var(--text-secondary)";
                }}
              >
                <Bookmark size={13} strokeWidth={1.5} /> Save
              </button>
            </div>
          </div>
        </section>

        <section style={{ paddingBottom: "60px" }}>
          <div className="container-narrow" style={{ maxWidth: "680px", margin: "0 auto" }}>
            {article.content}

            <div
              style={{
                marginTop: "56px",
                padding: "40px",
                background: "var(--navy)",
                borderRadius: "var(--radius-xl)",
                color: "white",
                textAlign: "center",
                boxShadow: "var(--shadow-md)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  top: "-80px",
                  right: "-60px",
                  width: "240px",
                  height: "240px",
                  borderRadius: "50%",
                  background: `${article.color}33`,
                  filter: "blur(70px)",
                  pointerEvents: "none",
                }}
              />
              <p
                style={{
                  fontFamily: "'Caveat', cursive",
                  fontSize: "1.4rem",
                  color: "var(--peach)",
                  marginBottom: "12px",
                  fontWeight: 700,
                  position: "relative",
                }}
              >
                Ready to put knowledge into practice?
              </p>
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.6rem",
                  fontWeight: 400,
                  color: "var(--text-on-dark)",
                  marginBottom: "24px",
                  lineHeight: 1.4,
                  position: "relative",
                }}
              >
                Explore DBT skills tailored to how you feel today.
              </h3>
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  position: "relative",
                }}
              >
                <Link
                  href="/dbt"
                  className="btn-primary article-cta"
                  style={{
                    background: "white",
                    color: "var(--sage-dark)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  Explore DBT Skills{" "}
                  <span className="btn-arrow" style={{ display: "inline-flex", transition: "transform 0.3s ease" }}>
                    <ArrowRight size={16} strokeWidth={1.5} />
                  </span>
                </Link>
                <Link
                  href="/handbook"
                  style={{
                    background: "transparent",
                    color: "var(--text-on-dark)",
                    border: "1.5px solid rgba(254,250,245,0.4)",
                    padding: "13px 26px",
                    borderRadius: "var(--radius-sm)",
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 500,
                    fontSize: "0.95rem",
                    textDecoration: "none",
                    transition: "all 0.2s ease",
                  }}
                >
                  Or open the DBT Handbook
                </Link>
              </div>
            </div>

            {(neighbors.prev || neighbors.next) && (
              <div
                style={{
                  marginTop: "48px",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "16px",
                }}
                className="article-nav-grid"
              >
                {neighbors.prev ? (
                  <Link
                    href={`/learn/${neighbors.prev.slug}`}
                    className="article-nav-card"
                    style={{
                      display: "block",
                      padding: "22px 24px",
                      background: "var(--warm-white)",
                      border: "1px solid var(--border)",
                      borderRadius: "var(--radius-lg)",
                      textDecoration: "none",
                      transition: "all 0.25s ease",
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
                        marginBottom: "8px",
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <ArrowLeft size={11} strokeWidth={1.5} /> Previous
                    </p>
                    <p
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "1.05rem",
                        fontWeight: 400,
                        color: "var(--text-primary)",
                        lineHeight: 1.3,
                      }}
                    >
                      {neighbors.prev.title}
                    </p>
                  </Link>
                ) : (
                  <div />
                )}
                {neighbors.next ? (
                  <Link
                    href={`/learn/${neighbors.next.slug}`}
                    className="article-nav-card"
                    style={{
                      display: "block",
                      padding: "22px 24px",
                      background: "var(--warm-white)",
                      border: "1px solid var(--border)",
                      borderRadius: "var(--radius-lg)",
                      textDecoration: "none",
                      transition: "all 0.25s ease",
                      textAlign: "right",
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
                        marginBottom: "8px",
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        justifyContent: "flex-end",
                      }}
                    >
                      Next <ArrowRight size={11} strokeWidth={1.5} />
                    </p>
                    <p
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "1.05rem",
                        fontWeight: 400,
                        color: "var(--text-primary)",
                        lineHeight: 1.3,
                      }}
                    >
                      {neighbors.next.title}
                    </p>
                  </Link>
                ) : (
                  <div />
                )}
              </div>
            )}
          </div>
        </section>
      </main>

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.92 }}
            transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
            onClick={scrollToTop}
            aria-label="Scroll to top"
            style={{
              position: "fixed",
              bottom: 24,
              right: 24,
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              background: "var(--warm-white)",
              border: `1px solid ${article.color}40`,
              boxShadow: "0 12px 28px rgba(28, 35, 28, 0.16)",
              color: article.color,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 90,
              transition: "transform 0.2s ease",
            }}
            whileHover={{ y: -2 }}
          >
            <ChevronUp size={20} strokeWidth={1.75} />
          </motion.button>
        )}
      </AnimatePresence>

      <style>{`
        .back-link:hover { color: var(--text-primary) !important; }
        .back-link:hover .back-arrow { transform: translateX(-4px); }
        .article-cta:hover { background: var(--sage-light) !important; }
        .article-cta:hover .btn-arrow { transform: translateX(4px); }
        .article-nav-card:hover {
          transform: translateY(-2px);
          border-color: var(--sage) !important;
          box-shadow: var(--shadow-md);
        }
        @media (max-width: 640px) {
          .article-nav-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
