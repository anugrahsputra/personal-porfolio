import { ProjectRepository } from '../repositories/ProjectRepository';
import { ProjectsData } from '../entities/Project';

export class GetAllProjectsUseCase {
  constructor(private projectRepository: ProjectRepository) {}

  async execute(): Promise<ProjectsData> {
    return this.projectRepository.getAllProjects();
  }
}
