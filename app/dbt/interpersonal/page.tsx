import React from "react";
import { Metadata } from "next";
import { Users } from "lucide-react";
import PillarPageLayout from "@/components/dbt/PillarPageLayout";
import AcronymCard from "@/components/dbt/AcronymCard";

export const metadata: Metadata = {
  title: "Interpersonal Effectiveness | Anchorleaf DBT Toolkit",
  description: "Learn how to communicate your needs, set firm boundaries, and maintain self-respect in relationships. Explore DEAR MAN, FAST, GIVE, THINK, and RAVEN.",
};

export default function InterpersonalPage() {
  const dearManLeft = [
    { letter: "D", word: "Describe", description: "State the objective facts of the situation clearly and simply. Avoid judgmental language or opinions. Describe what is happening without accusation." },
    { letter: "E", word: "Express", description: "Share your feelings and opinions. Use 'I feel' statements (e.g., 'I feel overwhelmed when tasks are delayed') rather than blaming 'you' statements." },
    { letter: "A", word: "Assert", description: "State your request or say 'no' directly and clearly. Do not beat around the bush or expect the other person to read your mind." },
    { letter: "R", word: "Reinforce", description: "Explain the positive outcomes of meeting your request, or the negative consequences of ignoring it. Make it clear how it benefits both of you." }
  ];

  const dearManRight = [
    { letter: "M", word: "Mindful", description: "Stay focused on your objective. Keep your point simple. Avoid getting distracted by side issues, old arguments, or the other person's deflection." },
    { letter: "A", word: "Appear confident", description: "Speak with a steady, clear tone. Maintain eye contact. Sit or stand comfortably. Avoid apologetic body language or whispering." },
    { letter: "N", word: "Negotiate", description: "Be willing to offer alternatives or find common ground. Focus on solutions where both parties get their core needs met. Have a backup plan." }
  ];

  const fastItems = [
    { letter: "F", word: "Fair", description: "Be fair to yourself and to the other person. Balance their needs and feelings with your own self-respect and boundaries. Avoid over-giving or demanding too much." },
    { letter: "A", word: "Apologies (no over-apologizing)", description: "Keep apologies for times when you have actually done something wrong. Do not apologize for making a reasonable request, saying no, or existing." },
    { letter: "S", word: "Stick to values", description: "Know your moral codes, priorities, and boundaries. Do not compromise what you believe is right or safe just to please others or avoid a temporary conflict." },
    { letter: "T", word: "Truthful", description: "Be honest. Avoid exaggeration, white lies, helpless acting, or manipulation. Speak objectively and stand behind your word." }
  ];

  const giveItems = [
    { letter: "G", word: "Gentle", description: "Be mild in your approach. Avoid attacks, threats, insults, eye-rolling, sarcasm, or yelling. Speak calmly and handle conflict with kindness." },
    { letter: "I", word: "Interested", description: "Listen actively to the other person's perspective. Do not interrupt, check your phone, or formulate your rebuttal while they are speaking." },
    { letter: "V", word: "Validate", description: "Acknowledge the other person's feelings, thoughts, and situation. You do not have to agree to validate that their reaction makes sense from their point of view." },
    { letter: "E", word: "Easy manner", description: "Approach the conversation with a light, non-defensive energy. Use a soft smile, positive posture, or a touch of humor to diffuse tension if appropriate." }
  ];

  const thinkItems = [
    { letter: "T", word: "Think", description: "Reflect on the other person's perspective. What factors in their life are influencing their behavior? What pressure are they under?" },
    { letter: "H", word: "Have empathy", description: "Attempt to put yourself in their shoes emotionally. Understand their frustration, anxiety, or exhaustion before you react." },
    { letter: "I", word: "Interpretations", description: "Explore alternative interpretations of their behavior. Do not assume malicious intent when fatigue, misunderstanding, or stress could explain it." },
    { letter: "N", word: "Notice", description: "Actively look for and acknowledge their positive traits, efforts, and intentions. Focus on what is working in the relationship." },
    { letter: "K", word: "Kindness", description: "Lead with kindness. Even when setting a tough boundary or discussing a difficult issue, keep your speech and intention kind." }
  ];

  const ravenItems = [
    { letter: "R", word: "Relax", description: "Take a deep breath. Ground your physical body before responding. Do not react while your heart rate is elevated." },
    { letter: "A", word: "Avoid negative habits", description: "Commit to avoiding damaging communication habits: stonewalling, sarcasm, passive-aggressive behaviors, or walking away mid-talk." },
    { letter: "V", word: "Validate", description: "Acknowledge the other person's experience aloud before asserting your own point. Say: 'I hear that you are frustrated by this.'" },
    { letter: "E", word: "Examine your values", description: "Check if your planned reaction aligns with the kind of friend, partner, or person you want to be. Act from your Wise Mind values." },
    { letter: "N", word: "Neutral voice", description: "Keep your vocal tone and volume steady and neutral. Lowering your voice can prevent the other person from escalating the conflict." }
  ];

  return (
    <PillarPageLayout
      num="Pillar 04"
      title="Interpersonal Effectiveness"
      subtitle="Say no, express your needs, and manage conflict while maintaining self-respect and strengthening your connections with others."
      icon={<Users size={28} strokeWidth={1.5} />}
      themeColor="var(--pillar-accent)"
      themeBg="#f0f5ff"
      pillarClass="pillar-interpersonal"
    >
      <div style={{ marginBottom: "64px" }}>
        <h2 className="h2" style={{ color: "var(--text-primary)", marginBottom: "20px" }}>
          Balancing Priorities in Relationships
        </h2>
        <p className="body-lg" style={{ color: "var(--text-secondary)", marginBottom: "24px", maxWidth: "800px" }}>
          Interpersonal Effectiveness skills help you balance three priorities in every communication: 
          1) <strong>Objective Effectiveness</strong> (getting your goal met), 
          2) <strong>Relationship Effectiveness</strong> (keeping the connection strong), and 
          3) <strong>Self-Respect Effectiveness</strong> (feeling good about how you acted).
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "16px" }}>
          {["Setting Boundaries", "Expressing Needs", "Saying No", "Resolving Conflicts", "Building Respect"].map((chip) => (
            <span
              key={chip}
              className="chip-pill"
              style={{
                color: "var(--blue)",
                borderColor: "rgba(90, 138, 176, 0.25)",
                background: "rgba(90, 138, 176, 0.04)"
              }}
            >
              {chip}
            </span>
          ))}
        </div>
      </div>

      <hr style={{ border: 0, height: "1px", background: "var(--border)", margin: "64px 0" }} />

      <div style={{ marginBottom: "64px" }}>
        <h3 className="h3" style={{ color: "var(--text-primary)", marginBottom: "32px", textAlign: "center" }}>
          The Objective: DEAR MAN
        </h3>
        <p className="body-md" style={{ color: "var(--text-secondary)", textAlign: "center", maxWidth: "600px", margin: "0 auto 40px" }}>
          Use <strong>DEAR MAN</strong> when you need to ask for something, request a change, or say a firm no. It is designed to maximize the chance of getting your objective.
        </p>

        <div style={{ maxWidth: "880px", margin: "0 auto" }}>
          <AcronymCard
            title="D.E.A.R. M.A.N."
            subtitle="The structured approach to asking for what you need"
            pillar="interpersonal"
            featured
            columns={2}
            items={[]}
            leftItems={dearManLeft}
            rightItems={dearManRight}
            skillId="dear-man"
          />
        </div>
      </div>

      <hr style={{ border: 0, height: "1px", background: "var(--border)", margin: "64px 0" }} />

      <div>
        <h3 className="h3" style={{ color: "var(--text-primary)", marginBottom: "32px" }}>
          Relationship &amp; Self-Respect Toolkits
        </h3>
        <p className="body-md" style={{ color: "var(--text-secondary)", marginBottom: "40px", maxWidth: "640px" }}>
          Depending on your main focus (keeping the relationship, keeping your self-respect, or navigating high conflict), choose the corresponding skill:
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", marginBottom: "32px" }} className="interpersonal-grid">
          <AcronymCard
            title="F.A.S.T."
            subtitle="To maintain your self-respect during talks"
            pillar="interpersonal"
            items={fastItems}
            skillId="fast"
          />
          <AcronymCard
            title="G.I.V.E."
            subtitle="To protect the relationship and resolve tension"
            pillar="interpersonal"
            items={giveItems}
            skillId="give"
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }} className="interpersonal-grid">
          <AcronymCard
            title="T.H.I.N.K."
            subtitle="To check your assumptions and find empathy"
            pillar="interpersonal"
            items={thinkItems}
            skillId="think"
          />
          <AcronymCard
            title="R.A.V.E.N."
            subtitle="To navigate heated conflicts and stay steady"
            pillar="interpersonal"
            items={ravenItems}
            skillId="raven"
          />
        </div>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .interpersonal-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </PillarPageLayout>
  );
}
