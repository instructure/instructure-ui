---
title: Accessing the DOM
category: Guides
order: 3
---

## Accessing the DOM

Accessing the DOM directly in React is discouraged, because it pierces the DOM abstraction. Still there are some cases when InstUI is required to do so (for example for focus management or positioning). This happens with the [findDOMNode](#findDOMNode) utility function.

For custom React components this method first tries to access a `ref` property. If this does not exist, then:

- For React 19 or newer it will return `undefined` because `ReactDOM.findDOMNode()` was removed. This means that **custom components without the `ref` prop will not work in React 19 or newer!**
- For React 18 or older it will call `ReactDOM.findDOMNode()`

Places where the `ref` prop is needed for custom components (you can use any InstUI component, they have this prop already:

- [Tooltip](#Tooltip)'s children (if there is no `as` prop)
- [Popover](#Popover)'s `renderTrigger` prop
- [Menu](#Menu)'s `trigger` prop
- [AiInformation](#AiInformation)'s `trigger` prop
- [Position](#Position)'s child and `target` prop
- [Transition](#Transition)'s child
- [Dialog](#Dialog)'s `contentElement`prop
- ... and possibly others, please check your console for errors!

To fix the issue add a `ref` property to the component that returns the underlying DOM node:

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

Bad Usage Example without `ref`, that will result in InstUI calling `ReactDOM.findDOMNode()` and throw warnings. Also, this code will **NOT** work with React 19+:

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
