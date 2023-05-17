---
title: Writing tests
category: Testing
order: 3
---

> This section uses `@instructure/ui-test-utils` testing library, plsease see the installation and configuration [here](/#ui-test-utils)

## The anatomy of a test

The following code example presents an annotated version of a typical test. The terms in the comments will be explained over the course of this section.

```javascript
import React from 'react'
import {
  mount,
  stub,
  wait,
  expect,
  findWithLabel,
  findWithText
} from '@instructure/ui-test-utils'

import MyComponent from '../index'
import { setupFixtures, cleanupFixtures } from './fixtures'

// test suite:
describe('<MyComponent/>', async () => {
  // async/await
  // hook:
  beforeEach(async () => {
    await setupFixtures()
  })

  // hook:
  afterEach(async () => {
    await cleanupFixtures()
  })

  // test case:
  it('should do something', async () => {
    // stub:
    const handleClick = stub()

    // mounting a component:
    await mount(
      <MyComponent buttonLabel="My button label" onClick={handleClick} />
    )

    // query:
    const button = await findWithLabel('My button label')

    // query result with event helper:
    await button.click()

    // assertion with wait:
    await wait(() => {
      expect(handleClick).to.have.been.calledOnce()
    })

    // query:
    const response = await findWithText(
      'My response text',
      // query options:
      { exact: false }
    )

    // assertion:
    expect(response).to.exist()
  })
})
```

### Test suites and test cases

#### Test suites: `describe()`

Test suites are how the Mocha framework groups tests. Create a suite by using a `describe()` function that returns all the tests included in the suite:

```javascript
describe('when variant is set to rectangle', async () => {
  // all the tests related to the rectangle variant
})
```

You can nest your tests in groups as deep as you deem necessary. The main benefit to thoughtful nesting is that your tests (especially those for complex components) will stay organized and be easier for other developers to maintain. In addition, grouping tests by category will make the console output from your tests will be easier to parse. Finally, by using `describe.only(‘...’)`, you can limit your tests to only run on a certain suite and test hooks ([see below](/#writing-tests/#the-anatomy-of-a-test-hooks-and-the-test-sandbox)) are scoped to all tests within the `describe` block where they are defined.

#### Test cases: `it()`

In Mocha, each test case (or each individual test) goes inside an `async it()` function. To keep your tests consistent and make your test output a pleasure to read, we recommend sticking to an `it('should [do something]')` format when writing test cases.

### Async and await

#### UI tests should be asynchronous.

For readers without JavaScript backgrounds, this is a fancy way of saying that when you’re testing the DOM, you want to wait for something to happen before you move on to the next thing. Why? Because on the web, stuff happens all the time that makes tests that don’t wait (a.k.a., synchronous tests) brittle and unreliable -- stuff like the time it takes for animations to complete, or the time it takes to make an API call: You never know exactly how long that stuff will take, so the safest strategy is to make sure it’s done before you move on.

So when you see the following query, what is going on under the hood?

```javascript
const input = await container.find('input')
```

The `await` operator is waiting for a [JavaScript Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) to be fulfilled. In this case, the Promise will be fulfilled if an `<input />` can be found inside the container. `ui-test-utils` will make an initial attempt to locate the element. If the `<input />` is found right away, great: The test moves on to the next line.

However, if the `<input />` is not found, `ui-test-utils` waits for any DOM change for the duration of our default timeout of 2s. (This duration can be overridden by passing in a `timeout` option to the `find` method.) If a DOM change is detected, the test looks for the input again. If no DOM change occurs, however, the test will fail when it reaches the end of the timeout.

Because we’re using the Javascript keyword `await` in our test, we need to let the test runner know that this test is asynchronous, so we mark the test function with the keyword `async`. See the [Mocha documentation on asynchronous tests](https://mochajs.org/#using-async-await) for more details.

### Hooks and the test sandbox

Remember at nursery school when you’d sing that “clean up, clean up” song while you put your toys away? Well, that’s a big part of what hooks do. They’re handy functions built into [Mocha](https://mochajs.org/#hooks) that you can use to set up or clean up after your tests.

```javascript
beforeEach(async () => {
  // don’t forget your async/await here too!
  await doSomethingAsync()
})
```

> Not that you shouldn’t read this section carefully, but one of the advantages of using `ui-test-utils` is that **its built-in test sandbox will handle the majority of test cleanup for you**. As a result, you probably won’t need to use hooks very often.

When you use `ui-test-utils`, a global `beforeEach` and `afterEach` hook is automatically set up for you to help ensure that your tests clean up after themselves. If you use the `stub` and `spy` utilities provided by `ui-test-utils`, they will be reset automatically between tests (via [sinon’s sandbox](https://sinonjs.org/releases/latest/sandbox/)). The `ui-test-utils` sandbox also ensures that any DOM changes made during a test run are cleaned up automatically.

### Spies and stubs

A stub is a function with pre-programmed behavior. Stubs can be used to test DOM interactions with a UI component via the component’s callback props. For more information, see https://sinonjs.org/releases/latest/stubs.

A spy is a function that records arguments and returns values, etc. for any calls. Like stubs, spies can be used to test DOM interactions with a UI component via its callback props. For more information, see https://sinonjs.org/releases/latest/spies.

> Note that when you use stubs and spies in `ui-test-utils`, the built-in test sandbox will handle the clean-up for you. Yay!

### Mounting your component

To assert on a component, you must first get it mounted -- meaning rendered into the document.

```javascript
import { mount, find } from '@instructure/ui-test-utils'
import MyComponent from '../index'

it('should mount', async () => {
  await mount(<MyComponent buttonLabel="my button label" />)

  const button = await findWithLabel('my button label')
  expect(button).to.exist()
})
```

### Queries

To prove that something is happening in a component, you need to find stuff within that component, so you can see what’s going on in its rendered DOM. This is where queries come in: They allow you to dive into the component’s DOM and return results you can make assertions against.

> We recommend using `findWithLabel` and `findWithText` whenever possible. Basing your queries on text content (as opposed to an HTML element) will make them easier to debug and you shouldn’t have to update your tests when the component is refactored.

| Query         | Description                                                                                                     | Example                               |
| ------------- | --------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| find          | Finds a single element that matches a CSS selector                                                              | `await find("[role='menu']")`         |
| findAll       | Finds all elements that match a CSS selector                                                                    | `await findAll('button')`             |
| findWithText  | Finds an element that contains text content that matches the argument                                           | `await findWithText('Collection 2')`  |
| findWithTitle | Finds an element that has a title (element, for SVG, or attribute for other elements) that matches the argument | `await findWithTitle('Collection 2')` |
| findWithLabel | Finds an element that is labeled by text that matches the argument                                              | `await findWithLabel('Item1')`        |

#### Query Arguments

The query functions above accept three arguments: an HTML element, a CSS selector or text, and an options object.

If you pass in an HTML element, the query will search within (and including) that element for matches. By default, the query will search the entire HTML document.

#### Query Selectors

You can pass any built-in CSS selector to a query:

```javascript
const allSVGs = await subject.findAll('svg')
const visibleFrame = await subject.find('iframe:not([title="always-hidden"])')
```

> OK, any CSS selector EXCEPT one that includes `div` or `span`. Querying these elements will cause an error because they don’t have semantic value, and their use therefore falls under the category of an implementation detail.

In addition to valid native [CSS selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors), `ui-test-utils` uses the [Sizzle CSS selector engine](https://sizzlejs.com) to make the following custom selectors available for use in tests:

| Selector  | Description                                       | Example                       |
| --------- | ------------------------------------------------- | ----------------------------- |
| visible   | Filters queries to elements that are visible      | `await findAll(':visible')`   |
| tabbable  | Filters queries to elements that can be tabbed to | `await findAll(':tabbable')`  |
| focusable | Filters queries to elements that can be focused   | `await findAll(':focusable')` |
| clickable | Filters queries to elements that can be clicked   | `await findAll(':clickable')` |

#### Query Options

You can pass the following options to your query:

| Option             | Default          | Description                                                                                                   |
| ------------------ | ---------------- | ------------------------------------------------------------------------------------------------------------- |
| collapseWhitespace | `true`           | Whether newlines, tabs and multiple spaces should be collapsed into a single space before attempting to match |
| customMethods      |                  | custom methods to apply to the query results                                                                  |
| exact              | `true`           | Whether a text match can be a partial and non-case-sensitive or exact                                         |
| expectEmpty        | false            | Whether you expect any results or not                                                                         |
| ignore             | `'script,style'` | elements to ignore                                                                                            |
| timeout            | `1900`           | how long to wait/retry                                                                                        |
| trim               | `true`           | whether text should be trimmed of whitespace before attempting to match                                       |

#### Querying for an element that should not be there

The query option you will most frequently use will be `expectEmpty`. When you need to make a negative assertion, set `expectEmpty` to `true`, so that the query function knows that the desired result of the query is for nothing to be found. Otherwise, your test will time out and fail.

```javascript
const foo = await FooLocator.find({ expectEmpty: true })
```

As a general rule, it’s best to avoid negative assertions (asserting that something should not exist or happen): In UI code, things often happen asynchronously, and the element might appear or the behavior might happen after you’ve made your assertion -- meaning your test could pass when it really shouldn’t.

#### Query Results

The above query methods are applied to query results, so that it’s easy to run additional queries within them.

```javascript
const form = await find('form')

// call helper methods on the results of a find query
const formNode = form.node()

// query methods are attached to the results
// call them to query within the result’s DOM node
const inputs = await form.findAll('input')

// call helper methods on each result of a findAll query
const inputNodes = inputs.map((input) => input.node())
```

#### Helpers

In addition to the query methods, query results have the following helpers applied to them:

| Helper function                 | Description                                                                                        |
| ------------------------------- | -------------------------------------------------------------------------------------------------- |
| `ancestors([selector])`         | Returns all of the ancestor nodes that match [selector]                                            |
| `attribute([attribute])`        | Returns the attribute value of the node                                                            |
| `bounds([property])`            | Returns the value of the bounding rect property (e.g. 'left')                                      |
| `checked()`                     | Returns true if the node is checked                                                                |
| `classNames()`                  | Returns the class list of the node as an array                                                     |
| `clickable()`                   | Returns true if the element is visible and clickable (pointer events aren’t disabled)              |
| `contains([selector\|element])` | Returns true if the node contains an element that matches [selector] or if it contains [element]   |
| `containsFocus()`               | Returns true if the node contains or is the active element                                         |
| `debug()`                       | Logs the HTML markup of the result to the console                                                  |
| `descendants([selector])`       | Returns all of the descendant nodes that match [selector]                                          |
| `disabled()`                    | Returns true if the node is disabled                                                               |
| `empty()`                       | Returns true if the node has no children (including text nodes)                                    |
| `exists()`                      | Returns true if the node is rendered in the document                                               |
| `focusable()`                   | Returns true if the element is focusable                                                           |
| `focused()`                     | Returns true if the node is the active element (focused)                                           |
| `hasClass([className])`         | Returns true if the node has [className] in its class list                                         |
| `id()`                          | Returns the id of the node                                                                         |
| `label()`                       | Returns the accessible label of the element                                                        |
| `matches([selector])`           | Returns true if the node matches the [selector] string                                             |
| `node()`                        | Returns the DOM node found by the query                                                            |
| `parent()`                      | Returns the parent DOM node                                                                        |
| `readonly()`                    | Returns true if the node is readonly                                                               |
| `rect()`                        | Returns the bounding client rect of the node                                                       |
| `role()`                        | Returns the role of the node                                                                       |
| `selected()`                    | Returns true if the node is selected                                                               |
| `style([property])`             | Returns the computed style property of the node                                                    |
| `tabbable()`                    | Returns true if the element is focusable and has a non-negative tab index                          |
| `tagName()`                     | Returns the tagName of the node                                                                    |
| `text()`                        | Returns the text content of the node                                                               |
| `title()`                       | Returns the title (attribute or element, if SVG)                                                   |
| `toString()`                    | Returns the HTML markup of the result as a string                                                  |
| `typeIn([string])`              | Simulates typing [string] into the node (assumes that it is an input, textarea or contenteditable) |
| `value()`                       | Returns the value of the node                                                                      |
| `visible()`                     | Returns true if the element is visible on screen                                                   |

### Events

A DOM interaction, or event, is fired either due to real user interaction with a browser, or programmatically via a UI test.

Note that React uses [synthetic events](https://reactjs.org/docs/events.html). However, we recommend testing by firing and verifying native DOM events when possible (the fact that we're using React events is an implementation detail).

`ui-test-utils` provides access to all native [web events](https://developer.mozilla.org/en-US/docs/Web/Events) as helper methods on query results.

```javascript
const component = await ComponentLocator.find()
await component.mouseDown()
```

For keyboard events (`keyDown`, `keyPress`, `keyUp`), `ui-test-utils` uses the [keycodes library](https://github.com/timoxley/keycode) to make it easy to specify which key (as the first argument), using a string label.

```javascript
await component.keyDown('enter')
```

The second argument for keyboard events, and the first for all others, is an optional `Event` initialization object that is passed into the native `Event` constructor.

```javascript
await component.click({ button: 0, bubbles: false })
```

### Assertions

If you’ve ever accused Professor Plum of murder in the library with the lead pipe while playing Clue, you’ve made an assertion. The assertion is the grand conclusion of your test, where you state what you think will happen based on the results of your query.

`ui-test-utils` uses chai’s `expect()` assertion style (https://www.chaijs.com) to make assertions on components. In addition, the following custom assertions are available to make assertions on a query result:

- `expect(await find([selector]))`
- `.to.have.tagName([tagName])`
- `.to.have.id([id])`
- `.to.have.style([property], [value])`
- `.to.have.attribute([attribute], [value]).to.have.label([label])`
- `.to.have.title([title])`
- `.to.have.value([value])`
- `.to.exist()`
- `.to.have.className([className])`
- `.to.be.disabled()`
- `.to.be.readonly()`
- `.to.have.role([role])`
- `.to.be.selected()`
- `.to.be.checked()`
- `.to.match([selector])`
- `.to.be.focused()`
- `.to.have.focus()`
- `.to.be.focusable()`
- `.to.be.tabbable()`
- `.to.be.visible()`
- `.to.be.clickable()`
- `.to.have.text([text])`
- `.to.have.bounds([property], [value])`
- `.to.have.exactly([count]).descendants([selector])`
- `.to.have.exactly([count]).ancestors([selector])`
- `.to.contain([selector|element])`
- `.to.be.empty()`

### Testing for accessibility

Once you've mounted your component in the document you can run tools like [axe-core](https://www.deque.com/axe/) to verify that the rendered markup meets accessibility requirements. `ui-test-utils` provides a wrapper utility for running `axe-core`:

```javascript
import { accessible, mount, expect } from '@instructure/ui-test-utils'

it('should be accessible', async () => {
  await mount(<MyComponent />)
  expect(await accessible()).to.be.true()
})
```

### Testing responsive components

Testing the behavior of responsive components often requires changing the browser viewport size. `ui-test-utils` provides a utility to do just that:

```javascript
import { viewport, stub } from '@instructure/ui-test-utils'

it('should do something when the viewport size changes', async () => {
  const handleResize = stub()
  await mount(<MyComponent onResize={handleResize} />)

  // sets the viewport to 320px x 480px
  viewport.set(320, 480)

  expect(handleResize).to.have.been.calledOnce()
})
```

The test sandbox is configured to call `viewport.reset()` in between each test, so you don’t have to worry about resetting the viewport size.

### Locators: page object models for components

**A locator is a collection of query methods and CSS selectors that makes your tests easier to maintain.**

If you’re familiar with the concept of [Page Object Models](https://martinfowler.com/bliki/PageObject.html), it might be helpful to think of locators as POMs for UI components. Locators ideally live with their components, making it easy to keep them up-to-date when the component implementation is updated.

The only required argument in a locator is a _semantic_ (don’t use classes, divs, or spans) CSS selector:

```javascript
import { locator } from '@instructure/ui-test-utils'
export const fooLocator = locator('[data-foo]')
```

Import this basic locator into your tests file, and you can now use it as follows:

```javascript
const foo = await fooLocator.find()
```

`foo` will now give you the first matching element with a `data-foo` attribute.

> **When should you make a locator?**
>
> Make a locator for any component that has something inside it you need to repeatedly interact with in your tests. Locators should not be added for components that are presentational (grid or flex layout components, for example). Because these components are comprised of styled `<div>` or `<span>` elements with no semantic value, they (and their CSS classes) can be considered implementation details.

Locators are more than just selector shortcuts: They can take an object of custom methods (functions you can run on the results) as their second argument. Here’s a shortened example from Instructure UI’s `ToggleDetails` component:

```javascript
import { locator } from '@instructure/ui-test-utils'
import ToggleDetails from './index'

const ToggleLocator = locator('[aria-expanded][aria-controls]')

export const customMethods = {
  clickToggle: async (element, ...args) =>
    (await ToggleLocator.find(element)).click(...args)
}

export default locator(ToggleDetails.selector, customMethods)
```

This locator first defines the CSS selector it will use to find the element that does the toggling in `ToggleDetails`. Then it defines a custom method that test writers can use to click this element. The `ToggleDetails.selector` in the export is a `ui-test-utils` feature that will add a data attribute to the root element in the `ToggleDetails` component that the library uses as a hook when the test writer uses the locator:

```javascript
import ToggleDetailsLocator from '../locator'
const toggleDetails = await ToggleDetailsLocator.find()
```
