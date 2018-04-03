---
describes: RadioInputGroup
---

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
    {value: 'foo', label: lorem.sentence() },
    {value: 'bar', label: lorem.sentence() },
    {value: 'baz', label: lorem.sentence() }
  ]
  const handleChange = function (event, value) {
    console.log(value)
  }
  return (
    <RadioInputGroup onChange={handleChange} name="example1" defaultValue="foo" description="Select something">
      {inputs.map(input => <RadioInput key={input.value} value={input.value} label={input.label} />)}
    </RadioInputGroup>
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
    {value: 'foo', label: lorem.sentence() },
    {value: 'bar', label: lorem.sentence() },
    {value: 'baz', label: lorem.sentence() }
  ]
  return (
    <RadioInputGroup
      name="example2"
      defaultValue="foo"
      description="Select something"
      layout="inline">
      {inputs.map(input => <RadioInput key={input.value} value={input.value} label={input.label} />)}
    </RadioInputGroup>
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
    {value: 'foo', label: lorem.sentence() },
    {value: 'bar', label: lorem.sentence() },
    {value: 'baz', label: lorem.sentence() }
  ]
  return (
    <RadioInputGroup
      layout="columns"
      name="example3"
      defaultValue="foo"
      description="Select something"
    >
      {inputs.map(input =>
        <RadioInput
          key={input.value}
          value={input.value}
          label={input.label}
        />
      )}
    </RadioInputGroup>
  )
}

render(<Example />)
```

Set the `variant` prop to `toggle` to have the RadioInputGroup display as a toggle switch.

```js
---
example: true
---
<FormFieldGroup description={<ScreenReaderContent>Toggle examples</ScreenReaderContent>}>
 <RadioInputGroup
    name="featuresm"
    defaultValue="off"
    description="Small-size"
    variant="toggle"
    size="small">
    <RadioInput label="Off" value="off" context="off" />
    <RadioInput label="Allow" value="allow" />
    <RadioInput label="On" value="on" />
  </RadioInputGroup>
  <RadioInputGroup
    name="featuremed"
    defaultValue="allow"
    description="Medium-size (default)"
    variant="toggle">
    <RadioInput label="Off" value="off" context="off" />
    <RadioInput label="Allow" value="allow" />
    <RadioInput label="On" value="on" />
  </RadioInputGroup>
  <RadioInputGroup
    name="featurelg"
    defaultValue="on"
    description="Large-size"
    variant="toggle"
    size="large">
    <RadioInput label="Off" value="off" context="off" />
    <RadioInput label="Allow" value="allow" />
    <RadioInput label="On" value="on" />
  </RadioInputGroup>
</FormFieldGroup>
```

Set the `context` prop on each `<RadioInput>` to convey context via the toggle's
background color. Default context is `success`.

```js
---
example: true
---
<RadioInputGroup
  layout="inline"
  name="context"
  defaultValue="danger"
  description="Contexts"
  variant="toggle">
  <RadioInput
    label={
      <span>
        <PlaceholderIcon />
        <ScreenReaderContent>
          This option makes something inactive
        </ScreenReaderContent>
      </span>
    }
    value="off"
    context="off"
  />
  <RadioInput
    label={
      <span>
        <PlaceholderIcon />
        <ScreenReaderContent>
          This option is an inadvisable choice
        </ScreenReaderContent>
      </span>
    }
    value="warning"
    context="warning"
  />
  <RadioInput
    label={
      <span>
        <PlaceholderIcon />
        <ScreenReaderContent>
          This option is a bad choice
        </ScreenReaderContent>
      </span>
    }
    value="danger"
    context="danger"
  />
  <RadioInput
    label={
      <span>
        <PlaceholderIcon />
        <ScreenReaderContent>
          This option is a good choice
        </ScreenReaderContent>
      </span>
    }
    value="success"
    context="success"
  />
</RadioInputGroup>
```

Setting the `disabled` prop to `true` will disable the entire RadioInputGroup.

```js
---
example: true
---
<RadioInputGroup
  name="fruits1"
  description="Fruits"
  defaultValue="orange"
  disabled
>
  <RadioInput label="Apple" value="apple" />
  <RadioInput label="Orange" value="orange" />
  <RadioInput label="Banana" value="banana" />
</RadioInputGroup>
```

```js
---
example: true
---
<RadioInputGroup name="feature1" defaultValue="off" description="Super-awesome feature" variant="toggle" disabled>
  <RadioInput label="Off" value="off" context="off" />
  <RadioInput label="Allow" value="allow" />
  <RadioInput label="On" value="on" />
</RadioInputGroup>
```

Or disable an individual RadioInput component via its `disabled` prop.

```js
---
example: true
---
<RadioInputGroup
  name="fruits2"
  defaultValue="banana"
  description="Fruits"
  layout="columns"
>
  <RadioInput label="Apple" value="apple" />
  <RadioInput label="Orange" value="orange" disabled />
  <RadioInput label="Banana" value="banana" />
</RadioInputGroup>
```

```js
---
example: true
---
<RadioInputGroup name="feature2" defaultValue="none" description="Super-awesome feature" variant="toggle">
  <RadioInput label="None" value="none" context="off" />
  <RadioInput label="Some" value="some" />
  <RadioInput label="All" value="all" disabled />
</RadioInputGroup>
```

If you would like to make the description visible only to screen readers you can use the
[ScreenReaderContent](#ScreenReaderContent) component.

```js
---
example: true
---
<RadioInputGroup
  name="fruit3"
  defaultValue="banana"
  description={
    <ScreenReaderContent>Select a fruit</ScreenReaderContent>
  }
  messages={[{ text: 'Invalid choice', type: 'error' }]}
>
  <RadioInput label="Apple" value="apple" />
  <RadioInput label="Orange" value="orange" />
  <RadioInput label="Banana" value="banana" />
</RadioInputGroup>
```
