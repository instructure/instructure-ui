---
describes: DeprecatedHeading
id: DeprecatedHeading__README
---

**DEPRECATED:** Heading will be removed from `ui-elements` in version 7.0.0. Use [Heading](#Heading) from [ui-heading](#ui-heading) instead. Codemods are available to automatically update imports to the new package.
***

```js
---
example: true
---
<DeprecatedHeading>Default Heading</DeprecatedHeading>
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
  <DeprecatedHeading level="h1" as="h2" margin="0 0 x-small">Heading level One</DeprecatedHeading>
  <DeprecatedHeading level="h2" as="h1" margin="0 0 x-small">Heading level Two</DeprecatedHeading>
  <DeprecatedHeading level="h3" margin="0 0 x-small">Heading level Three</DeprecatedHeading>
  <DeprecatedHeading level="h4" margin="0 0 x-small">Heading level Four</DeprecatedHeading>
  <DeprecatedHeading level="h5" margin="0 0 x-small">Heading level Five</DeprecatedHeading>
  <DeprecatedHeading level="reset" as="h2">Heading level reset as a Two</DeprecatedHeading>
</div>
```

### Heading colors
The default is for the color to inherit, but it can be set to `primary` or `secondary` via the `color` prop. Note there is an inverse option available as well: `primary-inverse` or `secondary-inverse` (_see inverse example below_).
```js
---
example: true
---
<div>
  <DeprecatedHeading>I inherit my color via the CSS cascade (default)</DeprecatedHeading>
  <DeprecatedHeading color="primary">I am primary color</DeprecatedHeading>
  <DeprecatedHeading color="secondary">I am secondary color</DeprecatedHeading>
</div>
```

```js
---
example: true
background: 'checkerboard-inverse'
---
<div>
  <DeprecatedHeading color="primary-inverse">I am primary-inverse color</DeprecatedHeading>
  <DeprecatedHeading color="secondary-inverse">I am secondary-inverse color</DeprecatedHeading>
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
  <DeprecatedHeading level="h1" border="bottom">I have a bottom border</DeprecatedHeading>
  <br />
  <br />
  <DeprecatedHeading border="top" level="h3">I have a top border</DeprecatedHeading>
</div>
```

### Ellipsis text overflow

When the `ellipsis` prop is `true`, the Heading text will no longer
wrap. Any overflow will be truncated with an ellipsis `...`

```js
---
example: true
---
<DeprecatedHeading level="h2" ellipsis>{lorem.paragraph()}</DeprecatedHeading>
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
