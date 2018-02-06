---
describes: FocusRegion
---

The `FocusRegion` component is a utility that is used by
[Popover](#Popover), [Modal](#Modal) and [Tray](#Tray) for keyboard accessibility.

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
      <Container as="div" padding="large">
        <Button
          onClick={() => this.setState({ open: true })}
        >
          Open the FocusRegion
        </Button>
        <Portal open={this.state.open}>
          <Mask>
            <FocusRegion
              open={this.state.open}
              shouldContainFocus
              defaultFocusElement={() => this._firstName}
              shouldReturnFocus
              onDismiss={() => this.setState({ open: false })}
            >
              <ContextBox withArrow={false} padding="medium">
                <CloseButton placement="end" onClick={() => this.setState({ open: false })}>
                  Close
                </CloseButton>
                <FormFieldGroup description={<Heading level="h4" as="span">Full name</Heading>} layout="columns">
                  <TextInput width="12rem" label="First" inputRef={(c) => this._firstName = c} />
                  <TextInput width="12rem" label="Last" />
                </FormFieldGroup>
              </ContextBox>
            </FocusRegion>
          </Mask>
        </Portal>
      </Container>
    )
  }
}

render(<Example />)
```
