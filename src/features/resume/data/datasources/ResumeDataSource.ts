import { ResumeData } from '../domain/Experience';

export interface ResumeDataSource {
  fetchResumeData(): Promise<ResumeData>;
}
