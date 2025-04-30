---
describes: View
---

### View: the visual basis of Instructure UI

View provides the base appearance for most of the components
in Instructure UI.

> **Because View provides access to so many visual styles, it
> can be easy to abuse.** Before you use View, ensure that the component
> you're trying to style doesn't already have access to the same props.
> For example, don't wrap a `<Button>` in a `<View>` just to add
> `margin` around the button: Instead, use the `margin` prop on the
> button itself.

```js
---
type: example
---
<View
  as="div"
  margin="small"
  padding="large"
  textAlign="center"
  background="primary"
>
  {lorem.sentence()}
</View>
```

### `background`

Change the background color using the `background` prop.

```js
---
type: example
---
<div>
  <View
    as="div"
    display="inline-block"
    maxWidth="10rem"
    margin="small"
    padding="small"
    background="transparent"
  >
    {lorem.sentence()}
  </View>
  <View
    as="div"
    display="inline-block"
    maxWidth="10rem"
    margin="small"
    padding="small"
    background="primary"
  >
    {lorem.sentence()}
  </View>
  <View
    as="div"
    display="inline-block"
    maxWidth="10rem"
    margin="small"
    padding="small"
    background="secondary"
  >
    {lorem.sentence()}
  </View>
  <View
    as="div"
    display="inline-block"
    maxWidth="10rem"
    margin="small"
    padding="small"
    background="primary-inverse"
  >
    {lorem.sentence()}
  </View>
  <View
    as="div"
    display="inline-block"
    maxWidth="10rem"
    margin="small"
    padding="small"
    background="brand"
  >
    {lorem.sentence()}
  </View>
  <View
    as="div"
    display="inline-block"
    maxWidth="10rem"
    margin="small"
    padding="small"
    background="alert"
  >
    {lorem.sentence()}
  </View>
  <View
    as="div"
    display="inline-block"
    maxWidth="10rem"
    margin="small"
    padding="small"
    background="success"
  >
    {lorem.sentence()}
  </View>
    <View
    as="div"
    display="inline-block"
    maxWidth="10rem"
    margin="small"
    padding="small"
    background="danger"
  >
    {lorem.sentence()}
  </View>
  <View
    as="div"
    display="inline-block"
    maxWidth="10rem"
    margin="small"
    padding="small"
    background="warning"
  >
    {lorem.sentence()}
  </View>
</div>
```

### `shadow`

Add a CSS box-shadow to the View using the `shadow` prop.

```js
---
type: example
---
<div>
  <View
    as="span"
    display="inline-block"
    maxWidth="10rem"
    margin="small"
    padding="large"
    background="primary"
    shadow="resting"
  >
    {lorem.sentence()}
  </View>
  <View
    as="span"
    display="inline-block"
    maxWidth="10rem"
    margin="small"
    padding="large"
    background="primary"
    shadow="above"
  >
    {lorem.sentence()}
  </View>
  <View
    as="span"
    display="inline-block"
    maxWidth="10rem"
    margin="small"
    padding="large"
    background="primary"
    shadow="topmost"
  >
    {lorem.sentence()}
  </View>
</div>
```

### `borderWidth`

Apply a border with the `borderWidth` prop. Utilize
[CSS shorthand style](https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties)
to apply different border styles to individual edges.

```js
---
type: example
---
<div>
  <View
    as="span"
    display="inline-block"
    maxWidth="10rem"
    margin="small"
    padding="small"
    background="primary"
    borderWidth="small"
  >
    {lorem.sentence()}
  </View>
  <View
    as="span"
    display="inline-block"
    maxWidth="10rem"
    margin="small"
    padding="small"
    background="primary"
    borderWidth="medium"
  >
    {lorem.sentence()}
  </View>
  <View
    as="span"
    display="inline-block"
    maxWidth="10rem"
    margin="small"
    padding="small"
    background="primary"
    borderWidth="large none"
  >
    {lorem.sentence()}
  </View>
  <View
    as="div"
    margin="small"
    padding="small"
    background="primary"
    borderWidth="none none small none"
  >
    {lorem.sentence()}
  </View>
</div>
```

### `borderColor`

Change the color of View's border for different contexts via the `borderColor` prop.

```js
---
type: example
---
<div>
  <View
    as="span"
    display="inline-block"
    margin="small"
    padding="small"
    background="primary"
    borderWidth="large"
  >
    primary
  </View>
  <View
    as="span"
    display="inline-block"
    margin="small"
    padding="small"
    background="primary"
    borderWidth="large"
    borderColor="info"
  >
    info
  </View>
  <View
    as="span"
    display="inline-block"
    margin="small"
    padding="small"
    background="primary"
    borderWidth="large"
    borderColor="warning"
  >
    warning
  </View>
  <View
    as="span"
    display="inline-block"
    margin="small"
    padding="small"
    background="primary"
    borderWidth="large"
    borderColor="danger"
  >
    danger
  </View>
  <View
    as="span"
    display="inline-block"
    margin="small"
    padding="small"
    background="primary"
    borderWidth="large"
    borderColor="alert"
  >
    alert
  </View>
  <View
    as="span"
    display="inline-block"
    margin="small"
    padding="small"
    background="primary"
    borderWidth="large"
    borderColor="success"
  >
    success
  </View>
  <View
    as="span"
    display="inline-block"
    margin="small"
    padding="small"
    background="primary"
    borderWidth="large"
    borderColor="brand"
  >
    brand
  </View>
</div>
```

### `borderRadius`

Adjust the border radius using the `borderRadius` prop. Utilize
[CSS shorthand style](https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties)
to apply different border radii to individual corners.

```js
---
type: example
---
<div>
  <View
    as="span"
    display="inline-block"
    maxWidth="10rem"
    margin="small"
    padding="medium"
    background="primary-inverse"
    borderRadius="medium"
    textAlign="center"
  >
    medium
  </View>
  <View
    as="span"
    display="inline-block"
    maxWidth="10rem"
    margin="small"
    padding="medium"
    background="primary-inverse"
    borderRadius="large large none none"
    textAlign="center"
  >
    large large none none
  </View>
  <View
    as="span"
    display="inline-block"
    maxWidth="10rem"
    margin="small"
    padding="medium"
    background="primary-inverse"
    borderRadius="none none large large"
    textAlign="center"
  >
    none none large large
  </View>
  <View
    display="inline-block"
    width="6rem"
    height="6rem"
    margin="small"
    padding="medium"
    background="primary-inverse"
    borderRadius="circle"
    textAlign="center"
  >
    circle
  </View>
  <View
    display="inline-block"
    width="10rem"
    margin="small"
    padding="medium"
    background="primary-inverse"
    borderRadius="pill"
    textAlign="center"
  >
    pill
  </View>
</div>
```

### `position`

`position` sets the CSS position rule for the component: `static`, `absolute`, `relative`,
`sticky`, or `fixed`.

```js
---
type: example
---
<View
  position="relative"
  as="div"
  height="200px"
  borderWidth="small"
>
  <View
    as="div"
    position="absolute"
    insetInlineEnd="100px"
    insetBlockStart="10px"
    insetBlockEnd="0"
    background="primary-inverse"
  >
    Positioned View inside a View with relative positioning.
  </View>
</View>
```

### Indicating that a View is focused

By default, if a `View` is rendered as a focusable element, a focus outline will display when it is focused for accessibility.

```javascript
---
type: example
---
<Flex gap="medium" direction="column">
  <View tabIndex="0" role="button" cursor="pointer">
    Tab here to see the focus outline
  </View>
  <View focusWithin>
    if the <code>focusWithin</code> prop is <code>true</code>, the View will display the focus ring if any of its descendants receives focus
    <div tabindex="0" role="button" style={{outline: 'none'}}>Tab here to see the focus outline</div>
  </View>
</Flex>
```

In some situations, you may want to manually control when the focus outline is displayed instead of leaving it up to the browser.
This can be done using the `withFocusOutline` prop. Set it to `true` to make View's focus outline display or `false` to hide it.
Be careful when overriding the display of the focus outline as it is essential for accessibility.

The focus outline adjusts to account for the shape of the View. For example, the following values can be set for `borderRadius`:
`circle`, `pill`, `small`, `medium`, and `large`. In each case, the border radius of the focus outline will automatically adjust
to match the border radius of the corresponding View. The color of the focus outline can be changed for different contexts via the `focusColor` property.

- ```javascript
  class FocusedExample extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        isFocused: true,
        inset: false,
        focusColor: undefined
      }
    }

    updateFocused = (event) => {
      this.setState({ isFocused: event.target.checked })
    }

    updateInset = (event) => {
      this.setState({ inset: event.target.checked })
    }

    updateFocusRingColor = (event, value) => {
      this.setState({ focusColor: value })
    }

    render() {
      return (
        <View as="div">
          <View
            as="div"
            background="primary"
            padding="small"
            margin="0 0 small"
            borderWidth="small"
          >
            <FormFieldGroup
              rowSpacing="small"
              description={
                <ScreenReaderContent>
                  View focus outline examples
                </ScreenReaderContent>
              }
            >
              <Flex gap="small" direction="row">
                <Flex gap="small" direction="column" width="15rem">
                  <Checkbox
                    label="withFocusOutline"
                    checked={this.state.isFocused}
                    onChange={this.updateFocused}
                  />
                  <Checkbox
                    label="focusPosition = inset"
                    checked={this.state.inset}
                    onChange={this.updateInset}
                  />
                </Flex>
                <RadioInputGroup
                  onChange={this.updateFocusRingColor}
                  name="focusColor"
                  defaultValue="info"
                  variant="toggle"
                  description="Focus ring color"
                >
                  <RadioInput label="info" value="info" />
                  <RadioInput label="inverse" value="inverse" />
                  <RadioInput label="success" value="success" />
                  <RadioInput label="danger" value="danger" />
                </RadioInputGroup>
              </Flex>
            </FormFieldGroup>
          </View>
          <View as="div">
            <code>borderRadius =</code>
            <View
              display="inline-block"
              margin="small"
              padding="small"
              background="primary"
              borderRadius="small"
              borderWidth="small"
              position="relative"
              focusColor={this.state.focusColor}
              withFocusOutline={this.state.isFocused}
              focusPosition={this.state.inset ? 'inset' : 'offset'}
            >
              small
            </View>
            <View
              display="inline-block"
              margin="small"
              padding="small"
              background="primary"
              borderRadius="medium"
              borderWidth="small"
              position="relative"
              focusColor={this.state.focusColor}
              withFocusOutline={this.state.isFocused}
              focusPosition={this.state.inset ? 'inset' : 'offset'}
            >
              medium
            </View>
            <View
              display="inline-block"
              margin="small"
              padding="small"
              background="primary"
              borderRadius="large"
              borderWidth="small"
              position="relative"
              focusColor={this.state.focusColor}
              withFocusOutline={this.state.isFocused}
              focusPosition={this.state.inset ? 'inset' : 'offset'}
            >
              large
            </View>
            <View
              display="inline-block"
              height="100px"
              width="100px"
              margin="small"
              background="primary"
              borderRadius="circle"
              borderWidth="small"
              position="relative"
              focusColor={this.state.focusColor}
              withFocusOutline={this.state.isFocused}
              focusPosition={this.state.inset ? 'inset' : 'offset'}
            >
              <Flex
                width="100%"
                height="100%"
                alignItems="center"
                justifyItems="center"
              >
                <Flex.Item>circle</Flex.Item>
              </Flex>
            </View>
            <View
              background="primary-inverse"
              display="inline-block"
              padding="small"
            >
              <View
                display="block"
                margin="small"
                padding="small"
                background="primary-inverse"
                borderRadius="large"
                borderWidth="small"
                position="relative"
                withFocusOutline={this.state.isFocused}
                focusColor={this.state.focusColor}
                focusPosition={this.state.inset ? 'inset' : 'offset'}
              >
                medium
              </View>
            </View>
            <View
              display="inline-block"
              margin="small"
              padding="small"
              background="primary"
              borderRadius="pill"
              borderWidth="small"
              position="relative"
              width="100px"
              textAlign="center"
              focusColor={this.state.focusColor}
              withFocusOutline={this.state.isFocused}
              focusPosition={this.state.inset ? 'inset' : 'offset'}
            >
              pill
            </View>
            <View
              display="inline-block"
              margin="small"
              padding="small"
              background="primary"
              borderWidth="small"
              borderRadius="none large"
              position="relative"
              focusColor={this.state.focusColor}
              withFocusOutline={this.state.isFocused}
              focusPosition={this.state.inset ? 'inset' : 'offset'}
            >
              none large
            </View>
          </View>
        </View>
      )
    }
  }
  render(<FocusedExample />)
  ```

- ```javascript
  const FocusedExample = () => {
    const [isFocused, setIsFocused] = useState(true)
    const [inset, setInset] = useState(false)
    const [focusColor, setfocusColor] = useState(undefined)

    const updateFocused = (event) => setIsFocused(event.target.checked)
    const updateInset = (event) => setInset(event.target.checked)
    const updateFocusRingColor = (event) => setfocusColor(event.target.value)

    return (
      <View as="div">
        <View
          as="div"
          background="primary"
          padding="small"
          margin="0 0 small"
          borderWidth="small"
        >
          <FormFieldGroup
            rowSpacing="small"
            description={
              <ScreenReaderContent>
                View focus outline examples
              </ScreenReaderContent>
            }
          >
            <Flex gap="small" direction="row">
              <Flex gap="small" direction="column" width="15rem">
                <Checkbox
                  label="withFocusOutline"
                  checked={isFocused}
                  onChange={updateFocused}
                />
                <Checkbox
                  label="focusPosition = inset"
                  checked={inset}
                  onChange={updateInset}
                />
              </Flex>
              <RadioInputGroup
                onChange={updateFocusRingColor}
                name="focusColor_2"
                defaultValue="info"
                variant="toggle"
                description="Focus ring color"
              >
                <RadioInput label="info" value="info" />
                <RadioInput label="inverse" value="inverse" />
                <RadioInput label="success" value="success" />
                <RadioInput label="danger" value="danger" />
              </RadioInputGroup>
            </Flex>
          </FormFieldGroup>
        </View>
        <View as="div">
          <code>borderRadius =</code>
          <View
            display="inline-block"
            margin="small"
            padding="small"
            background="primary"
            borderRadius="small"
            borderWidth="small"
            position="relative"
            focusColor={focusColor}
            withFocusOutline={isFocused}
            focusPosition={inset ? 'inset' : 'offset'}
          >
            small
          </View>
          <View
            display="inline-block"
            margin="small"
            padding="small"
            background="primary"
            borderRadius="medium"
            borderWidth="small"
            position="relative"
            withFocusOutline={isFocused}
            focusColor={focusColor}
            focusPosition={inset ? 'inset' : 'offset'}
          >
            medium
          </View>
          <View
            display="inline-block"
            margin="small"
            padding="small"
            background="primary"
            borderRadius="large"
            borderWidth="small"
            position="relative"
            withFocusOutline={isFocused}
            focusColor={focusColor}
            focusPosition={inset ? 'inset' : 'offset'}
          >
            large
          </View>
          <View
            display="inline-block"
            height="100px"
            width="100px"
            margin="small"
            background="primary"
            borderRadius="circle"
            borderWidth="small"
            position="relative"
            withFocusOutline={isFocused}
            focusColor={focusColor}
            focusPosition={inset ? 'inset' : 'offset'}
          >
            <Flex
              width="100%"
              height="100%"
              alignItems="center"
              justifyItems="center"
            >
              <Flex.Item>circle</Flex.Item>
            </Flex>
          </View>
          <View
            background="primary-inverse"
            display="inline-block"
            padding="small"
          >
            <View
              display="block"
              margin="small"
              padding="small"
              background="primary-inverse"
              borderRadius="large"
              borderWidth="small"
              position="relative"
              withFocusOutline={isFocused}
              focusColor={focusColor}
              focusColor="inverse"
              focusPosition={inset ? 'inset' : 'offset'}
            >
              medium
            </View>
          </View>
          <View
            display="inline-block"
            margin="small"
            padding="small"
            background="primary"
            borderRadius="pill"
            borderWidth="small"
            position="relative"
            focusColor="success"
            width="100px"
            textAlign="center"
            focusColor={focusColor}
            withFocusOutline={isFocused}
            focusPosition={inset ? 'inset' : 'offset'}
          >
            pill
          </View>
          <View
            display="inline-block"
            margin="small"
            padding="small"
            background="primary"
            borderWidth="small"
            borderRadius="none large"
            focusColor="danger"
            position="relative"
            focusColor={focusColor}
            withFocusOutline={isFocused}
            focusPosition={inset ? 'inset' : 'offset'}
          >
            none large
          </View>
        </View>
      </View>
    )
  }

  render(<FocusedExample />)
  ```

Handle vertical and horizontal content overflow with the `overflowX` and `overflowY`
props.

> **Important CSS note:** Setting one axis to `visible` and setting the other to a different value results in `visible` behaving as `auto`.

- ```javascript
  class OverflowExample extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        overflowY: 'visible',
        overflowX: 'visible'
      }
    }

    updateOverflowY = (event, value) => {
      this.setState({
        overflowY: value
      })
    }

    updateOverflowX = (event, value) => {
      this.setState({
        overflowX: value
      })
    }

    render() {
      return (
        <View as="div">
          <FormFieldGroup
            description={
              <ScreenReaderContent>Overflow example</ScreenReaderContent>
            }
            rowSpacing="small"
            vAlign="top"
            layout="columns"
          >
            <RadioInputGroup
              onChange={this.updateOverflowY}
              name="overflowY"
              defaultValue="visible"
              variant="toggle"
              description="overflowY ="
            >
              <RadioInput label="visible" value="visible" />
              <RadioInput label="auto" value="auto" />
              <RadioInput label="hidden" value="hidden" />
            </RadioInputGroup>
            <RadioInputGroup
              onChange={this.updateOverflowX}
              name="overflowX"
              defaultValue="visible"
              variant="toggle"
              description="overflowX ="
            >
              <RadioInput label="visible" value="visible" />
              <RadioInput label="auto" value="auto" />
              <RadioInput label="hidden" value="hidden" />
            </RadioInputGroup>
          </FormFieldGroup>
          <View
            as="div"
            height="7rem"
            width="20rem"
            margin="medium none x-large"
            overflowY={this.state.overflowY}
            overflowX={this.state.overflowX}
            withVisualDebug
          >
            <div style={{ width: '30rem', height: '10rem' }}>
              <Img src={avatarSquare} constrain="cover" />
            </div>
          </View>
        </View>
      )
    }
  }

  render(<OverflowExample />)
  ```

- ```javascript
  const OverflowExample = () => {
    const [overflowY, setOverflowY] = useState('visible')
    const [overflowX, setOverflowX] = useState('visible')

    const updateOverflowY = (event, value) => {
      setOverflowY(value)
    }

    const updateOverflowX = (event, value) => {
      setOverflowX(value)
    }

    return (
      <View as="div">
        <FormFieldGroup
          description={
            <ScreenReaderContent>Overflow example</ScreenReaderContent>
          }
          rowSpacing="small"
          vAlign="top"
          layout="columns"
        >
          <RadioInputGroup
            onChange={updateOverflowY}
            name="overflowY"
            defaultValue="visible"
            variant="toggle"
            description="overflowY ="
          >
            <RadioInput label="visible" value="visible" />
            <RadioInput label="auto" value="auto" />
            <RadioInput label="hidden" value="hidden" />
          </RadioInputGroup>
          <RadioInputGroup
            onChange={updateOverflowX}
            name="overflowX"
            defaultValue="visible"
            variant="toggle"
            description="overflowX ="
          >
            <RadioInput label="visible" value="visible" />
            <RadioInput label="auto" value="auto" />
            <RadioInput label="hidden" value="hidden" />
          </RadioInputGroup>
        </FormFieldGroup>
        <View
          as="div"
          height="7rem"
          width="20rem"
          margin="medium none x-large"
          overflowY={overflowY}
          overflowX={overflowX}
          withVisualDebug
        >
          <div style={{ width: '30rem', height: '10rem' }}>
            <Img src={avatarSquare} constrain="cover" />
          </div>
        </View>
      </View>
    )
  }

  render(<OverflowExample />)
  ```

### Debugging

Set the `withVisualDebug` prop to see the View's boundaries. Use this only for debugging.

> This effect uses a CSS box-shadow, so the `shadow` prop will be overridden

```js
---
type: example
---
<div>
  <View
    as="div"
    padding="large"
    withVisualDebug
  >
    {lorem.sentence()}
  </View>
  <View
    as="div"
    display="flex"
    withVisualDebug
  >
    <View
      as="div"
      margin="small"
      padding="small"
      withVisualDebug
    >
      {lorem.sentence()}
    </View>
    <View
      as="div"
      margin="small"
      padding="small"
      withVisualDebug
    >
      {lorem.sentence()}
    </View>
  </View>
</div>
```

### The `as` prop

Change the `as` prop to set what element the View should render as.
In the example below a `<section>` wraps a `<header>` and a paragraph of content.
The outermost `<section>` View provides padding for all the content, while
the header and paragraph are separated by bottom margin from the `<header>` View.

```js
---
type: example
---
<View
  as="section"
  padding="small"
  withVisualDebug
>
  <View
    as="header"
    margin="0 0 medium"
    withVisualDebug
  >
  Some header content
  </View>
  <Text as="p">{lorem.paragraph()}</Text>
</View>
```

### Inline Views

By default, View will render as a span which displays inline. When using the `as`
prop to render a block level element, setting `display` to `inline-block`, styles
the View to display inline-block with other inline elements.

```js
---
type: example
---
<View as="div" textAlign="center" padding="x-small" withVisualDebug>
  <View
    as="div"
    display="inline-block"
    withVisualDebug
    textAlign="end"
    margin="large auto"
    padding="0 small 0 0"
  >
    {lorem.sentence()}
  </View>
  <Button color="success">Some Action</Button>
</View>
```
