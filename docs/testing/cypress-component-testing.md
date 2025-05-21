---
title: Cypress component testing
category: Testing
order: 3
---

# Cypress component testing

Sometimes unit test behaviour doesn't match how our components work in the browser (e.g. no ResizeObserver)
InstUI uses [Cypress Component Testing](https://docs.cypress.io/guides/component-testing/overview) in these cases to run tests in a real-world environment.

### Running tests

You can run them from the root with the following command:

```
npm run cy:component
```

Run specific test file:
```
npm run cy:component -- --spec "cypress/component/Alerts.cy.tsx"
```
### Creating new tests

New tests should be added under `cypress/component/`  
By convention we name test files after the component they are testing like `cypress/component/[ComponentName].cy.tsx`

Cypress tests usually have a structure like this:

```js
---
type: code
---
import React from 'react'
import { ComponentToTest } from '@instructure/ui'
import '../support/component'

describe('<ComponentToTest/>', () => {
  it('works as intended...', () => {
    cy.mount(<ComponentToTest />)
    // rest of the test comes here
  })
})
```
You can read more about cypress testing from their [docs](https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Writing-tests) and their [React Examples](https://docs.cypress.io/guides/component-testing/react/examples).

### Example
You can view our code base on GitHub. The component tests can be found [here](https://github.com/instructure/instructure-ui/tree/master/cypress/component).


### Debugging tests

To run cypress in a non-headless mode, use the following command:

```
npx cypress open --component
```

This opens a new window and prompts you to choose a browser. After that you can run tests individually, interact with them and check logs.

### Using native system events

Sometimes using native events are needed for more accuracy. This can be achieved with [cypress-real-events](https://github.com/dmtrKovalenko/cypress-real-events).

From their docs:

> Why? Cypress default events are simulated. That means that all events like cy.click or cy.type are fired from javascript. That's why these events will be untrusted (event.isTrusted will be false) and they can behave a little different from real native events. But for some cases, it can be impossible to use simulated events, for example, to fill a native alert or copy to the clipboard. This plugin solves this problem.

This packages is added to the project so you can import it and use it like this:

```js
---
type: code
---
import React from 'react'
import { Button } from '../../packages/ui'
import '../support/component'
import 'cypress-real-events'

describe('real events testing', () => {
  it('clicks for real', () => {
    cy.mount(<Button >click me</Button>)
    cy.contains('click me').realClick()
    // rest of the test
  })
})
```


### Configuration Setup
Here you can find the key configuration files and folder locations used for our test environment:
- [cypress/support](https://github.com/instructure/instructure-ui/tree/master/cypress/support)
- [cypress.config.ts](https://github.com/instructure/instructure-ui/blob/master/cypress.config.ts)
