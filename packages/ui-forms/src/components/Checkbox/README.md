---
describes: Checkbox
---

By default, the Checkbox component is a custom styled HTML checkbox. To default the checkbox to checked,
set the `defaultChecked` prop.

Adjust the size of the checkbox and label text via the `size` prop. The default size is
`medium`.

```js
---
example: true
---
<Checkbox label={lorem.sentence()} value="medium" defaultChecked />
```

The default Checkbox in its disabled state:

```js
---
example: true
---
<CheckboxGroup
  defaultValue={['medium']}
  name="example"
  description={<ScreenReaderContent>Checkbox examples</ScreenReaderContent>}
>
  <Checkbox label={lorem.sentence()} value="medium" disabled />
  <Checkbox label={lorem.sentence()} value="small" disabled />
</CheckboxGroup>
```

Setting the `variant` prop to `toggle` turns the checkbox into a toggle switch.

```js
---
example: true
---
<FormFieldGroup description={<ScreenReaderContent>Checkbox examples</ScreenReaderContent>}>
  <Checkbox label="Small size" value="small" variant="toggle" size="small" defaultChecked />
  <Checkbox label="Medium size" value="medium" variant="toggle" />
  <Checkbox label="Large size" value="large" variant="toggle" size="large" defaultChecked />
</FormFieldGroup>
```

You might want to hide the label text when using the toggle switch variant. Do that by wrapping
the text in the [ScreenReaderContent](#ScreenReaderContent) component.

```js
---
example: true
---
<Checkbox
  label={<ScreenReaderContent>Screenreader-accessible label</ScreenReaderContent>}
  value="accessible"
  variant="toggle"
/>
```
