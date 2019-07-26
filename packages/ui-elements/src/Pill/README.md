---
describes: DeprecatedPill
id: DeprecatedPill__README
---
**DEPRECATED:** Pill will be removed from `ui-elements` in version 7.0.0. Use the [Pill from ui-pill](#Pill) instead.

### Important Upgrade Notes
Codemods are available to automatically update imports to the new package as well as any props that have changed. These changes and other things to note are described below.

The `text` prop has switched to `children`. The `variant` prop has switched to `color`.

Within the updated `color` prop:
- **default** is now `primary`
- **primary** is now `info`
- **message** is now `alert`

***

### DeprecatedPill

Displays short, contextual information about an item. Change the border
and text color via the `color` prop. Use the `margin` prop to add space around
the component.

```js
---
example: true
---
<div>
  <DeprecatedPill
    text="Excused"
    margin="x-small"
  />
 <DeprecatedPill
    variant="danger"
   text="Missing"
    margin="x-small"
  />
<DeprecatedPill
   variant="success"
   text="Checked In"
   margin="x-small"
 />
 <DeprecatedPill
   variant="primary"
   text="Draft"
   margin="x-small"
 />
 <DeprecatedPill
   variant="warning"
   text="Late"
   margin="x-small"
 />
 <DeprecatedPill
   variant="message"
   text="Notification"
   margin="x-small"
 />
</div>
```

The component has a max-width, set by its theme. Any overflowing text will
be handled via ellipses.
 
```js
---
example: true
---
<DeprecatedPill
  text="extraordinary superfluousness"
/>
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
