---
describes: Pill
---

Displays short, contextual information about an item. Change the border
and text color via the `variant` prop. Use the `margin` prop to add space around
the component.

```js
---
example: true
---
<div>
    <Pill
      text="Excused"
      margin="x-small"
    />
    <Pill
      variant="danger"
      text="Missing"
      margin="x-small"
    />
    <Pill
      variant="success"
      text="Checked In"
      margin="x-small"
    />
    <Pill
      variant="primary"
      text="Draft"
      margin="x-small"
    />
    <Pill
      variant="warning"
      text="Late"
      margin="x-small"
    />
    <Pill
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
<Pill
  text="Long text that will force max-width overflow"
/>
```
