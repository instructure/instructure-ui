# Dialog

@module Dialog
The `Dialog` component is a utility that is used by
[Popover](#Popover), [Modal](#Modal) and [Tray](#Tray) for keyboard accessibility.

Elements outside of the `Dialog` are hidden from screen readers automatically when `shouldContainFocus` is set to `true` or `screenreader`. The `liveRegion` prop can be used to specify any elements that should not be hidden.

- ```js
  class Example extends React.Component {
    constructor(props) {
      super(props)
      this.state = { open: false }
    }

    render() {
      return (
        <View as="div" padding="large">
          <Button onClick={() => this.setState({ open: true })}>
            Open the Dialog
          </Button>
          <Portal open={this.state.open}>
            <Mask>
              <Dialog
                open={this.state.open}
                shouldContainFocus
                defaultFocusElement={() => this._firstName}
                shouldReturnFocus
                onDismiss={() => this.setState({ open: false })}
                label="Full name form"
              >
                <View
                  as="div"
                  maxWidth="40rem"
                  maxHeight="30rem"
                  background="primary"
                  shadow="above"
                  style={{ position: 'relative' }}
                  padding="medium"
                >
                  <CloseButton
                    placement="end"
                    onClick={() => this.setState({ open: false })}
                    screenReaderLabel="Close"
                  />
                  <FormFieldGroup
                    description={
                      <Heading level="h4" as="span">
                        Full name
                      </Heading>
                    }
                    layout="columns"
                  >
                    <TextInput
                      width="12rem"
                      renderLabel="First name"
                      inputRef={(c) => (this._firstName = c)}
                    />
                    <TextInput width="12rem" renderLabel="Last name" />
                  </FormFieldGroup>
                </View>
              </Dialog>
            </Mask>
          </Portal>
        </View>
      )
    }
  }

  render(<Example />)
  ```

- ```js
  const Example = () => {
    const [open, setOpen] = useState(false)

    return (
      <View as="div" padding="large">
        <Button onClick={() => setOpen(true)}>Open the Dialog</Button>
        <Portal open={open}>
          <Mask>
            <Dialog
              open={open}
              shouldContainFocus
              defaultFocusElement={() => this._firstName}
              shouldReturnFocus
              onDismiss={() => setOpen(false)}
              label="Full name form"
            >
              <View
                as="div"
                maxWidth="40rem"
                maxHeight="30rem"
                background="primary"
                shadow="above"
                style={{ position: 'relative' }}
                padding="medium"
              >
                <CloseButton
                  placement="end"
                  onClick={() => setOpen(false)}
                  screenReaderLabel="Close"
                />
                <FormFieldGroup
                  description={
                    <Heading level="h4" as="span">
                      Full name
                    </Heading>
                  }
                  layout="columns"
                >
                  <TextInput
                    width="12rem"
                    renderLabel="First name"
                    inputRef={(c) => (this._firstName = c)}
                  />
                  <TextInput width="12rem" renderLabel="Last name" />
                </FormFieldGroup>
              </View>
            </Dialog>
          </Mask>
        </Portal>
      </View>
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
    <Figure.Item>Keyboard focus must be set to a dialog when it appears; usually on the first interactive element within the dialog</Figure.Item>
    <Figure.Item>A modal dialog must contain keyboard focus until it closes, so that keyboard or screen reader users won't mistakenly interact with background content that is meant to be hidden or inaccessible</Figure.Item>
    <Figure.Item>A non-modal dialog must close when it loses focus</Figure.Item>
    <Figure.Item>When the user closes a dialog, focus must return to a logical place within the page. This is usually to the element that triggered the dialog</Figure.Item>
    <Figure.Item>When dialogs are triggered by buttons or links (buttons are recommended), accessibility can be further enhanced by applying aria-haspopup="dialog" to the trigger. This will notify screen reader users that the trigger opens a dialog</Figure.Item>
    <Figure.Item>We recommend that dialogs begin with a heading (typically an H2)</Figure.Item>
    <Figure.Item>Dialogs should be able to be closed by clicking away, esc key and/or a close button</Figure.Item>
    <Figure.Item>It is recommended to provide a label for the dialog because, when specified, it will automatically set role="dialog". Alternatively, you can set aria-labelledby on the dialog to reference the ID of the visible title and set role="dialog" manually.</Figure.Item>
  </Figure>
</Guidelines>
```


### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| Dialog | children | `React.ReactNode` | No | - | The children to be rendered within the `<Dialog />` |
| Dialog | as | `keyof JSX.IntrinsicElements \| ComponentType<P>` | No | - | The element to render as the component root, `span` by default |
| Dialog | display | `'auto' \| 'block' \| 'inline-block'` | No | - |  |
| Dialog | label | `string` | No | - | The aria-label to read for screen reader. When specified, it will automatically set role="dialog". |
| Dialog | open | `boolean` | No | `false` | Whether or not the `<Dialog />` is open |
| Dialog | onBlur | `` | No | - | Function called when tab focus leaves the focusable content. This only occurs when `shouldContainFocus` is set to false. |
| Dialog | onDismiss | `` | No | - | Function called when a focus region is dismissed. This can happen when the user presses the escape key and `shouldCloseOnEscape` is true or when an IFrame is clicked or when anything outside the focus region is clicked if `shouldCloseOnDocumentClick` is true. @param event The event triggered the dismissal @param documentClick Whether the dismissal was triggered by a mouse click. |
| Dialog | defaultFocusElement | `` | No | - | An element or a function returning an element to focus by default |
| Dialog | contentElement | `\| Node \| Window \| ReactElement \| Component \| (() => Node \| Window \| null \| undefined) \| null` | No | - | An element or a function returning an element that wraps the content of the `<Dialog />` |
| Dialog | liveRegion | `` | No | - | An element, function returning an element, or array of elements that will not be hidden from the screen reader when the focus region is active |
| Dialog | shouldContainFocus | `` | No | `false` | When set to true, or it is an array that includes the 'keyboard' string, the keyboard and screenreader focus is trapped; when set to 'screenreader' only the screenreader focus is trapped. |
| Dialog | shouldReturnFocus | `` | No | `false` | When set to true the keyboard focus is returned to the active element before the focus region was activated. |
| Dialog | shouldCloseOnDocumentClick | `` | No | `true` | When set to true the `onDismiss` function is called on a click outside the focus region. |
| Dialog | shouldCloseOnEscape | `` | No | `true` | When set to true the `onDismiss` function is called on the `Escape` keypress |
| Dialog | shouldFocusOnOpen | `` | No | `true` | When set to true, the `defaultFocusElement` is focused on initialization. |
| Dialog | elementRef | `` | No | - | provides a reference to the underlying html root element |
| Dialog | isTooltip | `` | No | - | Whether or not the element is a Tooltip |
| Dialog | regionId | `` | No | - | The ID of the `FocusRegion` this belongs to. Used only for debugging. |

### Usage

Install the package:

```shell
npm install @instructure/ui-dialog
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { Dialog } from '@instructure/ui-dialog'
```

