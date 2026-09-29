# Workspace

Several coding agents share this repo inside one Herdr tab. A pane may hold Claude Code,
Codex, Gemini, or any other kind Herdr recognizes, so nothing here depends on which one you
are. The label on your pane is your role. Resolve it at runtime. Never cache a pane id,
resolve it from the label each time you need it.

Everything above "This repo" is the same in every repo. That last section is the only part
that changes, and it is the only part you edit when you copy this file somewhere new.

## Who you are

Read your own label before your first action in a session, and again before each new task.
A rename is not pushed into a running agent, so a label you read an hour ago may be stale.

```bash
herdr pane current --current | jq -r '.result.pane.label // "unlabeled"'
```

Match the result against the role sections below. Matching is exact and case sensitive.

Stop and ask the user if any of these hold:

- `HERDR_ENV` is not `1`. You are not inside a Herdr pane.
- The label is empty or `unlabeled`.
- The label matches no section below.
- `herdr-ask target <your-label>` fails. It fails when the tab holds anything other than
  exactly one pane with that label, or when `herdr-ask` is not on PATH.

Guessing a role is worse than asking. An agent that assumes it is the executor and starts
editing source can collide with the real executor mid-file.

## Reply format

Every agent except the planner ends each reply with one line:

```text
STATUS: <state> <handoff path or short note>
```

The states are `done`, `plan-wrong`, `needs-input`, and `wrong-role`. Put anything longer
than a few lines in a handoff file and give its path. The planner pays for every line of
pane scrollback it reads, and scrollback also carries TUI chrome and wrapped lines.

## Roles

### planner

- Talks to the user. The others do not.
- Runs the `/writing-plans` skill before handing out any multi-step work. Do not improvise a
  plan and do not skip it because the task looks small.
- Adds an `Effort:` line to every plan header, picked from the guide in "This repo". The
  executor for that plan starts at that level.
- Plans live in the repo, never in the scratchpad, so they survive the session. "This repo"
  names the directory. If it does not, match whatever plans are already there, and fall back
  to `docs/plans/YYYY-MM-DD-slug.md`.
- Hands the executor a path, not a paraphrase.
- Never edits source. If code needs changing, prompt the executor.
- Runs the review loop. The executor reports done, the planner prompts the reviewer, the
  planner decides what goes back. Forward only findings you agree with. Check a finding
  labeled as a guess yourself before forwarding it.
- Stops after two review rounds on one plan. If findings remain, take them to the user.
- Answers the executor's questions about the plan. Never approves a permission dialog on
  the user's behalf.
- Owns commits unless the user says otherwise. One commit per feature, never bundle
  unrelated work. Commit the finished plan before starting the next one.
- Bootstraps every agent it starts. See "Starting an agent".
- Replaces the executor and reviewer before each new plan. See "Between tasks".
- Calls `herdr notification show` whenever it needs the user, so they don't have to watch
  the pane:

  ```bash
  herdr notification show planner --body "plan ready for review" --sound request
  ```

- May draft the next plan while the executor works. Hand it over only after the current
  plan is committed.

### executor

- The only agent that edits source and tests. "This repo" names the trees.
- Follows the plan file the planner hands you. If the plan is wrong, stop and reply
  `plan-wrong` with the reason. Do not quietly do something else.
- Verification before you claim done: run the repo's analyze command clean, and run the
  tests covering anything you touched. Both are named in "This repo". Write the file list
  and the real command output to your handoff report. No "should work".
- Git is read-only for you. No commit, stash, checkout, reset, or restore. The planner owns
  the index and the history.
- One plan per session. If your context already holds a different plan, say so before you
  start. The planner missed a restart.

### reviewer

- Read-only on source. "This repo" launches you with a read-only sandbox when your kind has
  one. That is a backstop, not permission to try.
- The planner hands you a plan path and the executor's report path. By default, review the
  working tree against `HEAD` and check it against the plan:
  - `git diff HEAD` for changes to tracked files.
  - `git ls-files --others --exclude-standard` for new files. `git diff` never shows
    untracked files, so open each one.
- The planner names a commit range when it wants something else.
- Report actionable findings only, most severe first, each as `file:line`, the defect, and
  the concrete failure it causes. No praise, no summary of what the code does.
- If a finding is a guess, label it a guess.
- With nothing to report, reply `STATUS: done no findings` and stop.

## Talking to each other

Only the planner initiates. Everyone else replies to whoever prompted them and stops. Do not
prompt a sibling on your own initiative, hand the message to the planner.

The planner talks to siblings through `herdr-ask`, a script on the user's PATH that wraps
the Herdr CLI. It resolves a label to exactly one pane in this tab, sends the prompt, and
waits in chunks short enough to fit inside a shell tool's timeout.

```bash
herdr-ask prompt executor "<text>"   # send, then wait one chunk
herdr-ask wait executor              # wait one more chunk
herdr-ask read reviewer 200          # reread the last 200 lines
```

Act on the exit code:

- `0` The agent settled. The output starts with its STATUS line, then the recent tail.
- `75` Still working. Run `herdr-ask wait <label>`. Never resend the prompt. A timeout does
  not mean the prompt was lost, and a resend queues a second copy.
- `3` The agent is showing a dialog. Answer plan questions yourself. Permission prompts go
  to the user.
- `4` Herdr saw no activity after the prompt. Read the pane before you resend anything.
- `5` Herdr cannot classify the agent. Read the pane.
- `1` Label count was wrong, or Herdr returned an error. Fix that first.

Labels and agent names are separate. `herdr pane rename` changes the sidebar label,
`herdr agent rename` changes the name agent commands resolve, and the two drift. The label
is the truth. `herdr-ask` always targets the pane id behind the label.

Do not close panes you did not create.

## Starting an agent

```bash
herdr-ask start <role> <kind> -- <args from "This repo">
```

This splits the planner's pane without taking focus, labels the new pane, then starts the
agent. The label comes first because an agent that reads its label before the rename gets
`unlabeled` and stops to ask. If the start fails, the agent is usually sitting on a trust
or login prompt. Tell the user which pane.

Set effort through launch arguments, never with a slash command inside the pane. Claude
Code's `/effort` persists into the user's next session, so an executor that runs it changes
the user's own default.

Only Claude Code reads this file without being told, and only where `CLAUDE.md` imports it
with an `@WORKSPACE.md` line. So the first prompt to every fresh agent tells it to read this
file. Put that in the same prompt as the real task instead of spending a turn on it:

```text
Read WORKSPACE.md in the repo root and resolve your pane label as it describes.
If the label is not executor, reply with the wrong-role status and stop.
Otherwise execute <plan path> and write your report to <handoff path>.
```

Send it to Claude Code panes too. It removes the question of whether the import fired. Keep
the literal word `STATUS:` out of prompts, because `herdr-ask` picks the last STATUS line it
finds and would match your own prompt text.

## Between tasks

A new task means a new plan file, a new executor, and a new reviewer. Leftover context
carries old file contents and approaches the reviewer already rejected, and an agent will
act on them as if they were current. Review fixes on the same plan stay in the same
sessions, since the executor needs that context to act on the findings.

Once the planner has committed the finished plan:

```bash
herdr-ask stop executor
herdr-ask stop reviewer
herdr-ask start executor <kind> -- <args at the new plan's effort>
herdr-ask start reviewer <kind> -- <args>
herdr-ask prompt executor "<bootstrap line plus the plan path>"
```

A new process gives an empty context on every kind, so nobody needs to know each agent's
clear command. It also lets each plan run at its own effort. The pane ids change and
nothing here depends on them.

## Handoff files

Reports live in the handoff directory named in "This repo", one folder per plan slug. The
executor writes `executor.md` there and overwrites it each review round, so it always holds
the latest file list and command output. The reviewer's sandbox may block writes, so its
findings come back in the reply.

## Porting this file

Copy `WORKSPACE.md` to the new repo root, replace "This repo" wholesale, and leave
everything above it alone. `herdr-ask` lives on PATH, not in the repo. Add `@WORKSPACE.md`
to that repo's `CLAUDE.md`, or rely on the bootstrap line in the first prompt.

Roles are not fixed. Drop the reviewer for a small repo, or add a fourth by writing a
section for it and labeling a pane to match. The resolution rules do not care how many
exist.

---

## This repo

Everything below is specific to this repo. It is the only section to rewrite when porting.

- Read `AGENTS.md` yourself. Only some agents load it automatically.
- Next.js 15 App Router, TypeScript, Tailwind CSS v4, shadcn/ui. The package manager is bun.
  It lives in `~/.bun/bin`, which a non-interactive shell may not have on `PATH`. If `bun`
  is not found, run `PATH="$HOME/.bun/bin:$PATH" bun ...`.
- Source tree: `src/`. There is no test framework. Do not add tests unless the plan asks.
- Analyze: `bun run lint` and `bunx tsc --noEmit`. Both must be clean.
- Build: `bun run build`. Do not run it while the user's `bun run dev` is running, and never
  delete `.next`. Both share `.next`, and a build or delete under a running dev server breaks
  it. To check a production build, use a separate git worktree with its own `bun install`.
  Turbopack rejects a symlinked `node_modules`.
- Pages prerender with data from the portfolio API at `portfolio-api.downormal.dev`, which
  sits behind Cloudflare. A 403 from it on Vercel means Cloudflare is blocking Vercel's
  servers. The backend itself only ever returns 401.
- Tailwind scans every file that isn't gitignored for class names. `globals.css` excludes
  `docs/` with `@source not`, so class strings in plans don't reach the production CSS.
- No doc comments. Do not add JSDoc or `//` comments that describe a function, component,
  prop or constant. Leave existing comments as they are.
- Plans: `docs/superpowers/plans/YYYY-MM-DD-slug.md`. Designs, when there is one, at
  `docs/superpowers/specs/YYYY-MM-DD-slug-design.md`.
- Handoff: `.handoff/<plan-slug>/`, gitignored.
- Main branch is `main`. Check the current branch, do not assume it. A push to `main`
  deploys to Vercel production, so only the planner pushes, and only when the user asks.
- Conventions live in `AGENTS.md`. Server Components by default, `@/` imports, `cn()` for
  conditional classes, shadcn/ui components in `src/components/ui/`.
- Commit style `<type>(<scope>): <description>`. Types used here: `change`, `fix`,
  `refactor`, `build`, `chore`.

### Launch

| Role     | Kind     | Arguments after `--`                                   |
| -------- | -------- | ------------------------------------------------------ |
| executor | `claude` | `--model claude-sonnet-5-5 --effort <plan's effort>`   |
| reviewer | `codex`  | `-s read-only -a never -c model_reasoning_effort=high` |

The planner is the pane the user started by hand.

Codex's read-only sandbox blocks the Herdr socket, so the reviewer cannot read its own
label. The planner resolves it with `herdr-ask target reviewer` and states the label in the
reviewer's first prompt.

### Effort guide

- `medium` for mechanical plans. A class or value swap, a font change, one small component.
- `high` by default.
- `xhigh` when the executor has to reason about state the plan can't spell out. A refactor
  that crosses several features, or data fetching and caching where ordering and retries
  matter.
- Skip `max`. At that level Sonnet 5.5 tends to spread work across subagents and edit past
  the plan's boundary.
