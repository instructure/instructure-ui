### The TL;DR on writing tests:

1. Run `npm run test:watch`.
2. Edit the tests that were generated for you in `lib/components/MyComponent/__tests__`.
3. Watch your tests run in the console.

### The Details

Component tests are written using the [mocha](https://mochajs.org/) testing framework and [chai](http://chaijs.com/api/bdd/) bdd style assertions. A test bed utility that is provided as a global function `Testbed` (defined in `tests/util/testbed.js`)
handles all of the common setup and teardown for your test. It also provides some utilities for
rendering components, updating props and stubbing out functions.

#### To set up the test bed:

```javascript
const testbed = new Testbed(<MyComponent prop="foo" />)
```

#### To render the component under test:

```javascript
const subject = testbed.render()
```

The render function returns the component under test wrapped in a [enzyme](http://airbnb.io/enzyme/) object
that you can use to query the DOM and/or the component tree rendered by your component. See the [enzyme](http://airbnb.io/enzyme/) and [chai](http://chaijs.com/api/bdd/) documentation for more details on how to write assertions.

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

expect(onClick).to.have.been.called
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


### Code Coverage

Code coverage thresholds are configured in `karma.config.js`. If coverage numbers go below the configured values, the build
will fail.

When you run `npm test` a detailed coverage report is generated in `js-coverage/index.html`.

