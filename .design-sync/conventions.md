# downormal.dev conventions

The design system of Anugrah Surya Putra's portfolio: a monochrome, dark-only, type-first site. Black page, near-white text, grays for hierarchy, hairline borders, one font at one weight. No hue accent; red appears only on errors.

## Setup: always wrap in SiteRoot

Render everything inside `<SiteRoot>` once, at the top of the tree. It puts the `dark` class on `<html>` (every color token is defined under `.dark`; without it you get white shadcn defaults) and wraps `MotionProvider`, which makes the motion components respect reduced motion.

```jsx
const { SiteRoot, Button } = window.Downormal;
<SiteRoot>
  <main className="min-h-screen bg-background">...</main>
</SiteRoot>
```

## Styling: precompiled Tailwind classes

Style with Tailwind utility classes. The CSS is compiled ahead of time, so only classes that exist in `_ds_bundle.css` work. Invented classes and arbitrary values the site never used silently do nothing. Stick to the vocabulary below and to class strings copied from the `.prompt.md` examples.

| Family | Classes |
| --- | --- |
| Surfaces | `bg-background` (#000), `bg-card` (#0F0F0F), `bg-accent` / `bg-muted` / `bg-secondary` (#1F1F1F), `bg-primary` (#FAFAFA), `bg-destructive` (errors only) |
| Text | `text-foreground`, then opacity for hierarchy: `text-foreground/80`, `/70` (body), `/60` (meta, dates, the readable floor), `text-muted-foreground` |
| Type scale | `type-hero-name`, `type-section`, `type-display`, `type-h1`, `type-h2`, `type-h3`, `type-h4`, `type-lead`, `type-featured`; small text `text-sm/5`, `text-xs/4`, `text-base/6` |
| Layout | `page-container` (1280px max, fluid side padding), `grid`, `md:grid-cols-2`, `flex`, `items-end`, `justify-between`, `gap-*`, `p-*`, `mt-*` on the 4px scale |
| Lines | `border`, `border-t`, `border-b` (always #2E2E2E), `rounded-sm`, `rounded-md`, `rounded-xl` |
| Links | `link-line` on the text span plus `group` on the link: a 1px underline draws in on hover |

Rules:

- Weight 400 only. Never `font-medium`, `font-semibold` or `font-bold`; build hierarchy with size, tracking (already in `type-*`) and text opacity.
- Flat. No shadows, gradients or blur.
- One primary `Button` per view (the near-white fill is the site's only accent), paired with an `outline` Button at the same size, usually `size="lg"`.
- Label sections with `SectionLabel` (renders `[ Label ]`), not with bold headings.
- Separate sections and list rows with hairlines: `RevealLine` at a section top, `border-t first:border-t-0` between rows.
- Icons: `lucide-react` at `size-4` next to text, `aria-hidden`. No emoji.
- Motion: `MaskText` for big headings, `Reveal` for blocks, `RevealLine` for dividers, `RevealImage` for media. Pass `immediate` to `MaskText` and `Reveal` when they're visible on first paint, otherwise they wait to scroll into view. `RevealLine` and `RevealImage` have no `immediate` prop.

## Where the truth lives

- `guidelines/design-system.md`: the full system (color table with contrast, every type size, spacing, radius, motion timings, copy rules). Read it before composing a page.
- `_ds_bundle.css`: the compiled stylesheet; the tokens are the `.dark { --background: ... }` block.
- `components/<group>/<Name>/<Name>.prompt.md`: examples built from the live site.

## A section, the site's way

```jsx
const { SiteRoot, RevealLine, Reveal, SectionLabel, ArrowLink } = window.Downormal;
<SiteRoot>
  <section className="py-[clamp(3.5rem,6.5vw,6rem)]">
    <div className="page-container">
      <RevealLine />
      <div className="grid gap-y-8 pt-6 md:grid-cols-2 md:gap-x-[clamp(2rem,4vw,4rem)]">
        <Reveal className="flex flex-col items-start gap-3 md:sticky md:top-24 md:self-start">
          <SectionLabel>Experience</SectionLabel>
          <ArrowLink href="/experience">Full experience</ArrowLink>
        </Reveal>
        <div className="min-w-0">
          <h3 className="type-h3">Mobile Engineer</h3>
          <p className="mt-1 text-sm/5 text-muted-foreground">PT Bangun Rancang Indonesia Kita (BRIK)</p>
          <p className="mt-4 max-w-[65ch] text-base/[26px] text-foreground/70">Built a local-first sync engine that saves and uploads data in the background.</p>
        </div>
      </div>
    </div>
  </section>
</SiteRoot>
```
