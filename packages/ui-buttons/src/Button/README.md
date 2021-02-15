---
describes: Button
---

Button allows users to perform actions or trigger changes. If selecting the Button causes the user to navigate to a different location, consider using the [Link](#Link) component instead.

```js
---
example: true
---
<Button>Hello{null}</Button>
```

### Color

The `color` prop will change the Button's color scheme.

```js
---
example: true
---
<View display="block">
  <Button color="primary" margin="small">Primary</Button>
  <Button color="secondary" margin="small">Secondary</Button>
  <Button color="success" margin="small">Success</Button>
  <Button color="danger" margin="small">Danger</Button>
  <Button color="primary-inverse" margin="small">Primary Inverse</Button>
</View>
```

### Size

To specify the Button `size`, set the size prop to `small`, `medium` (default) or `large`.

```js
---
example: true
---
<View display="block">
  <Button size="small" margin="small">Small</Button>
  <Button margin="small">Medium</Button>
  <Button size="large" margin="small">Large</Button>
</View>
```

### Rendering icons in Buttons

An icon can be rendered alongside the Button content using the `renderIcon` prop. Use [IconButton](#IconButton) instead if your Button only displays an Icon with no other visual content.

```js
---
example: true
---
<Button renderIcon={IconAddLine}>Add Item</Button>
```

### Text wrapping

Just like native HTML buttons, the Button text will wrap to the next line when it does not have enough room.

```js
---
example: true
---
<View
  display="block"
  width="10rem"
  margin="small"
  padding="small none"
  withVisualDebug
>
  <Button color="primary">
    A Button With a Whole Lot of Text
  </Button>
</View>
```

If you need to prevent text wrapping, you can use the [TruncateText](#TruncateText) util. You can also conditionally render a [Tooltip](#Tooltip) with the full text when truncation occurs.

```js
---
example: true
render: false
---
class Example extends React.Component {
  state = {
    isTruncated: false
  }

  handleUpdate = (isTruncated) => {
    if (this.state.isTruncated !== isTruncated) {
      this.setState({ isTruncated })
    }
  }

  renderButton () {
    return (
      <Button color="primary">
        <TruncateText onUpdate={this.handleUpdate}>
          {this.props.message}
        </TruncateText>
      </Button>
    )
  }

  render () {
    return (
      <View
        display="block"
        width="10rem"
        margin="small"
        padding="small none"
        withVisualDebug
      >
        {this.state.isTruncated ? (
          <Tooltip
            renderTip={this.props.message}
            mountNode={() => document.getElementById('main')}
          >
            { this.renderButton() }
          </Tooltip>
        ) : this.renderButton()}
      </View>
    )
  }
}

render(<Example message="A Button With a Whole Lot of Text" />)
```

### Display

By default, the Button displays inline with other elements. If you need it to expand to fill the width of it's container, set the `display` prop to `block`.

```js
---
example: true
---
<View
  display="block"
  width="30rem"
  margin="small"
  padding="small none"
  withVisualDebug
>
  <Button
    renderIcon={IconUserLine}
    display="block"
    textAlign="center"
    color="success"
  >
    User Details
  </Button>
</View>
```

### Rendering Buttons without backgrounds

Use backgroundless buttons for interfaces on dark backgrounds or when there is a need to deemphasize the button from another primary action on the page. Be sure to use border/text colors that meet the proper contrast ratios with whatever background they are placed on.

```js
---
example: true
---
<View display="block">
  <View display="inline-block" background="primary">
    <Button renderIcon={IconAddLine} withBackground={false} color="primary" margin="small">Click here</Button>
  </View>
  <View display="inline-block" background="primary-inverse">
    <Button renderIcon={IconAddLine} withBackground={false} color="primary-inverse" margin="small">Click here</Button>
  </View>
</View>
```

### Guidelines

```js
---
guidelines: true
---
<Guidelines>
  <Figure recommendation="yes" title="Do">
    <Figure.Item>Use 'Title Case' for button text</Figure.Item>
    <Figure.Item>Use buttons with color set to <code>primary</code> only once for each section of content</Figure.Item>
    <Figure.Item>Use buttons with color set to <code>primary</code> when the task of the view requires an action to be taken</Figure.Item>
    <Figure.Item>Use the <code>success</code> and <code>danger</code> colors for grading activities</Figure.Item>
    <Figure.Item>Use the <code>danger</code> color to warn the user of potentially destructive actions</Figure.Item>
    <Figure.Item>Use a button with color set to <code>secondary</code> as a secondary or tertiary option for actions such as Cancel</Figure.Item>
    <Figure.Item>The <code>primary-inverse</code> color can be used as a secondary option instead of the <code>secondary</code> color when the background would otherwise match the <code>secondary</code> button color (example: ModalFooter). Set the focusColor to `info` as well with this configuration.</Figure.Item>
    <Figure.Item>The maximum string length of any button, including spaces, should be 20 characters</Figure.Item>
  </Figure>
  <Figure recommendation="no" title="Don't">
    <Figure.Item>Use more than one button with color set to <code>primary</code> per section of content
</Figure.Item>
    <Figure.Item>Use buttons without backgrounds excessively</Figure.Item>
  </Figure>
</Guidelines>
```

```js
---
guidelines: true
---
<Guidelines>
  <Figure recommendation="a11y" title="Accessibility">
    <Figure.Item>When using buttons on a dark background, use the <code>primary-inverse</code> color to ensure adequate contrast</Figure.Item>
    <Figure.Item>Buttons are activated with both Enter and Spacebar keys, and either key press will fire an `onClick` event</Figure.Item>
    <Figure.Item>Disabled buttons do not need to meet color contrast ratio requirements or receive keyboard focus but will be read as "disabled" or "dimmed" by screen readers</Figure.Item>
    <Figure.Item>Icon only buttons must have ScreenReaderContent added so screen readers indicate what the button is used for</Figure.Item>
  </Figure>
</Guidelines>
```
