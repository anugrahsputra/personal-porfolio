import { ResumeDataSourceImpl } from './datasources/ResumeDataSourceImpl';
import { ResumeRepositoryImpl } from './repositories/ResumeRepositoryImpl';
import { GetResumeDataUseCase } from './usecases/GetResumeDataUseCase';
import { GetRecentExperiencesUseCase } from './usecases/GetRecentExperiencesUseCase';

// Data Sources
const resumeDataSource = new ResumeDataSourceImpl();

// Repositories
const resumeRepository = new ResumeRepositoryImpl(resumeDataSource);

// Use Cases
export const getResumeDataUseCase = new GetResumeDataUseCase(resumeRepository);
export const getRecentExperiencesUseCase = new GetRecentExperiencesUseCase(resumeRepository);
