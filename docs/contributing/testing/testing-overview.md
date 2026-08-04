---
title: Overview
category: Contributing/Testing
order: 1
---

## Testing

This page provides an overview of the testing strategies we use to ensure the quality and stability of our components. We use a combination of modern tools to support our testing needs. Each tool serves a different purpose in our testing pyramid.

### Test strategies:

#### Unit tests with Vitest-browser and Vitest:

InstUI's main testing suite runs in [Vitest browser mode](https://vitest.dev/guide/browser/). This runs the tests in a real browser with a Jest/Vitest like API. Node scripts are tested in Vitest too.

For more information about our unit tests you can check out our [detailed guides and examples.](/#vitest-unit-testing)

#### Visual Regression Testing with Cypress:

We use [Cypress](https://docs.cypress.io/app/tooling/visual-testing) end-to-end (e2e) tests to capture screenshots of every component showcase page in the `regression-test` Next.js app. A custom [pixelmatch](https://github.com/mapbox/pixelmatch)-based `ui-scripts visual-diff` command compares each capture against a baseline stored on the `visual-baselines` branch and publishes an interactive HTML report to GitHub Pages for every PR. Tests are run after changes are pushed to remote; when differences are detected, the job fails and the sticky PR comment links to the report with inline diff images.

These e2e tests also run [Axe](https://github.com/dequelabs/axe-core) accessibility checks and monitor `console.error`s.

For the full workflow, local dev loop, and how to add a new page, see the [visual regression testing guide](visual-regression).
