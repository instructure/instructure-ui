---
describes: CheckboxGroup
---

A `<CheckboxGroup/>` is a group of [Checkbox](#Checkbox) components that share the same name. You can
set an array `value` for the entire group and it will handle setting the `checked` and `name` props for you.
The Checkbox components can be rendered vertically or horizontally using the `layout` property.

```js
---
example: true
---
<FormFieldGroup description={<ScreenReaderContent>CheckboxGroup examples</ScreenReaderContent>}>
  <CheckboxGroup name="sports"
    onChange={function (value) { console.log(value) }}
    defaultValue={['football', 'volleyball']}
    description="Select your favorite sports"
  >
    <Checkbox label="Football" value="football" />
    <Checkbox label="Basketball" value="basketball" />
    <Checkbox label="Volleyball" value="volleyball" />
    <Checkbox label="Other" value="other" />
  </CheckboxGroup>
  <CheckboxGroup name="sports" size="small"
    layout="columns"
    onChange={function (value) { console.log(value) }}
    defaultValue={['football', 'volleyball']}
    description="Select your favorite sports"
  >
    <Checkbox label="Football" value="football" />
    <Checkbox label="Basketball" value="basketball" />
    <Checkbox label="Volleyball" value="volleyball" />
    <Checkbox label="Other" value="other" />
  </CheckboxGroup>
</FormFieldGroup>
```

The `toggle` variant with `layout` prop set to `inline` and an error message:

```js
---
example: true
---
<CheckboxGroup
  name="sports2"
  layout="inline"
  messages={[
    { text: 'Invalid name', type: 'error' }
  ]}
  onChange={function (value) { console.log(value) }}
  defaultValue={['soccer', 'volleyball']}
  description="I wish to receive score alerts for"
>
  <Checkbox label="Football" value="football" variant="toggle" />
  <Checkbox label="Basketball" value="basketball" variant="toggle" />
  <Checkbox label="Volleyball" value="volleyball" variant="toggle" />
  <Checkbox label="Soccer" value="soccer" variant="toggle" />
</CheckboxGroup>
```

You can set disable/readonly on a group and it works much the same way as a RadioInputGroup.

A `disabled` CheckboxGroup:

```js
---
example: true
---
<CheckboxGroup
  name="sports4"
  onChange={function (value) { console.log(value) }}
  defaultValue={['soccer', 'volleyball']}
  description="I wish to receive score alerts for"
  disabled
>
  <Checkbox label="Football" value="football" variant="toggle" />
  <Checkbox label="Basketball" value="basketball" variant="toggle" />
  <Checkbox label="Volleyball" value="volleyball" variant="toggle" />
  <Checkbox label="Soccer" value="soccer" variant="toggle" />
</CheckboxGroup>
```
### Guidelines

```js
---
guidelines: true
---
<Guidelines>
  <Figure recommendation="yes" title="Do">
    <Figure.Item>Align to the left side of the label</Figure.Item>
    <Figure.Item>Use when multiple selections are allowed</Figure.Item>
    <Figure.Item>Use to save space from toggles</Figure.Item>
    <Figure.Item>Stack vertically if there is more than two options to select</Figure.Item>
  </Figure>
  <Figure recommendation="no" title="Don't">
    <Figure.Item>Run more than two checkboxes horizontally</Figure.Item>
  </Figure>
</Guidelines>
```

```js
---
guidelines: true
---
<Guidelines>
  <Figure recommendation="a11y" title="Accessibility">
    <Figure.Item>Ensure CheckboxGroups are labeled correctly so screen readers announce what the group of checkboxes are used for</Figure.Item>
  </Figure>
</Guidelines>
```
