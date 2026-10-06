import { MotionGlobalConfig, RevealLine, SectionLabel } from "downormal-ui";

if (navigator.webdriver) MotionGlobalConfig.instantAnimations = true;

export function SectionTop() {
  return (
    <div className="p-6">
      <RevealLine />
      <div className="grid gap-y-8 pt-6 md:grid-cols-2 md:gap-x-[clamp(2rem,4vw,4rem)]">
        <SectionLabel>Experience</SectionLabel>
        <div>
          <h3 className="text-2xl/[30px] tracking-[-0.02em]">Mobile Engineer</h3>
          <p className="mt-1 text-sm/5 text-muted-foreground">
            PT Bangun Rancang Indonesia Kita (BRIK) · South Jakarta, Jakarta, Indonesia
          </p>
        </div>
      </div>
    </div>
  );
}
