---
description: Create Jira ticket from Slack thread, GitHub issue, or text description
---

Create a Jira ticket from multiple sources using inst-ai tool with InstUI conventions.

## Requirements

- Input source is required as argument:
  - Slack thread URL (e.g., `https://instructure.slack.com/archives/C123/p456`)
  - GitHub issue URL (e.g., `https://github.com/instructure/instructure-ui/issues/123`)
  - Textual description (plain text describing the issue)
- inst-ai tool must be installed globally (`npm install -g github:instructure/inst-ai-tool`)
- GitHub CLI (`gh`) must be installed for GitHub issue fetching
- Configuration must be set up (see inst-ai documentation)

## Process

### 1. Determine Input Type

Analyze the input to determine its type:
- **Slack URL**: Contains `slack.com/archives/`
- **GitHub URL**: Contains `github.com/.../issues/`
- **Text description**: Everything else

### 2. Extract Content Based on Type

#### For Slack URLs:
- Run `inst-ai slack "<slack-url>" --format xml --include-metadata --include-codesandbox`
- This extracts the conversation in LLM-friendly XML format with full context

#### For GitHub URLs:
- Extract owner, repo, and issue number from URL
- Use `gh issue view <number> --repo <owner>/<repo> --json title,body,labels,comments`
- Parse the JSON response to get issue details

#### For Text Descriptions:
- Use the provided text directly as the issue description
- No fetching needed

### 3. Analyze the Content

Parse the extracted content to identify:
- The core issue or request
- Relevant technical details
- Any mentioned components or file paths
- User expectations and requirements
- Screenshots, CodeSandbox links, or other attachments
- For GitHub issues: existing labels and comments

### 4. Draft Jira Ticket

- **Summary**: Brief, clear title describing the issue (max 100 chars)
  - For GitHub issues: Use the original issue title or adapt it
  - For Slack/text: Create a concise, descriptive title

- **Description**: Detailed description including:
  - What: Clear description of the issue/feature
  - Why: Context from the source (Slack conversation, GitHub discussion, or provided text)
  - Where: Affected components/files (if identified)
  - How to reproduce: Steps if it's a bug
  - Expected behavior: What should happen
  - Additional context: Links to source (Slack thread, GitHub issue), screenshots, etc.

- **Issue Type**: Determine appropriate type:
  - `Bug`: Something is broken or not working as intended
  - `Task`: Work that needs to be done (improvements, updates)
  - `Story`: New feature or functionality
  - For GitHub issues: Consider existing labels to determine type

- **Component Detection**:
  - Analyze content for component mentions (e.g., "Button", "Select", "Modal")
  - Map to package paths (e.g., ui-button, ui-select)
  - Include in ticket description

### 5. Use inst-ai Templates (Optional)

- Templates are located in `.inst-ai/templates/jira` (configured in inst-ai.config.mjs)
- Common templates: `bugReport`, `featureRequest`
- Use `--template <name>` flag when appropriate
- Templates ensure consistent ticket formatting

### 6. Present Draft to User

- Show the complete ticket draft
- Display summary, description, issue type, components
- Show the source (Slack URL, GitHub issue URL, or text)
- Ask user to confirm or request modifications
- **DO NOT create ticket without explicit user confirmation**

### 7. Create Ticket

Once confirmed, use `inst-ai jira create` with the drafted content:
- If using a template: `inst-ai jira create --template bugReport --content '<json-data>'`
- If custom: `inst-ai jira create --summary "..." --description "..." --type Bug`
- **Always include link to original source in description** (Slack thread or GitHub issue)

### 8. Return Ticket URL

- Display the created Jira ticket URL
- Confirm successful creation
- Show the mapping: source → Jira ticket

## Important Notes

- **Always analyze full content** - For Slack threads: don't miss context from replies. For GitHub: include comments.
- **Include source URL in ticket** - Always link back to Slack thread or GitHub issue for traceability
- **Component detection is optional** - Skip for non-code issues
- **Use dry-run for testing** - `inst-ai jira create --dry-run` previews without creating
- **Handle attachments** - Extract and reference CodeSandbox links, screenshots, etc.
- **Ask for clarification** - If content is unclear or ambiguous, ask user before creating ticket
- **Detect input type automatically** - Parse the input to determine if it's Slack, GitHub, or text

## Example Workflows

### From Slack Thread

```bash
# Extract Slack conversation
inst-ai slack "https://instructure.slack.com/archives/C123/p456" --format xml --include-metadata --include-codesandbox

# After analysis, create ticket
inst-ai jira create --summary "Button: Click handler not firing on mobile" \
  --description "Issue reported in Slack: https://instructure.slack.com/archives/C123/p456\n\n..." \
  --type Bug
```

### From GitHub Issue

```bash
# Fetch GitHub issue
gh issue view 123 --repo instructure/instructure-ui --json title,body,labels,comments

# After analysis, create ticket
inst-ai jira create --summary "Add dark mode support to Modal component" \
  --description "Feature request from GitHub: https://github.com/instructure/instructure-ui/issues/123\n\n..." \
  --type Story
```

### From Text Description

```bash
# User provides text directly, create ticket after drafting
inst-ai jira create --summary "Select component: Dropdown not closing on blur" \
  --description "User reported issue:\n\nThe Select component dropdown remains open..." \
  --type Bug
```

## Error Handling

- **Invalid Slack URL**: Inform user and ask for correct URL
- **Invalid GitHub URL**: Inform user and ask for correct URL or issue number
- **GitHub CLI not installed**: Provide installation instructions (`gh` is required)
- **inst-ai not installed**: Provide installation instructions (`npm install -g github:instructure/inst-ai-tool`)
- **Configuration missing**: Direct user to run `inst-ai config validate`
- **Ticket creation fails**: Show error and suggest using `--dry-run` to debug
- **Ambiguous text input**: Ask user for clarification or more details
