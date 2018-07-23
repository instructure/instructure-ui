---
describes: Popover
---
Popover is  a [ContextView](#ContextView) that overlays (appears above) the rest of the content on the page. The Popover would usually show/hide  on click/touch or hover/focus of a trigger element and the component arrow would point to the trigger element.
- Popovers can have close buttons and behave like a modal dialog by trapping focus within the ContextView. (Generally this would be the only case for using Popover directly vs using Tooltip, Menu, or Select). (Also note that quite often a Modal or Tray would be a better UX for a responsive UI vs a Popover that behaves like a modal dialog).
- OR Popovers can display interactive content that can be focused and navigated to in the document order (following the trigger element). This is a type of Tooltip behavior.
- OR Popovers can display non-interactive content that supplements the trigger element content. This is a type of Tooltip behavior.
- OR Popovers can have custom focus handling to behave like a form element or navigation menu. See [Select](#Select) and [Menu](#Menu).

Note that `<Popover />` can act as a dialog with a close button. With the `shouldContainFocus` property
set, it will trap focus inside the `<Popover />`.

```js
---
render: false
example: true
---
class Example extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      showPopover: false
    }
  }

  showPopover = () => {
    this.setState({
      showPopover: true
    })
  }

  hidePopover = () => {
    this.setState({
      showPopover: false
    })
  }

  renderCloseButton () {
    return (
      <CloseButton
        placement="end"
        offset="x-small"
        variant="icon"
        onClick={this.hidePopover}
      >
        Close
      </CloseButton>
    )
  }

  render () {
    return (
      <View padding="large 0">
        <Popover
          on="click"
          show={this.state.showPopover}
          onDismiss={this.hidePopover}
          shouldContainFocus
          shouldReturnFocus
          shouldCloseOnDocumentClick
          label="Popover Dialog Example"
          offsetY="16px"
          mountNode={() => document.getElementById('main')}
        >
          <PopoverTrigger>
            <Button
              onClick={this.showPopover}
            >
              Sign In
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <View padding="medium" display="block" as="form">
              {this.renderCloseButton()}
              <FormFieldGroup description="Log In">
                <TextInput label="Username" inputRef={(el) => { if (el) { this._username = el } }}/>
                <TextInput label="Password" type="password" />
              </FormFieldGroup>
            </View>
          </PopoverContent>
        </Popover>
      </View>
    )
  }
}

render(<Example />)

```
The `alignArrow` prop will offset the popover content to adjust for the offset of the arrow.
This will override offsetX for start/end placements, and will override offsetY for top/bottom placements.
```js
---
render: false
example: true
---
class Example extends React.Component {
render () {
  return (
      <div style={{ paddingBottom: 25, display: 'flex', justifyContent: 'center' }}>
        <Popover
          show
          placement="end top"
          alignArrow
          mountNode={() => document.getElementById('main')}
        >
          <PopoverTrigger>
            <div style={{display: 'inline-block', height: '3px', width: '3px', background: 'blue'}}/>
          </PopoverTrigger>
          <PopoverContent>
            <Heading>Small<br/>Target</Heading>
          </PopoverContent>
        </Popover>
      </div>
  )
}
}

render(<Example />)
```
