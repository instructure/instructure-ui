---
describes: Heading
---

Generate content headings, from h1 to h5. The `as` prop controls what
html element is outputted. The `level` prop sets its appearance.
Use the `margin` prop to give the Heading margin.

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
  <Heading level="reset" as="h2">Heading level reset</Heading>
</div>
```

### Colors

Headings default to the theme's 'oxford' text color. However, the text color
can be changed, if desired.

```js
---
example: true
---
<div>
  <Heading>I inherit my color via the CSS cascade (default)</Heading>
  <Heading color="primary">I am primary color</Heading>
  <Heading color="secondary">I am secondary color</Heading>
  <Heading color="brand">I am brand color</Heading>
  <Heading color="success">I am success color</Heading>
  <Heading color="warning">I am warning color</Heading>
  <Heading color="error">I am error/danger color</Heading>
</div>
```

```js
---
example: true
inverse: true
---
<div>
  <Heading color="primary-inverse">I am primary-inverse color</Heading>
  <Heading color="secondary-inverse">I am secondary-inverse color</Heading>
</div>
```

### Borders

`Heading` defaults to no borders. However, using the `border` prop, you can
add either `top` or `bottom` borders to your heading.

```js
---
example: true
---
<div>
  <Heading border="bottom" level="h5">I have a bottom border</Heading>
  <br />
  <br />
  <Heading border="top">I have a top border</Heading>
</div>
```

### Ellipsis text overflow

When the `ellipsis` prop is `true`, the Heading text will no longer
wrap. Any overflow will be truncated with an ellipsis `...`

```js
---
example: true
---
<Heading level="h1" ellipsis>{lorem.paragraph()}</Heading>
```
