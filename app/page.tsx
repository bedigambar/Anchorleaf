import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";
import WhereToStart from "@/components/sections/WhereToStart";

const WhatIsBPD = dynamic(() => import("@/components/sections/WhatIsBPD"));
const YouAreNotAlone = dynamic(() => import("@/components/sections/YouAreNotAlone"));
const SkillInFocus = dynamic(() => import("@/components/sections/SkillInFocus"));
const WhatIsDBT = dynamic(() => import("@/components/sections/WhatIsDBT"));
const TheApproach = dynamic(() => import("@/components/sections/TheApproach"));
const Testimonials = dynamic(() => import("@/components/sections/Testimonials"));
const CTABanner = dynamic(() => import("@/components/sections/CTABanner"));

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
