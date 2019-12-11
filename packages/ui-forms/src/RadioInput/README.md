---
describes: DeprecatedRadioInput
id: DeprecatedRadioInput__README
---

**DEPRECATED:** RadioInput will be removed from `ui-forms` in version 7.0.0. Use the [RadioInput](#RadioInput) from [ui-radio-input](#ui-radio-input) instead. Codemods are available to automatically update imports to the new package.
***

By default, the RadioInput component is a custom styled HTML radio button.

Adjust the size of the RadioInput and its label text via the `size` prop. The default size is
`medium`.

```js
---
example: true
---
<DeprecatedRadioInput
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
