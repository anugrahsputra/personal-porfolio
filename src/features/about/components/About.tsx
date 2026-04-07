import { ResumeData } from "@/features/resume/types";

interface AboutProps {
  initialData: ResumeData;
}

export default function About({ initialData }: AboutProps) {
  const data = initialData;

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            About Me
          </h2>
          <div className="w-24 mx-auto my-4 h-px bg-border" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-foreground mb-6">
              Who I Am
            </h3>
            <p className="text-foreground/70 leading-relaxed mb-4 text-lg">
              {data.summary}
            </p>
            <p className="text-foreground/70 leading-relaxed">
              When I&apos;m not coding, you can find me exploring new mobile
              technologies, contributing to open-source projects, or sharing
              knowledge with the developer community.
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-foreground mb-6">
              Skills & Technologies
            </h3>

            <div>
              <h4 className="text-lg font-semibold text-foreground mb-3">
                Technologies
              </h4>
              <div className="flex flex-wrap gap-2">
                {data.skills.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-foreground mb-3">
                Tools & Platforms
              </h4>
              <div className="flex flex-wrap gap-2">
                {data.skills.tools.map((tool) => (
                  <span
                    key={tool}
                    className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground hover:bg-accent hover:text-accent-foreground"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-foreground mb-3">
                Soft Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {data.skills.soft_skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-foreground mb-3">
                Languages
              </h4>
              <div className="flex flex-wrap gap-2">
                {data.languages.map((lang) => (
                  <span
                    key={lang.name}
                    className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground hover:bg-accent hover:text-accent-foreground"
                  >
                    {lang.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
