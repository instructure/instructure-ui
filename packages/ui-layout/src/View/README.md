---
describes: DeprecatedView
id: DeprecatedView__README
---

**DEPRECATED:** View will be removed from `ui-layout` in version 7.0.0. Use the [View](#View) from [ui-view](#ui-view) instead. Codemods are available to automatically update imports to the new package.
***

### View &#151; the visual basis of Instructure UI

View provides the base appearance for most of the components
in Instructure UI.

> **Because View provides access to so many visual styles, it
can be easy to abuse.** Before you use View, ensure that the component
you're trying to style doesn't already have access to the same props.
For example, don't wrap a `<Button>` in a `<View>` just to add
`margin` around the button: Instead, use the `margin` prop on the
button itself.


```js
---
example: true
---
<DeprecatedView
  as="div"
  margin="small"
  padding="large"
  textAlign="center"
  background="default"
>
  {lorem.sentence()}
</DeprecatedView>
```

### `background`

Change the background color using the `background` prop.

```js
---
example: true
---
<div>
  <DeprecatedView
    as="div"
    display="inline-block"
    maxWidth="10rem"
    margin="small"
    padding="small"
    background="transparent"
  >
    {lorem.sentence()}
  </DeprecatedView>
  <DeprecatedView
    as="div"
    display="inline-block"
    maxWidth="10rem"
    margin="small"
    padding="small"
    background="default"
  >
    {lorem.sentence()}
  </DeprecatedView>
  <DeprecatedView
    as="div"
    display="inline-block"
    maxWidth="10rem"
    margin="small"
    padding="small"
    background="light"
  >
    {lorem.sentence()}
  </DeprecatedView>
  <DeprecatedView
    as="div"
    display="inline-block"
    maxWidth="10rem"
    margin="small"
    padding="small"
    background="inverse"
  >
    {lorem.sentence()}
  </DeprecatedView>
  <DeprecatedView
    as="div"
    display="inline-block"
    maxWidth="10rem"
    margin="small"
    padding="small"
    background="brand"
  >
    {lorem.sentence()}
  </DeprecatedView>
  <DeprecatedView
    as="div"
    display="inline-block"
    maxWidth="10rem"
    margin="small"
    padding="small"
    background="alert"
  >
    {lorem.sentence()}
  </DeprecatedView>
  <DeprecatedView
    as="div"
    display="inline-block"
    maxWidth="10rem"
    margin="small"
    padding="small"
    background="info"
  >
    {lorem.sentence()}
  </DeprecatedView>
  <DeprecatedView
    as="div"
    display="inline-block"
    maxWidth="10rem"
    margin="small"
    padding="small"
    background="success"
  >
    {lorem.sentence()}
  </DeprecatedView>
    <DeprecatedView
    as="div"
    display="inline-block"
    maxWidth="10rem"
    margin="small"
    padding="small"
    background="danger"
  >
    {lorem.sentence()}
  </DeprecatedView>
  <DeprecatedView
    as="div"
    display="inline-block"
    maxWidth="10rem"
    margin="small"
    padding="small"
    background="warning"
  >
    {lorem.sentence()}
  </DeprecatedView>
</div>
```

### `shadow`

Add a CSS box-shadow to the View using the `shadow` prop.

```js
---
example: true
---
<div>
  <DeprecatedView
    as="span"
    display="inline-block"
    maxWidth="10rem"
    margin="small"
    padding="large"
    background="default"
    shadow="resting"
  >
    {lorem.sentence()}
  </DeprecatedView>
  <DeprecatedView
    as="span"
    display="inline-block"
    maxWidth="10rem"
    margin="small"
    padding="large"
    background="default"
    shadow="above"
  >
    {lorem.sentence()}
  </DeprecatedView>
  <DeprecatedView
    as="span"
    display="inline-block"
    maxWidth="10rem"
    margin="small"
    padding="large"
    background="default"
    shadow="topmost"
  >
    {lorem.sentence()}
  </DeprecatedView>
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
  <DeprecatedView
    as="span"
    display="inline-block"
    maxWidth="10rem"
    margin="small"
    padding="small"
    background="default"
    borderWidth="small"
  >
    {lorem.sentence()}
  </DeprecatedView>
  <DeprecatedView
    as="span"
    display="inline-block"
    maxWidth="10rem"
    margin="small"
    padding="small"
    background="default"
    borderWidth="medium"
  >
    {lorem.sentence()}
  </DeprecatedView>
  <DeprecatedView
    as="span"
    display="inline-block"
    maxWidth="10rem"
    margin="small"
    padding="small"
    background="default"
    borderWidth="large none"
  >
    {lorem.sentence()}
  </DeprecatedView>
  <DeprecatedView
    as="div"
    margin="small"
    padding="small"
    background="default"
    borderWidth="none none small none"
  >
    {lorem.sentence()}
  </DeprecatedView>
</div>
```

### `borderColor`

Change the color of View's border for different contexts via the `borderColor` prop.

```js
---
example: true
---
<div>
  <DeprecatedView
    as="span"
    display="inline-block"
    margin="small"
    padding="small"
    background="default"
    borderWidth="large"
  >
    default
  </DeprecatedView>
  <DeprecatedView
    as="span"
    display="inline-block"
    margin="small"
    padding="small"
    background="default"
    borderWidth="large"
    borderColor="info"
  >
    info
  </DeprecatedView>
  <DeprecatedView
    as="span"
    display="inline-block"
    margin="small"
    padding="small"
    background="default"
    borderWidth="large"
    borderColor="warning"
  >
    warning
  </DeprecatedView>
  <DeprecatedView
    as="span"
    display="inline-block"
    margin="small"
    padding="small"
    background="default"
    borderWidth="large"
    borderColor="danger"
  >
    danger
  </DeprecatedView>
  <DeprecatedView
    as="span"
    display="inline-block"
    margin="small"
    padding="small"
    background="default"
    borderWidth="large"
    borderColor="alert"
  >
    alert
  </DeprecatedView>
  <DeprecatedView
    as="span"
    display="inline-block"
    margin="small"
    padding="small"
    background="default"
    borderWidth="large"
    borderColor="success"
  >
    success
  </DeprecatedView>
  <DeprecatedView
    as="span"
    display="inline-block"
    margin="small"
    padding="small"
    background="default"
    borderWidth="large"
    borderColor="brand"
  >
    brand
  </DeprecatedView>
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
  <DeprecatedView
    as="span"
    display="inline-block"
    maxWidth="10rem"
    margin="small"
    padding="medium"
    background="inverse"
    borderRadius="medium"
    textAlign="center"
  >
    medium
  </DeprecatedView>
  <DeprecatedView
    as="span"
    display="inline-block"
    maxWidth="10rem"
    margin="small"
    padding="medium"
    background="inverse"
    borderRadius="large large none none"
    textAlign="center"
  >
    large large none none
  </DeprecatedView>
  <DeprecatedView
    as="span"
    display="inline-block"
    maxWidth="10rem"
    margin="small"
    padding="medium"
    background="inverse"
    borderRadius="none none large large"
    textAlign="center"
  >
    none none large large
  </DeprecatedView>
  <DeprecatedView
    display="inline-block"
    width="6rem"
    height="6rem"
    margin="small"
    padding="medium"
    background="inverse"
    borderRadius="circle"
    textAlign="center"
  >
    circle
  </DeprecatedView>
  <DeprecatedView
    display="inline-block"
    width="10rem"
    margin="small"
    padding="medium"
    background="inverse"
    borderRadius="pill"
    textAlign="center"
  >
    pill
  </DeprecatedView>
</div>
```


### `position`

`position` sets the CSS position rule for the component: `static`, `absolute`, `relative`,
`sticky`, or `fixed`.

> Note that `position="sticky"` is currently [not as fully supported](https://caniuse.com/#feat=css-sticky)
as the other values.

```js
---
example: true
---
<DeprecatedView
  position="relative"
  as="div"
  height="200px"
  borderWidth="small"
>
  <DeprecatedView
    as="div"
    position="absolute"
    insetInlineEnd="100px"
    insetBlockStart="10px"
    insetBlockEnd="0"
    background="inverse"
  >
    Positioned View inside a View with relative positioning.
  </DeprecatedView>
</DeprecatedView>
```

### `focused`

Set `focused` to `true` to make View's "focus ring" display.

`focused` supports the following `borderRadius` values: `circle`, `pill`, `small`, `medium`,
and `large`. For Views with irregular border radius (e.g., `borderRadius="small large none medium"`),
the focus ring will appear with square edges. The color of the focus outline can be
changed for different contexts via the `focusColor` property.

> Note that `position` must be set to `relative` for the focus ring to display.
(This restriction exists because the focus ring requires styling a pseudo element
that has absolute positioning.)


```javascript
---
example: true
render: false
---
class FocusedExample extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      focused: true,
      inset: false
    }
  }

  updateFocused = (event) => {
    this.setState({focused: event.target.checked})
  }

  updateInset = (event) => {
    this.setState({inset: event.target.checked})
  }

  render () {
    const { focused, focusPosition } = this.state

    return (
      <DeprecatedView as="div">
        <DeprecatedView as="div" background="default" padding="small" margin="0 0 small" borderWidth="small">
          <FormFieldGroup
            rowSpacing="small"
            description={<ScreenReaderContent>View focus outline examples</ScreenReaderContent>}
          >
            <Checkbox
              label="focused"
              checked={this.state.focused}
              onChange={this.updateFocused}
            />
            <Checkbox
              label="focusPosition = inset"
              checked={this.state.inset}
              onChange={this.updateInset}
            />
          </FormFieldGroup>
        </DeprecatedView>
        <DeprecatedView as="div">
          <code>borderRadius =</code>
          <DeprecatedView
            display="inline-block"
            margin="small"
            padding="small"
            background="default"
            borderRadius="small"
            borderWidth="small"
            position="relative"
            focused={this.state.focused}
            focusPosition={this.state.inset ? 'inset' : 'offset'}
          >
            small
          </DeprecatedView>
          <DeprecatedView
            display="inline-block"
            margin="small"
            padding="small"
            background="default"
            borderRadius="medium"
            borderWidth="small"
            position="relative"
            focused={this.state.focused}
            focusPosition={this.state.inset ? 'inset' : 'offset'}
          >
            medium
          </DeprecatedView>
          <DeprecatedView
            display="inline-block"
            margin="small"
            padding="small"
            background="default"
            borderRadius="large"
            borderWidth="small"
            position="relative"
            focused={this.state.focused}
            focusPosition={this.state.inset ? 'inset' : 'offset'}
          >
            large
          </DeprecatedView>
          <DeprecatedView
            display="inline-block"
            height="100px"
            width="100px"
            margin="small"
            background="default"
            borderRadius="circle"
            borderWidth="small"
            position="relative"
            focused={this.state.focused}
            focusPosition={this.state.inset ? 'inset' : 'offset'}
          >
            <Flex
              width="100%"
              height="100%"
              alignItems="center"
              justifyItems="center"
            >
              <Flex.Item>
                circle
              </Flex.Item>
            </Flex>
          </DeprecatedView>
          <DeprecatedView background="inverse" display="inline-block" padding="small">
            <DeprecatedView
              display="block"
              margin="small"
              padding="small"
              background="inverse"
              borderRadius="large"
              borderWidth="small"
              position="relative"
              focused={this.state.focused}
              focusColor="inverse"
              focusPosition={this.state.inset ? 'inset' : 'offset'}
            >
              medium
            </DeprecatedView>
          </DeprecatedView>
          <DeprecatedView
            display="inline-block"
            margin="small"
            padding="small"
            background="default"
            borderRadius="pill"
            borderWidth="small"
            position="relative"
            focusColor="success"
            width="100px"
            textAlign="center"
            focused={this.state.focused}
            focusPosition={this.state.inset ? 'inset' : 'offset'}
          >
            pill
          </DeprecatedView>
          <DeprecatedView
            display="inline-block"
            margin="small"
            padding="small"
            background="default"
            borderWidth="small"
            borderRadius="none large"
            focusColor="danger"
            position="relative"
            focused={this.state.focused}
            focusPosition={this.state.inset ? 'inset' : 'offset'}
          >
            none large
          </DeprecatedView>
        </DeprecatedView>
      </DeprecatedView>
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
      <DeprecatedView as="div">
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
        <DeprecatedView
          as="div"
          height="7rem"
          width="20rem"
          margin="medium none x-large"
          overflowY={this.state.overflowY}
          overflowX={this.state.overflowX}
          debug
        >
          <div style={{width: '30rem', height: '10rem'}}>
            <Img src={avatarSquare} constrain="cover" />
          </div>

        </DeprecatedView>
      </DeprecatedView>
    )
  }
}

render(<OverflowExample />)
```

### Debugging

Set the `debug` prop to see the View's boundaries.

```js
---
example: true
---
<div>
  <DeprecatedView
    as="div"
    padding="large"
    debug
  >
    {lorem.sentence()}
  </DeprecatedView>
  <DeprecatedView
    as="div"
    display="flex"
    debug
  >
    <DeprecatedView
      as="div"
      margin="small"
      padding="small"
      debug
    >
      {lorem.sentence()}
    </DeprecatedView>
    <DeprecatedView
      as="div"
      margin="small"
      padding="small"
      debug
    >
      {lorem.sentence()}
    </DeprecatedView>
  </DeprecatedView>
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
<DeprecatedView
  as="section"
  padding="small"
  debug
>
  <DeprecatedView
    as="header"
    margin="0 0 medium"
    debug
  >
  Some header content
  </DeprecatedView>
  <Text as="p">{lorem.paragraph()}</Text>
</DeprecatedView>
```

### Inline Views
By default, View will render as a span which displays inline. When using the `as`
prop to render a block level element, setting `display` to `inline-block`, styles
the View to display inline-block with other inline elements.

```js
---
example: true
---
<DeprecatedView as="div" textAlign="center" padding="x-small" debug>
  <DeprecatedView
    as="div"
    display="inline-block"
    debug
    textAlign="end"
    margin="large auto"
    padding="0 small 0 0"
  >
    {lorem.sentence()}
  </DeprecatedView>
  <Button color="success">Some Action</Button>
</DeprecatedView>
```
