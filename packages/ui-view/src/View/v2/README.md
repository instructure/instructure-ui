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
  margin="general.spaceMd"
  padding="general.space2xl"
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
    margin="general.spaceMd"
    padding="general.spaceMd"
    background="transparent"
  >
    {lorem.sentence()}
  </View>
  <View
    as="div"
    display="inline-block"
    maxWidth="10rem"
    margin="general.spaceMd"
    padding="general.spaceMd"
    background="primary"
  >
    {lorem.sentence()}
  </View>
  <View
    as="div"
    display="inline-block"
    maxWidth="10rem"
    margin="general.spaceMd"
    padding="general.spaceMd"
    background="secondary"
  >
    {lorem.sentence()}
  </View>
  <View
    as="div"
    display="inline-block"
    maxWidth="10rem"
    margin="general.spaceMd"
    padding="general.spaceMd"
    background="primary-inverse"
  >
    {lorem.sentence()}
  </View>
  <View
    as="div"
    display="inline-block"
    maxWidth="10rem"
    margin="general.spaceMd"
    padding="general.spaceMd"
    background="brand"
  >
    {lorem.sentence()}
  </View>
  <View
    as="div"
    display="inline-block"
    maxWidth="10rem"
    margin="general.spaceMd"
    padding="general.spaceMd"
    background="alert"
  >
    {lorem.sentence()}
  </View>
  <View
    as="div"
    display="inline-block"
    maxWidth="10rem"
    margin="general.spaceMd"
    padding="general.spaceMd"
    background="success"
  >
    {lorem.sentence()}
  </View>
    <View
    as="div"
    display="inline-block"
    maxWidth="10rem"
    margin="general.spaceMd"
    padding="general.spaceMd"
    background="danger"
  >
    {lorem.sentence()}
  </View>
  <View
    as="div"
    display="inline-block"
    maxWidth="10rem"
    margin="general.spaceMd"
    padding="general.spaceMd"
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
    margin="general.spaceMd"
    padding="general.space2xl"
    background="primary"
    shadow="elevation1"
  >
    {lorem.sentence()}
  </View>
  <View
    as="span"
    display="inline-block"
    maxWidth="10rem"
    margin="general.spaceMd"
    padding="general.space2xl"
    background="primary"
    shadow="elevation2"
  >
    {lorem.sentence()}
  </View>
  <View
    as="span"
    display="inline-block"
    maxWidth="10rem"
    margin="general.spaceMd"
    padding="general.space2xl"
    background="primary"
    shadow="elevation3"
  >
    {lorem.sentence()}
  </View><View
    as="span"
    display="inline-block"
    maxWidth="10rem"
    margin="general.spaceMd"
    padding="general.space2xl"
    background="primary"
    shadow="elevation4"
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
    margin="general.spaceMd"
    padding="general.spaceMd"
    background="primary"
    borderWidth="sm"
  >
    {lorem.sentence()}
  </View>
  <View
    as="span"
    display="inline-block"
    maxWidth="10rem"
    margin="general.spaceMd"
    padding="general.spaceMd"
    background="primary"
    borderWidth="md"
  >
    {lorem.sentence()}
  </View>
  <View
    as="span"
    display="inline-block"
    maxWidth="10rem"
    margin="general.spaceMd"
    padding="general.spaceMd"
    background="primary"
    borderWidth="lg none"
  >
    {lorem.sentence()}
  </View>
  <View
    as="div"
    margin="general.spaceMd"
    padding="general.spaceMd"
    background="primary"
    borderWidth="none none sm none"
  >
    {lorem.sentence()}
  </View>
</div>
```

### `borderColor`

Change the color of View's border for different contexts via the `borderColor` prop.
In addition to the legacy contextual colors (`transparent`, `primary`, `secondary`, `brand`,
`info`, `success`, `warning`, `alert`, `danger`), View accepts the shared design token
stroke colors: `strongColor`, `visualSeparator`, and the accent palette (`accentAsh`,
`accentAurora`, `accentBlue`, `accentGreen`, `accentGrey`, `accentHoney`, `accentOrange`,
`accentPlum`, `accentRed`, `accentSea`, `accentSky`, `accentStone`, `accentViolet`).
You can also pass any valid CSS color string (e.g. `"#FFFFFF"` or `"red"`).

```js
---
type: example
---
<div>
  <View
    as="span"
    display="inline-block"
    margin="general.spaceMd"
    padding="general.spaceMd"
    background="primary"
    borderWidth="large"
  >
    primary
  </View>
  <View
    as="span"
    display="inline-block"
    margin="general.spaceMd"
    padding="general.spaceMd"
    background="primary"
    borderWidth="large"
    borderColor="accentBlue"
  >
    accentBlue
  </View>
  <View
    as="span"
    display="inline-block"
    margin="general.spaceMd"
    padding="general.spaceMd"
    background="primary"
    borderWidth="large"
    borderColor="accentOrange"
  >
    accentOrange
  </View>
  <View
    as="span"
    display="inline-block"
    margin="general.spaceMd"
    padding="general.spaceMd"
    background="primary"
    borderWidth="large"
    borderColor="accentRed"
  >
    accentRed
  </View>
  <View
    as="span"
    display="inline-block"
    margin="general.spaceMd"
    padding="general.spaceMd"
    background="primary"
    borderWidth="large"
    borderColor="accentHoney"
  >
    accentHoney
  </View>
  <View
    as="span"
    display="inline-block"
    margin="general.spaceMd"
    padding="general.spaceMd"
    background="primary"
    borderWidth="large"
    borderColor="accentGreen"
  >
    accentGreen
  </View>
  <View
    as="span"
    display="inline-block"
    margin="general.spaceMd"
    padding="general.spaceMd"
    background="primary"
    borderWidth="large"
    borderColor="accentAurora"
  >
    accentAurora
  </View>
  <View
    as="span"
    display="inline-block"
    margin="general.spaceMd"
    padding="general.spaceMd"
    background="primary"
    borderWidth="large"
    borderColor="strongColor"
  >
    strongColor
  </View>
  <View
    as="span"
    display="inline-block"
    margin="general.spaceMd"
    padding="general.spaceMd"
    background="primary"
    borderWidth="large"
    borderColor="visualSeparator"
  >
    visualSeparator
  </View>
  <View
    as="span"
    display="inline-block"
    margin="general.spaceMd"
    padding="general.spaceMd"
    background="primary"
    borderWidth="large"
    borderColor="accentViolet"
  >
    accentViolet
  </View>
</div>
```

### `borderRadius`

Adjust the border radius using the `borderRadius` prop. Utilize
[CSS shorthand style](https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties)
to apply different border radii to individual corners.

In addition to the legacy values (`small`, `medium`, `large`, `circle`, `pill`), View
accepts the shared design token radius scale — `xs`, `sm`, `md`, `lg`, `xl`, `xxl`, `full` —
and the card radii `card.sm`, `card.md`, `card.lg`, `card.nestedContainer.sm`,
`card.nestedContainer.md`, `card.nestedContainer.lg`. Valid CSS length values like `1rem`
or `12px` are also accepted.

```js
---
type: example
---
<div>
  <View
    as="span"
    display="inline-block"
    maxWidth="10rem"
    margin="general.spaceMd"
    padding="general.spaceXl"
    background="primary-inverse"
    borderRadius="md"
    textAlign="center"
  >
    medium
  </View>
  <View
    as="span"
    display="inline-block"
    maxWidth="10rem"
    margin="general.spaceMd"
    padding="general.spaceXl"
    background="primary-inverse"
    borderRadius="lg"
    textAlign="center"
  >
    lg
  </View>
  <View
    as="span"
    display="inline-block"
    maxWidth="10rem"
    margin="general.spaceMd"
    padding="general.spaceXl"
    background="primary-inverse"
    borderRadius="card.md"
    textAlign="center"
  >
    card.md
  </View>
  <View
    as="span"
    display="inline-block"
    maxWidth="10rem"
    margin="general.spaceMd"
    padding="general.spaceXl"
    background="primary-inverse"
    borderRadius="lg lg none none"
    textAlign="center"
  >
    large large none none
  </View>
  <View
    as="span"
    display="inline-block"
    maxWidth="10rem"
    margin="general.spaceMd"
    padding="general.spaceXl"
    background="primary-inverse"
    borderRadius="none none lg lg"
    textAlign="center"
  >
    none none large large
  </View>
  <View
    display="inline-block"
    width="6rem"
    height="6rem"
    margin="general.spaceMd"
    padding="general.spaceXl"
    background="primary-inverse"
    borderRadius="full"
    textAlign="center"
  >
    circle
  </View>
  <View
    display="inline-block"
    width="10rem"
    margin="general.spaceMd"
    padding="general.spaceXl"
    background="primary-inverse"
    borderRadius="full"
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
<Flex gap="general.spaceXl" direction="column">
  <View tabIndex="0" role="button" cursor="pointer">
    <Text>
      Tab here to see the focus outline
    </Text>
  </View>
  <View focusWithin>
    <Text>
      if the <code>focusWithin</code> prop is <code>true</code>, the View will display the focus ring if any of its descendants receives focus
    </Text>
    <div tabIndex="0" role="button" style={{outline: 'none'}}><Text>Tab here to see the focus outline</Text></div>
  </View>
</Flex>
```

In some situations, you may want to manually control when the focus outline is displayed instead of leaving it up to the browser.
This can be done using the `withFocusOutline` prop. Set it to `true` to make View's focus outline display or `false` to hide it.
Be careful when overriding the display of the focus outline as it is essential for accessibility.

The focus outline adjusts to account for the shape of the View. For example, the following values can be set for `borderRadius`:
`circle`, `pill`, `small`, `medium`, and `large`. In each case, the border radius of the focus outline will automatically adjust
to match the border radius of the corresponding View. The color of the focus outline can be changed for different contexts via the `focusColor` property.

```js
---
type: example
---
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
        padding="general.spaceMd"
        margin="0 0 general.spaceMd"
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
          <Flex gap="general.spaceMd" direction="row">
            <Flex gap="general.spaceMd" direction="column" width="15rem">
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
          margin="general.spaceMd"
          padding="general.spaceMd"
          background="primary"
          borderRadius="sm"
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
          margin="general.spaceMd"
          padding="general.spaceMd"
          background="primary"
          borderRadius="md"
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
          margin="general.spaceMd"
          padding="general.spaceMd"
          background="primary"
          borderRadius="lg"
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
          margin="general.spaceMd"
          background="primary"
          borderRadius="full"
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
          padding="general.spaceMd"
        >
          <View
            display="block"
            margin="general.spaceMd"
            padding="general.spaceMd"
            background="primary-inverse"
            borderRadius="lg"
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
          margin="general.spaceMd"
          padding="general.spaceMd"
          background="primary"
          borderRadius="full"
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
          margin="general.spaceMd"
          padding="general.spaceMd"
          background="primary"
          borderWidth="small"
          borderRadius="none lg"
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

```js
---
type: example
---
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
        margin="general.spaceXl none general.space2xl"
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
    padding="general.space2xl"
    withVisualDebug
  >
    <Text>{lorem.sentence()}</Text>
  </View>
  <View
    as="div"
    display="flex"
    withVisualDebug
  >
    <View
      as="div"
      margin="general.spaceMd"
      padding="general.spaceMd"
      withVisualDebug
    >
      <Text>{lorem.sentence()}</Text>
    </View>
    <View
      as="div"
      margin="general.spaceMd"
      padding="general.spaceMd"
      withVisualDebug
    >
      <Text>{lorem.sentence()}</Text>
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
  padding="general.spaceMd"
  withVisualDebug
>
  <View
    as="header"
    margin="0 0 general.spaceXl"
    withVisualDebug
  >
    <Text>
      Some header content
    </Text>
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
<View as="div" textAlign="center" padding="general.spaceSm" withVisualDebug>
  <View
    as="div"
    display="inline-block"
    withVisualDebug
    textAlign="end"
    margin="general.space2xl auto"
    padding="0 general.spaceMd 0 0"
  >
    <Text>
    {lorem.sentence()}
    </Text>
  </View>
  <Button color="success">Some Action</Button>
</View>
```
