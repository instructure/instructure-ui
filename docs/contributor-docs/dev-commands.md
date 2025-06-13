---
title: Dev Commands Cheat Sheet
category: Contributor Guides
order: 3
---

## Dev Commands Cheat Sheet

This is a quick developer reference for common Instructure UI repository commands. All should be run from the repository root. Make sure you run `npm install` first, as many of these commands will require you to have `lerna` dependencies installed before they will work.

| Command                                         | Description                                                                                                                                                                                                     |
| ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run bootstrap`                             | Clean all node modules and build output, reinstall dependencies, create fresh build including regenerating design tokens and type declaration files.                                                            |
| `npm run dev`                                   | Run a local instance of the documentation app in dev mode. Docs will be served at `http://0.0.0.0:9090`                                                                                                         |
| `npm run start`                                 | Run a local instance of the documentation app in production mode. The urls where the docs are being served will be included in the output of this command.                                                      |
| `npm run build`                                 | Run the build command for all Instructure UI packages. Similar to bootstrap, but without the cleaning steps, installation of dependencies, and without the token and type generation.                           |
| `npm run build:watch`                           | Identical to `npm run build` but will watch for changes. Note: this command is rarely necessary to use. If you are running `npm run dev`, the docs app will already be watching for any changes for components. |
| `npm run build -- --scope <package-name>`       | Identical to `npm run build` but scoped to a single package. For example, to run the command only for the `ui-badge` package, you would do `npm run build -- --scope @instructure/ui-badge`                     |
| `npm run build:watch -- --scope <package-name>` | Identical to `npm run build:watch` but scoped to a single package. For example, to run the command only for the `ui-badge` package, you would do `npm run build:watch -- --scope @instructure/ui-badge`         |
| `npm run build:ts`                              | Create type declaration files using `tsc` (TypeScript compiler).                                                                                                                                                |
| `npm run test`                                  | Run all Instructure UI tests in production mode. Tests will be run in a headless instance of chrome.                                                                                                            |
| `npm run test:watch`                            | Run all Instructure UI tests in dev mode. Tests run this way will actually launch a browser and will also give you the option to debug.                                                                         |
| `npm run test -- --scope <package-name>`        | Identical to `npm run test` but scoped to a single package. For example, to run the command only for the `ui-avatar` package you would do `npm run test -- --scope @instructure/ui-avatar`                      |
| `npm run test:watch -- --scope <package-name>`  | Identical to `npm run test:watch` but scoped to a single package. For example, to run the command only for the `ui-avatar` package you would do `npm run test:watch -- --scope @instructure/ui-avatar`          |
