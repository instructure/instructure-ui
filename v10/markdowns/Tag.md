# Tag


Use `<Tag />` to represent a category or group in a form.

```js
---
type: example
---
<Tag text="Static" margin="0 xx-small 0 0" />
```

### Dismissible

When the `dismissible` prop is added to a clickable Tag, the button
renders an X/close icon (the Tag should be dismissed via the `onClick`
prop). When implementing dismissable tags, be sure to add [AccessibleContent](#AccessibleContent) to clarify that the tag is dismissible to screen readers.

```js
---
type: example
---
<Tag
  text={
    <AccessibleContent alt="Remove dismissible tag">
      Dismissible tag
    </AccessibleContent>
  }
  dismissible
  margin="0 xx-small 0 0"
  onClick={function () {
    alert("This Tag was dismissed")
  }}
/>
```

### Disabled

A `disabled` Tag.

```js
---
type: example
---
<Tag
  text="Dismissible Disabled"
  dismissible
  disabled
  margin="0 xx-small 0 0"
  onClick={function () {
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
  <Tag text="Small" size="small" margin="0 xx-small 0 0" />
  <Tag text="Medium" margin="0 xx-small 0 0" />
  <Tag text="Large" size="large" margin="0 xx-small 0 0" />
</div>
```

### Max-width

```js
---
type: example
---
<Tag
  text="Long string of text designed to trigger overflow"
/>
```

### Inline variant

This variant is designed to look similar to the surrounding text.

```js
---
type: example
---
<p>
  This is an
  <Tag
    dismissible
    onClick={() => alert('Tag dismissed')}
    size="large"
    text={<AccessibleContent alt="Remove 'inline'">
      inline
    </AccessibleContent>}
    variant="inline"
  />
  tag.
</p>
```

### Guidelines

```js
---
type: embed
---
<Guidelines>
  <Figure recommendation="a11y" title="Accessibility">
    <Figure.Item>When implementing dismissable tags, be sure to add AccessibleContent to clarify that the tag is dismissible to screen readers</Figure.Item>
  </Figure>
</Guidelines>
```


### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| Tag | className | `string` | No | - |  |
| Tag | text | `string \| React.ReactNode` | Yes | - |  |
| Tag | title | `string` | No | - | @deprecated since version 10 Use of the title attribute is highly problematic due to accessibility concerns |
| Tag | disabled | `boolean` | No | `false` | Whether or not to disable the tag |
| Tag | readOnly | `boolean` | No | `false` | Works just like disabled but keeps the same styles as if it were active |
| Tag | dismissible | `boolean` | No | `false` |  |
| Tag | margin | `Spacing` | No | - | Valid values are `0`, `none`, `auto`, `xxxx-small`, `xx-small`, `x-small`, `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via familiar CSS-like shorthand. For example: `margin="small auto large"`. |
| Tag | onClick | `(event: React.MouseEvent<ViewProps & Element>) => void` | No | - | If you add an onClick prop, Tag renders as a clickable button |
| Tag | elementRef | `(element: Element \| null) => void` | No | - | Provides a reference to the underlying html root element |
| Tag | size | `'small' \| 'medium' \| 'large'` | No | `'medium'` |  |
| Tag | variant | `'default' \| 'inline'` | No | `'default'` |  |

### Usage

Install the package:

```shell
npm install @instructure/ui-tag
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { Tag } from '@instructure/ui-tag'
```

