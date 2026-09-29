# Instrument Sans Implementation Plan

> **For agentic workers:** Execute this plan inline with superpowers:executing-plans. Do not dispatch subagents. Steps use checkbox (`- [ ]`) syntax for tracking.

**Effort:** medium

**Goal:** Replace Inter with Instrument Sans so the type matches matthieugivelet.com more closely.

**Architecture:** Swap the `next/font/google` import in the root layout and point the Tailwind font tokens at the new CSS variable. No other file changes.

**Tech Stack:** Next.js 15 (`next/font/google`), Tailwind CSS v4, bun.

**Spec:** No spec file. The decision is under "Decision" below.

## Decision

The reference site uses GT Standard, a paid Grilli Type face. The planner swapped four free Google fonts onto the running site at 1440px (Geist, Inter Tight, Hanken Grotesk, Instrument Sans) and compared them against screenshots of the reference. Instrument Sans is the closest: a compact grotesque with tight default spacing, close to GT Standard in body text. `next/font/google` ships it (weights 400 to 700, variable, `latin` subset).

## Global Constraints

- No doc comments. Do not add JSDoc or `//` comments that describe a function, component, prop or constant. Leave existing comments exactly as they are.
- No test files. The repo has no test framework, and AGENTS.md forbids adding one.
- No new dependencies. `next/font/google` is part of Next.
- Git is read-only for you. No commit, stash, checkout, reset or restore.
- Touch only `src/app/layout.tsx` and `src/app/globals.css`.
- Do not delete `.next` and do not run `bun run build`. The user runs `bun run dev` in another pane, and both write into the `.next` directory that server uses.

## Review Focus

1. No reference to `Inter`, `inter` or `--font-inter` is left in `src/`.
2. `body` still gets both the variable class and the font class, so text renders in Instrument Sans even where `font-sans` isn't applied.

---

### Task 1: Swap the font

**Files:**
- Modify: `src/app/layout.tsx:3, 7-11` and the `body` `className` (currently line 148)
- Modify: `src/app/globals.css:10-11`

- [ ] **Step 1: Root layout**

In `src/app/layout.tsx`, replace the import:

```tsx
import { Instrument_Sans } from "next/font/google";
```

Replace the `inter` constant:

```tsx
const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument-sans",
});
```

Replace the `body` `className`:

```tsx
        className={`${instrumentSans.variable} ${instrumentSans.className} bg-background text-foreground antialiased`}
```

- [ ] **Step 2: Tailwind tokens**

In `src/app/globals.css`, inside `@theme inline`:

```css
  --font-sans: var(--font-instrument-sans);
  --font-mono: var(--font-instrument-sans);
```

- [ ] **Step 3: Verify**

Run: `rtk proxy grep -rnE "\bInter\b|\binter\b|--font-inter" src`
Expected: no output.

Run: `bun run lint`
Expected: no errors.

Run: `bunx tsc --noEmit`
Expected: no output.

Do not run `bun run build`.

- [ ] **Step 4: Report**

Write `.handoff/2026-09-30-font-instrument-sans/executor.md` with the list of files you changed and the real output of every command above. The planner will check the result in the browser, so skip the browser check.
