---
describes: View
---

```js
---
guidelines: true
---
<Guidelines>
  <Figure title="Upgrade Notes for v8.0.0" recommendation="none">
    <Figure.Item>
      The <code>focused</code> boolean prop is deprecated. Use <code>withFocusOutline</code> instead.
    </Figure.Item>
    <Figure.Item>
      The <code>visualDebug</code> boolean prop is deprecated. Use <code>withVisualDebug</code> instead.
    </Figure.Item>
    <Figure.Item>
      The <code>background</code> values <code>default</code>, <code>inverse</code>, and <code>light</code> are deprecated. Use <code>primary</code>, <code>primary-inverse</code>, and <code>secondary</code>, respectively, instead.
    </Figure.Item>
    <Figure.Item>
      The <code>borderColor</code> values <code>default</code> and <code>inverse</code> are deprecated. Use <code>primary</code> and <code>transparent</code>, respectively, instead.
    </Figure.Item>
  </Figure>
</Guidelines>
```

### View &#151; the visual basis of Instructure UI

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
example: true
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
example: true
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
example: true
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
example: true
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
example: true
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
example: true
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

> Note that `position="sticky"` is currently [not as fully supported](https://caniuse.com/#feat=css-sticky)
> as the other values.

```js
---
example: true
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

> Note that `position` must be set to `relative` for the focus ring to display.
> (This restriction exists because the focus ring requires styling a pseudo element
> that has absolute positioning.)

```javascript
---
example: true
---
<View
  position="relative"
  tabIndex="0"
  role="button"
  cursor="pointer"
  display="block"
  margin="large"
  padding="small"
>
  Tab here to see the focus outline
</View>
```

In some situations, you may want to manually control when the focus outline is displayed instead of leaving it up to the browser.
This can be done using the `withFocusOutline` prop. Set it to `true` to make View's focus outline display or `false` to hide it.
Be careful when overriding the display of the focus outline as it is essential for accessibility.

The focus outline adjusts to account for the shape of the View. For example, the following values can be set for `borderRadius`:
`circle`, `pill`, `small`, `medium`, and `large`. In each case, the border radius of the focus outline will automatically adjust
to match the border radius of the corresponding View. For Views with irregular border radius (e.g., `borderRadius="small large none medium"`), the focus outline will appear with square edges. The color of the focus outline can be
changed for different contexts via the `focusColor` property.

```javascript
---
example: true
render: false
---
class FocusedExample extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      isFocused: true,
      inset: false
    }
  }

  updateFocused = (event) => {
    this.setState({isFocused: event.target.checked})
  }

  updateInset = (event) => {
    this.setState({inset: event.target.checked})
  }

  render () {
    const { isFocused, focusPosition } = this.state

    return (
      <View as="div">
        <View as="div" background="primary" padding="small" margin="0 0 small" borderWidth="small">
          <FormFieldGroup
            rowSpacing="small"
            description={<ScreenReaderContent>View focus outline examples</ScreenReaderContent>}
          >
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
            withFocusOutline={this.state.isFocused}
            focusPosition={this.state.inset ? 'inset' : 'offset'}
          >
            <Flex
              width="100%"
              height="100%"
              alignItems="center"
              justifyItems="center"
            >
              <FlexItem>
                circle
              </FlexItem>
            </Flex>
          </View>
          <View background="primary-inverse" display="inline-block" padding="small">
            <View
              display="block"
              margin="small"
              padding="small"
              background="primary-inverse"
              borderRadius="large"
              borderWidth="small"
              position="relative"
              withFocusOutline={this.state.isFocused}
              focusColor="inverse"
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
            focusColor="success"
            width="100px"
            textAlign="center"
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
            focusColor="danger"
            position="relative"
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

Handle vertical and horizontal content overflow with the `overflowX` and `overflowY`
props.

> **Important CSS note:** Setting one axis to `visible` and setting the other to a different value results in `visible` behaving as `auto`.

```javascript
---
example: true
render: false
---
class OverflowExample extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      overflowY: 'visible'
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

  render () {
    return (
      <View as="div">
        <FormFieldGroup
          description={<ScreenReaderContent>Overflow example</ScreenReaderContent>}
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
          <div style={{width: '30rem', height: '10rem'}}>
            <Img src={avatarSquare} constrain="cover" />
          </div>

        </View>
      </View>
    )
  }
}

render(<OverflowExample />)
```

### Debugging

Set the `withVisualDebug` prop to see the View's boundaries.

```js
---
example: true
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
example: true
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
example: true
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
