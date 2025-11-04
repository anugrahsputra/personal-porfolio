import { ResumeRepository } from '../repositories/ResumeRepository';
import { Experience } from '../domain/Experience';

export class GetRecentExperiencesUseCase {
  constructor(private resumeRepository: ResumeRepository) {}

  async execute(limit: number): Promise<Experience[]> {
    return this.resumeRepository.getRecentExperiences(limit);
  }
}