import { Project, ProjectsData } from '../../domain/entities/Project';

export interface ProjectDataSource {
  fetchProjects(): Promise<ProjectsData>;
}
