---
category: packages
---

## @instructure/ui-testbed

Creates a sandbox and provides utilities for testing UI code.

[![npm][npm]][npm-url]
[![build-status][build-status]][build-status-url]
[![MIT License][license-badge]][LICENSE]
[![Code of Conduct][coc-badge]][coc]


### Installation

```sh
yarn add --dev @instructure/ui-testbed
```

### Usage

Tests using the ui-testbed are written using the [mocha](https://mochajs.org/) testing framework and [chai](http://chaijs.com/api/bdd/) bdd style assertions.

The `Testbed` handles all of the common setup and teardown for your test.

It also provides some utilities for rendering components, updating props and stubbing out functions.

#### To set up the test bed:

```javascript
const testbed = new Testbed(<MyComponent prop="foo" />)
```

#### To render the component under test:

```javascript
const subject = testbed.render()
```

The render function returns the component under test wrapped in a
[enzyme](http://airbnb.io/enzyme/) object that you can use to query the DOM and/or the component tree rendered by your component. See the [enzyme](http://airbnb.io/enzyme/) and [chai](http://chaijs.com/api/bdd/) documentation for more details on how to write assertions.

#### To update the props after render:

```javascript
subject.setProps({
  someProp: 'someNewValue'
}, () => {
  // assert something after props have been updated
  done()
})
```

#### To stub out a function:

```javascript
const onClick = testbed.stub()

const subject = testbed.render({
  onClick
})

subject.find('input').simulate('click')

expect(onClick).to.have.been.called()
```

The testbed provides a reference to a [sinon sandbox](http://sinonjs.org/docs/#sandbox) that you can use to stub out functions for your tests. See the [sinon documentation](http://sinonjs.org/docs/) for more details.

#### To run a single test or a group of tests:

```javascript
it.only('should do something', function () {
...
})
```
or

```javascript
describe.only('with some context', function () {
...
})
```

### Testing the Accessibility of Components

```javascript
it('should be accessible', function (done) {
  const subject = testbed.render()

  subject.should.be.accessible(done)
})
```

A custom chai assertion is also provided that wraps the [axe-core](https://github.com/dequelabs/axe-core) library to test that your component meets the configured accessibility standards. Note that you have to provide a callback because this runs asynchronously. See the [mocha](https://mochajs.org/#asynchronous-code) and [axe-core](https://github.com/dequelabs/axe-core) documentation for more details.


[npm]: https://img.shields.io/npm/v/@instructure/ui-testbed.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-testbed

[build-status]: https://travis-ci.org/instructure/instructure-ui.svg?branch=master
[build-status-url]: https://travis-ci.org/instructure/instructure-ui "Travis CI"

[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE

[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
