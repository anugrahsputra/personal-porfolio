import { ProjectsData } from '../../types/Project';

export interface ProjectDataSource {
  fetchProjects(): Promise<ProjectsData>;
}
