---
title: Testing Components
category: guides
---

## Testing Components

### The TL;DR on writing tests:

1. Run `yarn test:watch --scope @instructure/ui-core`.
1. Edit the tests that were generated for you in `packages/ui-core/src/components/MyComponent/__tests__`.
1. Watch your tests run in the console.

For details on how to write component tests, see the [Testbed](#ui-testbed) documentation.

### Code Coverage

Code coverage thresholds are configured in `karma.config.js` and code is instrumented
via babel config (see [@instructure/ui-presets](#ui-presets).

If coverage numbers go below the configured values, the test run will fail.

When you run `yarn test` a detailed coverage report is generated in the `coverage/` directory.
