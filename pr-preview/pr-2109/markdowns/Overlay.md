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
| Overlay | children | `ReactReactNode` | No | - |  |
| Overlay | open | `boolean` | No | `false` | Whether or not the `<Overlay />` is open |
| Overlay | onOpen | `signature` | No | - | Callback fired when `<Portal />` content has been mounted in the DOM |
| Overlay | onClose | `signature` | No | - | Callback fired when `<Portal />` has been unmounted from the DOM |
| Overlay | mountNode | `PositionMountNode` | No | - | An element or a function returning an element to use as the mount node for the `<Portal />` (defaults to `document.body`) |
| Overlay | insertAt | `union` | No | `'bottom'` | Insert the element at the 'top' of the mountNode or at the 'bottom' |
| Overlay | label | `string` | Yes | - | An accessible label for the `<Overlay />` content |
| Overlay | onDismiss | `signature` | No | - | Callback fired when the `<Overlay />` is requesting to be closed |
| Overlay | defaultFocusElement | `union` | No | - | An element or a function returning an element to focus by default |
| Overlay | contentElement | `union` | No | - | An element or a function returning an element that wraps the content of the `<Overlay />` |
| Overlay | shouldContainFocus | `boolean` | No | `false` |  |
| Overlay | shouldReturnFocus | `boolean` | No | `false` |  |
| Overlay | shouldCloseOnDocumentClick | `boolean` | No | `false` |  |
| Overlay | shouldCloseOnEscape | `boolean` | No | `true` |  |
| Overlay | transition | `TransitionType` | No | - | The type of `<Transition />` to use for animating in/out |
| Overlay | in | `boolean` | No | `false` | Show the component; triggers the enter or exit animation |
| Overlay | unmountOnExit | `boolean` | No | `false` | Unmount the component (remove it from the DOM) when it is not shown |
| Overlay | transitionOnMount | `boolean` | No | `false` | Run the enter animation when the component mounts, if it is initially shown |
| Overlay | transitionEnter | `boolean` | No | `true` | Run the enter animation |
| Overlay | transitionExit | `boolean` | No | `true` | Run the exit animation |
| Overlay | onEnter | `signature` | No | - | Callback fired before the "entering" classes are applied |
| Overlay | onEntering | `signature` | No | - | Callback fired after the "entering" classes are applied |
| Overlay | onEntered | `signature` | No | - | Callback fired after the "enter" classes are applied |
| Overlay | onExit | `signature` | No | - | Callback fired before the "exiting" classes are applied |
| Overlay | onExiting | `signature` | No | - | Callback fired after the "exiting" classes are applied |
| Overlay | onExited | `signature` | No | - | Callback fired after the "exited" classes are applied |

### Usage

Install the package:

```shell
npm install @instructure/ui-overlays
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { Overlay } from '@instructure/ui-overlays'
```

