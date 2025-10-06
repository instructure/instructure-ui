# Portal

@module Portal
The `<Portal/>` component allows you to render a subtree into a DOM element.

```js
---
type: example
---
class Example extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      isPortalOpen: false
    }
  }

  handleButtonClick = () => {
    this.setState(state => {
      return { isPortalOpen: !state.isPortalOpen }
    })
  };

  render () {
    const firstParagraph = lorem.paragraph()
    const secondParagraph = lorem.paragraph()
    return (
      <div>
        <Button onClick={this.handleButtonClick}>
          {this.state.isPortalOpen ? 'Close' : 'Open'} the Portal
        </Button>
        <Portal
          mountNode={this._mountNode}
          open={this.state.isPortalOpen}
        >
          <ContextView placement="center start" padding="0 x-small">
            <p>Greetings from the portal!</p>
          </ContextView>
        </Portal>
        <Text>
          <p>{firstParagraph}</p>
          <div ref={(c) => this._mountNode = c}></div>
          <p>{secondParagraph}</p>
        </Text>
      </div>
    )
  }
}

render(<Example />)
```


### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| Portal | open | `boolean` | No | `false` | Whether or not the `<Portal />` is open |
| Portal | onOpen | `(DOMNode: PortalNode) => void` | No | `() => {}` | Callback fired when `<Portal />` content has been mounted in the DOM. Ha the Portal DOMNode as parameter. |
| Portal | onClose | `() => void` | No | `() => {}` | Callback fired when `<Portal />` has been unmounted from the DOM |
| Portal | mountNode | `Element \| (() => Element \| null) \| null` | No | `null` | An element or a function returning an element to use as the mount node for the `<Portal />` (defaults to `document.body`) |
| Portal | insertAt | `'bottom' \| 'top'` | No | `'bottom'` | Insert the element at the 'top' of the mountNode or at the 'bottom' |
| Portal | children | `React.ReactNode` | No | `null` | The children to be rendered within the `<Portal />` |
| Portal | elementRef | `(el?: PortalNode) => void` | No | `() => {}` | Provides a reference to the underlying html element. Has the Portal DOMNode as parameter. |

### Usage

Install the package:

```shell
npm install @instructure/ui-portal
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { Portal } from '@instructure/ui-portal'
```

