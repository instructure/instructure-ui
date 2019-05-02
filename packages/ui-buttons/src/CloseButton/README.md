---
describes: CloseButton
---

A `CloseButton` component (used in closable/dismissible components).
See [Alert](#Alert), [Popover](#Popover), [Modal](#Modal) and [Tray](#Tray).

See [Button](#Button) for properties.

```js
---
example: true
---
<CloseButton offset="none">Close</CloseButton>
```

### Guidelines

```js
---
guidelines: true
---
<Guidelines>
  <Figure recommendation="a11y" title="Accessibility">
    <Figure.Item>Use the <code>icon-inverse</code> variant when a CloseButton appears on a dark background to ensure adequate contrast</Figure.Item>
    <Figure.Item>Ensure the CloseButton is labeled correctly so screen readers announce what action will be taken when selected</Figure.Item>
  </Figure>
</Guidelines>
```
