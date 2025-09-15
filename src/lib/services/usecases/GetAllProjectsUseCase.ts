import { ProjectRepository } from '../repositories/ProjectRepository';
import { ProjectsData } from '../../../types/Project';

export class GetAllProjectsUseCase {
  constructor(private projectRepository: ProjectRepository) {}

  async execute(): Promise<ProjectsData> {
    return this.projectRepository.getAllProjects();
  }
}