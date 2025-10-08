---
describes: Popover
---

Popovers hide or show content as a result of user interaction, such as clicking, hovering, or focusing. When opened, the content remains connected to the element that triggered it. If you only need to display a small amount of text-only content, you might consider using a [Tooltip](#Tooltip). If you need to display a larger amount of content, a [Tray](#Tray) could be a better choice.

#### Uncontrolled Popover

```js
---
type: example
---
const Example = () => {
  const [withArrow, setWithArrow] = useState(true)
  const [shouldAlignArrow, setShouldAlignArrow] = useState(true)
  const [color, setColor] = useState('primary')

  const toggleWithArrow = () => {
    setWithArrow((withArrow) => !withArrow)
  }

  const toggleAlignArrow = () => {
    setShouldAlignArrow((shouldAlignArrow) => !shouldAlignArrow)
  }

  const changeColor = (event, color) => {
    setColor(color)
  }

  return (
    <>
      <FormFieldGroup description="Uncontrolled Popover Example">
        <Checkbox
          checked={withArrow}
          label="With Arrow"
          onChange={toggleWithArrow}
        />
        <Checkbox
          checked={shouldAlignArrow}
          label="Align Arrow"
          onChange={toggleAlignArrow}
        />
      </FormFieldGroup>
      <View display="block" margin="small none">
        <RadioInputGroup
          name="color"
          defaultValue="primary"
          description="Color:"
          variant="toggle"
          size="small"
          onChange={changeColor}
        >
          <RadioInput label="Primary" value="primary" />
          <RadioInput label="Primary inverse" value="primary-inverse" />
        </RadioInputGroup>
      </View>
      <View display="block" as="div" margin="small">
        <Popover
          renderTrigger={
            <Link aria-describedby="tip">Hover or focus me</Link>
          }
          shouldRenderOffscreen
          shouldReturnFocus={false}
          withArrow={withArrow}
          shouldAlignArrow={shouldAlignArrow}
          color={color}
          placement="top end"
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
render(<Example />)
```

#### Controlled Popover

```js
---
type: example
---
const Example = () => {
  const [isShowingContent, setIsShowingContent] = useState(false)

  const usernameRef = useRef(null)

  const renderCloseButton = () => (
    <CloseButton
      placement="end"
      offset="small"
      onClick={() => setIsShowingContent(false)}
      screenReaderLabel="Close"
    />
  )

  return (
    <View>
      <Popover
        renderTrigger={<Button>Sign In</Button>}
        isShowingContent={isShowingContent}
        onShowContent={() => {
          setIsShowingContent(true)
        }}
        onHideContent={() => {
          setIsShowingContent(false)
        }}
        on="click"
        screenReaderLabel="Popover Dialog Example"
        shouldContainFocus
        shouldReturnFocus
        shouldCloseOnDocumentClick
        offsetY="16px"
      >
        <View padding="medium" display="block" as="form">
          {renderCloseButton()}
          <FormFieldGroup description="Log In">
            <TextInput renderLabel="Username" ref={usernameRef} />
            <TextInput renderLabel="Password" type="password" />
          </FormFieldGroup>
        </View>
      </Popover>
    </View>
  )
}

render(<Example />)
```

> Note: Popover can act as a dialog with a close button. With the `shouldContainFocus` property set, it will trap focus inside the Popover.

The `shouldAlignArrow` prop will offset the popover content to adjust for the offset of the arrow. This will override offsetX for start/end placements, and will override offsetY for top/bottom placements.

```js
---
type: example
---
const Example = () => {
  const [shouldAlignArrow, setShouldAlignArrow] = useState(true)

  const toggleAlignArrow = () => {
    setShouldAlignArrow((shouldAlignArrow) => !shouldAlignArrow)
  }

  return (
    <>
      <FormFieldGroup description="Align Arrow Example">
        <Checkbox
          checked={shouldAlignArrow}
          label="Align Arrow"
          onChange={toggleAlignArrow}
        />
      </FormFieldGroup>
      <div
        style={{
          paddingBottom: 25,
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Popover
          renderTrigger={
            <div
              style={{
                display: 'inline-block',
                height: '3px',
                width: '3px',
                background: 'blue'
              }}
            />
          }
          isShowingContent={true}
          placement="end top"
          shouldAlignArrow={shouldAlignArrow}
        >
          <Heading>
            Small
            <br />
            Target
          </Heading>
        </Popover>
      </div>
    </>
  )
}

render(<Example />)
```

If the `Popover` contains focusable content and should be rendered in the focus order immediately after the trigger, it can be configured using the `shouldFocusContentOnTriggerBlur` prop. Note that the content must be rendered in the correct order in the document (using the `mountNode` prop).

```js
---
type: example
---
const Example = () => {
  const [isShowingContent, setIsShowingContent] = useState(false)

  return (
    <div
      style={{ paddingBottom: 50, display: 'flex', justifyContent: 'center' }}
    >
      <Popover
        renderTrigger={<Button margin="small">Focus Me</Button>}
        isShowingContent={isShowingContent}
        onShowContent={() => {
          setIsShowingContent(true)
        }}
        onHideContent={() => {
          setIsShowingContent(false)
        }}
        on={['hover', 'focus']}
        shouldContainFocus={false}
        shouldFocusContentOnTriggerBlur={false}
      >
        <Button margin="small">Focus Me When Trigger Blurs</Button>
      </Popover>
      <div id="container" />
      <Button id="next" margin="small">
        Focus Me Next
      </Button>
    </div>
  )
}

render(<Example />)
```

#### Custom elements as renderTrigger

Popover and Tooltip attach mouse and focus event listeners to their `renderTrigger` components via props. These need to be propagated to the component for the listeners to work:

```js
---
type: example
---
const MyComponent = React.forwardRef((props, ref) => {
  return (
    <div {...props} ref={ref} style={{ width: '10rem' }}>
      My custom component
    </div>
  )
})

render(<MyComponent />)
;<Popover renderTrigger={<MyComponent />}>
  This text is wrapped by a Popover
</Popover>
```

#### Popover playground

```js
---
type: example
---
const placementsValues = [
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
]

const shadowValues = ['none', 'resting', 'above', 'topmost']

const Example = () => {
  const [shouldAlignArrow, setShouldAlignArrow] = useState(true)
  const [isShowingContent, setIsShowingContent] = useState(true)
  const [withArrow, setWithArrow] = useState(true)
  const [placement, setPlacement] = useState('top')
  const [shadow, setShadow] = useState('topmost')
  const [color, setColor] = useState('primary')

  const changePlacement = (e, { value }) => {
    setPlacement(value)
  }

  const changeShadow = (e, { value }) => {
    setShadow(value)
  }

  const toggleWithArrow = () => {
    setWithArrow((withArrow) => !withArrow)
  }

  const toggleAlignArrow = () => {
    setShouldAlignArrow((shouldAlignArrow) => !shouldAlignArrow)
  }

  const toggleShowContent = () =>
    setIsShowingContent((isShowingContent) => !isShowingContent)

  const changeColor = (event, value) => {
    setColor(value)
  }

  return (
    <View as="div" background="primary" padding="small">
      <Flex margin="small small large" justifyItems="space-around">
        <Flex.Item align="start">
          <FormFieldGroup description="Popover Example">
            <Checkbox
              checked={isShowingContent}
              label="Show Content"
              onChange={toggleShowContent}
            />
            <Checkbox
              checked={withArrow}
              label="With Arrow"
              onChange={toggleWithArrow}
            />
            <Checkbox
              checked={shouldAlignArrow}
              label="Align Arrow"
              onChange={toggleAlignArrow}
            />
          </FormFieldGroup>
        </Flex.Item>
        <Flex.Item>
          <View as="div" margin="none" maxWidth="15rem">
            <SimpleSelect
              renderLabel="Placement"
              value={placement}
              onChange={changePlacement}
            >
              {placementsValues.map((placement, index) => (
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
          <View as="div" margin="medium none" maxWidth="15rem">
            <SimpleSelect
              value={shadow}
              onChange={changeShadow}
              renderLabel="Shadow"
            >
              {shadowValues.map((shadow, index) => (
                <SimpleSelect.Option
                  key={index}
                  id={`${index}`}
                  value={shadow}
                >
                  {shadow}
                </SimpleSelect.Option>
              ))}
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
              onChange={changeColor}
            >
              <RadioInput label="Primary" value="primary" />
              <RadioInput label="Primary inverse" value="primary-inverse" />
            </RadioInputGroup>
          </View>
        </Flex.Item>
      </Flex>
      <View as="div" display="block" padding="large" textAlign="center">
        <Popover
          renderTrigger={
            <div
              style={{
                display: 'inline-block',
                height: '3px',
                width: '3px',
                background: 'blue'
              }}
            />
          }
          isShowingContent={isShowingContent}
          placement={placement}
          withArrow={withArrow}
          shouldAlignArrow={shouldAlignArrow}
          shadow={shadow}
          color={color}
        >
          <Heading>
            Small
            <br />
            Target
          </Heading>
        </Popover>
      </View>
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
