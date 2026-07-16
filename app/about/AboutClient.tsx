"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Anchor,
  Leaf,
  Heart,
  ShieldCheck,
  BookHeart,
  HandHeart,
  ArrowRight,
  Phone,
  AlertTriangle,
  Stethoscope,
  BookOpen,
} from "lucide-react";
import RoughNotation from "@/components/ui/RoughNotation";

const reveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const PRINCIPLES = [
  {
    icon: Heart,
    title: "Emotionally safe",
    body: "Every word, color, and animation is designed to feel like a calm sunlit studio, not a clinic. We never lead with fear, never use stock photography of distressed people, and never lecture you about what you should feel.",
    tint: "rgba(212, 232, 194, 0.35)",
    accent: "#5c8a5e",
  },
  {
    icon: ShieldCheck,
    title: "Scientifically grounded",
    body: "Every skill on this site comes directly from Dr. Marsha Linehan's DBT curriculum. We translate the clinical language into something human, but we never invent skills, never fabricate research, and never replace your therapist.",
    tint: "rgba(176, 200, 232, 0.32)",
    accent: "#5a8ab0",
  },
  {
    icon: BookHeart,
    title: "Beautifully human",
    body: "Mental health tools shouldn't look like spreadsheets. We use serif type, hand-drawn accents, and warm cream backgrounds because the way something feels matters as much as what it says.",
    tint: "rgba(245, 200, 176, 0.28)",
    accent: "#c87a5a",
  },
  {
    icon: HandHeart,
    title: "Always free, never gated",
    body: "No account required to learn. No paywalls on skills. No email collection to read a page. The hardest moments shouldn't have a friction layer.",
    tint: "rgba(200, 184, 232, 0.28)",
    accent: "#7a6eb8",
  },
];

const BOUNDARIES = [
  {
    icon: AlertTriangle,
    headline: "This is not crisis care.",
    body: "If you are in immediate danger or thinking about hurting yourself, please call 988 (US/Global), 14416 (India Tele-MANAS), or your local emergency line. A website cannot meet you in the way a trained human can in that moment.",
  },
  {
    icon: Stethoscope,
    headline: "This is not a substitute for therapy.",
    body: "DBT works best when you have a clinician walking with you; someone who knows your history, can adjust the work to your pace, and can hold the harder pieces with you. Anchorleaf supplements that work. It does not replace it.",
  },
  {
    icon: BookHeart,
    headline: "This is not a diagnosis.",
    body: "We don't tell you that you have BPD, or any other condition. Self-identifying language can be powerful, and it can also lead you down a road you didn't actually need. If a label matters to you, get that conversation with a professional.",
  },
];

export default function AboutClient() {
  const renderPrincipleTitle = (title: string, color: string) => {
    const targets = ["safe", "grounded", "human", "gated"];
    let matchedTarget = "";
    for (const t of targets) {
      if (title.toLowerCase().includes(t)) {
        const idx = title.toLowerCase().indexOf(t);
        matchedTarget = title.substring(idx, idx + t.length);
        break;
      }
    }

    if (!matchedTarget) return title;

    const parts = title.split(matchedTarget);
    const highlightColor = `${color}25`;

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

  const renderInvolveTitle = (title: string) => {
    const targets = ["Share", "Tell us", "Donate"];
    let matchedTarget = "";
    for (const t of targets) {
      if (title.includes(t)) {
        matchedTarget = t;
        break;
      }
    }

    if (!matchedTarget) return title;

    const parts = title.split(matchedTarget);
    const highlightColor = "rgba(232, 200, 122, 0.3)";

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

  return (
    <main style={{ background: "var(--cream)", paddingTop: "120px", overflowX: "hidden" }}>
        <section
          className="container"
          style={{ position: "relative", paddingBottom: "100px", textAlign: "center" }}
        >
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
            <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>About</span>
          </div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            style={{ maxWidth: "780px", margin: "0 auto" }}
          >
            <motion.div
              variants={reveal}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "24px",
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "var(--sage-light)",
                  border: "1px solid rgba(92,138,94,0.25)",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--sage-dark)",
                }}
              >
                <Anchor size={18} strokeWidth={1.5} />
              </span>
              <span
                style={{
                  fontFamily: "'Caveat', cursive",
                  fontSize: "1.4rem",
                  color: "var(--sage-dark)",
                }}
              >
                what this is &amp; what it isn&apos;t
              </span>
              <span
                style={{
                  display: "inline-flex",
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "var(--sage-light)",
                  border: "1px solid rgba(92,138,94,0.25)",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--sage-dark)",
                }}
              >
                <Leaf size={18} strokeWidth={1.5} />
              </span>
            </motion.div>

            <motion.h1
              variants={reveal}
              className="h1"
              style={{ color: "var(--text-primary)", marginBottom: "24px" }}
            >
              You can be <RoughNotation type="highlight" color="rgba(232, 200, 122, 0.35)" viewportDelay={750}>rooted</RoughNotation>
              <br />
              <em style={{ fontStyle: "italic", color: "var(--sage-dark)" }}>and still grow.</em>
            </motion.h1>

            <motion.p
              variants={reveal}
              className="body-lg"
              style={{
                color: "var(--text-secondary)",
                maxWidth: "640px",
                margin: "0 auto 28px",
              }}
            >
              Anchorleaf is a calm, ad-free home for DBT skills, built for people who live with
              BPD and other intense emotional experiences. The work belongs to Marsha Linehan and
              the decades of clinicians and patients who refined it. We just made it a place that
              feels safe to read at 3am.
            </motion.p>

            <motion.div
              variants={reveal}
              style={{
                display: "flex",
                gap: "12px",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Link href="/dbt" className="btn-primary">
                Explore the skills <ArrowRight size={16} strokeWidth={1.5} />
              </Link>
              <Link
                href="/handbook"
                className="btn-ghost"
                style={{
                  background: "transparent",
                  color: "var(--text-primary)",
                  border: "1.5px solid var(--border)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <BookOpen size={14} strokeWidth={1.5} /> Open DBT Handbook
              </Link>
            </motion.div>
          </motion.div>
        </section>

        <section
          style={{
            background: "var(--warm-white)",
            borderTop: "1px solid var(--border)",
            borderBottom: "1px solid var(--border)",
            padding: "100px 0",
          }}
        >
          <div className="container">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1.4fr",
                gap: "80px",
                alignItems: "start",
              }}
              className="about-mission-grid"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <span className="section-label">Our story</span>
                <h2
                  className="h2"
                  style={{ color: "var(--text-primary)", marginTop: "12px", lineHeight: 1.4 }}
                >
                  Built for the version of you <RoughNotation type="underline" color="var(--sage)" strokeWidth={2} padding={1} viewportDelay={750}>that&apos;s up too late,</RoughNotation> looking for
                  one <RoughNotation type="circle" color="#e8c87a" strokeWidth={2.5} padding={8} viewportDelay={750}>steady sentence.</RoughNotation>
                </h2>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={stagger}
                style={{ display: "flex", flexDirection: "column", gap: "20px" }}
              >
                <motion.p variants={reveal} className="body-lg" style={{ color: "var(--text-secondary)" }}>
                  Most BPD and DBT resources online were written for clinicians, or built like a
                  textbook with bullet points and a disclaimer footer. Useful, but cold, and
                  almost never the right tone when you&apos;re the one needing them.
                </motion.p>
                <motion.p variants={reveal} className="body-md" style={{ color: "var(--text-secondary)" }}>
                  Anchorleaf takes Marsha Linehan&apos;s DBT curriculum and translates it the way a
                  steady friend would: short sentences, second person, no clinical jargon without
                  a translation. The goal is that someone in pain can land here, find the right
                  skill for this moment, and feel less alone for the next ten minutes.
                </motion.p>
                <motion.p variants={reveal} className="body-md" style={{ color: "var(--text-secondary)" }}>
                  We don&apos;t monetize you. No accounts. No analytics that follow you elsewhere.
                  No newsletter that nags. If the site ever asks for anything, it&apos;s because
                  it&apos;s the only way that feature can work, and you&apos;ll always have a way
                  to use the site without giving it.
                </motion.p>
              </motion.div>
            </div>
          </div>
        </section>

        <section style={{ padding: "100px 0" }}>
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              style={{ textAlign: "center", maxWidth: "640px", margin: "0 auto 56px" }}
            >
              <span className="section-label">What we hold to</span>
              <h2
                className="h2"
                style={{ color: "var(--text-primary)", marginTop: "12px", marginBottom: "16px" }}
              >
                Four <RoughNotation type="underline" color="var(--sage)" strokeWidth={2} padding={1} viewportDelay={750}>principles</RoughNotation>, no <RoughNotation type="underline" color="var(--sage)" strokeWidth={2} padding={1} viewportDelay={750}>exceptions</RoughNotation>.
              </h2>
              <p className="body-md" style={{ color: "var(--text-secondary)" }}>
                Mental health tools fail when they cut corners on any of these. We&apos;d rather
                ship less than ship something that violates one.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={stagger}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
              }}
              className="principles-grid"
            >
              {PRINCIPLES.map((p) => {
                const Icon = p.icon;
                return (
                  <motion.article
                    key={p.title}
                    variants={reveal}
                    style={{
                      background: p.tint,
                      border: `1px solid ${p.accent}33`,
                      borderRadius: "var(--radius-lg)",
                      padding: "32px",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      aria-hidden
                      style={{
                        position: "absolute",
                        top: "-40px",
                        right: "-40px",
                        width: "160px",
                        height: "160px",
                        borderRadius: "50%",
                        background: `${p.accent}10`,
                        filter: "blur(40px)",
                      }}
                    />
                    <div
                      style={{
                        position: "relative",
                        width: "44px",
                        height: "44px",
                        borderRadius: "var(--radius-md)",
                        background: "var(--warm-white)",
                        border: `1px solid ${p.accent}33`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: p.accent,
                        marginBottom: "20px",
                      }}
                    >
                      <Icon size={20} strokeWidth={1.5} />
                    </div>
                    <h3
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "1.5rem",
                        fontWeight: 700,
                        letterSpacing: "-0.02em",
                        color: p.accent,
                        marginBottom: "10px",
                        position: "relative",
                      }}
                    >
                      {renderPrincipleTitle(p.title, p.accent)}
                    </h3>
                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.98rem",
                        lineHeight: 1.65,
                        color: "var(--text-secondary)",
                        position: "relative",
                      }}
                    >
                      {p.body}
                    </p>
                  </motion.article>
                );
              })}
            </motion.div>
          </div>
        </section>

        <section
          style={{
            background: "var(--navy)",
            color: "var(--text-on-dark)",
            padding: "100px 0",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: "10%",
              left: "10%",
              width: "320px",
              height: "320px",
              borderRadius: "50%",
              background: "rgba(245, 200, 176, 0.08)",
              filter: "blur(80px)",
              zIndex: 0,
            }}
          />
          <div className="container" style={{ position: "relative", zIndex: 1 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              style={{ textAlign: "center", maxWidth: "640px", margin: "0 auto 56px" }}
            >
              <span
                className="section-label"
                style={{
                  background: "rgba(245, 200, 176, 0.15)",
                  color: "#f5c8a8",
                }}
              >
                Honest about what we&apos;re not
              </span>
              <h2
                className="h2"
                style={{ color: "var(--text-on-dark)", marginTop: "12px", marginBottom: "16px" }}
              >
                Things this site
                <em style={{ fontStyle: "italic", opacity: 0.7 }}> cannot </em>
                do.
              </h2>
              <p
                className="body-md"
                style={{ color: "var(--text-on-dark-muted)" }}
              >
                If you&apos;re here because you&apos;re hurting, please read these next three. They
                matter more than the rest of the site.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={stagger}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                maxWidth: "780px",
                margin: "0 auto",
              }}
            >
              {BOUNDARIES.map((b) => {
                const Icon = b.icon;
                return (
                  <motion.div
                    key={b.headline}
                    variants={reveal}
                    style={{
                      background: "rgba(254, 250, 245, 0.04)",
                      border: "1px solid rgba(254, 250, 245, 0.1)",
                      borderRadius: "var(--radius-lg)",
                      padding: "28px 30px",
                      display: "flex",
                      gap: "20px",
                      alignItems: "flex-start",
                    }}
                  >
                    <div
                      style={{
                        flexShrink: 0,
                        width: "44px",
                        height: "44px",
                        borderRadius: "var(--radius-md)",
                        background: "rgba(245, 200, 176, 0.12)",
                        border: "1px solid rgba(245, 200, 176, 0.25)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#f5c8a8",
                      }}
                    >
                      <Icon size={20} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3
                        style={{
                          fontFamily: "'Playfair Display', serif",
                          fontSize: "1.3rem",
                          fontWeight: 400,
                          letterSpacing: "-0.01em",
                          color: "var(--text-on-dark)",
                          marginBottom: "8px",
                        }}
                      >
                        {b.headline}
                      </h3>
                      <p
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.98rem",
                          lineHeight: 1.65,
                          color: "var(--text-on-dark-muted)",
                        }}
                      >
                        {b.body}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                marginTop: "44px",
                textAlign: "center",
                background: "linear-gradient(135deg, rgba(245, 200, 176, 0.16), rgba(245, 200, 176, 0.06))",
                border: "1px solid rgba(245, 200, 176, 0.25)",
                borderRadius: "var(--radius-lg)",
                padding: "24px 28px",
                maxWidth: "560px",
                margin: "44px auto 0",
                display: "flex",
                alignItems: "center",
                gap: "16px",
                justifyContent: "center",
              }}
            >
              <Phone size={20} strokeWidth={1.5} style={{ color: "#f5c8a8" }} />
              <div style={{ textAlign: "left" }}>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    color: "var(--text-on-dark)",
                    marginBottom: "2px",
                  }}
                >
                  In crisis right now? Call/Text 988 (US/Global) or 14416 (India).
                </p>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.85rem",
                    color: "var(--text-on-dark-muted)",
                  }}
                >
                  Free. Confidential. 24/7. Trained humans on the other end.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <section style={{ padding: "100px 0" }}>
          <div className="container-narrow">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={stagger}
              style={{ textAlign: "center" }}
            >
              <motion.span variants={reveal} className="section-label">
                The work behind this site
              </motion.span>
              <motion.h2
                variants={reveal}
                className="h2"
                style={{
                  color: "var(--text-primary)",
                  marginTop: "12px",
                  marginBottom: "24px",
                }}
              >
                Every skill here came from
                <br />
                <em style={{ fontStyle: "italic", color: "var(--sage-dark)", display: "inline-block" }}>
                  <RoughNotation type="underline" color="var(--sage-dark)" strokeWidth={2} padding={1} viewportDelay={750}>
                    Marsha Linehan.
                  </RoughNotation>
                </em>
              </motion.h2>
              <motion.p
                variants={reveal}
                className="body-lg"
                style={{
                  color: "var(--text-secondary)",
                  marginBottom: "20px",
                  maxWidth: "620px",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                Marsha Linehan developed Dialectical Behavior Therapy in the 1980s and 90s, drawing
                on cognitive behavioral therapy, mindfulness practice, and her own lived experience
                with intense emotional suffering.
              </motion.p>
              <motion.p
                variants={reveal}
                className="body-md"
                style={{
                  color: "var(--text-secondary)",
                  maxWidth: "620px",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                DBT is the first treatment that consistently showed BPD was not a life sentence:
                that the suffering could lessen, that relationships could stabilize, that a life
                worth living was reachable. Anchorleaf would not exist without her. The acronyms,
                the four-pillar structure, the philosophy of dialectics; none of it is ours. We
                just made it a little easier to read.
              </motion.p>
              <motion.div
                variants={reveal}
                style={{
                  marginTop: "40px",
                  padding: "24px 28px",
                  background: "var(--warm-white)",
                  border: "1px solid var(--border)",
                  borderLeft: "4px solid var(--sage)",
                  borderRadius: "var(--radius-md)",
                  textAlign: "left",
                  maxWidth: "560px",
                  margin: "40px auto 0",
                }}
              >
                <p
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontStyle: "italic",
                    fontSize: "1.15rem",
                    lineHeight: 1.5,
                    color: "var(--text-primary)",
                    marginBottom: "10px",
                  }}
                >
                  &ldquo;The patient must build a life worth living, while simultaneously accepting
                  life as it is.&rdquo;
                </p>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.85rem",
                    color: "var(--text-muted)",
                  }}
                >
                  - Marsha M. Linehan
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section
          style={{
            background: "linear-gradient(180deg, var(--cream) 0%, #f0f7ec 100%)",
            padding: "100px 0",
          }}
        >
          <div className="container">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={stagger}
              style={{ textAlign: "center", maxWidth: "640px", margin: "0 auto 48px" }}
            >
              <motion.span variants={reveal} className="section-label">
                If you want to help
              </motion.span>
              <motion.h2
                variants={reveal}
                className="h2"
                style={{
                  color: "var(--text-primary)",
                  marginTop: "12px",
                  marginBottom: "16px",
                }}
              >
                Three ways you can make this <RoughNotation type="circle" color="#e8c87a" strokeWidth={2.5} padding={8} viewportDelay={750}>better.</RoughNotation>
              </motion.h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={stagger}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "20px",
              }}
              className="involve-grid"
            >
              {[
                {
                  title: "Share it",
                  body:
                    "If a skill here helped, send the link to someone else who might need it. That's how this reaches the people we'll never meet.",
                },
                {
                  title: "Tell us what's missing",
                  body:
                    "Found a skill explained badly, a tone that felt off, a moment where the site didn't meet you? We want to know. Quietly, no forms, just an email.",
                },
                {
                  title: "Donate to the source",
                  body:
                    "The actual research and clinical training comes from organizations like Behavioral Tech, 988, and NIMHANS (India). Anchorleaf doesn't take donations; they do.",
                },
              ].map((c, i) => (
                <motion.div
                  key={c.title}
                  variants={reveal}
                  style={{
                    background: "var(--warm-white)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-lg)",
                    padding: "28px 24px",
                    boxShadow: "var(--shadow-sm)",
                    transition: "transform 0.25s ease, box-shadow 0.25s ease",
                  }}
                  whileHover={{ y: -4, boxShadow: "var(--shadow-md)" }}
                >
                  <span
                    style={{
                      fontFamily: "'Caveat', cursive",
                      fontSize: "1.05rem",
                      color: "var(--sage-dark)",
                      display: "block",
                      marginBottom: "6px",
                    }}
                  >
                    {`0${i + 1}`}
                  </span>
                  <h3
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "1.35rem",
                      fontWeight: 700,
                      color: "var(--text-primary)",
                      letterSpacing: "-0.02em",
                      marginBottom: "10px",
                    }}
                  >
                    {renderInvolveTitle(c.title)}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.94rem",
                      lineHeight: 1.6,
                      color: "var(--text-secondary)",
                    }}
                  >
                    {c.body}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section style={{ padding: "80px 0 100px" }}>
          <div className="container-narrow">
            <div style={{
              padding: "32px 40px",
              background: "linear-gradient(135deg, rgba(92,138,94,0.06) 0%, rgba(232,200,122,0.08) 100%)",
              border: "1px solid rgba(92,138,94,0.18)",
              borderRadius: "var(--radius-xl)",
              textAlign: "center",
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
                maxWidth: "520px",
                marginLeft: "auto",
                marginRight: "auto",
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

        <style>{`
          @media (max-width: 880px) {
            .about-mission-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
            .principles-grid { grid-template-columns: 1fr !important; }
            .involve-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
    </main>
  );
}
