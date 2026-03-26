import { ProjectDataSource } from './ProjectDataSource';
import { ProjectsData, Project } from '../domain/Project';
import { fetchWithTimeout, retryWithBackoff, FetchError } from '@/lib/utils';

interface ApiProject {
  id: string;
  profile_id: string;
  title: string;
  description: string[];
  tech_stacks: string[];
  live_demo_url: string;
  github_repo_url: string;
  is_live: boolean;
  is_nda: boolean;
  is_featured: boolean;
  image_url: string;
  company: string;
  start_date: string;
  end_date: string | null;
  is_present: boolean;
  location: string;
}

interface ApiResponse {
  data: ApiProject[];
  message: string;
  status: number;
}

function formatPeriod(startDate: string, endDate: string | null, isPresent: boolean): string {
  const formatMonthYear = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const start = formatMonthYear(startDate);

  if (isPresent || endDate === null) {
    return `${start} - Present`;
  }

  const end = formatMonthYear(endDate);
  return `${start} - ${end}`;
}

function transformProject(apiProject: ApiProject): Project {
  return {
    title: apiProject.title,
    description: apiProject.description.join(' '),
    techStacks: apiProject.tech_stacks,
    liveDemo: apiProject.live_demo_url,
    github: apiProject.github_repo_url,
    isLive: apiProject.is_live,
    isNDA: apiProject.is_nda,
    isFeatured: apiProject.is_featured,
    image: apiProject.image_url,
    company: apiProject.company,
    period: formatPeriod(apiProject.start_date, apiProject.end_date, apiProject.is_present),
    location: apiProject.location,
  };
}

export class ApiProjectDataSourceImpl implements ProjectDataSource {
  private profileId: string;
  private baseUrl: string;

  constructor() {
    this.profileId = process.env.NEXT_PUBLIC_PROFILE_ID || '';
    this.baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';

    if (!this.profileId) {
      throw new Error('NEXT_PUBLIC_PROFILE_ID is not defined');
    }
    if (!this.baseUrl) {
      throw new Error('NEXT_PUBLIC_API_BASE_URL is not defined');
    }
  }

  async fetchProjects(): Promise<ProjectsData> {
    const url = `${this.baseUrl}/api/v1/project/${this.profileId}`;
    
    return retryWithBackoff(async () => {
      try {
        const response = await fetchWithTimeout(
          url,
          { headers: this.getHeaders() },
          10000 // 10 second timeout
        );

        if (!response.ok) {
          throw new FetchError(
            `Failed to fetch projects: ${response.statusText}`,
            response.status,
            response.statusText,
            url
          );
        }

        const result: ApiResponse = await response.json();
        const projects = result.data.map(transformProject);

        return { projects };
      } catch (error) {
        if (error instanceof FetchError) {
          throw error;
        }
        throw new FetchError(
          error instanceof Error ? error.message : 'Unknown error during fetch',
          undefined,
          undefined,
          url
        );
      }
    }, 3, 1000); // 3 retries with 1s base delay
  }

  private getHeaders(): HeadersInit {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    return headers;
  }
}
