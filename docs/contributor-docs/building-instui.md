---
title: How to build Instructure UI
category: Contributor Guides
order: 2
---

# Building Instructure UI

Instructure UI is a mono-repository which means it has multiple packages (almost always a component means an individual package) and they are treated as one whole package when dealing with dependencies and building them.

The project uses `npm` for managing these packages and also for resolving dependencies, running scripts and managing the whole mono-repository itself.

> **Note**: Windows is only partially supported. One can build the project and documentation apps, running other commands (like testing) fail.
>
> Also we're using environment variables through our build pipeline and they are defined differently in Linux/OSX and Windows.

### How to build the project

In order to build the project one should have [`git`](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) and [`node`](https://nodejs.org/en/download/) (supported version is defined in the root [package.json](https://github.com/instructure/instructure-ui/blob/master/package.json#L90)) installed.

1. Download the source code and go into the root directory of instructure-ui:
   ```sh
   git clone https://github.com/instructure/instructure-ui.git
   cd instructure-ui
   ```
2. Install dependencies for packages:
   ```sh
   npm install
   ```
3. Run the bootstrap script:
   ```sh
   npm run bootstrap
   ```
   This script will invoke:
   - the `TypeScript` compiler (tsc) to generate the type definitions for the packages
   - `babel` to transpile the source code of every package to a version that browsers can understand (supported browsers are defined in [`@instructure/browserslist-config-instui`](https://github.com/instructure/instructure-ui/blob/master/packages/browserslist-config-instui/index.js) package)
   - a `clean` script which removes any previous build output

The output of bootstrap can be found in `lib`, `es` (for non node packages) and `types` directories for each package respectively, where:

- `lib` contains [`commonjs`](https://nodejs.org/docs/latest/api/modules.html#modules-commonjs-modules) module output
- `es` contains [`es`](https://nodejs.org/docs/latest/api/esm.html#modules-ecmascript-modules) module output
- `types` contains the TypeScript type definitions

That is all, if you are interested about the available commands check out our [commands cheat sheet](/#dev-commands).

### How to build the documentation

This assumes that all of the above mentioned steps are completed, meaning the project dependencies are installed and the project itself is built.

The documentation application is a simple client side only single page application (SPA) built with `React`. It uses Instructure UI components itself.

In order to build the static files for the documentation, from the project root run:

```sh
npm run build:docs
```

This should create the static bundle using `webpack`, the output files can be found in `instructure-ui/packages/__docs__/__build__/`.

We use this bundle to host the documentation at [instructure.design](https://instructure.design).
