# Overlay


The Overlay component is a closable/dismissible component that transitions
in and out content rendered in a [Portal](#Portal)

- ```js
  class Example extends React.Component {
    state = {
      open: false
    }

    _mask = null

    handleMaskRef = (el) => {
      this._mask = el
    }

    render() {
      return (
        <div>
          <Button
            onClick={() => {
              this.setState({ open: true })
            }}
          >
            Show the Overlay
          </Button>
          <Overlay
            open={this.state.open}
            transition="fade"
            label="Overlay Example"
            shouldReturnFocus
            shouldContainFocus
            onDismiss={() => {
              this.setState({ open: false })
            }}
            defaultFocusElement={() => this._mask}
          >
            <Mask
              onClick={() => {
                this.setState({ open: false })
              }}
              elementRef={this.handleMaskRef}
            >
              <Spinner
                renderTitle="Loading"
                size="large"
                margin="0 0 0 medium"
              />
            </Mask>
          </Overlay>
        </div>
      )
    }
  }

  render(<Example />)
  ```

- ```js
  const Example = () => {
    const [open, setOpen] = useState(false)
    const maskRef = useRef(null)

    return (
      <div>
        <Button
          onClick={() => {
            setOpen(true)
          }}
        >
          Show the Overlay
        </Button>
        <Overlay
          open={open}
          transition="fade"
          label="Overlay Example"
          shouldReturnFocus
          shouldContainFocus
          onDismiss={() => {
            setOpen(false)
          }}
          defaultFocusElement={() => maskRef.current}
        >
          <Mask
            onClick={() => {
              setOpen(false)
            }}
            elementRef={maskRef}
          >
            <Spinner renderTitle="Loading" size="large" margin="0 0 0 medium" />
          </Mask>
        </Overlay>
      </div>
    )
  }
  render(<Example />)
  ```

### Guidelines

```js
---
type: embed
---
<Guidelines>
  <Figure recommendation="a11y" title="Accessibility">
    <Figure.Item>Ensure content behind the overlay is hidden from users so they cannot navigate to it when using keyboard navigation and screen readers</Figure.Item>
    <Figure.Item>Dismissable with the ESC key</Figure.Item>
  </Figure>
</Guidelines>
```


### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| Overlay | children | `React.ReactNode` | No | - |  |
| Overlay | open | `bool` | No | `false` | Whether or not the `<Overlay />` is open |
| Overlay | onOpen | `(DOMNode: PortalNode) => void` | No | - | Callback fired when `<Portal />` content has been mounted in the DOM |
| Overlay | onClose | `() => void` | No | - | Callback fired when `<Portal />` has been unmounted from the DOM |
| Overlay | mountNode | `union` | No | - | An element or a function returning an element to use as the mount node for the `<Portal />` (defaults to `document.body`) |
| Overlay | insertAt | `'bottom' \| 'top'` | No | `'bottom'` | Insert the element at the 'top' of the mountNode or at the 'bottom' |
| Overlay | label | `string` | Yes | - | An accessible label for the `<Overlay />` content |
| Overlay | onDismiss | `( event: React.UIEvent \| React.FocusEvent, documentClick?: boolean ) => void` | No | - | Callback fired when the `<Overlay />` is requesting to be closed |
| Overlay | defaultFocusElement | `\| Node \| Window \| ReactElement \| Component \| (() => Node \| Window \| null \| undefined) \| null` | No | - | An element or a function returning an element to focus by default |
| Overlay | contentElement | `\| Node \| Window \| ReactElement \| Component \| (() => Node \| Window \| null \| undefined) \| null` | No | - | An element or a function returning an element that wraps the content of the `<Overlay />` |
| Overlay | shouldContainFocus | `bool` | No | `false` |  |
| Overlay | shouldReturnFocus | `bool` | No | `false` |  |
| Overlay | shouldCloseOnDocumentClick | `bool` | No | `false` |  |
| Overlay | shouldCloseOnEscape | `bool` | No | `true` |  |
| Overlay | transition | `custom` | No | - | The type of `<Transition />` to use for animating in/out |
| Overlay | in | `bool` | No | `false` | Show the component; triggers the enter or exit animation |
| Overlay | unmountOnExit | `bool` | No | `false` | Unmount the component (remove it from the DOM) when it is not shown |
| Overlay | transitionOnMount | `bool` | No | `false` | Run the enter animation when the component mounts, if it is initially shown |
| Overlay | transitionEnter | `bool` | No | `true` | Run the enter animation |
| Overlay | transitionExit | `bool` | No | `true` | Run the exit animation |
| Overlay | onEnter | `() => void` | No | - | Callback fired before the "entering" classes are applied |
| Overlay | onEntering | `() => void` | No | - | Callback fired after the "entering" classes are applied |
| Overlay | onEntered | `(type?: TransitionType) => void` | No | - | Callback fired after the "enter" classes are applied |
| Overlay | onExit | `() => void` | No | - | Callback fired before the "exiting" classes are applied |
| Overlay | onExiting | `() => void` | No | - | Callback fired after the "exiting" classes are applied |
| Overlay | onExited | `(type?: TransitionType) => void` | No | - | Callback fired after the "exited" classes are applied |

### Usage

Install the package:

```shell
npm install @instructure/ui-overlays
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { Overlay } from '@instructure/ui-overlays'

/*** ES Modules (without tree shaking) ***/
import { Overlay } from '@instructure/ui-overlays/es/Overlay/index'
```

