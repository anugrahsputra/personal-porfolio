# Layout fixes Implementation Plan

> **For agentic workers:** Execute this plan inline with superpowers:executing-plans. Do not dispatch subagents. Steps use checkbox (`- [ ]`) syntax for tracking.

**Effort:** medium

**Goal:** Fix two layout bugs found in a browser audit on 2026-09-30: the hero intro and About lead breaking into one word per line, and the mobile menu counts being clipped.

**Architecture:** One class added in each of two files. Both fixes were confirmed live in the browser before this plan was written.

**Tech Stack:** Next.js 15, Tailwind CSS v4, bun.

**Spec:** No spec file. The root causes and fixes are under "Findings" below.

## Findings

1. **One word per line in the hero intro and About lead.** `text-indent` is an inherited property. `MaskText` in `src/components/motion.tsx` wraps each word, and each part of a word, in nested `inline-block` spans. When the `<p>` has `indent-[2.5em]`, every one of those spans inherits the indent and applies it again inside itself. Measured at 1440px: the `<p>` and all three nested spans compute `text-indent: 45px`, so each word carries about 135px of leading space. Setting `text-indent: 0` on the word span in the live page took the hero intro from 10 lines to 3 and the About lead from 21 lines to 5, while the first-line indent of the paragraph stayed.
2. **Mobile menu counts clipped.** Tailwind's preflight styles `sup` with `position: relative; top: -0.5em; line-height: 0`. In the mobile menu each link sits inside an `overflow-hidden` `li` (the mask for the rise animation), so the raised count is cut off at the top of its row. Measured: `position: relative`, `top: -10.24px`, `line-height: 0px`. Setting `position: static` and `line-height: 1` in the live page showed "(10)" and "(3)" whole, at the top right of "Projects" and "Videos".

## Global Constraints

- No doc comments. Do not add JSDoc or `//` comments that describe a function, component, prop or constant. Leave existing comments exactly as they are.
- No test files. The repo has no test framework, and AGENTS.md forbids adding one.
- No new dependencies and no new color values.
- Git is read-only for you. No commit, stash, checkout, reset or restore.
- Touch only `src/components/motion.tsx` and `src/components/layout/Navbar.tsx`.
- Do not delete `.next` and do not run `bun run build`. The user runs `bun run dev` in another pane, and both write into the `.next` directory that server uses.

## Review Focus

1. The Contact paragraph (`src/features/contact/components/Contact.tsx`, a plain `<p>` with `indent-[2.5em]`) must keep its first-line indent. The fix is inside `MaskText` only.
2. `MaskText` uses without an indent (section headings, the hero name, the page header title) must render exactly as before.
3. The desktop nav counts (inline `sup` inside the centered links) must keep their raised position. Only the mobile menu call passes the new classes.

---

### Task 1: Stop `MaskText` spans inheriting the indent

**Files:**
- Modify: `src/components/motion.tsx` (the word span inside `MaskText`, currently line 103)

- [ ] **Step 1: Reset the indent on the word span**

Change:

```tsx
          <span aria-hidden className="inline-block whitespace-nowrap">
```

to:

```tsx
          <span aria-hidden className="inline-block indent-0 whitespace-nowrap">
```

The part and letter spans inside it inherit `0` from this span, so they need no change.

- [ ] **Step 2: Verify**

Run: `rtk proxy grep -n 'className="inline-block indent-0 whitespace-nowrap"' src/components/motion.tsx`
Expected: one line.

---

### Task 2: Unclip the mobile menu counts

**Files:**
- Modify: `src/components/layout/Navbar.tsx` (the `Count` inside the mobile menu's `NAV_ITEMS` map)

- [ ] **Step 1: Add `static leading-none` to the menu count**

Change:

```tsx
                              <Count
                                value={counts[item.href]}
                                className="mt-[0.35em] ml-1 text-[0.35em]"
                              />
```

to:

```tsx
                              <Count
                                value={counts[item.href]}
                                className="static mt-[0.35em] ml-1 text-[0.35em] leading-none"
                              />
```

Do not change the `Count` component itself or the desktop nav's `<Count value={counts[item.href]} />`.

- [ ] **Step 2: Lint and types**

Run: `bun run lint`
Expected: no errors.

Run: `bunx tsc --noEmit`
Expected: no output.

Do not run `bun run build`. It writes into the same `.next` directory as the user's running dev server.

- [ ] **Step 3: Report**

Write `.handoff/2026-09-30-layout-fixes/executor.md` with the list of files you changed and the real output of every command above. The planner will check both fixes in the browser, so skip the browser check.
