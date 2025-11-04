import { ResumeRepository } from './ResumeRepository';
import { ResumeDataSource } from '../datasources/ResumeDataSource';
import { ResumeData, Experience } from '../domain/Experience';

export class ResumeRepositoryImpl implements ResumeRepository {
  constructor(private dataSource: ResumeDataSource) {}

  async getResumeData(): Promise<ResumeData> {
    return this.dataSource.fetchResumeData();
  }

  async getExperiences(): Promise<Experience[]> {
    const data = await this.dataSource.fetchResumeData();
    return data.experience;
  }

  async getRecentExperiences(limit: number): Promise<Experience[]> {
    const data = await this.dataSource.fetchResumeData();
    return data.experience.slice(0, limit);
  }
}
