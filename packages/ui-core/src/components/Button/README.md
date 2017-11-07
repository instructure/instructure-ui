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

Button variants for different contexts using the `variant` prop are shown below. Note also
the `margin` prop used to add space between the buttons.

Note that for non-icon-variant buttons, SVG icons imported from
[instructure-icons](http://instructure.github.io/instructure-icons/)
will be sized appropriately and given right-margin to offset them from the text.

```js
---
example: true
---
<div>
  <Button variant="primary" margin="0 x-small 0 0">
    Primary button
  </Button>
  <Button href="https://instructure.github.io/instructure-ui/" variant="success" margin="0 x-small 0 0">
    <PlaceholderIcon />
    Success button
  </Button>
  <Button variant="danger" margin="0 x-small 0 0">
    Danger button
  </Button>
  <Button variant="light" margin="0 x-small 0 0">
    Light Button
  </Button>
  <Button variant="ghost" margin="0 x-small 0 0">
    <IconPlus />
    Ghost Button
  </Button>
  <Button variant="link">
    <PlaceholderIcon />
    Link Button
  </Button>
</div>
```

Buttons with icons:

```js
---
example: true
---
<div>
  <Button variant="icon" margin="0 x-small 0 0">
    <PlaceholderIcon title="Accessible Button Label" />
  </Button>
  <Button variant="circle-primary" margin="0 x-small 0 0">
    <IconPlus title="Accessible Button Label" />
  </Button>
  <Button variant="circle-danger">
    <IconX title="Accessible Button Label" />
  </Button>
</div>
```

Inverse variants:

```js
---
example: true
inverse: true
---
<div>
  <Button variant="ghost-inverse" margin="0 x-small 0 0">Ghost Button</Button>
  <Button variant="icon-inverse">
    <PlaceholderIcon title="Accessible Button Label" />
  </Button>
  <Button variant="link-inverse">Link Button</Button>
</div>
```

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

Set the `fluidWidth` prop if you want the button to fill the width of its container element
and wrap the text.

```js
---
example: true
---
<div>
  <div style={{width: 300}}>
    <Button fluidWidth size="small">Small fluidWidth button</Button>
    <br />
    <Button fluidWidth size="small">
      <b>Small fluidWidth Button with line breaks.</b> {lorem.sentence()}
    </Button>
    <br />
    <Button fluidWidth>Medium fluidWidth button</Button>
    <br />
    <Button fluidWidth>
      <b>Medium fluidWidth Button with line breaks.</b> {lorem.sentence()}
    </Button>
    <br />
    <Button fluidWidth size="large" href="http://instructure.github.io/instructure-ui">
      Large fluidWidth link-button
    </Button>
    <br />
    <Button fluidWidth size="large">
      <b>Large fluidWidth Button with line breaks.</b> {lorem.sentence()}
    </Button>
  </div>
</div>
```
