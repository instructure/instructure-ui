---
describes: Popover
---
Popovers are actionable containers that are triggered by click. When opened, it remains connected with element that triggered it. Popovers are on the same hierarchy as the [Tray](#Tray) but contains less content.

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

>Note that `<Popover />` can act as a dialog with a close button. With the `shouldContainFocus` property set, it will trap focus inside the `<Popover />`.


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

### Guidelines

```js
---
guidelines: true
---
<Guidelines>
  <Figure recommendation="yes" title="Do">
    <FigureItem>Consider using a <Link href="/#Tray">Tray</Link> if the content is beyond a mobile screen size</FigureItem>
  </Figure>
  <Figure recommendation="no" title="Don't">
    <FigureItem>Put content on the same row as the close "x"</FigureItem>
    <FigureItem>Use with an <Link href="#Overlay">Overlay</Link></FigureItem>
    <FigureItem>Have multiple Popovers open at the same time</FigureItem>
    <FigureItem>Use in place of a <Link href="/#Tooltip">Tooltip</Link> or <Link href="/#Menu">Menu</Link></FigureItem>
  </Figure>
</Guidelines>
```
