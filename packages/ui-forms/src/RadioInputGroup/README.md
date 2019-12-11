---
describes: DeprecatedRadioInputGroup
id: DeprecatedRadioInputGroup__README
---

**DEPRECATED:** RadioInputGroup will be removed from `ui-forms` in version 7.0.0. Use the [RadioInputGroup](#RadioInputGroup) from [ui-radio-input](#ui-radio-input) instead. Codemods are available to automatically update imports to the new package.
***

A RadioInputGroup is a group of RadioInput components. It will handle setting
the name property on the RadioInput components for you and will set the selected item
based on the `value` property.

Adjust the size of the radio button and label text via the `size` prop. The default size is
`medium`.

```js
---
render: false
example: true
---
function Example () {
  const inputs = [
    {value: 'foo', label: 'Radio option one' },
    {value: 'bar', label: 'Radio option two' },
    {value: 'baz', label: 'Radio option three' }
  ]
  const handleChange = function (event, value) {
    console.log(value)
  }
  return (
    <DeprecatedRadioInputGroup onChange={handleChange} name="example1" defaultValue="foo" description="Select something">
      {inputs.map(input => <DeprecatedRadioInput key={input.value} value={input.value} label={input.label} />)}
    </DeprecatedRadioInputGroup>
  )
}
render(<Example />)
```

With the `layout` prop set to `inline` to render the description in its own column at screens `medium` size
and up (see [Grid](#Grid)).

```js
---
render: false
example: true
---
function Example () {
  const inputs = [
    {value: 'foo', label: 'Classical' },
    {value: 'bar', label: 'Electronic' },
    {value: 'baz', label: 'Country' }
  ]
  return (
    <DeprecatedRadioInputGroup
      name="example2"
      defaultValue="foo"
      description="Select something"
      layout="inline">
      {inputs.map(input => <DeprecatedRadioInput key={input.value} value={input.value} label={input.label} />)}
    </DeprecatedRadioInputGroup>
  )
}
render(<Example />)
```

With the `layout` property set to `columns` the inputs will render horizontally at screens `medium` size
and up (see [Grid](#Grid)).

```js
---
render: false
example: true
---
function Example () {
  const inputs = [
    {value: 'foo', label: 'Extremely happy' },
    {value: 'bar', label: 'Very annoyed' },
    {value: 'baz', label: 'Somewhat apathetic' }
  ]
  return (
    <DeprecatedRadioInputGroup
      layout="columns"
      name="example3"
      defaultValue="foo"
      description="Select something"
    >
      {inputs.map(input =>
        <DeprecatedRadioInput
          key={input.value}
          value={input.value}
          label={input.label}
        />
      )}
    </DeprecatedRadioInputGroup>
  )
}

render(<Example />)
```

Set the `variant` prop to `toggle` to have the RadioInputGroup display as a toggle switch. The `context` prop can be set to switch the background color of the toggle switch. Default is `success` options are 'success', 'warning', 'danger', and 'off'.

```js
---
example: true
---
<FormFieldGroup description={<ScreenReaderContent>Toggle examples</ScreenReaderContent>}>
 <DeprecatedRadioInputGroup
    name="featuresm"
    defaultValue="off"
    description="Small-size"
    variant="toggle"
    size="small">
    <DeprecatedRadioInput label="Off" value="off" context="off" />
    <DeprecatedRadioInput label="Allow" value="allow" />
    <DeprecatedRadioInput label="On" value="on" />
  </DeprecatedRadioInputGroup>
  <DeprecatedRadioInputGroup
    name="featuremed"
    defaultValue="allow"
    description="Medium-size (default)"
    variant="toggle">
    <DeprecatedRadioInput label="Off" value="off" context="off" />
    <DeprecatedRadioInput label="Allow" value="allow" />
    <DeprecatedRadioInput label="On" value="on" />
  </DeprecatedRadioInputGroup>
  <DeprecatedRadioInputGroup
    name="context"
    defaultValue="off"
    description="Context (background changes based on context set)"
    variant="toggle">
    <DeprecatedRadioInput label="Off" value="off" context="danger" />
    <DeprecatedRadioInput label="Allow" value="allow" context="warning" />
    <DeprecatedRadioInput label="On" value="on" />
  </DeprecatedRadioInputGroup>
  <DeprecatedRadioInputGroup
    name="featurelg"
    defaultValue="on"
    description="Large-size"
    variant="toggle"
    size="large">
    <DeprecatedRadioInput label="Off" value="off" />
    <DeprecatedRadioInput label="Allow" value="allow" />
    <DeprecatedRadioInput label="On" value="on" />
  </DeprecatedRadioInputGroup>
</FormFieldGroup>
```

Setting the `disabled` prop to `true` will disable the entire RadioInputGroup.

```js
---
example: true
---
<DeprecatedRadioInputGroup
  name="fruits1"
  description="Fruits"
  defaultValue="orange"
  disabled
>
  <DeprecatedRadioInput label="Apple" value="apple" />
  <DeprecatedRadioInput label="Orange" value="orange" />
  <DeprecatedRadioInput label="Banana" value="banana" />
</DeprecatedRadioInputGroup>
```

```js
---
example: true
---
<DeprecatedRadioInputGroup name="feature1" defaultValue="off" description="Super-awesome feature" variant="toggle" disabled>
  <DeprecatedRadioInput label="Off" value="off" context="off" />
  <DeprecatedRadioInput label="Allow" value="allow" />
  <DeprecatedRadioInput label="On" value="on" />
</DeprecatedRadioInputGroup>
```

Or disable an individual RadioInput component via its `disabled` prop.

```js
---
example: true
---
<DeprecatedRadioInputGroup
  name="fruits2"
  defaultValue="banana"
  description="Fruits"
  layout="columns"
>
  <DeprecatedRadioInput label="Apple" value="apple" />
  <DeprecatedRadioInput label="Orange" value="orange" disabled />
  <DeprecatedRadioInput label="Banana" value="banana" />
</DeprecatedRadioInputGroup>
```

```js
---
example: true
---
<DeprecatedRadioInputGroup name="feature2" defaultValue="none" description="Super-awesome feature" variant="toggle">
  <DeprecatedRadioInput label="None" value="none" context="off" />
  <DeprecatedRadioInput label="Some" value="some" />
  <DeprecatedRadioInput label="All" value="all" disabled />
</DeprecatedRadioInputGroup>
```

If you would like to make the description visible only to screen readers you can use the
[ScreenReaderContent](#ScreenReaderContent) component.

```js
---
example: true
---
<DeprecatedRadioInputGroup
  name="fruit3"
  defaultValue="banana"
  description={
    <ScreenReaderContent>Select a fruit</ScreenReaderContent>
  }
  messages={[{ text: 'Invalid choice', type: 'error' }]}
>
  <DeprecatedRadioInput label="Apple" value="apple" />
  <DeprecatedRadioInput label="Orange" value="orange" />
  <DeprecatedRadioInput label="Banana" value="banana" />
</DeprecatedRadioInputGroup>
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
