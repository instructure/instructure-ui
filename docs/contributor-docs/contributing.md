---
title: Contributing
category: Contributor Guides
order: 1
---

## Contributing

Contributions are welcome! If you want to submit a change you will need to open a pull request on Github. To do so first fork the repository to your own Github account.

### What can you contribute?

If you found a bug or want to add a minor feature, go ahead! If you'd like to add a new component, or change/add new visuals, please read on.

We try to keep InstUI easy to use, easy to learn and free from bloat.
For this reason we will only add new components if it fits into the current design patterns, and the new component cannot be
constructed from the existing ones. For these reasons adding a new component has the following process:

- You should write a document which includes the component description, and the use cases it's meant to be used in.
- You should make some kind of design sketch that documents the design of the component (e.g. with [Figma](https://www.figma.com/)).
- Our design team will review and approve this design sketch.
- If the sketch is OK, you will need to make a pull request (read on for our code guidelines), the InstUI dev team, the design team, and our a11y team will review and merge your contribution.

### Building InstUI from the source

Please follow the steps on the [how to build guide page](building-instui).

### Running the documentation app

1. Run `pnpm start`
1. Open [http://localhost:9090](http://localhost:9090) in your browser

### Development

1. Run `pnpm run build:watch` to build all of the packages for a development environment and watch for changes.
1. Run `pnpm run dev` to start the dev server to run/develop examples and documentation. You can then visit [http://localhost:9090](http://localhost:9090) in a browser. When you make changes to the source code you should see the page auto-reload.
1. Run `pnpm run test:watch -- --filter @instructure/[package name]` to run the tests for 'package name' and watch for changes.
1. Run `pnpm run test` to run all the tests for every package.

## Code guidelines

### Testing

See the [testing documentation](testing-overview) for details.

### Linters and Code Formatting

Linters are run as part of the build. If you use VSCode, you can set up the following plugins to catch lint and formatting errors earlier.

1. Install the _Eslint_ plugin [VSCode](https://github.com/Microsoft/vscode-eslint)
1. Install the _Stylelint_ plugin [VSCode](https://github.com/stylelint/vscode-stylelint)
1. Run `pnpm install` to install the dependencies
1. Restart your editor

### Documentation

Please update the documentation and examples with any changes.

- `pnpm start` will build the production version of the documentation. You can view it at [http://localhost:9090](http://localhost:9090).
- All components and utilities should be well documented, including examples.
- Write documentation inline in code comment blocks. The code and docs should
  always be in sync.

### Commit Guidelines

Run `git commit` to commit your changes and follow our commit message format.

### Registering the components Theme type

1. Add the component theme type (`export type MyComponentTheme = {}`) in `packages/shared-types/src/ComponentThemeVariables.ts`.
2. Add this new type to the `ThemeVariables` map in the same file (this is needed for the theme overrides to be typed well).
3. When naming the theme for a subcomponent (e.g.: `MyComponent > Item`), prefix the name with its parent's name, e.g.: `MyComponentItemTheme`. In the `ThemeVariables`, register it both under its prefixed name (`MyComponentItem`) and under its componentId as well (`MyComponent.Item`).

### Accessibility and Internationalization Requirements

All components should:

1. Be accessible (See the [accessibility requirements](accessibility) for more information).
1. Support RTL languages.
1. Localize all dates, times, numbers and strings (or require localized content passed in via props).
