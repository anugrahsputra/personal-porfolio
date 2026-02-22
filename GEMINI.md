# GEMINI.md - Guidelines for Agentic Coding

This file provides guidelines for agents working on this portfolio codebase.

## Philosophy & Guidelines

### Core Philosophy

- **Safety First**
  Never risk user data, stability, or backward compatibility.
  When uncertain, stop and ask for clarification.

- **Incremental Progress**
  Break complex tasks into small, verifiable steps.
  Large, speculative changes are forbidden.

- **Clear Intent Over Cleverness**
  Prefer readable, boring, maintainable solutions.
  Clever hacks are a liability.

- **Native Performance Mindset**
  Optimize only when necessary and with evidence.
  Avoid premature optimization.

---

### Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:

- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

### Simplicity first

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

### Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:

- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:

- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

### Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:

- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:

```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

---

## Project Overview

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Icons**: Lucide React

---

## Build / Lint / Test Commands

```bash
# Development
npm run dev                    # Start dev server with Turbopack
npm run build                  # Production build with Turbopack
npm run start                  # Start production server
npm run lint                   # Run ESLint
npm run lint -- --fix          # Auto-fix lint issues
```

**No test framework is currently configured.** Do not add tests unless explicitly requested.

---

## Code Style Guidelines

### TypeScript

- Use explicit types for function parameters and return values
- Prefer interfaces over types for object shapes
- Use `type` for unions, intersections, and primitives
- Never use `any` - use `unknown` if type is truly unknown

```typescript
// Good
interface User {
  id: string;
  name: string;
}

function getUser(id: string): User | null { ... }

// Avoid
function getUser(id: string): any { ... }
```

### Imports

- Use absolute imports with `@/` prefix (configured in tsconfig.json)
- Order imports: external libraries → internal modules → relative
- Group imports with empty line between groups

```typescript
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useProjects } from "@/features/projects/hooks";
```

### Naming Conventions

- **Files**: PascalCase for components (`Hero.tsx`), camelCase for utilities (`utils.ts`)
- **Components**: PascalCase (`Hero`, `Navbar`)
- **Functions**: camelCase (`getProjects`, `useResume`)
- **Interfaces**: PascalCase with descriptive names (`Experience`, `Project`)
- **Variables**: camelCase, use descriptive names
- **Constants**: SCREAMING_SNAKE_CASE for configuration values

### Component Structure

```typescript
import { useState } from "react";

interface ComponentProps {
  title: string;
  onSubmit: () => void;
}

export function Component({ title, onSubmit }: ComponentProps) {
  const [state, setState] = useState("");
  return <div><h1>{title}</h1></div>;
}
```

### Error Handling

- Use try/catch for async operations with meaningful error messages
- Handle null/undefined cases explicitly

### Tailwind CSS

- Use Tailwind merge utility (`cn`) for combining classes
- Use semantic color tokens when available
- Keep responsive classes grouped together

```typescript
import { cn } from "@/lib/utils";

// Good
<div className={cn(
  "base-classes",
  isActive && "active-classes",
  variant === "primary" ? "primary-classes" : "secondary-classes"
)} />
```

### shadcn/ui Components

- Use existing UI components from `src/components/ui/`
- Follow the pattern in button.tsx for new components
- Use cva (class-variance-authority) for variant props

---

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (main)/            # Route group
├── components/ui/         # shadcn/ui components
├── features/             # Feature-based modules
│   ├── projects/         # Projects feature (components, data, hooks)
│   └── resume/           # Resume feature
└── lib/utils/           # Utilities (cn function)
```

---

## Environment Variables

- Never commit `.env` files or secrets
- Use `.env.local` for local development
- Document required variables in `.env.local.example`

Required: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID`, `EMAILJS_PUBLIC_KEY`

## SEO & Performance

- Always add metadata to new pages
- Use Server Components by default, add `"use client"` only when needed
- Add structured data for SEO (see existing components)
- Optimize images with Next.js Image component

## Important Notes

- This is a personal portfolio site - avoid adding unnecessary complexity
- No tests exist - do not add test files unless explicitly requested
- The project uses Tailwind CSS v4 with `@tailwindcss/postcss`
- ESLint extends `next/core-web-vitals` and `next/typescript`
