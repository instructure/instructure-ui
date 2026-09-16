#!/usr/bin/env bash
# Remove pr-preview/pr-XY and visual-regression/pr-XY folders from gh-pages whose PR is
# merged, closed or gone.
#
# Needs GITHUB_TOKEN, GITHUB_REPOSITORY and `gh` in the environment.
set -euo pipefail

BRANCH="gh-pages"
ATTEMPTS=5
export GH_TOKEN="$GITHUB_TOKEN"

WORK="$(mktemp -d)"
git clone --quiet --depth 1 --branch "$BRANCH" \
  "https://x-access-token:${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git" "$WORK"
cd "$WORK"

STALE=() # collects not needed folders
REPORT="| Folder | PR | State |
|---|---|---|"
for dir in pr-preview/pr-* visual-regression/pr-*; do
  [ -d "$dir" ] || continue
  number="${dir##*/pr-}"
  case "$number" in ''|*[!0-9]*) echo "::warning::Skipping $dir: no PR number in the name"; continue ;; esac

  if out=$(gh api "repos/${GITHUB_REPOSITORY}/pulls/${number}" --jq '.state + " " + (.merged_at // "")' 2>&1); then
    state="${out%% *}"
    [ -n "${out#* }" ] && state="merged"
  elif grep -q "HTTP 404" <<<"$out"; then
    state="missing"
  else
    # Rate limit, network, auth: never delete on an unknown answer.
    echo "::warning::Could not check PR #${number} for $dir, keeping it: $out"
    continue
  fi

  if [ "$state" != "open" ]; then
    STALE+=("$dir")
    REPORT+=$'\n'"| $dir | #${number} | $state |"
  fi
done

summary() { echo "$1"; [ -n "${GITHUB_STEP_SUMMARY:-}" ] && printf '%s\n\n' "$1" >> "$GITHUB_STEP_SUMMARY" || true; }

if [ ${#STALE[@]} -eq 0 ]; then
  summary "No stale PR folders on $BRANCH."
  exit 0
fi

summary "$REPORT"

git config user.name "github-actions[bot]"
git config user.email "41898282+github-actions[bot]@users.noreply.github.com"
MESSAGE="chore: remove ${#STALE[@]} PR folder(s) of closed PRs from $BRANCH"

for attempt in $(seq 1 "$ATTEMPTS"); do
  git fetch --quiet --depth 1 origin "$BRANCH"
  git reset --quiet --hard FETCH_HEAD
  for dir in "${STALE[@]}"; do
    [ -d "$dir" ] && git rm -r -q "$dir"
  done
  if git diff --cached --quiet; then
    summary "Nothing left to remove; another run already cleaned up."
    exit 0
  fi
  git commit --quiet -m "$MESSAGE"
  if git push --quiet origin "HEAD:$BRANCH"; then
    summary "Removed ${#STALE[@]} folder(s) from $BRANCH on attempt $attempt."
    exit 0
  fi
  echo "Push rejected on attempt $attempt: $BRANCH moved. Retrying from the new tip."
  sleep $((attempt * 5))
done

echo "::error::Could not push to $BRANCH after $ATTEMPTS attempts."
exit 1
