# About photo Implementation Plan

> **For agentic workers:** Execute this plan inline with superpowers:executing-plans. Do not dispatch subagents. Steps use checkbox (`- [ ]`) syntax for tracking.

**Effort:** medium

**Goal:** Take the photo out of the hero, so the hero is type only, and show a black and white photo of the user as a plain rectangle in the About section.

**Architecture:** The hero loses its photo layer and the scroll code that only moved the photo. Its text block fills one screen with the content at the bottom, on every width. About gets a `next/image` under its section label, inside the column that is already sticky on desktop. One image file is added and the unused hero image is deleted.

**Tech Stack:** Next.js 15 (`next/image`), Tailwind CSS v4, `motion/react`, bun.

**Spec:** No spec file. On 2026-09-30 the user approved a live preview of this layout at 1440px and 390px.

## The image

The planner already prepared the file at
`/private/tmp/claude-501/-Users-downormal-Dev-projects-portfolio-frontend/b08a8ca4-34ce-4057-80e0-13350a676832/scratchpad/hero/about-bw.jpg`:

- The user's photo of themselves sitting on a ledge, 1500×2000 (3:4), not cropped.
- Converted to a single gray channel. JPEG quality 82, 386,013 bytes.
- All metadata stripped.

## Global Constraints

- No doc comments. Do not add JSDoc or `//` comments that describe a function, component, prop or constant. Leave existing comments as they are, except the ones this plan tells you to change or remove.
- No test files. The repo has no test framework, and AGENTS.md forbids adding one.
- Git is read-only for you. No commit, stash, checkout, reset or restore. Delete the old image with plain `rm`, not `git rm`.
- Touch only `public/images/photo/about.jpg` (new), `public/images/photo/hero-dark.jpg` (delete), `src/features/hero/components/Hero.tsx` and `src/features/about/components/About.tsx`.
- Do not delete or change `public/images/photo/photo.png`. The Open Graph and Twitter metadata still use it.
- Do not delete `.next` and do not run `bun run build`. The user runs `bun run dev` in another pane.

## Review Focus

1. No unused imports or variables are left in `Hero.tsx` (`Image`, `useSpring`, `EASE_OUT`, `smoothProgress`, `photoY`, `photoOpacity`).
2. Nothing in `src/` or `public/` still references `hero-dark.jpg`.
3. The About photo keeps its 3:4 shape with nothing cropped, is at most 416px wide on desktop, and fills the content width on a 390px phone.
4. On a 390×844 phone the hero text and both buttons sit at the bottom of the first screen, with nothing pushed below the fold.
5. On a 1440×900 desktop the sticky About column (label and photo) fits in the viewport.

---

### Task 1: Hero without the photo

**Files:**
- Modify: `src/features/hero/components/Hero.tsx`

- [ ] **Step 1: Replace the imports**

Replace lines 1 to 17 with:

```tsx
"use client";

import { useRef } from "react";
import { Download } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

import { Button } from "@/components/ui/button";
import { MaskText, Reveal } from "@/components/motion";
import { RESUME_PDF_URL } from "@/lib/site";
import { ResumeData } from "@/features/resume/types";
```

- [ ] **Step 2: Remove the photo's scroll values**

Replace:

```tsx
  // The spring smooths the photo so the parallax doesn't feel glued to the wheel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });
  const photoY = useTransform(smoothProgress, [0, 1], ["0%", "25%"]);
  const photoOpacity = useTransform(smoothProgress, [0, 1], [1, 0.2]);
  const textY = useTransform(scrollYProgress, [0, 0.6], [0, -48]);
```

with:

```tsx
  const textY = useTransform(scrollYProgress, [0, 0.6], [0, -48]);
```

- [ ] **Step 3: Remove the photo and move the text to the bottom of the screen**

Replace everything from the `-mt-16` comment down to the opening of the text `motion.div` (its `className` line and `>`), that is:

```tsx
    // -mt-16 runs the photo up under the translucent header
    <section id="home" ref={ref} className="relative -mt-16 overflow-hidden">
      {/* Mobile: full width, fading out at the bottom by 84% of its height.
          Desktop: right half of the viewport, fading out to the left, so the text column sits on solid black */}
      <motion.div
        style={{
          y: reduceMotion ? 0 : photoY,
          opacity: reduceMotion ? 1 : photoOpacity,
        }}
        className="absolute inset-x-0 top-0 aspect-[4/5] mask-b-from-45% mask-b-to-84% md:inset-y-0 md:left-auto md:aspect-auto md:w-1/2 md:mask-l-from-50% md:mask-b-from-80% md:mask-b-to-100%"
      >
        <motion.div
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: EASE_OUT }}
          className="absolute inset-0"
        >
          <Image
            src="/images/photo/hero-dark.jpg"
            alt={`Portrait of ${initialData.name}`}
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover object-top grayscale"
          />
        </motion.div>
      </motion.div>

      {/* pt-[105vw] starts the text at the photo's 84% line on mobile (4:5 photo, 1.25 x 0.84).
          On desktop the name sits low, across the photo's darker lower half, clear of the face. */}
      <motion.div
        style={{
          y: reduceMotion ? 0 : textY,
          opacity: reduceMotion ? 1 : textOpacity,
        }}
        className="page-container relative flex flex-col pt-[105vw] pb-[clamp(2.5rem,5vw,4.5rem)] md:min-h-svh md:justify-end md:pt-32"
      >
```

with:

```tsx
    // -mt-16 runs the hero up under the translucent header, so min-h-svh fills exactly one screen
    <section id="home" ref={ref} className="relative -mt-16 overflow-hidden">
      <motion.div
        style={{
          y: reduceMotion ? 0 : textY,
          opacity: reduceMotion ? 1 : textOpacity,
        }}
        className="page-container relative flex min-h-svh flex-col justify-end pt-32 pb-[clamp(2.5rem,5vw,4.5rem)]"
      >
```

Leave everything after it (the `MaskText` name, the intro, the buttons, the closing tags) unchanged.

- [ ] **Step 4: Check for leftovers**

Run: `rtk proxy grep -nE "Image|useSpring|EASE_OUT|smoothProgress|photoY|photoOpacity|hero-dark" src/features/hero/components/Hero.tsx`
Expected: no output, exit code 1.

---

### Task 2: Photo in About

**Files:**
- Create: `public/images/photo/about.jpg`
- Delete: `public/images/photo/hero-dark.jpg`
- Modify: `src/features/about/components/About.tsx`

- [ ] **Step 1: Copy the prepared image and delete the unused one**

```bash
cp /private/tmp/claude-501/-Users-downormal-Dev-projects-portfolio-frontend/b08a8ca4-34ce-4057-80e0-13350a676832/scratchpad/hero/about-bw.jpg public/images/photo/about.jpg
rm public/images/photo/hero-dark.jpg
```

- [ ] **Step 2: Import `next/image`**

At the top of `src/features/about/components/About.tsx`, above the `Badge` import:

```tsx
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
```

- [ ] **Step 3: Add the photo under the section label**

Replace:

```tsx
          <Reveal className="md:sticky md:top-24 md:self-start">
            <SectionLabel>About</SectionLabel>
          </Reveal>
```

with:

```tsx
          <Reveal className="md:sticky md:top-24 md:self-start">
            <SectionLabel>About</SectionLabel>
            <Image
              src="/images/photo/about.jpg"
              alt={`${data.name} sitting on a ledge in the city`}
              width={1500}
              height={2000}
              sizes="(min-width: 768px) 416px, 100vw"
              className="mt-6 h-auto w-full max-w-[26rem]"
            />
          </Reveal>
```

No mask, no rounded corners, no `grayscale` class. The file is already gray, and the user asked for the photo not to blend into the background.

- [ ] **Step 4: Verify**

Run: `python3 -c "d=open('public/images/photo/about.jpg','rb').read(); print('exif' if b'Exif\x00\x00' in d else 'no exif', 'gps' if b'GPS' in d[:65536] else 'no gps', len(d))"`
Expected: `no exif no gps 386013`

Run: `sips -g pixelWidth -g pixelHeight public/images/photo/about.jpg`
Expected: 1500 × 2000.

Run: `rtk proxy grep -rn "hero-dark" src public`
Expected: no output, exit code 1.

Run: `rtk proxy grep -rn "photo.png" src`
Expected: the metadata references in `layout.tsx`, `experience/page.tsx` and `projects/page.tsx` remain.

Run: `bun run lint`
Expected: no errors, and no warning that names `Hero.tsx` or `About.tsx`.

Run: `bunx tsc --noEmit`
Expected: no output.

- [ ] **Step 5: Report**

Write `.handoff/2026-09-30-about-photo/executor.md` with the list of files you added, changed or deleted and the real output of every command in Task 1 Step 4 and Task 2 Step 4. The planner will check the result in the browser.
