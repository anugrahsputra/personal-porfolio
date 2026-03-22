"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useResumeData } from "@/features/resume/hooks/useResume";

interface Skills {
  technologies: string[];
  tools: string[];
  soft_skills: string[];
}

interface Language {
  name: string;
  proficiency: string;
}

interface ResumeData {
  summary: string;
  skills: Skills;
  languages: Language[];
}

interface AboutProps {
  initialData?: ResumeData;
}

const About = ({ initialData }: AboutProps) => {
  const { resumeData: fetchedResumeData, loading } = useResumeData();
  const data = initialData || fetchedResumeData;

  if (loading && !data) {
    return (
      <section id="about" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              About Me
            </h2>
            <Separator className="w-24 mx-auto" />
          </div>
          <div className="animate-pulse">
            <div className="h-6 bg-muted rounded mb-4"></div>
            <div className="h-4 bg-muted rounded mb-2"></div>
            <div className="h-4 bg-muted rounded mb-4"></div>
            <div className="h-4 bg-muted rounded mb-2"></div>
            <div className="h-4 bg-muted rounded"></div>
          </div>
        </div>
      </section>
    );
  }

  if (!data) return null;

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            About Me
          </h2>
          <Separator className="w-24 mx-auto" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Personal Information */}
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

          {/* Right Column - Skills */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-foreground mb-6">
              Skills & Technologies
            </h3>

            {/* Technologies */}
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-3">
                Technologies
              </h4>
              <div className="flex flex-wrap gap-2">
                {data.skills.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary" className="text-sm">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Tools */}
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-3">
                Tools & Platforms
              </h4>
              <div className="flex flex-wrap gap-2">
                {data.skills.tools.map((tool) => (
                  <Badge key={tool} variant="outline" className="text-sm">
                    {tool}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Soft Skills */}
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-3">
                Soft Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {data.skills.soft_skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-3">
                Languages
              </h4>
              <div className="flex flex-wrap gap-2">
                {data.languages.map((lang) => (
                  <Badge key={lang.name} variant="outline" className="text-sm">
                    {lang.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
