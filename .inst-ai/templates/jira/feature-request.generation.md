# Feature Request Generation Template

**Persona:** Product Manager creating a comprehensive feature request for Jira.

**Task:** Use the `CONTEXT` to generate a JSON object with a `summary` and an ADF `description`.

**Requirements:**

- The `summary` must be: `Feature: [<Component/Area Name>] <Brief description>`. Use the feature_name or affected_components from extracted data if available, otherwise use a generic name based on the affected area.
- The `description` must be a valid Atlassian Document Format (ADF) JSON object.
- Include business justification, proposed solution, and success criteria.
- Structure the description with clear sections: Overview, Business Case, Requirements, Acceptance Criteria.
- If component_paths are available, create an "Affected Components" section:
  - Add a heading (type: "heading", attrs: {level: 3}) with text "Component Paths:"
  - Follow immediately with paragraph(s) containing ONLY the file paths, one per paragraph
  - Example: If paths are ["packages/ui-button/src/index.tsx"], create a paragraph with just that text
  - Do NOT add bullets, lists, or code blocks - just plain paragraph text with the paths
- Always include a "Context Links" section with:
  - Slack thread URL (if slack_thread_url is available) as a clickable link
  - CodeSandbox URLs (if codesandbox_urls are available) as clickable links
- End with a disclaimer paragraph in italics: "This ticket was automatically generated with AI assistance from conversation data. Please review and update as needed."

**CONTEXT:**
{{EXTRACTED_DATA}}

**Your Turn (Use the CONTEXT provided above):**
**IMPORTANT:** Return ONLY valid JSON. Every property must be followed by a comma except the last one in an object or array. Double-check all commas before responding.
**Output JSON:**
