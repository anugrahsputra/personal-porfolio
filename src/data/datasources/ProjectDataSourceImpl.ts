import { ProjectDataSource } from './ProjectDataSource';
import { Project, ProjectsData } from '../../domain/entities/Project';

export class ProjectDataSourceImpl implements ProjectDataSource {
  async fetchProjects(): Promise<ProjectsData> {
    try {
      const response = await fetch('/json/projects.json');
      if (!response.ok) {
        throw new Error(`Failed to fetch projects: ${response.statusText}`);
      }
      const data: ProjectsData = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching projects data:', error);
      throw new Error('Failed to fetch projects data');
    }
  }
}
