# Projects archive Implementation Plan

> **For agentic workers:** Execute this plan inline with superpowers:executing-plans. Do not dispatch subagents. Steps use checkbox (`- [ ]`) syntax for tracking.

**Effort:** high

**Goal:** Turn `/projects` into a matthieugivelet.com style archive: one table of Name, Detail and Date rows, where hovering a row dims the others and shows that project's image beside it.

**Architecture:** First pull the project detail dialog out of `ProjectCard` into a shared `ProjectDialog`, so the home page cards and the new rows open the same dialog. Then add a `ProjectArchive` list component and render it on `/projects` in place of the Work / Personal / Academic groups. Hover effects are CSS only, using Tailwind named groups. No client state.

**Tech Stack:** Next.js 15 App Router (server components), Tailwind CSS v4, shadcn/ui Dialog, `next/image`, bun.

**Spec:** No spec file. The design was approved in chat on 2026-09-30 and is copied under "Design" below.

**Starts from:** the tree after `2026-09-30-type-and-link-details.md` is committed. That plan removes all `font-*` weight classes and adds an `ArrowRight` to `ProjectCard`'s title row. If `ProjectCard.tsx` does not import `ArrowRight`, stop and reply `plan-wrong`.

## Design

- `/projects` keeps its page header, then shows one list in API order (newest first). There are no groups.
- From `md` up the list is a three-column table, `2fr 1fr 1fr`. **Name** is the title. **Detail** is the context word plus the first tech, for example "Work · Kotlin". **Date** is the period, right-aligned. A header row `[ Name ] [ Detail ] [ Date ]` sits above it. All row text is `text-foreground` at the same size.
- Hovering a row fades every other row to 50% opacity (#FAFAFA at 50% on black is #7D7D7D, 5.1:1).
- From `lg` up, the hovered or keyboard-focused row shows its image, 16:10, about 22vw wide, vertically centered on the row and starting at 40% of the row's width. It fades in while scaling from 1.1 to 1. Projects without media (no image, or NDA) show nothing.
- Below `md`, each row is the title on one line, then the detail on the left and the date on the right in small muted text. No images, no dimming.
- Clicking or pressing Enter on a row opens the existing project dialog.

## Global Constraints

- No doc comments. Do not add JSDoc or `//` comments that describe a function, component, prop or constant. Existing comments move with the code they sit on and are otherwise left exactly as they are.
- No test files. The repo has no test framework, and AGENTS.md forbids adding one.
- No new dependencies and no new color values.
- Git is read-only for you. No commit, stash, checkout, reset or restore.
- Match the surrounding code style: double quotes in `.tsx`, single quotes and semicolons in `api.ts`, `cn()` for conditional classes, `@/` imports.
- Every transition must respect `prefers-reduced-motion`.
- Touch only the files listed in each task.

## Review Focus

1. Portfolio Backend (no image) and Cosmic App KIOSK Touchscreen (NDA). Their rows show no preview on hover and still open their dialog.
2. Keyboard. Tabbing onto a row at 1440px shows its preview, Enter opens the dialog, and Escape puts focus back on that row.
3. The longest title, "E-Market Seller Mobile Applications", at 1024px and 1440px. The preview must not cover the hovered row's own title.
4. A tablet at 768px or wider with touch. Tapping a row must not leave the other rows stuck at 50%.
5. The home page "Selected work" cards after the refactor. They still open the same dialog with the same content.

---

### Task 0: Keep `docs/` out of Tailwind's class scan

Tailwind v4 scans every file that isn't gitignored for class names. The plan files in `docs/superpowers/plans/` contain class strings such as `group-hover/row:opacity-100`, so their rules end up in the production CSS, and any CSS check in this plan would pass off the plan text alone.

**Files:**
- Modify: `src/app/globals.css:1-2`

- [ ] **Step 1: Exclude `docs/`**

The top of `src/app/globals.css` becomes:

```css
@import "tailwindcss";
@import "tw-animate-css";
@source not "../../docs";
```

- [ ] **Step 2: Verify**

Run: `rm -rf .next && bun run build`
Expected: success. If it fails because the projects API or network is unreachable, paste the error in your report and skip the next command.

Run: `rtk proxy grep -rl "group\\\\/row" .next/static`
Expected: no output. The only source of that class so far is this plan file.

---

### Task 1: Share the project dialog

**Files:**
- Create: `src/features/projects/components/ProjectDialog.tsx`
- Modify: `src/features/projects/components/ProjectCard.tsx`
- Modify: `src/features/projects/api.ts` (append)

**Interfaces:**
- Produces: `ProjectDialog` (default export), props `{ project: Project; children: React.ReactNode }`. `children` is the one trigger element, passed to `DialogTrigger asChild`.
- Produces: `hasMedia(project: Project): boolean`, exported from `src/features/projects/api.ts`.

- [ ] **Step 1: Move `hasMedia` into the API module**

Delete `hasMedia` and the comment above it from `src/features/projects/components/ProjectCard.tsx`, and append both to the end of `src/features/projects/api.ts`:

```ts

// NDA projects get no image, since the only one on file is a stock photo
export function hasMedia(project: Project): boolean {
  return Boolean(project.image) && !project.isNDA;
}
```

- [ ] **Step 2: Create `ProjectDialog`**

Create `src/features/projects/components/ProjectDialog.tsx`. The `DialogContent` body is moved unchanged from `ProjectCard`:

```tsx
import { Lock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getProjectContext } from "../api";
import type { Project } from "../types";

interface ProjectDialogProps {
  project: Project;
  children: React.ReactNode;
}

export default function ProjectDialog({ project, children }: ProjectDialogProps) {
  const isWork = getProjectContext(project) === "work";
  const liveLabel = project.liveDemo?.includes("/releases")
    ? "Releases"
    : "Live demo";

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="max-h-[85svh] overflow-y-auto">
        <DialogHeader className="pr-10 text-left">
          <DialogTitle className="text-2xl/[30px] tracking-[-0.02em]">
            {project.title}
          </DialogTitle>
          <DialogDescription className="text-xs/4 text-foreground/60">
            {isWork ? `${project.company} · ${project.period}` : project.period}
          </DialogDescription>
        </DialogHeader>
        {project.isNDA && (
          <p className="flex gap-2 text-sm/[22px] text-foreground">
            <Lock className="mt-0.5 size-4 shrink-0" aria-hidden />
            This project is under an NDA, so I can&apos;t share its source code or
            screenshots.
          </p>
        )}
        <p className="text-sm/[22px] text-pretty text-foreground/70">
          {project.description}
        </p>
        <ul className="flex flex-wrap gap-1.5" aria-label="Tech stack">
          {project.techStacks.map((tech) => (
            <li key={tech}>
              <Badge variant="secondary">{tech}</Badge>
            </li>
          ))}
        </ul>
        {(project.isLive || (project.github && !project.isNDA)) && (
          <div className="flex flex-wrap gap-2 pt-1">
            {project.isLive && project.liveDemo && (
              <Button variant="outline" size="sm" asChild>
                <a href={project.liveDemo} target="_blank" rel="noopener noreferrer">
                  {liveLabel}
                </a>
              </Button>
            )}
            {project.github && !project.isNDA && (
              <Button variant="ghost" size="sm" asChild>
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  Source
                </a>
              </Button>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
```

Before you paste it, diff this body against the current `DialogContent` in `ProjectCard.tsx`. If the two differ in anything besides the removed weight classes, keep the version in `ProjectCard.tsx` and note the difference in your report.

- [ ] **Step 3: Slim `ProjectCard` down**

In `src/features/projects/components/ProjectCard.tsx`:

1. Replace the imports with:

```tsx
import Image from "next/image";
import { ArrowRight, Lock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { RevealImage } from "@/components/motion";
import { hasMedia } from "../api";
import type { Project } from "../types";
import ProjectDialog from "./ProjectDialog";
```

2. Delete the `isWork` and `liveLabel` constants from the component body.
3. Replace `<Dialog>` and `<DialogTrigger asChild>` with `<ProjectDialog project={project}>`. Delete the whole `<DialogContent>...</DialogContent>` block, `</DialogTrigger>` and `</Dialog>`, and close with `</ProjectDialog>`. The `<button>` and everything inside it stay exactly as they are.

The component's return becomes:

```tsx
  return (
    <ProjectDialog project={project}>
      <button type="button" className="group block w-full rounded-md text-left">
        {/* unchanged button contents */}
      </button>
    </ProjectDialog>
  );
```

The `{/* unchanged button contents */}` line above is a pointer for you, not code to paste. Keep the real contents.

- [ ] **Step 4: Verify**

Run: `bun run lint`
Expected: no errors.

Run: `bunx tsc --noEmit`
Expected: no output.

Run: `rtk proxy grep -n "DialogContent\|getProjectContext\|function hasMedia" src/features/projects/components/ProjectCard.tsx`
Expected: no output.

---

### Task 2: The archive list on `/projects`

**Files:**
- Create: `src/features/projects/components/ProjectArchive.tsx`
- Modify: `src/app/(main)/projects/page.tsx`

**Interfaces:**
- Consumes: `ProjectDialog` and `hasMedia` from Task 1. `getProjectContext(project: Project): ProjectContext` and `type ProjectContext = 'work' | 'personal' | 'academic'` from `src/features/projects/api.ts`. `SectionLabel` (props `children`, `as?: "h2" | "h3" | "p"`, `className?`) and `Reveal` (props include `as?: "div" | "li" | "article"`) from `@/components`.
- Produces: `ProjectArchive` (default export), props `{ projects: Project[] }`.

- [ ] **Step 1: Create `ProjectArchive`**

Create `src/features/projects/components/ProjectArchive.tsx`:

```tsx
import Image from "next/image";

import SectionLabel from "@/components/SectionLabel";
import { Reveal } from "@/components/motion";
import { cn } from "@/lib/utils";
import { getProjectContext, hasMedia, type ProjectContext } from "../api";
import type { Project } from "../types";
import ProjectDialog from "./ProjectDialog";

interface ProjectArchiveProps {
  projects: Project[];
}

const CONTEXT_LABELS: Record<ProjectContext, string> = {
  work: "Work",
  personal: "Personal",
  academic: "Academic",
};

const COLUMNS = "md:grid-cols-[2fr_1fr_1fr] md:items-baseline md:gap-x-6";
const ROW_TEXT =
  "md:text-[clamp(1.125rem,1.4vw,1.375rem)] md:leading-tight md:tracking-[-0.02em] md:text-foreground";
const META_TEXT = cn("text-sm/5 text-foreground/60", ROW_TEXT);

function detail(project: Project): string {
  return [CONTEXT_LABELS[getProjectContext(project)], project.techStacks[0]]
    .filter(Boolean)
    .join(" · ");
}

export default function ProjectArchive({ projects }: ProjectArchiveProps) {
  return (
    <section className="page-container pb-[clamp(4rem,8vw,8rem)]">
      <div aria-hidden className={cn("hidden border-b pb-4 md:grid", COLUMNS)}>
        <SectionLabel as="p">Name</SectionLabel>
        <SectionLabel as="p">Detail</SectionLabel>
        <SectionLabel as="p" className="text-right">
          Date
        </SectionLabel>
      </div>

      <ul className="group/list">
        {projects.map((project) => (
          <Reveal as="li" key={project.title}>
            <ProjectDialog project={project}>
              <button
                type="button"
                className={cn(
                  "group/row relative grid w-full grid-cols-[minmax(0,1fr)_auto] gap-x-4 gap-y-1 border-b py-4 text-left md:py-3",
                  "transition-opacity duration-700 ease-out motion-reduce:transition-none md:group-hover/list:[&:not(:hover)]:opacity-50",
                  COLUMNS,
                )}
              >
                <span
                  className={cn(
                    "col-span-2 text-xl/7 tracking-[-0.02em] md:col-span-1",
                    ROW_TEXT,
                  )}
                >
                  {project.title}
                </span>
                <span className={META_TEXT}>{detail(project)}</span>
                <span className={cn("text-right", META_TEXT)}>{project.period}</span>

                {hasMedia(project) && (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute top-1/2 left-[40%] z-10 hidden aspect-[16/10] w-[clamp(14rem,22vw,20rem)] -translate-y-1/2 overflow-hidden rounded-md opacity-0 transition-opacity duration-700 ease-out group-hover/row:opacity-100 group-focus-visible/row:opacity-100 motion-reduce:transition-none lg:block"
                  >
                    <Image
                      src={project.image}
                      alt=""
                      fill
                      sizes="22vw"
                      className="scale-110 object-cover transition-transform duration-700 ease-out group-hover/row:scale-100 group-focus-visible/row:scale-100 motion-reduce:transition-none"
                    />
                  </span>
                )}
              </button>
            </ProjectDialog>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
```

- [ ] **Step 2: Use it on `/projects`**

In `src/app/(main)/projects/page.tsx`:

1. Replace the imports with:

```tsx
import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import ProjectArchive from "@/features/projects/components/ProjectArchive";
import ProjectsStructuredData from "@/features/projects/components/ProjectsStructuredData";
import { getAllProjects } from "@/features/projects/api";
```

2. Delete the `GROUPS` constant.
3. Replace the `ProjectsPage` function with:

```tsx
export default async function ProjectsPage() {
  const projectsData = await getAllProjects();

  return (
    <>
      <ProjectsStructuredData initialData={projectsData} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />
      <PageHeader
        title="Projects"
        intro="What I've built at work, on my own, and at university."
      />
      <ProjectArchive projects={projectsData.projects} />
    </>
  );
}
```

Leave `breadcrumbStructuredData`, `metadata` and `revalidate` untouched.

- [ ] **Step 3: Lint, types, build**

Run: `bun run lint`
Expected: no errors. An unused import warning here means Step 2 missed one.

Run: `bunx tsc --noEmit`
Expected: no output.

Run: `bun run build`
Expected: success, with `/projects` in the route list. If it fails because the projects API or network is unreachable, paste the error in your report and continue.

Run: `rtk proxy grep -rl "not(:hover)" .next/static/chunks`
Expected: at least one `.css` path, which proves the dimming selector compiled from the component. Turbopack writes CSS to `.next/static/chunks/`, not `.next/static/css/`. Skip this if the build failed for API reasons.

- [ ] **Step 4: Behavior check**

If you can drive a browser (the `terminal-browser` skill), run `bun dev` and check:

1. `/projects` at 1440px. Hover a row with an image: the other rows dim and the image appears beside it. Hover Portfolio Backend: rows dim, no image.
2. `/projects` at 1024px. Hover "E-Market Seller Mobile Applications": the image does not cover its title.
3. Keyboard at 1440px. Tab onto a row: the preview shows. Enter opens the dialog. Escape returns focus to the same row.
4. `/projects` at 390px. Each row shows the title, then detail and date. No images. Tapping a row opens the dialog.
5. `/` at 1440px. A "Selected work" card still opens the dialog with the same content as before.

Put screenshot paths and the result of each check in your report. If you can't drive a browser, say so.

- [ ] **Step 5: Report**

Write `.handoff/2026-09-30-projects-archive/executor.md` with the list of files you changed and created, and the real output of every command above.
