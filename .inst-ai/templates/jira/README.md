# Jira Templates

This directory contains prompt templates for generating Jira tickets from Slack conversations.

## Template Types

### Bug Report Templates
- `bug-report.extraction.md` - Extracts structured data from bug report conversations
- `bug-report.generation.md` - Generates final Jira ticket content for bugs

### Feature Request Templates
- `feature-request.extraction.md` - Extracts structured data from feature request conversations
- `feature-request.generation.md` - Generates final Jira ticket content for features

## Template Variables

Templates use `{{VARIABLE_NAME}}` syntax for variable substitution:

- `{{CONVERSATION_CONTENT}}` - The full Slack conversation text
- `{{EXTRACTED_DATA}}` - JSON-formatted extracted data from the conversation

## Customizing Templates

You can override default templates by configuring custom template paths in your `inst-ai.config.js`:

```javascript
export const config = {
  jira: {
    customTemplates: {
      bugReport: {
        extraction: './my-templates/custom-bug-extraction.md',
        generation: './my-templates/custom-bug-generation.md'
      },
      featureRequest: {
        extraction: './my-templates/custom-feature-extraction.md',
        generation: './my-templates/custom-feature-generation.md'
      }
    }
  }
}
```

## Template Format

Templates should be valid Markdown files with embedded prompts for the AI model. The AI will process the template content and generate responses in the expected format (JSON for extraction, ADF JSON for generation).