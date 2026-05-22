import React from "react";
import { Metadata } from "next";
import { Waves } from "lucide-react";
import PillarPageLayout from "@/components/dbt/PillarPageLayout";
import AcronymCard from "@/components/dbt/AcronymCard";
import SelfSootheCard from "@/components/dbt/SelfSootheCard";

export const metadata: Metadata = {
  title: "Distress Tolerance | Anchorleaf DBT Toolkit",
  description: "Learn how to survive a crisis without making it worse. Explore STOP, TIPP, ACCEPTS, IMPROVE, Self-Soothe, and Radical Acceptance.",
};

export default function DistressTolerancePage() {
  const stopItems = [
    { letter: "S", word: "Stop", description: "Freeze. Do not react on impulse. Your emotions might try to make you act without thinking. Take control of your behavior." },
    { letter: "T", word: "Take a step back", description: "Step away from the situation physically or mentally. Take a deep, slow breath to create space between your urge and your action." },
    { letter: "O", word: "Observe", description: "Collect the facts. What is happening around you? What are you feeling inside? What are the urges you are experiencing? Avoid judging." },
    { letter: "P", word: "Proceed mindfully", description: "Ask your Wise Mind: 'What is the most effective thing to do right now?' Choose a response that will make things better, not worse." }
  ];

  const tippItems = [
    { letter: "T", word: "Temperature change", description: "Change your body chemistry fast by splashing ice-cold water on your face, holding an ice cube, or stepping into a cold shower. This activates the mammalian dive reflex to slow your heart rate." },
    { letter: "I", word: "Intense exercise", description: "Discharge raw emotional energy. Do jumping jacks, run, pushups, or climb stairs for 10-15 minutes to burn off high-intensity adrenaline." },
    { letter: "P", word: "Paced breathing", description: "Slow your breathing. Inhale deeply into your stomach for 4 seconds, hold, and exhale slowly for 6 seconds. Keep your exhales longer than inhales to activate the parasympathetic nervous system." },
    { letter: "P", word: "Paired muscle relaxation", description: "Tense a muscle group (like your jaw or shoulders) tightly for 5 seconds, then let go completely. Focus on the contrast between tension and relaxation as you let the stress drain." }
  ];

  const acceptsItems = [
    { letter: "A", word: "Activities", description: "Engage in an absorbing activity: hobbies, cleaning, reading, or watching a favorite movie. Occupy your mind with constructive work." },
    { letter: "C", word: "Contributing", description: "Focus your attention outward by helping someone else. Send a supportive text, help a neighbor, or complete a kind gesture." },
    { letter: "C", word: "Comparisons", description: "Put your situation in perspective. Compare your current feelings to times you survived worse distress, or reflect on the struggles of others." },
    { letter: "E", word: "Emotions (opposite)", description: "Trigger an emotional state opposite to your current distress. Watch a comedy if you are sad, or listen to upbeat music if you feel down." },
    { letter: "P", word: "Pushing away", description: "Put the situation on a shelf in your mind. Box it up mentally and set it aside temporarily. You are not ignoring it; you are scheduling to solve it later." },
    { letter: "T", word: "Thoughts", description: "Fill your working memory. Count backward from 100 by 7, do a puzzle, memorize a poem, or list countries alphabetically." },
    { letter: "S", word: "Sensations", description: "Use intense physical sensations to shock your focus away from emotional pain. Hold ice, take a hot shower, or squeeze a stress ball." }
  ];

  const improveItems = [
    { letter: "I", word: "Imagery", description: "Close your eyes and visualize a calm, safe place. Or picture yourself successfully coping with the crisis and looking back at it with relief." },
    { letter: "M", word: "Meaning", description: "Find a sliver of purpose or learning in the pain. Remind yourself how overcoming this obstacle can build strength and resilience." },
    { letter: "P", word: "Prayer / Meditation", description: "Connect to a higher power, the universe, nature, or your inner wise self. Open your heart to the present moment for strength." },
    { letter: "R", word: "Relaxation", description: "Soften your body. Stretch your neck, do deep breathing, or take a warm bath. Tell your muscles to let go." },
    { letter: "O", word: "One thing in the moment", description: "Focus completely on the single task you are doing right now. Keep your mind in the immediate present, ignoring the past and future." },
    { letter: "V", word: "Vacation", description: "Take a brief, intentional mental break. Lie in bed for 20 minutes, turn off your phone, or step outside. Set a clear timer to return." },
    { letter: "E", word: "Encouragement", description: "Speak to yourself like a loving friend. Repeat comforting phrases: 'I can survive this,' 'This feeling will pass,' or 'I am doing my best.'" }
  ];

  return (
    <PillarPageLayout
      num="Pillar 02"
      title="Distress Tolerance"
      subtitle="Survive crisis moments without making them worse. Distress Tolerance skills help you bear pain when you cannot change the situation immediately."
      icon={<Waves size={28} strokeWidth={1.5} />}
      themeColor="var(--pillar-accent)"
      themeBg="#fff8f5"
      pillarClass="pillar-distress"
      nextPillarName="Emotion Regulation"
      nextPillarHref="/dbt/emotion-regulation"
      nextThemeColor="#7a6eb8"
      nextThemeColorDark="#5a50a0"
    >
      <div style={{ marginBottom: "64px" }}>
        <h2 className="h2" style={{ color: "var(--text-primary)", marginBottom: "20px" }}>
          Crisis Survival vs. Accepting Reality
        </h2>
        <p className="body-lg" style={{ color: "var(--text-secondary)", marginBottom: "24px", maxWidth: "800px" }}>
          Distress Tolerance is split into two parts: <strong>Crisis Survival Skills</strong> (designed to get you through the next five minutes without destructive behavior) and <strong>Reality Acceptance Skills</strong> (designed to help you cope with long-term, unchangeable pain).
        </p>
      </div>

      <div style={{ marginBottom: "64px" }}>
        <h3 className="h3" style={{ color: "var(--text-primary)", marginBottom: "32px" }}>
          Part 1: Crisis Survival Skills
        </h3>
        <p className="body-md" style={{ color: "var(--text-secondary)", marginBottom: "40px" }}>
          Use these skills when you are highly emotional, experiencing intense urges to self-harm or lash out, and when your thinking is clouded.
        </p>

        <div className="acronym-grid" style={{ marginBottom: "32px" }}>
          <AcronymCard
            title="S.T.O.P."
            subtitle="To pause before acting on impulse"
            pillar="distress"
            items={stopItems}
            skillId="stop"
          />
          <AcronymCard
            title="T.I.P.P."
            subtitle="To shift your body chemistry fast"
            pillar="distress"
            items={tippItems}
            skillId="tipp"
          />
        </div>

        <div className="acronym-grid">
          <AcronymCard
            title="A.C.C.E.P.T.S."
            subtitle="To distract your mind from pain"
            pillar="distress"
            items={acceptsItems}
            skillId="accepts"
          />
          <AcronymCard
            title="I.M.P.R.O.V.E."
            subtitle="To make the present moment bearable"
            pillar="distress"
            items={improveItems}
            skillId="improve"
          />
        </div>
      </div>

      <hr style={{ border: 0, height: "1px", background: "var(--border)", margin: "64px 0" }} />

      <div>
        <h3 className="h3" style={{ color: "var(--text-primary)", marginBottom: "32px" }}>
          Part 2: Reality Acceptance &amp; Self-Soothe
        </h3>

        <div className="two-col-grid" style={{ gap: "32px", alignItems: "stretch" }}>
          <div>
            <SelfSootheCard />
          </div>

          <div className="acronym-card pillar-distress">
            <p className="acronym-title">Radical Acceptance</p>
            <p className="acronym-subtitle">Pain is inevitable; suffering is optional.</p>
            <p className="body-md" style={{ color: "var(--text-secondary)", marginBottom: "20px" }}>
              Radical Acceptance is completely accepting reality as it is, without fighting it, denying it, or attempting to escape it. It is not approval, forgiveness, or agreement. It is letting go of the fight against the past or present, which frees up your energy to build a better future.
            </p>
            <blockquote className="pull-quote" style={{ borderColor: "var(--peach)" }}>
              &ldquo;Acceptance of reality is the only way to convert suffering into pain. Pain is still pain, but suffering is gone.&rdquo;
            </blockquote>

            <div style={{ marginTop: "24px", padding: "20px", background: "var(--pillar-tint)", borderRadius: "12px", border: "1px solid var(--pillar-border)" }}>
              <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", fontWeight: 600, color: "var(--pillar-accent-dark)", marginBottom: "8px" }}>
                Half-Smile &amp; Willing Hands
              </h4>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
                If your mind is fighting acceptance, change your body posture. Relax your face and turn the corners of your mouth slightly up (a Half-Smile). Sit or stand with your palms open, facing up (Willing Hands). By adopting an accepting physical posture, you invite your mind to follow.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .two-col-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
        @media (max-width: 768px) { .two-col-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </PillarPageLayout>
  );
}
