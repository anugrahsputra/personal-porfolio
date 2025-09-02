import { ResumeRepository } from '../repositories/ResumeRepository';
import { Experience } from '../entities/Experience';

export class GetRecentExperiencesUseCase {
  constructor(private resumeRepository: ResumeRepository) {}

  async execute(limit: number = 3): Promise<Experience[]> {
    return this.resumeRepository.getRecentExperiences(limit);
  }
}
