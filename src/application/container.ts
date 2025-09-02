import { ProjectDataSourceImpl } from '../data/datasources/ProjectDataSourceImpl';
import { ResumeDataSourceImpl } from '../data/datasources/ResumeDataSourceImpl';
import { ProjectRepositoryImpl } from '../data/repositories/ProjectRepositoryImpl';
import { ResumeRepositoryImpl } from '../data/repositories/ResumeRepositoryImpl';
import { GetAllProjectsUseCase } from '../domain/usecases/GetAllProjectsUseCase';
import { GetRecentProjectsUseCase } from '../domain/usecases/GetRecentProjectsUseCase';
import { GetResumeDataUseCase } from '../domain/usecases/GetResumeDataUseCase';
import { GetRecentExperiencesUseCase } from '../domain/usecases/GetRecentExperiencesUseCase';

// Data Sources
const projectDataSource = new ProjectDataSourceImpl();
const resumeDataSource = new ResumeDataSourceImpl();

// Repositories
const projectRepository = new ProjectRepositoryImpl(projectDataSource);
const resumeRepository = new ResumeRepositoryImpl(resumeDataSource);

// Use Cases
export const getAllProjectsUseCase = new GetAllProjectsUseCase(projectRepository);
export const getRecentProjectsUseCase = new GetRecentProjectsUseCase(projectRepository);
export const getResumeDataUseCase = new GetResumeDataUseCase(resumeRepository);
export const getRecentExperiencesUseCase = new GetRecentExperiencesUseCase(resumeRepository);
