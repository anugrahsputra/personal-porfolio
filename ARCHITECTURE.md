# Portfolio Architecture

This portfolio is built using Next.js 15 with the App Router and follows modern React patterns and best practices.

## Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (main)/                   # Route group for main pages
│   │   ├── layout.tsx            # Layout for main pages (includes Navbar/Footer)
│   │   ├── page.tsx              # Home page
│   │   ├── experience/           # Experience page
│   │   │   ├── page.tsx          # Server component with metadata
│   │   │   └── ExperiencePageClient.tsx  # Client component
│   │   └── projects/             # Projects page
│   │       ├── page.tsx          # Server component with metadata
│   │       └── ProjectsPageClient.tsx   # Client component
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Root page (redirects to main)
├── components/                    # Reusable UI components
│   ├── ui/                       # shadcn/ui components
│   ├── About.tsx
│   ├── Contact.tsx
│   ├── Experience.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── Navbar.tsx
│   └── Projects.tsx
├── hooks/                         # Custom React hooks
│   ├── useProjects.ts
│   └── useResume.ts
├── lib/                          # Utilities and services
│   ├── services/                 # Business logic and data services
│   │   ├── container.ts          # Dependency injection container
│   │   ├── ProjectDataSource.ts
│   │   ├── ProjectDataSourceImpl.ts
│   │   ├── ProjectRepositoryImpl.ts
│   │   ├── ResumeDataSource.ts
│   │   ├── ResumeDataSourceImpl.ts
│   │   ├── ResumeRepositoryImpl.ts
│   │   ├── actions.ts
│   │   └── nodemailer.ts
│   └── utils/                    # Utility functions
│       └── utils.ts
└── types/                        # TypeScript type definitions
    ├── Experience.ts
    └── Project.ts
```

## Architecture Patterns

### 1. Next.js App Router
- **Route Groups**: `(main)` groups related routes without affecting the URL structure
- **Nested Layouts**: Each route group has its own layout for shared UI elements
- **Server/Client Components**: Proper separation of server and client components for optimal performance

### 2. Component Organization
- **Co-location**: Components are organized by feature and placed close to where they're used
- **UI Components**: Reusable UI components in `components/ui/` (shadcn/ui)
- **Feature Components**: Page-specific components in `components/`

### 3. Data Management
- **Custom Hooks**: Data fetching logic encapsulated in custom hooks
- **Service Layer**: Business logic separated into services
- **Type Safety**: Strong typing with TypeScript interfaces

### 4. SEO & Performance
- **Metadata**: Each page has proper metadata for SEO
- **Server Components**: Static content rendered on the server
- **Client Components**: Interactive features rendered on the client

## Key Features

### Route Structure
- `/` - Home page with all sections
- `/experience` - Detailed experience page
- `/projects` - Detailed projects page

### Layout System
- **Root Layout**: Global HTML structure, fonts, and metadata
- **Main Layout**: Navigation and footer for main pages
- **Page-specific**: Individual page layouts as needed

### Data Flow
1. **Data Sources**: Fetch data from JSON files
2. **Repositories**: Abstract data access
3. **Use Cases**: Business logic
4. **Hooks**: React state management
5. **Components**: UI rendering

## Best Practices Implemented

1. **Separation of Concerns**: Clear separation between UI, business logic, and data
2. **Type Safety**: Full TypeScript coverage
3. **Performance**: Server-side rendering where possible
4. **SEO**: Proper metadata and structured data
5. **Maintainability**: Clean, organized code structure
6. **Scalability**: Easy to add new pages and features

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **Lucide React** - Icons
- **EmailJS** - Contact form handling