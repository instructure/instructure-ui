---
title: Dev Commands Cheat Sheet
category: Getting Started
order: 3
---

## Dev Commands Cheat Sheet

This is a quick developer reference for common Instructure UI repository commands. All should be run from the repository root. Make sure you run `yarn` first, as many of these commands will require you to have `lerna` dependencies installed before they will work.

| Command                                   | Description                                                                                                                                                                                               |
| ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `yarn bootstrap`                          | Clean all node modules and build output, reinstall dependencies, create fresh build including regenerating design tokens and type declaration files.                                                      |
| `yarn dev`                                | Run a local instance of the documentation app in dev mode. Docs will be served at `http://0.0.0.0:8080`                                                                                                   |
| `yarn start`                              | Run a local instance of the documentation app in production mode. The urls where the docs are being served will be included in the output of this command.                                                |
| `yarn build`                              | Run the build command for all Instructure UI packages. Similar to bootstrap, but without the cleaning steps, installation of dependencies, and without the token and type generation.                     |
| `yarn build-watch`                        | Identical to `yarn build` but will watch for changes. Note: this command is rarely necessary to use. If you are running `yarn dev`, the docs app will already be watching for any changes for components. |
| `yarn build --scope <package-name>`       | Identical to `yarn build` but scoped to a single package. For example, to run the command only for the `ui-badge` package, you would do `yarn build --scope @instructure/ui-badge`                        |
| `yarn build-watch --scope <package-name>` | Identical to `yarn build-watch` but scoped to a single package. For example, to run the command only for the `ui-badge` package, you would do `yarn build-watch --scope @instructure/ui-badge`            |
| `yarn test`                               | Run all Instructure UI tests in production mode. Tests will be run in a headless instance of chrome.                                                                                                      |
| `yarn test-watch`                         | Run all Instructure UI tests in dev mode. Tests run this way will actually launch a browser and will also give you the option to debug.                                                                   |
| `yarn test --scope <package-name>`        | Identical to `yarn test` but scoped to a single package. For example, to run the command only for the `ui-avatar` package you would do `yarn test --scope @instructure/ui-avatar`                         |
| `yarn test-watch --scope <package-name>`  | Identical to `yarn test-watch` but scoped to a single package. For example, to run the command only for the `ui-avatar` package you would do `yarn test-watch --scope @instructure/ui-avatar`             |
| `yarn start-examples`                     | Starts a production instance of [storybook](https://storybook.js.org/) with all component examples.                                                                                                       |
| `yarn dev-examples`                       | Starts a dev instance of [storybook](https://storybook.js.org/) with all component examples.                                                                                                              |
