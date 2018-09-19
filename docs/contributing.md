---
title: Contributing
category: Getting Started
---

## Contributing


### Development

`yarn start:watch` runs the dev server to run/develop examples. You can then visit [http://localhost:8080](http://localhost:8080) in a browser and changes to the source should auto-refresh.


### Adding packages

>__Before adding a package, create an RFC__ (request for comment) document by running `yarn generate:rfc`. This script
creates an RFC document for you in `/rfcs`. Fill out this document and submit it for review.

Once the RFC is approved and merged you can go ahead and add your new package:

1. Run `yarn generate:package` and choose a name for your package (use "kebab" case (dashes), e.g. 'my-package').
2. If you will have React components in your package, add the package components directory to `packages/__docs__/components.js`.
3. Add an alias for your package in `packages/__docs__/resolve.js`.
3. Kill the server (if you had it running), and run `yarn start:watch` to pick up the new package.
4. Visit [http://localhost:8080](http://localhost:8080) in a browser. You should see your package and its components listed in the docs.
5. Start making changes to your components and watch them update in the browser automatically.


### Adding components

>__Before adding a component, create an RFC__ (request for comment) document by running `yarn generate:rfc`. This script creates an RFC document for you in `/rfcs`. Fill out this document and submit it for review.

Once the RFC is approved and merged you can go ahead and add your new component:

1. Run `yarn generate:component` and choose a name and package for your component (use Pascal case, e.g. 'MyComponent').
2. Import/export your component in `packages/[package]src/components/index.js`.
3. Kill the server (if you had it running), and run `yarn start:watch` to pick up the new component.
4. Visit [http://localhost:8080](http://localhost:8080) in a browser. You should see your component listed in the docs.
5. Start making changes to your component and watch it update in the browser automatically.

### Changes to existing components

If your changes involve changes to the component API, you'll need to fill out an RFC (see above) and have it reviewed
before implementing your change. Be sure to note any breaking changes or deprecations in the RFC document.


### Testing

All components should have good test coverage. See the [testing documentation](#testing-components) for details.
- `yarn test` will run the tests with a headless browser.
- `yarn test:watch` will run the tests and watch for changes to the source code.
Run this if you'd like to debug tests in the browser (Chrome).

Options that can be run with `yarn test`/`yarn test:watch`:
- `--changed` will run the tests against any package that has changes (since the previous commit, including un-staged changes).
- `--staged` will run tests against packages that have been staged but not yet committed.
- `--scope [package name from its package.json (comma delimited)]` will run the tests against a single package.
- `--path [test file paths (comma delimited)]` will run just the tests in a single test src file.


### Debugging

1. Run `yarn test:watch --scope [package name from its package.json]`. This command should automatically open up the Chrome browser.
2. In Chrome click the 'Debug' button at the top of the page (you may have to scroll up).
3. Open the [Developer tools](https://developers.google.com/web/tools/chrome-devtools/debug/?hl=en) (`Command + Shift + C`).
4. Now you can add breakpoints in the test code or the component code to debug issues. (`Command + P` in the 'Sources' tab).


  > To run the tests in a browser other than Chrome (e.g. Firefox or Safari)
  >
  > `NODE_ENV=test karma start --browsers=Firefox`.


### Documentation

- `yarn start` will build the production version of the documentation. You can view it at [http://localhost:8001](http://localhost:8001).
- All components and utilities should be well documented, including examples.
- Write documentation inline in code comment blocks. The code and docs should
always be in sync.


### Accessibility and Internationalization Requirements

All components should:
1. be high contrast aware (use theme variables for all colors, colors should meet [4.5:1](http://www.w3.org/TR/WCAG20-TECHS/G18.html) and [3:1](http://www.w3.org/TR/WCAG20-TECHS/G183.html) contrast ratios).
2. be keyboard friendly (proper use of tabIndex, logical tab order, ESC to close modals, etc).
3. be screenreader friendly (label all inputs, use native controls, use screenreader-only text).
4. support RTL languages.
5. localize all dates, times, numbers and strings (or require localized content passed in via props).
