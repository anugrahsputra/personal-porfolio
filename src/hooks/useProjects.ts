import { useState, useEffect } from 'react';
import { getAllProjectsUseCase, getRecentProjectsUseCase } from '../lib/services/container';
import { Project, ProjectsData } from '../types/Project';

export const useAllProjects = () => {
  const [projectsData, setProjectsData] = useState<ProjectsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getAllProjectsUseCase.execute();
        setProjectsData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return { projectsData, loading, error };
};

export const useRecentProjects = (limit: number = 4) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecentProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getRecentProjectsUseCase.execute(limit);
        setProjects(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch recent projects');
      } finally {
        setLoading(false);
      }
    };

    fetchRecentProjects();
  }, [limit]);

  return { projects, loading, error };
};
