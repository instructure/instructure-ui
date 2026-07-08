---
name: instui-docs
description: Look up authoritative Instructure UI (InstUI, @instructure/ui-*) documentation — component APIs, props, theme variables, usage examples, and guides — by querying instructure.design's plaintext docs. Use whenever the user asks how to use an InstUI component, which props/prop types exist, how to theme/style it, accessibility/i18n/RTL guidance, or which component fits a need. Prefer this over guessing InstUI APIs from memory.
---

# Instructure UI docs lookup

Instructure UI publishes its full docs as plaintext/markdown. Use it as the source of truth instead of recalling APIs from memory (they change across major versions).

## Workflow

1. **Fetch the index:** `WebFetch https://instructure.design/llms.txt`
   It lists every component and guide with a one-line description and the exact markdown URL for each, grouped into User Guides, Components, Util Components, Contexts, and AI Components. Use it to find the relevant component/guide and its URL.

2. **Fetch the specific page(s)** using the URLs from the index. A component page contains examples, size/color/variant options, theme customization, guidelines (Do's/Don'ts/Accessibility), a props table, and install/import instructions. Fetch several in parallel when a question spans multiple components or a component + a guide.

## Notes

- The online docs track the **latest published release**. A consuming repo may be pinned to an older major where props/APIs differ — check its installed `@instructure/ui*` version. For the exact installed version, the TypeScript types in `node_modules/@instructure/<pkg>` are ground truth; the online docs are better for prose, examples, and guidelines.
- Components can be imported either from their individual package (`@instructure/ui-<name>`) or from the metapackage (`@instructure/ui`). A project usually standardizes on one or the other — match whatever the consuming codebase already uses.
