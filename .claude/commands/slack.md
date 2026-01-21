---
description: Analyze Slack support threads and optionally create tickets or generate responses
---

Handle Slack support threads interactively - fetch thread content, analyze it, and ask the user whether to create a Jira ticket or generate a response.

## Requirements

- Slack thread URL is required as argument
- inst-ai tool must be installed globally (`npm install -g github:instructure/inst-ai-tool`)
- Configuration must be set up (see inst-ai documentation)

## Process

1. **Extract Slack conversation**:
   - Run `inst-ai slack "<slack-url>" --format xml --include-metadata --include-codesandbox`
   - This extracts the conversation in LLM-friendly XML format with full context

2. **Analyze the conversation**:
   - Parse the Slack conversation to understand:
     - The core topic or question
     - Whether it's a support request, bug report, feature request, or general question
     - Relevant technical details and context
     - Any mentioned components or file paths
     - User expectations and requirements
     - Screenshots or CodeSandbox links

3. **Present analysis to user**:
   - Show a summary of the Slack thread:
     - Main topic/question
     - Type of conversation (question, bug, feature request, etc.)
     - Key participants and dates
     - Important technical details
   - Display relevant excerpts from the conversation

4. **Ask user for action**:
   - Present two options:
     1. **Create Jira ticket** - If this is an actionable item (bug, feature request, task)
     2. **Generate response** - If this is a question or discussion that needs a reply
   - Use the AskUserQuestion tool to get the user's choice

5. **Execute chosen action**:

   ### If user chooses "Create Jira ticket":
   - Draft a Jira ticket:
     - **Summary**: Brief, clear title (max 100 chars)
     - **Description**: Include:
       - What: Clear description of the issue/feature
       - Why: Context from the Slack conversation
       - Where: Affected components/files (if identified)
       - How to reproduce: Steps if it's a bug
       - Expected behavior: What should happen
       - Link to original Slack thread
     - **Issue Type**: Determine type (Bug, Task, or Story)
   - Show draft to user for confirmation
   - **DO NOT create ticket without explicit user confirmation**
   - Create ticket using `inst-ai jira create`
   - Return the created Jira ticket URL

   ### If user chooses "Generate response":
   - Analyze the question/discussion thoroughly
   - Research the codebase if needed to provide accurate information
   - Generate a helpful, accurate response that:
     - Directly addresses the question or discussion point
     - Includes relevant code examples if applicable
     - References appropriate documentation
     - Provides clear next steps or recommendations
   - Present the response to the user
   - User can then copy/paste to Slack or ask for modifications

## Important Notes

- **Detect conversation type** - Questions shouldn't automatically become tickets
- **Always analyze the full thread** - Don't miss context from replies
- **Include Slack URL in tickets** - For traceability
- **Research before responding** - Use codebase knowledge for accurate answers
- **Ask for clarification** - If conversation is unclear, ask user for guidance

## Example Workflow

```bash
# Extract Slack conversation
inst-ai slack "https://instructure.slack.com/archives/C123/p456" --format xml --include-metadata --include-codesandbox

# Based on analysis, either:

# Option 1: Create ticket (after user confirms)
inst-ai jira create --summary "Button: Click handler not firing on mobile" \
  --description "Issue reported in Slack: ..." \
  --type Bug

# Option 2: Generate response for user to post
# (Claude generates response based on analysis and codebase research)
```

## Error Handling

- If Slack URL is invalid or inaccessible, inform user and ask for correct URL
- If inst-ai is not installed, provide installation instructions
- If configuration is missing, direct user to run `inst-ai config validate`
- If ticket creation fails, show error and suggest troubleshooting steps
