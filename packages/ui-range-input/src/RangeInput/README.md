---
describes: RangeInput
---

An html5 range input/slider component.

```js
---
render: false
example: true
---
class Example extends React.Component {
  state = { size: "small" }
  handleModalSizeChange = (event, value) => {
    this.setState({ size: value })
  }
  render() {
    return (
      <div>
        <RangeInput label="Grading range" defaultValue={30} max={100} min={0} size={this.state.size} />
        <FormFieldGroup rowSpacing="medium">
          <RadioInputGroup
            onChange={this.handleModalSizeChange}
            name="labelSize"
            defaultValue="small"
            description="Label size"
            variant="toggle"
          >
            <RadioInput label="small" value="small" />
            <RadioInput label="medium" value="medium" />
            <RadioInput label="large" value="large" />
          </RadioInputGroup>
        </FormFieldGroup>
      </div>
    )
  }
}
render(<Example />)
```
