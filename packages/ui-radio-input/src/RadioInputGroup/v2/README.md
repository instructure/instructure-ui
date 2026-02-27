---
describes: RadioInputGroup
---

A RadioInputGroup is a group of RadioInput components. It will handle setting
the name property on the RadioInput components for you and will set the selected item
based on the `value` property.

The `name` prop sets the [same low level HTML attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio#defining_a_radio_group) which **must be unique across the DOM** otherwise groups with the same name will interfere with each other.

Adjust the size of the radio button and label text via the `size` prop. The default size is
`medium`.

```js
---
type: example
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
    <RadioInputGroup onChange={handleChange} name="example1" defaultValue="foo" description="Select something">
      {inputs.map(input => <RadioInput key={input.value} value={input.value} label={input.label} />)}
    </RadioInputGroup>
  )
}
render(<Example />)
```

With the `layout` prop set to `inline` to render the description in its own column at screens `medium` size
and up.

```js
---
type: example
---
function Example () {
  const inputs = [
    {value: 'foo', label: 'Classical' },
    {value: 'bar', label: 'Electronic' },
    {value: 'baz', label: 'Country' }
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
and up.

```js
---
type: example
---
function Example () {
  const inputs = [
    {value: 'foo', label: 'Extremely happy' },
    {value: 'bar', label: 'Very annoyed' },
    {value: 'baz', label: 'Somewhat apathetic' }
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

Set the `variant` prop to `toggle` to have the RadioInputGroup display as a toggle switch. The `context` prop can be set to switch the background color of the toggle switch. Default is `success` options are 'success', 'warning', 'danger', and 'off'.

```js
---
type: example
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
    name="context"
    defaultValue="off"
    description="Context (background changes based on context set)"
    variant="toggle">
    <RadioInput label="Off" value="off" context="danger" />
    <RadioInput label="Allow" value="allow" context="warning" />
    <RadioInput label="On" value="on" />
  </RadioInputGroup>
  <RadioInputGroup
    name="featurelg"
    defaultValue="on"
    description="Large-size"
    variant="toggle"
    size="large">
    <RadioInput label="Off" value="off" />
    <RadioInput label="Allow" value="allow" />
    <RadioInput label="On" value="on" />
  </RadioInputGroup>
</FormFieldGroup>
```

Setting the `disabled` prop to `true` will disable the entire RadioInputGroup.

```js
---
type: example
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
type: example
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
type: example
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
type: example
---
<RadioInputGroup name="feature2" defaultValue="none" description="Super-awesome feature" variant="toggle">
  <RadioInput label="None" value="none" context="off" />
  <RadioInput label="Some" value="some" />
  <RadioInput label="All" value="all" disabled />
</RadioInputGroup>
```

If you would like to make the description visible only to screen readers you can use the
[ScreenReaderContent](ScreenReaderContent) component.

```js
---
type: example
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

### Guidelines

```js
---
type: embed
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
