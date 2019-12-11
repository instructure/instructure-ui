---
describes: DeprecatedTag
id: DeprecatedTag__README
---

**DEPRECATED:** Tag will be removed from `ui-elements` in version 7.0.0. Use [Tag](#Tag) from [ui-tag](#ui-tag) instead. Codemods are available to automatically update imports to the new package.
***

Use `<Tag />` to represent a category or group in a form.

```js
---
example: true
---
<DeprecatedTag text="Static" margin="0 xx-small 0 0" />
```

### Dismissible

When the `dismissible` prop is added to a clickable Tag, the button
renders an X/close icon (the Tag should be dismissed via the `onClick`
prop).

```js
---
example: true
---
<DeprecatedTag
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
example: true
---
<DeprecatedTag
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
example: true
---
<div>
  <DeprecatedTag text="Small" size="small" margin="0 xx-small 0 0" />
  <DeprecatedTag text="Medium" margin="0 xx-small 0 0" />
  <DeprecatedTag text="Large" size="large" margin="0 xx-small 0 0" />
</div>
```

### Max-width

```js
---
example: true
---
<DeprecatedTag
  text="Long string of text designed to trigger overflow"
/>
```

### Inline variant

This variant is designed to look similar to the surrounding text.

```js
---
example: true
---
<p>
  This is an
  <DeprecatedTag
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
guidelines: true
---
<Guidelines>
  <Figure recommendation="a11y" title="Accessibility">
    <Figure.Item>When implementing dismissable tags, be sure to add AccessibleContent to clarify that the tag is dismissible to screen readers</Figure.Item>
  </Figure>
</Guidelines>
```
