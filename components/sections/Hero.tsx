"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { hasSeenHero, markHeroSeen } from "@/lib/storage";
import {
  ArrowRight,
  ChevronDown,
  Brain,
  Heart,
  Sparkles,
  Search,
  Send,
  Hand,
  Flame,
  CloudRain,
  MessageSquare,
  Wifi,
  Battery,
  Signal
} from "lucide-react";

const heroContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};
const heroItem = (delay: number) => ({
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] as const } },
});

export default function Hero() {
  const [sliderValue, setSliderValue] = useState(30);
  const isWiseMind = sliderValue >= 45 && sliderValue <= 55;
  const [activeSkill, setActiveSkill] = useState<"STOP" | "DEAR" | "TIPP" | "RAIN" | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [skipIntro, setSkipIntro] = useState(false);
  useEffect(() => {
    if (hasSeenHero()) setSkipIntro(true);
    markHeroSeen();
  }, []);

  const handleSearch = (query: string) => {
    const q = query.toLowerCase().trim();
    if (q.includes("stop")) {
      setActiveSkill("STOP");
      setInputValue("STOP Skill");
    } else if (q.includes("dear") || q.includes("man")) {
      setActiveSkill("DEAR");
      setInputValue("DEAR MAN");
    } else if (q.includes("tipp") || q.includes("temp")) {
      setActiveSkill("TIPP");
      setInputValue("TIPP Skill");
    } else if (q.includes("rain")) {
      setActiveSkill("RAIN");
      setInputValue("RAIN Skill");
    } else {
      setActiveSkill(null);
      setInputValue("");
    }
  };

  return (
    <section className="hero-section" style={{
      position: "relative",
      minHeight: "100vh",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "140px 24px 100px 24px"
    }}>
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}
      >
        <source src="/background1.mp4" type="video/mp4" />
      </video>

      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(15,15,25,0.65) 0%, rgba(15,15,25,0.35) 50%, #fdf8f3 100%)", zIndex: 1 }} />

      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.45) 100%)", zIndex: 2 }} />

      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.04, pointerEvents: "none", zIndex: 3 }} xmlns="http://www.w3.org/2000/svg">
        <filter id="hero-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#hero-noise)" />
      </svg>

      <div
        className="hero-grid"
        style={{
          position: "relative",
          zIndex: 10,
          display: "grid",
          gridTemplateColumns: "1.1fr 0.9fr",
          gap: "60px",
          alignItems: "center",
          width: "100%",
          maxWidth: "1200px",
          padding: "0 24px",
        }}
      >
        <motion.div
          variants={heroContainer}
          initial={skipIntro ? "visible" : "hidden"}
          animate="visible"
          className="hero-text-col"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            textAlign: "left",
          }}
        >
          <motion.div variants={heroItem(0.3)} style={{ marginBottom: "28px", display: "flex" }}>
            <div style={{
              background: "rgba(255,255,255,0.12)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "9999px",
              padding: "8px 20px",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
            }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(254,250,245,0.9)" }}>
                DBT · Emotional Wellness · You Are Not Alone
              </span>
            </div>
          </motion.div>

          <motion.h1
            variants={heroItem(0.55)}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(3.2rem, 5.5vw, 5.2rem)",
              fontWeight: 300,
              letterSpacing: "-0.04em",
              color: "#fefaf5",
              lineHeight: 1.05,
              marginBottom: "28px",
              textAlign: "left",
            }}
          >
            Your emotions
            <br />
            have meaning.
          </motion.h1>

          <motion.p
            variants={heroItem(0.95)}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
              color: "rgba(255,248,240,0.85)",
              lineHeight: 1.65,
              marginBottom: "40px",
              maxWidth: "480px",
            }}
          >
            Learn about BPD, understand your emotions, and discover evidence-based DBT skills. Anchorleaf helps you find steadiness, one day at a time.
          </motion.p>

          <motion.div
            variants={heroItem(1.15)}
            className="hero-cta-group"
            style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}
          >
            <Link href="/dbt" className="btn-primary">
              Begin Your Journey <ArrowRight size={16} strokeWidth={1.5} />
            </Link>
            <Link href="/learn" className="btn-ghost">
              What is DBT?
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          variants={heroItem(1.15)}
          className="hero-visual-col"
          style={{
            position: "relative",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <motion.div
            className="floating-pill float-left-1"
            style={{
              position: "absolute",
              left: "-47px",
              top: "40px",
              zIndex: 12,
              background: "rgba(255, 255, 255, 0.08)",
              backdropFilter: "blur(16px)",
              border: activeSkill === "STOP" ? "1.5px solid var(--peach)" : "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "9999px",
              padding: "10px 18px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: activeSkill === "STOP" ? "0 10px 25px rgba(200, 122, 90, 0.25)" : "0 10px 25px rgba(0,0,0,0.15)",
              cursor: "pointer",
            }}
            onClick={() => { setActiveSkill("STOP"); setInputValue("STOP Skill"); }}
            whileHover={{ y: -6, scale: 1.04, background: "rgba(255, 255, 255, 0.15)", borderColor: "rgba(255, 255, 255, 0.3)" }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "24px", height: "24px", borderRadius: "50%", background: "rgba(200, 122, 90, 0.2)", color: "var(--peach)" }}>
              <Hand size={14} />
            </div>
            <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#fefaf5" }}>STOP Skill</span>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#5c8a5e", marginLeft: "4px" }} />
          </motion.div>

          <motion.div
            className="floating-pill float-left-2"
            style={{
              position: "absolute",
              left: "-35px",
              bottom: "80px",
              zIndex: 12,
              background: "rgba(255, 255, 255, 0.08)",
              backdropFilter: "blur(16px)",
              border: activeSkill === "DEAR" ? "1.5px solid #b0c8e8" : "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "9999px",
              padding: "10px 18px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: activeSkill === "DEAR" ? "0 10px 25px rgba(90, 138, 176, 0.25)" : "0 10px 25px rgba(0,0,0,0.15)",
              cursor: "pointer",
            }}
            onClick={() => { setActiveSkill("DEAR"); setInputValue("DEAR MAN"); }}
            whileHover={{ y: -6, scale: 1.04, background: "rgba(255, 255, 255, 0.15)", borderColor: "rgba(255, 255, 255, 0.3)" }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "24px", height: "24px", borderRadius: "50%", background: "rgba(90, 138, 176, 0.2)", color: "#b0c8e8" }}>
              <MessageSquare size={14} />
            </div>
            <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#fefaf5" }}>DEAR MAN</span>
          </motion.div>

          <motion.div
            className="floating-pill float-right-1"
            style={{
              position: "absolute",
              right: "-20px",
              top: "80px",
              zIndex: 12,
              background: "rgba(255, 255, 255, 0.08)",
              backdropFilter: "blur(16px)",
              border: activeSkill === "TIPP" ? "1.5px solid var(--gold)" : "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "9999px",
              padding: "10px 18px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: activeSkill === "TIPP" ? "0 10px 25px rgba(232, 200, 122, 0.25)" : "0 10px 25px rgba(0,0,0,0.15)",
              cursor: "pointer",
            }}
            onClick={() => { setActiveSkill("TIPP"); setInputValue("TIPP Skill"); }}
            whileHover={{ y: -6, scale: 1.04, background: "rgba(255, 255, 255, 0.15)", borderColor: "rgba(255, 255, 255, 0.3)" }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "24px", height: "24px", borderRadius: "50%", background: "rgba(232, 200, 122, 0.2)", color: "var(--gold)" }}>
              <Flame size={14} />
            </div>
            <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#fefaf5" }}>TIPP Skill</span>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#5c8a5e", marginLeft: "4px" }} />
          </motion.div>

          <motion.div
            className="floating-pill float-right-2"
            style={{
              position: "absolute",
              right: "-25px",
              bottom: "120px",
              zIndex: 12,
              background: "rgba(255, 255, 255, 0.08)",
              backdropFilter: "blur(16px)",
              border: activeSkill === "RAIN" ? "1.5px solid var(--sage-light)" : "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "9999px",
              padding: "10px 18px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: activeSkill === "RAIN" ? "0 10px 25px rgba(92, 138, 94, 0.25)" : "0 10px 25px rgba(0,0,0,0.15)",
              cursor: "pointer",
            }}
            onClick={() => { setActiveSkill("RAIN"); setInputValue("RAIN Skill"); }}
            whileHover={{ y: -6, scale: 1.04, background: "rgba(255, 255, 255, 0.15)", borderColor: "rgba(255, 255, 255, 0.3)" }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "24px", height: "24px", borderRadius: "50%", background: "rgba(92, 138, 94, 0.2)", color: "var(--sage-light)" }}>
              <CloudRain size={14} />
            </div>
            <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#fefaf5" }}>RAIN Skill</span>
          </motion.div>

          <div
            style={{
              position: "absolute",
              inset: "-4px",
              borderRadius: "48px",
              background: "radial-gradient(circle, rgba(92, 138, 94, 0.45) 0%, rgba(92, 138, 94, 0) 70%)",
              filter: "blur(24px)",
              opacity: isWiseMind ? 1 : 0,
              transition: "opacity 0.5s ease-in-out",
              zIndex: 8,
              pointerEvents: "none",
            }}
          />

          <div
            className="phone-mockup"
            style={{
              width: "320px",
              height: "480px",
              borderRadius: "44px",
              background: "rgba(255, 255, 255, 0.06)",
              backdropFilter: "blur(24px)",
              border: `1.5px solid ${isWiseMind ? "rgba(92, 138, 94, 0.6)" : "rgba(255, 255, 255, 0.15)"}`,
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 30px 60px rgba(0,0,0,0.4)",
              position: "relative",
              zIndex: 10,
              overflow: "hidden",
              transition: "border-color 0.4s ease-in-out",
            }}
          >
            <div style={{
              position: "absolute",
              top: "-50%",
              left: "-50%",
              width: "200%",
              height: "200%",
              background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%)",
              pointerEvents: "none",
              zIndex: 5,
            }} />

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "#fefaf5", fontSize: "0.75rem", marginBottom: "18px", zIndex: 6 }}>
              <span style={{ fontWeight: 600, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", fontSize: "0.72rem", opacity: 0.9 }}>10:42</span>
              <div style={{ display: "flex", gap: "6px", alignItems: "center", color: "#fefaf5" }}>
                <svg width="17" height="11" viewBox="0 0 17 11" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.9 }}>
                  <rect x="0" y="7" width="2.8" height="4" rx="0.8" fill="currentColor" />
                  <rect x="4.2" y="5" width="2.8" height="6" rx="0.8" fill="currentColor" />
                  <rect x="8.4" y="3" width="2.8" height="8" rx="0.8" fill="currentColor" />
                  <rect x="12.6" y="0.5" width="2.8" height="10.5" rx="0.8" fill="currentColor" />
                </svg>

                <svg width="15" height="11" viewBox="0 0 16 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.9 }}>
                  <path fillRule="evenodd" clipRule="evenodd" d="M8 12a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm-3.136-4.52a4.5 4.5 0 016.272 0l1.06-1.06a6 6 0 00-8.393 0l1.06 1.06zm-2.12-2.121a7.5 7.5 0 0110.513 0l1.06-1.06a9 9 0 00-12.634 0l1.06 1.06z" />
                </svg>

                <svg width="22" height="11" viewBox="0 0 25 12" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.9 }}>
                  <rect x="0.5" y="0.5" width="20" height="11" rx="3" stroke="currentColor" strokeWidth="1" />
                  <path d="M22 4C22.3 4.2 22.5 4.5 22.5 5V7C22.5 7.5 22.3 7.8 22 8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                  <rect x="2.5" y="2.5" width="16" height="7" rx="1.2" fill="currentColor" />
                </svg>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {activeSkill === null ? (
                <motion.div
                  key="balance-screen"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25 }}
                  style={{ display: "flex", flexDirection: "column", flex: 1 }}
                >
                  <div style={{ textAlign: "center", marginBottom: "20px", zIndex: 6 }}>
                    <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(254, 250, 245, 0.5)" }}>
                      Anchorleaf Wellness
                    </span>
                    <h3 style={{ fontSize: "1.25rem", color: "#fefaf5", fontFamily: "'Playfair Display', serif", fontWeight: 400, marginTop: "4px" }}>
                      Wise Mind Balance
                    </h3>
                  </div>

                  <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", position: "relative", zIndex: 6, marginBottom: "20px" }}>
                    <div style={{ position: "relative", width: "120px", height: "120px" }}>
                      <div style={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(90, 138, 176, 0.75) 0%, rgba(40, 80, 120, 0.2) 60%, transparent 100%)",
                        filter: "blur(4px)",
                        opacity: (!isWiseMind && sliderValue < 45) ? 1 : 0,
                        transition: "opacity 0.4s ease-in-out",
                      }} />

                      <div style={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(200, 122, 90, 0.75) 0%, rgba(130, 70, 50, 0.2) 60%, transparent 100%)",
                        filter: "blur(4px)",
                        opacity: (!isWiseMind && sliderValue > 55) ? 1 : 0,
                        transition: "opacity 0.4s ease-in-out",
                      }} />

                      <motion.div
                        animate={isWiseMind ? { scale: [1, 1.05, 1] } : { scale: 1 }}
                        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                        style={{
                          position: "absolute",
                          inset: 0,
                          borderRadius: "50%",
                          background: "radial-gradient(circle, rgba(92, 138, 94, 0.85) 0%, rgba(50, 100, 60, 0.3) 60%, transparent 100%)",
                          filter: "blur(4px)",
                          opacity: isWiseMind ? 1 : 0,
                          transition: "opacity 0.4s ease-in-out",
                        }}
                      />

                      <div style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "#fefaf5",
                        zIndex: 5,
                      }}>
                        <div style={{ position: "relative", width: "28px", height: "28px" }}>
                          <div style={{
                            position: "absolute",
                            inset: 0,
                            opacity: (!isWiseMind && sliderValue < 45) ? 1 : 0,
                            transition: "opacity 0.3s ease-in-out",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}>
                            <Brain size={28} style={{ color: "#b0c8e8" }} />
                          </div>

                          <div style={{
                            position: "absolute",
                            inset: 0,
                            opacity: (!isWiseMind && sliderValue > 55) ? 1 : 0,
                            transition: "opacity 0.3s ease-in-out",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}>
                            <Heart size={28} style={{ color: "var(--peach)" }} />
                          </div>

                          <div style={{
                            position: "absolute",
                            inset: 0,
                            opacity: isWiseMind ? 1 : 0,
                            transition: "opacity 0.3s ease-in-out",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}>
                            <Sparkles size={28} style={{ color: "var(--sage-light)", filter: "drop-shadow(0 0 8px rgba(255,255,255,0.6))" }} />
                          </div>
                        </div>
                      </div>
                    </div>

                    <svg style={{ position: "absolute", width: "160px", height: "160px", opacity: 0.3 }} viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="3 3" />
                      <circle cx="50" cy="50" r="35" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
                    </svg>
                  </div>

                  <div style={{ background: "rgba(255, 255, 255, 0.05)", borderRadius: "20px", padding: "14px 14px 44px", border: "1px solid rgba(255, 255, 255, 0.08)", zIndex: 6, marginBottom: "16px", position: "relative" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "rgba(255,255,255,0.6)", marginBottom: "8px" }}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", color: sliderValue < 45 ? "#b0c8e8" : "inherit", transition: "color 0.3s" }}>
                        <Brain size={12} /> Rational ({100 - sliderValue}%)
                      </span>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", color: sliderValue > 55 ? "var(--peach)" : "inherit", transition: "color 0.3s" }}>
                        Emotional ({sliderValue}%) <Heart size={12} />
                      </span>
                    </div>

                    <input
                      type="range"
                      min="10"
                      max="90"
                      value={sliderValue}
                      onChange={(e) => setSliderValue(parseInt(e.target.value))}
                      style={{
                        width: "100%",
                        height: "6px",
                        borderRadius: "9999px",
                        background: "rgba(255,255,255,0.2)",
                        outline: "none",
                        cursor: "pointer",
                        appearance: "none",
                        WebkitAppearance: "none",
                        marginBottom: "10px",
                      }}
                      className="custom-range-slider"
                    />

                    <div style={{ position: "absolute", bottom: "12px", left: "14px", right: "14px", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <AnimatePresence mode="wait">
                        {isWiseMind ? (
                          <motion.span
                            key="wise"
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}
                          >
                            <span style={{ fontSize: "0.72rem", color: "var(--sage-light)", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" }}>✨ Wise Mind</span>
                            <span style={{ fontSize: "0.62rem", color: "var(--sage-light)", fontWeight: 400, opacity: 0.75, letterSpacing: "0.01em" }}>An integrated state, not 50/50</span>
                          </motion.span>
                        ) : (
                          <motion.span
                            key="unbalanced"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.6 }}
                            exit={{ opacity: 0 }}
                            style={{ fontSize: "0.72rem", color: "#fefaf5" }}
                          >
                            Move toward the integrated space
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={`skill-screen-${activeSkill}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  style={{ display: "flex", flexDirection: "column", flex: 1, zIndex: 6 }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                    <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(254, 250, 245, 0.85)" }}>
                      DBT SKILL SHEET
                    </span>
                    <span style={{ fontSize: "0.65rem", fontWeight: 600, color: "var(--sage-light)", background: "rgba(92, 138, 94, 0.15)", padding: "2px 8px", borderRadius: "9999px" }}>
                      Active
                    </span>
                  </div>

                  {activeSkill === "STOP" && (
                    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                      <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.25rem", color: "var(--peach)", marginBottom: "4px" }}>STOP Skill</h4>
                      <p style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.6)", marginBottom: "12px", fontStyle: "italic" }}>
                        Distress Tolerance Module
                      </p>
                      <div style={{ display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}>
                        <div style={{ background: "rgba(255,255,255,0.04)", padding: "6px 10px", borderRadius: "8px", borderLeft: "3px solid var(--peach)" }}>
                          <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--peach)" }}>S - STOP:</span>
                          <span style={{ fontSize: "0.7rem", color: "#fefaf5", marginLeft: "4px" }}>Do not react immediately. Pause.</span>
                        </div>
                        <div style={{ background: "rgba(255,255,255,0.04)", padding: "6px 10px", borderRadius: "8px", borderLeft: "3px solid #b0c8e8" }}>
                          <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#b0c8e8" }}>T - TAKE A STEP BACK:</span>
                          <span style={{ fontSize: "0.7rem", color: "#fefaf5", marginLeft: "4px" }}>Take a breath. Regain control.</span>
                        </div>
                        <div style={{ background: "rgba(255,255,255,0.04)", padding: "6px 10px", borderRadius: "8px", borderLeft: "3px solid var(--gold)" }}>
                          <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--gold)" }}>O - OBSERVE:</span>
                          <span style={{ fontSize: "0.7rem", color: "#fefaf5", marginLeft: "4px" }}>Gather facts mindfully.</span>
                        </div>
                        <div style={{ background: "rgba(255,255,255,0.04)", padding: "6px 10px", borderRadius: "8px", borderLeft: "3px solid var(--sage-light)" }}>
                          <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--sage-light)" }}>P - PROCEED:</span>
                          <span style={{ fontSize: "0.7rem", color: "#fefaf5", marginLeft: "4px" }}>Ask your Wise Mind what to do.</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeSkill === "DEAR" && (
                    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                      <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.25rem", color: "#b0c8e8", marginBottom: "4px" }}>DEAR MAN</h4>
                      <p style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.6)", marginBottom: "12px", fontStyle: "italic" }}>
                        Interpersonal Effectiveness
                      </p>
                      <div style={{ display: "flex", flexDirection: "column", gap: "6px", flex: 1 }}>
                        <div style={{ fontSize: "0.7rem", color: "#fefaf5", padding: "6px 10px", background: "rgba(255,255,255,0.04)", borderRadius: "8px", borderLeft: "3px solid #b0c8e8" }}>
                          <strong style={{ color: "#b0c8e8" }}>Describe</strong> facts  <strong style={{ color: "#b0c8e8" }}>Express</strong> feelings
                        </div>
                        <div style={{ fontSize: "0.7rem", color: "#fefaf5", padding: "6px 10px", background: "rgba(255,255,255,0.04)", borderRadius: "8px", borderLeft: "3px solid var(--gold)" }}>
                          <strong style={{ color: "var(--gold)" }}>Assert</strong> needs  <strong style={{ color: "var(--gold)" }}>Reinforce</strong> outcomes
                        </div>
                        <div style={{ fontSize: "0.7rem", color: "#fefaf5", padding: "6px 10px", background: "rgba(255,255,255,0.04)", borderRadius: "8px", borderLeft: "3px solid var(--sage-light)" }}>
                          <strong style={{ color: "var(--sage-light)" }}>Mindful</strong> presence  <strong style={{ color: "var(--sage-light)" }}>Appear</strong> confident
                        </div>
                        <div style={{ fontSize: "0.7rem", color: "#fefaf5", padding: "6px 10px", background: "rgba(255,255,255,0.04)", borderRadius: "8px", borderLeft: "3px solid var(--peach)" }}>
                          <strong style={{ color: "var(--peach)" }}>Negotiate</strong> solutions fairly
                        </div>
                      </div>
                    </div>
                  )}

                  {activeSkill === "TIPP" && (
                    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                      <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.25rem", color: "var(--gold)", marginBottom: "4px" }}>TIPP Skill</h4>
                      <p style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.6)", marginBottom: "12px", fontStyle: "italic" }}>
                        Distress Tolerance Module
                      </p>
                      <div style={{ display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}>
                        <div style={{ background: "rgba(255,255,255,0.04)", padding: "6px 10px", borderRadius: "8px", borderLeft: "3px solid var(--gold)" }}>
                          <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--gold)" }}>T - TEMPERATURE:</span>
                          <span style={{ fontSize: "0.7rem", color: "#fefaf5", marginLeft: "4px" }}>Splash ice-cold water on face.</span>
                        </div>
                        <div style={{ background: "rgba(255,255,255,0.04)", padding: "6px 10px", borderRadius: "8px", borderLeft: "3px solid var(--peach)" }}>
                          <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--peach)" }}>I - INTENSE EXERCISE:</span>
                          <span style={{ fontSize: "0.7rem", color: "#fefaf5", marginLeft: "4px" }}>Vent chemical distress rapidly.</span>
                        </div>
                        <div style={{ background: "rgba(255,255,255,0.04)", padding: "6px 10px", borderRadius: "8px", borderLeft: "3px solid #b0c8e8" }}>
                          <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#b0c8e8" }}>P - PACED BREATHING:</span>
                          <span style={{ fontSize: "0.7rem", color: "#fefaf5", marginLeft: "4px" }}>Breathe out longer than you breathe in.</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeSkill === "RAIN" && (
                    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                      <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.25rem", color: "var(--sage-light)", marginBottom: "4px" }}>RAIN Skill</h4>
                      <p style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.6)", marginBottom: "12px", fontStyle: "italic" }}>
                        Mindfulness Module
                      </p>
                      <div style={{ display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}>
                        <div style={{ background: "rgba(255,255,255,0.04)", padding: "6px 10px", borderRadius: "8px", borderLeft: "3px solid var(--sage-light)" }}>
                          <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--sage-light)" }}>R - RECOGNIZE:</span>
                          <span style={{ fontSize: "0.7rem", color: "#fefaf5", marginLeft: "4px" }}>Acknowledge raw emotion present.</span>
                        </div>
                        <div style={{ background: "rgba(255,255,255,0.04)", padding: "6px 10px", borderRadius: "8px", borderLeft: "3px solid var(--gold)" }}>
                          <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--gold)" }}>A - ALLOW:</span>
                          <span style={{ fontSize: "0.7rem", color: "#fefaf5", marginLeft: "4px" }}>Let the emotion be as it is.</span>
                        </div>
                        <div style={{ background: "rgba(255,255,255,0.04)", padding: "6px 10px", borderRadius: "8px", borderLeft: "3px solid var(--peach)" }}>
                          <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--peach)" }}>I - INVESTIGATE:</span>
                          <span style={{ fontSize: "0.7rem", color: "#fefaf5", marginLeft: "4px" }}>Observe with compassionate curiosity.</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => { setActiveSkill(null); setInputValue(""); }}
                    style={{
                      background: "rgba(255, 255, 255, 0.08)",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      borderRadius: "9999px",
                      padding: "8px 16px",
                      color: "#fefaf5",
                      fontSize: "0.75rem",
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                      marginTop: "auto",
                      transition: "all 0.2s",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                    onMouseOver={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = "rgba(255, 255, 255, 0.15)";
                    }}
                    onMouseOut={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = "rgba(255, 255, 255, 0.08)";
                    }}
                  >
                    ? Back to Balance Slider
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch(inputValue);
              }}
              style={{
                background: "rgba(255, 255, 255, 0.12)",
                border: "1px solid rgba(255, 255, 255, 0.18)",
                borderRadius: "9999px",
                padding: "6px 6px 6px 14px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                zIndex: 6,
                marginTop: "16px"
              }}
            >
              <Search size={14} style={{ color: "rgba(255,255,255,0.5)" }} />
              <input
                type="text"
                placeholder="Search DBT skills..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                style={{
                  background: "none",
                  border: "none",
                  outline: "none",
                  color: "#fefaf5",
                  fontSize: "0.8rem",
                  width: "100%",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              />
              <button
                type="submit"
                style={{
                  background: inputValue.trim() !== "" ? "var(--sage)" : "rgba(255,255,255,0.08)",
                  color: inputValue.trim() !== "" ? "#fefaf5" : "rgba(255,255,255,0.3)",
                  border: "none",
                  borderRadius: "50%",
                  width: "28px",
                  height: "28px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: inputValue.trim() !== "" ? "pointer" : "default",
                  transition: "all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)",
                  boxShadow: inputValue.trim() !== "" ? "0 4px 12px rgba(92, 138, 94, 0.3)" : "none",
                }}
                disabled={inputValue.trim() === ""}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="19" x2="12" y2="5"></line>
                  <polyline points="5 12 12 5 19 12"></polyline>
                </svg>
              </button>
            </form>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ opacity: { delay: 1.8, duration: 0.6 }, y: { delay: 2, duration: 1.6, repeat: Infinity, ease: "easeInOut" } }}
        style={{ position: "absolute", bottom: "30px", left: "50%", transform: "translateX(-50%)", zIndex: 10, color: "rgba(254,250,245,0.5)" }}
      >
        <ChevronDown size={28} strokeWidth={1.5} />
      </motion.div>

      <style>{`
        .custom-range-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #ffffff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
          cursor: pointer;
          transition: transform 0.1s;
        }
        .custom-range-slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
        }
        .custom-range-slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border: none;
          border-radius: 50%;
          background: #ffffff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
          cursor: pointer;
          transition: transform 0.1s;
        }
        .custom-range-slider::-moz-range-thumb:hover {
          transform: scale(1.2);
        }

        @media (max-width: 1023px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 50px !important;
            padding-top: 40px !important;
          }
          .hero-text-col {
            align-items: center !important;
            text-align: center !important;
          }
          .hero-text-col h1 {
            text-align: center !important;
          }
          .hero-text-col p {
            margin: 0 auto 40px !important;
            text-align: center !important;
          }
          .hero-cta-group {
            justify-content: center !important;
          }
          .floating-pill {
            display: none !important;
          }
          .phone-mockup {
            transform: scale(0.9);
            margin-top: 20px;
          }
        }

        @media (max-width: 640px) {
          .phone-mockup {
            transform: scale(0.8);
          }
        }

        @media (max-width: 768px) {
          .hero-text-col,
          .hero-text-col > * {
            align-items: center !important;
            text-align: center !important;
          }
          .hero-text-col h1,
          .hero-text-col p,
          .hero-text-col span {
            text-align: center !important;
            margin-left: auto !important;
            margin-right: auto !important;
          }
          .hero-cta-group {
            justify-content: center !important;
            flex-wrap: wrap !important;
          }
        }

        @media (max-width: 480px) {
          section.hero-section,
          .hero-grid {
            padding-left: 16px !important;
            padding-right: 16px !important;
          }
          .hero-text-col h1 {
            font-size: clamp(2.2rem, 9vw, 3rem) !important;
          }
        }
      `}</style>
    </section>
  );
}
