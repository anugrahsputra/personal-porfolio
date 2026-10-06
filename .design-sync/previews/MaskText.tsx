import { MaskText, MotionGlobalConfig } from "downormal-ui";

if (navigator.webdriver) MotionGlobalConfig.instantAnimations = true;

export function HeroName() {
  return (
    <div className="p-6">
      <MaskText
        as="h1"
        by="letter"
        text="Anugrah Surya Putra"
        immediate
        delay={0.3}
        className="type-hero-name md:whitespace-nowrap"
      />
    </div>
  );
}

export function SectionHeading() {
  return (
    <div className="p-6">
      <MaskText as="h2" text="Selected work" immediate className="type-section" />
    </div>
  );
}

export function Lead() {
  return (
    <div className="p-6">
      <MaskText
        as="p"
        immediate
        text="Skilled in scalable architecture design, CI/CD automation, and production stability. Collaborative team player with a track record of delivering business-critical solutions."
        className="type-lead max-w-[32ch] indent-[clamp(2.5rem,3.5vw,3rem)]"
      />
    </div>
  );
}
