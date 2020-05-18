---
describes: TimeSelect
---

`TimeSelect` component is a higher level abstraction of [Select](#Select) specifically for selecting time values. The list of possible values can be configured via the component's props. If you need to select times and dates, be sure to check out the documentation around [Time and Date patterns](#TimeDate).

### Uncontrolled
For the most basic implementations, `TimeSelect` can be uncontrolled. If desired, the `defaultValue` prop can be used to set the initial selection.

```javascript
---
example: true
render: true
---
<TimeSelect
  renderLabel="Choose a time"
  onChange={(e, { value }) => console.log(value)}
  // defaultValue={new Date().toISOString()}
/>
```

### Controlled
To use `TimeSelect` controlled, simply provide the `value` prop an ISO string. The `onChange` callback provides the ISO value of the corresponding option that was selected. Use this value to update the state.

```javascript
---
example: true
render: false
---
class Example extends React.Component {
  state = {
    value: '2020-05-18T23:59:00'
  }

  handleChange = (e, { value }) => {
    this.setState({ value })
  }

  render () {
    return (
      <TimeSelect
        renderLabel="Choose a time"
        placeholder="e.g., 4:00:00 PM"
        value={this.state.value}
        step={15}
        format="LTS"
        onChange={this.handleChange}
      />
    )
  }
}
render(
  <Example />
)
```

### Guidelines
```js
---
guidelines: true
---
<Guidelines>
  <Figure recommendation="yes" title="Do">
    <Figure.Item>Use a default value of 11:59 pm for implementations that have to do with due dates</Figure.Item>
  </Figure>
</Guidelines>
```