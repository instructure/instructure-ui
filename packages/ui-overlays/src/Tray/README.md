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
      <Flex>
        <Flex.Item grow shrink>
          <Heading>Hello</Heading>
        </Flex.Item>
        <Flex.Item>
          <Button
            variant="icon"
            icon={IconXLine}
            onClick={this.hideTray}
          >
            <ScreenReaderContent>Close</ScreenReaderContent>
          </Button>
        </Flex.Item>
      </Flex>
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
      {value: 'regular', label: 'Regular'},
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
          <View as="div" padding="medium">
            {this.renderCloseButton()}
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
    <Figure.Item>Configure Tray to enter from the end on desktop, bottom on mobile/tablet</Figure.Item>
    <Figure.Item>Use when it is useful to still see information contained on the page or not lose context of the page that triggered the Tray</Figure.Item>
    <Figure.Item>Use 2 tabs max if using TabList in small size</Figure.Item>
    <Figure.Item>Use 5 tabs max if using TabList in medium/large size</Figure.Item>
    <Figure.Item>Prefer Tray to close when user clicks outside of the Tray</Figure.Item>
    <Figure.Item>Keep the close 'x' directly following the Tray title, no matter what side the Tray slides from</Figure.Item>
  </Figure>
  <Figure recommendation="no" title="Don't">
    <Figure.Item>Use TabList in the x-small size</Figure.Item>
    <Figure.Item>Use for Sub Nav or <Link href="/#DrawerLayout">Drawer Layout</Link></Figure.Item>
    <Figure.Item>Use with an <Link href="/#Overlay">Overlay</Link></Figure.Item>
    <Figure.Item>Use a Tray on top of a <Link href="/#Modal">Modal</Link></Figure.Item>
    <Figure.Item>Use for <Link href="#Alert">Alerts</Link> or Confirmation Dialogs</Figure.Item>
    <Figure.Item>Allow Tray to push the content of the page</Figure.Item>
  </Figure>
</Guidelines>
```

```js
---
guidelines: true
---
<Guidelines>
  <Figure recommendation="a11y" title="Accessibility">
    <Figure.Item>Keyboard focus must be set in the tray when it appears; usually on the first interactive element</Figure.Item>
    <Figure.Item>Trays must contain keyboard focus until they’re closed. This is to ensure that keyboard or screen reader users won't mistakenly interact with background content that is meant to be hidden or inaccessible</Figure.Item>
    <Figure.Item>When a user closes a tray, focus must return to a logical place within the page. This is usually the element that triggered opening the tray</Figure.Item>
    <Figure.Item>We recommend that trays begin with a heading (typically H2)</Figure.Item>
  </Figure>
</Guidelines>
```
