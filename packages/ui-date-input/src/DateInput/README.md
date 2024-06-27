---
describes: DateInput
---

The `DateInput` component provides a visual interface for inputting date data.

### Default config

For ease of use in most situations, the `DateInput` component provides a default
configuration. The default configuration can be overridden by providing props
to the `DateInput` component.

```javascript
---
type: example
---
class Example extends React.Component {
  state = { value: '' }

  render () {
    return (
      <DateInput
        renderLabel="Choose a date"
        assistiveText="Type a date or use arrow keys to navigate date picker."
        width="20rem"
        isInline
        value={this.state.value}
        onChange={(e, value)=> this.setState({value:value.value})}
        invalidDateErrorMessage="Invalid date"
      />
    )
  }
}

render(<Example />)
```

### With year picker

```javascript
---
type: example
---
class Example extends React.Component {
  state = { value: '' }

  render () {
    return (
      <DateInput
        renderLabel="Choose a date"
        assistiveText="Type a date or use arrow keys to navigate date picker."
        width="20rem"
        isInline
        value={this.state.value}
        onChange={(e, value)=> this.setState({value:value.value})}
        invalidDateErrorMessage="Invalid date"
        withYearPicker={{
          screenReaderLabel: "Year picker",
          startYear:1999,
          endYear:2024,
        }}
      />
    )
  }
}

render(<Example />)
```
