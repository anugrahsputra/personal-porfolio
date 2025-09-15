import { ProjectRepository } from '../repositories/ProjectRepository';
import { Project } from '../../../types/Project';

export class GetRecentProjectsUseCase {
  constructor(private projectRepository: ProjectRepository) {}

  async execute(limit: number): Promise<Project[]> {
    return this.projectRepository.getRecentProjects(limit);
  }
}