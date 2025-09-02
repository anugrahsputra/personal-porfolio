export interface Project {
  title: string;
  description: string;
  techStacks: string[];
  liveDemo: string;
  github: string;
  isLive: boolean;
  isNDA: boolean;
  isFeatured: boolean;
  image: string;
  company: string;
  period: string;
  location: string;
}

export interface ProjectsData {
  projects: Project[];
}
