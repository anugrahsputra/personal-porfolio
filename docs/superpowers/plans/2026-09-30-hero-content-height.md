# Hero content height Implementation Plan

> **For agentic workers:** Execute this plan inline with superpowers:executing-plans. Do not dispatch subagents. Steps use checkbox (`- [ ]`) syntax for tracking.

**Effort:** medium

**Goal:** Stop the type-only hero from filling a whole screen, so there is no empty black band above the name and the Experience section starts on the first screen.

**Architecture:** Class changes on two elements in `Hero.tsx`. The section loses the negative top margin that slid the old photo under the header, and the text block loses its full-screen height and bottom alignment. A fixed top padding places the name instead.

**Tech Stack:** Next.js 15, Tailwind CSS v4, bun.

**Spec:** No spec file. On 2026-09-30 the user approved a live preview of these exact values at 1440px and 390px.

## Global Constraints

- No doc comments. Do not add JSDoc or `//` comments that describe a function, component, prop or constant. Leave existing comments as they are, except the one this plan tells you to remove.
- No test files. The repo has no test framework, and AGENTS.md forbids adding one.
- Git is read-only for you. No commit, stash, checkout, reset or restore.
- Touch only `src/features/hero/components/Hero.tsx`.
- Do not delete `.next` and do not run `bun run build`. The user runs `bun run dev` in another pane.

## Review Focus

1. The name starts about 251px from the top of a 1440×900 viewport and about 160px from the top of a 390×844 viewport, and the Experience section's top rule is visible on the first screen at both sizes.
2. The scroll fade on the hero text (`textY`, `textOpacity`) still works and is unchanged.

---

### Task 1: Hero sized to its content

**Files:**
- Modify: `src/features/hero/components/Hero.tsx` (the `section` and the text `motion.div` below it)

- [ ] **Step 1: Drop the negative margin and its comment**

Replace:

```tsx
    // -mt-16 runs the hero up under the translucent header, so min-h-svh fills exactly one screen
    <section id="home" ref={ref} className="relative -mt-16 overflow-hidden">
```

with:

```tsx
    <section id="home" ref={ref} className="relative overflow-hidden">
```

- [ ] **Step 2: Size the text block to its content**

Replace:

```tsx
        className="page-container relative flex min-h-svh flex-col justify-end pt-32 pb-[clamp(2.5rem,5vw,4.5rem)]"
```

with:

```tsx
        className="page-container relative flex flex-col pt-[clamp(6rem,13vw,12rem)] pb-[clamp(2.5rem,5vw,4.5rem)]"
```

Change nothing else in the file.

- [ ] **Step 3: Verify**

Run: `rtk proxy grep -nE "min-h-svh|justify-end|-mt-16|pt-32" src/features/hero/components/Hero.tsx`
Expected: no output, exit code 1.

Run: `bun run lint`
Expected: no errors, and no warning that names `Hero.tsx`.

Run: `bunx tsc --noEmit`
Expected: no output.

- [ ] **Step 4: Report**

Write `.handoff/2026-09-30-hero-content-height/executor.md` with the file you changed and the real output of every command above. The planner will check the result in the browser.
