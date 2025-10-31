---
title: Dev Commands Cheat Sheet
category: Contributor Guides
order: 3
---

## Dev Commands Cheat Sheet

This is a quick developer reference for common Instructure UI repository commands. All should be run from the repository root. Make sure you run `pnpm install` first, as many of these commands will require you to have `lerna` dependencies installed before they will work.

| Command                                                                      | Description                                                                                                                                                                                                       |
| ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm run bootstrap`                                                         | Clean all node modules and build output, reinstall dependencies, create fresh build including regenerating design tokens and type declaration files.                                                              |
| `pnpm run dev`                                                               | Run a local instance of the documentation app in dev mode. Docs will be served at `http://0.0.0.0:9090`. Port can be specified too e.g. `pnpm run dev -- -p 1234`                                                 |
| `pnpm run start`                                                             | Run a local instance of the documentation app in production mode. The urls where the docs are being served will be included in the output of this command.                                                        |
| `pnpm run build`                                                             | Run the build command for all Instructure UI packages. Similar to bootstrap, but without the cleaning steps, installation of dependencies, and without the token and type generation.                             |
| `pnpm run build:watch`                                                       | Identical to `pnpm run build` but will watch for changes. Note: this command is rarely necessary to use. If you are running `pnpm run dev`, the docs app will already be watching for any changes for components. |
| `pnpm run build -- --scope <package-name>`                                   | Identical to `pnpm run build` but scoped to a single package. For example, to run the command only for the `ui-badge` package, you would do `pnpm run build -- --scope @instructure/ui-badge`                     |
| `pnpm run build:watch -- --scope <package-name>`                             | Identical to `pnpm run build:watch` but scoped to a single package. For example, to run the command only for the `ui-badge` package, you would do `pnpm run build:watch -- --scope @instructure/ui-badge`         |
| `pnpm run build:ts`                                                          | Create type declaration files using `tsc` (TypeScript compiler).                                                                                                                                                  |
| `pnpm run test:vitest`                                                       | Run all Instructure UI component-level unit tests in a jsdom environment.                                                                                                                                         |
| `pnpm run test:vitest-watch [ComponentName]`                                 | Run all tests of the selected component in wach mode.                                                                                                                                                             |
| `pnpm run cy:component`                                                      | Run all Instructure UI component-level Cypress tests in a real browser environment.                                                                                                                               |
| `pnpm run cy:component -- --spec "cypress/component/[ComponentName].cy.tsx"` | Run specific component test file.                                                                                                                                                                                 |
