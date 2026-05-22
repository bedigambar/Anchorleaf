import React from "react";
import { Metadata } from "next";
import { Wind } from "lucide-react";
import PillarPageLayout from "@/components/dbt/PillarPageLayout";
import ThreeMindsDiagram from "@/components/dbt/ThreeMindsDiagram";
import AcronymCard from "@/components/dbt/AcronymCard";

export const metadata: Metadata = {
  title: "Mindfulness | Anchorleaf DBT Toolkit",
  description: "Find your steadiness with Core Mindfulness DBT skills. Learn how to locate your Wise Mind and practice the 'WHAT' and 'HOW' skills.",
};

export default function MindfulnessPage() {
  const whatItems = [
    { letter: "Ob", word: "Observe", description: "Notice your internal and external environment without trying to change it. Observe your thoughts, physical sensations, and emotions like clouds passing in the sky. Practice returning your focus gently when your mind wanders." },
    { letter: "De", word: "Describe", description: "Put feelings and observations into words. Use descriptive, objective language. Avoid emotional labels or judgments (e.g., instead of 'this is a terrible room,' say 'the room is cold and has gray walls'). Stick strictly to the facts." },
    { letter: "Pa", word: "Participate", description: "Throw yourself completely into the current moment. Become one with whatever you are doing (washing dishes, walking, breathing). Practice without self-consciousness or holding back, fully engaging your senses." }
  ];

  const howItems = [
    { letter: "NJ", word: "Non-Judgmental", description: "Notice but don't evaluate. Accept the moment as it is without labeling it as 'good' or 'bad.' If you find yourself judging, simply notice that judgment and let it go. Focus on the 'what' rather than your opinion of it." },
    { letter: "OM", word: "One-Mindful", description: "Do one thing at a time. Bring your full concentration to a single activity. If you are eating, just eat; if you are talking, just listen. When distractions arise, gently pull your attention back to the current focus." },
    { letter: "BE", word: "Be Effective", description: "Focus on what works to achieve your goal, rather than what is 'right' or 'fair.' Let go of anger, pride, or the need to win. Act as skillfully as possible in the situation you are actually in, not the one you wish you were in." }
  ];

  return (
    <PillarPageLayout
      num="Pillar 01"
      title="Mindfulness"
      subtitle="The foundation of all DBT skills. Mindfulness is the practice of being fully present, non-judgmental, and acting effectively from Wise Mind."
      icon={<Wind size={28} strokeWidth={1.5} />}
      themeColor="var(--pillar-accent)"
      themeBg="#f0f7ec"
      pillarClass="pillar-mindfulness"
      nextPillarName="Distress Tolerance"
      nextPillarHref="/dbt/distress-tolerance"
      nextThemeColor="#c87a5a"
      nextThemeColorDark="#a05a3a"
    >
      <div style={{ marginBottom: "80px" }}>
        <h2 className="h2" style={{ color: "var(--text-primary)", marginBottom: "32px" }}>
          Finding Your Wise Mind
        </h2>
        <div className="grid-editorial">
          <div>
            <p className="body-lg" style={{ color: "var(--text-secondary)", marginBottom: "20px" }}>
              In DBT, we view the mind as having three states: the <strong>Rational Mind</strong>, the <strong>Emotional Mind</strong>, and the <strong>Wise Mind</strong>.
            </p>
            <p className="body-md" style={{ color: "var(--text-secondary)", marginBottom: "20px" }}>
              When you are in your <strong>Rational Mind</strong>, you are ruled by facts, logic, and intellectual analysis. Feelings are dismissed or ignored. When you are in your <strong>Emotional Mind</strong>, your thoughts and actions are driven entirely by your current feelings, urges, and state of mood.
            </p>
            <p className="body-md" style={{ color: "var(--text-secondary)", marginBottom: "24px" }}>
              <strong>Wise Mind</strong> is the overlap between the two. It is the place where reason and emotion meet, creating an intuitive sense of what is true and what is effective. It is calm, centered, and quiet.
            </p>
            <div style={{ padding: "20px", background: "var(--pillar-tint)", borderRadius: "16px", border: "1px solid var(--pillar-border)" }}>
              <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", fontWeight: 600, color: "var(--pillar-accent-dark)", marginBottom: "8px" }}>
                Practice Tip: Grounding into Wise Mind
              </h4>
              <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
                Inhale deeply and ask yourself silently: <em>&ldquo;Is this Wise Mind?&rdquo;</em> Listen to the silence between your thoughts. Do not force an answer; wait and see if an intuitive sense of stability arises.
              </p>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <ThreeMindsDiagram />
          </div>
        </div>
      </div>

      <hr style={{ border: 0, height: "1px", background: "var(--border)", margin: "64px 0" }} />

      <div style={{ marginBottom: "80px" }}>
        <h2 className="h2" style={{ color: "var(--text-primary)", marginBottom: "16px", textAlign: "center" }}>
          The Core Skills
        </h2>
        <p className="body-md" style={{ color: "var(--text-secondary)", textAlign: "center", maxWidth: "600px", margin: "0 auto 48px" }}>
          Mindfulness is split into the <strong>WHAT</strong> skills (what you actually do to practice mindfulness) and the <strong>HOW</strong> skills (the quality or way you practice them).
        </p>

        <div className="acronym-grid">
          <AcronymCard
            title='"WHAT" Skills'
            subtitle="What you do to practice mindfulness"
            pillar="mindfulness"
            items={whatItems}
            skillId="mindfulness-what"
          />
          <AcronymCard
            title='"HOW" Skills'
            subtitle="The mindset you bring to the practice"
            pillar="mindfulness"
            items={howItems}
            skillId="mindfulness-how"
          />
        </div>
      </div>

      <hr style={{ border: 0, height: "1px", background: "var(--border)", margin: "64px 0" }} />

      <div>
        <h3 className="h3" style={{ color: "var(--text-primary)", marginBottom: "20px" }}>
          Simple Practices for Today
        </h3>
        <p className="body-md" style={{ color: "var(--text-secondary)", marginBottom: "32px", maxWidth: "640px" }}>
          You don&apos;t need hours of meditation. Try introducing mindfulness into your day with these brief activities:
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "24px" }}>
          {[
            {
              title: "The Five Senses (5-4-3-2-1)",
              desc: "Acknowledge 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste. This anchors you immediately in physical reality."
            },
            {
              title: "Mindful Tea or Water",
              desc: "Drink a cup of warm water or tea. Pay attention to the warmth of the mug, the sound of swallowing, the flavor, and the steam rising."
            },
            {
              title: "Urge Surfing",
              desc: "When you feel an urge to act impulsively, don't fight it. Notice it. Describe it. Visualize it as a wave that peaks and inevitably subsides."
            }
          ].map((practice, index) => (
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
              <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "12px" }}>
                {practice.title}
              </h4>
              <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
                {practice.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </PillarPageLayout>
  );
}
