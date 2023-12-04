---
describes: Popover
---

Popovers hide or show content as a result of user interaction, such as clicking, hovering, or focusing. When opened, the content remains connected to the element that triggered it. If you only need to display a small amount of text-only content, you might consider using a [Tooltip](#Tooltip). If you need to display a larger amount of content, a [Tray](#Tray) could be a better choice.

#### Uncontrolled Popover

```js
---
type: example
---
class Example extends React.Component {
  state = {
    withArrow: true,
    shouldAlignArrow: true,
    color : "primary"
  }
  toggleWithArrow = (event) => this.setState({ withArrow: !this.state.withArrow })
  toggleAlignArrow = (event) => this.setState({ shouldAlignArrow: !this.state.shouldAlignArrow })
  changeColor = (event,color) =>  {this.setState({color})}
  render() {
    return (
      <>
        <FormFieldGroup description="Uncontrolled Popover Example">
          <Checkbox
            checked={this.state.withArrow}
            label="With Arrow"
            onChange={this.toggleWithArrow}
          />
          <Checkbox
            checked={this.state.shouldAlignArrow}
            label="Align Arrow"
            onChange={this.toggleAlignArrow}
          />
        </FormFieldGroup>
        <View display="block" margin="small none">
          <RadioInputGroup
            name="color"
            defaultValue="primary"
            description="Color:"
            variant="toggle"
            size="small"
            onChange={this.changeColor} >
            <RadioInput label="Primary" value="primary"/>
            <RadioInput label="Primary inverse" value="primary-inverse" />
          </RadioInputGroup>
        </View>
        <View display="block" as="div" margin="small">
          <Popover
            renderTrigger={
              <Link aria-describedby="tip">
                Hover or focus me
              </Link>
            }
            shouldRenderOffscreen
            shouldReturnFocus={false}
            withArrow={this.state.withArrow}
            shouldAlignArrow={this.state.shouldAlignArrow}
            color = {this.state.color}
            placement = "top end"
            mountNode={() => document.getElementById('main')}
            onPositioned={() => console.log('positioned')}
            onShowContent={() => console.log('showing')}
            onHideContent={() => console.log('hidden')}
          >
            <View padding="x-small" display="block" as="div" id="tip">
              Hello World
            </View>
          </Popover>
        </View>
      </>
    )
  }
}
render(<Example />)

```

#### Controlled Popover

```js
---
type: example
---
class Example extends React.Component {

  state = {
    isShowingContent: false
  }


  renderCloseButton () {
    return (
      <CloseButton
        placement="end"
        offset="small"
        onClick={() => this.setState({ isShowingContent: false })}
        screenReaderLabel="Close"
      />
    )
  }

  render () {
    return (
      <View>
        <Popover
          renderTrigger={<Button>Sign In</Button>}
          isShowingContent={this.state.isShowingContent}
          onShowContent={(e) => {
            this.setState({ isShowingContent: true })
          }}
          onHideContent={(e, { documentClick }) => {
            this.setState({ isShowingContent: false })
          }}
          on="click"
          screenReaderLabel="Popover Dialog Example"
          shouldContainFocus
          shouldReturnFocus
          shouldCloseOnDocumentClick
          offsetY="16px"
          mountNode={() => document.getElementById('main')}
        >
          <View padding="medium" display="block" as="form">
            {this.renderCloseButton()}
            <FormFieldGroup description="Log In">
              <TextInput renderLabel="Username" inputRef={(el) => { if (el) { this._username = el } }}/>
              <TextInput renderLabel="Password" type="password" />
            </FormFieldGroup>
          </View>
        </Popover>
      </View>
    )
  }
}

render(<Example />)

```

> Note: Popover can act as a dialog with a close button. With the `shouldContainFocus` property set, it will trap focus inside the Popover.

The `shouldAlignArrow` prop will offset the popover content to adjust for the offset of the arrow. This will override offsetX for start/end placements, and will override offsetY for top/bottom placements.

```js
---
type: example
---
class Example extends React.Component {
  state={
    shouldAlignArrow : true
  }
  toggleAlignArrow = (event) => this.setState({ shouldAlignArrow: !this.state.shouldAlignArrow })

  render () {
    return (
      <>
      <FormFieldGroup description="Align Arrow Example">
        <Checkbox
          checked={this.state.shouldAlignArrow}
          label="Align Arrow"
          onChange={this.toggleAlignArrow}
        />
      </FormFieldGroup>
      <div style={{ paddingBottom: 25, display: 'flex', justifyContent: 'center' }}>
        <Popover
          renderTrigger={<div style={{display: 'inline-block', height: '3px', width: '3px', background: 'blue'}}/>}
          isShowingContent={true}
          placement="end top"
          shouldAlignArrow={this.state.shouldAlignArrow}
          mountNode={() => document.getElementById('main')}
        >
          <Heading>Small<br/>Target</Heading>
        </Popover>
      </div>
      </>
    )
  }
}

render(<Example />)
```

If the `Popover` contains focusable content and should be rendered in the focus order immediately after the trigger, it can be configured using the `shouldFocusContentOnTriggerBlur` prop. Note that the content must be rendered in the correct order in the document (using the `mountNode` prop).

```js
---
type: example
---
class Example extends React.Component {

  state = {
    isShowingContent: false
  }

  render () {
    return (
      <div style={{ paddingBottom: 50, display: 'flex', justifyContent: 'center' }}>
        <Popover
          renderTrigger={<Button margin="small">Focus Me</Button>}
          isShowingContent={this.state.isShowingContent}
          onShowContent={(e) => {
            this.setState({ isShowingContent: true })
          }}
          onHideContent={(e) => {
            this.setState({ isShowingContent: false })
          }}
          on={['focus', 'click']}
          shouldContainFocus={false}
          shouldFocusContentOnTriggerBlur
          mountNode={() => document.getElementById('container')}
        >
          <Button margin="small">Focus Me When Trigger Blurs</Button>
        </Popover>
        <div id="container"/>
        <Button id="next" margin="small">Focus Me Next</Button>
      </div>
    )
  }
}

render(<Example />)
```

#### Custom elements as renderTrigger

Popover and Tooltip attach mouse and focus event listeners to their `renderTrigger` components via props. These need to be propagated to the component for the listeners to work:

```js
---
 type: example
---
class MyComponent extends React.Component {
  constructor(props) {
    super(props)
    this.ref = React.createRef()
  }
  render() {
    //  Spread the props to the underlying DOM element
    return <div {...this.props} ref={this.ref} style={{width:"10rem"}}>My custom component</div>
  }
}
<Popover renderTrigger={<MyComponent />} >
  This text is wrapped by a Popover
</Popover>
```

#### Popover playground

```js
---
type: example
---
class Example extends React.Component {

  state = {
    shouldAlignArrow: true,
    isShowingContent: true,
    withArrow: true,
    placement: 'top',
    shadow: 'topmost',
    color : 'primary'
  }
  static placementsValues = [
      'top',
      'end',
      'bottom',
      'start',
      'top start',
      'start top',
      'start center',
      'start bottom',
      'bottom start',
      'bottom center',
      'bottom end',
      'end bottom',
      'end center',
      'end top',
      'top end',
      'top center',
      'center end',
      'center start'
    ];
  static shadowValues = [
      'none',
      'resting',
      'above',
      'topmost'
    ];
  changePlacement = (e, { value }) => this.setState({ placement: value })
  changeShadow = (e, { value }) => this.setState({ shadow: value})
  toggleWithArrow = (event) => this.setState({ withArrow: !this.state.withArrow })
  toggleAlignArrow = (event) => this.setState({ shouldAlignArrow: !this.state.shouldAlignArrow })
  toggleShowContent = (event) => this.setState({ isShowingContent: !this.state.isShowingContent })
  changeColor = (event,value) =>  this.setState({color:value})
  render() {
    return (
      <View as="div" background="primary" padding="small">
        <Flex margin="small small large" justifyItems="space-around">
          <Flex.Item align="start">
            <FormFieldGroup description="Popover Example">
              <Checkbox
                checked={this.state.isShowingContent}
                label="Show Content"
                onChange={this.toggleShowContent}
              />
              <Checkbox
                checked={this.state.withArrow}
                label="With Arrow"
                onChange={this.toggleWithArrow}
              />
              <Checkbox
                checked={this.state.shouldAlignArrow}
                label="Align Arrow"
                onChange={this.toggleAlignArrow}
              />
            </FormFieldGroup>
          </Flex.Item>
          <Flex.Item>
            <View
            as="div"
            margin="none"
            maxWidth="15rem"
            >
              <SimpleSelect
                renderLabel="Placement"
                value={this.state.placement}
                onChange={this.changePlacement}
              >
                {Example.placementsValues.map((placement, index) => (
                  <SimpleSelect.Option
                    key={index}
                    id={`${index}`}
                    value={placement}
                  >
                    {placement}
                  </SimpleSelect.Option>
                ))}
              </SimpleSelect>
            </View>
            <View
              as="div"
              margin="medium none"
              maxWidth="15rem"
            >
              <SimpleSelect  value={this.state.shadow}
                onChange={this.changeShadow}
                renderLabel="Shadow"
              >
                {
                  Example.shadowValues.map((shadow, index) => (
                    <SimpleSelect.Option
                      key={index}
                      id={`${index}`}
                      value={shadow}
                    >
                      {shadow}
                    </SimpleSelect.Option>
                  ))
                }
              </SimpleSelect>
            </View>
          </Flex.Item>
          <Flex.Item align="start">
            <View as="div" margin="none">
              <RadioInputGroup
                name="changeColor"
                defaultValue="primary"
                description="Color:"
                variant="toggle"
                size="small"
                onChange={this.changeColor} >
                <RadioInput label="Primary" value="primary"/>
                <RadioInput label="Primary inverse" value="primary-inverse" />
              </RadioInputGroup>
            </View>
          </Flex.Item>
        </Flex>
        <View
          as="div"
          display="block"
          padding="large"
          textAlign="center">
          <Popover
            renderTrigger={<div style={{ display: 'inline-block', height: '3px', width: '3px', background: 'blue' }}/>}
            isShowingContent={this.state.isShowingContent}
            placement={this.state.placement}
            withArrow={this.state.withArrow}
            shouldAlignArrow={this.state.shouldAlignArrow}
            shadow={this.state.shadow}
            color={this.state.color}
            mountNode={() => document.getElementById('main')}
          >
            <Heading>Small<br />Target</Heading>
          </Popover>
        </View>
      </View>
    )
  }
}

render(<Example />)
```

### Guidelines

```js
---
type: embed
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
type: embed
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
