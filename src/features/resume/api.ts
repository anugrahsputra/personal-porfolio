import { ResumeData, Education, Language, Experience } from "./types";
import { fetchWithTimeout, retryWithBackoff, FetchError } from "@/lib/utils";

interface ApiResume {
  id: string;
  name: string;
  title: string;
  about: string;
  address: string;
  email: string;
  phone: string;
  urls: { id: string; profile_id: string; label: string; url: string }[];
  skills: {
    id: string;
    profile_id: string;
    tools: string[];
    technologies: string[];
    hard_skills: string[];
    soft_skills: string[];
  }[];
  languages: { id: string; profile_id: string; language: string; proficiency: string }[];
  experiences: {
    id: string;
    profile_id: string;
    company: string;
    position: string;
    description: string[];
    location: string;
    start_date: string;
    end_date: string | null;
    is_present: boolean;
  }[];
  educations: {
    id: string;
    profile_id: string;
    school: string;
    degree: string;
    field_of_study: string;
    gpa: number;
    start_date: string;
    graduation_date: string;
    is_present: boolean;
  }[];
}

interface ApiExperience {
  id: string;
  profile_id: string;
  company: string;
  position: string;
  start_date: string;
  end_date: string;
  description: string[];
  location: string;
}

interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
}

function formatPeriod(startDate: string, endDate: string | null): string {
  const formatMonthYear = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  const start = formatMonthYear(startDate);

  if (!endDate) {
    return `${start} - Present`;
  }

  const end = formatMonthYear(endDate);
  return `${start} - ${end}`;
}

function getBaseUrlAndProfileId() {
  const profileId = process.env.NEXT_PUBLIC_PROFILE_ID || "";
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";

  if (!profileId) {
    throw new Error("NEXT_PUBLIC_PROFILE_ID is not defined");
  }
  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
  }

  return { baseUrl, profileId };
}

const getHeaders = (): HeadersInit => {
  return {
    "Content-Type": "application/json",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36 Next.js/Server",
  };
};

const getNextOptions = (tag: string) => ({
  next: { revalidate: 60, tags: [tag] }
});

async function fetchResume(): Promise<ApiResume> {
  const { baseUrl, profileId } = getBaseUrlAndProfileId();
  const url = `${baseUrl}/api/v1/resume/${profileId}`;
  return retryWithBackoff(
    async () => {
      try {
        const response = await fetchWithTimeout(url, { headers: getHeaders(), ...getNextOptions('resume') }, 10000);
        if (!response.ok) {
          throw new FetchError(`Failed to fetch resume: ${response.statusText}`, response.status, response.statusText, url);
        }
        const result: ApiResponse<ApiResume> = await response.json();
        return result.data;
      } catch (error) {
        if (error instanceof FetchError) throw error;
        throw new FetchError(error instanceof Error ? error.message : "Unknown error", undefined, undefined, url);
      }
    },
    3,
    1000,
  );
}

async function fetchExperiences(): Promise<ApiExperience[]> {
  const { baseUrl, profileId } = getBaseUrlAndProfileId();
  const url = `${baseUrl}/api/v1/experience/${profileId}/`;
  return retryWithBackoff(
    async () => {
      try {
        const response = await fetchWithTimeout(url, { headers: getHeaders(), ...getNextOptions('experiences') }, 10000);
        if (!response.ok) {
          throw new FetchError(`Failed to fetch experiences: ${response.statusText}`, response.status, response.statusText, url);
        }
        const result: ApiResponse<ApiExperience[]> = await response.json();
        return result.data;
      } catch (error) {
        if (error instanceof FetchError) throw error;
        throw new FetchError(error instanceof Error ? error.message : "Unknown error", undefined, undefined, url);
      }
    },
    3,
    1000,
  );
}

export async function getResumeData(): Promise<ResumeData> {
  const resume = await fetchResume();

  const linkedin =
    resume.urls.find(
      (u) => u.label.toLowerCase() === "linkedin",
    )?.url || "";

  const experience: Experience[] = resume.experiences.map((exp) => ({
    company: exp.company,
    location: exp.location,
    position: exp.position,
    period: formatPeriod(exp.start_date, exp.end_date),
    responsibilities: exp.description,
  }));

  const education: Education[] = resume.educations.map((edu) => ({
    school: edu.school,
    degree: edu.degree,
    fieldOfStudy: edu.field_of_study,
    gpa: edu.gpa,
    startDate: edu.start_date,
    graduationDate: edu.graduation_date,
  }));

  const languages: Language[] = resume.languages.map((lang) => ({
    name: lang.language,
    proficiency: lang.proficiency,
  }));

  const skillsData = resume.skills[0];
  const skills = {
    technologies: skillsData?.technologies || [],
    tools: skillsData?.tools || [],
    soft_skills: skillsData?.soft_skills || [],
  };

  return {
    name: resume.name,
    summary: resume.about,
    email: resume.email,
    phone: resume.phone,
    location: resume.address,
    linkedin,
    portfolio: "https://downormal.dev/",
    experience,
    skills,
    education,
    languages,
  };
}

export async function getAllExperiences(): Promise<Experience[]> {
  const experiencesRes = await fetchExperiences();

  return experiencesRes.map((exp: ApiExperience) => ({
    company: exp.company,
    location: exp.location,
    position: exp.position,
    period: formatPeriod(exp.start_date, exp.end_date),
    responsibilities: exp.description,
  }));
}

