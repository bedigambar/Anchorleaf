"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Leaf, Phone, MessageSquare, Code2, Heart, ArrowUpRight, ChevronUp } from "lucide-react";

const LINK_COLUMNS = [
  {
    title: "Learn",
    links: [
      { label: "What is BPD?", href: "/learn/what-does-bpd-feel-like" },
      { label: "Understanding emotions", href: "/learn/understanding-emotional-intensity" },
      { label: "Fear of abandonment", href: "/learn/fear-of-abandonment" },
      { label: "Who is Marsha Linehan?", href: "/learn/who-is-marsha-linehan" },
    ],
  },
  {
    title: "DBT Skills",
    links: [
      { label: "Mindfulness", href: "/dbt#mindfulness" },
      { label: "Distress Tolerance", href: "/dbt#distress-tolerance" },
      { label: "Emotion Regulation", href: "/dbt#emotion-regulation" },
      { label: "Interpersonal", href: "/dbt#interpersonal" },
    ],
  },
  {
    title: "Companion & Tools",
    links: [
      { label: "DBT Handbook", href: "/handbook" },
      { label: "Grounding tools", href: "/tools" },
      { label: "Daily journal", href: "/journal" },
      { label: "Printable cheat sheet", href: "/dbt/cheatsheet" },
      { label: "About this site", href: "/about" },
    ],
  },
];

const CRISIS_LINKS = [
  { label: "India: Call 14416", href: "tel:14416", icon: Phone },
  { label: "US/Global: Call/Text 988", href: "tel:988", icon: Phone },
  { label: "Text HOME to 741741", href: "sms:741741?body=HOME", icon: MessageSquare },
];

export default function Footer() {
  const pathname = usePathname();
  const year = new Date().getFullYear();

  if (pathname === "/handbook") return null;

  return (
    <footer
      style={{
        background: "var(--navy)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "-180px",
          left: "8%",
          width: "420px",
          height: "420px",
          borderRadius: "50%",
          background: "rgba(92, 138, 94, 0.18)",
          filter: "blur(120px)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: "-220px",
          right: "5%",
          width: "440px",
          height: "440px",
          borderRadius: "50%",
          background: "rgba(200, 184, 232, 0.12)",
          filter: "blur(140px)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      <div
        className="container-wide footer-inner"
        style={{ position: "relative", zIndex: 1, paddingTop: "88px", paddingBottom: "32px" }}
      >
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          aria-label="Crisis resources"
          className="footer-crisis"
          style={{
            background: "linear-gradient(135deg, rgba(245, 200, 176, 0.14) 0%, rgba(245, 200, 176, 0.04) 100%)",
            border: "1px solid rgba(245, 200, 176, 0.2)",
            borderRadius: "var(--radius-lg)",
            marginBottom: "64px",
            boxShadow: "0 1px 0 rgba(255,255,255,0.04) inset, 0 10px 30px rgba(0,0,0,0.16)",
          }}
        >
          <div className="footer-crisis-inner">
            <div className="footer-crisis-headline">
              <span className="footer-crisis-icon" aria-hidden>
                <Heart size={20} strokeWidth={1.5} />
              </span>
              <div className="footer-crisis-text">
                <p
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.15rem",
                    color: "var(--text-on-dark)",
                    marginBottom: "4px",
                    letterSpacing: "-0.01em",
                    lineHeight: 1.35,
                  }}
                >
                  If you&apos;re in crisis right now, please reach a real person.
                </p>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.88rem",
                    color: "var(--text-on-dark-muted)",
                    lineHeight: 1.55,
                  }}
                >
                  Free, confidential, 24/7 support. They are here to listen.
                </p>
              </div>
            </div>
            <div className="footer-crisis-actions">
              {CRISIS_LINKS.map((c) => {
                const Icon = c.icon;
                return (
                  <a
                    key={c.label}
                    href={c.href}
                    className="footer-crisis-btn"
                  >
                    <Icon size={14} strokeWidth={1.75} />
                    {c.label}
                  </a>
                );
              })}
            </div>
          </div>
        </motion.section>

        <div className="footer-grid">
          <div className="footer-brand">
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "18px",
                textDecoration: "none",
              }}
            >
              <Leaf size={20} strokeWidth={1.5} style={{ color: "var(--sage-light)" }} />
              <span
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.25rem",
                  color: "var(--text-on-dark)",
                  letterSpacing: "-0.01em",
                }}
              >
                Anchorleaf
              </span>
            </Link>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.95rem",
                color: "var(--text-on-dark-muted)",
                lineHeight: 1.7,
                maxWidth: "320px",
                marginBottom: "20px",
              }}
            >
              Find your steadiness. An emotionally safe, scientifically grounded, beautifully human
              companion for people navigating BPD.
            </p>
            <p
              style={{
                fontFamily: "'Caveat', cursive",
                fontSize: "1.1rem",
                color: "rgba(212, 232, 194, 0.85)",
                marginBottom: "24px",
              }}
            >
              free · no ads · no tracking
            </p>


          </div>

          <div className="footer-link-cols">
            {LINK_COLUMNS.map((col) => (
              <div key={col.title}>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "rgba(254, 250, 245, 0.45)",
                    marginBottom: "20px",
                  }}
                >
                  {col.title}
                </p>
                <ul
                  style={{
                    listStyle: "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                    padding: 0,
                  }}
                >
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="footer-link"
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.92rem",
                          color: "rgba(254, 250, 245, 0.7)",
                          textDecoration: "none",
                          transition: "color 0.2s ease, transform 0.2s ease",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-legal">
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.82rem",
                color: "rgba(254, 250, 245, 0.45)",
                lineHeight: 1.7,
                marginBottom: "4px",
              }}
            >
              © {year} Anchorleaf. Educational only, not a substitute for professional mental
              health care.
            </p>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.78rem",
                color: "rgba(254, 250, 245, 0.32)",
                lineHeight: 1.7,
              }}
            >
              Skills sourced from the DBT curriculum of Dr. Marsha M. Linehan.
            </p>
          </div>

          <div className="footer-meta-actions">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="footer-back-top"
            >
              <ChevronUp size={12} strokeWidth={1.75} /> Back to top
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .footer-crisis-inner {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 28px;
          align-items: center;
          padding: 26px 30px;
        }
        .footer-crisis-headline {
          display: flex;
          align-items: center;
          gap: 18px;
        }
        .footer-crisis-icon {
          flex-shrink: 0;
          width: 46px;
          height: 46px;
          border-radius: var(--radius-md);
          background: rgba(245, 200, 176, 0.16);
          border: 1px solid rgba(245, 200, 176, 0.28);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #f5c8a8;
        }
        .footer-crisis-text {
          min-width: 0;
        }
        .footer-crisis-actions {
          display: flex;
          gap: 10px;
          flex-shrink: 0;
        }
        .footer-crisis-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 11px 18px;
          background: rgba(254, 250, 245, 0.08);
          border: 1px solid rgba(245, 200, 176, 0.3);
          border-radius: var(--radius-full);
          color: #f5c8a8;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.86rem;
          font-weight: 500;
          text-decoration: none;
          white-space: nowrap;
          transition: background 0.22s ease, color 0.22s ease, transform 0.22s ease, border-color 0.22s ease;
        }
        .footer-crisis-btn:hover {
          background: rgba(245, 200, 176, 0.18);
          color: #ffe1cc;
          border-color: rgba(245, 200, 176, 0.5);
          transform: translateY(-1px);
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1.3fr 2.4fr;
          gap: 64px;
          margin-bottom: 56px;
          align-items: flex-start;
        }
        .footer-link-cols {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
        }

        .footer-bottom {
          border-top: 1px solid rgba(254, 250, 245, 0.08);
          padding-top: 24px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 24px;
          flex-wrap: wrap;
        }
        .footer-meta-actions {
          display: flex;
          gap: 16px;
          align-items: center;
          flex-wrap: wrap;
        }
        .footer-back-top {
          background: rgba(254, 250, 245, 0.06);
          border: 1px solid rgba(254, 250, 245, 0.12);
          border-radius: var(--radius-full);
          padding: 8px 14px 8px 12px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.78rem;
          color: rgba(254, 250, 245, 0.55);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .footer-back-top:hover {
          background: rgba(92, 138, 94, 0.22);
          color: var(--sage-light);
        }
        .footer-source {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.78rem;
          color: rgba(254, 250, 245, 0.38);
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .footer-source:hover { color: var(--sage-light); }

        .footer-link:hover {
          color: var(--sage-light) !important;
          transform: translateX(2px);
        }
        .footer-social {
          background: rgba(254, 250, 245, 0.06);
          border: 1px solid rgba(254, 250, 245, 0.1);
          border-radius: var(--radius-full);
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-on-dark-muted);
          transition: all 0.2s ease;
        }
        .footer-social:hover {
          background: rgba(92, 138, 94, 0.22) !important;
          border-color: rgba(92, 138, 94, 0.4) !important;
          color: var(--sage-light) !important;
        }

        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 48px;
          }
          .footer-link-cols {
            grid-template-columns: repeat(3, 1fr);
            gap: 32px;
          }
        }

        @media (max-width: 768px) {
          .footer-inner {
            padding-top: 64px !important;
            padding-bottom: 28px !important;
          }
          .footer-crisis {
            margin-bottom: 48px !important;
          }
          .footer-crisis-inner {
            grid-template-columns: 1fr;
            gap: 18px;
            padding: 22px 22px;
            text-align: center;
          }
          .footer-crisis-headline {
            flex-direction: column;
            gap: 14px;
            align-items: center;
          }
          .footer-crisis-text {
            text-align: center;
          }
          .footer-crisis-actions {
            justify-content: center;
            flex-wrap: wrap;
            width: 100%;
          }
          .footer-crisis-btn {
            flex: 1 1 auto;
            justify-content: center;
            min-width: 140px;
          }
          .footer-grid {
            gap: 40px;
          }
          .footer-link-cols {
            grid-template-columns: repeat(2, 1fr);
            gap: 28px;
          }
          .footer-link-cols > div:nth-child(1) {
            grid-column: 1;
            grid-row: 1;
          }
          .footer-link-cols > div:nth-child(2) {
            grid-column: 1;
            grid-row: 2;
          }
          .footer-link-cols > div:nth-child(3) {
            grid-column: 2;
            grid-row: 1 / span 2;
            text-align: right;
          }
          .footer-link-cols > div:nth-child(3) p {
            text-align: right;
          }
          .footer-link-cols > div:nth-child(3) ul {
            align-items: flex-end !important;
          }
          .footer-link-cols > div:nth-child(3) .footer-link:hover {
            transform: translateX(-2px);
          }
          .footer-bottom {
            flex-direction: column;
            align-items: stretch;
            gap: 16px;
          }
          .footer-legal { text-align: center; }
          .footer-meta-actions {
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .footer-inner {
            padding-top: 52px !important;
            padding-bottom: 24px !important;
          }
          .footer-crisis-inner {
            padding: 22px 18px;
          }
          .footer-crisis-btn {
            font-size: 0.82rem;
            padding: 11px 14px;
            min-width: 0;
            flex: 1 1 100%;
          }
          .footer-brand p {
            max-width: 100% !important;
          }
        }
      `}</style>
    </footer>
  );
}
