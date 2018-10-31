---
describes: Tray
---

The Tray is an actionable container that is triggered by click and does not need to be connected to the element that triggered it. The Tray is on the same hierarchy as the Popover but contains more content. The Tray slides out from the top/bottom/start/end of the viewport.

>Note that the `size` property only applies when the Tray is positioned at `start` or `end` and defines the width of the Tray.

```js
---
render: false
example: true
---
const FPO = lorem.paragraph()
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
        placement={this.state.placement === 'end' ? 'start' : 'end'}
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
      {value: 'start', label: 'Start'},
      {value: 'top', label: 'Top'},
      {value: 'end', label: 'End'},
      {value: 'bottom', label: 'Bottom'}
    ]

    const sizeVariants = [
      {value: 'x-small', label: 'Extra Small'},
      {value: 'small', label: 'Small'},
      {value: 'medium', label: 'Medium'},
      {value: 'large', label: 'Large'}
    ]

    return (
      <div style={{ padding: '0 0 16rem 0', margin: '0 auto' }}>
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
        >
          <View as="div" padding="x-large large">
            {this.renderCloseButton()}
            <Heading>Hello</Heading>
            <Text as="p" lineHeight="double">{FPO}</Text>
          </View>
        </Tray>
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
    <FigureItem>Configure Tray to enter from the end on desktop, bottom on mobile/tablet</FigureItem>
    <FigureItem>Use when it is useful to still see information contained on the page or not lose context of the page that triggered the Tray</FigureItem>
    <FigureItem>Use 2 tabs max if using TabList in small size</FigureItem>
    <FigureItem>Use 5 tabs max if using TabList in medium/large size</FigureItem>
    <FigureItem>Prefer Tray to close when user clicks outside of the Tray</FigureItem>
  </Figure>
  <Figure recommendation="no" title="Don't">
    <FigureItem>Use TabList in the x-small size</FigureItem>
    <FigureItem>Use for Sub Nav or <Link href="/#DrawerLayout">Drawer Layout</Link></FigureItem>
    <FigureItem>Use with an <Link href="/#Overlay">Overlay</Link></FigureItem>
    <FigureItem>Use a Tray on top of a <Link href="/#Modal">Modal</Link></FigureItem>
    <FigureItem>Use for <Link href="#Alert">Alerts</Link> or Confirmation Dialogs</FigureItem>
    <FigureItem>Allow Tray to push the content of the page</FigureItem>
  </Figure>
</Guidelines>
```

```js
---
guidelines: true
---
<Guidelines>
  <Figure recommendation="a11y" title="Accessibility">
    <FigureItem>Keyboard focus must be set in the tray when it appears; usually on the first interactive element</FigureItem>
    <FigureItem>Trays must contain keyboard focus until they’re closed. This is to ensure that keyboard or screen reader users won't mistakenly interact with background content that is meant to be hidden or inaccessible</FigureItem>
    <FigureItem>When a user closes a tray, focus must return to a logical place within the page. This is usually the element that triggered opening the tray</FigureItem>
    <FigureItem>We recommend that trays begin with a heading (typically H2)</FigureItem>
  </Figure>
</Guidelines>
```
