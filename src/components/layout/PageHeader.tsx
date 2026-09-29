import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { MaskText, Reveal } from "@/components/motion";

interface PageHeaderProps {
  title: string;
  intro: string;
}

export default function PageHeader({ title, intro }: PageHeaderProps) {
  return (
    <header className="page-container pt-[clamp(2rem,3.5vw,3.5rem)] pb-[clamp(2.5rem,4.5vw,4rem)]">
      <Reveal immediate>
        <Breadcrumbs items={[{ label: title, current: true }]} />
      </Reveal>
      <MaskText
        as="h1"
        text={title}
        immediate
        delay={0.1}
        className="type-hero-name mt-6"
      />
      <Reveal immediate delay={0.4}>
        <p className="mt-4 max-w-[40ch] text-[clamp(1.125rem,1.6vw,1.5rem)] leading-[1.3] tracking-[-0.02em] text-foreground/70">
          {intro}
        </p>
      </Reveal>
    </header>
  );
}
