import Hero from "@/components/sections/Hero";
import WhereToStart from "@/components/sections/WhereToStart";
import SkillInFocus from "@/components/sections/SkillInFocus";
import WhatIsBPD from "@/components/sections/WhatIsBPD";
import YouAreNotAlone from "@/components/sections/YouAreNotAlone";
import WhatIsDBT from "@/components/sections/WhatIsDBT";
import TheApproach from "@/components/sections/TheApproach";
import Testimonials from "@/components/sections/Testimonials";
import CTABanner from "@/components/sections/CTABanner";

export default function Home() {
  return (
    <main>
      <Hero />
      <WhereToStart />
      <WhatIsBPD />
      <YouAreNotAlone />
      <SkillInFocus />
      <WhatIsDBT />
      <TheApproach />
      <Testimonials />
      <CTABanner />
    </main>
  );
}
