import { Project, ProjectsData } from '../entities/Project';

export interface ProjectRepository {
  getAllProjects(): Promise<ProjectsData>;
  getFeaturedProjects(): Promise<Project[]>;
  getRecentProjects(limit: number): Promise<Project[]>;
}
