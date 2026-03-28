import { useState, useEffect } from 'react';
import { getAllProjects, getRecentProjects } from '../api';
import { Project, ProjectsData } from '../types';

export const useAllProjects = (initialData?: ProjectsData) => {
  const [projectsData, setProjectsData] = useState<ProjectsData | null>(initialData || null);
  const [loading, setLoading] = useState(!initialData);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) return; // Skip fetch if we already have data

    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        // This will now use the Proxy when called on the client
        const data = await getAllProjects();
        setProjectsData(data);
      } catch (err) {
        console.error('Error fetching projects on client:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [initialData]);

  return { projectsData, loading, error };
};

export const useRecentProjects = (limit: number = 4, initialData?: Project[]) => {
  const [projects, setProjects] = useState<Project[]>(initialData || []);
  const [loading, setLoading] = useState(!initialData || initialData.length === 0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData && initialData.length > 0) return; // Skip fetch if we already have data

    const fetchRecentProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        // This will now use the Proxy when called on the client
        const data = await getRecentProjects(limit);
        setProjects(data);
      } catch (err) {
        console.error('Error fetching recent projects on client:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch recent projects');
      } finally {
        setLoading(false);
      }
    };

    fetchRecentProjects();
  }, [limit, initialData]);

  return { projects, loading, error };
};
