import { Badge } from "@/components/ui/badge";
import SectionLabel from "@/components/SectionLabel";
import { MaskText, Reveal, RevealLine } from "@/components/motion";
import { ResumeData } from "@/features/resume/types";

interface AboutProps {
  initialData: ResumeData;
}

function Chips({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <li key={item}>
          <Badge variant="secondary">{item}</Badge>
        </li>
      ))}
    </ul>
  );
}

export default function About({ initialData }: AboutProps) {
  const data = initialData;
  // Hero shows the first sentence of the summary, so it isn't repeated here
  const lead = data.summary.split(/(?<=\.)\s+/).slice(1).join(" ");

  const rows = [
    {
      label: "Technologies",
      value: <Chips items={data.skills.technologies} />,
      show: data.skills.technologies.length > 0,
    },
    {
      label: "Tools",
      value: <Chips items={data.skills.tools} />,
      show: data.skills.tools.length > 0,
    },
    {
      label: "Languages",
      value: data.languages.map((lang) => (
        <p key={lang.name}>
          {lang.name}, {lang.proficiency.toLowerCase()}
        </p>
      )),
      show: data.languages.length > 0,
    },
    {
      label: "Education",
      value: data.education.map((edu) => (
        <p key={edu.school}>
          {edu.degree}, {edu.fieldOfStudy}
          <br />
          <span className="text-foreground/60">
            {edu.school}, {new Date(edu.startDate).getFullYear()} to{" "}
            {new Date(edu.graduationDate).getFullYear()}
          </span>
        </p>
      )),
      show: data.education.length > 0,
    },
  ].filter((row) => row.show);

  return (
    <section
      id="about"
      className="pt-[clamp(4.5rem,8.5vw,8.5rem)] pb-[clamp(4rem,7vw,7rem)]"
    >
      <div className="page-container">
        <RevealLine />
        <div className="grid gap-y-8 pt-6 md:grid-cols-2 md:gap-x-[clamp(2rem,4vw,4rem)]">
          <Reveal className="md:sticky md:top-24 md:self-start">
            <SectionLabel>About</SectionLabel>
          </Reveal>

          <div className="min-w-0">
            {lead && (
              <MaskText as="p" text={lead} className="type-lead max-w-[32ch] indent-[2.5em]" />
            )}

            <dl className="mt-[clamp(2.5rem,4vw,3.5rem)]">
              {rows.map((row) => (
                <Reveal
                  key={row.label}
                  className="grid gap-2 border-t py-5 first:border-t-0 sm:grid-cols-[160px_minmax(0,1fr)] sm:gap-6"
                >
                  <dt className="text-sm/[22px]">{row.label}</dt>
                  <dd className="space-y-1 text-sm/[22px] text-foreground/70">
                    {row.value}
                  </dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
