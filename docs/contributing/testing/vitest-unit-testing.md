---
title: Vitest unit testing
category: Contributing/Testing
order: 2
---

## Vitest unit testing

### Running Vitest

Vitest can be run from the project root with the following command. It's configured in our CI pipeline so pushing a branch to remote runs these tests automatically.

```
pnpm run test:vitest
```

You can scope the tests you want to run by specifying the path and also enable watch mode to automatically rerun tests when files change.

Run all tests of the selected component in wach mode:

```
pnpm run test:vitest-watch ui-avatar
```

Run specific test file in wach mode:

```
pnpm run test:vitest-watch ui-avatar/src/Avatar/__tests__/Avatar.test.tsx
```

> DO NOT forget to `rebuild` the changed package before testing!

### Creating new tests

Current tests can be found next to the component source code in the `__tests__` subfolder. New tests should also be added there.
By convention we name test files after the component they are testing like:

`[component-package]/src/[ComponentName]/__tests__/[ComponentName].test.tsx`

Vitest tests usually have a structure like this:

```js
---
type: code
---
import { render } from 'vitest-browser-react'
import { page } from 'vitest/browser'
import { describe, it, expect, vi } from 'vitest'

import { ComponentToTest } from '../index'

describe('<ComponentToTest/>', () => {
  it('works as intended...', async () => {
    const onClickMock = vi.fn()
    await render(<ComponentToTest onClick={onClickMock} />)
    await expect.element(page.getByText('Label')).toBeVisible()
    // rest of the test comes here
  })
})
```

### Example

You can view our code base on GitHub.

The `ui-avatar` tests can be found [here](https://github.com/instructure/instructure-ui/tree/master/packages/ui-avatar/src/Avatar/__tests__).

### Debugging tests

If you need to debug a test in your IDE or print extra info, you can use:

```
console.log('Debug info')
```

To inspect the rendered DOM, log the container returned by `render`:

```
const { container } = await render(<ComponentToTest />)
console.log(container.innerHTML)
```

If you want to debug tests using breakpoints, see [IDE Integrations](https://vitest.dev/guide/ide.html).

### Configuration Setup

In the root you can find the key configuration files and folder locations used for our test environment:

- [vitest.config.mts](https://github.com/instructure/instructure-ui/blob/master/vitest.config.mts)
- [vitest.setup.browser.ts](https://github.com/instructure/instructure-ui/blob/master/vitest.setup.browser.ts)
