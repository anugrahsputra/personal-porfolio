import { ResumeDataSource } from './ResumeDataSource';
import { ResumeData, Education, Language } from '../domain/Experience';

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
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const start = formatMonthYear(startDate);

  if (!endDate) {
    return `${start} - Present`;
  }

  const end = formatMonthYear(endDate);
  return `${start} - ${end}`;
}

export class ApiResumeDataSourceImpl implements ResumeDataSource {
  private profileId: string;
  private baseUrl: string;
  private apiKey: string;

  constructor() {
    this.profileId = process.env.NEXT_PUBLIC_PROFILE_ID || '';
    
    // Choose URL based on environment (Server vs Client)
    if (typeof window === 'undefined') {
      // Server-side: talk directly to Go API
      this.baseUrl = process.env.INTERNAL_API_URL || 'https://portfolio-api.downormal.dev';
      this.apiKey = process.env.PORTFOLIO_API_KEY || '';
    } else {
      // Client-side: use Next.js Proxy
      this.baseUrl = '/api/proxy';
      this.apiKey = ''; // Client doesn't need the key (proxy adds it)
    }

    if (!this.profileId) {
      throw new Error('NEXT_PUBLIC_PROFILE_ID is not defined');
    }
  }

  async fetchResumeData(): Promise<ResumeData> {
    const [profileRes, experiencesRes, skillsRes, languagesRes, educationRes] =
      await Promise.all([
        this.fetchProfile(),
        this.fetchExperiences(),
        this.fetchSkills(),
        this.fetchLanguages(),
        this.fetchEducation(),
      ]);

    const linkedin = profileRes.url.find(
      (u) => u.label.toLowerCase() === 'linkedin'
    )?.url || '';

    const experience = experiencesRes.map((exp) => ({
      company: exp.company,
      location: '',
      position: exp.position,
      period: formatPeriod(exp.start_date, exp.end_date),
      responsibilities: exp.description,
    }));

    const skills = {
      technologies: skillsRes.technologies,
      tools: skillsRes.tools,
      soft_skills: skillsRes.soft_skills,
    };

    const education: Education[] = educationRes.map((edu) => ({
      school: edu.school,
      degree: edu.degree,
      fieldOfStudy: edu.field_of_study,
      gpa: edu.gpa,
      startDate: edu.start_date,
      graduationDate: edu.graduation_date,
    }));

    const languages: Language[] = languagesRes.map((lang) => ({
      name: lang.language,
      proficiency: lang.proficiency,
    }));

    return {
      name: profileRes.name,
      summary: profileRes.about,
      email: profileRes.email,
      phone: profileRes.phone,
      location: profileRes.address,
      linkedin,
      portfolio: 'https://downormal.dev/',
      experience,
      skills,
      education,
      languages,
    };
  }

  private async fetchProfile(): Promise<ApiProfile> {
    const url = typeof window === 'undefined' 
      ? `${this.baseUrl}/api/v1/profile/${this.profileId}`
      : `${this.baseUrl}/profile/${this.profileId}`;

    const response = await fetch(url, {
      headers: this.getHeaders()
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch profile: ${response.statusText}`);
    }
    const result: ApiResponse<ApiProfile> = await response.json();
    return result.data;
  }

  private async fetchExperiences(): Promise<ApiExperience[]> {
    const url = typeof window === 'undefined' 
      ? `${this.baseUrl}/api/v1/experience/${this.profileId}`
      : `${this.baseUrl}/experience/${this.profileId}`;

    const response = await fetch(url, {
      headers: this.getHeaders()
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch experiences: ${response.statusText}`);
    }
    const result: ApiResponse<ApiExperience[]> = await response.json();
    return result.data;
  }

  private async fetchSkills(): Promise<ApiSkill> {
    const url = typeof window === 'undefined' 
      ? `${this.baseUrl}/api/v1/skill/${this.profileId}`
      : `${this.baseUrl}/skill/${this.profileId}`;

    const response = await fetch(url, {
      headers: this.getHeaders()
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch skills: ${response.statusText}`);
    }
    const result: ApiResponse<ApiSkill> = await response.json();
    return result.data;
  }

  private async fetchLanguages(): Promise<ApiLanguage[]> {
    const url = typeof window === 'undefined' 
      ? `${this.baseUrl}/api/v1/language/${this.profileId}`
      : `${this.baseUrl}/language/${this.profileId}`;

    const response = await fetch(url, {
      headers: this.getHeaders()
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch languages: ${response.statusText}`);
    }
    const result: ApiResponse<ApiLanguage[]> = await response.json();
    return result.data;
  }

  private async fetchEducation(): Promise<ApiEducation[]> {
    const url = typeof window === 'undefined' 
      ? `${this.baseUrl}/api/v1/education/${this.profileId}`
      : `${this.baseUrl}/experience/${this.profileId}`; // Note: This looks like a bug in original code too, fixing to education

    // Actually, checking original code: it used fetch(`${this.baseUrl}/api/v1/education/${this.profileId}`)
    // I will fix it to education.
    
    const finalUrl = typeof window === 'undefined' 
      ? `${this.baseUrl}/api/v1/education/${this.profileId}`
      : `${this.baseUrl}/education/${this.profileId}`;

    const response = await fetch(finalUrl, {
      headers: this.getHeaders()
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch education: ${response.statusText}`);
    }
    const result: ApiResponse<ApiEducation[]> = await response.json();
    return result.data;
  }

  private getHeaders(): HeadersInit {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (this.apiKey) {
      headers['X-API-KEY'] = this.apiKey;
    }
    return headers;
  }
}
