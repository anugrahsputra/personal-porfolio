import { ProjectDataSourceImpl } from './ProjectDataSourceImpl';
import { ResumeDataSourceImpl } from './ResumeDataSourceImpl';
import { ProjectRepositoryImpl } from './ProjectRepositoryImpl';
import { ResumeRepositoryImpl } from './ResumeRepositoryImpl';
import { GetAllProjectsUseCase } from './usecases/GetAllProjectsUseCase';
import { GetRecentProjectsUseCase } from './usecases/GetRecentProjectsUseCase';
import { GetResumeDataUseCase } from './usecases/GetResumeDataUseCase';
import { GetRecentExperiencesUseCase } from './usecases/GetRecentExperiencesUseCase';

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
