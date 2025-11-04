export interface Experience {
  company: string;
  location: string;
  position: string;
  period: string;
  responsibilities: string[];
}

export interface ResumeData {
  name: string;
  summary: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  portfolio: string;
  experience: Experience[];
  skills: {
    technologies: string[];
    tools: string[];
    soft_skills: string[];
    languages: string[];
  };
}
