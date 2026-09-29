# Type and link details Implementation Plan

> **For agentic workers:** Execute this plan inline with superpowers:executing-plans. Do not dispatch subagents. Steps use checkbox (`- [ ]`) syntax for tracking.

**Effort:** medium

**Goal:** Move the site toward matthieugivelet.com's typography and link behavior while keeping the current dark color tokens.

**Architecture:** One font weight (400) everywhere, a `link-line` Tailwind utility that draws a 1px underline in from the left on hover or focus, an arrow that slides in after project card titles, and a first-line indent on two lead paragraphs. CSS and class changes only. No new components, no new dependencies.

**Tech Stack:** Next.js 15 App Router, Tailwind CSS v4 (`@utility` in `src/app/globals.css`), shadcn/ui, lucide-react, bun.

**Spec:** No spec file. The design was approved in chat on 2026-09-30 and is copied under "Design" below.

## Design

- Every `type-*` utility in `globals.css` uses `font-weight: 400`. Every `font-medium`, `font-semibold` and `font-bold` class in `src/` is removed, including in `src/components/ui/`. Sizes and tracking stay as they are.
- New `link-line` utility. A 1px line in the text color grows from the left edge on hover or keyboard focus and shrinks toward the right edge when the pointer leaves, over 0.7s with `cubic-bezier(0.18, 0.83, 0.27, 1)`. On devices without hover the line is always visible. It is also always visible when an ancestor has `aria-current="page"`. With reduced motion there is no transition.
- `link-line` goes on the element that holds the link text. When that element is a child of the link, the link gets the `group` class so hovering anywhere on the link draws the line.
- Applied to: desktop nav links, the desktop "Get in touch" link, footer links, the contact section's email and LinkedIn links, and `ArrowLink`. `ArrowLink` keeps its arrow and loses the arrow nudge on hover.
- Project cards: an `ArrowRight` icon after the title fades and slides in on hover or keyboard focus.
- The hero intro and the About lead get `indent-[2.5em]`, the same indent the Contact section already uses.

## Global Constraints

- No doc comments. Do not add JSDoc or `//` comments that describe a function, component, prop, constant or CSS rule. Leave existing comments exactly as they are.
- No test files. The repo has no test framework, and AGENTS.md forbids adding one.
- No new dependencies and no new color values. Use the existing tokens only.
- Git is read-only for you. No commit, stash, checkout, reset or restore.
- Match the surrounding code style: double quotes in `.tsx`, `cn()` for conditional classes, `@/` imports.
- Every animation must respect `prefers-reduced-motion`.
- Touch only the files listed in each task.

## Review Focus

1. Keyboard users. Tabbing onto a nav link, footer link, `ArrowLink` or contact link shows both the focus outline and the drawn underline.
2. Touch devices (`hover: none`). Underlines are visible without hovering, and the project card arrow does not get stuck visible after a tap.
3. Reduced motion. The underline appears or disappears instantly, and the card arrow appears with no slide.
4. Current page. On `/projects` and `/experience`, the matching desktop nav link shows its underline without hover.
5. The hero name at weight 400 with its existing `-0.055em` tracking. Letters must not touch or overlap at 1440px or 390px.

---

### Task 1: One font weight

**Files:**
- Modify: `src/app/globals.css:153-210`
- Modify: every file in the table below

- [ ] **Step 1: Set every `type-*` weight to 400**

In `src/app/globals.css`, change each of the nine `font-weight` declarations inside the `@utility type-*` blocks (currently lines 156, 163, 169, 176, 183, 189, 195, 202 and 208) to:

```css
  font-weight: 400;
```

- [ ] **Step 2: Remove the weight classes**

Remove only the weight token from each class string below. Leave every other class, and the spacing between the remaining classes, as it is.

| File | Line | Remove |
| --- | --- | --- |
| `src/app/error.tsx` | 19 | `font-bold` |
| `src/app/(main)/experience/page.tsx` | 114, 115 | `font-medium` |
| `src/app/(main)/experience/page.tsx` | 123 | `font-semibold` |
| `src/app/(main)/projects/page.tsx` | 133 | `font-medium` |
| `src/features/contact/components/Contact.tsx` | 41, 49, 103 | `font-medium` |
| `src/features/projects/components/ProjectCard.tsx` | 65, 73, 74, 89 | `font-medium` |
| `src/features/projects/components/ProjectCard.tsx` | 86 | `font-semibold` |
| `src/features/resume/components/Experience.tsx` | 31, 45 | `font-medium` |
| `src/features/resume/components/Experience.tsx` | 39 | `font-semibold` |
| `src/features/about/components/About.tsx` | 86 | `font-medium` |
| `src/features/videos/components/Videos.tsx` | 118, 150, 153 | `font-medium` |
| `src/features/hero/components/Hero.tsx` | 99 | `font-medium` |
| `src/components/ui/card.tsx` | 35 | `font-semibold` |
| `src/components/ui/alert.tsx` | 44 | `font-medium` |
| `src/components/ui/dialog.tsx` | 113 | `font-semibold` |
| `src/components/ui/badge.tsx` | 8 | `font-medium` |
| `src/components/ui/button.tsx` | 8 | `font-medium` |
| `src/components/ArrowLink.tsx` | 11 | `font-medium` |
| `src/components/layout/Navbar.tsx` | 27, 76, 90, 98, 132 | `font-medium` |
| `src/components/layout/Navbar.tsx` | 57 | `font-semibold` |
| `src/components/layout/PageHeader.tsx` | 23 | `font-medium` |
| `src/components/layout/Footer.tsx` | 16, 23 | `font-medium` |
| `src/components/SectionLabel.tsx` | 16 | `font-medium` |

Examples of the result:

```tsx
<h2 className="text-2xl">Something went wrong!</h2>
```

```tsx
const labelClass = "mb-2 block text-sm/5";
```

- [ ] **Step 3: Verify no weight classes remain**

Run: `rtk proxy grep -rnE "font-(medium|semibold|bold)" src`
Expected: no output, exit code 1.

Run: `rtk proxy grep -n "font-weight" src/app/globals.css`
Expected: nine lines, all `font-weight: 400;`.

---

### Task 2: The `link-line` utility and where it goes

**Files:**
- Modify: `src/app/globals.css` (append after the last `@utility`)
- Modify: `src/components/ArrowLink.tsx`
- Modify: `src/components/layout/Navbar.tsx:62-93`
- Modify: `src/components/layout/Footer.tsx:15-16, 35-37, 49-58`
- Modify: `src/features/contact/components/Contact.tsx:50-51`

**Interfaces:**
- Produces: the `link-line` class. Plan `2026-09-30-fullscreen-mobile-menu.md` uses it on the mobile menu's "Get in touch" link, and expects the desktop Navbar markup exactly as written in Step 3 below.

- [ ] **Step 1: Add the utility**

Append to the end of `src/app/globals.css`:

```css
@utility link-line {
  background-image: linear-gradient(currentColor, currentColor);
  background-repeat: no-repeat;
  background-position: 100% 100%;
  background-size: 0% 1px;
  transition: background-size 0.7s cubic-bezier(0.18, 0.83, 0.27, 1);

  &:hover,
  &:focus-visible,
  .group:hover &,
  .group:focus-visible &,
  [aria-current="page"] & {
    background-position: 0% 100%;
    background-size: 100% 1px;
  }

  @media (hover: none) {
    background-size: 100% 1px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
}
```

If `bun run build` rejects the nested selectors inside `@utility`, move the same block unchanged into `@layer components { .link-line { ... } }` and say so in your report.

- [ ] **Step 2: `ArrowLink`**

Replace the `className` constant and the `content` fragment in `src/components/ArrowLink.tsx` with:

```tsx
const className =
  "group inline-flex items-center gap-1.5 rounded-sm text-sm/5 text-foreground max-md:min-h-11";
```

```tsx
  const content = (
    <>
      <ArrowRight aria-hidden className="size-4" />
      <span className="link-line">{children}</span>
    </>
  );
```

- [ ] **Step 3: Desktop nav links and "Get in touch"**

In `src/components/layout/Navbar.tsx`, the `CENTER_ITEMS` list item and the desktop "Get in touch" link become:

```tsx
              <li key={item.name}>
                <Link
                  href={item.href}
                  aria-current={isCurrent ? "page" : undefined}
                  className={cn(
                    "group rounded-sm text-sm/5 transition-colors hover:text-foreground",
                    isCurrent ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  <span className="link-line">{item.name}</span>
                  <Count value={counts[item.href]} />
                </Link>
              </li>
```

```tsx
        <Link
          href="/#contact"
          className={cn(zone, "group -mr-2 hidden text-sm/5 md:block")}
        >
          <span className="link-line">Get in touch</span>
        </Link>
```

Leave the mobile menu button and dropdown alone apart from Task 1's weight removal. The next plan replaces them.

- [ ] **Step 4: Footer links**

In `src/components/layout/Footer.tsx`, add `group` to `linkClass`:

```tsx
const linkClass =
  "group inline-block rounded-sm py-1 text-base/6 tracking-[-0.01em] text-foreground/70 transition-colors hover:text-foreground";
```

Wrap the text of both link lists in a `link-line` span:

```tsx
                  <Link href={item.href} className={linkClass}>
                    <span className="link-line">{item.name}</span>
                  </Link>
```

```tsx
                  <a
                    href={item.href}
                    className={linkClass}
                    {...(item.href.startsWith("http") && {
                      target: "_blank",
                      rel: "noopener noreferrer",
                    })}
                  >
                    <span className="link-line">{item.name}</span>
                  </a>
```

- [ ] **Step 5: Contact links**

In `src/features/contact/components/Contact.tsx`, replace `linkClass`:

```tsx
const linkClass = "rounded-sm link-line";
```

Do not touch the underlined email link inside the failed-send `Alert`. It sits in running text and keeps its permanent underline.

- [ ] **Step 6: Verify the utility compiled**

Run: `bun run build`
Expected: the build succeeds. If it fails because the projects API or network is unreachable, paste the error in your report and keep going with Step 7.

Run: `rtk proxy grep -lo "\.group:hover \.link-line" .next/static/css/*.css`
Expected: one file path. Skip this if the build failed for API reasons.

- [ ] **Step 7: Lint and types**

Run: `bun run lint`
Expected: no errors.

Run: `bunx tsc --noEmit`
Expected: no output.

---

### Task 3: Project card arrow and lead indents

**Files:**
- Modify: `src/features/projects/components/ProjectCard.tsx:1-2, 72-77`
- Modify: `src/features/hero/components/Hero.tsx:94-100`
- Modify: `src/features/about/components/About.tsx:77`

- [ ] **Step 1: Card arrow**

In `src/features/projects/components/ProjectCard.tsx`, import the icon:

```tsx
import { ArrowRight, Lock } from "lucide-react";
```

The title row becomes:

```tsx
          <span className="mt-3 flex items-baseline gap-2">
            <span className="text-xs/4 text-foreground/60">{number}</span>
            <span className="text-[clamp(1.125rem,1.4vw,1.375rem)] leading-tight tracking-[-0.02em]">
              {project.title}
            </span>
            <ArrowRight
              aria-hidden
              className="size-4 shrink-0 self-center -translate-x-1 opacity-0 transition duration-700 ease-out group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 motion-reduce:transition-none"
            />
          </span>
```

- [ ] **Step 2: Hero intro indent**

In `src/features/hero/components/Hero.tsx`, add `indent-[2.5em]` to the intro `MaskText`:

```tsx
          <MaskText
            as="p"
            text={intro}
            immediate
            delay={0.8}
            className="max-w-[36ch] indent-[2.5em] text-[clamp(1.125rem,1.6vw,1.5rem)] leading-[1.3] tracking-[-0.02em] text-foreground/80"
          />
```

- [ ] **Step 3: About lead indent**

In `src/features/about/components/About.tsx`:

```tsx
              <MaskText as="p" text={lead} className="type-lead max-w-[32ch] indent-[2.5em]" />
```

- [ ] **Step 4: Lint, types, build**

Run: `bun run lint`
Expected: no errors.

Run: `bunx tsc --noEmit`
Expected: no output.

Run: `bun run build`
Expected: success, or the same API or network failure as Task 2, reported verbatim.

- [ ] **Step 5: Visual check**

If you can drive a browser (the `terminal-browser` skill), run `bun dev`, open `/`, `/projects` and `/experience` at 1440px and 390px wide, and check each Review Focus item. Put the screenshot paths in your report. If you can't drive a browser, say so in the report.

- [ ] **Step 6: Report**

Write `.handoff/2026-09-30-type-and-link-details/executor.md` with the list of files you changed and the real output of every command above. No summary of intent, no "should work".
