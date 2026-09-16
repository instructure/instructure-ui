#!/usr/bin/env bash
# gh-pages is written by several workflows at once (docs deploy, PR previews, visual regression),
# so every attempt here starts over from a fresh shallow fetch of the branch tip and re-applies
# the change. This way a rejected push never leaves a half-applied commit behind.
set -euo pipefail

if [ $# -eq 0 ]; then
  cat <<'HELP'
Replace or remove one directory on the gh-pages branch and push the result.
Usage: gh-pages-dir.sh <dir-on-gh-pages> [<local-source-dir>]

  When called with one argument, <dir-on-gh-pages> will be deleted and the result pushed.
  When called with two arguments, <dir-on-gh-pages> will be replaced with <local-source-dir>, and then pushed.

Needs GITHUB_TOKEN, GITHUB_REPOSITORY and COMMIT_MESSAGE in the environment.
HELP
  exit 1
fi

TARGET="$1"
SOURCE="${2:-}" # second argument of this script, or "" if none
BRANCH="gh-pages"
ATTEMPTS=5

case "$TARGET" in
  # do not allow parent/absolute target because it will be deleted
  ''|/*|.|..|*/..|*/../*|../*) echo "::error::Refusing to operate on '$TARGET'"; exit 1 ;;
esac
if [ -n "$SOURCE" ]; then
  SOURCE="$(cd "$SOURCE" && pwd)"
fi

WORK="$(mktemp -d)"
git clone --quiet --depth 1 --branch "$BRANCH" \
  "https://x-access-token:${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git" "$WORK"
cd "$WORK"
git config user.name "github-actions[bot]"
git config user.email "41898282+github-actions[bot]@users.noreply.github.com"

for attempt in $(seq 1 "$ATTEMPTS"); do
  git fetch --quiet --depth 1 origin "$BRANCH"
  git reset --quiet --hard FETCH_HEAD

  rm -rf "$TARGET"
  if [ -n "$SOURCE" ]; then
    mkdir -p "$(dirname "$TARGET")"
    cp -r "$SOURCE" "$TARGET"
  fi
  # `git add -A <path>` fails when the path exists neither on disk nor in the index,
  # which is the normal case when removing a dir that was never published.
  if [ -n "$SOURCE" ] || [ -n "$(git ls-files -- "$TARGET")" ]; then
    git add -A -- "$TARGET"
  fi
  if git diff --cached --quiet; then
    echo "$TARGET is already up to date on $BRANCH; nothing to push."
    exit 0
  fi

  git commit --quiet -m "$COMMIT_MESSAGE"
  if git push --quiet origin "HEAD:$BRANCH"; then
    echo "Pushed $TARGET to $BRANCH on attempt $attempt."
    exit 0
  fi
  echo "Push rejected on attempt $attempt: $BRANCH moved. Retrying from the new tip."
  sleep $((attempt * 5))
done

echo "::error::Could not push $TARGET to $BRANCH after $ATTEMPTS attempts."
exit 1
