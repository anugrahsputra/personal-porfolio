import { ResumeDataSource } from './ResumeDataSource';
import { ResumeData } from '../domain/Experience';
import { supabase } from '@/lib/supabase';

export class ResumeDataSourceImpl implements ResumeDataSource {
  async fetchResumeData(): Promise<ResumeData> {
    try {
      const { data, error } = await supabase
        .from('resumes')
        .select(
          `
          *,
          experience:experiences (*),
          projects (*),
          skills (*)
        `
        )
        .single();

      if (error) {
        throw error;
      }

      const transformedData = {
        ...data,
        skills: data.skills[0],
        portfolio: "https://itsyourboiputra.is-a.dev/",
      };

      return transformedData as ResumeData;
    } catch (error) {
      console.error('Error fetching resume data:', error);
      throw new Error('Failed to fetch resume data');
    }
  }
}
