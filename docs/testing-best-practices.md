---
title: Testing
category: Getting Started
---

## Testing Best Practices

### Testing environment

1. Run `yarn test:watch --scope @instructure/ui-elements`.
1. Edit the tests that were generated for you in `packages/ui-elements/src/components/MyComponent/__tests__`.
1. Watch your tests run in the console.

Component tests should be written using the [ui-test-utils](#ui-test-utils) library, the [mocha](https://mochajs.org/)
testing framework and [chai](http://chaijs.com/api/bdd/) BDD style assertions.

### Testing philosophy

#### Unit tests

#### Component examples

TODO

#### Visual regression tests

TODO

### Writing a test case

```js
import { mount, expect } from '@instructure/ui-test-utils'

it('does what it is supposed to do', () => {
  await mount()
});
```

### Finding nodes

```js
import { mount, expect } from '@instructure/ui-test-utils'
// example component
```

Tests using [ui-test-utils](#ui-test-utils) would look like:

```js
import { mount, expect } from '@instructure/ui-test-utils'

// good
it('does what it is supposed to do', async () => {
})

// bad (searches by non-semantic tag name and CSS class)
it('does what it is supposed to do', async () => {

})
```

```js
import { mount, expect } from '@instructure/ui-test-utils'

it('does what it is supposed to do', async () => {
  const subject = await mount(<Component />)
  // await subject.find
})
```

```js
import { mount, expect } from '@instructure/ui-test-utils'

// good
it('does what it is supposed to do', async () => {
  const subject = await mount(<Component/>)
  // await subject.findAll
})

// bad (finds based on source order)
it('does what it is supposed to do', async () => {
  const subject = await mount(<Component />)

})
```

```js
import { mount, expect } from '@instructure/ui-test-utils'

it('does what it is supposed to do', async () => {
  const subject = await mount(<Component />)
  // await find
})
```

```js
it('does what it is supposed to do', async () => {
  const subject = await mount(<Component />)
  // await findInFrame
})
```

#### Query Options

TODO

tag,
text,
label,
value,
attribute (name, value)
title

customMethods

errorIfNotFound: true,

exact: true,
regexp: false,
trim: true,
collapseWhitespace: true,

visible: true,

timeout: 1900

### DOM assertions

```js
const subject = await mount(<Component />)

// assert that node exists (doesn't throw an Error)
expect(subject).to.exist()

// assert that node doesn't exist (throws an Error)
expect(subject).to.not.exist()

expect(subject.find('input')).to.not.exist()
```

TODO add getDOMNode/chai-dom examples

### Testing events

#### Testing events triggered by DOM


```js
it('properly fires `onChange` when input changes', async () => {
  import { mount, expect, stub } from '@instructure/ui-test-utils'

  it('does what it is supposed to do', async () => {
    const onChange = stub()

    // pass mock function to component as `onChange` prop
    await mount(<TextInput label="Name" onChange={onChange} />)
    const input = await TestInput.find({ label: 'Name' })

    const value = 'Here is a value'

    input.typeIn(value)

    // assert that the stubbed function was called with the
    // expected value
    expect(onChange).to.have.been.calledWith(value)
  })
})
```

#### Keyboard events

TODO

#### Custom events

TODO

### Testing state

TODO (don't do it)

### Testing updated props

```js
import { mount, expect } from '@instructure/ui-test-utils'

it('does NOT allow `defaultValue` to override existing <input> value', async () => {
  const subject = await mount(<TextInput defaultValue="foo" />)
  // update the TextInput's props
  subject.setProps({ defaultValue: 'bar' })

  // ensure that the <input> node's value hasn't changed
})
```

To test the `value` prop behavior:

```js
import { mount, expect } from '@instructure/ui-test-utils'

it('DOES allow `value` to override existing <input> value', async () => {
  const subject = await mount(<TextInput defaultValue="foo" />)
  // update the TextInput's props
  subject.setProps({defaultValue: 'bar'})


  // update the TextInput's props
  subject.setProps({value: 'bar'})

  // ensure that the <input> node's value has changed
})
```

### Testing context

TODO

### Testing accessibility

```javascript
import { mount, expect } from '@instructure/ui-test-utils'

it('should meet a11y standards', async (done) => {
  const subject = await mount(<Component />)
  expect(await subject.accessible()).to.be.true()
})
```

### Testing async components

TODO (setTimeout/RAF, cleanup on unmount, fakeTimers, wait, avoid arbitrary timeouts)

### Integration tests

TODO

### Test Isolation

TODO
