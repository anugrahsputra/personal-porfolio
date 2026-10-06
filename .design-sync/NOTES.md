# design-sync notes

## How this repo is wired

- This is a Next.js app, not a published package. There is no `dist/` and no `.d.ts`. The sync builds from its own tiny package in `.design-sync/pkg/`:
  - `package.json` names it `downormal-ui` with `"types": "index.d.ts"`.
  - `entry.tsx` re-exports the synced components from `src/` by relative path. Add a component here first, then pin it in `componentSrcMap`.
  - `index.d.ts` is `export * from "./entry"`, so ts-morph reads prop types straight from the `src/` `.tsx` files. Props declared in `src/` are kept, inherited DOM props from `@types/react` are dropped.
  - `SiteRoot.tsx` copies what `src/app/layout.tsx` does to `<html>`/`<body>`: adds `dark` to `<html>` and wraps `MotionProvider`. It is `cfg.provider`.
  - `next-link.tsx` plus `tsconfig.json` (`paths` maps `next/link` to it). The real `next/link` reads `process.env.__NEXT_*` at module init, which throws `ReferenceError: process is not defined` and takes the whole bundle down (every card fails `[BUNDLE_EXPORT]`). Outside Next it only renders an `<a>` anyway. The bundler's tsconfig plugin reads `paths` directly and ignores `extends`, so the pkg tsconfig repeats `@/*`.
  - `tailwind.css` imports `src/app/globals.css`, defines `--font-instrument-sans` (next/font sets it at runtime on the site), and safelists the utility vocabulary named in `conventions.md` with `@source inline(...)`.
- Stylesheet: `cfg.buildCmd` compiles `tailwind.css` into `.design-sync/pkg/styles.css` (gitignored) with `@tailwindcss/cli@4.3.0` from `.ds-sync/`. Run it from the repo root before every `package-build.mjs`, and again whenever `src/` or `.design-sync/previews/` gain class names: previews are scanned because they aren't gitignored. Keep the CLI version equal to the repo's `tailwindcss`.
- Font: `.design-sync/pkg/fonts/` holds Instrument Sans (SIL OFL), latin subset, variable 400-700, downloaded from fonts.gstatic.com v4. Same face and subset `next/font` loads.
- Groups come from stub docs in `.design-sync/docs/<Name>.md` (category frontmatter only, so prompts stay synthesized with the preview examples). Breadcrumbs and PageHeader take `layout` from their `src/components/layout/` dir.
- Compound parts (`CardHeader`, `DialogContent`, `AlertTitle`, ...), `MotionProvider`, `SiteRoot` and `MotionGlobalConfig` are exported but excluded from cards with `componentSrcMap: null`.
- `guidelinesGlob` ships `docs/design-system.md` as the design agent's guideline.

## Running it

- No Playwright browser cache on this machine. `playwright` is installed in `.ds-sync/` with `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1`, and validate/capture run against system Chrome: `DS_CHROMIUM_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"`.
- Repo gates: `eslint.config.mjs` ignores `.ds-sync/**`, `ds-bundle/**` and `.design-sync/**`. Without that, `bun run lint` walks the staged scripts and the 560 KB bundle.

## Preview gotchas

- `package-capture.mjs` screenshots right after `networkidle`, before the site's entrance animations finish (PageHeader showed only its title). Previews that use motion start with `if (navigator.webdriver) MotionGlobalConfig.instantAnimations = true;`. Captures see the final layout; people browsing the cards still see the real animation. That is why `MotionGlobalConfig` is exported from `entry.tsx`.
- Wrap preview content in `p-6`. `SiteRoot` has no padding, so content otherwise sits flush against the card edge.
- Don't put a fixed height and padding on the same flex row (Separator's vertical dividers collapsed to 0 that way).
- Preview content comes from `docs/claude-design/content.json` (snapshot 2026-09-28): project names, periods and stacks, roles, video titles. Don't invent career facts.

## Known render warns

- MaskText uses `cardMode: column`: the HeroName cell (`type-hero-name`) is wider than a grid cell and validate flags `[GRID_OVERFLOW]` without it. PageHeader uses column for the same reason; Dialog uses `single` with a 720x560 viewport so the open dialog renders inside the card.
- Dialog cards show a gray backdrop: the card harness body is white under `bg-black/80`. In a design, `SiteRoot` makes `<html>` dark and the backdrop is black.
- Dialog cells show a focus ring on the first focusable element. That is Radix autofocus on open, the real behavior.

## Re-sync risks

- `SiteRoot` mirrors `src/app/layout.tsx`. If the root layout's `<html>`/`<body>` classes change, update it.
- The `next/link` stub hides any future `next/link` behavior a component starts to rely on.
- The `@source inline` safelist in `tailwind.css` must keep covering every class `conventions.md` names. The conventions validation pass greps them against `_ds_bundle.css`.
- Preview copy is a snapshot: "All 9 projects", role titles, dates. It goes stale when the portfolio API changes.
- `guidelines/design-system.md` ships the doc's "Known drift" section. Update the doc when that drift is fixed.
- The Instrument Sans woff2 is pinned to Google Fonts v4. A new upstream version won't arrive by itself.

## Conventions drift

- 2026-10-07 re-sync: `conventions.md` says "Pass `immediate` to anything visible on first paint". Only `Reveal` and `MaskText` declare `immediate`. `RevealLine` and `RevealImage` take `className` (plus `children` for RevealImage) and use `whileInView`, so they already animate on first paint. Fixed the same day: the header now names only `MaskText` and `Reveal`. If a motion component gains or loses `immediate`, update that line.
