# Button


Button allows users to perform actions or trigger changes. If selecting the Button causes the user to navigate to a different location, consider using the [Link](Link) component instead.

```js
---
type: example
---
<Button>Hello Instructure</Button>
```

### Color

The `color` prop will change the Button's color scheme.

```js
---
type: example
---
<View display="block">
  <Button color="primary" margin="small">Primary</Button>
  <Button color="secondary" margin="small">Secondary</Button>
  <Button color="success" margin="small">Success</Button>
  <Button color="danger" margin="small">Danger</Button>
  <Button color="primary-inverse" margin="small">Primary Inverse</Button>
  <Button color="ai-primary" margin="small">AI Primary</Button>
  <Button color="ai-secondary" margin="small">AI Secondary</Button>
</View>
```

### AI buttons

There is a specific need for `AI buttons`, which has an icon and gradient colors for `background` and `borders`. Here are the preset examples you can use. (the `IconButton` examples are also included for convenience)

```js
---
type: example
---
<View display="block">
  <Button color="ai-primary" renderIcon={IconAiSolid} margin="small">AI Primary</Button>
  <Button color="ai-secondary" renderIcon={IconAiColoredSolid} margin="small">AI Secondary</Button>
  <IconButton color="ai-primary" screenReaderLabel="AI button" margin="small"><IconAiSolid/></IconButton>
  <IconButton  shape='circle' color="ai-secondary" screenReaderLabel="AI button"  margin="small"><IconAiColoredSolid/></IconButton>
  <IconButton   shape='circle' color="ai-primary" screenReaderLabel="AI button" margin="small"><IconAiSolid/></IconButton>
  <IconButton color="ai-secondary" screenReaderLabel="AI button"  margin="small"><IconAiColoredSolid/></IconButton>
</View>
```

### Size

To specify the Button `size`, set the size prop to `small`, `medium` (default) or `large`.

```js
---
type: example
---
<View display="block">
  <Button size="small" margin="small">Small</Button>
  <Button margin="small">Medium</Button>
  <Button size="large" margin="small">Large</Button>
</View>
```

### Rendering icons in Buttons

An icon can be rendered alongside the Button content using the `renderIcon` prop. Use [IconButton](IconButton) instead if your Button only displays an Icon with no other visual content.

```js
---
type: example
---
<Button renderIcon={IconAddLine}>Add Item</Button>
```

### Text wrapping

Just like native HTML buttons, the Button text will wrap to the next line when it does not have enough room.

```js
---
type: example
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

If you need to prevent text wrapping, you can use the [TruncateText](TruncateText) util. You can also conditionally render a [Tooltip](Tooltip) with the full text when truncation occurs.

```js
---
type: example
---
  const Example = ({ message }) => {
    const [isTruncated, setIsTruncated] = useState(false)

    const handleUpdate = (shouldBeTruncated) => {
      if (isTruncated !== shouldBeTruncated) {
        setIsTruncated(shouldBeTruncated)
      }
    }

    const renderButton = () => {
      return (
        <Button color="primary">
          <TruncateText onUpdate={handleUpdate}>{message}</TruncateText>
        </Button>
      )
    }

    return (
      <View
        display="block"
        width="10rem"
        margin="small"
        padding="small none"
        withVisualDebug
      >
        {isTruncated ? (
          <Tooltip
            renderTip={message}
            mountNode={() => document.getElementById('main')}
          >
            {renderButton()}
          </Tooltip>
        ) : (
          renderButton()
        )}
      </View>
    )
  }

  render(<Example message="A Button With a Whole Lot of Text" />)
```

### Display

By default, the Button displays inline with other elements. If you need it to expand to fill the width of it's container, set the `display` prop to `block`.

```js
---
type: example
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
type: example
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

### Styling buttons

[Button](Button) and [IconButton](IconButton) share the same styling mechanics (they are `BaseButton`s underneath). You need to set the theme based on their `color` and `withBackground` prop:

```js
---
type: example
---
  class Example extends React.Component {
    state = {
      withBackground: true,
      color : "secondary"
    }
    toggleWithBackground = (event) => this.setState({ withBackground: !this.state.withBackground })
    changeColor = (event,color) =>  {this.setState({color})}
    render() {
      const overrides = {
        borderWidth: "0.3rem",
        // what to override depends on the 'color' value (by default 'secondary')
        // if withBackground is true:
        secondaryColor: '#000000', // icon color
        secondaryBackground: '#ff00ff',
        secondaryBorderColor: 'brown',

        secondaryActiveBackground: '#000000', // &:active CSS, e.g. space is pressed, not hovered, see https://developer.mozilla.org/en-US/docs/Web/CSS/:active
        secondaryActiveBoxShadow: '10px 5px 5px red',

        secondaryHoverBackground: '#00FF00',
        // if withBackground is false:
        secondaryGhostColor: '#0000FF',
        secondaryGhostBackground: 'transparent',
        secondaryGhostBorderColor: '#FF00FF',

        secondaryGhostActiveBackground: '#FF0000',
        secondaryGhostActiveBoxShadow: '10px 5px 5px green',

        secondaryGhostHoverBackground: '#00FFFF',

        secondaryBoxShadow: '0 0 0.4875rem 0.625rem yellow',
        secondaryHoverBoxShadow: '0 0 0.1875rem 0.625rem lime',
        secondaryActiveBoxShadow: '0 0px 0px 25px red',
        secondaryGhostHoverBoxShadow: '0 0 0.7875rem 0.625rem pink',
        secondaryGhostBoxShadow: '0 0 0.2875rem 0.625rem green',
        secondaryGhostActiveBoxShadow: '10px 5px 5px blue'

      }
      return (
        <>
          <FormFieldGroup description="In this example 'secondary' colors are overridden">
            <Checkbox
              checked={this.state.withBackground}
              label="withBackground?"
              onChange={this.toggleWithBackground}
            />
          </FormFieldGroup>
          <View display="block" margin="small none">
            <RadioInputGroup
              name="color"
              defaultValue="secondary"
              description="Color:"
              variant="toggle"
              size="small"
              onChange={this.changeColor} >
              <RadioInput label="Primary" value="primary"/>
              <RadioInput label="secondary" value="secondary" />
            </RadioInputGroup>
          </View>
          <Flex margin="none none medium" gap="medium">
            <Flex.Item>
              <Button withBackground={this.state.withBackground}
                      color={this.state.color}
                      themeOverride={overrides}
              >
                Button
              </Button>
            </Flex.Item>
            <Flex.Item>
              <IconButton screenReaderLabel="View user profile"
                          withBackground={this.state.withBackground}
                          color={this.state.color}
                          themeOverride={overrides}>
                <IconUserLine />
              </IconButton>
            </Flex.Item>
          </Flex>
        </>
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
type: embed
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


### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| Button | children | `React.ReactNode` | No | - | Specifies the `Button` children. |
| Button | type | `'button' \| 'submit' \| 'reset'` | No | `'button'` | Specifies the type of the `Button`'s underlying html element. |
| Button | size | `'small' \| 'medium' \| 'large'` | No | `'medium'` | The size of the `Button` |
| Button | elementRef | `(element: Element \| null) => void` | No | - | Provides a reference to the `Button`'s underlying html element. |
| Button | as | `AsElementType` | No | `'button'` | The element to render as the component root, `Button` by default. |
| Button | interaction | `'enabled' \| 'disabled' \| 'readonly'` | No | `undefined` | Specifies if interaction with the `Button` is enabled, disabled, or readonly. |
| Button | color | `\| 'primary' \| 'primary-inverse' \| 'secondary' \| 'success' \| 'danger' \| 'ai-primary' \| 'ai-secondary'` | No | `'secondary'` | Specifies the color for the `Button`. |
| Button | focusColor | `'info' \| 'inverse'` | No | - | Override the `Button`'s default focus outline color. |
| Button | display | `'inline-block' \| 'block'` | No | `'inline-block'` | The `Button` display property. When set to `inline-block`, the `Button` displays inline with other elements. When set to block, the `Button` expands to fill the width of the container. |
| Button | textAlign | `'start' \| 'center'` | No | `'center'` | Sets the alignment of the `Button` children and/or icon. |
| Button | withBackground | `boolean` | No | `true` | Specifies if the `Button` should render with a solid background. When false, the background is transparent. |
| Button | margin | `Spacing` | No | `'0'` | Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`, `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via familiar CSS-like shorthand. For example: `margin="small auto large"`. |
| Button | cursor | `Cursor` | No | `'pointer'` | Specify a mouse cursor to use when hovering over the button. The `pointer` cursor is used by default. |
| Button | href | `string` | No | - | Specifies an href attribute for the `Button`'s underlying html element. |
| Button | renderIcon | `React.ReactNode \| (() => React.ReactNode)` | No | - | An icon, or function that returns an icon. |
| Button | onClick | `( event: React.KeyboardEvent<ViewProps> \| React.MouseEvent<ViewProps> ) => void` | No | - | Callback fired when the `Button` is clicked. |

### Usage

Install the package:

```shell
npm install @instructure/ui-buttons
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { Button } from '@instructure/ui-buttons'
```

