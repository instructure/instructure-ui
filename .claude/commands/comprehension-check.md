---
description: Quiz the author on the current diff's design before committing — a comprehension gate to prevent shipping code nobody understands
---

Gate a commit on the author demonstrating they understand the change. The point is to stop
"ok-looking" AI-generated code — and creeping architectural complexity — from landing when
the author can't actually explain it. This is a teaching gate, not a rubber stamp.

## 1. Read the diff

`git diff` and `git diff --staged`. Understand what actually changed.

## 2. Decide if a quiz is warranted

**Skip (say so and proceed straight to committing)** when the diff is only: Markdown/docs,
config, formatting/lint-only churn, version bumps, lockfiles, or generated files.

**Quiz** when the diff introduces or changes real logic: new abstractions/components,
control flow, data flow, state, public API/props, cross-package wiring, or anything with a
non-obvious "why". Scale the number of questions to the change: ~2 for a small focused diff,
up to ~5 for a large or architectural one.

Before writing questions, pick the 2-3 spots with the most hidden complexity or highest
"AI-slop risk" — clever one-liners, non-obvious control flow, React effect/memo dependency
arrays and referential stability, error/edge handling — and make at least one question target
each. Don't spend the quiz on the parts that were easy to write.

## 3. Ask — one or two questions at a time, in plain chat

Target the **decisions embedded in the code**, never syntax or trivia. Good angles:

- **Why this way?** — why this approach over the obvious alternative; what trade-off was made.
- **Blast radius** — what else depends on this; what breaks if it changes; who calls it.
- **Data/control flow** — where does this get invoked from, and what happens next.
- **Edge cases** — what inputs/states does it handle (or deliberately not), and why.
- **Integration** — how it fits the monorepo: cross-package deps, theme/tokens, i18n, v1/v2.

Rules:

- Ask questions **you (Claude) already know the answer to from the diff** — so you can grade.
- Before asking, note to yourself the specific points a complete answer must hit — the answer
  key straight from the diff. Grade the reply against that key, not against how confident or
  fluent it sounds.
- **Never reveal the answer in the question**, and don't hand the author hints before they try.
- Ask in the author's own words territory — "explain…", "why…", "what would happen if…".

## 4. Grade honestly

The gate is worthless if you rubber-stamp. Hold a real bar, but grade the _understanding_,
not the phrasing:

- **All parts, not most.** If a question has multiple parts, it passes only when _every_ part
  is answered. Right on one part and silent/vague on another is **partial** → probe the missing
  part before moving on. Don't average.
- **Correct & shows understanding** → acknowledge briefly, move on.
- **Coherent alternative that's actually right** (author knows something you didn't, or framed
  it differently) → accept it. The goal is demonstrated understanding, not matching your words.
- **Vague / partial** → probe once more on the gap.
- **Wrong, or "I don't know"** → **teach**: explain the decision clearly with `file:line`
  references, then ask a _fresh_ question on the same concept. Loop until the author can
  explain it back in their own words. Don't move on until they can.

## 5. Pass

When the author has demonstrated understanding of every key decision, give a one-line summary
of what they showed they understand, then proceed to commit (follow `/commit`). If the author
wrote the code themselves and breezes through, that's a pass — the gate is aimed at code they
haven't internalized, not at making them jump through hoops.
