---
describes: Pill
---

```js
---
guidelines: true
---
<Guidelines>
  <Figure recommendation="none" title="Upgrade Notes for v8.0.0">
    <Figure.Item>The <code>text</code> prop has been removed in favor of <code>children</code>.</Figure.Item>
    <Figure.Item>The <code>variant</code> prop has switched to <code>color</code></Figure.Item>
    <Figure.Item>Within the new <strong>color</strong> prop <code>default</code> is now <code>primary</code> (gray), <code>primary</code> has updated to <code>info</code> (blue) and <code>message</code> is now <code>alert</code></Figure.Item>
  </Figure>
</Guidelines>
```

Displays short, contextual information about an item. Change the border
and text color via the `color` prop. Use the `margin` prop to add space around
the component.

```js
---
example: true
---
<div>
  <Pill
    margin="x-small"
  >
    Excused
  </Pill>
  <Pill
    color="info"
    margin="x-small"
  >
    Draft
  </Pill>
  <Pill
    color="success"
    margin="x-small"
  >
    Checked In
  </Pill>
  <Pill
    color="danger"
    margin="x-small"
  >
    Missing
  </Pill>
  <Pill
    color="warning"
    margin="x-small"
  >
    Late
  </Pill>
  <Pill
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
example: true
---
<Pill>
  extraordinary superfluousness
</Pill>
```

### Guidelines


```js
---
guidelines: true
---
<Guidelines>
  <Figure recommendation="yes" title="Do">
    <Figure.Item>Use all capital letters</Figure.Item>
  </Figure>
  <Figure recommendation="no" title="Don't">
    <Figure.Item>Use more than 2 words</Figure.Item>
    <Figure.Item>Use for dismissible items (use a <Link href="/#Tag">Tag</Link> instead)</Figure.Item>
    <Figure.Item>Use for counts (use a <Link href="/#Badge">Badge</Link> instead)</Figure.Item>
    <Figure.Item>Put icons or actions next to the text</Figure.Item>
  </Figure>
</Guidelines>
```
