---
describes: Button
---

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
    Primary button
  </Button>
  <Button href="https://instructure.github.io/instructure-ui/" variant="success" margin="0 x-small 0 0">
    Success button
  </Button>
  <Button variant="danger" margin="0 x-small 0 0">
    Danger button
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
  <Button margin="0 x-small 0 0" icon={IconPlus.Solid}>
    Button label
  </Button>
  <Button margin="0 x-small 0 0" icon={IconUser.Solid}>
    <ScreenReaderContent>Accessible button label</ScreenReaderContent>
  </Button>
</div>
```

The following Button variants should only be used with a single icon.

```js
---
example: true
---
<div>
  <Button variant="icon" margin="0 x-small 0 0" icon={IconPlus.Solid}>
    <ScreenReaderContent>Accessible button label</ScreenReaderContent>
  </Button>
  <Button variant="circle-primary" margin="0 x-small 0 0" icon={IconPlus.Solid}>
    <ScreenReaderContent>Accessible button label</ScreenReaderContent>
  </Button>
  <Button variant="circle-danger" icon={IconX.Solid}>
    <ScreenReaderContent>Accessible button label</ScreenReaderContent>
  </Button>
</div>
```

### Inverse variants

```js
---
example: true
inverse: true
---
<div>
  <Button variant="ghost-inverse" margin="0 x-small 0 0">Ghost Button</Button>
  <Button variant="icon-inverse" icon={IconUser.Solid}>
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
  <Button size="small" margin="0 x-small 0 0">Small-size button</Button>
  <Button margin="0 x-small 0 0">Default-size button</Button>
  <Button size="large">Large-size button</Button>
</div>
```

### `fluidWidth`
Set the `fluidWidth` prop if you want the button to fill the width of its container element
and wrap the text.

```js
---
example: true
---
<Button fluidWidth icon={IconUser.Solid}>{lorem.paragraph()}</Button>
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
    const text = 'Button label text'
    const fullButton = matches.includes('fullButton')

    return (
      <View borderWidth="small" background="default" padding="small" as="div">
        <Text as="div">The <code>fullButton</code> query is <b>{fullButton ? 'true' : 'false'}</b>.</Text>
        <Button icon={IconUser.Solid} margin="small 0 0">
          {(fullButton) ? text : <ScreenReaderContent>{text}</ScreenReaderContent>}
        </Button>
      </View>
    )
  }}
</Responsive>
```
