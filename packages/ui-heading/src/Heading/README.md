---
describes: Heading
---

Heading is a component for creating typographic headings.

## Variant

Variant covers almost all use cases for headings on pages. Their name reflects the places they meant to be used. It sets the `level` prop and takes care of the style of the heading
We recommend using `variants` instead of the `level` (and `as`) props.

NOTE: when `variant` is set, `level` and `as` props are ignored

```js
---
type: example
---
  <div>
    <Heading variant="titlePageDesktop"> titlePageDesktop </Heading><br/>
    <Heading variant="titlePageMobile"> titlePageMobile </Heading><br/>
    <Heading variant="titleSection"> titleSection </Heading><br/>
    <Heading variant="titleCardSection"> titleCardSection </Heading><br/>
    <Heading variant="titleModule"> titleModule </Heading><br/>
    <Heading variant="titleCardLarge"> titleCardLarge </Heading><br/>
    <Heading variant="titleCardRegular"> titleCardRegular </Heading><br/>
    <Heading variant="titleCardMini"> titleCardMini </Heading><br/>
    <Heading variant="label"> label </Heading><br/>
    <Heading variant="labelInline"> labelInline </Heading><br/>
  </div>
```

```js
---
type: example
---
<Heading>Default Heading</Heading>
```

### Heading level

Generate content headings, from h1 to h5. Use the `margin` prop to add margin.

- The `as` prop controls what html element is output. _(if not defined it will default to level)._
- The `level` prop sets its appearance.

```js
---
type: example
---
<div>
  <Heading level="h1" as="h2" margin="0 0 x-small">Heading level One</Heading>

</div>
```

### Heading colors

The default is for the color to inherit, but it can be set to `primary` or `secondary` via the `color` prop. Note there is an inverse option available as well: `primary-inverse` or `secondary-inverse` (_see inverse example below_).

```js
---
type: example
---
<div>
  <Heading>I inherit my color via the CSS cascade (default)</Heading>
  <Heading color="primary">I am primary color</Heading>
  <Heading color="secondary">I am secondary color</Heading>
</div>
```

```js
---
type: example
---
<View background="primary-inverse" as="div">
  <Heading color="primary-inverse">I am primary-inverse color</Heading>
  <Heading color="secondary-inverse">I am secondary-inverse color</Heading>
</View>
```

### Heading borders

The default is no borders. However, using the `border` prop, you can
add either `top` or `bottom` borders to your heading.

```js
---
type: example
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
type: example
---
<Heading level="h2">
  <TruncateText>{lorem.paragraph()}</TruncateText>
</Heading>
```

### Guidelines

```js
---
type: embed
---
<Guidelines>
  <Figure recommendation="a11y" title="Accessibility">
    <Figure.Item>Each page should always contain one and only one H1</Figure.Item>
    <Figure.Item>Headings should be used in logical order</Figure.Item>
    <Figure.Item>Headings should not be used to format text</Figure.Item>
  </Figure>
</Guidelines>
```
