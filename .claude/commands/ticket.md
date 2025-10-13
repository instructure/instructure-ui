---
description: Create Jira ticket from Slack thread URL using inst-ai
---

Create a Jira ticket from a Slack conversation using inst-ai tool with InstUI conventions.

## Requirements

- Slack thread URL is required as argument
- inst-ai tool must be installed globally (`npm install -g github:instructure/inst-ai-tool`)
- Configuration must be set up (see inst-ai documentation)

## Process

1. **Extract Slack conversation**:
   - Run `inst-ai slack "<slack-url>" --format xml --include-metadata --include-codesandbox`
   - This extracts the conversation in LLM-friendly XML format with full context

2. **Analyze the conversation**:
   - Parse the Slack conversation to identify:
     - The core issue or request
     - Relevant technical details
     - Any mentioned components or file paths
     - User expectations and requirements
     - Screenshots or CodeSandbox links

3. **Draft Jira ticket**:
   - **Summary**: Brief, clear title describing the issue (max 100 chars)
   - **Description**: Detailed description including:
     - What: Clear description of the issue/feature
     - Why: Context from the Slack conversation
     - Where: Affected components/files (if identified)
     - How to reproduce: Steps if it's a bug
     - Expected behavior: What should happen
     - Additional context: Links to Slack thread, screenshots, etc.
   - **Issue Type**: Determine appropriate type:
     - `Bug`: Something is broken or not working as intended
     - `Task`: Work that needs to be done (improvements, updates)
     - `Story`: New feature or functionality
   - **Component Detection**:
     - Analyze conversation for component mentions (e.g., "Button", "Select", "Modal")
     - Map to package paths (e.g., ui-button, ui-select)
     - Include in ticket description

4. **Use inst-ai templates**:
   - Templates are located in `.inst-ai/templates/jira` (configured in inst-ai.config.mjs)
   - Common templates: `bugReport`, `featureRequest`
   - Use `--template <name>` flag when appropriate
   - Templates ensure consistent ticket formatting

5. **Present draft to user**:
   - Show the complete ticket draft
   - Display summary, description, issue type, components
   - Ask user to confirm or request modifications
   - **DO NOT create ticket without explicit user confirmation**

6. **Create ticket**:
   - Once confirmed, use `inst-ai jira create` with the drafted content
   - If using a template: `inst-ai jira create --template bugReport --content '<json-data>'`
   - If custom: `inst-ai jira create --summary "..." --description "..." --type Bug`
   - Include link to original Slack thread in description

7. **Return ticket URL**:
   - Display the created Jira ticket URL
   - Confirm successful creation

## Important Notes

- **Always analyze the full Slack thread** - don't miss important context from replies
- **Include Slack thread URL in ticket** - for future reference and traceability
- **Component detection is optional** - skip with `--no-component-detection` for non-code issues
- **Use dry-run for testing** - `inst-ai ticket "<url>" --dry-run-jira` previews without creating
- **Handle CodeSandbox content** - if conversation includes CodeSandbox, extract and reference it
- **Ask for clarification** - if conversation is unclear, ask user before creating ticket

## Example Workflow

```bash
# Extract Slack conversation
inst-ai slack "https://instructure.slack.com/archives/C123/p456" --format xml --include-metadata --include-codesandbox

# After analysis, create ticket with confirmation
inst-ai jira create --summary "Button: Click handler not firing on mobile" \
  --description "Issue reported in Slack thread..." \
  --type Bug

# Or use template
inst-ai jira create --template bugReport --content '{"summary":"...","description":"...","issueType":"Bug"}'
```

## Error Handling

- If Slack URL is invalid or inaccessible, inform user and ask for correct URL
- If inst-ai is not installed, provide installation instructions
- If configuration is missing, direct user to run `inst-ai config validate`
- If ticket creation fails, show error and suggest using `--dry-run-jira` to debug
