---
description: Generate implementation plan from Jira issue using inst-ai
---

Generate a comprehensive implementation plan by analyzing Jira issues and codebase using inst-ai tool with InstUI conventions.

## Requirements

- Optional Jira issue key (e.g., INST-1234) or description
- inst-ai tool must be installed globally (`npm install -g github:instructure/inst-ai-tool`)
- Configuration must be set up (see inst-ai documentation)

## Process

1. **Get issue context**:

   **If Jira issue key provided**:
   - Run `inst-ai jira read <issue-key> --format xml --include-comments`
   - Parse the issue details:
     - Summary and description
     - Acceptance criteria
     - Comments and discussion
     - **Look for entry point file paths** in description/comments (likely included by user)

   **If plain text description provided**:
   - Use the description as issue context
   - Will need to identify entry point files manually

2. **Identify entry point files**:

   **First, check if entry point is in Jira ticket**:
   - Look for file paths in ticket description
   - Check comments for mentioned components/files
   - Common patterns: `packages/ui-*/src/*/index.tsx`

   **If entry point NOT found in ticket**:
   - **Claude Code aids file selection** (inst-ai's interactive selector doesn't work in Claude CLI)
   - Analyze issue context to identify relevant components
   - Use `Glob` tool to search for potential files:
     - Search component packages: `packages/ui-{component}/src/*/index.tsx`
     - Search by feature area based on issue description
   - Present 3-5 most relevant options to user
   - Ask user to select or provide custom path
   - **Pass selected file path explicitly to inst-ai**: `inst-ai plan <issue-key> -e <file-path>`

   **Example searches**:
   ```
   # For Button-related issues
   Glob: packages/ui-button/**/index.tsx

   # For Select component
   Glob: packages/ui-select/**/index.tsx

   # For broad changes
   Glob: packages/*/src/*/index.tsx
   ```

3. **Scan codebase**:
   - Use `inst-ai scan -e <file-path> --format xml --include-docs`
   - Can specify multiple entry points: `-e file1.tsx file2.tsx`
   - Include docs to understand context: `--include-docs`
   - Analyze:
     - Component structure and dependencies
     - Related files and imports
     - Testing files
     - Theme files
     - Documentation

4. **Generate implementation plan**:
   - Combine Jira issue context with code analysis
   - Create structured plan with:
     - **Issue Summary**: What needs to be done
     - **Affected Components**: List of files/components to modify
     - **Dependencies**: Related code that may be impacted
     - **Implementation Steps**: Detailed, actionable tasks:
       1. Update component props/logic
       2. Update theme variables (if needed)
       3. Update tests
       4. Update documentation
     - **Testing Strategy**:
       - Unit tests (Vitest)
       - Component tests (Cypress)
       - Visual regression tests (if UI changes)
       - Accessibility verification
     - **Breaking Change Assessment**:
       - Evaluate if changes are breaking (see CLAUDE.md)
       - If breaking: document clearly with `BREAKING CHANGE:` in commit
       - Prefer non-breaking alternatives when possible
     - **Documentation Updates**:
       - Component README updates
       - API documentation
       - Migration guide (if breaking)

5. **Save session**:
   - Plan is automatically saved to `.inst-ai/sessions` (configured in inst-ai.config.mjs)
   - Session includes:
     - Issue context
     - Scanned files
     - Generated plan
     - Timestamp and metadata

6. **Present plan to user**:
   - Show complete implementation plan
   - Highlight breaking changes if any
   - List all affected files
   - Ask for user review and approval
   - **DO NOT start implementation without explicit user confirmation**

7. **Ready to implement**:
   - Once approved, work through plan step-by-step
   - Mark tasks as completed using TodoWrite tool
   - Create commits following InstUI conventions (use `/commit`)
   - Create PR when done (use `/pr`)

## Important Notes

- **Entry point files are critical** - they determine what code gets analyzed
- **Multiple entry points are supported** - use when changes span multiple components
- **inst-ai interactive mode won't work** - Claude Code must handle all file selection
- **Always pass file paths explicitly** to inst-ai CLI (don't rely on interactive selector)
- **Parse Jira tickets carefully** - entry points are often mentioned in descriptions/comments
- **Consider dependencies** - changes may affect multiple components
- **Breaking changes require extra care** - see CLAUDE.md for breaking change guidelines
- **Plans are saved** - can reference later from `.inst-ai/sessions`

## Example Workflows

### With Jira issue (entry point in ticket)

```bash
# 1. Fetch Jira issue
inst-ai jira read INST-1234 --format xml --include-comments

# 2. Entry point found in ticket: packages/ui-button/src/Button/index.tsx
# 3. Generate plan
inst-ai plan INST-1234 -e packages/ui-button/src/Button/index.tsx --include-docs

# 4. Review plan, then implement
```

### With Jira issue (entry point NOT in ticket)

```bash
# 1. Fetch Jira issue
inst-ai jira read INST-1234 --format xml

# 2. Issue is about "Button component accessibility"
# 3. Claude Code searches for relevant files
# Glob: packages/ui-button/**/index.tsx

# 4. Present options to user:
#    - packages/ui-button/src/Button/index.tsx
#    - packages/ui-button/src/Button/README.md

# 5. User selects: packages/ui-button/src/Button/index.tsx
# 6. Generate plan
inst-ai plan INST-1234 -e packages/ui-button/src/Button/index.tsx --include-docs
```

### With plain description

```bash
# 1. User provides: "Add dark mode support to Select component"
# 2. Claude Code identifies component: ui-select
# 3. Search for entry points
# Glob: packages/ui-select/**/index.tsx

# 4. Generate plan
inst-ai plan "Add dark mode support to Select component" -e packages/ui-select/src/Select/index.tsx --include-docs
```

### Multiple entry points

```bash
# Changes span Button and ButtonGroup
inst-ai plan INST-1234 -e packages/ui-button/src/Button/index.tsx packages/ui-button/src/ButtonGroup/index.tsx --include-docs
```

## Error Handling

- If Jira issue not found, verify issue key and permissions
- If entry point file doesn't exist, re-search and confirm path with user
- If inst-ai is not installed, provide installation instructions
- If configuration is missing, direct user to run `inst-ai config validate`
- If plan generation fails, check:
  - Entry point file is valid TypeScript/TSX
  - File is not too large (check token warning threshold in config)
  - Dependencies can be resolved

## InstUI-Specific Considerations

- **Component structure**: `/packages/ui-[name]/src/[Component]/`
- **Co-located tests**: `Component.test.tsx` next to component
- **Theme files**: `theme.ts` defines theme variables
- **Props files**: `props.ts` defines component API
- **README files**: Component documentation in component directory
- **Visual regression tests**: Must add test page in `/regression-test`
- **Functional components**: All new code uses hooks, never class components
- **No hardcoded text**: All user-facing text from props (i18n support)
