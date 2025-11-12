# Instructure UI - Claude Code Documentation

## Project Overview

InstUI is a React component library and design system. **Lerna 8 monorepo** with 100+ packages.

**Key Resources:**

- Website: https://instructure.design
- AI docs: https://instructure.design/llms.txt
- Component docs: https://instructure.design/markdowns/[ComponentName].md
  - Example: https://instructure.design/markdowns/Alert.md
  - Example: https://instructure.design/markdowns/Button.md

**Tech Stack:** Node.js >=22, pnpm, React 18.3.1+, TypeScript 5.8.3, Emotion (CSS-in-JS), Vitest, Cypress, Chromatic

## Repository Structure

```
/packages                      # 100+ packages
  /ui-*                        # Component packages (ui-button, ui-select, etc.)
  /canvas-theme                # Theme packages
  /__docs__                    # Documentation app
/docs                          # Documentation source files
/regression-test               # Visual & a11y testing (Next.js 15 app)
/cypress                       # Component tests
/scripts                       # Build scripts
```

**Important file locations:**

- Component source: `/packages/ui-*/src/`
- Component tests: Co-located with components
- Theme types: `/packages/shared-types/src/ComponentThemeVariables.ts`
- Visual/a11y tests: `/regression-test/`
- Testing docs: `/docs/testing/testing-overview.md`

## Quick Start

```bash
pnpm run bootstrap  # First time setup (clean, build icons, compile, generate tokens)
pnpm run dev        # Start dev server at http://localhost:9090
```

Most changes hot-reload automatically when dev server is running.

## Essential Commands

```bash
# Development
pnpm run dev          # Dev server (http://localhost:9090)
pnpm run build:types  # Build TypeScript declarations

# Testing
pnpm run test:vitest  # Unit tests
pnpm run test:vitest ui-radio-input # Run tests for a single package
pnpm run cy:component # Cypress component tests

# Linting
pnpm run lint:fix     # Auto-fix linting issues
pnpm run ts:check     # TypeScript references check

# Troubleshooting
pnpm run clean && pnpm run bootstrap       # Fix build issues
pnpm run clean-node && pnpm install        # Nuclear option (removes all node_modules)
```

## Code Style

**IMPORTANT: Always use functional components with React hooks for new code.**

- ✅ Functional components with hooks (useState, useEffect, etc.)
- ❌ No class components for new code (legacy codebase has them)
- ❌ **Never hardcode text** - all user-facing text must come from props (for i18n)
- ✅ Support accessibility (WCAG 2.1 AA), RTL languages
- ✅ Use TypeScript for all new code
- ✅ Use Emotion for styling (CSS-in-JS)

## Finding Component Information

**To find available components and their packages:**

- Check `/packages/__docs__/src/components.ts` - lists all components with their package locations

**Each component has two READMEs:**

1. **Component README**: `/packages/[package]/src/[Component]/README.md` ⭐

   - What the component does and usage examples
   - **Check this first** - it has the detailed information
   - These READMEs are also used to render the component documentation pages on instructure.design

2. **Package README**: `/packages/[package]/README.md`
   - Package overview, installation, exports

**For complete API details of a component:**

- Props: Check `props.ts` files in component source
- Theme variables: Check `theme.ts` files in component source

## Component Development Workflow

1. Find component in `/packages/ui-[name]/src/[Component]/`
2. Check Component README for API details
3. Make changes
4. Run tests: `pnpm run test:vitest`
5. Update README if the functionality has changed (e.g., a new prop was added)
6. Use `/commit` to create commit

## Breaking Changes

**IMPORTANT: Avoid breaking changes unless explicitly requested by the user.**

A change is **breaking** if it requires consumers to modify their code:

**Breaking changes (avoid):**

- ❌ Removing or renaming a prop
- ❌ Changing a prop's type or behavior
- ❌ Removing or renaming a component
- ❌ Changing default values that affect behavior
- ❌ Removing or renaming theme variables
- ❌ Removing exported utilities or functions

**Not breaking changes (preferred):**

- ✅ Adding new optional props
- ✅ Adding new components
- ✅ Bug fixes that restore intended behavior
- ✅ Internal refactoring without API changes
- ✅ Adding new theme variables
- ✅ Deprecating features with warnings (without removing)
- ✅ Documentation updates

When a breaking change is explicitly requested, document it clearly in the commit message with `BREAKING CHANGE:` in the body.

## Testing Requirements

All components **MUST**:

1. Have unit tests (Vitest + React Testing Library in `*.test.tsx`)
2. Have visual regression tests in `/regression-test`
3. Pass accessibility audits (WCAG 2.1 AA)
4. Support RTL languages

### Writing tests

- Try to use `vitest`'s fake timers in unit tests
- When simulating mouse events (e.g., `fireEvent.click`), use `{ button: 0, detail: 1 }` if the click events don't seem to work. This is needed because `FocusRegion.ts/handleDocumentClick` uses `event.detail` and `event.button` to determine if the event was a mouse/touch click.

### Running Tests

```bash
pnpm run test:vitest  # Unit tests
pnpm run cy:component # Cypress tests
pnpm run test:vitest ui-radio-input # Run tests for a single package

# Visual regression tests (in regression-test directory)
cd regression-test
pnpm run dev              # Start at localhost:3000
pnpm run cypress-chrome   # Run with GUI
```

### Adding Visual Regression Test

1. Create test page: `/regression-test/src/app/[component-name]/page.tsx`
2. Add Cypress test: `/regression-test/cypress/e2e/spec.cy.ts`

See `/regression-test/README.md` for detailed instructions.

## Writing Documentation

InstUI uses custom markdown with special code blocks (using [gray-matter](https://github.com/jonschlinkert/gray-matter) YAML syntax) for interactive examples.

**Code block types:**

- `type: code` - Syntax highlighting only
- `type: embed` - Rendered component only
- `type: example` - Interactive (rendered + editable) ⭐ Most common

**IMPORTANT:**

- Always write functional component examples with hooks
- All InstUI components are available without imports in examples

See `/docs/contributor-docs/writing-docs.md` for complete guidelines and syntax.

## Naming Conventions

- **Packages**: `ui-[component-name]` (kebab-case)
- **Components**: PascalCase (Button, Select)
- **Props**: camelCase with prefixes (onClick, isDisabled)
- **Theme variables**: camelCase

## Committing & PRs

Use `/commit` and `/pr` slash commands - they follow InstUI conventions automatically.

**Branch naming:** Create feature branches from `master`

**PR merging:** PRs are typically squashed when merged
