# Hero dark grade Implementation Plan

> **For agentic workers:** Execute this plan inline with superpowers:executing-plans. Do not dispatch subagents. Steps use checkbox (`- [ ]`) syntax for tracking.

**Effort:** medium

**Goal:** Replace the hero portrait with a wider, darker black and white crop of the same night park photo.

**Architecture:** Add one image file under `public/`, point the hero's `Image` at it, and delete the image it replaces. The file gets a new name so no cached copy of the old `/_next/image?url=/images/photo/hero.jpg` response can serve the old photo after deploy.

**Tech Stack:** Next.js 15 (`next/image`), bun.

**Spec:** No spec file. On 2026-09-30 the user compared "E dark" and "mid dark" in the live hero at 1440px and 390px and picked "mid dark".

## The image

The planner already prepared the file at
`/private/tmp/claude-501/-Users-downormal-Dev-projects-portfolio-frontend/b08a8ca4-34ce-4057-80e0-13350a676832/scratchpad/hero/mid-dark.jpg`:

- Built from the user's original iPhone photo, not from the ChatGPT render the user first sent.
- Crop of 2000×2667 at offset x=570, y=1365 from the upright 3024×4032 frame, resized to 1600×2133 (3:4).
- Grayscale, levels `12%,100%,0.45`, and a radial darkening toward the edges. Single gray channel, JPEG quality 82, 442,821 bytes.
- All metadata stripped. The original carries GPS coordinates.

## Global Constraints

- No doc comments. Do not add JSDoc or `//` comments that describe a function, component, prop or constant. Leave existing comments exactly as they are.
- No test files. The repo has no test framework, and AGENTS.md forbids adding one.
- Git is read-only for you. No commit, stash, checkout, reset or restore. Delete the old image with plain `rm`, not `git rm`.
- Touch only `public/images/photo/hero-dark.jpg` (new), `public/images/photo/hero.jpg` (delete) and `src/features/hero/components/Hero.tsx`.
- Do not delete or change `public/images/photo/photo.png`. The Open Graph and Twitter metadata still use it.
- Keep the `grayscale` class on the `Image`. It is harmless on a gray file and the plan does not ask to remove it.
- Do not delete `.next` and do not run `bun run build`. The user runs `bun run dev` in another pane.

## Review Focus

1. The new JPEG has no EXIF segment and no GPS data.
2. Nothing in `src/` or `public/` still references `hero.jpg`.
3. `photo.png` is untouched and still referenced by the page metadata.

---

### Task 1: Swap the hero photo

**Files:**
- Create: `public/images/photo/hero-dark.jpg`
- Delete: `public/images/photo/hero.jpg`
- Modify: `src/features/hero/components/Hero.tsx:66` (the `Image` `src`)

- [ ] **Step 1: Copy the prepared image**

```bash
cp /private/tmp/claude-501/-Users-downormal-Dev-projects-portfolio-frontend/b08a8ca4-34ce-4057-80e0-13350a676832/scratchpad/hero/mid-dark.jpg public/images/photo/hero-dark.jpg
```

- [ ] **Step 2: Point the hero at it**

In `src/features/hero/components/Hero.tsx`, change:

```tsx
            src="/images/photo/hero.jpg"
```

to:

```tsx
            src="/images/photo/hero-dark.jpg"
```

Change nothing else in the file.

- [ ] **Step 3: Delete the old image**

```bash
rm public/images/photo/hero.jpg
```

- [ ] **Step 4: Verify**

Run: `python3 -c "d=open('public/images/photo/hero-dark.jpg','rb').read(); print('exif' if b'Exif\x00\x00' in d else 'no exif', 'gps' if b'GPS' in d[:65536] else 'no gps', len(d))"`
Expected: `no exif no gps 442821`

Run: `sips -g pixelWidth -g pixelHeight public/images/photo/hero-dark.jpg`
Expected: 1600 × 2133.

Run: `rtk proxy grep -rn "hero.jpg" src public`
Expected: no output, exit code 1.

Run: `rtk proxy grep -rn "photo.png" src`
Expected: the metadata references remain, and no match in `Hero.tsx`.

Run: `bun run lint`
Expected: no errors.

Run: `bunx tsc --noEmit`
Expected: no output.

- [ ] **Step 5: Report**

Write `.handoff/2026-09-30-hero-dark-grade/executor.md` with the list of files you added, changed or deleted and the real output of every command above. The planner will check the result in the browser.
