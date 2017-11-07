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

A `readonly` CheckboxGroup:

```js
---
example: true
---
<CheckboxGroup
  name="sports3"
  onChange={function (value) { console.log(value) }}
  defaultValue={['soccer', 'volleyball']}
  description="I wish to receive score alerts for"
  readOnly
>
  <Checkbox label="Football" value="football" variant="toggle" />
  <Checkbox label="Basketball" value="basketball" variant="toggle" />
  <Checkbox label="Volleyball" value="volleyball" variant="toggle" />
  <Checkbox label="Soccer" value="soccer" variant="toggle" />
</CheckboxGroup>
```

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
