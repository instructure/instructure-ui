---
describes: Tray
---

The Tray is a dialog component that slides out from the top/bottom/left/right of
the viewport.

Note that the `size` property only applies when the Tray is positioned at `start`
or `end` and defines the width of the Tray.

```js
---
render: false
example: true
---
class Example extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false,
      size: 'small',
      placement: 'start'
    }
  }

  hideTray = () => {
    this.setState({
      open: false
    })
  }

  renderCloseButton () {
    return (
      <CloseButton
        placement="end"
        offset="x-small"
        variant="icon"
        onClick={this.hideTray}
      >
        Close
      </CloseButton>
    )
  }

  render () {
    const placementVariants = [
      {value: 'start', label: 'Left'},
      {value: 'top', label: 'Top'},
      {value: 'end', label: 'Right'},
      {value: 'bottom', label: 'Bottom'}
    ]

    const sizeVariants = [
      {value: 'x-small', label: 'Extra Small'},
      {value: 'small', label: 'Small'},
      {value: 'medium', label: 'Medium'},
      {value: 'large', label: 'Large'}
    ]

    return (
      <div>
        <Select
          onChange={(e, o) => { this.setState({ placement: o.value }) }}
          value={this.state.placement}
          label={<ScreenReaderContent>Tray Placement</ScreenReaderContent>}
          inline
        >
          {placementVariants.map((s) => <option value={s.value} key={s.value}>{s.label}</option>)}
        </Select>

        <Select
          onChange={(e, o) => { this.setState({ size: o.value }) }}
          value={this.state.size}
          label={<ScreenReaderContent>Tray Size</ScreenReaderContent>}
          inline
        >
          {sizeVariants.map((s) => <option value={s.value} key={s.value}>{s.label}</option>)}
        </Select>

        <Button
          onClick={() => { this.setState({ open: true }) }}
          ref={(c) => this._showButton = c}
        >
          Show the Tray
        </Button>

        <Tray
          label="Tray Example"
          open={this.state.open}
          onDismiss={() => { this.setState({ open: false }) }}
          size={this.state.size}
          placement={this.state.placement}
          applicationElement={() => document.getElementById('app') }
        >
          <Container as="div" padding="large medium">
            {this.renderCloseButton()}
            <Heading>Hello</Heading>
            <Text as="p" lineHeight="double">{lorem.paragraph()}</Text>
          </Container>
        </Tray>
      </div>
    )
  }
}

render(<Example />)
```
