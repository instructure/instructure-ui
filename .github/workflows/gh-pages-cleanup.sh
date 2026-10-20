#!/usr/bin/env bash
# Remove pr-preview/pr-XY and visual-regression/pr-XY folders from gh-pages whose PR is
# merged, closed or gone, then replace the branch history with a single commit.
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

if [ ${#STALE[@]} -gt 0 ]; then
  summary "$REPORT"
else
  summary "No stale PR folders on $BRANCH."
fi

git config user.name "github-actions[bot]"
git config user.email "41898282+github-actions[bot]@users.noreply.github.com"

for attempt in $(seq 1 "$ATTEMPTS"); do
  # depth 2 is enough to tell whether the tip has a parent
  git fetch --quiet --depth 2 origin "$BRANCH"
  git reset --quiet --hard FETCH_HEAD
  TIP="$(git rev-parse HEAD)"
  HAS_HISTORY=false
  git rev-parse --verify --quiet HEAD^ >/dev/null && HAS_HISTORY=true

  REMOVED=0
  for dir in ${STALE[@]+"${STALE[@]}"}; do
    [ -d "$dir" ] && rm -rf "$dir" && REMOVED=$((REMOVED + 1))
  done

  if [ "$REMOVED" -eq 0 ] && [ "$HAS_HISTORY" = false ]; then
    summary "Nothing to remove and $BRANCH is already a single commit."
    exit 0
  fi

  # an orphan commit drops the history, so blobs of removed folders are not kept in the branch
  git checkout --quiet --orphan "${BRANCH}-squashed"
  git add -A
  git commit --quiet -m "chore: squash $BRANCH history (removed $REMOVED PR folder(s) of closed PRs)"

  # the lease fails if a deploy pushed after the fetch, so a new commit is never overwritten
  if git push --quiet --force-with-lease="refs/heads/${BRANCH}:${TIP}" origin "HEAD:refs/heads/${BRANCH}"; then
    summary "Squashed $BRANCH to one commit and removed $REMOVED folder(s) on attempt $attempt."
    exit 0
  fi
  echo "Push rejected on attempt $attempt: $BRANCH moved. Retrying from the new tip."
  git checkout --quiet --detach FETCH_HEAD
  git branch --quiet -D "${BRANCH}-squashed"
  sleep $((attempt * 5))
done

echo "::error::Could not push to $BRANCH after $ATTEMPTS attempts."
exit 1
