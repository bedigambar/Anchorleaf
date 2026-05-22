import React from "react";
import { Metadata } from "next";
import { Sun } from "lucide-react";
import PillarPageLayout from "@/components/dbt/PillarPageLayout";
import AcronymCard from "@/components/dbt/AcronymCard";
import WaveAnimation from "@/components/dbt/WaveAnimation";

export const metadata: Metadata = {
  title: "Emotion Regulation | Anchorleaf DBT Toolkit",
  description: "Learn how to understand and manage your emotions. Explore ABC, PLEASE, VITALS, and skills like Opposite Action and Riding the Wave.",
};

export default function EmotionRegulationPage() {
  const abcItems = [
    { letter: "A", word: "Accumulate Positive Emotions", description: "Do pleasant things daily to build short-term positive experiences (hobbies, walks, relaxing) and work toward long-term values to create a life worth living." },
    { letter: "B", word: "Build Mastery", description: "Engage in one activity every day that makes you feel competent and capable. This builds your sense of control and confidence over your life." },
    { letter: "C", word: "Cope Ahead of Time", description: "Identify highly challenging situations in advance and mentally rehearse your response. Rehearse exactly how you will practice skills under pressure." }
  ];

  const pleaseItems = [
    { letter: "P", word: "Treat Physical illness", description: "Attend to your body. See a doctor when sick or injured, and take prescribed medications. Physical pain directly lowers emotional resilience." },
    { letter: "L", word: "Balanced Eating", description: "Maintain a structured diet. Do not eat too much or too little. Avoid food patterns that trigger anxiety or mood swings." },
    { letter: "E", word: "Avoid mood-Altering substances", description: "Limit or avoid alcohol, recreational drugs, and excess caffeine. These substances disrupt emotional baseline levels and trigger irritability." },
    { letter: "A", word: "Balanced Sleep", description: "Establish consistent sleep schedules. Sleep deprivation heightens emotional reactivity and vulnerability. Aim for 7-9 hours nightly." },
    { letter: "S", word: "Get Exercise", description: "Move your body daily. Even a 20-minute walk can release endorphins and reduce cortisol levels, helping stabilize your baseline mood." },
    { letter: "E", word: "Build mastery", description: "Reinforce physical strength and capability. Treat your body with respect and care to support your mental wellness." }
  ];

  const vitalsItems = [
    { letter: "V", word: "Validate yourself", description: "Acknowledge your emotions. Your feelings make complete sense given your circumstances and history. Treat your experience with validation, not criticism." },
    { letter: "I", word: "Imagine success", description: "Visualize yourself handling challenging moments with ease and steadiness. Rehearsing success prepares your brain for positive execution." },
    { letter: "T", word: "Take small steps", description: "Break large goals or overwhelming feelings into tiny, actionable pieces. One step at a time is enough to create movement." },
    { letter: "A", word: "Applaud yourself", description: "Practice self-recognition. Notice and praise yourself for your efforts and progress, no matter how small they might seem to others." },
    { letter: "L", word: "Lighten the load", description: "Practice self-compassion by lowering demands when you are highly distressed. Say no to non-essential obligations to conserve energy." },
    { letter: "S", word: "Sweeten the pot", description: "Reward yourself for trying. Add small, positive reinforcers to encourage yourself along the path of skill practice." }
  ];

  const extraSkills = [
    {
      title: "Problem Solving",
      desc: "Use logic when emotions fit the facts but you need to change the situation. Define the problem, generate multiple solutions, choose the most effective option, and try it."
    },
    {
      title: "Check the Facts",
      desc: "Many emotions are triggered by interpretations rather than facts. Look at the situation objectively. Are your assumptions true? What is the actual, worst-case scenario?"
    },
    {
      title: "Opposite Action",
      desc: "When an emotion does not fit the facts or is ineffective, act completely opposite to its urge. If you feel fear when safe: approach. If you feel shame when innocent: share."
    }
  ];

  return (
    <PillarPageLayout
      num="Pillar 03"
      title="Emotion Regulation"
      subtitle="Emotions are not the enemy; they provide vital information. These skills help you understand, soften, and navigate intense feelings without feeling overwhelmed."
      icon={<Sun size={28} strokeWidth={1.5} />}
      themeColor="var(--pillar-accent)"
      themeBg="#f5f0ff"
      pillarClass="pillar-emotion"
      nextPillarName="Interpersonal Effectiveness"
      nextPillarHref="/dbt/interpersonal"
      nextThemeColor="#5a8ab0"
      nextThemeColorDark="#3a6a90"
    >
      <div style={{ marginBottom: "64px" }}>
        <h2 className="h2" style={{ color: "var(--text-primary)", marginBottom: "20px" }}>
          Understanding and Balancing Your Emotions
        </h2>
        <p className="body-lg" style={{ color: "var(--text-secondary)", marginBottom: "24px", maxWidth: "800px" }}>
          Emotion Regulation skills help you reduce your overall emotional vulnerability, check the accuracy of your emotional interpretations, and decrease the suffering caused by intense emotional states.
        </p>
      </div>

      <div style={{ marginBottom: "64px" }}>
        <h3 className="h3" style={{ color: "var(--text-primary)", marginBottom: "32px" }}>
          Core Vulnerability Reduction
        </h3>
        <div className="acronym-grid" style={{ marginBottom: "32px" }}>
          <AcronymCard
            title="A.B.C."
            subtitle="Build emotional capital and mastery"
            pillar="emotion"
            items={abcItems}
            skillId="abc"
          />
          <AcronymCard
            title="P.L.E.A.S.E."
            subtitle="Regulate your physical body"
            pillar="emotion"
            items={pleaseItems}
            skillId="please"
          />
        </div>

        <div style={{ maxWidth: "540px", margin: "0 auto" }}>
          <AcronymCard
            title="V.I.T.A.L.S."
            subtitle="A self-compassion toolkit for intense moments"
            pillar="emotion"
            items={vitalsItems}
            skillId="vitals"
          />
        </div>
      </div>

      <hr style={{ border: 0, height: "1px", background: "var(--border)", margin: "64px 0" }} />

      <div>
        <h3 className="h3" style={{ color: "var(--text-primary)", marginBottom: "32px" }}>
          Cognitive and Behavioral Skills
        </h3>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "32px", alignItems: "stretch" }} className="emotion-grid-editorial">
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {extraSkills.map((skill, index) => (
              <div
                key={index}
                style={{
                  padding: "24px",
                  borderRadius: "20px",
                  border: "1px solid var(--border)",
                  background: "white",
                  boxShadow: "var(--shadow-sm)"
                }}
              >
                <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.25rem", fontWeight: 700, color: "var(--purple)", marginBottom: "8px" }}>
                  {skill.title}
                </h4>
                <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
                  {skill.desc}
                </p>
              </div>
            ))}
          </div>

          <div
            className="acronym-card pillar-emotion"
            style={{
              padding: "40px",
              boxShadow: "var(--shadow-md), 0 0 0 2px var(--pillar-border)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}
          >
            <div>
              <p className="acronym-title">Riding the Wave</p>
              <p className="acronym-subtitle" style={{ marginBottom: "20px" }}>Emotions rise, peak, and fall naturally.</p>
              <p className="body-md" style={{ color: "var(--text-secondary)", marginBottom: "20px", lineHeight: 1.6 }}>
                Emotions behave exactly like waves in the ocean: they start small, grow in intensity, peak at a crest, and then naturally wash back out and disappear.
              </p>
              <p className="body-md" style={{ color: "var(--text-secondary)", marginBottom: "24px", lineHeight: 1.6 }}>
                Riding the wave means observing your emotion without pushing it away, holding onto it, or acting on it. Simply breathe, feel the physical sensations in your body, and trust that the wave will subside. It always does.
              </p>
            </div>

            <div>
              <WaveAnimation />
              <p style={{ fontFamily: "'Caveat', cursive", fontSize: "1.15rem", color: "var(--text-muted)", marginTop: "14px", textAlign: "center" }}>
                Keep breathing. Let the wave roll through you.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .emotion-grid-editorial { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </PillarPageLayout>
  );
}
