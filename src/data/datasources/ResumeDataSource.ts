import { ResumeData, Experience } from '../../domain/entities/Experience';

export interface ResumeDataSource {
  fetchResumeData(): Promise<ResumeData>;
}
