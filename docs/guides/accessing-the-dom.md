---
title: Accessing the DOM
category: Guides
order: 5
---

## Accessing the DOM

Accessing the DOM directly in React is discouraged, because it pierces the DOM abstraction. Still there are some cases when InstUI is required to do so (for example for focus management), it uses its [findDOMNode](#findDOMNode) utility method.
This method first tries to access a `ref` property on the component; if this does not exist, it will use React's deprecated [`findDOMNode` utility](https://reactjs.org/docs/react-dom.html#finddomnode). This will result in warnings about its usage on the console, to get rid of them please add a `ref` property that returns the underlying DOM node:

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

Example usage where it would generate an error without the `ref` property:

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
    return <span ref={this.myRef}>hello world</span>
  }
}

const Example = () => {
  return (
    <Popover
      renderTrigger={
        <MyComponent />
      }
      shouldRenderOffscreen
      shouldReturnFocus={false}
      placement="top center"
      mountNode={() => document.getElementById('main')}
    >
      <span>
        Hello World
      </span>
    </Popover>
  )
}

render(<Example />)
```

Bad usage that will result in InstUI calling `React.findDOMNode()`:

```js
---
example: true
---
<Popover
  renderTrigger={
    <span>
      Hover or focus me
    </span>
  }
  shouldRenderOffscreen
  shouldReturnFocus={false}
  placement="top center"
  mountNode={() => document.getElementById('main')}
  onPositioned={() => console.log('positioned')}
>
  <span>
    Hello World
  </span>
</Popover>
```

??? code
