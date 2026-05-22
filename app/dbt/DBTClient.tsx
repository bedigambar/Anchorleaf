"use client";
import { useState } from "react";
import Link from "next/link";
import DBTHubHero from "@/components/dbt/DBTHubHero";
import DBTScrollIndicator from "@/components/dbt/DBTScrollIndicator";
import AcronymCard from "@/components/dbt/AcronymCard";
import SelfSootheCard from "@/components/dbt/SelfSootheCard";
import SkillFilterBar, { filterSkillMap } from "@/components/dbt/SkillFilterBar";
import DBTBottomCTA from "@/components/dbt/DBTBottomCTA";
import WaveAnimation from "@/components/dbt/WaveAnimation";
import { motion } from "framer-motion";
import { Wind, Waves, Sun, Users, ArrowRight } from "lucide-react";

const reveal = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } };

function PillarHeader({ num, title, sub, icon, href }: { num: string; title: string; sub: string; icon: React.ReactNode; href?: string }) {
  return (
    <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} style={{ marginBottom: "48px" }}>
      <motion.div variants={reveal} style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
        <span style={{ color: "var(--pillar-accent)", opacity: 0.9 }}>{icon}</span>
        <span className="pillar-eyebrow">{num}</span>
      </motion.div>
      <motion.h2 variants={reveal} className="pillar-h2" style={{ marginBottom: "16px" }}>{title}</motion.h2>
      <motion.p variants={reveal} className="body-lg" style={{ color: "var(--text-secondary)", maxWidth: "560px", marginBottom: "20px" }}>{sub}</motion.p>
      {href && (
        <motion.div variants={reveal}>
          <Link
            href={href}
            className="group"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.88rem",
              fontWeight: 600,
              backgroundColor: "var(--pillar-tint)",
              border: "1px solid var(--pillar-border)",
              color: "var(--pillar-accent-dark)",
              padding: "10px 22px",
              borderRadius: "30px",
              textDecoration: "none",
              boxShadow: "var(--shadow-sm)",
              transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--pillar-accent)";
              e.currentTarget.style.borderColor = "var(--pillar-accent)";
              e.currentTarget.style.color = "white";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "var(--shadow-md)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "var(--pillar-tint)";
              e.currentTarget.style.borderColor = "var(--pillar-border)";
              e.currentTarget.style.color = "var(--pillar-accent-dark)";
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "var(--shadow-sm)";
            }}
          >
            Explore dedicated deep-dive
            <ArrowRight
              size={15}
              style={{
                transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              className="group-hover:translate-x-[4px]"
            />
          </Link>
        </motion.div>
      )}
    </motion.div>
  );
}

function SectionDivider({ nextBg }: { nextBg: string }) {
  return (
    <div className="section-divider">
      <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,20 1440,30 L1440,60 L0,60 Z" fill={nextBg} />
      </svg>
    </div>
  );
}

function getCardClass(skillId: string, activeFilter: string | null) {
  if (!activeFilter) return "skill-card";
  const relevant = filterSkillMap[activeFilter] ?? [];
  return relevant.includes(skillId) ? "skill-card highlighted" : "skill-card dimmed";
}

export default function DBTClient() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  return (
    <>
      <DBTScrollIndicator />
      <main>
        <DBTHubHero />
        <SkillFilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} />

        <section id="mindfulness" className="pillar-mindfulness section" style={{ background: "var(--pillar-bg)" }}>
          <div className="container">
            <PillarHeader
              num="Pillar 01"
              title="Mindfulness"
              sub="The foundation of all DBT skills. Being fully present, not judging, not reacting, just noticing."
              icon={<Wind size={40} strokeWidth={1.5} />}
              href="/dbt/mindfulness"
            />

            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}
              style={{ marginBottom: "20px" }} className="acronym-grid">
              <motion.div variants={reveal} className={getCardClass("mindfulness-what", activeFilter)}>
                <AcronymCard
                  title='"WHAT" Skills'
                  subtitle="What you DO in mindfulness practice"
                  pillar="mindfulness"
                  items={[
                    { letter: "Ob", word: "Observe", description: "Notice the present moment without words. Watch your experience like clouds passing." },
                    { letter: "De", word: "Describe", description: "Attach words to your experience. Label emotions and thoughts without judgment." },
                    { letter: "Pa", word: "Participate", description: "Give your full attention to the current moment. Throw yourself in completely." },
                  ]}
                />
              </motion.div>
              <motion.div variants={reveal} className={getCardClass("mindfulness-how", activeFilter)}>
                <AcronymCard
                  title='"HOW" Skills'
                  subtitle="How you practice mindfulness"
                  pillar="mindfulness"
                  items={[
                    { letter: "NJ", word: "Non-Judgmental", description: "Notice your experience without labeling it good or bad. Just what it is." },
                    { letter: "OM", word: "One-Mindful", description: "Focus on one thing at a time. Avoid multitasking. Be where you are." },
                    { letter: "BE", word: "Be Effective", description: "Focus on what works. Keep your values in mind, not your pride." },
                  ]}
                />
              </motion.div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "12px", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600 }}>Core Practices</p>
              <div className="chip-scroll">
                {["Focusing on the present moment", "Observing without judgement", "Relaxing", "Noticing signs of distressing emotions"].map(chip => (
                  <span key={chip} className="chip-pill">{chip}</span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <SectionDivider nextBg="#fff8f5" />

        <section id="distress-tolerance" className="pillar-distress section" style={{ background: "var(--pillar-bg)" }}>
          <div className="container">
            <PillarHeader
              num="Pillar 02"
              title="Distress Tolerance"
              sub="For the moments when the pain is unbearable. These skills help you survive a crisis without making it worse."
              icon={<Waves size={40} strokeWidth={1.5} />}
              href="/dbt/distress-tolerance"
            />

            <div className="acronym-grid" style={{ marginBottom: "20px" }}>
              <div className={getCardClass("stop", activeFilter)}>
                <AcronymCard title="S.T.O.P." skillId="stop" subtitle="When everything feels out of control: stop." pillar="distress"
                  items={[
                    { letter: "S", word: "Stop", description: "Don't act on impulse. Freeze exactly where you are." },
                    { letter: "T", word: "Take a step back", description: "Breathe. Create distance from the urge." },
                    { letter: "O", word: "Observe", description: "What is happening inside and outside you right now?" },
                    { letter: "P", word: "Proceed Mindfully", description: "Act from Wise Mind. Not from the wave." },
                  ]}
                />
              </div>
              <div className={getCardClass("tipp", activeFilter)}>
                <AcronymCard title="T.I.P.P." skillId="tipp" subtitle="Change your body chemistry fast." pillar="distress"
                  items={[
                    { letter: "T", word: "Temperature Change", description: "Hold ice, splash cold water on your face." },
                    { letter: "I", word: "Intense Exercise", description: "Run, jump, burn off the adrenaline in your body." },
                    { letter: "P", word: "Paced Breathing", description: "Breathe in for 4, out for 6. Slow the nervous system." },
                    { letter: "P", word: "Progressive Muscle Relaxation", description: "Tense and release each muscle group in sequence." },
                  ]}
                />
              </div>
              <div className={getCardClass("accepts", activeFilter)}>
                <AcronymCard title="A.C.C.E.P.T.S." skillId="accepts" subtitle="Distract yourself until the wave passes." pillar="distress"
                  items={[
                    { letter: "A", word: "Activities", description: "Do something engaging that absorbs your focus." },
                    { letter: "C", word: "Contributing", description: "Help someone else. Shift focus outward." },
                    { letter: "C", word: "Comparisons", description: "Compare to a harder time you survived." },
                    { letter: "E", word: "Emotions (opposite)", description: "Deliberately trigger a different emotional state." },
                    { letter: "P", word: "Pushing away", description: "Temporarily set aside the problem mentally." },
                    { letter: "T", word: "Thoughts", description: "Think about something completely different." },
                    { letter: "S", word: "Sensations", description: "Use intense physical sensations as distraction." },
                  ]}
                />
              </div>
              <div className={getCardClass("improve", activeFilter)}>
                <AcronymCard title="I.M.P.R.O.V.E." skillId="improve" subtitle="Make this moment a little more bearable." pillar="distress"
                  items={[
                    { letter: "I", word: "Imagery", description: "Visualize a safe place or a positive outcome." },
                    { letter: "M", word: "Meaning", description: "Find purpose or a silver lining in the pain." },
                    { letter: "P", word: "Prayer or meditation", description: "Connect to something larger than yourself." },
                    { letter: "R", word: "Relaxation", description: "Use muscle relaxation, breathing, or stretching." },
                    { letter: "O", word: "One thing in the moment", description: "Focus on just the present task or sensation." },
                    { letter: "V", word: "Vacation", description: "Take a brief mental break from the problem." },
                    { letter: "E", word: "Encouragement", description: "Talk to yourself the way a kind friend would." },
                  ]}
                />
              </div>
            </div>

            <div className="two-col-grid">
              <div className={getCardClass("self-soothe", activeFilter)}><SelfSootheCard /></div>
              <div className={`acronym-card pillar-distress ${getCardClass("radical-acceptance", activeFilter)}`}>
                <p className="acronym-title">Radical Acceptance</p>
                <p className="acronym-subtitle">Pain is inevitable. Suffering is optional.</p>
                <p className="body-md" style={{ color: "var(--text-secondary)", marginBottom: "16px" }}>
                  Accepting reality as it is, not fighting what you cannot change. This isn&apos;t approval. It&apos;s letting go of the battle.
                </p>
                <blockquote className="pull-quote" style={{ borderColor: "var(--peach)" }}>
                  &ldquo;Radical Acceptance is the only way out of hell.&rdquo;
                </blockquote>
                <div style={{ marginTop: "24px", padding: "16px", background: "var(--pillar-tint)", borderRadius: "12px" }}>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
                    Also: <strong>Half Smile &amp; Willing Hands</strong>: turn the corners of your mouth up slightly and turn your palms open. Your body can lead your mind.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <SectionDivider nextBg="#f5f0ff" />

        <section id="emotion-regulation" className="pillar-emotion section" style={{ background: "var(--pillar-bg)" }}>
          <div className="container">
            <PillarHeader
              num="Pillar 03"
              title="Emotion Regulation"
              sub="Emotions aren't the enemy. These skills help you understand them, reduce their intensity, and cope."
              icon={<Sun size={40} strokeWidth={1.5} />}
              href="/dbt/emotion-regulation"
            />

            <div className="acronym-grid" style={{ marginBottom: "20px" }}>
              <div className={getCardClass("abc", activeFilter)}>
                <AcronymCard title="A.B.C." skillId="abc" subtitle="Build a life worth living, before the crisis hits." pillar="emotion"
                  items={[
                    { letter: "A", word: "Accumulate Positive Emotions", description: "Do things that make you feel good. Every single day." },
                    { letter: "B", word: "Build Mastery", description: "Do one thing daily that makes you feel capable and competent." },
                    { letter: "C", word: "Cope Ahead of Time", description: "Plan and mentally rehearse for difficult situations." },
                  ]}
                />
              </div>
              <div className={getCardClass("please", activeFilter)}>
                <AcronymCard title="P.L.E.A.S.E." skillId="please" subtitle="Your body affects your emotions more than you think." pillar="emotion"
                  items={[
                    { letter: "P", word: "Treat Physical illness", description: "See a doctor. Don't let physical pain drive emotional pain." },
                    { letter: "L", word: "Balanced Eating", description: "Don't eat too much or too little. Fuel yourself with care." },
                    { letter: "E", word: "Avoid mood-Altering substances", description: "Alcohol, drugs, and caffeine all amplify emotional vulnerability." },
                    { letter: "A", word: "Balanced Sleep", description: "Protect your sleep. Exhaustion destroys emotion regulation." },
                    { letter: "S", word: "Get Exercise", description: "Move your body. Even a short walk makes a difference." },
                    { letter: "E", word: "Build mastery", description: "Reinforce the whole, a capable, cared-for you." },
                  ]}
                />
              </div>
              <div className={getCardClass("vitals", activeFilter)}>
                <AcronymCard title="V.I.T.A.L.S." skillId="vitals" subtitle="A self-compassion toolkit." pillar="emotion"
                  items={[
                    { letter: "V", word: "Validate yourself", description: "Your feelings make sense given what you've been through." },
                    { letter: "I", word: "Imagine success", description: "Picture yourself handling this well. Your brain rehearses with you." },
                    { letter: "T", word: "Take small steps", description: "Progress is progress. One tiny action forward is enough." },
                    { letter: "A", word: "Applaud yourself", description: "Notice what you did right. Out loud, if you can." },
                    { letter: "L", word: "Lighten the load", description: "Reduce demands on yourself. You can't pour from empty." },
                    { letter: "S", word: "Sweeten the pot", description: "Build in small rewards. Celebrate effort, not just outcome." },
                  ]}
                />
              </div>

              <div className={`acronym-card pillar-emotion ${getCardClass("opposite-action", activeFilter)}`}>
                <p className="acronym-title" style={{ marginBottom: "16px" }}>More Skills</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {[
                    { title: "Problem Solving", desc: "Identify the problem, generate solutions, pick one and try it." },
                    { title: "Check the Facts", desc: "Is your interpretation accurate? Test the story you're telling yourself." },
                    { title: "Opposite Action", desc: "If fear is unjustified: approach. If shame: share. Act against the urge." },
                    { title: "Riding the Wave", desc: "Emotions peak and pass like waves. You don't have to act on them.", hasWave: true },
                  ].map((s: { title: string; desc: string; hasWave?: boolean }) => (
                    <div key={s.title} style={{ padding: "12px", background: "var(--pillar-tint)", borderRadius: "10px" }}>
                      <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", fontWeight: 700, color: "var(--pillar-accent)", marginBottom: "4px" }}>{s.title}</p>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", color: "var(--text-secondary)" }}>{s.desc}</p>
                      {s.hasWave && <WaveAnimation />}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <SectionDivider nextBg="#f0f5ff" />

        <section id="interpersonal" className="pillar-interpersonal section" style={{ background: "var(--pillar-bg)" }}>
          <div className="container">
            <PillarHeader
              num="Pillar 04"
              title="Interpersonal Effectiveness"
              sub="Relationships are hard. These skills help you ask for what you need, say no, and keep your self-respect, all at once."
              icon={<Users size={40} strokeWidth={1.5} />}
              href="/dbt/interpersonal"
            />

            <div className="chip-scroll" style={{ marginBottom: "32px", flexWrap: "wrap" }}>
              {["Setting Boundaries", "Expressing Needs", "Communicating Assertively", "Maintaining Self-Respect", "Strengthening Relationships"].map(c => (
                <span key={c} className="chip-pill">{c}</span>
              ))}
            </div>

            <div className="acronym-grid">
              <div className={`featured ${getCardClass("dear-man", activeFilter)}`}>
                <AcronymCard
                  title="D.E.A.R. M.A.N."
                  skillId="dear-man"
                  subtitle="How to ask for what you need."
                  pillar="interpersonal"
                  featured
                  columns={2}
                  items={[]}
                  leftItems={[
                    { letter: "D", word: "Describe", description: "The situation clearly and objectively." },
                    { letter: "E", word: "Express", description: "Your feelings using 'I feel' statements." },
                    { letter: "A", word: "Assert", description: "Ask for what you want or say no clearly." },
                    { letter: "R", word: "Reinforce", description: "Explain the positive outcome for both of you." },
                  ]}
                  rightItems={[
                    { letter: "M", word: "Mindful", description: "Stay focused on your goal, ignore distractions." },
                    { letter: "A", word: "Appear confident", description: "Use a steady voice, eye contact, posture." },
                    { letter: "N", word: "Negotiate", description: "Be willing to give to get. Find common ground." },
                  ]}
                />
              </div>

              <div className={getCardClass("fast", activeFilter)}>
                <AcronymCard title="F.A.S.T." skillId="fast" subtitle="Keep your self-respect." pillar="interpersonal"
                  items={[
                    { letter: "F", word: "Fair", description: "Be fair to yourself and others. Don't over-give or over-demand." },
                    { letter: "A", word: "Apologies", description: "Only apologize when it's genuinely warranted. Not to avoid conflict." },
                    { letter: "S", word: "Stick to your values", description: "Don't compromise what matters to you just to be liked." },
                    { letter: "T", word: "Truthful", description: "Be honest. Avoid exaggeration, helplessness, or manipulation." },
                  ]}
                />
              </div>
              <div className={getCardClass("give", activeFilter)}>
                <AcronymCard title="G.I.V.E." skillId="give" subtitle="Keep the relationship." pillar="interpersonal"
                  items={[
                    { letter: "G", word: "Gentle", description: "Be kind. No attacks, threats, or harsh criticism." },
                    { letter: "I", word: "Interested", description: "Listen actively. Put your phone down." },
                    { letter: "V", word: "Validate", description: "Acknowledge the other person's feelings as understandable." },
                    { letter: "E", word: "Easy manner", description: "Use light touch, appropriate humor when possible." },
                  ]}
                />
              </div>
              <div className={getCardClass("think", activeFilter)}>
                <AcronymCard title="T.H.I.N.K." skillId="think" subtitle="Before you react." pillar="interpersonal"
                  items={[
                    { letter: "T", word: "Think", description: "About the other person's perspective before reacting." },
                    { letter: "H", word: "Have empathy", description: "Try to feel what they might be feeling." },
                    { letter: "I", word: "Interpretations", description: "More than one interpretation of their behavior exists." },
                    { letter: "N", word: "Notice", description: "Notice the other person's positive efforts and intentions." },
                    { letter: "K", word: "Kindness", description: "Lead with kindness, even when it's hard." },
                  ]}
                />
              </div>
              <div className={getCardClass("raven", activeFilter)}>
                <AcronymCard title="R.A.V.E.N." skillId="raven" subtitle="Ground yourself in conflict." pillar="interpersonal"
                  items={[
                    { letter: "R", word: "Relax", description: "Take a breath before responding. Slow yourself down." },
                    { letter: "A", word: "Avoid negative habits", description: "No stonewalling, contempt, or defensiveness." },
                    { letter: "V", word: "Validate", description: "Acknowledge what the other person is experiencing." },
                    { letter: "E", word: "Examine your values", description: "Is your reaction aligned with who you want to be?" },
                    { letter: "N", word: "Neutral voice", description: "Keep your tone calm, even if you're not feeling it." },
                  ]}
                />
              </div>
            </div>
          </div>
        </section>

        <DBTBottomCTA />
      </main>

      <style>{`
        .two-col-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        @media (max-width: 768px) { .two-col-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  );
}
