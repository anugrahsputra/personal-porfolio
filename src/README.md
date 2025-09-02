# Clean Architecture Implementation

This project follows Clean Architecture principles to ensure maintainability, testability, and separation of concerns.

## Architecture Layers

### 1. Domain Layer (`src/domain/`)
Contains the core business logic and entities.

- **Entities** (`entities/`): Core business objects
  - `Project.ts`: Project entity and data structure
  - `Experience.ts`: Experience and resume data structures

- **Repositories** (`repositories/`): Abstract interfaces for data access
  - `ProjectRepository.ts`: Interface for project data operations
  - `ResumeRepository.ts`: Interface for resume data operations

- **Use Cases** (`usecases/`): Business logic and application rules
  - `GetAllProjectsUseCase.ts`: Fetch all projects
  - `GetRecentProjectsUseCase.ts`: Fetch recent projects with limit
  - `GetResumeDataUseCase.ts`: Fetch resume data
  - `GetRecentExperiencesUseCase.ts`: Fetch recent experiences with limit

### 2. Data Layer (`src/data/`)
Handles data access and external dependencies.

- **Data Sources** (`datasources/`): External data access
  - `ProjectDataSource.ts`: Interface for project data source
  - `ProjectDataSourceImpl.ts`: JSON file implementation
  - `ResumeDataSource.ts`: Interface for resume data source
  - `ResumeDataSourceImpl.ts`: JSON file implementation

- **Repositories** (`repositories/`): Concrete implementations
  - `ProjectRepositoryImpl.ts`: Project repository implementation
  - `ResumeRepositoryImpl.ts`: Resume repository implementation

### 3. Application Layer (`src/application/`)
Orchestrates use cases and dependency injection.

- **Container** (`container.ts`): Dependency injection setup
  - Instantiates data sources, repositories, and use cases
  - Provides clean interfaces for the presentation layer

### 4. Presentation Layer (`src/presentation/`)
Handles UI and user interactions.

- **Components** (`components/`): React components
  - All UI components moved from `src/components/`
  - Updated to use custom hooks instead of direct data fetching

- **Pages** (`pages/`): Page components
  - `projects/page.tsx`: All projects page
  - `experience/page.tsx`: All experience page

- **Hooks** (`hooks/`): Custom React hooks
  - `useProjects.ts`: Project-related data hooks
  - `useResume.ts`: Resume-related data hooks

## Benefits of Clean Architecture

### 1. **Separation of Concerns**
- Each layer has a single responsibility
- Business logic is isolated from UI and data access
- Easy to modify one layer without affecting others

### 2. **Testability**
- Use cases can be tested independently
- Mock implementations can be easily created
- Business logic is not coupled to external dependencies

### 3. **Maintainability**
- Clear structure makes code easy to understand
- Changes are localized to specific layers
- Easy to add new features or modify existing ones

### 4. **Scalability**
- Easy to add new data sources (API, database, etc.)
- New use cases can be added without affecting existing code
- Components can be reused across different pages

## Data Flow

1. **UI Component** calls a custom hook
2. **Custom Hook** calls a use case
3. **Use Case** calls a repository interface
4. **Repository Implementation** calls a data source
5. **Data Source** fetches data from external source (JSON files)
6. **Data flows back** through the same layers

## Adding New Features

### To add a new entity:
1. Create entity in `src/domain/entities/`
2. Create repository interface in `src/domain/repositories/`
3. Create use case in `src/domain/usecases/`
4. Implement data source in `src/data/datasources/`
5. Implement repository in `src/data/repositories/`
6. Add to dependency injection in `src/application/container.ts`
7. Create custom hook in `src/presentation/hooks/`
8. Use hook in components

### To change data source:
1. Create new data source implementation
2. Update dependency injection
3. No changes needed in other layers

This architecture ensures that the application remains maintainable and testable as it grows.
