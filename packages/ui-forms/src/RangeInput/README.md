---
describes: RangeInput
---

An html5 range input/slider component. Note the default `stacked`
label &gt; input layout, and the alternate `inline` layout.

```js
---
example: true
---
<FormFieldGroup description={<ScreenReaderContent>RangeInput examples</ScreenReaderContent>}>
  <RangeInput label="Grading range" defaultValue={50} max={100} min={0} />
  <RangeInput
    layout="inline"
    label="Grading range"
    defaultValue={50}
    max={100} min={0}
  />
</FormFieldGroup>
```
