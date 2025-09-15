import { ResumeData } from '../../types/Experience';

export interface ResumeDataSource {
  fetchResumeData(): Promise<ResumeData>;
}
