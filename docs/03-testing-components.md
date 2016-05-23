### The TL;DR on writing tests:

1. Run `npm run test:watch`.
2. Edit the tests that were generated for you in `lib/components/MyComponent/__tests__`.
3. Watch your tests run in the console.

### The Details

Component tests are written using the [mocha](https://mochajs.org/) testing framework and [chai](http://chaijs.com/api/bdd/) bdd style assertions. A test bed utility that is provided as a global function `createTestbed` (defined in `tests/util/react-testbed.js`)
handles all of the common setup and teardown for your test. It also returns a test bed instance that provides some utilities for rendering components, updating props and stubbing out functions.

#### To set up the test bed:

```javascript
const testbed = createTestbed(<MyComponent prop="foo" />)
```

#### To render the component under test:

```javascript
const subject = testbed.render()
```

The render function returns the component under test wrapped in a [teaspoon](https://github.com/jquense/teaspoon) object
that you can use to query the DOM and/or the component tree rendered by your component. See the [teaspoon](https://github.com/jquense/teaspoon) and [chai](http://chaijs.com/api/bdd/) documentation for more details on how to write assertions.

#### To update the props after render:

```javascript
subject.props({
  someProp: 'someNewValue'
}, function () {
  // assert that something has changed after the props are updated here
})
```

#### To stub out a function:

```javascript
const onClick = testbed.sandbox.stub()

const subject = testbed.render({
  onClick
})

subject.find('input').trigger('click')

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

To generate a detailed coverage report run:

```bash
npm run coverage
```

