---
description: Create a pull request following InstUI conventions
---

Open a PR for the current branch.

## Steps

1. `git status` — confirm branch + remote tracking. **Abort** if on `master` or if the branch has no commits ahead of `master` (`git rev-list --count master..HEAD` is 0) — there's nothing to open a PR for.
2. `git log master..HEAD` and `git diff master...HEAD` — read **all** commits in the branch (not just the latest) so the summary covers everything that's changed.
3. If not pushed: `git push -u origin <branch>`.
4. Create the PR (see invocation below).
5. **Suggest reviewers (required — do not skip).** `/pr` is **not complete** until you've run the **Reviewer assignment** flow and presented the ranked list to the user. Creating the PR is only half the job; do this every time, even on a long session.
6. Return the PR URL and the assigned reviewer (if any).

If the branch name or any commit references a Jira ticket (e.g. `INSTUI-1234`), include it. If you can't find one, ask the user once before opening — don't invent one.

## gh invocation

Use `--body-file -` with a heredoc on stdin. This avoids shell-quoting issues and is the form supported by current `gh` versions. `--assignee @me` self-assigns the PR to its author (`gh` doesn't do this by default — it only records authorship). If unsure about flags, run `gh pr create --help` first — do **not** fall back to older forms like `gh pr create -t ... -b ...` with inline `-b`.

```bash
gh pr create --title "<title>" --assignee @me --body-file - <<'EOF'
<body>
EOF
```

Open as draft (`--draft`) if the work is in progress.

## Reviewer assignment

After the PR is created, help the user choose a reviewer from the CODEOWNERS roster, ranked by **fewest recently-opened PRs reviewed (last 60 days)** — an approximate load proxy, lightest first. (GitHub search can't filter by review *date*, so this counts PRs *created* in the window that the person reviewed; it understates reviews on older, still-active PRs.) Don't auto-assign — the counts can't see who's on PTO or heads-down, so the human makes the call. **Run this verbatim** to gather the ranked list:

```bash
set -euo pipefail
[ -f .github/CODEOWNERS ] || { echo "no CODEOWNERS — skip assignment"; exit 0; }
REPO=$(gh repo view --json nameWithOwner -q .nameWithOwner)
SINCE=$(date -v-60d +%F 2>/dev/null || date -d '60 days ago' +%F)   # macOS || GNU
AUTHOR=$(gh api user --jq .login)

# Roster: individual @handles from CODEOWNERS — drop comments, globs, and @org/team handles.
# Capture the FULL handle (incl. any '/') so 'grep -v /' can actually drop teams; '|| true' so an
# empty match (comments-only / owner-less CODEOWNERS) skips gracefully instead of tripping set -e.
{ grep -v '^[[:space:]]*#' .github/CODEOWNERS \
  | grep -oE '@[A-Za-z0-9_/-]+' | sed 's/@//' | grep -v '/' | sort -u > /tmp/pr_roster.txt; } || true

: > /tmp/pr_counts.txt
while IFS= read -r U; do                       # real loop — this shell won't word-split $var
  [ -z "$U" ] && continue
  [ "$U" = "$AUTHOR" ] && continue             # can't review own PR
  N=$(gh search prs --repo "$REPO" --reviewed-by "$U" --created ">=$SINCE" \
        --limit 1000 --json number --jq 'length') || { echo "WARN: count failed for $U" >&2; continue; }
  printf '%s %s\n' "$N" "$U" >> /tmp/pr_counts.txt
done < /tmp/pr_roster.txt

[ -s /tmp/pr_counts.txt ] || { echo "no eligible reviewers — skip assignment"; exit 0; }
echo "reviewed PRs opened in last 60d, per candidate (approx. load):"; sort -n /tmp/pr_counts.txt
MIN=$(sort -n /tmp/pr_counts.txt | head -1 | awk '{print $1}')
WINNER=$(awk -v m="$MIN" '$1==m{print $2}' /tmp/pr_counts.txt | sort -R | head -1)  # random tie-break
echo "==> suggested (lightest load): $WINNER (count=$MIN)"
```

The loop's `gh search prs` / `gh repo view` calls may trigger a one-time permission prompt — that's expected; approve and let it finish. **Do not abandon the reviewer step because of a prompt.** Then **present the ranked list to the user** — each candidate with their 60-day review count, lightest first — and recommend the top one as the default. Ask them who to assign (they may pick a heavier-loaded person who's actually available, or skip entirely). Only after they choose, assign with `gh pr edit <pr> --add-reviewer <their-pick>` and confirm. If the script printed a skip message (no CODEOWNERS / no eligible reviewers), say so and leave the PR unassigned.

## Body format

Keep it **short**. No preamble, no restating the title, no "this PR does X" filler.

```
## Summary
- <one line per logically distinct change; 1–4 bullets total>

## Test Plan
- <only manual / non-CI checks a reviewer should do>

Fixes INSTUI-XXXX

🤖 Generated with [Claude Code](https://claude.com/claude-code)
```

Rules:

- **Summary**: terse bullets. Each bullet is one change, not a paragraph. Skip context the diff already shows.
- **Test Plan**: only what CI **doesn't** cover — manual UI checks, RTL, a11y spot-checks, visual regression cases to look at, edge cases worth poking. Never include "tests pass", "lint passes", "types check", "build succeeds" — CI runs those.
- If there's genuinely nothing to manually verify (e.g. pure refactor with full test coverage), write `- No manual verification needed; covered by existing tests.` and move on.
- Omit the `Fixes` line entirely if no ticket applies. Don't write `Fixes INSTUI-XXXX (or omit if not applicable)`.
- Keep the Claude Code footer.
