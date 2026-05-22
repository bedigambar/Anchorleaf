export type Pillar = "distress" | "emotion";

export interface Skill {
  id: string;
  name: string;
  pillar: Pillar;
  subtitle: string;
  steps: { letter: string; word: string; instruction: string }[];
  when_to_use: string[];
}

export const SKILLS: Skill[] = [
  {
    id: "stop",
    name: "STOP",
    pillar: "distress",
    subtitle: "To pause before acting on impulse.",
    when_to_use: ["crisis moments", "impulsive urges", "high emotion"],
    steps: [
      { letter: "S", word: "Stop", instruction: "Freeze. Do not react on impulse. Your emotions might try to make you act without thinking. Take control of your behavior." },
      { letter: "T", word: "Take a step back", instruction: "Step away from the situation physically or mentally. Take a deep, slow breath to create space between your urge and your action." },
      { letter: "O", word: "Observe", instruction: "Collect the facts. What is happening around you? What are you feeling inside? What are the urges you are experiencing? Avoid judging." },
      { letter: "P", word: "Proceed mindfully", instruction: "Ask your Wise Mind: 'What is the most effective thing to do right now?' Choose a response that will make things better, not worse." }
    ]
  },
  {
    id: "tipp",
    name: "TIPP",
    pillar: "distress",
    subtitle: "To shift your body chemistry fast.",
    when_to_use: ["extreme distress", "panic attacks", "overwhelming urges"],
    steps: [
      { letter: "T", word: "Temperature change", instruction: "Change your body chemistry fast by splashing ice-cold water on your face, holding an ice cube, or stepping into a cold shower. This activates the mammalian dive reflex to slow your heart rate." },
      { letter: "I", word: "Intense exercise", instruction: "Discharge raw emotional energy. Do jumping jacks, run, pushups, or climb stairs for 10-15 minutes to burn off high-intensity adrenaline." },
      { letter: "P", word: "Paced breathing", instruction: "Slow your breathing. Inhale deeply into your stomach for 4 seconds, hold, and exhale slowly for 6 seconds. Keep your exhales longer than inhales to activate the parasympathetic nervous system." },
      { letter: "P", word: "Paired muscle relaxation", instruction: "Tense a muscle group (like your jaw or shoulders) tightly for 5 seconds, then let go completely. Focus on the contrast between tension and relaxation as you let the stress drain." }
    ]
  },
  {
    id: "accepts",
    name: "ACCEPTS",
    pillar: "distress",
    subtitle: "To distract your mind from pain.",
    when_to_use: ["painful emotions", "intense worries", "rumination"],
    steps: [
      { letter: "A", word: "Activities", instruction: "Engage in an absorbing activity: hobbies, cleaning, reading, or watching a favorite movie. Occupy your mind with constructive work." },
      { letter: "C", word: "Contributing", instruction: "Focus your attention outward by helping someone else. Send a supportive text, help a neighbor, or complete a kind gesture." },
      { letter: "C", word: "Comparisons", instruction: "Put your situation in perspective. Compare your current feelings to times you survived worse distress, or reflect on the struggles of others." },
      { letter: "E", word: "Emotions (opposite)", instruction: "Trigger an emotional state opposite to your current distress. Watch a comedy if you are sad, or listen to upbeat music if you feel down." },
      { letter: "P", word: "Pushing away", instruction: "Put the situation on a shelf in your mind. Box it up mentally and set it aside temporarily. You are not ignoring it; you are scheduling to solve it later." },
      { letter: "T", word: "Thoughts", instruction: "Fill your working memory. Count backward from 100 by 7, do a puzzle, memorize a poem, or list countries alphabetically." },
      { letter: "S", word: "Sensations", instruction: "Use intense physical sensations to shock your focus away from emotional pain. Hold ice, take a hot shower, or squeeze a stress ball." }
    ]
  },
  {
    id: "improve",
    name: "IMPROVE",
    pillar: "distress",
    subtitle: "To make the present moment bearable.",
    when_to_use: ["acute distress", "unpleasant moments", "feeling stuck"],
    steps: [
      { letter: "I", word: "Imagery", instruction: "Close your eyes and visualize a calm, safe place. Or picture yourself successfully coping with the crisis and looking back at it with relief." },
      { letter: "M", word: "Meaning", instruction: "Find a sliver of purpose or learning in the pain. Remind yourself how overcoming this obstacle can build strength and resilience." },
      { letter: "P", word: "Prayer / Meditation", instruction: "Connect to a higher power, the universe, nature, or your wise inner self. Open your heart to the present moment for strength." },
      { letter: "R", word: "Relaxation", instruction: "Soften your body. Stretch your neck, do deep breathing, or take a warm bath. Tell your muscles to let go." },
      { letter: "O", word: "One thing in the moment", instruction: "Focus completely on the single task you are doing right now. Keep your mind in the immediate present, ignoring the past and future." },
      { letter: "V", word: "Vacation", instruction: "Take a brief, intentional mental break. Lie in bed for 20 minutes, turn off your phone, or step outside. Set a clear timer to return." },
      { letter: "E", word: "Encouragement", instruction: "Speak to yourself like a loving friend. Repeat comforting phrases: 'I can survive this,' 'This feeling will pass,' or 'I am doing my best.'" }
    ]
  },
  {
    id: "abc",
    name: "ABC",
    pillar: "emotion",
    subtitle: "Build emotional capital and mastery.",
    when_to_use: ["emotional vulnerability", "low mood", "preventative care"],
    steps: [
      { letter: "A", word: "Accumulate positive emotions", instruction: "Do pleasant things daily to build short-term positive experiences (hobbies, walks, relaxing) and work toward long-term values to create a life worth living." },
      { letter: "B", word: "Build mastery", instruction: "Engage in one activity every day that makes you feel competent and capable. This builds your sense of control and confidence over your life." },
      { letter: "C", word: "Cope ahead", instruction: "Identify highly challenging situations in advance and mentally rehearse your response. Rehearse exactly how you will practice skills under pressure." }
    ]
  },
  {
    id: "please",
    name: "PLEASE",
    pillar: "emotion",
    subtitle: "Regulate your physical body.",
    when_to_use: ["physical vulnerability", "low energy", "body check-in"],
    steps: [
      { letter: "P", word: "Treat physical illness", instruction: "Attend to your body. See a doctor when sick or injured, and take prescribed medications. Physical pain directly lowers emotional resilience." },
      { letter: "L", word: "Balanced eating", instruction: "Maintain a structured diet. Do not eat too much or too little. Avoid food patterns that trigger anxiety or mood swings." },
      { letter: "E", word: "Avoid mood-altering substances", instruction: "Limit or avoid alcohol, recreational drugs, and excess caffeine. These substances disrupt emotional baseline levels and trigger irritability." },
      { letter: "A", word: "Balanced sleep", instruction: "Establish consistent sleep schedules. Sleep deprivation heightens emotional reactivity and vulnerability. Aim for 7-9 hours nightly." },
      { letter: "S", word: "Get exercise", instruction: "Move your body daily. Even a 20-minute walk can release endorphins and reduce cortisol levels, helping stabilize your baseline mood." },
      { letter: "E", word: "Build mastery", instruction: "Reinforce physical strength and capability. Treat your body with respect and care to support your mental wellness." }
    ]
  },
  {
    id: "vitals",
    name: "VITALS",
    pillar: "emotion",
    subtitle: "A self-compassion toolkit for intense moments.",
    when_to_use: ["self-criticism", "overwhelm", "difficult tasks"],
    steps: [
      { letter: "V", word: "Validate yourself", instruction: "Acknowledge your emotions. Your feelings make complete sense given your circumstances and history. Treat your experience with validation, not criticism." },
      { letter: "I", word: "Imagine success", instruction: "Visualize yourself handling challenging moments with ease and steadiness. Rehearsing success prepares your brain for positive execution." },
      { letter: "T", word: "Take small steps", instruction: "Break large goals or overwhelming feelings into tiny, actionable pieces. One step at a time is enough to create movement." },
      { letter: "A", word: "Applaud yourself", instruction: "Practice self-recognition. Notice and praise yourself for your efforts and progress, no matter how small they might seem to others." },
      { letter: "L", word: "Lighten the load", instruction: "Practice self-compassion by lowering demands when you are highly distressed. Say no to non-essential obligations to conserve energy." },
      { letter: "S", word: "Sweeten the pot", instruction: "Reward yourself for trying. Add small, positive reinforcers to encourage yourself along the path of skill practice." }
    ]
  }
];
