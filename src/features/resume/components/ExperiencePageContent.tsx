import { Experience } from "../types";

interface ExperiencePageContentProps {
  experiences: Experience[];
}

export default function ExperiencePageContent({ experiences }: ExperiencePageContentProps) {
  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {experiences.map((experience, index) => (
              <div
                key={index}
                className="border-l-2 border-foreground/20 pl-6 relative"
              >
                <div className="absolute -left-3 top-0 w-6 h-6 bg-background border-2 border-foreground/20 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-foreground/40 rounded-full"></div>
                </div>

                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="text-xl font-semibold text-foreground">
                      {experience.position}
                    </h3>
                    <span className="text-sm text-foreground/60 bg-muted px-3 py-1 rounded-full">
                      {experience.period}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <p className="text-foreground/70 font-medium">
                      {experience.company}
                    </p>
                    <p className="text-foreground/60 text-sm">
                      📍 {experience.location}
                    </p>
                  </div>

                  <ul className="text-foreground/60 text-sm leading-relaxed space-y-2">
                    {experience.responsibilities.map((responsibility, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-foreground/40 mr-2 mt-1">•</span>
                        <span>{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
