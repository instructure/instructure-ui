---
title: Accessing the DOM
category: Guides
order: 5
---

## Accessing the DOM

Accessing the DOM directly in React is discouraged, because it pierces the DOM abstraction. Still there are some cases when InstUI is required to do so (for example for focus management or positioning), this happens with the [findDOMNode](#findDOMNode) utility function.
For custom React components this method first tries to access a `ref` property; if this does not exist, it will use React's deprecated [`findDOMNode` utility](https://reactjs.org/docs/react-dom.html#finddomnode). This will result in warnings about its usage on the console, to get rid of them please add a `ref` property that returns the underlying DOM node:

```javascript
class MyComponent extends React.Component {
  constructor(props) {
    super(props)
    this.ref = React.createRef()
  }
  render() {
    return <div ref={this.ref} />
  }
}
```

Example usage on how you should do it:

```js
---
render: false
example: true
---

class MyComponent extends React.Component {
  constructor(props) {
    super(props)
    this.ref = React.createRef()
  }
  render() {
    return (<div ref={this.ref}>Position target</div>)
  }
}

const Example = () => {
  return (
    <View as="div" padding={'large'}>
      <Position renderTarget={<MyComponent />}>
        <span>Some other text</span>
      </Position>
    </View>
  )
}

render(<Example />)
```

Bad usage that will result in InstUI calling `React.findDOMNode()` and warnings:

```js
---
render: false
example: true
---
class BadComponent extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (<div>not good, no ref()</div>)
  }
}

const Example = () => {
  return (
    <View as="div" padding={'large'}>
      <Position renderTarget={<BadComponent />}>
        <span>Some other text</span>
      </Position>
    </View>
  )
}

render(<Example />)
```
