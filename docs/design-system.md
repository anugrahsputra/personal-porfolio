# Design system

This file describes the design system of downormal.dev as the code builds it on 2026-09-30. The source of truth is `src/app/globals.css`, `src/components/motion.tsx` and the components under `src/components/`. When this file and the code disagree, the code wins, and this file needs an update.

The layout and type take cues from [Matthieu Givelet's site](https://matthieugivelet.com), credited in the footer. Every value below is our own.

## Principles

- Monochrome. A true black page, near-white text, and grays for hierarchy. There is no hue accent. Red appears only on errors.
- One font, one weight. Instrument Sans at 400 everywhere. Hierarchy comes from size, tracking and text opacity, never from bold.
- Flat. Hairline borders, no gradients, no blur. The only shadow is the dialog's.
- Type first. The hero is type only. The one photo lives in About, in black and white.
- One easing curve. Every animation uses `EASE_OUT`, plays once, and respects reduced motion.
- Dark only. `<html>` always carries the `dark` class, so the light values in `:root` never render.

## Color

Tokens live in `src/app/globals.css` as HSL triplets under `.dark`, and `@theme inline` exposes them to Tailwind as `bg-*`, `text-*` and `border-*`.

| Token | HSL | Hex | Use |
| --- | --- | --- | --- |
| `background` | `0 0% 0%` | `#000000` | Page, navbar zones, mobile menu |
| `foreground` | `0 0% 98%` | `#FAFAFA` | Headings, body, icons |
| `card`, `popover` | `0 0% 6%` | `#0F0F0F` | Contact card, dialogs, Education band, empty media |
| `secondary`, `muted`, `accent` | `0 0% 12%` | `#1F1F1F` | Chips, hover fills, skeleton blocks |
| `input` | `0 0% 12%` | `#1F1F1F` | Input and textarea fill |
| `muted-foreground` | `0 0% 63%` | `#A1A1A1` | Inactive nav links, company lines |
| `border` | `0 0% 18%` | `#2E2E2E` | Dividers, card and row edges |
| `input-border` | `0 0% 45%` | `#737373` | Form field borders, underline of inline links |
| `primary` / `primary-foreground` | `0 0% 98%` / `0 0% 0%` | `#FAFAFA` / `#000000` | Primary button |
| `ring` | `0 0% 98%` | `#FAFAFA` | Focus outline |
| `destructive` | `0 62.8% 30.6%` | `#7F1D1D` | Error fills only |

### Text opacity

Secondary text is `foreground` at reduced opacity, not a separate gray token. On black it composites to these values.

| Class | Hex | Contrast on black | Use |
| --- | --- | --- | --- |
| `text-foreground` | `#FAFAFA` | 20.1:1 | Titles, labels, active states |
| `text-foreground/90` | `#E1E1E1` | 16.1:1 | Description text inside empty project media |
| `text-foreground/80` | `#C8C8C8` | 12.6:1 | Hero intro |
| `text-foreground/70` | `#AFAFAF` | 9.6:1 | Body copy, descriptions, footer links |
| `text-foreground/60` | `#969696` | 7.1:1 | Meta, dates, index numbers, brackets, placeholders |
| `marker:text-foreground/40` | `#646464` | 3.5:1 | List bullets only |

`/60` is the floor for readable text. `/40` is for decoration next to text that already reads.

### Color rules

- `border` measures 1.55:1 on black. That is fine for dividers and fails for anything a user has to find, so form fields use `input-border` (3.48:1 on the input fill).
- Red text on black measures 2.10:1. Errors put `destructive` in the fill and keep the text `foreground` (9.6:1 on the red).
- The primary button is the site's one bright surface. Use one per view for the main action and pair it with an `outline` button.
- The `chart-*` and `sidebar-*` tokens, `--portrait-brightness` and `.bg-gradient-radial` are shadcn or older leftovers. Nothing uses them.

## Typography

Instrument Sans loads through `next/font/google` in `src/app/layout.tsx` as `--font-instrument-sans`. Both `font-sans` and `font-mono` point to it. Do not add `font-medium`, `font-semibold` or `font-bold`.

Tracking tightens as size grows, from `-0.01em` at 18px to `-0.055em` on the hero name.

### Type utilities

Defined with `@utility` in `globals.css`. All are weight 400.

| Utility | Size | Line height | Tracking | Used by |
| --- | --- | --- | --- | --- |
| `type-hero-name` | `clamp(3.25rem, 8.6vw, 8rem)` | 0.9 | -0.055em | Hero name, `PageHeader` titles |
| `type-section` | `clamp(2.25rem, 4.2vw, 3.75rem)` | 1.05 | -0.04em | Home headings ("Selected work", "Videos") |
| `type-h1` | `clamp(2rem, 2.8vw, 2.5rem)` | 1.1 | -0.03em | Error and 404 pages |
| `type-lead` | `clamp(1.5rem, 2.3vw, 2.125rem)` | 1.25 | -0.02em | About lead paragraph |
| `type-h2` | `clamp(1.5rem, 1.95vw, 1.75rem)` | 1.2 | -0.02em | "Education" on /experience |
| `type-h3` | 1.25rem | 1.75rem | -0.01em | Past roles, education entries |
| `type-display` | `clamp(2.5rem, 3.9vw, 3.5rem)` | 1.05 | -0.04em | Unused |
| `type-featured` | `clamp(1.5rem, 2.4vw, 2.125rem)` | 1.15 | -0.025em | Unused |
| `type-h4` | 1.125rem | 26px | -0.01em | Unused |

At 8rem the hero name fills one line of the 1216px content box. Keep `md:whitespace-nowrap` on it.

### Recurring inline sizes

These repeat across components as arbitrary values. Copy them exactly when you need the same role.

| Role | Classes | Where |
| --- | --- | --- |
| Intro paragraph | `text-[clamp(1.125rem,1.6vw,1.5rem)] leading-[1.3] tracking-[-0.02em]` | Hero intro, `PageHeader` intro |
| Statement | `text-[clamp(1.5rem,2.4vw,2.125rem)] leading-[1.2] tracking-[-0.025em]` | Contact availability line |
| Item title | `text-[clamp(1.125rem,1.4vw,1.375rem)] leading-tight tracking-[-0.02em]` | Project card, video, archive row (md and up) |
| Current role, dialog title | `text-2xl/[30px] tracking-[-0.02em]` | Current job, `ProjectDialog` title |
| Long-form body | `text-base/[26px] text-pretty` | Experience bullets |
| Short body | `text-sm/[22px]` | Dialog description, About values, alerts |
| Label, meta, nav | `text-sm/5` | Section labels, links, dates, breadcrumbs |
| Index, small meta | `text-xs/4` | `01`, `02` numbers, dialog period |

### Measure and indent

- Line lengths are set in `ch`. `65ch` for bullets, `52ch` for error text, `40ch` for page intros, `36ch` for the hero intro, `32ch` for the About lead, `22ch` for the Contact statement.
- Lead paragraphs get a first-line indent of `indent-[clamp(2.5rem,3.5vw,3rem)]`. Hero intro, About lead and Contact statement use it.

### Small conventions

- Item numbers are two digits (`01`) in `text-xs/4 text-foreground/60`, in a `2.5rem` first column.
- Meta items are joined with ` · `. Year ranges read "2021 to 2024".
- Counts in the nav are superscripts: `(6)` at `0.65em` in `/60`.

## Layout

### Container

`page-container` wraps every section: `max-width: 80rem` (1280px), centered, `padding-inline: clamp(1rem, 2.5vw, 2rem)`. Full-bleed bands (the Education band on /experience) put `page-container` inside the band.

### Breakpoints

Tailwind's defaults. `md` (768px) is the main switch. Below it you get the mobile menu, one column and 44px touch targets. `sm` splits the contact form's name and email. `lg` adds the video sidebar and the archive's hover preview.

### Section patterns

The home page uses two section shapes. New sections should use one of them.

Split section (Experience, About, Contact, Footer):

```tsx
<section className="py-[clamp(3.5rem,6.5vw,6rem)]">
  <div className="page-container">
    <RevealLine />
    <div className="grid gap-y-8 pt-6 md:grid-cols-2 md:gap-x-[clamp(2rem,4vw,4rem)]">
      <Reveal className="md:sticky md:top-24 md:self-start">
        <SectionLabel>Label</SectionLabel>
      </Reveal>
      <div className="min-w-0">{/* content */}</div>
    </div>
  </div>
</section>
```

Headline section (Projects, Videos):

```tsx
<section className="pt-[clamp(3.5rem,5.5vw,5rem)] pb-[clamp(4rem,7vw,6.5rem)]">
  <div className="page-container">
    <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
      <MaskText as="h2" text="Heading" className="type-section" />
      <Reveal delay={0.2}>
        <ArrowLink href="/somewhere">See all</ArrowLink>
      </Reveal>
    </div>
    <div className="mt-[clamp(2rem,4vw,3.5rem)]">{/* content */}</div>
  </div>
</section>
```

Subpages open with `PageHeader` (breadcrumbs, a `type-hero-name` title, one intro line).

### Spacing

- Vertical spacing that should scale with the viewport uses `clamp(min, vw, max)` in rem. Section padding runs from about 3.5rem to 8.5rem. There are no fixed breakpoint jumps.
- Column gaps between the two halves of a split: `clamp(2rem,4vw,4rem)`.
- Heading to content: `clamp(2rem,4vw,3.5rem)`.
- Inside components, stick to the Tailwind scale (`gap-1.5` chips, `gap-3` button rows, `space-y-5` form fields, `py-4`/`py-5`/`py-8` list rows).

### Grids

| Grid | Classes |
| --- | --- |
| Project cards | `grid gap-x-3 gap-y-12 md:grid-cols-2`, four cards |
| Videos | `lg:grid-cols-[minmax(0,1fr)_360px]` |
| Project archive | `md:grid-cols-[minmax(0,5fr)_minmax(0,3fr)_minmax(11rem,2fr)]` |
| Label and value | `sm:grid-cols-[160px_minmax(0,1fr)]` |
| Numbered list | `grid-cols-[2.5rem_minmax(0,1fr)]` |
| Subpage entries | `md:flex-row`, label column `md:basis-[240px] lg:basis-[300px]` |

### Navbar

Sticky, `h-16`, no background of its own. Each of the three zones (name, center links, "Get in touch") sits on its own `rounded-sm bg-background px-2 py-1` box, so it stays readable when photos scroll under it. `scroll-pt-16` on `<html>` keeps anchor targets clear of it. Below `md` the links move into a full-screen menu that slides in from the right.

## Radius

Base `--radius` is `0.5rem`.

| Token | Size | Use |
| --- | --- | --- |
| `rounded-sm` | 4px | Text links (so the focus outline has corners), navbar zones, field errors |
| `rounded-md` | 6px | Buttons, inputs, badges, project media, video player |
| `rounded-lg` | 8px | Dialog, alert |
| `rounded-xl` | 12px | Card |
| `rounded-full` | | Video play button only |

The About photo has no radius.

## Borders and dividers

- The base layer applies `border-border` to everything, so a bare `border`, `border-t` or `border-b` is always `#2E2E2E`.
- Section tops use `RevealLine`, a 1px line that draws in from the left.
- List rows separate with `border-t first:border-t-0` (Experience, About values, video list) or `border-b` (archive).
- No shadows besides the dialog's `shadow-lg`.

## Motion

Library: `motion` (`motion/react`). Shared pieces live in `src/components/motion.tsx`.

`EASE_OUT = cubic-bezier(0.16, 1, 0.3, 1)`. Motion variants, the `link-line` transition and the mobile menu panel all use it. Tailwind hover transitions use `ease-out`.

### Components

| Component | What it does | Timing |
| --- | --- | --- |
| `Reveal` | Fades in and rises 24px | 0.7s, once, when 10% into view |
| `MaskText` | Each word or letter rises from behind its own mask. Screen readers get the plain text. | 0.9s each, stagger 0.035s (words) or 0.03s (letters) |
| `RevealLine` | Hairline scales in from the left | 1.2s |
| `RevealImage` | Clip-path wipes up from the bottom while the image settles from 1.15x | 1.1s wipe, 1.4s scale |

Pass `immediate` to `Reveal` and `MaskText` for content that starts on screen, so it plays on mount instead of waiting for scroll. `delay` staggers siblings.

### Delays

- Hero: name at 0.3s (by letter), intro at 0.8s (by word), buttons at 1.1s. The text drifts up 48px and fades as the hero scrolls out.
- `PageHeader`: breadcrumbs at 0, title at 0.1s, intro at 0.4s.
- Section heading link: 0.2s.
- Two-column grids: `(index % 2) * 0.1`.
- Video list: `0.16 + index * 0.06`.
- Mobile menu: panel 600ms in and 400ms out, links rise from 0.15s with 0.05s between them, "Close" at 0.3s.

### Hover durations

| Duration | Where |
| --- | --- |
| 700ms | Project image scale (1.03), card arrow slide-in, archive preview fade, archive row dimming (others drop to 50%) |
| 500ms | `link-line` underline, empty card fill |
| 300ms | Video list text color |

### Reduced motion

- `MotionProvider` sets `reducedMotion="user"`. Motion skips transforms and keeps opacity.
- CSS transitions carry `motion-reduce:transition-none` or `motion-safe:` prefixes. `link-line` drops its transition.
- Smooth scrolling is `motion-safe:scroll-smooth`.
- The hero's scroll drift uses static values under reduced motion, so server and client render the same.
- The loading skeleton does not pulse.

## Components

### Primitives

shadcn/ui, "new-york" style, in `src/components/ui/`. Variants use `cva`.

Button (`button.tsx`)

| Size | From md | Below md |
| --- | --- | --- |
| `sm` | 32px | 44px |
| `default` | 36px | 44px |
| `lg` | 40px | 44px |
| `icon` | 36px square | 44px square |

The site uses `default` (primary), `outline` and `ghost`. Page-level actions are `size="lg"`, one primary plus one outline: "Email me" and "Download resume" in the hero, "Contact me" and "Download resume" on /experience. The project dialog uses `sm` outline ("Live demo") and `sm` ghost ("Source"). Icons are 16px and sit before the label.

Badge (`badge.tsx`). `secondary` for tech chips, laid out as `ul.flex.flex-wrap.gap-1.5`. `outline` with a `Lock` icon for "Under NDA". 12px text, 12px icons.

Card (`card.tsx`). `bg-card`, `border`, `rounded-xl`. Only the contact form uses it, with `p-[clamp(1.25rem,2.5vw,2rem)]`.

Dialog (`dialog.tsx`). Max width 480px, `rounded-lg`, `p-5 md:p-6`, overlay `bg-black/80`. `ProjectDialog` caps it at `max-h-[85svh]` and scrolls. The close button is 36px, 44px below md.

Alert (`alert.tsx`). `default` on `bg-card` with `CircleCheck` for success. `destructive` on the red fill with `CircleAlert` for failure.

Input and Textarea. 44px tall with 16px text below md (so iOS does not zoom on focus), 36px with 14px text from md. `bg-input` fill, `border-input-border` edge, placeholder at `/60`.

`Separator` and the `Card` subcomponents exist but nothing uses them.

### Site components

`SectionLabel` (`src/components/SectionLabel.tsx`). Renders `[ Label ]` in `text-sm/5`. The brackets are `/60` and `aria-hidden`. Renders as `h2` by default, or `h3`/`p`.

`ArrowLink` (`src/components/ArrowLink.tsx`). A 16px `ArrowRight` and `link-line` text in `text-sm/5`, with `min-h-11` below md. `external` opens a new tab. Use it for "see more" links next to section headings and labels.

`link-line` (utility in `globals.css`). A 1px underline in the text color. It grows from the left on hover or keyboard focus and shrinks toward the right on leave, over 0.5s. It is always visible on devices without hover and under an ancestor with `aria-current="page"`. Put it on the span that holds the link text, and put `group` on the link.

Inline link in running text. When a link sits inside `/60` or `/70` copy, the color difference alone is too small, so it keeps a permanent underline:

```tsx
<a className="rounded-sm text-foreground underline decoration-input-border underline-offset-4 hover:decoration-foreground">
```

`PageHeader` and `Breadcrumbs` (`src/components/layout/`). Breadcrumbs are `text-sm/5` at `/60` with a 14px `ChevronRight`. The current page is `foreground` with `aria-current="page"`.

`FieldError` (in `Contact.tsx`). Red fill, `foreground` text, `CircleAlert` icon, `rounded-sm px-2 py-1.5`.

## Icons

Lucide only (`lucide-react`). No emoji in the UI.

| Size | Class | Where |
| --- | --- | --- |
| 12px | `size-3` | Inside badges |
| 14px | `size-3.5` | Breadcrumb chevron |
| 16px | `size-4` | Buttons, links, contact list, alerts, field errors |
| 24px | `size-6` | Play icon inside a 64px circle |

Icons next to text are `aria-hidden`. In lists (contact details) they are `/60`.

Icons in use: `ArrowRight`, `ChevronRight`, `CircleAlert`, `CircleCheck`, `Download`, `Linkedin`, `Loader2`, `Lock`, `Mail`, `MapPin`, `Play`, `XIcon`.

## Imagery

- One portrait, in About. A single gray channel, 3:4, no radius, no border, at most `26rem` wide.
- Project media is 16:10 with `rounded-md`, revealed by `RevealImage`, and scales to 1.03 on hover. Projects without media get a bordered panel of the same shape with the description's first sentence, so the grid keeps its rhythm.
- The archive shows a 16:10 preview beside the hovered row, `lg` and up only.
- Video thumbnails come from `i.ytimg.com`. The `youtube-nocookie.com` iframe mounts only after a click.
- Images that repeat a nearby title get `alt=""`. Use `next/image` with `sizes` for every image.

## Accessibility

- Focus: every focusable element gets a 2px outline in `ring` (`#FAFAFA`) with a 2px offset on `:focus-visible`. Links carry `rounded-sm` so the outline has corners.
- Touch targets: 44px below `md` for buttons, inputs, `ArrowLink`, the menu button and the dialog close.
- Contrast: no readable text below `foreground/60` (7.1:1). Form borders meet 3:1.
- Forms: validate on submit, set `aria-invalid` and `aria-describedby` on bad fields, focus the first one, and show `FieldError` under it.
- Screen readers: `MaskText` renders the full text in `sr-only`. Decorative brackets, arrows and dividers are `aria-hidden`. Icon-only buttons have `sr-only` labels.
- Dates format in UTC so server and client render the same string.

## Copy

- Sentence case everywhere, including buttons and headings.
- First person and plain. "Available for freelance mobile work and full-time roles."
- Buttons are a verb plus an object. "Send message", "Download resume", "Try again".
- Error messages say what failed and what to do next. "The mail server didn't accept it. Try again, or email me at ..."
- No exclamation marks, no emoji.

## Known drift

These places don't match the system yet.

- `src/app/error.tsx`, the root error boundary, is still shadcn's default: centered, `text-2xl`, "Something went wrong!". `src/app/(main)/error.tsx` shows the intended pattern.
- `src/app/(main)/loading.tsx` still draws the old hero with a 4:5 photo block and a three-column project grid.
- `<meta name="theme-color" content="#ffffff">` in `src/app/layout.tsx`, on a black site.
- The Contact statement repeats `type-featured` inline with `leading-[1.2]` instead of 1.15.
- `Badge`'s `destructive` variant uses `text-white` and `dark:bg-destructive/60`, while `Button`'s uses `text-foreground`. Nothing renders the badge variant.
- `docs/claude-design/prompts.md` describes Inter, weights 400 to 700 and a blurred navbar. The code has moved past all three.
