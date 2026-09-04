---
description: Tighten comment and commit message wording in the working diff
---

Review the wording of comments and commit messages on this branch and tighten anything that
breaks the rules. This is a **wording-only** pass - do not change behaviour, rename anything,
or restructure code. For code quality use `/simplify`, for bugs use `/code-review`.

## The rules being checked

Comment rules: the "Code Comments" section of `CLAUDE.md`.
Commit message rules: `.claude/commands/commit.md`.

The single test both share: **would this still make sense to someone reading it in a year, who
never saw this branch, the PR, the ticket, or the conversation that produced it?**

## Process

1. **Collect the changes**

   ```
   git diff
   git diff --cached
   git log master..HEAD --format='%H%n%s%n%n%b%n---'
   ```

   If the branch has no commits and no working changes, say so and stop.

2. **Check added and modified comments.** Only lines this branch touched - read the diff, not
   whole files. Flag:

   - comments that restate what the code does
   - comments longer than they need to be, or split over several lines for no reason
   - references to the change itself: `now`, `new`, `previously`, `used to`, `this change`,
     `the fix`, `as discussed`, `per review`, `we decided`, `recently`
   - narration of the diff: `// added onKeyDown handler`, `// updated to support X`
   - trailing comments on the same line as code, and comments below what they describe
   - commented-out code, decorative separators, banner comments
   - prop JSDoc carrying `@param`/`@type` tags, or running longer than a sentence
   - **comments added to code the branch did not otherwise change**

3. **Check commit messages** against the `/commit` rules: subject over 72 characters, a body
   that restates the diff, a changelog shape (several grouping headings, a long bullet list,
   bullets enumerating changed files), or a `🤖 Generated with` line.

   Do **not** flag before/after wording here. "Previously the placeholder only showed on
   hover" is correct in a commit message — the message is permanently attached to its own
   diff. That rule exists for comments, which persist with no such anchor.

4. **Report before changing anything.** One table or list, grouped into comments and commit
   messages, each entry `file:line` (or the commit's short sha) with the current text and the
   proposed replacement. Say plainly if there is nothing to fix.

5. **Apply on confirmation.**

   - Comment rewrites: edit the files directly. Leave the working tree staged as you found it.
   - Commit message rewrites: these rewrite history, so **always confirm separately** and tell
     the user it will change the shas. Amend with `git commit --amend` for `HEAD` only; for
     older commits, explain that a rebase is needed and let the user decide whether it is
     worth it. **Never rewrite history without an explicit go-ahead**, and never on a branch
     that has been pushed and reviewed unless the user says so.

## Important

- Deleting a comment is usually the right fix. Do not rewrite a comment that should not exist.
- Do not touch the MIT license header block at the top of every file.
- Do not add new comments. This pass only shortens and removes.
- Do not touch comments outside the diff, however tempting.
