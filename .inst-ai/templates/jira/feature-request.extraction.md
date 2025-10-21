# Feature Request Extraction Template

**Task:** Analyze the conversation and extract entities into a JSON object. Use `null` for missing values.

**Entities:**

- `feature_name`: string | null - The name of the requested feature
- `requestor_name`: string - Name of the person requesting the feature
- `business_justification`: string | null - Why this feature is needed
- `proposed_solution`: string | null - How the feature should work
- `affected_components`: array | null - Components that would be affected
- `priority_level`: string | null - Urgency or priority mentioned
- `success_criteria`: string | null - How to measure success
- `alternative_solutions`: array | null - Other approaches considered

**Conversation:**
{{CONVERSATION_CONTENT}}

**JSON Output:**
