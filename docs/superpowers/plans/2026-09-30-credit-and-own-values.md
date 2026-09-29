# Credit and own values Implementation Plan

> **For agentic workers:** Execute this plan inline with superpowers:executing-plans. Do not dispatch subagents. Steps use checkbox (`- [ ]`) syntax for tracking.

**Effort:** medium

**Goal:** Credit matthieugivelet.com in the footer, and replace every value that was copied verbatim from his stylesheet with a value of our own.

**Architecture:** Class and value edits in six existing files, plus a few lines of markup in the footer. No new files.

**Tech Stack:** Next.js 15, Tailwind CSS v4, motion, bun.

**Spec:** No spec file. The user approved "credit him and replace the copied values" in chat on 2026-09-30.

## Copied values and their replacements

The replacement curve `cubic-bezier(0.16, 1, 0.3, 1)` is the site's own `EASE_OUT` from `src/components/motion.tsx`. Using it everywhere also makes the motion consistent.

| Where | Copied value | Replacement |
| --- | --- | --- |
| `link-line` underline, `src/app/globals.css` | `0.7s cubic-bezier(0.18, 0.83, 0.27, 1)` | `0.5s cubic-bezier(0.16, 1, 0.3, 1)` |
| Mobile menu panel, `Navbar.tsx` | `ease-[cubic-bezier(0.18,0.66,0.18,1)]`, `duration-700` open, `duration-500` close | `ease-[cubic-bezier(0.16,1,0.3,1)]`, `duration-600` open, `duration-400` close |
| Mobile menu link rise, `Navbar.tsx` | `duration: 0.8` | `duration: 0.6` |
| Mobile menu link size, `Navbar.tsx` | `text-[clamp(1.5rem,15vw,4rem)]` | `text-[clamp(2.5rem,13vw,3.75rem)]` |
| Archive columns, `ProjectArchive.tsx` | `md:grid-cols-[2fr_1fr_1fr]` | `md:grid-cols-[minmax(0,5fr)_minmax(0,3fr)_minmax(11rem,2fr)]` |
| Lead indent, `Hero.tsx`, `About.tsx`, `Contact.tsx` | `indent-[clamp(2.5rem,4vw,3.5rem)]` | `indent-[clamp(2.5rem,3.5vw,3rem)]` |

## Global Constraints

- No doc comments. Do not add JSDoc or `//` comments that describe a function, component, prop or constant. Leave existing comments exactly as they are.
- No test files. The repo has no test framework, and AGENTS.md forbids adding one.
- No new dependencies and no new color values.
- Git is read-only for you. No commit, stash, checkout, reset or restore.
- Touch only the files named in the tasks.
- Do not delete `.next` and do not run `bun run build`. The user runs `bun run dev` in another pane, and both write into the `.next` directory that server uses.

## Review Focus

1. None of the copied values in the table remain anywhere in `src/`.
2. The credit link is distinguishable from the surrounding text without hover. The text around it is `text-foreground/60` (#969696), and the link text alone would be under 3:1 against it, so the link keeps a permanent underline.
3. The archive's columns must line up across rows, and the Date column must not wrap between 768px and 1440px.

---

### Task 1: Footer credit

**Files:**
- Modify: `src/components/layout/Footer.tsx` (the copyright `<p>` in the first grid cell)

- [ ] **Step 1: Add the credit under the copyright line**

Replace:

```tsx
        <p className="text-sm/5">
          © {new Date().getFullYear()} Anugrah Surya Putra
        </p>
```

with:

```tsx
        <div className="space-y-2 text-sm/5">
          <p>© {new Date().getFullYear()} Anugrah Surya Putra</p>
          <p className="text-foreground/60">
            Design inspired by{" "}
            <a
              href="https://matthieugivelet.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm text-foreground underline decoration-input-border underline-offset-4 hover:decoration-foreground"
            >
              Matthieu Givelet
            </a>
          </p>
        </div>
```

The link classes are the same as the existing in-text links in `src/app/(main)/error.tsx` and `src/features/videos/components/Videos.tsx`.

---

### Task 2: Replace the copied values

**Files:**
- Modify: `src/app/globals.css` (the `transition` line in `@utility link-line`)
- Modify: `src/components/layout/Navbar.tsx` (the `DialogPrimitive.Content` className, the link `motion.div` transition, the menu link className)
- Modify: `src/features/projects/components/ProjectArchive.tsx` (the `COLUMNS` constant)
- Modify: `src/features/hero/components/Hero.tsx`, `src/features/about/components/About.tsx`, `src/features/contact/components/Contact.tsx` (the indent class)

- [ ] **Step 1: `link-line` transition**

In `src/app/globals.css`:

```css
  transition: background-size 0.5s cubic-bezier(0.16, 1, 0.3, 1);
```

- [ ] **Step 2: Mobile menu panel**

In the `DialogPrimitive.Content` className in `src/components/layout/Navbar.tsx`, replace `ease-[cubic-bezier(0.18,0.66,0.18,1)]` with `ease-[cubic-bezier(0.16,1,0.3,1)]`, `motion-safe:data-[state=closed]:duration-500` with `motion-safe:data-[state=closed]:duration-400`, and `motion-safe:data-[state=open]:duration-700` with `motion-safe:data-[state=open]:duration-600`. Change nothing else in that string.

- [ ] **Step 3: Mobile menu links**

In the same file, the menu link `motion.div` transition becomes:

```tsx
                            transition={{
                              delay: 0.15 + 0.05 * index,
                              duration: 0.6,
                              ease: EASE_OUT,
                            }}
```

In the menu link className, replace `text-[clamp(1.5rem,15vw,4rem)]` with `text-[clamp(2.5rem,13vw,3.75rem)]`.

- [ ] **Step 4: Archive columns**

In `src/features/projects/components/ProjectArchive.tsx`:

```tsx
const COLUMNS = "md:grid-cols-[minmax(0,5fr)_minmax(0,3fr)_minmax(11rem,2fr)] md:items-baseline md:gap-x-6";
```

Each row is its own grid, so every track must be fixed or `fr`. An `auto` track sizes to that row's date and shifts the other columns out of line from row to row. 11rem (176px) is wider than the longest date, "Apr 2024 - May 2024", at the smallest row font size (about 165px).

- [ ] **Step 5: Lead indent**

In `Hero.tsx`, `About.tsx` and `Contact.tsx`, replace `indent-[clamp(2.5rem,4vw,3.5rem)]` with `indent-[clamp(2.5rem,3.5vw,3rem)]`.

- [ ] **Step 6: Verify nothing copied is left**

Run: `rtk proxy grep -rnE "0\.18, ?0\.83|0\.18,0\.66|clamp\(1\.5rem,15vw,4rem\)|2fr_1fr_1fr|clamp\(2\.5rem,4vw,3\.5rem\)|duration: 0\.8" src`
Expected: no output.

Run: `bun run lint`
Expected: no errors.

Run: `bunx tsc --noEmit`
Expected: no output.

Do not run `bun run build`.

- [ ] **Step 7: Report**

Write `.handoff/2026-09-30-credit-and-own-values/executor.md` with the list of files you changed and the real output of every command above. The planner will check the result in the browser, so skip the browser check.
