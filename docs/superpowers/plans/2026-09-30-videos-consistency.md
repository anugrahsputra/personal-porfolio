# Videos consistency Implementation Plan

> **For agentic workers:** Execute this plan inline with superpowers:executing-plans. Do not dispatch subagents. Steps use checkbox (`- [ ]`) syntax for tracking.

**Effort:** medium

**Goal:** Make the home page Videos section use the same visual language as Selected work and Experience.

**Architecture:** Markup and class changes in one client component. The player gets the project cards' corners, the caption copies the project card caption, and the video list becomes numbered rows split by hairlines, with the playing video in full white and the rest dimmed.

**Tech Stack:** Next.js 15, Tailwind CSS v4, bun.

**Spec:** No spec file. On 2026-09-30 the user said the Videos section is not consistent with the other sections. The planner compared it against `ProjectCard.tsx` and `Experience.tsx`.

## Global Constraints

- No doc comments. Do not add JSDoc or `//` comments that describe a function, component, prop or constant. Leave existing comments as they are, except the one this plan tells you to remove.
- No test files. The repo has no test framework, and AGENTS.md forbids adding one.
- Git is read-only for you. No commit, stash, checkout, reset or restore.
- Touch only `src/features/videos/components/Videos.tsx`.
- Do not delete `.next` and do not run `bun run build`. The user runs `bun run dev` in another pane.

## Review Focus

1. Clicking a row plays that video, and that row is the only one in full white. Its number in the caption under the player matches its row number.
2. Keyboard focus still reaches every row and the play button, and the player still takes focus after a click (`playerRef` and the `useEffect` stay).
3. On a 390px phone the list sits under the caption with no horizontal scroll.

---

### Task 1: Restyle the Videos section

**Files:**
- Modify: `src/features/videos/components/Videos.tsx`

- [ ] **Step 1: Drop the `motion` import**

Delete this line:

```tsx
import { motion } from "motion/react";
```

- [ ] **Step 2: Add the index label helper**

Replace:

```tsx
const thumbnail = (id: string): string =>
  `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
```

with:

```tsx
const thumbnail = (id: string): string =>
  `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

const indexLabel = (index: number): string =>
  String(index + 1).padStart(2, "0");
```

- [ ] **Step 3: Track the active video's index**

Replace:

```tsx
  const active = shown.find((video) => video.id === activeId) ?? shown[0];
```

with:

```tsx
  const activeIndex = Math.max(
    0,
    shown.findIndex((video) => video.id === activeId),
  );
  const active = shown[activeIndex];
```

- [ ] **Step 4: Player corners**

Replace:

```tsx
            <div className="relative aspect-video overflow-hidden rounded-xl border bg-card">
```

with:

```tsx
            <div className="relative aspect-video overflow-hidden rounded-md bg-card">
```

- [ ] **Step 5: Caption like a project card**

Replace:

```tsx
            <h3 className="type-h4 mt-4">{active.title}</h3>
            <p className="mt-1 text-xs/4 text-foreground/60">
              {formatDate(active.published)}
            </p>
```

with:

```tsx
            <h3 className="mt-3 flex items-baseline gap-2">
              <span className="text-xs/4 text-foreground/60">
                {indexLabel(activeIndex)}
              </span>
              <span className="text-[clamp(1.125rem,1.4vw,1.375rem)] leading-tight tracking-[-0.02em]">
                {active.title}
              </span>
            </h3>
            <p className="mt-1 text-sm/5 text-foreground/60">
              {formatDate(active.published)}
            </p>
```

- [ ] **Step 6: The list as numbered rows**

Replace the whole `<ol className="space-y-1">` element, from that opening tag through its closing `</ol>`, with:

```tsx
          <ol className="lg:-mt-4">
            {shown.map((video, index) => (
              <Reveal
                as="li"
                key={video.id}
                delay={0.16 + index * 0.06}
                className="border-t first:border-t-0"
              >
                <button
                  type="button"
                  onClick={() => play(video.id)}
                  aria-current={video.id === active.id ? "true" : undefined}
                  className="grid w-full grid-cols-[2.5rem_minmax(0,1fr)] rounded-sm py-4 text-left text-foreground/60 transition-colors duration-300 hover:text-foreground aria-[current=true]:text-foreground"
                >
                  <span className="pt-1 text-xs/4 text-foreground/60">
                    {indexLabel(index)}
                  </span>
                  <span className="min-w-0">
                    <span className="line-clamp-2 text-base/6">
                      {video.title}
                    </span>
                    <span className="mt-1 block text-sm/5 text-foreground/60">
                      {formatDate(video.published)}
                    </span>
                  </span>
                </button>
              </Reveal>
            ))}
          </ol>
```

This removes the sliding highlight (and its `// Slides between rows...` comment) and the list thumbnails. `lg:-mt-4` lines the first title up with the top of the player on desktop, the same way `first:pt-0` does in Experience.

- [ ] **Step 7: Verify**

Run: `rtk proxy grep -nE "motion|layoutId|rounded-xl|bg-accent|sizes=\"128px\"|type-h4" src/features/videos/components/Videos.tsx`
Expected: no output, exit code 1.

Run: `bun run lint`
Expected: no errors, and no warning that names `Videos.tsx`.

Run: `bunx tsc --noEmit`
Expected: no output.

- [ ] **Step 8: Report**

Write `.handoff/2026-09-30-videos-consistency/executor.md` with the file you changed and the real output of every command above. The planner will check the result in the browser.
