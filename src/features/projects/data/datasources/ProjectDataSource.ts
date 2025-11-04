import { ProjectsData } from '../domain/Project';

export interface ProjectDataSource {
  fetchProjects(): Promise<ProjectsData>;
}
