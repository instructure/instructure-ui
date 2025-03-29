---
title: Accessing the DOM
category: Guides
order: 5
---

## Accessing the DOM

Accessing the DOM directly in React is discouraged, because it pierces the DOM abstraction. Still there are some cases when InstUI is required to do so (for example for focus management or positioning). This happens with the [findDOMNode](#findDOMNode) utility function.

For custom React components this method first tries to access a `ref` property. If this does not exist, it will use React's deprecated [`findDOMNode` utility](https://reactjs.org/docs/react-dom.html#finddomnode) as a fallback. This will result in warnings about its usage on the console. (Read more about this [here](https://en.reactjs.org/docs/strict-mode.html#warning-about-deprecated-finddomnode-usage).)

To get rid of this warning, please add a `ref` property to the component that returns the underlying DOM node:

```javascript
---
type: code
---
class MyComponent extends React.Component {
  constructor(props) {
    super(props)
    this.ref = React.createRef()
  }
  render() {
    return <div ref={this.ref}>Content</div>
  }
}

```

```javascript
---
type: code
---
const MyComponent = React.forwardRef((props, ref) => {
  return <div ref={ref}>Content</div>
})
```

Good Usage Example with `ref`:

- ```js
  class GoodComponent extends React.Component {
    constructor(props) {
      super(props)
      this.ref = React.createRef()
    }
    render() {
      return <span ref={this.ref}>Good Position target component</span>
    }
  }
  const Example = () => {
    return (
      <View as="div" padding={'large'}>
        <Position
          renderTarget={<GoodComponent />}
          placement="end center"
          offsetX="20px"
        >
          <span style={{ padding: '8px', background: 'white' }}>
            Positioned content
          </span>
        </Position>
      </View>
    )
  }
  render(<Example />)
  ```

- ```js
  const GoodComponent = React.forwardRef((props, ref) => {
    return <span ref={ref}>Good Position target component</span>
  })

  const Example = () => {
    return (
      <View as="div" padding={'large'}>
        <Position
          renderTarget={<GoodComponent />}
          placement="end center"
          offsetX="20px"
        >
          <span style={{ padding: '8px', background: 'white' }}>
            Positioned content
          </span>
        </Position>
      </View>
    )
  }
  render(<Example />)
  ```

Bad Usage Example without `ref`, that will result in InstUI calling `ReactDOM.findDOMNode()` and throw warnings:

- ```js
  class BadComponent extends React.Component {
    constructor(props) {
      super(props)
    }
    render() {
      return <span>Bad Position target component</span>
    }
  }

  const Example = () => {
    return (
      <View as="div" padding={'large'}>
        <Position
          renderTarget={<BadComponent />}
          placement="end center"
          offsetX="20px"
        >
          <span style={{ padding: '8px', background: 'white' }}>
            Positioned content
          </span>
        </Position>
      </View>
    )
  }
  render(<Example />)
  ```

- ```js
  const BadComponent = React.forwardRef((props, ref) => {
    return <span>Bad Position target component</span>
  })

  const Example = () => {
    return (
      <View as="div" padding={'large'}>
        <Position
          renderTarget={<BadComponent />}
          placement="end center"
          offsetX="20px"
        >
          <span style={{ padding: '8px', background: 'white' }}>
            Positioned content
          </span>
        </Position>
      </View>
    )
  }
  render(<Example />)
  ```
