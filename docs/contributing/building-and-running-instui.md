---
title: Building and running InstUI
category: Contributing
order: 2
---

# Building Instructure UI

Instructure UI is a mono-repository which means it has multiple packages (almost always a component means an individual package) and they are treated as one whole package when dealing with dependencies and building them.

The project uses `pnpm` for managing these packages and also for resolving dependencies, running scripts and managing the whole mono-repository itself.

> **Note**: Windows is only partially supported. One can build the project and documentation apps, running other commands (like testing) fail.
>
> Also we're using environment variables through our build pipeline and they are defined differently in Linux/OSX and Windows.

### How to build the project

In order to build the project one should have [`git`](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git), [`node`](https://nodejs.org/en/download/) (supported version is defined in the root [package.json](https://github.com/instructure/instructure-ui/blob/master/package.json#L90)), and [`pnpm`](https://pnpm.io/installation) installed.

1. Download the source code and go into the root directory of instructure-ui:

   ```sh
   ---
   type: code
   ---
   git clone https://github.com/instructure/instructure-ui.git
   cd instructure-ui
   ```

2. Install dependencies for packages:

   ```sh
   ---
   type: code
   ---
   pnpm install
   ```

3. Run the bootstrap script:

   ```sh
   ---
   type: code
   ---
   pnpm run bootstrap
   ```

   This script will invoke:

   - the `TypeScript` compiler (tsc) to generate the type definitions for the packages
   - `babel` to transpile the source code of every package to a version that browsers can understand (supported browsers are defined in [`@instructure/browserslist-config-instui`](https://github.com/instructure/instructure-ui/blob/master/packages/browserslist-config-instui/index.js) package)
   - a `clean` script which removes any previous build output

The output of bootstrap can be found in `lib`, `es` (for non node packages) and `types` directories for each package respectively, where:

- `lib` contains [`commonjs`](https://nodejs.org/docs/latest/api/modules.html#modules-commonjs-modules) module output
- `es` contains [`es`](https://nodejs.org/docs/latest/api/esm.html#modules-ecmascript-modules) module output
- `types` contains the TypeScript type definitions

That is all, if you are interested about the available commands check out the [Dev Commands Cheat Sheet](#dev-commands-cheat-sheet) section below.

### How to build the documentation

This assumes that all of the above mentioned steps are completed, meaning the project dependencies are installed and the project itself is built.

The documentation application is a simple client side only single page application (SPA) built with `React`. It uses Instructure UI components itself.

In order to build the static files for the documentation, from the project root run:

```sh
---
type: code
---
pnpm run build:docs
```

This should create the static bundle using `webpack`, the output files can be found in `instructure-ui/packages/__docs__/__build__/`.

We use this bundle to host the documentation at [instructure.design](https://instructure.design).

## AI Coding Assistant Setup

### Using Claude Code

For comprehensive guidance on using Claude Code with this repository, see [CLAUDE.md](https://github.com/instructure/instructure-ui/blob/master/CLAUDE.md) in the repository root.

## Generating AI agent friendly markdown files for components and guides

InstUI's JSON metadata is used to create a markdown version of the documentation for easier use by AI tools and coding assistants.

These markdown files are created during the build process then are made available for users using specific links.

This collection includes structured files for almost everything under the 'Getting Started', 'Guides', 'Patterns' and 'Components' (including Components/AI Components and Components/Utilities) sections of the documentation.

How it works:
The core logic resides in `packages/__docs__/buildScripts/ai-accessible-documentation/generate-ai-accessible-markdowns.mts`.

1. **Input and output**  
   Input: The script processes the JSON files found under `packages/__docs__/__build__/docs` if they belong to the corresponding sections mentioned above.  
   Output: A directory of generated .md files under `packages/__docs__/__build__/markdowns`, which are also compressed into a documentation.zip archive as well which also can be found in this directory.

2. **Data loading and classification**  
   The script reads all JSON files from the specified docs folder.
   Identifies the necessary components and guides based on having props (components) or having a `relevantForAI: true` YAML flag (guides).

3. **Markdown generation**  
   A markdown file is generated using the data found under the 'description' key. As for components, an addtional table of props and a 'Usage' section is generated for showing how to import the component.
   As for the table of props, the props of a child component (e.g. Tabs.Panel) of a parent component (e.g. Tabs) is also included in the table.

4. **Index file creation and packaging**  
   After all individual markdown files are written, index.md file is generated, which acts as a master list of contents for the entire documentation set.
   Finally, the script uses the system's zip command to package all .md files in the output directory into the final documentation.zip file, which can be downloaded here: https://instructure.design/markdowns/documentation.zip  
   The AI-friendly markdown files are now avaliable either downloading the documentation.zip file or through a link that follows this pattern: https://instructure.design/markdowns/Alert.md

## Generating llms.txt for LLMs

In addition to the markdown files, a llms.txt file is also generated. This file is specifically formatted for optimal consumption by Large Language Models (LLMs) and AI coding agents.
This file contains a catalog of links pointing to the online markdown files of InstUI components and guides generated above and short description of each component/guide

How it works:
The core logic resides in `packages/__docs__/buildScripts/ai-accessible-documentation/ggenerate-ai-accessible-llms-file.mts`.

1. **Input and output**  
   Input: The script processes the following JSON file: `packages/__docs__/__build__/markdown-and-sources-data.json`  
   Output: An llms.txt file is placed into `packages/__docs__/__build__` which can be found here: https://instructure.design/llms.txt

2. **Data loading and classification**  
   The script indenftifies the necessary elements looking for "Getting Started", "Guides", "Patterns", and "Components" section names.

3. **Markdown generation**  
   It creates a documentation structure like this:

   ```md
   ---
   type: code
   ---

   # Instructure UI (InstUI) - React Component Library

   ## Documentation

   ### User Guides

   #### Getting Started

   #### Guides

   #### Patterns

   ### Components

   #### Utilities

   #### AI components
   ```

   It generates links for the components/guides and appends a brief summary of each of them using the `packages/__docs__/buildScripts/ai-accessible-documentation/summaries-for-llms-file.json` file, searching for matching component/guide title.

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
