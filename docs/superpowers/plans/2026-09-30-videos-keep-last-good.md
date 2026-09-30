# Videos keep last good Implementation Plan

> **For agentic workers:** Execute this plan inline with superpowers:executing-plans. Do not dispatch subagents. Steps use checkbox (`- [ ]`) syntax for tracking.

**Effort:** medium

**Goal:** Stop a failed YouTube feed request from replacing the live Videos section with the "My videos didn't load here" message.

**Architecture:** `getVideos()` throws when the feed request fails instead of returning `[]`. The home page awaits it in `Promise.all`, so a failure fails that ISR rebuild, and Next.js keeps serving the last page that rendered (`node_modules/next/dist/server/response-cache/index.js:286-302`). The layout already awaits it in `Promise.allSettled`, so the nav only drops its count, as it does today.

**Tech Stack:** Next.js 15.5 App Router, TypeScript, bun.

**Spec:** No spec file. On 2026-09-30 the user saw the fallback message on desktop and Android while the feed worked from the planner's machine. During an ISR rebuild Next.js fetches a stale feed entry in the foreground (`node_modules/next/dist/server/lib/patch-fetch.js:697`), so one failed request produced a page with no videos, and Vercel cached it. The user approved this fix.

## Global Constraints

- No doc comments. Do not add JSDoc or `//` comments that describe a function, component, prop or constant. Leave existing comments as they are, except the one this plan tells you to remove. The one new comment this plan gives you is a line inside the function body and stays.
- No test files. The repo has no test framework, and AGENTS.md forbids adding one.
- Git is read-only for you. No commit, stash, checkout, reset or restore.
- Touch only `src/features/videos/api.ts`. Do not change `src/app/(main)/layout.tsx`, `src/app/(main)/page.tsx` or `src/features/videos/components/Videos.tsx`.
- Do not delete `.next` and do not run `bun run build`. The user runs `bun run dev` in another pane.

## Review Focus

1. Both ways the feed request can fail reject `getVideos()`: a non-OK status, and a thrown `fetchWithTimeout` (network error or the 5s timeout). No failure path returns `[]`.
2. A successful response still parses into the same `Video[]` as before, with the same regexes and the same `.filter((video) => video.id)`.
3. `layout.tsx` still wraps `getVideos()` in `Promise.allSettled`, so `/projects` and `/experience` still render when YouTube fails.

---

### Task 1: Throw on a failed feed request

**Files:**
- Modify: `src/features/videos/api.ts`

- [ ] **Step 1: Import `FetchError`**

Replace:

```ts
import { fetchWithTimeout } from "@/lib/utils";
```

with:

```ts
import { FetchError, fetchWithTimeout } from "@/lib/utils";
```

- [ ] **Step 2: Replace the function body**

Replace the whole `getVideos` function, from `export async function getVideos(): Promise<Video[]> {` through its closing `}`, with:

```ts
export async function getVideos(): Promise<Video[]> {
  const response = await fetchWithTimeout(
    FEED_URL,
    { next: { revalidate: 3600, tags: ["videos"] } },
    5000,
  );
  // Throwing fails the ISR rebuild, so Next keeps serving the last page that had videos
  if (!response.ok) {
    throw new FetchError(
      `Failed to fetch YouTube feed: ${response.status}`,
      response.status,
      response.statusText,
      FEED_URL,
    );
  }

  const xml = await response.text();
  return [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)]
    .map(([, entry]) => ({
      id: entry.match(/<yt:videoId>([^<]+)</)?.[1] ?? "",
      title: decodeXml(entry.match(/<title>([^<]*)</)?.[1] ?? ""),
      published: entry.match(/<published>([^<]+)</)?.[1] ?? "",
    }))
    .filter((video) => video.id);
}
```

This removes the `try`/`catch`, both `console.error` calls and the `// The home page still renders; the section falls back to a channel link` comment. Keep the two `// ponytail:` comment lines above the function exactly as they are.

- [ ] **Step 3: Verify**

Run: `rtk proxy grep -nE "catch|console\.error|return \[\];" src/features/videos/api.ts`
Expected: no output, exit code 1.

Run: `rtk proxy grep -n "Promise.allSettled" "src/app/(main)/layout.tsx"`
Expected: one match. This file must be unchanged.

Run: `PATH="$HOME/.bun/bin:$PATH" bun -e 'import { getVideos } from "./src/features/videos/api"; const v = await getVideos(); console.log(v.length, JSON.stringify(v[0]))'`
Expected: a count of at least 1 and the newest video as `{"id":...,"title":...,"published":...}`.

Run: `bun run lint`
Expected: no errors, and no warning that names `api.ts`.

Run: `bunx tsc --noEmit`
Expected: no output.

- [ ] **Step 4: Report**

Write `.handoff/2026-09-30-videos-keep-last-good/executor.md` with the file you changed and the real output of every command above. The planner will check the home page in the browser.
