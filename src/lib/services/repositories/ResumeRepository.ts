import { ResumeData, Experience } from '../../../types/Experience';

export interface ResumeRepository {
  getResumeData(): Promise<ResumeData>;
  getExperiences(): Promise<Experience[]>;
  getRecentExperiences(limit: number): Promise<Experience[]>;
}