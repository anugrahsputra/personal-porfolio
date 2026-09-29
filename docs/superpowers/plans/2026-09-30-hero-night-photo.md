# Hero night photo Implementation Plan

> **For agentic workers:** Execute this plan inline with superpowers:executing-plans. Do not dispatch subagents. Steps use checkbox (`- [ ]`) syntax for tracking.

**Effort:** medium

**Goal:** Replace the hero portrait with the night park photo the user picked.

**Architecture:** Add one image file under `public/` and change one `src` in the hero. The old `photo.png` stays, because the Open Graph and Twitter metadata in several pages still point at it.

**Tech Stack:** Next.js 15 (`next/image`), bun.

**Spec:** No spec file. The user picked "crop E" after a live preview on 2026-09-30.

## The image

The planner already prepared the file at
`/private/tmp/claude-501/-Users-downormal-Dev-projects-portfolio-frontend/b08a8ca4-34ce-4057-80e0-13350a676832/scratchpad/hero/night-e-clean.jpg`:

- Cropped from `~/Downloads/IMG_0814.JPG`, 1600×2133 (3:4), JPEG quality 82.
- Rotated upright in the pixel data. The iPhone original stores portrait as landscape pixels plus an EXIF orientation tag.
- EXIF removed entirely. The original carries GPS coordinates, and a leftover orientation tag would make browsers rotate the upright pixels a second time.

## Global Constraints

- No doc comments. Do not add JSDoc or `//` comments that describe a function, component, prop or constant. Leave existing comments exactly as they are.
- No test files. The repo has no test framework, and AGENTS.md forbids adding one.
- Git is read-only for you. No commit, stash, checkout, reset or restore.
- Touch only `public/images/photo/hero.jpg` (new) and `src/features/hero/components/Hero.tsx`.
- Do not delete or change `public/images/photo/photo.png`.
- Do not delete `.next` and do not run `bun run build`. The user runs `bun run dev` in another pane.

## Review Focus

1. The committed JPEG has no EXIF segment: no GPS, no orientation tag.
2. `photo.png` is untouched and still referenced by the page metadata.

---

### Task 1: Swap the hero photo

**Files:**
- Create: `public/images/photo/hero.jpg`
- Modify: `src/features/hero/components/Hero.tsx` (the `Image` `src`)

- [ ] **Step 1: Copy the prepared image**

```bash
cp /private/tmp/claude-501/-Users-downormal-Dev-projects-portfolio-frontend/b08a8ca4-34ce-4057-80e0-13350a676832/scratchpad/hero/night-e-clean.jpg public/images/photo/hero.jpg
```

- [ ] **Step 2: Point the hero at it**

In `src/features/hero/components/Hero.tsx`, change:

```tsx
            src="/images/photo/photo.png"
```

to:

```tsx
            src="/images/photo/hero.jpg"
```

Change nothing else in the file.

- [ ] **Step 3: Verify**

Run: `python3 -c "d=open('public/images/photo/hero.jpg','rb').read(); print('exif' if b'Exif\x00\x00' in d[:200000] else 'no exif', len(d))"`
Expected: `no exif` and a size near 1.26 MB.

Run: `sips -g pixelWidth -g pixelHeight public/images/photo/hero.jpg`
Expected: 1600 × 2133.

Run: `rtk proxy grep -rn "photo.png" src`
Expected: the metadata references remain, and no match in `Hero.tsx`.

Run: `bun run lint`
Expected: no errors.

Run: `bunx tsc --noEmit`
Expected: no output.

- [ ] **Step 4: Report**

Write `.handoff/2026-09-30-hero-night-photo/executor.md` with the list of files you changed or added and the real output of every command above. The planner will check the result in the browser.
