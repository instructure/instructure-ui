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
    <FigureItem>Use sentence-style capitalization</FigureItem>
    <FigureItem>Use a clear and concise label for RadioInput</FigureItem>
    <FigureItem>Optionally include a heading to provide further clarity</FigureItem>
  </Figure>
  <Figure recommendation="no" title="Don't">
    <FigureItem>Have a single RadioInput</FigureItem>
    <FigureItem>Use long labels for RadioInput</FigureItem>
    <FigureItem>Display more than two radio inputs horizontally</FigureItem>
  </Figure>
</Guidelines>
```
