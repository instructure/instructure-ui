---
describes: View
---

Use View to separate content and/or to set the
text alignment for a section of content.

```js
---
example: true
---
<View
  as="div"
  margin="small"
  padding="large"
  textAlign="center"
  background="default"
>
  {lorem.sentence()}
</View>
```
Change the background using the `background` prop

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
    textAlign="center"
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
    textAlign="center"
    background="default"
  >
    {lorem.sentence()}
  </View>
  <View
    as="div"
    display="inline-block"
    maxWidth="10rem"
    margin="small"
    padding="small"
    textAlign="center"
    background="light"
  >
    {lorem.sentence()}
  </View>
  <View
    as="div"
    display="inline-block"
    maxWidth="10rem"
    margin="small"
    padding="small"
    textAlign="center"
    background="inverse"
  >
    {lorem.sentence()}
  </View>
</div>
```

Add a shadow to the View using the `shadow` prop

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
    background="default"
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
    background="default"
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
    background="default"
    shadow="topmost"
  >
    {lorem.sentence()}
  </View>
</div>
```

Apply a border with the `borderWidth` prop. Utilize the
[CSS shorthand](https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties)
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
    background="default"
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
    background="default"
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
    background="default"
    borderWidth="large none"
  >
    {lorem.sentence()}
  </View>
  <View
    as="div"
    margin="small"
    padding="small"
    background="default"
    borderWidth="none none small none"
  >
    {lorem.sentence()}
  </View>
</div>
```

Adjust the border radius using the `borderRadius` prop. Utilize the
[CSS shorthand](https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties)
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
    padding="small"
    background="inverse"
    borderRadius="medium"
  >
    {lorem.sentence()}
  </View>
  <View
    as="span"
    display="inline-block"
    maxWidth="10rem"
    margin="small"
    padding="small"
    background="inverse"
    borderRadius="large large none none"
  >
    {lorem.sentence()}
  </View>
  <View
    as="span"
    display="inline-block"
    maxWidth="10rem"
    margin="small"
    padding="small"
    background="inverse"
    borderRadius="none none large large"
  >
    {lorem.sentence()}
  </View>
</div>
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
          debug
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

Set the `debug` prop to see the View's boundaries.

```js
---
example: true
---
<div>
  <View
    as="div"
    padding="large"
    debug
  >
    {lorem.sentence()}
  </View>
  <View
    as="div"
    display="flex"
    debug
  >
    <View
      as="div"
      margin="small"
      padding="small"
      debug
    >
      {lorem.sentence()}
    </View>
    <View
      as="div"
      margin="small"
      padding="small"
      debug
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
  debug
>
  <View
    as="header"
    margin="0 0 medium"
    debug
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
<View as="div" textAlign="center" padding="x-small" debug>
  <View
    as="div"
    display="inline-block"
    debug
    textAlign="end"
    margin="large auto"
    padding="0 small 0 0"
  >
    {lorem.sentence()}
  </View>
  <Button variant="success">Some action</Button>
</View>
```
