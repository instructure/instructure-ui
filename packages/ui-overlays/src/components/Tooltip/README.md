---
describes: Tooltip
---

Tooltips are small contextual overlays that appear on hover or focus.

### What about 'focusable' elements?

Content provided to the `tip` property should not contain any `focusable` elements. If you'd like to do
that you should use the [Popover](#Popover) component and handle focus management yourself or
consider using a [Modal](#Modal) or a [Tray](#Tray) as those will work better on smaller screens.

```js
---
example: true
---
<div>
  <p>
    <Tooltip
      tip="Hello. I'm a tool tip"
      as={Link}
      href="https://instructure.github.io/instructure-ui/"
      mountNode={() => document.getElementById('main')}
    >
      Hover or focus me
    </Tooltip>
  </p>
  <p>
    <Tooltip
      tip="Hello"
      placement="end"
      as={Button}
      mountNode={() => document.getElementById('main')}
    >
      Hover or focus me
    </Tooltip>
  </p>
  <p>
    <Tooltip
      variant="inverse"
      tip="Hello"
      placement="bottom"
      mountNode={() => document.getElementById('main')}
    >
      <TextInput
        inline
        label="Enter some text"
      >
        Hover or focus me
      </TextInput>
    </Tooltip>
  </p>
</div>
```
