---
describes: Button
---

`Button` allows users to perform actions or trigger changes. Button should not be used inline with heading or paragraph text. For actions where the trigger should flow inline with other text, use [Link](#Link).

The default button component:

```js
---
example: true
---
<Button>OK</Button>
```

The default button in its disabled state:

```js
---
example: true
---
<Button disabled>OK</Button>
```

A button with an href passed outputs a link element styled like a button, but note that
this is an anti-pattern and you should probably use the [Link](#Link) component instead.

```js
---
example: true
---
<Button href="https://instructure.github.io/instructure-ui/">Click Here</Button>
```

### Variants
Button variants for different contexts using the `variant` prop are shown below. Note also
the `margin` prop used to add space between the buttons.

```js
---
example: true
---
<div>
  <Button variant="primary" margin="0 x-small 0 0">
    Primary Button
  </Button>
  <Button href="https://instructure.github.io/instructure-ui/" variant="success" margin="0 x-small 0 0">
    Success Button
  </Button>
  <Button variant="danger" margin="0 x-small 0 0">
    Danger Button
  </Button>
  <Button variant="light" margin="0 x-small 0 0">
    Light Button
  </Button>
  <Button variant="ghost" margin="0 x-small 0 0">
    Ghost Button
  </Button>
  <Button variant="link">
    Link Button
  </Button>
</div>
```

### Using icons in Button
Use the `icon` prop to pass your icon to the Button. Don't forget to add [ScreenReaderContent](#ScreenReaderContent)
if there is no visible text on the Button. **Please do not add icons as children of Button.**

```js
---
example: true
---
<div>
  <Button margin="0 x-small 0 0" icon={IconPlusLine}>
    Button Label
  </Button>
  <Button margin="0 x-small 0 0" icon={IconUserLine}>
    <ScreenReaderContent>Accessible Button Label</ScreenReaderContent>
  </Button>
</div>
```

The following Button variants should only be used with a single icon.

```js
---
example: true
---
<div>
  <Button variant="icon" margin="0 x-small 0 0" icon={IconPlusLine}>
    <ScreenReaderContent>Accessible button label</ScreenReaderContent>
  </Button>
  <Button variant="circle-default" margin="0 x-small 0 0" icon={IconPlusLine}>
    <ScreenReaderContent>Accessible button label</ScreenReaderContent>
  </Button>
  <Button variant="circle-primary" margin="0 x-small 0 0" icon={IconPlusSolid}>
    <ScreenReaderContent>Accessible button label</ScreenReaderContent>
  </Button>
  <Button variant="circle-danger" icon={IconXSolid}>
    <ScreenReaderContent>Accessible button label</ScreenReaderContent>
  </Button>
</div>
```

### Inverse variants

```js
---
example: true
background: 'checkerboard-inverse'
---
<div>
  <Button variant="ghost-inverse" margin="0 x-small 0 0">Ghost Button</Button>
  <Button variant="icon-inverse" icon={IconUserSolid}>
    <ScreenReaderContent>Accessible button label</ScreenReaderContent>
  </Button>
  <Button variant="link-inverse">Link Button</Button>
</div>
```

### Sizes
Change the `size` prop to `small` or `large` to produce smaller or larger buttons than the default.

```js
---
example: true
---
<div>
  <Button size="small" margin="0 x-small 0 0">Small-size Button</Button>
  <Button margin="0 x-small 0 0">Default-size Button</Button>
  <Button size="large">Large-size Button</Button>
</div>
```

### Fluid width
Set the `fluidWidth` prop if you want the button to fill the width of its container element
and wrap the text.

```js
---
example: true
---
<View as="div" width="10rem">
  <Button fluidWidth icon={IconUserLine}>20 Characters Max</Button>
</View>
```

### Responsive Buttons

When [Responsive](#Responsive) detects that the _Button parent's_ width is a
minimum of `31rem`, the button will show text as well as an icon.

To track the entire window width instead, add `match="media"` to Responsive.

```js
---
example: true
---
<Responsive
  query={{
    fullButton: { minWidth: '31rem' }
  }}
>
  {(props, matches) => {
    const text = 'Button Label Text'
    const fullButton = matches.includes('fullButton')

    return (
      <View borderWidth="small" background="primary" padding="small" as="div">
        <Text as="div">The <code>fullButton</code> query is <b>{fullButton ? 'true' : 'false'}</b>.</Text>
        <Button icon={IconUserLine} margin="small 0 0">
          {(fullButton) ? text : <ScreenReaderContent>{text}</ScreenReaderContent>}
        </Button>
      </View>
    )
  }}
</Responsive>
```

### Overriding the default cursor

By default, the Button component uses the `pointer` cursor. To use a different
cursor, pass a `cursor` prop.

```js
---
example: true
---
<Button cursor="move" icon={IconDragHandleLine}>
  Move Me
</Button>
```
### Guidelines

```js
---
guidelines: true
---
<Guidelines>
  <Figure recommendation="yes" title="Do">
    <Figure.Item>Use 'Title Case' for button text</Figure.Item>
    <Figure.Item>Use the Button variant="link" when the design calls for a Link that is not within a paragraph or other content and the action takes the user to a new page or view</Figure.Item>
    <Figure.Item>Use the primary button only once for each section of content</Figure.Item>
    <Figure.Item>Use the primary button when the task of the view requires an action to be taken</Figure.Item>
    <Figure.Item>Use the success and danger buttons for grading activities</Figure.Item>
    <Figure.Item>Use the danger button to warn the user of potentially destructive actions</Figure.Item>
    <Figure.Item>Use the default button as a secondary or tertiary option for actions such as Cancel</Figure.Item>
    <Figure.Item>Use the light button when placed on a background that would match the default button background (example: ModalFooter)</Figure.Item>
    <Figure.Item>Use the ghost button when working on backgrounds of a darker color or when you need to give a subtle color treatment</Figure.Item>
    <Figure.Item>The maximum string length of any button, including spaces, should be 20 characters</Figure.Item>
  </Figure>
  <Figure recommendation="no" title="Don't">
    <Figure.Item>Use more than one primary button per section of content
</Figure.Item>
    <Figure.Item>Use the ghost button excessively or when another variant would work</Figure.Item>
  </Figure>
</Guidelines>
```

```js
---
guidelines: true
---
<Guidelines>
  <Figure recommendation="a11y" title="Accessibility">
    <Figure.Item>When using ghost, icon, or link variants on a dark background, use the <code>*-inverse</code> variant to ensure adequate contrast</Figure.Item>
    <Figure.Item>Ensure buttons can be activated with both Enter and Spacebar keys</Figure.Item>
    <Figure.Item>Disabled buttons do not need to meet color contrast ratio requirements or receive keyboard focus but should be read as "disabled" or "dimmed" by screen readers</Figure.Item>
    <Figure.Item>Icon only buttons must have ScreenReaderContent added so screen readers indicate what the button is used for</Figure.Item>
    <Figure.Item>For more details about keyboard functionality see the <Link href="/#accessibility">Accessibility</Link> section</Figure.Item>
  </Figure>
</Guidelines>
```
