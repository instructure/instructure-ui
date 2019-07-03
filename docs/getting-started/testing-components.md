---
title: Testing
category: Getting Started
order: 5
---

## Testing

### Running Tests Locally

1. Run `yarn test:watch --scope @instructure/[package-name]`.
1. Edit the tests that were generated for you in `packages/[package-name]/src/components/[ComponentName]/__tests__`.
1. Watch your tests run in the console.

> For details on how to write component tests, see the [test utilities](#ui-test-utils) documentation.

### Continuous Integration

In CI, `yarn test` (`yarn ui-test`) is run. This runs the tests headless, without the debugging options enabled.
The `yarn test` script also accepts the `--scope` argument if you want to run it for a single package or test file.

### Debugging Tests

1. Run `yarn test:watch --scope [package name from its package.json]`. This command should automatically open up the Chrome browser.
2. In Chrome click the 'Debug' button at the top of the page (you may have to scroll up).
3. Open the [Developer tools](https://developers.google.com/web/tools/chrome-devtools/debug/?hl=en) (`Command + Shift + C`).
4. Now you can add breakpoints in the test code or the component code to debug issues. (`Command + P` in the 'Sources' tab).

### Test Run Options

Options that can be run with `yarn test`/`yarn test:watch`:
- `--changed` will run the tests against any package that has changes (since the previous commit, including un-staged changes).
- `--staged` will run tests against packages that have been staged but not yet committed.
- `--scope [package name from its package.json (comma delimited)]` will run the tests against a single package.
- `--path [test file paths (comma delimited)]` will run just the tests in a single test src file.
- `--browser=Firefox` will run the tests in the Firefox browser.
- `--browser=Safari` will run the tests in the Safari browser.
- `--randomize` will run the tests in random order, to help catch interdependent or leaky tests.

### Code Coverage

Code coverage thresholds are configured in `karma.config.js` and code is instrumented
via babel config (see [@instructure/ui-babel-preset](#ui-babel-preset)).
If coverage numbers go below the configured values, the test run will fail.
When you run `yarn test` (or `yarn test --scope [package name]`) a detailed coverage report is generated in the `coverage/` directory.
