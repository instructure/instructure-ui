---
describes: Tag
---

### Use `<Tag />` to represent a category or group in a form

Tag can be static (informational only) or clickable (when the `onClick` prop is
supplied).

```js
---
example: true
---
<div>
  <Tag text="Static" margin="0 xx-small 0 0" />
  <Tag
    text="Clickable"
    margin="0 xx-small 0 0"
    onClick={function () {
      alert("This Tag was clicked")
    }}
  />
  <Tag
    disabled
    text="Disabled clickable"
    onClick={function () {
      alert("This Tag was clicked")
    }}
  />
</div>
```

### Dismissible

When the `dismissible` prop is added to a clickable Tag, the button
renders an X/close icon (the Tag should be dismissed via the `onClick`
prop).

#### Be sure to add accessible screen reader content to clarify that the tag is dismissible.

```js
---
example: true
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

### Sizes

`medium` is the default Tag size.

```js
---
example: true
---
<div>
  <Tag text="Small" size="small" margin="0 xx-small 0 0" />
  <Tag text="Medium" margin="0 xx-small 0 0" />
  <Tag text="Large" size="large" margin="0 xx-small 0 0" />
</div>
```

### Disabled

A `disabled` Tag.

```js
---
example: true
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

### Max-width

```js
---
example: true
---
<Tag
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
