import { MotionGlobalConfig, Reveal, SectionLabel } from "downormal-ui";

if (navigator.webdriver) MotionGlobalConfig.instantAnimations = true;

export function FadeUp() {
  return (
    <div className="p-6">
      <Reveal immediate>
        <SectionLabel>Contact</SectionLabel>
        <p className="mt-8 max-w-[22ch] indent-[clamp(2.5rem,3.5vw,3rem)] text-[clamp(1.5rem,2.4vw,2.125rem)] leading-[1.2] tracking-[-0.025em]">
          Available for freelance mobile work and full-time roles.
        </p>
      </Reveal>
    </div>
  );
}

export function StaggeredList() {
  const videos = [
    ["01", "Late night coding.. | Part 3", "Sep 27, 2026"],
    ["02", "Late night short coding | Part 2", "Sep 25, 2026"],
    ["03", "Late night short coding | Part 1", "Sep 20, 2026"],
  ];
  return (
    <ol className="max-w-md p-6">
      {videos.map(([n, title, date], index) => (
        <Reveal
          as="li"
          key={n}
          immediate
          delay={0.16 + index * 0.06}
          className="grid grid-cols-[2.5rem_minmax(0,1fr)] border-t py-4 first:border-t-0"
        >
          <span className="pt-1 text-xs/4 text-foreground/60">{n}</span>
          <span>
            <span className="block text-base/6">{title}</span>
            <span className="mt-1 block text-sm/5 text-foreground/60">{date}</span>
          </span>
        </Reveal>
      ))}
    </ol>
  );
}
