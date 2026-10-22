---
describes: Tag
---

Use `<Tag />` to represent a category or group in a form.

```js
---
type: example
---
<Tag text="Static" margin="0 general.spaceXs 0 0" />
```

### Leading icon

Use the `renderIcon` prop to render an icon to the left
of the Tag text. The icon automatically adjusts its size
to match the Tag `size`.

```js
---
type: example
---
<Tag text="Tag with icon" renderIcon={<GlobeInstUIIcon />} />
```

### Dismissible

Provide `renderDismissButtonLabel` to render a close (X) button and make the
Tag dismissible. Its value is the close button's screen reader label, so it
must describe the dismiss action. Clicking the close
button calls `onDismiss`.

```js
---
type: example
---
<Tag
  text="Dismissible tag"
  renderDismissButtonLabel="Remove dismissible tag"
  margin="0 general.spaceXs 0 0"
  onDismiss={function () {
    alert("This Tag was dismissed")
  }}
/>
```

### Link

Provide an `href` and the Tag body renders as a link.

```js
---
type: example
---
  <Tag text="Linkable tag" href="https://instructure.design" renderIcon={<DiamondInstUIIcon />} />
```

### Disabled

A `disabled` Tag.

```js
---
type: example
---
<Tag
  text="Dismissible Disabled"
  renderDismissButtonLabel="Remove Dismissible Disabled"
  disabled
  margin="0 general.spaceXs 0 0"
  onDismiss={function () {
    alert("This Tag was dismissed. This shouldn't happen")
  }}
/>
```

### Sizes

`medium` is the default Tag size.

```js
---
type: example
---
<div>
  <Tag text="Small" size="small" margin="0 general.spaceXs 0 0" />
  <Tag text="Medium" margin="0 general.spaceXs 0 0" />
  <Tag text="Large" size="large" margin="0 general.spaceXs 0 0" />
</div>
```

### Guidelines

```js
---
type: embed
---
<Guidelines>
  <Figure recommendation="a11y" title="Accessibility">
    <Figure.Item>When implementing dismissible tags, provide a descriptive `renderDismissButtonLabel` (e.g. "Remove Summer") so screen readers announce what the close button does</Figure.Item>
  </Figure>
</Guidelines>
```
