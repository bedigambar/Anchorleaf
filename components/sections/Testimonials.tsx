"use client";
import { motion } from "framer-motion";
import StoryCard from "@/components/ui/StoryCard";

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } };
const reveal  = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const } } };

const stories: { quote: string; meta: string; tags: string[]; theme: "relationships" | "mindfulness" | "growth" | "healing" }[] = [
  {
    quote: "I didn't know I had BPD until I found content that actually described what I live with. For the first time I felt seen.",
    meta: "Common theme · Relationships & Splitting",
    tags: ["#Splitting", "#Relationships"],
    theme: "relationships",
  },
  {
    quote: "DEAR MAN changed how I communicate with everyone I love. I still mess up, but I know how to repair now.",
    meta: "Common theme · Interpersonal Effectiveness",
    tags: ["#Interpersonal", "#Progress"],
    theme: "mindfulness",
  },
  {
    quote: "The S.T.O.P. skill is the only thing that's ever helped me pause before I say something I can't take back.",
    meta: "Common theme · Distress Tolerance",
    tags: ["#DistressTolerance", "#Impulse"],
    theme: "growth",
  },
  {
    quote: "Radical Acceptance. I hated the idea. Then I had to survive my divorce. Now I understand it deeply.",
    meta: "Common theme · Radical Acceptance",
    tags: ["#RadicalAcceptance", "#Healing"],
    theme: "healing",
  },
  {
    quote: "I used to think DBT was just worksheets. Turns out it's a whole new way of relating to yourself.",
    meta: "Common theme · Mindfulness & Growth",
    tags: ["#Mindfulness", "#Growth"],
    theme: "growth",
  },
];

const marqueeStories = [...stories, ...stories];

export default function Testimonials() {
  return (
    <section style={{ background: "var(--cream)", overflow: "hidden" }} className="section">
      <div className="container">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          style={{ marginBottom: "48px" }}
        >
          <motion.div variants={reveal}>
            <span className="section-label">What people often share</span>
          </motion.div>
          <motion.h2 variants={reveal} className="h2" style={{ color: "var(--text-primary)", marginBottom: 0 }}>
            You&apos;re in good company.
          </motion.h2>
          <motion.p variants={reveal} className="body-md" style={{ color: "var(--text-secondary)", maxWidth: "540px", marginTop: "12px", lineHeight: 1.6 }}>
            Common themes from the DBT community — composite examples, not individual testimonials.
          </motion.p>
        </motion.div>
      </div>

      <div style={{ overflow: "hidden", position: "relative", paddingBottom: "24px", width: "100%" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "120px", background: "linear-gradient(to right, var(--cream), transparent)", zIndex: 2, pointerEvents: "none" }} />
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "120px", background: "linear-gradient(to left, var(--cream), transparent)", zIndex: 2, pointerEvents: "none" }} />

        <div className="marquee-wrapper">
          <div className="marquee-content">
            {marqueeStories.map((s, i) => (
              <StoryCard
                key={i}
                quote={s.quote}
                meta={s.meta}
                tags={s.tags}
                theme={s.theme}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .no-scroll::-webkit-scrollbar { display: none; }
        
        .marquee-wrapper {
          overflow: hidden;
          width: 100%;
        }
        .marquee-content {
          display: flex;
          gap: 24px;
          width: max-content;
          animation: marquee-scroll 45s linear infinite;
          will-change: transform;
        }
        .marquee-content:hover {
          animation-play-state: paused;
        }
        @keyframes marquee-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-2020px);
          }
        }
        
        .story-card.theme-mindfulness {
          padding: 24px 28px !important;
          border: 1.5px solid rgba(92, 138, 94, 0.28) !important;
          background: rgba(255, 255, 255, 0.75) !important;
          box-shadow: 0 8px 24px rgba(92, 138, 94, 0.04) !important;
        }
        .story-card.theme-relationships {
          padding: 24px 28px !important;
          border: 1.5px solid rgba(90, 138, 176, 0.28) !important;
          background: rgba(255, 255, 255, 0.75) !important;
          box-shadow: 0 8px 24px rgba(90, 138, 176, 0.04) !important;
        }
        .story-card.theme-healing {
          padding: 24px 28px !important;
          border: 1.5px solid rgba(200, 122, 90, 0.28) !important;
          background: rgba(255, 255, 255, 0.75) !important;
          box-shadow: 0 8px 24px rgba(200, 122, 90, 0.04) !important;
        }
        .story-card.theme-growth {
          padding: 24px 28px !important;
          border: 1.5px solid rgba(122, 110, 184, 0.28) !important;
          background: rgba(255, 255, 255, 0.75) !important;
          box-shadow: 0 8px 24px rgba(122, 110, 184, 0.04) !important;
        }
      `}</style>
    </section>
  );
}
