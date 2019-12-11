---
describes: DeprecatedRangeInput
id: DeprecatedRangeInput__README
---

**DEPRECATED:** RangeInput will be removed from `ui-forms` in version 7.0.0. Use [RangeInput](#RangeInput) from [ui-range-input](#ui-range-input) instead. Codemods are available to automatically update imports to the new package.
***

An html5 range input/slider component. Note the default `stacked`
label &gt; input layout, and the alternate `inline` layout.

```js
---
example: true
---
<FormFieldGroup description={<ScreenReaderContent>RangeInput examples</ScreenReaderContent>}>
  <DeprecatedRangeInput label="Grading range" defaultValue={50} max={100} min={0} />
  <DeprecatedRangeInput
    layout="inline"
    label="Grading range"
    defaultValue={50}
    max={100} min={0}
  />
</FormFieldGroup>
```
