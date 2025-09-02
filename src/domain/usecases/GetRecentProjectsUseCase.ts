import { ProjectRepository } from '../repositories/ProjectRepository';
import { Project } from '../entities/Project';

export class GetRecentProjectsUseCase {
  constructor(private projectRepository: ProjectRepository) {}

  async execute(limit: number = 4): Promise<Project[]> {
    return this.projectRepository.getRecentProjects(limit);
  }
}
