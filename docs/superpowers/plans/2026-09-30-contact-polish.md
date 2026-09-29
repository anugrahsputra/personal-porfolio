# Indent and contact polish Implementation Plan

> **For agentic workers:** Execute this plan inline with superpowers:executing-plans. Do not dispatch subagents. Steps use checkbox (`- [ ]`) syntax for tracking.

**Effort:** medium

**Goal:** Give the three indented lead paragraphs one shared indent width, and give the Contact section's LinkedIn link an icon like its neighbors.

**Architecture:** Class and markup changes in three components. No new files, no new dependencies.

**Tech Stack:** Next.js 15, Tailwind CSS v4, lucide-react, bun.

**Spec:** No spec file. The findings and decisions are below.

## Findings

1. **Uneven indents.** The hero intro, the About lead and the Contact availability line all use `indent-[2.5em]`. Because `em` follows each paragraph's font size, the indents measure 58px, 83px and 85px at 1440px wide. On the larger two it reads as a gap, not a style. The reference site uses one fixed indent. `clamp(2.5rem, 4vw, 3.5rem)` was tried live in the browser: 56px on all three at 1440px, 40px on all three at 390px.
2. **LinkedIn without an icon.** In the Contact section, the email line has a `Mail` icon and the location line has a `MapPin` icon, but the LinkedIn line has only `pl-6` padding to line its text up. `lucide-react` 0.542 exports a `Linkedin` icon.

## Global Constraints

- No doc comments. Do not add JSDoc or `//` comments that describe a function, component, prop or constant. Leave existing comments exactly as they are.
- No test files. The repo has no test framework, and AGENTS.md forbids adding one.
- No new dependencies and no new color values.
- Git is read-only for you. No commit, stash, checkout, reset or restore.
- Touch only `src/features/hero/components/Hero.tsx`, `src/features/about/components/About.tsx` and `src/features/contact/components/Contact.tsx`.
- Do not delete `.next` and do not run `bun run build`. The user runs `bun run dev` in another pane, and both write into the `.next` directory that server uses.

## Review Focus

1. Nothing else in `src/` still uses `indent-[2.5em]` after the change.
2. The LinkedIn icon matches the Mail and MapPin icons: `size-4`, `text-foreground/60`, `aria-hidden`.
3. The LinkedIn link keeps `target="_blank"`, `rel="noopener noreferrer"` and the `linkClass` underline.

---

### Task 1: One indent width

**Files:**
- Modify: `src/features/hero/components/Hero.tsx` (the intro `MaskText` className)
- Modify: `src/features/about/components/About.tsx` (the lead `MaskText` className)
- Modify: `src/features/contact/components/Contact.tsx` (the availability `<p>` className)

- [ ] **Step 1: Replace the indent class**

In each of the three files, replace `indent-[2.5em]` with `indent-[clamp(2.5rem,4vw,3.5rem)]`. Change nothing else in those class strings.

- [ ] **Step 2: Verify**

Run: `rtk proxy grep -rn "indent-\[2.5em\]" src`
Expected: no output.

Run: `rtk proxy grep -rn "indent-\[clamp(2.5rem,4vw,3.5rem)\]" src`
Expected: three lines, one in each file above.

---

### Task 2: LinkedIn icon in Contact

**Files:**
- Modify: `src/features/contact/components/Contact.tsx` (the lucide import, and the LinkedIn `li`)

- [ ] **Step 1: Import the icon**

```tsx
import { CircleAlert, CircleCheck, Linkedin, Loader2, Mail, MapPin } from "lucide-react";
```

- [ ] **Step 2: Match the other contact rows**

Replace the LinkedIn list item:

```tsx
              {linkedin && (
                <li className="pl-6">
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    LinkedIn
                  </a>
                </li>
              )}
```

with:

```tsx
              {linkedin && (
                <li className="flex items-center gap-2">
                  <Linkedin className="size-4 text-foreground/60" aria-hidden />
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    LinkedIn
                  </a>
                </li>
              )}
```

- [ ] **Step 3: Lint and types**

Run: `bun run lint`
Expected: no errors. A deprecation warning about the `Linkedin` icon is acceptable. Paste it in your report if it appears.

Run: `bunx tsc --noEmit`
Expected: no output.

Do not run `bun run build`.

- [ ] **Step 4: Report**

Write `.handoff/2026-09-30-contact-polish/executor.md` with the list of files you changed and the real output of every command above. The planner will check the result in the browser, so skip the browser check.
