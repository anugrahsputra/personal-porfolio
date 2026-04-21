import { ProjectsData, Project } from './types';
import { fetchWithTimeout, retryWithBackoff, FetchError } from '@/lib/utils';
import { unstable_cache } from 'next/cache';

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

function getBaseUrlAndProfileId() {
  const profileId = process.env.NEXT_PUBLIC_PROFILE_ID || '';
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';

  if (!profileId) {
    throw new Error('NEXT_PUBLIC_PROFILE_ID is not defined');
  }
  if (!baseUrl) {
    throw new Error('NEXT_PUBLIC_API_BASE_URL is not defined');
  }

  return { baseUrl, profileId };
}

export async function getAllProjects(): Promise<ProjectsData> {
  const { baseUrl, profileId } = getBaseUrlAndProfileId();
  const url = `${baseUrl}/api/v1/project/${profileId}/`;

  return retryWithBackoff(async () => {
    try {
      const response = await fetchWithTimeout(
        url,
        {
          headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36 Next.js/Server'
          },
          next: { revalidate: 60, tags: ['projects'] }
        },
        10000
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
  }, 3, 1000);
}

export async function getRecentProjects(limit: number = 4): Promise<Project[]> {
  const data = await getAllProjects();
  return data.projects.slice(0, limit);
}
