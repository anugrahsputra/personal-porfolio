# Portfolio Architecture

This portfolio is built using Next.js 15 with the App Router and follows modern React patterns and a simplified feature-based architecture.

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
├── components/                   # Shared UI components
│   ├── ui/                       # shadcn/ui components
│   ├── layout/                   # Navbar, Footer, Breadcrumbs, etc.
│   └── StructuredData.tsx        # SEO JSON-LD components
├── features/                     # Feature-based modules
│   ├── about/                    # About me section
│   ├── contact/                  # Contact form and email actions
│   ├── hero/                     # Hero section
│   ├── projects/                 # Projects functionality
│   │   ├── components/           # Project-specific UI
│   │   ├── hooks/                # Project-specific hooks (useProjects)
│   │   ├── api.ts                # Data fetching for projects
│   │   └── types.ts              # TypeScript interfaces for projects
│   └── resume/                   # Resume & experience functionality
│       ├── components/           # Experience-specific UI
│       ├── hooks/                # Resume-specific hooks (useResume)
│       ├── api.ts                # Data fetching for resume
│       └── types.ts              # TypeScript interfaces for resume
└── lib/                          # Utilities
    ├── utils/                    # Utility functions (cn, fetchWithTimeout, etc.)
    └── server/                   # Server-side utilities (e.g., nodemailer)
```

## Architecture Patterns

### 1. Next.js App Router
- **Route Groups**: `(main)` groups related routes without affecting the URL structure
- **Nested Layouts**: Each route group has its own layout for shared UI elements
- **Server/Client Components**: Proper separation of server and client components for optimal performance

### 2. Feature-Based Organization
- **Co-location**: Code is organized by domain feature (`projects`, `resume`, `contact`, etc.) rather than technical concern. This keeps components, data fetching, hooks, and types grouped logically.
- **UI Components**: Reusable, generic UI components live in `src/components/ui/` (shadcn/ui), while feature-specific components live inside their respective feature folder.

### 3. Simplified Data Fetching
- **Direct API Services**: Replaced a heavy Clean Architecture (DataSources, Repositories, UseCases) with straightforward Next.js server/client data fetching in feature `api.ts` files. 
- **Resilience**: API requests utilize custom `fetchWithTimeout` and `retryWithBackoff` utility wrappers.
- **Custom Hooks**: Client-side data fetching logic is encapsulated in custom hooks like `useProjects.ts` or `useResume.ts` which consume the feature `api.ts` directly.

### 4. SEO & Performance
- **Metadata**: Each page exports static Next.js metadata for SEO.
- **JSON-LD**: Extensive use of structured data injected natively.
- **Server Components**: Content is primarily rendered on the server to reduce the JavaScript bundle size and improve Core Web Vitals.
- **Client Components**: "use client" is strictly reserved for interactive boundaries.

## Key Features

### Route Structure
- `/` - Home page with all feature sections combined
- `/experience` - Detailed professional experience
- `/projects` - Detailed projects portfolio

### Data Flow
1. **API**: `src/features/*/api.ts` define async fetching functions leveraging `fetchWithTimeout`.
2. **Server Fetching**: `page.tsx` files fetch initial data on the server and pass it as props.
3. **Client State**: Custom hooks handle client-side rendering (CSR) and component-level loading states if needed.
4. **UI Rendering**: Feature components map the fetched type-safe data to the DOM.

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
- **Tailwind CSS v4** - Styling
- **shadcn/ui** - UI primitives
- **Lucide React** - Icons
- **EmailJS / Nodemailer** - Contact form handling