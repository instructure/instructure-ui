---
describes: Tooltip
---

Tooltip is a special type of Popover for brief supplemental content that can be navigated to via the usual document flow (__no focus trapping or close button__).
- Tooltip content should be concise word(s) that provide  a helpful hint or tip (usually related to the trigger element).
- Usually triggered by hover and focus of the trigger element.
- Tooltip uses [Popover](#Popover) internally and provides additional semantic markup and focus behavior.

> ### What was that about 'focusable' elements?
> Content provided to the `tip` property __should not contain any focusable elements__. If you'd like to do
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
