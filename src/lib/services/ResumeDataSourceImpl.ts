import { ResumeDataSource } from './ResumeDataSource';
import { ResumeData } from '../../types/Experience';

export class ResumeDataSourceImpl implements ResumeDataSource {
  async fetchResumeData(): Promise<ResumeData> {
    try {
      const response = await fetch('/json/AnugrahSuryaPutra_resume.json');
      if (!response.ok) {
        throw new Error(`Failed to fetch resume: ${response.statusText}`);
      }
      const data: ResumeData = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching resume data:', error);
      throw new Error('Failed to fetch resume data');
    }
  }
}
