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

The `indeterminate` property triggers a visual state that handles
situations where "child" Checkboxes are neither all checked nor all
unchecked. Note the use of `aria-labelledby` to make the relationship
between the parent and child Checkboxes clear to screenreader users.

*Note: the `toggle` variant does not support the `indeterminate`
property.*

```js
---
render: false
example: true
---
class Example extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      value: ['his111', 'eng203']
    }
  }

  updateValue (value) {
    const index = this.state.value.indexOf(value)

    if (index === -1) {
      this.setState({ value: [...this.state.value, value] })
    } else {
      this.setState((prevState) => ({
        value: [...prevState.value.slice(0, index), ...prevState.value.slice(index + 1)]
      }))
    }
  }

  render () {
    return (
      <FormFieldGroup
        description={
          <ScreenReaderContent>
            <span id="groupLabel">Courses to edit</span>
          </ScreenReaderContent>
        }
        rowSpacing="small"
      >
        <Checkbox
          aria-labelledby="groupLabel selectAllLabel"
          label={<span id="selectAllLabel">Select all courses</span>}
          value="all"
          onChange={() => this.setState({
            value: this.state.value.length === 3 ? [] : ['eng203', 'sci101', 'his111']
          })}
          checked={this.state.value.length === 3}
          indeterminate={this.state.value.length > 0 && this.state.value.length < 3}
        />
        <View as="div" padding="0 0 0 medium">
          <Checkbox
            aria-labelledby="groupLabel eng203Label"
            label={<span id="eng203Label">English 203</span>}
            value="eng203"
            name="courses"
            onChange={(event) => { this.updateValue(event.target.value) }}
            checked={this.state.value.indexOf('eng203') !== -1}
          />
        </View>
        <View as="div" padding="0 0 0 medium">
          <Checkbox
            aria-labelledby="groupLabel sci101Label"
            label={<span id="sci101Label">Science 101</span>}
            value="sci101"
            name="courses"
            onChange={(event) => {
              this.updateValue(event.target.value)
            }}
            checked={this.state.value.indexOf('sci101') !== -1}
          />
        </View>
        <View as="div" padding="0 0 0 medium">
          <Checkbox
            aria-labelledby="groupLabel hist101Label"
            label={<span id="hist101Label">History 111</span>}
            value="his111"
            name="courses"
            onChange={(event) => {
              this.updateValue(event.target.value)
            }}
            checked={this.state.value.indexOf('his111') !== -1}
          />
        </View>
      </FormFieldGroup>
    )
  }
}

render(<Example />)
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

To change the label placement for the toggle variety, use the labelPlacement prop.  The default
placement is 'end'.

*Note: the `simple` variant does not support the `labelPlacement`
property.*

```js
---
example: true
---
<FormFieldGroup description={<ScreenReaderContent>Toggle label examples</ScreenReaderContent>}>
  <Checkbox label="Top" variant="toggle" labelPlacement="top" defaultChecked />
  <Checkbox label="Start" variant="toggle" labelPlacement="start" />
  <Checkbox label="End" variant="toggle" labelPlacement="end" defaultChecked />
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
