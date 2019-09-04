---
describes: DeprecatedPopover
id: DeprecatedPopover__README
---

**DEPRECATED:** Popover will be removed from `ui-overlays` in version 7.0.0. Use the [Popover from ui-popover](#Popover) instead.

### Important Upgrade Notes
Codemods are available to automatically update imports to the new package as well as any props that have changed. However, there are some breaking changes that will need to be addressed manually. These changes and other things to note are described below.
- `Popover.Trigger` and `Popover.Content` are no longer in use. The trigger is now defined via the `renderTrigger` prop and the `children` of a `Popover` will be rendered as the content.
- Some callbacks have changed. Instead of `onShow`, `onDismiss`, and `onToggle`, there is only `onRequestShowContent` and `onRequestHideContent`. When Popover is controlled, these callbacks will also be fired as prompts for updating the `isShowingContent` prop.
<br/><br/>

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
        <DeprecatedPopover
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
          <DeprecatedPopover.Trigger>
            <Button
              onClick={this.showPopover}
            >
              Sign In
            </Button>
          </DeprecatedPopover.Trigger>
          <DeprecatedPopover.Content>
            <View padding="medium" display="block" as="form">
              {this.renderCloseButton()}
              <FormFieldGroup description="Log In">
                <TextInput label="Username" inputRef={(el) => { if (el) { this._username = el } }}/>
                <TextInput label="Password" type="password" />
              </FormFieldGroup>
            </View>
          </DeprecatedPopover.Content>
        </DeprecatedPopover>
      </View>
    )
  }
}

render(<Example />)

```

>Note that `<DeprecatedPopover />` can act as a dialog with a close button. With the `shouldContainFocus` property set, it will trap focus inside the `<DeprecatedPopover />`.


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
        <DeprecatedPopover
          show
          placement="end top"
          alignArrow
          mountNode={() => document.getElementById('main')}
        >
          <DeprecatedPopover.Trigger>
            <div style={{display: 'inline-block', height: '3px', width: '3px', background: 'blue'}}/>
          </DeprecatedPopover.Trigger>
          <DeprecatedPopover.Content>
            <Heading>Small<br/>Target</Heading>
          </DeprecatedPopover.Content>
        </DeprecatedPopover>
      </div>
  )
}
}

render(<Example />)
```

If the `<DeprecatedPopover />` contains focusable content and should be rendered in the focus order
immediately after the trigger, it can be configured using the `shouldFocusContentOnTriggerBlur`
prop. Note that the `<DeprecatedPopover />` content must be rendered in the correct order in the document
(using the `mountNode` prop).
```js
---
render: false
example: true
---
class Example extends React.Component {
render () {
  return (
    <div style={{ paddingBottom: 25, display: 'flex', justifyContent: 'center' }}>
      <DeprecatedPopover
        on={['focus', 'click']}
        shouldContainFocus={false}
        shouldFocusContentOnTriggerBlur
        mountNode={() => document.getElementById('container')}
      >
        <DeprecatedPopover.Trigger>
          <Button margin="small">focus me</Button>
        </DeprecatedPopover.Trigger>
        <DeprecatedPopover.Content>
          <Button margin="small">focus me when trigger blurs</Button>
        </DeprecatedPopover.Content>
      </DeprecatedPopover>
      <div id="container"/>
      <Button id="next" margin="small">focus me next</Button>
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
    <Figure.Item>Consider using a <Link href="/#Tray">Tray</Link> if the content is beyond a mobile screen size</Figure.Item>
  </Figure>
  <Figure recommendation="no" title="Don't">
    <Figure.Item>Put content on the same row as the close "x"</Figure.Item>
    <Figure.Item>Use with an <Link href="#Overlay">Overlay</Link></Figure.Item>
    <Figure.Item>Have multiple Popovers open at the same time</Figure.Item>
    <Figure.Item>Use in place of a <Link href="/#Tooltip">Tooltip</Link> or <Link href="/#Menu">Menu</Link></Figure.Item>
  </Figure>
</Guidelines>
```


```js
---
guidelines: true
---
<Guidelines>
  <Figure recommendation="a11y" title="Accessibility">
    <Figure.Item>Keyboard focus must be set in the popover when it appears; usually on the first interactive element</Figure.Item>
    <Figure.Item>Popovers must contain keyboard focus until they’re closed. This is to ensure that keyboard or screen reader users won't mistakenly interact with background content that is meant to be hidden or inaccessible</Figure.Item>
    <Figure.Item>When a user closes the Popover, focus must return to a logical place within the page. This is usually the element that triggered opening the popover</Figure.Item>
    <Figure.Item>Popovers should be able to be closed by clicking away, esc key and/or a close button</Figure.Item>
  </Figure>
</Guidelines>
```
