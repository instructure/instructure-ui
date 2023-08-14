---
title: Converting old tests
category: Testing
order: 4
---

## Converting old tests

This guide explains how to convert current InstUI tests written with the `@instructure/ui-test-utils` testing library to
use Jest + React Testing Library.

### Running Jest

Jest can be run from the project root with the `yarn test:new` command. It's configured in our CI pipeline so pushing a
branch to remote runs these tests together with the legacy tests automatically.

### Adding new tests to a package

Current tests can be found next to the component source code in the `__tests__` subfolder. New tests should be added
there in the `__new-tests__` directory. New test files should have the same names as the ones in `__tests__`.

New tests should try to mirror old tests as close as possible, most of the time this will be trivial.

### Skipping old tests

Once a test is rewritten in the new framework the old counterpart should be skipped to indicate that it's converted and
also to be resourceful with our CI. This can be done by adding `.skip` to individual tests or the whole suite. E.g.:
`it('should...')` -> `it.skip('should...)` or `describe('<Component/>)` -> `describe.skip('<Component/>')`. If a whole
suite is skipped there's no need to skip individual tests inside it.

### Example

The `ui-avatar` tests were added as an example/reference. They can be found [here](https://github.com/instructure/instructure-ui/tree/master/packages/ui-avatar/src/Avatar/__new-tests__).
