import { ResumeData, Experience } from '../domain/Experience';

export interface ResumeRepository {
  getResumeData(): Promise<ResumeData>;
  getExperiences(): Promise<Experience[]>;
  getRecentExperiences(limit: number): Promise<Experience[]>;
}