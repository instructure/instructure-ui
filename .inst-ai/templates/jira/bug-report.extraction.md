# Bug Report Extraction Template

**Task:** Analyze the conversation and extract entities into a JSON object. Use `null` for missing values.

**Entities:**
- `component_name`: string | null - The name of the UI component or module mentioned
- `browser_name`: string | null - Browser where the issue occurs (e.g., "Chrome", "Firefox", "Safari")
- `os_name`: string | null - Operating system where the issue occurs (e.g., "macOS", "Windows", "Linux")
- `instui_version`: string | null - InstUI version (e.g., "8.51.0", "v8.51.0"). Look for @instructure/ui-* package versions in package.json, version mentions in conversation, or CodeSandbox dependencies
- `summary_of_bug`: string - Brief description of the bug
- `reporter_name`: string - Name of the person reporting the bug
- `environment_text`: string | null - Additional environment details
- `steps_to_reproduce`: array | null - List of steps to reproduce the issue
- `expected_behavior`: string | null - What should happen
- `actual_behavior`: string | null - What actually happens
- `workaround`: string | null - Any workarounds mentioned

**Conversation:**
{{CONVERSATION_CONTENT}}

**JSON Output:**