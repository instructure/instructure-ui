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
  <div>
    <Pill
      text="Excused"
      margin="0 0 x-small"
    />
  </div>
  <div>
    <Pill
      variant="danger"
      text="Missing"
      margin="0 0 x-small"
    />
  </div>
  <div>
    <Pill
      variant="success"
      text="Checked In"
      margin="0 0 x-small"
    />
  </div>
  <div>
    <Pill
      variant="primary"
      text="Draft"
    />
  </div>
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
