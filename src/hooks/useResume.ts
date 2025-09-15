import { useState, useEffect } from 'react';
import { getResumeDataUseCase, getRecentExperiencesUseCase } from '../lib/services/container';
import { ResumeData, Experience } from '../types/Experience';

export const useResumeData = () => {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getResumeDataUseCase.execute();
        setResumeData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch resume data');
      } finally {
        setLoading(false);
      }
    };

    fetchResumeData();
  }, []);

  return { resumeData, loading, error };
};

export const useRecentExperiences = (limit: number = 3) => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecentExperiences = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getRecentExperiencesUseCase.execute(limit);
        setExperiences(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch recent experiences');
      } finally {
        setLoading(false);
      }
    };

    fetchRecentExperiences();
  }, [limit]);

  return { experiences, loading, error };
};
