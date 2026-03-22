import { ProjectDataSource } from './ProjectDataSource';
import { ProjectsData, Project } from '../domain/Project';

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
  async fetchProjects(): Promise<ProjectsData> {
    const profileId = process.env.NEXT_PUBLIC_PROFILE_ID;
    if (!profileId) {
      throw new Error('NEXT_PUBLIC_PROFILE_ID is not defined');
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/project/${profileId}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch projects: ${response.statusText}`);
    }

    const result: ApiResponse = await response.json();
    const projects = result.data.map(transformProject);

    return { projects };
  }
}
