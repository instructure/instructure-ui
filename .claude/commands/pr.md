---
description: Create a pull request following InstUI conventions
---

Create a pull request following Instructure UI conventions:

## PR Requirements

All PRs must include:

1. **Summary**: Brief description of changes (1-3 bullet points)
2. **Test Plan**: Clear steps for reviewers to test the changes
3. **Jira Reference**: Include relevant Jira ticket number if applicable (e.g., `Fixes INST-1234`)
4. **AI Disclosure**: Must clearly indicate this was created with AI assistance

## Draft vs Ready

- Open as **draft** when work is in progress or not ready for review
- Mark as **ready for review** only when complete and all requirements met

## Process

1. Run `git status` to check current branch and remote tracking
2. Run `git log master..HEAD` to see all commits that will be in the PR
3. Run `git diff master...HEAD` to see full diff from base branch
4. Analyze changes across ALL commits (not just latest)
5. Draft PR summary covering all changes
6. **If Jira ticket number is unknown, ask the user for it before creating the PR**
7. Push to remote if needed: `git push -u origin <branch>`
8. Create PR with `gh pr create --title "title" --body "$(cat <<'EOF'

## Summary

- Bullet point 1
- Bullet point 2

## Test Plan

- [ ] Step 1
- [ ] Step 2

## Jira Reference

Fixes INST-XXXX (or omit this section if not applicable)

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"` 9. Return the PR URL

**Important**:

- Base branch is usually `master` (not main)
- Analyze ALL commits in the branch, not just the latest one
- Use markdown checklists for test plan
- Include AI attribution footer
- Always confirm Jira ticket number with user if not found in commits or branch name
