import { ResumeData, Education, Language, Experience } from "./types";
import { fetchWithTimeout, retryWithBackoff, FetchError } from "@/lib/utils";
import { unstable_cache } from "next/cache";

interface ApiProfileUrl {
  id: string;
  profile_id: string;
  label: string;
  url: string;
}

interface ApiProfile {
  id: string;
  name: string;
  about: string;
  email: string;
  phone: string;
  address: string;
  url: ApiProfileUrl[];
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

interface ApiSkill {
  id: string;
  profile_id: string;
  technologies: string[];
  tools: string[];
  soft_skills: string[];
  hard_skills: string[];
}

interface ApiLanguage {
  id: string;
  profile_id: string;
  language: string;
  proficiency: string;
}

interface ApiEducation {
  id: string;
  profile_id: string;
  school: string;
  degree: string;
  field_of_study: string;
  gpa: number;
  start_date: string;
  graduation_date: string;
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

async function fetchProfile(): Promise<ApiProfile> {
  const { baseUrl, profileId } = getBaseUrlAndProfileId();
  const url = `${baseUrl}/api/v1/profile/${profileId}/`;
  return retryWithBackoff(
    async () => {
      try {
        const response = await fetchWithTimeout(url, { headers: getHeaders() }, 10000);
        if (!response.ok) {
          throw new FetchError(`Failed to fetch profile: ${response.statusText}`, response.status, response.statusText, url);
        }
        const result: ApiResponse<ApiProfile> = await response.json();
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
        const response = await fetchWithTimeout(url, { headers: getHeaders() }, 10000);
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

async function fetchSkills(): Promise<ApiSkill> {
  const { baseUrl, profileId } = getBaseUrlAndProfileId();
  const url = `${baseUrl}/api/v1/skill/${profileId}/`;
  return retryWithBackoff(
    async () => {
      try {
        const response = await fetchWithTimeout(url, { headers: getHeaders() }, 10000);
        if (!response.ok) {
          throw new FetchError(`Failed to fetch skills: ${response.statusText}`, response.status, response.statusText, url);
        }
        const result: ApiResponse<ApiSkill> = await response.json();
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

async function fetchLanguages(): Promise<ApiLanguage[]> {
  const { baseUrl, profileId } = getBaseUrlAndProfileId();
  const url = `${baseUrl}/api/v1/language/${profileId}/`;
  return retryWithBackoff(
    async () => {
      try {
        const response = await fetchWithTimeout(url, { headers: getHeaders() }, 10000);
        if (!response.ok) {
          throw new FetchError(`Failed to fetch languages: ${response.statusText}`, response.status, response.statusText, url);
        }
        const result: ApiResponse<ApiLanguage[]> = await response.json();
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

async function fetchEducation(): Promise<ApiEducation[]> {
  const { baseUrl, profileId } = getBaseUrlAndProfileId();
  const url = `${baseUrl}/api/v1/education/${profileId}/`;
  return retryWithBackoff(
    async () => {
      try {
        const response = await fetchWithTimeout(url, { headers: getHeaders() }, 10000);
        if (!response.ok) {
          throw new FetchError(`Failed to fetch education: ${response.statusText}`, response.status, response.statusText, url);
        }
        const result: ApiResponse<ApiEducation[]> = await response.json();
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

export const getResumeData = unstable_cache(
  async (): Promise<ResumeData> => {
    const [profileRes, experiencesRes, skillsRes, languagesRes, educationRes] =
      await Promise.all([
        fetchProfile(),
        fetchExperiences(),
        fetchSkills(),
        fetchLanguages(),
        fetchEducation(),
      ]);

    const linkedin =
      profileRes.url.find(
        (u: ApiProfileUrl) => u.label.toLowerCase() === "linkedin",
      )?.url || "";

    const experience: Experience[] = experiencesRes.map((exp: ApiExperience) => ({
      company: exp.company,
      location: exp.location,
      position: exp.position,
      period: formatPeriod(exp.start_date, exp.end_date),
      responsibilities: exp.description,
    }));

    const education: Education[] = educationRes.map((edu: ApiEducation) => ({
      school: edu.school,
      degree: edu.degree,
      fieldOfStudy: edu.field_of_study,
      gpa: edu.gpa,
      startDate: edu.start_date,
      graduationDate: edu.graduation_date,
    }));

    const languages: Language[] = languagesRes.map((lang: ApiLanguage) => ({
      name: lang.language,
      proficiency: lang.proficiency,
    }));

    const skills = {
      technologies: skillsRes.technologies,
      tools: skillsRes.tools,
      soft_skills: skillsRes.soft_skills,
    };

    return {
      name: profileRes.name,
      summary: profileRes.about,
      email: profileRes.email,
      phone: profileRes.phone,
      location: profileRes.address,
      linkedin,
      portfolio: "https://downormal.dev/",
      experience,
      skills,
      education,
      languages,
    };
  },
  ["resume-data"],
  { revalidate: 3600, tags: ["resume"] }
);

export async function getRecentExperiences(limit: number = 3): Promise<Experience[]> {
  const data = await getResumeData();
  return data.experience.slice(0, limit);
}
