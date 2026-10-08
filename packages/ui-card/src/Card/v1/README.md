---
describes: Card
---

Use `<Card />` as a basic wrapper for grouping related content with padding,
border radius, shadow, and background color.

Card has three internal width breakpoints. It measures its own rendered width and scales its
padding and border radius from that, so the same markup works in a narrow
sidebar and in a wide main region.

```js
---
type: example
---
<Card>
  <Heading level="h3" margin="0 0 x-small 0">
    Base card
  </Heading>
  <Text variant="content">Content goes here.</Text>
</Card>
```

### Variants

`variant` picks the surface treatment:

- `base` _(default)_ draws a background color and a shadow. Use it for a Card
  that sits on the page background.
- `nested` draws a thin border and no background or shadow. Use it inside a
  `base` Card

```js
---
type: example
---
<Card variant="base">
  <Heading level="h3" margin="0 0 x-small 0">
    Base card
  </Heading>
  <Text variant="content">Draws a background color and a shadow.</Text>
  <Card variant="nested">
    <Heading level="h4" margin="0 0 x-small 0">
      Nested card
    </Heading>
    <Text variant="content">
      Draws a border and borrows the surface behind it.
    </Text>
  </Card>
</Card>
```

### Responsive padding and border radius

The `Card`'s width always fills the container. It will set its own padding and border radius responsively, depending on its own width. Use responsive containers (like flex or grid) to build responsive layouts with `Card`
Drag the right edge of the panel below to watch the steps change.

```js
---
type: example
---
<div
  style={{
    resize: 'horizontal',
    overflow: 'auto',
    minWidth: '10rem',
    maxWidth: '100%',
    border: '1px dashed #999',
    padding: '0.5rem'
  }}
>
  <Card>
    <Text variant="content">
      Drag this panel's right edge to see padding and border radius change.
    </Text>
  </Card>
</div>
```

### Guidelines

```js
---
type: embed
---
<Guidelines>
  <Figure recommendation="yes" title="Do">
    <Figure.Item>
      Place a <code>nested</code> Card inside a <code>base</code> Card
    </Figure.Item>
    <Figure.Item>
      Use a flex or grid layout when placing several <code>nested</code> Cards
      side by side, so they can reflow to fit the available width
    </Figure.Item>
  </Figure>
  <Figure recommendation="no" title="Don't">
    <Figure.Item>
      Place a <code>base</code> Card inside another <code>base</code> Card
    </Figure.Item>
    <Figure.Item>
      Place a <code>nested</code> Card outside of a <code>base</code> Card
    </Figure.Item>
  </Figure>
</Guidelines>
```
