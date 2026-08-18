# Tag


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

### Max-width

> **DEPRECATED** Please do not make Tags that have overflowing text, it's an a11y anti-pattern. The issue is if text overflows it cannot be read by keyboard-only users. We could make the Tag focusable, but that would be an anti-pattern too because only elements that are interactive should be focusable (and just displaying a tooltip is not a real interaction)

```js
---
type: example
---
<Tag
  text="Long string of text designed to trigger overflow"
/>
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


### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| Tag | className | `string` | No | - |  |
| Tag | text | `string \| React.ReactNode` | Yes | - |  |
| Tag | disabled | `boolean` | No | `false` | Whether or not to disable the tag |
| Tag | readOnly | `boolean` | No | `false` | Works just like disabled but keeps the same styles as if it were active |
| Tag | renderDismissButtonLabel | `Renderable` | No | - | Providing this prop renders a close button and makes the Tag dismissible. The value is used as the close button's screen reader label. Clicking the close button calls `onDismiss`. |
| Tag | onDismiss | `(event: React.MouseEvent<ViewProps & Element>) => void` | No | - | Called when the close button is clicked. |
| Tag | renderIcon | `Renderable` | No | - | Add an SVG icon to the left of the Tag text. Do not add icons directly as children. When using Lucide icons, Tag will automatically pass the appropriate size prop based on the Tag's `size`. |
| Tag | href | `string` | No | - | If you provide an `href`, the Tag body renders as a link (`<a>`). |
| Tag | margin | `Spacing` | No | - | Valid values are `0`, `none`, `auto`, and Spacing token values, see https://instructure.design/layout-spacing. Apply these values via familiar CSS-like shorthand. For example, `margin="general.spaceMd auto"`. |
| Tag | onClick | `(event: React.MouseEvent<ViewProps & Element>) => void` | No | - | If you add an onClick prop, Tag renders as a clickable button |
| Tag | elementRef | `(element: Element \| null) => void` | No | - | Provides a reference to the underlying html root element |
| Tag | size | `'small' \| 'medium' \| 'large'` | No | `'medium'` |  |

### Usage

Install the package:

```shell
npm install @instructure/ui-tag
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { Tag } from '@instructure/ui-tag/v11_8'
```

