import { ProjectRepository } from './ProjectRepository';
import { ProjectDataSource } from '../datasources/ProjectDataSource';
import { Project, ProjectsData } from '../domain/Project';

export class ProjectRepositoryImpl implements ProjectRepository {
  constructor(private dataSource: ProjectDataSource) {}

  async getAllProjects(): Promise<ProjectsData> {
    return this.dataSource.fetchProjects();
  }

  async getFeaturedProjects(): Promise<Project[]> {
    const data = await this.dataSource.fetchProjects();
    return data.projects.filter(project => project.isFeatured);
  }

  async getRecentProjects(limit: number): Promise<Project[]> {
    const data = await this.dataSource.fetchProjects();
    
    // Sort projects by date (newest first)
    const sortedProjects = [...data.projects].sort((a, b) => {
      const getYear = (period: string) => {
        const yearMatch = period.match(/\d{4}/);
        return yearMatch ? parseInt(yearMatch[0]) : 0;
      };
      
      const yearA = getYear(a.period);
      const yearB = getYear(b.period);
      
      if (yearA !== yearB) {
        return yearB - yearA; // Newest year first
      }
      
      // If same year, sort by month (approximate)
      const monthOrder = {
        'Jan': 1, 'Feb': 2, 'Mar': 3, 'Apr': 4, 'May': 5, 'Jun': 6,
        'Jul': 7, 'Aug': 8, 'Sep': 9, 'Oct': 10, 'Nov': 11, 'Dec': 12
      };
      
      const getMonth = (period: string) => {
        const monthMatch = period.match(/^[A-Za-z]{3}/);
        return monthMatch ? monthOrder[monthMatch[0] as keyof typeof monthOrder] || 0 : 0;
      };
      
      return getMonth(b.period) - getMonth(a.period);
    });

    return sortedProjects.slice(0, limit);
  }
}
