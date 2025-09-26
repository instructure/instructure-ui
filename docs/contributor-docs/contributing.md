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

Please follow the steps on the [how to build guide page](#building-instui).

### Running the documentation app

1. Run `npm start`
1. Open [http://localhost:8001](http://localhost:8001) in your browser

### Development

1. Run `npm run build:watch` to build all of the packages for a development environment and watch for changes.
1. Run `npm run dev` to start the dev server to run/develop examples and documentation. You can then visit [http://localhost:9090](http://localhost:9090) in a browser. When you make changes to the source code you should see the page auto-reload.
1. Run `npm run test:watch -- --scope @instructure/[package name]` to run the tests for 'package name' and watch for changes.
1. Run `npm run test` to run all the tests for every package.

## Code guidelines

### Testing

See the [testing documentation](#testing-components) for details.

### Linters and Code Formatting

Linters are run as part of the build. If you use the Sublime Text, Atom, or VSCode editors, you can set up the following plugins to catch lint and formatting errors earlier.

1. Install the _Linter_ plugin [Sublime](http://sublimelinter.readthedocs.org/en/latest/), [Atom](https://atom.io/packages/linter). Linting is included in VSCode.
1. Install the _EditorConfig_ plugin [Sublime](https://github.com/sindresorhus/editorconfig-sublime), [Atom](https://github.com/sindresorhus/atom-editorconfig), [VSCode](https://github.com/editorconfig/editorconfig-vscode)
1. Install the _Eslint_ plugin [Sublime](https://github.com/roadhump/SublimeLinter-eslint), [Atom](https://github.com/AtomLinter/linter-eslint), [VSCode](https://github.com/Microsoft/vscode-eslint)
1. Install the _Stylelint_ plugin [Sublime](https://github.com/kungfusheep/SublimeLinter-contrib-stylelint), [Atom](https://atom.io/packages/linter-stylelint), [VSCode](https://github.com/shinnn/vscode-stylelint)
1. Run `npm install` to install the dependencies
1. Restart your editor

### Documentation

Please update the documentation and examples with any changes.

- `npm start` will build the production version of the documentation. You can view it at [http://localhost:8001](http://localhost:8001).
- All components and utilities should be well documented, including examples.
- Write documentation inline in code comment blocks. The code and docs should
  always be in sync.

### Commit Guidelines

1. Run `git commit` to commit your changes and follow our commit message format.
1. Please do not include the output of `npm run build` in your commits.

### Adding a package

1. Run `npm run generate:package` and choose a name for your package (use "kebab" case (dashes), e.g. 'my-package').
2. Run `npm install` to update the lockfile.
3. Give a new package `description` in the `package.json` file.
4. Add package reference in the root `tsconfig.references.json`.
5. Register your package in the **docs app**:
   1. Add an alias for your package in `packages/__docs__/resolve.js`.
   2. Add the dependency in `packages/__docs__/package.json`.
   3. Add the reference in `packages/__docs__/tsconfig.build.json`.
6. Stop the dev server (if you have it running), and run `npm run dev` to pick up the new package.
7. Visit [http://localhost:9090](http://localhost:9090) in a browser. You should see your package listed in the docs.

### Adding a component

1. Run `npm run generate:component` and choose a name for your component (use Pascal case: e.g., 'MyComponent').
2. Choose to create a new package for your component, add it to an existing package, or create the component with no package.
3. If you added the component to an **existing package**:
   1. Don't forget to [add the new dependencies and devDependencies](/#contributing/#code-guidelines-adding-a-new-dependency) to the package.
   2. List the new component in the package's `README.md` file under the `### Components` title (use other packages as reference when there is no "Components" block yet).
   3. Export the component from the `packages/[package]/src/index.js` (`export { MyComponent } from './MyComponent'`)
   4. Export the "Props type" from the `packages/[package]/src/index.js` (`export type { MyComponentProps } from './MyComponent/props'`)
4. If you created a **new package** for your component:
   1. Follow the setup steps 2-5 of [Adding a package](/#contributing/#code-guidelines-adding-a-package). Do not start the dev server yet.
   2. The exports for the component and its Props type will be added automatically to `packages/[package]/src/index.js`.
5. When adding a child component to another component, modify the child's `componentId` to be prefixed with the parent, e.g.: `MyComponent.Item`.
6. [Register the components Theme type](/#contributing/#code-guidelines-registering-the-components-theme-type). For the initial setup, define the mock variables used in the `theme.js`.
7. Run `npm install` to update the lockfile.
8. Run `npm run bootstrap` to generate the `es`, `lib` and `types` directories for your component.
9. Add your component to `packages/__docs__/components.js`.
10. Stop the dev server (if you have it running), and run `npm run dev` to pick up the new component.
11. Visit [http://localhost:9090](http://localhost:9090) in a browser. You should see your component listed in the docs.
12. Start making changes to your component, and watch it update in the browser automatically.
13. Resolve all `FIXME` comments in the generated code (except in the `MyComponentLocator.ts`).
14. Add a short description of the new component to the `packages/__docs__/buildScripts/ai-accessible-documentation/summaries-for-llms-file.json` file. This will optimize the component's documentation for consumption by AI agents.

### Adding a new dependency

1. Add the new dependency or devDependency in the package's `package.json`.
2. If the dependency is one of our own `@instructure/` packages, add it to the type references in the package's `tsconfig.build.json` too.

### Registering the components Theme type

1. Add the component theme type (`export type MyComponentTheme = {}`) in `packages/shared-types/src/ComponentThemeVariables.ts`.
2. Add this new type to the `ThemeVariables` map in the same file (this is needed for the theme overrides to be typed well).
3. When naming the theme for a subcomponent (e.g.: `MyComponent > Item`), prefix the name with its parent's name, e.g.: `MyComponentItemTheme`. In the `ThemeVariables`, register it both under its prefixed name (`MyComponentItem`) and under its componentId as well (`MyComponent.Item`).

### Accessibility and Internationalization Requirements

All components should:

1. Be accessible (See the [accessibility requirements](#accessibility) for more information).
1. Support RTL languages.
1. Localize all dates, times, numbers and strings (or require localized content passed in via props).
