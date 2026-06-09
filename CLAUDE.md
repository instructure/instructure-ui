# Instructure UI

React component library and design system. A pnpm + Lerna monorepo, ~100 packages under `/packages/ui-*`.

External docs (preferred over guessing component APIs): https://instructure.design/llms.txt — per-component markdown at `https://instructure.design/markdowns/<Component>.md`.

## Commands

- `pnpm run bootstrap` — required first time and after `pnpm run clean`. Builds icons, compiles, generates tokens. Plain `pnpm install` is **not** enough.
- `pnpm run dev` — docs app at http://localhost:9090 (hot-reloads component changes).
- `pnpm run test:vitest <pkg>` — run a single package's unit tests, e.g. `pnpm run test:vitest ui-radio-input`. Without an argument it runs everything (slow).
- `pnpm run cy:component` — Cypress component tests.
- Visual regression lives in `/regression-test` (separate Next.js app, port 3000). See `/regression-test/README.md`.

## Code conventions

- **Never hardcode user-facing strings.** All UI text must come from props for i18n. This is the most common review comment.
- **New components: functional + hooks only.** Class components exist in legacy code — don't extend that pattern.
- Styling is Emotion CSS-in-JS via `theme.ts` files co-located with each component.

## Component versioning (v1/v2)

Some components ship in two versions during a migration period — a legacy **v1** and a newer **v2** (e.g. `DateInput`). v2 is the preferred implementation for new work; v1 is deprecated and gets removed in a later major release. Don't assume a component has only one version: check its README and the package exports to see which versions exist and which is current before using or changing one.

## Testing gotchas

- Prefer `vitest` fake timers in unit tests.
- If `fireEvent.click` doesn't trigger handlers, pass `{ button: 0, detail: 1 }`. `FocusRegion.ts` inspects `event.detail`/`event.button` to distinguish real mouse clicks from synthetic events.
- Every component needs: unit tests (`*.test.tsx`, co-located), a page under `/regression-test/src/app/<name>/page.tsx`, a Cypress entry in `/regression-test/cypress/e2e/spec.cy.ts`, WCAG 2.1 AA compliance, and RTL support.

## Finding component info

1. **Start with the component README**: `/packages/<pkg>/src/<Component>/README.md` — this is the source for the published docs and has examples + prop descriptions.
2. Props: `props.ts` next to the component. Theme variables: `theme.ts` next to the component.
3. Shared theme types: `/packages/shared-types/src/ComponentThemeVariables.ts`.

If you add/change a prop, update the component's README in the same change — that file is what ships to instructure.design.

## Breaking changes

Avoid them unless the user explicitly asks. Breaking = removing/renaming a prop, component, theme variable, or exported util; changing a prop's type or a default that alters behavior. Adding optional props, new components, or new theme variables is fine. When a break is intentional, put `BREAKING CHANGE:` in the commit body — `/commit` handles the format.

## Workflow

- Use `/commit` and `/pr` — they follow InstUI conventions (Conventional Commits with package-name scopes, PR body with an `INSTUI-` Jira ref). Husky pre-commit runs lint-staged + a TS references check; `/commit` sets `HUSKY=0` to skip the interactive prompt.
- Branch from `master`. PRs are squash-merged.
- **Integrate `master` by rebasing, not merging** — use `git rebase master` (or `git pull --rebase`) to update a branch. Don't create merge commits; keep branch history linear since PRs are squash-merged anyway.
- **Docs structure:** the site is generated from source code (JSDoc + `react-docgen` for prop types) plus `.md` files. Markdown docs use fenced code blocks with a gray-matter `type:` header that controls rendering: `type: code` (syntax-highlighted, not executed), `type: embed` (renders the JSX live into the page), and `type: example` (interactive, editable playground). Full reference: `/docs/contributing/writing-docs.md`.
