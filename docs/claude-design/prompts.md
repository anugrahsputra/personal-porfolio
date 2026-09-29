# Portfolio redesign prompts for Claude Design

## How to use

1. Start a new Claude Design project.
2. Attach `docs/claude-design/content.json` and `public/images/photo/photo.png`.
3. Paste prompt 1 and review the style sheet it builds. If a token drifted, fix it there, because every later screen inherits it.
4. Send prompts 2 to 6 one at a time. Review each result before sending the next.

`content.json` is real data pulled on 2026-09-28 from the portfolio API and youtube.com/@downormal, minus the placeholder project "Change Project Name". Regenerate it if the content changes.

Before sending prompt 2, check the availability line in it. The live site says you're open to freelance and full-time work, and `content.json` lists a current role at BRIK.

---

## Prompt 1. Brief and design system

```
I'm redesigning my portfolio site and keeping its existing design system. Change layout, hierarchy and composition. Keep the tokens. Attached: content.json (the only content you may use) and photo.png (my portrait).

## Direction

- Product: my portfolio. I'm a Mobile Engineer working in Flutter and Kotlin Multiplatform.
- Audience: recruiters and engineering managers hiring mobile engineers, plus people with freelance app work. They skim.
- The one decision a visitor makes: is this person worth contacting? Show proof first (current role, shipped apps), then make contact easy.
- Visual language: monochrome and flat. True black page, near-white text, grays for hierarchy, thin borders, a grayscale portrait. It should read like a well-set resume, not a landing page.
- Palette: black #000000, near-white #FAFAFA, and the grays below. No hue accent. The near-white primary button is the accent moment. Use it on the main CTA and at most one other place. Red #7F1D1D is for errors only.
- Dark theme: the live site is dark and I'm keeping it as the site's identity. Design dark only.
- Typeface: Inter, kept because the live site uses it. Build hierarchy with size and weight (400, 500, 600, 700) and tighter tracking on large headings. No second font.
- Dials: ENERGY 2 / RHYTHM 2 / MOTION 1.

## Design system (from src/app/globals.css)

Color tokens:

| Token | Hex | Use |
|---|---|---|
| background | #000000 | page |
| foreground | #FAFAFA | headings, body |
| card, popover | #0F0F0F | cards, dialogs |
| secondary, muted, accent | #1F1F1F | chips, hover fills |
| input | #1F1F1F | input fill |
| muted-foreground | #A1A1A1 | secondary text |
| border | #2E2E2E | dividers, card edges |
| primary / primary-foreground | #FAFAFA / #000000 | primary button |
| ring | #FAFAFA | focus ring |
| destructive | #7F1D1D | errors |

The code also sets text as foreground at 70% (#AFAFAF) and 60% (#969696). No text lighter than 50% (#7D7D7D).

Radius: base 8px. sm 4px, md 6px, lg 8px, xl 12px. Buttons, inputs and badges use md. Dialogs use lg. Cards use xl. Skill chips use md too, not pills.

Components: shadcn/ui, "new-york" style, Tailwind CSS v4. Compose from what exists:
- Button: default, outline, secondary, ghost, link, destructive. Heights: sm 32px, default 36px, lg 40px, icon 36px square.
- Badge: default, secondary, outline, destructive. 12px medium text.
- Card with header, title, description, content, footer.
- Dialog, Alert, Separator.
If you need anything else (tabs, tooltip, a sheet for mobile nav), name it so I can add it from shadcn/ui. Don't build custom widgets where a shadcn/ui one exists.

Icons: Lucide only. 16px in buttons, 12px in badges, 20px standalone.

Layout: content max width 1280px. Side padding 16px on mobile, 24px from 640px, 32px from 1024px. Fixed navbar, 64px tall, black at 80% opacity with backdrop blur. The navbar is the only blurred element.

Contrast I measured on this palette:
- #FAFAFA on #000000: 20.12
- #AFAFAF on #000000: 9.57
- #969696 on #000000: 7.10
- #A1A1A1 on #1F1F1F: 6.38
- #7D7D7D on #000000: 5.10 (placeholder text, the floor)
- #2E2E2E on #000000: 1.55. Fine for decorative dividers. It fails for input borders, which need 3:1. #737373 measures 4.43 on black, so input borders use #737373 or lighter. This is the one token addition I expect.

## Problems in the current site to fix

- Every section uses the same template: centered h2, a 96px rule, a centered paragraph, then a two-column grid. The page reads as one flat stack.
- My summary appears twice, in the hero and again in About.
- The home page shows the first 4 projects in API order instead of the featured ones.
- Featured projects get a yellow-to-orange gradient badge with a star emoji, which is outside the palette. Show importance with size and position.
- Emoji in the UI: a pin before locations, a star on Featured, a lock in the NDA dialog. Use Lucide (MapPin, Lock) or drop them.
- Arrow icons on the "Get In Touch" and "View All" buttons.
- Every project card is the same size, whether its description is 64 characters or 970.
- Hero text sits on top of the portrait and relies on a text-shadow to stay readable. Check contrast at the worst spot. Add a scrim or move the text off the photo.

## Rules

Banned unless I give a reason:
- Color gradients, glows, blurred orbs, neon or pastel colors.
- Monospace headings. Uppercase labels with wide letter-spacing.
- Sparkle, star, lightning or robot icons. Emoji anywhere in the UI.
- An arrow on every button.
- Colored left stripes on cards.
- Capsule badges with glow and a dot.
- Illustrations, 3D blobs, fake terminal windows with traffic-light dots.

Dose caps:
- Blur: the navbar only.
- Glow: none.
- Shadow: dialogs and popovers only. Everything else sits flat on borders.

Layout:
- Sections come from the content. No testimonials, logo bars, or stats rows.
- Cards vary with the weight of what they hold. The flagship project doesn't look like the footnote.
- Spacing varies between sections. One padding value everywhere flattens the page.
- Footer links match links that exist.

Content honesty:
- Use only content.json. No invented metrics, download counts, ratings, testimonials or client logos.
- If a field is empty, leave the slot out. Portfolio Backend has no image. Design for that instead of faking a screenshot.
- Every link and button goes somewhere real.

Accessibility:
- Compute contrast, don't estimate. Body text 4.5:1. Text 18px and up, icons, input borders and focus rings 3:1.
- Every interactive element has a visible focus-visible style.
- Everything works by keyboard. Dialogs and the mobile menu close on Escape.
- Status is never color alone. Form errors are text.
- Text at 200% zoom doesn't clip or scroll sideways.
- Respect prefers-reduced-motion.

## First deliverable

Don't build pages yet. Build one style sheet screen with the system above: color swatches with hex, a type scale (display, h1, h2, h3, body, small, caption) with sizes and weights, every Button variant and size with hover and focus-visible states, Badge variants, one project Card, one video card (thumbnail, title, date, duration), an input with label, helper text and error state, the Dialog and the Alert.

Then tell me in one line: the dials, the focal point you plan for the home page, and any contrast pair you computed. If you broke a rule on purpose, name it and say why.
```

---

## Prompt 2. Home page

```
Design the home page (/) at 1440px and 390px wide, using the style sheet we agreed on.

content.json has my profile, 3 roles, 9 projects (4 featured, 1 under NDA), education, skills, 2 languages, contact links and my YouTube videos.

The page has one job: help a hiring manager decide to contact me. Lead with who I am and what I build now, show proof, end at contact. Here's my suggested order. Propose a different one if it serves that job better, and say why.

1. Hero. Name, title, one or two lines from "about", and the grayscale portrait. Two actions: "Get in touch" (primary, scrolls to contact) and "Download resume" (outline, opens profile.resumePdf). Pick one focal point, the portrait or the name.
2. Selected work. The 4 featured projects, with unequal weight based on what each has. Portfolio Backend has no image, so give it a text-first treatment instead of an empty box. Cosmic App KIOSK Touchscreen is under NDA: no GitHub link, an outline badge with a Lock icon (not red), and a button that opens the NDA dialog. End with a link to /projects.
3. Experience. All 3 roles, each with role, company, dates, location and at most 2 bullets. Link to /experience for the rest. The current role (end "present") reads as current without a colored badge.
4. Videos. Every video from the youtube section of content.json. Right now that's 3 long coding sessions (50 minutes to 1h 20m), all one series, newest is part 3. Show them so they read as a series, and design for the channel growing: past 6 videos, show the newest 6. Each card: thumbnail with a Play icon, title, date, duration. No view counts, no descriptions (there are none). Clicking a card plays the video on my site in a youtube-nocookie player, either in place or in a dialog. Pick one and tell me which. Don't load any player until someone clicks. End with a "YouTube channel" link to youtube.com/@downormal.
5. About and skills. My summary appears once on the page. If the hero uses it, About says something else or goes away. Skills: 13 technologies, 9 tools, 7 hard skills, 4 soft skills, 2 languages, plus education. Include a group only if it earns its space.
6. Contact. A form with name, email, subject and message. Next to it, email, location and LinkedIn as direct links. Availability line: "Available for freelance mobile work and full-time roles."
7. Footer. Name, GitHub, LinkedIn, YouTube, Website, Email and the section links. Nothing else.

Nav items: Home, About, Experience, Projects, Videos, Contact. On mobile, a menu button that opens the list. It's keyboard reachable and closes on Escape.

Not every section is centered. Vary spacing and alignment by section.
```

---

## Prompt 3. Projects page

```
Design /projects at 1440px and 390px wide. Show all 9 projects from content.json.

- Page header: breadcrumb (Home / Projects), title, one-line intro. No hero.
- Group by the "context" field: work (PT. Semesta Arus Teknologi, 1 project), personal (6), academic (2). Group headings only. 9 items don't need filter controls.
- Featured projects get more space than the rest. If size and position already say "featured", skip the badge.
- Descriptions run from 64 to 970 characters. Clamp long ones in the grid to 3 or 4 lines and show the full text in a detail view. Pick a dialog or an expanding card, and tell me which.
- Actions: "Live demo" only when live is true. "GitHub" when githubUrl exists and the project isn't under NDA. The NDA project opens the NDA dialog instead.
- Tech stack as secondary badges. Show all of them, since the longest list is 6.
- Projects without an image get the same text-first treatment as on the home page.
```

---

## Prompt 4. Experience page

```
Design /experience at 1440px and 390px wide.

- Page header: breadcrumb (Home / Experience), title, one-line intro.
- 3 roles with every bullet (6, 6 and 3 bullets). Dates as month and year, for example "Aug 2025" to "Present".
- With only 3 entries, choose between a timeline and a plain list by what reads better. Skip the decorative line and dots if a list is clearer.
- Education below the roles.
- End with two actions: contact me, and download the resume PDF.
```

---

## Prompt 5. States and edge cases

```
Design these states with the components from the style sheet, at 390px and 1440px where layout changes:

1. NDA dialog. Project title, context, tech stack, one sentence saying the work is under NDA and can't be shown. Lock icon, no emoji. Close button, closes on Escape.
2. Contact form. Empty, filled, submitting (button disabled with a spinner and "Sending..."), success (Alert saying I'll reply by email), error (Alert naming the cause and giving my email address from content.json as the fallback). Field errors as text under each field: missing name, invalid email, empty message.
3. Data failed to load. The API is down. Say that, offer a retry button, and link the resume PDF and my email so the visit isn't wasted.
4. Loading. Skeletons that match the real home page layout, not a centered spinner.
5. 404. Short, with links to Home and Projects.
6. Mobile nav, open.
7. Videos. A card's hover and focus states, a video playing, and the case where the video list fails to load: the section shrinks to one line linking to my YouTube channel. No empty grid.
```

---

## Prompt 6. Handoff

```
Prepare the design for implementation in my existing Next.js 15, Tailwind CSS v4 and shadcn/ui codebase:

- For each screen, list the components used. Map each one to an existing shadcn/ui component (button, badge, card, dialog, alert, separator) or name the shadcn/ui component to add.
- List every color, radius and shadow you used. Flag anything outside the design system from my first message. The only expected addition is the input border color.
- Give the Tailwind classes for the type scale and section spacing you settled on.
```
