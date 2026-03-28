import { useState, useEffect } from 'react';
import { getResumeData, getRecentExperiences } from '../api';
import { ResumeData, Experience } from '../types';

export const useResumeData = (initialData?: ResumeData) => {
  const [resumeData, setResumeData] = useState<ResumeData | null>(initialData || null);
  const [loading, setLoading] = useState(!initialData);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) return; // Skip fetch if we already have data

    const fetchResumeData = async () => {
      try {
        setLoading(true);
        setError(null);
        // This will now use the Proxy when called on the client
        const data = await getResumeData();
        setResumeData(data);
      } catch (err) {
        console.error('Error fetching resume data on client:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch resume data');
      } finally {
        setLoading(false);
      }
    };

    fetchResumeData();
  }, [initialData]);

  return { resumeData, loading, error };
};

export const useRecentExperiences = (limit: number = 3, initialData?: Experience[]) => {
  const [experiences, setExperiences] = useState<Experience[]>(initialData || []);
  const [loading, setLoading] = useState(!initialData || initialData.length === 0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData && initialData.length > 0) return; // Skip fetch if we already have data

    const fetchRecentExperiences = async () => {
      try {
        setLoading(true);
        setError(null);
        // This will now use the Proxy when called on the client
        const data = await getRecentExperiences(limit);
        setExperiences(data);
      } catch (err) {
        console.error('Error fetching recent experiences on client:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch recent experiences');
      } finally {
        setLoading(false);
      }
    };

    fetchRecentExperiences();
  }, [limit, initialData]);

  return { experiences, loading, error };
};
