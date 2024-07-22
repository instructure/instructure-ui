---
describes: Pill
---

Displays short, contextual information about an item. Change the border
and text color via the `color` prop. Use the `margin` prop to add space around
the component. Use the `renderIcon` prop to add an icon to the left of the text. Additionally,
you can use the `statusLabel` prop to add a label to the left of the main text.

```js
---
type: example
---
<div>
  <Pill
    margin="x-small"
  >
    Excused
  </Pill>
  <Pill
    statusLabel="Status"
    color="info"
    margin="x-small"
  >
    Draft
  </Pill>
  <Pill
    statusLabel="Status"
    renderIcon={<IconCheckLine />}
    color="success"
    margin="x-small"
  >
    Checked In
  </Pill>
  <Pill
    renderIcon={<IconEndLine />}
    color="danger"
    margin="x-small"
  >
    Missing
  </Pill>
  <Pill
    renderIcon={<IconClockLine />}
    color="warning"
    margin="x-small"
  >
    Late
  </Pill>
  <Pill
    renderIcon={<IconMessageLine />}
    color="alert"
    margin="x-small"
  >
    Notification
  </Pill>
</div>
```

The component has a max-width, set by its theme. Any overflowing text will
be handled via ellipses.

```js
---
type: example
---
<Pill>
  Supercalifragilisticexpialidocious bear
</Pill>
```

### Guidelines

```js
---
type: embed
---
<Guidelines>
  <Figure recommendation="no" title="Don't">
    <Figure.Item>Use more than 2 words for the main text</Figure.Item>
    <Figure.Item>Use more than 2 words for the statusLabel</Figure.Item>
    <Figure.Item>Use for dismissible items (use a <Link href="/#Tag">Tag</Link> instead)</Figure.Item>
    <Figure.Item>Use for counts (use a <Link href="/#Badge">Badge</Link> instead)</Figure.Item>
    <Figure.Item>Put actions next to the text</Figure.Item>
  </Figure>
</Guidelines>
```
