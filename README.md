# Personal Portfolio Website

A modern, responsive personal portfolio website built with Next.js, React, shadcn/ui, and Tailwind CSS.

## Features

- **Responsive Design**: Optimized for all screen sizes (mobile, tablet, desktop)
- **Modern UI**: Clean dark theme using shadcn/ui components
- **Smooth Navigation**: Smooth scrolling between sections
- **Contact Form**: Functional contact form with server actions
- **Project Showcase**: Project cards with technology badges
- **SEO Optimized**: Meta tags, structured data, sitemap, and robots.txt
- **Performance**: Server-first rendering with ISR caching

## Architecture

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout with metadata, fonts, analytics
│   ├── (main)/             # Route group (shared Navbar + Footer)
│   │   ├── page.tsx        # Landing page (Hero, About, Experience, Projects, Contact)
│   │   ├── projects/       # Full projects listing
│   │   └── experience/     # Full experience listing
│   ├── sitemap.ts          # Dynamic sitemap generation
│   └── robots.ts           # Dynamic robots.txt generation
├── components/
│   ├── ui/                 # shadcn/ui primitives
│   └── layout/             # Navbar, Footer, Breadcrumbs
├── features/               # Feature-based modules
│   ├── about/              # About section
│   ├── contact/            # Contact form + server action
│   ├── projects/           # Projects data, components, types
│   └── resume/             # Resume data, components, hooks, types
└── lib/
    └── utils.ts            # Shared utilities (cn, fetch helpers)
```

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Icons**: Lucide React
- **Font**: Inter (Google Fonts via next/font)
- **Analytics**: Vercel Analytics

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Copy `.env.local.example` to `.env.local` and fill in required variables:
```bash
cp .env.local.example .env.local
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

Required variables in `.env.local`:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_API_BASE_URL` | Base URL for the portfolio API |
| `NEXT_PUBLIC_PROFILE_ID` | Profile ID for API requests |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `EMAILJS_SERVICE_ID` | EmailJS service ID |
| `EMAILJS_TEMPLATE_ID` | EmailJS template ID |
| `EMAILJS_PUBLIC_KEY` | EmailJS public key |
| `PORTFOLIO_API_KEY` | API key for the portfolio backend |

## Customization

### Personal Information

Update data through the external API or modify the API endpoints in:
- `src/features/resume/api.ts` — Resume data fetching
- `src/features/projects/api.ts` — Projects data fetching

### Styling

- **Theme Colors**: Modify CSS variables in `src/app/globals.css`
- **Component Styling**: Update Tailwind classes in component files
- **Font**: Change in `src/app/layout.tsx`

### Adding New Sections

1. Create a new component in `src/features/<feature>/components/`
2. Import and add it to `src/app/(main)/page.tsx`
3. Add navigation link in `src/components/layout/Navbar.tsx`

## Responsive Design

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

## License

This project is open source and available under the [MIT License](LICENSE).

---

Built with Next.js, React, and Tailwind CSS
