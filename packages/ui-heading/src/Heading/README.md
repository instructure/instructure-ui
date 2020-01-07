---
describes: Heading
---

```js
---
guidelines: true
---
<Guidelines>
  <Figure title="Upgrade Notes for v8.0.0" recommendation="none">
    <Figure.Item>
      The <code>ellipsis</code> prop will be removed. Please update your Headings to use <Link href="#TruncateText">TruncateText</Link> for ellipsis instead.
    </Figure.Item>
  </Figure>
</Guidelines>
```

Heading is a component for creating typographic headings.

```js
---
example: true
---
<Heading>Default Heading</Heading>
```

### Heading level
Generate content headings, from h1 to h5. Use the `margin` prop to add margin.
- The `as` prop controls what html element is output. _(if not defined it will default to level)._
- The `level` prop sets its appearance.

```js
---
example: true
---
<div>
  <Heading level="h1" as="h2" margin="0 0 x-small">Heading level One</Heading>
  <Heading level="h2" as="h1" margin="0 0 x-small">Heading level Two</Heading>
  <Heading level="h3" margin="0 0 x-small">Heading level Three</Heading>
  <Heading level="h4" margin="0 0 x-small">Heading level Four</Heading>
  <Heading level="h5" margin="0 0 x-small">Heading level Five</Heading>
  <Heading level="reset" as="h2">Heading level reset as a Two</Heading>
</div>
```

### Heading colors
The default is for the color to inherit, but it can be set to `primary` or `secondary` via the `color` prop. Note there is an inverse option available as well: `primary-inverse` or `secondary-inverse` (_see inverse example below_).
```js
---
example: true
---
<div>
  <Heading>I inherit my color via the CSS cascade (default)</Heading>
  <Heading color="primary">I am primary color</Heading>
  <Heading color="secondary">I am secondary color</Heading>
</div>
```

```js
---
example: true
background: 'checkerboard-inverse'
---
<div>
  <Heading color="primary-inverse">I am primary-inverse color</Heading>
  <Heading color="secondary-inverse">I am secondary-inverse color</Heading>
</div>
```

### Heading borders

The default is no borders. However, using the `border` prop, you can
add either `top` or `bottom` borders to your heading.

```js
---
example: true
---
<div>
  <Heading margin="0 0 medium" border="bottom">I have a bottom border</Heading>
  <Heading border="top">I have a top border</Heading>
</div>
```

### Ellipsis text overflow

Use [TruncateText](#TruncateText) if you need to constrain your
Heading to a single line (or certain number of lines).

```js
---
example: true
---
<Heading level="h2">
  <TruncateText>{lorem.paragraph()}</TruncateText>
</Heading>
```

### Guidelines

```js
---
guidelines: true
---
<Guidelines>
  <Figure recommendation="a11y" title="Accessibility">
    <Figure.Item>Each page should always contain one and only one H1</Figure.Item>
    <Figure.Item>Headings should be used in logical order</Figure.Item>
    <Figure.Item>Headings should not be used to format text</Figure.Item>
  </Figure>
</Guidelines>
```
