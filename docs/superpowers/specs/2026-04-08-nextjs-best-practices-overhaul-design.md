# Next.js Best Practices Overhaul - Design Spec

**Date:** 2026-04-08
**Status:** Draft
**Author:** AI Assistant

## Overview

Refactor the portfolio project to follow Next.js 15 best practices, delivered as 7 independent, incremental PRs. Each PR is self-contained, reversible, and verifiable via `npm run build`.

## Current State

- Next.js 15.5 with App Router, TypeScript, Tailwind v4, shadcn/ui
- 3 routes: `/`, `/projects`, `/experience` (all `force-dynamic`)
- Feature-based structure with server-first + client fallback data fetching
- External API calls with retry/backoff, timeout handling
- Comprehensive SEO (metadata, structured data, sitemap, robots)
- Issues: dead code, duplicate utilities, excessive client components, no error boundaries, no caching

## Phases

### Phase 1: Hygiene & Dead Code Removal

**Goal:** Clean up obvious issues with zero behavioral changes.

**Changes:**
- Delete `src/features/hero/components/ThemeToggle.tsx` — unused, dark mode is forced
- Delete `src/lib/server/nodemailer.ts` — dead code, contact form uses external API
- Remove `emailjs-com` from `package.json` dependencies — not imported anywhere
- Remove `nodemailer` and `@types/nodemailer` from `package.json` — not used
- Remove placeholder image domains from `next.config.ts`: `picsum.photos`, `via.placeholder.com`, `source.unsplash.com`
- Remove all `[DEBUG]` console.log statements from `src/features/contact/data/actions.ts`
- Deduplicate `cn` utility:
  - Keep `src/lib/utils.ts` (contains `cn`, `FetchError`, `fetchWithTimeout`, `retryWithBackoff`)
  - Delete `src/lib/utils/utils.ts` (duplicate `cn` only)
  - Update any imports referencing `@/lib/utils/utils` to `@/lib/utils`
- Update `README.md` to reflect actual architecture (remove references to non-existent `domain/`, `data/`, `application/`, `presentation/` directories)

**Verification:** `npm run build` passes, no visual or behavioral changes.

**Risk:** None.

---

### Phase 2: Error Boundaries & UX Resilience

**Goal:** Add Next.js error handling conventions.

**New files:**
- `src/app/error.tsx` — Root error boundary (Client Component, catches errors from all children)
- `src/app/not-found.tsx` — Custom 404 page (Server Component)
- `src/app/(main)/error.tsx` — Route-group-specific error boundary with "Try again" reset
- `src/app/(main)/loading.tsx` — Loading skeleton for route transitions (used by Phase 5 as well)

**Changes:**
- Remove `.catch(() => null)` pattern from `src/app/(main)/page.tsx` — let errors bubble to error boundary instead of silently hiding them
- Remove `.catch(() => null)` pattern from `src/app/(main)/projects/page.tsx`
- Remove `.catch(() => null)` pattern from `src/app/(main)/experience/page.tsx`

**Design:**
- `error.tsx` components: Client Components with error message, digest (if available), and "Try again" button calling `reset()`
- `not-found.tsx`: Simple page with "Page not found" message and link back to home
- `loading.tsx`: Full-screen skeleton matching the page layout (navbar + footer visible, content area shows animated skeleton)

**Verification:** Manually trigger errors (e.g., throw in a component), verify custom error UI appears. Visit non-existent route, verify custom 404.

**Risk:** Low. Error boundaries are additive; removing `.catch(() => null)` means errors are now visible instead of silently hidden.

---

### Phase 3: RSC Optimization & Client Component Reduction

**Goal:** Push server/client boundaries down, reduce client JS bundle.

**Changes:**

**Hero component** (`src/features/hero/components/Hero.tsx`):
- Convert from Client Component to Server Component
- Remove `useState`, `useEffect`, `useResumeData` hook usage
- Receive `initialData` as props (already passed from page)
- No interactivity needed — it's a display-only section

**About component** (`src/features/about/components/About.tsx`):
- Convert from Client Component to Server Component
- Remove `useState`, `useEffect`, `useResumeData` hook usage
- Receive `initialData` as props
- No interactivity needed

**Experience component** (`src/features/resume/components/Experience.tsx`):
- Convert from Client Component to Server Component
- Remove `useState`, `useEffect`, `useResumeData` hook usage
- Receive `initialData` as props
- No interactivity needed

**Breadcrumbs** (`src/components/layout/Breadcrumbs.tsx`):
- Convert from Client Component to Server Component
- Use `headers()` or route params to determine current path
- No interactivity needed

**Footer** (`src/components/layout/Footer.tsx`):
- Convert from Client Component to Server Component
- Static content + links, no interactivity

**Navbar** (`src/components/layout/Navbar.tsx`):
- Keep as Client Component (has mobile menu toggle interactivity)
- OR split: extract mobile menu toggle into `MobileMenu.tsx` client component, keep Navbar as Server Component
- Decision: Split — smaller client boundary

**Cleanup:**
- Remove `useResumeData` hook if no longer used after Hero/About/Experience conversion
- Remove `useProjects` hook if no longer used after Projects page conversion
- Delete unused hook files

**Verification:** `npm run build` passes. Verify all sections render correctly. Check client bundle size reduction.

**Risk:** Medium. Converting client components to server components requires ensuring no client-only APIs are used.

---

### Phase 4: Caching & Data Patterns

**Goal:** Replace `force-dynamic` with ISR, add proper data layer.

**Changes:**

**Pages:**
- Remove `export const dynamic = 'force-dynamic'` from all 3 pages
- Add `export const revalidate = 3600` (1-hour revalidation) to all 3 pages

**Data fetching functions:**
- Add `'use cache'` directive to `getResumeData()` in `src/features/resume/api.ts`
- Add `'use cache'` directive to `getAllProjects()` in `src/features/projects/api.ts`
- Add `revalidateTag('resume')` and `revalidateTag('projects')` for on-demand invalidation
- Add `cacheLife` and `cacheTag` configuration to cached functions (requires Next.js 15+)

**Next.js config update:**
- Add `cacheLife` configuration to `next.config.ts` if needed for `'use cache'` directive
- Note: `'use cache'` works without `cacheComponents: true` — that flag is only needed for caching React components, not functions

**HomePage data fetching:**
- Change sequential `await` calls to `Promise.all` for parallel fetching:
  ```typescript
  const [resumeData, projectsData] = await Promise.all([
    getResumeData(),
    getAllProjects(),
  ]);
  ```

**Hooks simplification:**
- Since server always provides `initialData`, simplify `useResumeData` and `useProjects` hooks:
  - If `initialData` is provided, skip fetch entirely (already the case)
  - Remove complex loading/error state management for the happy path
  - Keep fallback fetch for edge cases (client-side navigation without server data)

**Verification:** `npm run build` passes. Verify data is cached (check response headers). Verify data refreshes within 1 hour.

**Risk:** Medium. Removing `force-dynamic` changes caching behavior. Need to verify data freshness is acceptable.

---

### Phase 5: Suspense & Streaming

**Goal:** Progressive rendering for better perceived performance.

**Changes:**

**HomePage restructuring with Suspense:**
- Keep `HomePage` as a single async Server Component that fetches all data (from Phase 4, using `Promise.all`)
- Wrap the most expensive/slowest section (Projects) with `<Suspense>` to allow the rest of the page to stream first:
  ```tsx
  export default async function HomePage() {
    const [resumeData, projectsData] = await Promise.all([
      getResumeData(),
      getAllProjects(),
    ]);

    return (
      <>
        <Hero initialData={resumeData} />
        <About initialData={resumeData} />
        <Experience initialData={resumeData} />
        <Suspense fallback={<ProjectsSkeleton />}>
          <Projects initialData={projectsData} />
        </Suspense>
        <Contact />
      </>
    );
  }
  ```
- Create `ProjectsSkeleton` component — matches the Projects grid layout with animated pulse placeholders
- Create `src/app/(main)/projects/loading.tsx` — loading skeleton for the standalone projects page

**Note:** Since all data is fetched at the page level (Phase 4), Suspense here provides streaming for the HTML shell rather than per-section data fetching. This is simpler and avoids duplicate API calls while still improving perceived performance.

**Verification:** `npm run build` passes. Verify page shell streams before Projects section is ready.

**Risk:** Low. Suspense boundaries are additive and don't change data flow.

---

### Phase 6: Bundle & Performance Optimization

**Goal:** Reduce client-side JavaScript bundle.

**Changes:**

**Unused component audit:**
- Check usage of `alert.tsx`, `badge.tsx`, `card.tsx`, `separator.tsx` in `src/components/ui/`
- Remove any unused components
- Run `npm run build` to verify no import errors

**Font optimization:**
- Verify `Inter` font from `next/font/google` is properly configured:
  - `display: 'swap'`
  - `subsets: ['latin']`
  - `variable: '--font-inter'` for CSS variable usage
- Verify Tailwind config uses the CSS variable

**Image optimization:**
- Audit all `<Image>` components:
  - Ensure `sizes` attribute is set for responsive images
  - Ensure `priority` is set for LCP image (hero photo)
  - Ensure `alt` text is meaningful
  - Remove any `<img>` tags that should be `<Image>`

**Bundle analysis:**
- Run `next experimental-analyze` (or `next build --analyze` if available)
- Document baseline bundle size
- Identify optimization opportunities

**Verification:** `npm run build` passes. Bundle size reduced or unchanged.

**Risk:** Low. Removing unused code and optimizing existing code.

---

### Phase 7: Metadata & SEO Polish

**Goal:** Ensure all pages follow SEO best practices.

**Changes:**

**Metadata verification:**
- Verify `metadataBase` is set correctly (`https://downormal.dev`)
- Verify all pages have `generateMetadata` or static `metadata`
- Verify OG images exist at `/images/photo/photo.png` and are 1200x630
- Verify Twitter card meta tags are complete

**Structured data:**
- Validate JSON-LD schemas in `StructuredData.tsx`, `FAQStructuredData.tsx`, `ProjectsStructuredData.tsx`
- Ensure all required fields are present
- Test with Google Rich Results Test tool

**Canonical URLs:**
- Add `alternates: { canonical: '...' }` to all page metadata
- Ensure canonical URLs match `metadataBase` + pathname

**Verification:** Run Lighthouse audit. Verify structured data with Google tools.

**Risk:** None. Metadata changes are additive.

---

## Execution Order

Phases must be executed in order (1 → 7) because later phases depend on earlier changes:
- Phase 3 depends on Phase 1 (clean codebase)
- Phase 4 depends on Phase 3 (simplified hooks, cleaner components)
- Phase 5 depends on Phase 4 (caching in place, Promise.all pattern)
- Phase 6 can run in parallel with Phase 5 (independent concerns)
- Phase 7 is independent but should be last (polish)

## Success Criteria

1. `npm run build` passes with no errors or warnings
2. `npm run lint` passes with no errors
3. All 3 routes render correctly with no visual regressions
4. Client bundle size reduced (measurable via bundle analysis)
5. Error boundaries catch and display errors gracefully
6. Data is cached with 1-hour revalidation
7. Lighthouse audit scores: Performance ≥ 90, Accessibility ≥ 90, Best Practices ≥ 90, SEO ≥ 90
