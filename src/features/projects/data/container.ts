import { ProjectDataSourceImpl } from './datasources/ProjectDataSourceImpl';
import { ProjectRepositoryImpl } from './repositories/ProjectRepositoryImpl';
import { GetAllProjectsUseCase } from './usecases/GetAllProjectsUseCase';
import { GetRecentProjectsUseCase } from './usecases/GetRecentProjectsUseCase';

// Data Sources
const projectDataSource = new ProjectDataSourceImpl();

// Repositories
const projectRepository = new ProjectRepositoryImpl(projectDataSource);

// Use Cases
export const getAllProjectsUseCase = new GetAllProjectsUseCase(projectRepository);
export const getRecentProjectsUseCase = new GetRecentProjectsUseCase(projectRepository);
