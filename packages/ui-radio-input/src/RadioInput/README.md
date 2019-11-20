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
  label="See RadioInputGroup for more details"
  value="foo"
  name="bar"
  checked
/>
```
### Guidelines

```js
---
guidelines: true
---
<Guidelines>
  <Figure recommendation="yes" title="Do">
    <Figure.Item>Use sentence-style capitalization</Figure.Item>
    <Figure.Item>Use a clear and concise label for RadioInput</Figure.Item>
    <Figure.Item>Optionally include a heading to provide further clarity</Figure.Item>
  </Figure>
  <Figure recommendation="no" title="Don't">
    <Figure.Item>Have a single RadioInput</Figure.Item>
    <Figure.Item>Use long labels for RadioInput</Figure.Item>
    <Figure.Item>Display more than two radio inputs horizontally</Figure.Item>
  </Figure>
</Guidelines>
```
