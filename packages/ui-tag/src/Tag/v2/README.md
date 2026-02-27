---
describes: Tag
---

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
prop). When implementing dismissable tags, be sure to add [AccessibleContent](AccessibleContent) to clarify that the tag is dismissible to screen readers.

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

> **DEPRECATED** Please do not make Tags that have overflowing text, it's an a11y anti-pattern. The issue is if text overflows it cannot be read by keyboard-only users. We could make the Tag focusable, but that would be an anti-pattern too because only elements that are interactive should be focusable (and just displaying a tooltip is not a real interaction)

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
<Text as="p">
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
</Text>
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
