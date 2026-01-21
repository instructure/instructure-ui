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

1. **Check for uncommitted changes**: Run `git status`
   - **If uncommitted changes exist**: Use `/commit` command to create a commit first
   - Ask user to confirm before creating the commit

2. **Analyze commit history**: Run `git log master..HEAD --oneline` to see all commits
   - **If no commits exist**: Inform user there are no changes to create a PR for
   - **If multiple commits exist**: Analyze whether they should be squashed
     - Squash if commits are:
       - Multiple small fixes/adjustments to the same feature
       - Follow-up commits fixing issues in previous commits (typos, lint errors, etc.)
       - All part of the same logical change (e.g., implementation + tests + docs)
     - Keep separate if commits are:
       - Distinct logical changes or features
       - Different types of work (e.g., refactoring vs new feature)
       - Already well-organized and clear
   - **If squashing is recommended**:
     - Present the analysis to user
     - Draft a single comprehensive commit message covering all changes
     - Ask for confirmation before squashing
     - Squash with: `git reset --soft master && git commit -m "$(cat <<'EOF'
chore: add new feature

Add comprehensive feature implementation with tests and documentation.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
EOF
)"`

3. Run `git status` to check current branch and remote tracking
4. Run `git log master..HEAD` to see all commits that will be in the PR
5. Run `git diff master...HEAD` to see full diff from base branch
6. Analyze changes across ALL commits (not just latest)
7. Draft PR summary covering all changes
8. **If Jira ticket number is unknown, ask the user for it before creating the PR**
9. Push to remote if needed: `git push -u origin <branch>`
10. Create PR with `gh pr create --title "title" --assignee @me --body "$(cat <<'EOF'
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
)"`
11. Return the PR URL

**Important**:
- Base branch is usually `master` (not main)
- Analyze ALL commits in the branch, not just the latest one
- PRs are typically squashed when merged, so having a single well-crafted commit is preferred
- Use markdown checklists for test plan
- Include AI attribution footer
- Always confirm Jira ticket number with user if not found in commits or branch name
- Always ask for user confirmation before squashing commits or creating the PR
