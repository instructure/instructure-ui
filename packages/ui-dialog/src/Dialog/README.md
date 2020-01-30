---
describes: Dialog
---

The `Dialog` component is a utility that is used by
[Popover](#Popover), [Modal](#Modal) and [Tray](#Tray) for keyboard accessibility.

Elements outside of the `Dialog` are hidden from screen readers automatically when `shouldContainFocus` is set to `true` or `screenreader`. The `liveRegion` prop can be used to specify any elements that should not be hidden.

```js
---
example: true
render: false
---
class Example extends React.Component {
  constructor (props) {
    super(props)
    this.state = { open: false }
  }

  render () {
    return (
      <View
        as="div"
        padding="large"
      >
        <Button
          onClick={() => this.setState({ open: true })}
        >
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
            >
              <View
                as="div"
                maxWidth="40rem"
                maxHeight="30rem"
                background="primary"
                shadow="above"
                style={{position: 'relative'}}
                padding="medium"
              >
                <CloseButton
                  placement="end"
                  onClick={() => this.setState({ open: false })}
                  screenReaderLabel="Close"
                />
                <FormFieldGroup
                  description={<Heading level="h4" as="span">Full name</Heading>}
                  layout="columns"
                >
                  <TextInput width="12rem" renderLabel="First" inputRef={(c) => this._firstName = c} />
                  <TextInput width="12rem" renderLabel="Last" />
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

### Guidelines

```js
---
guidelines: true
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
  </Figure>
</Guidelines>
```
