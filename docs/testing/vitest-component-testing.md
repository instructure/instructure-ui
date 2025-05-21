---
title: Vitest component testing
category: Testing
order: 2
---

## Vitest component testing

[Vitest](https://vitest.dev/guide/) is our fastest tool for in-memory testing of components and logic in a Node.js environment. We pair it with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) to validate behavior, rendering, and edge cases—all without requiring a real browser.

### Running Vitest

Vitest can be run from the project root with the following command. It's configured in our CI pipeline so pushing a branch to remote runs these tests automatically.

```
npm run test:vitest
```

### Creating new tests

Current tests can be found next to the component source code in the `__tests__` subfolder. New tests should be added there.

Vitest tests usually have a structure like this:

```js
---
type: code
---
import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'

import '@testing-library/jest-dom'
import ComponentToTest from '../index'

describe('<ComponentToTest/>', () => {
  it('works as intended...', () => {
    const onClickMock = vi.fn()
    render(<ComponentToTest onClick={onClickMock}/>)
    // rest of the test comes here
  })
})
```

### Example

The `ui-avatar` tests can be found [here](https://github.com/instructure/instructure-ui/tree/master/packages/ui-avatar/src/Avatar/__tests__).

### Debugging tests

If you need to debug a test in your IDE or print extra info, you can use:

```
console.log('Debug info')
```

To inspect the rendered DOM and current test state, you can also use:

```
screen.debug()
```

### Simulating Real User Interactions

While fireEvent from React Testing Library works for basic interaction simulation, we use @testing-library/user-event for more realistic and accessible user interaction testing.
[userEvent](https://testing-library.com/docs/user-event/intro/) is a companion library for Testing Library that provides more advanced simulation of browser interactions than the built-in fireEvent method.
While fireEvent dispatches single DOM events, userEvent can fire multiple events and do additional checks along the way, making your tests closer to actual user experience.

Use it in the following way:

```js
---
type: code
---
import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'

import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import ComponentToTest from '../index'

describe('<ComponentToTest/>', () => {
  it('works as intended...', async () => {
    const onKeyDownMock = vi.fn()
    render(<ComponentToTest onKeyDown={onKeyDownMock}/>)

    const input = screen.getByTestId('input')
    await userEvent.type(input, 'foo bar{enter}')
    // rest of the test comes here
  })
})
```
