---
describes: Heading
---

Heading is a component for creating typographic headings.

### Variant

Variant covers almost all use cases for headings on pages. Their name reflects the places they meant to be used. It takes care of the style of the heading

```js
---
type: embed
---
<Alert variant="info">
  <List margin="0 0 medium">
    <List.Item>For legacy reasons, each <code>variant</code> has a default <code>level</code> set. This is not the recommended way and will be removed in a later major release. Please always specify the <code>level</code>!</List.Item>
    <List.Item>When <code>variant</code> is set the <code>as</code> prop is ignored</List.Item>
    <List.Item>A11Y GUIDELINE: There can be only one <code>h1</code> tag in a page</List.Item>
    <List.Item>A11Y GUIDELINE: <code>h</code> tags can not skip a level, so for example an <code>h1</code> followed by an <code>h3</code> not allowed</List.Item>
  </List>
</Alert>
```

```js
---
type: example
---
  <div>
    <Heading variant="titlePageDesktop" level="h1"> titlePageDesktop </Heading><br/>
    <Heading variant="titlePageMobile" level="h1"> titlePageMobile </Heading><br/>
    <Heading variant="titleSection" level="h2"> titleSection </Heading><br/>
    <Heading variant="titleCardSection" level="h2"> titleCardSection </Heading><br/>
    <Heading variant="titleModule" level="h2"> titleModule </Heading><br/>
    <Heading variant="titleCardLarge" level="h3"> titleCardLarge </Heading><br/>
    <Heading variant="titleCardRegular" level="h3"> titleCardRegular </Heading><br/>
    <Heading variant="titleCardMini" level="h4"> titleCardMini </Heading><br/>
    <Heading variant="label" level="h5"> label </Heading><br/>
    <Heading variant="labelInline" level="h6"> labelInline </Heading><br/>
  </div>
```

### AI Heading

Pre-configured and with unique styles, the `ai-headings` are used for standardized, ai-related components.

```js
---
type: example
---
<div style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
 <Heading aiVariant="stacked">Nutrition Facts</Heading>
 <Heading aiVariant="horizontal">Nutrition Facts</Heading>
 <Heading aiVariant="iconOnly">Nutrition Facts</Heading>
</div>
```

### Heading level

What DOM element is output is determined in the following order:

1. (deprecated) If the variant prop is set, then the value of level prop. If variant is set but level is not, <h1>-<h6> based on the variant prop's value.
2. The value of the `as` prop
3. The value of the `level` prop
4. `<h2>`

The `variant` and `level` props sets its appearance in this order.

```js
---
type: example
---
<div>
  <Heading level="h1" as="h3" margin="0 0 x-small">This renders as <code>&lt;h3&gt;</code></Heading>
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

### Icons

With the `renderIcon` prop, an icon can be rendered before the text.

```js
---
type: example
---
<div>
 <Heading renderIcon={<IconAdminSolid/>}>I am heading with icon</Heading>
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
