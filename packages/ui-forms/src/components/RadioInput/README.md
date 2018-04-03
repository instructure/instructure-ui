---
describes: RadioInput
---

By default, the RadioInput component is a custom styled HTML radio button.

Adjust the size of the RadioInput and its label text via the `size` prop. The default size is
`medium`.

```js
---
example: true
---
<RadioInput
  label={lorem.sentence()}
  value="foo"
  name="bar"
  checked
/>
```
