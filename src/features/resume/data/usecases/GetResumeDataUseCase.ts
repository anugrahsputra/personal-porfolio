import { ResumeRepository } from '../repositories/ResumeRepository';
import { ResumeData } from '../domain/Experience';

export class GetResumeDataUseCase {
  constructor(private resumeRepository: ResumeRepository) {}

  async execute(): Promise<ResumeData> {
    return this.resumeRepository.getResumeData();
  }
}