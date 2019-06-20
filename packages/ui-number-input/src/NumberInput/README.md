---
describes: NumberInput
---

A controlled number input field. Note that this field **does not work
uncontrolled** - you must pass event handlers if you want it to respond to
user input.

This example handles arrow buttons, up/down arrow keys, and typing into
the input.  It also includes an `onBlur` handler that displays an error message
if the input is invalid or missing.

```js
---
example: true
render: false
---
class Example extends React.Component {
  MIN = 0
  MAX = 999

  state = {
    disabled: false,
    inline: false,
    messages: null,
    number: null,
    readOnly: false,
    showArrows: true,
    value: ''
  }

  handleChange = (event, value) => this.setState({
    messages: null,
    number: value ? Number(value) : null,
    value
  })

  handleDecrement = (event) => this.setState(({ number }) => {
    if (isNaN(number)) return
    if (number === null) return this.setNumber(this.MIN)
    if (isInteger(number)) return this.setNumber(number - 1)
    return this.setNumber(Math.floor(number))
  })

  handleIncrement = (event) => this.setState(({ number }) => {
    if (isNaN(number)) return
    if (number === null) return this.setNumber(this.MIN + 1)
    if (isInteger(number)) return this.setNumber(number + 1)
    return this.setNumber(Math.ceil(number))
  })

  handleBlur = (event) => this.setState(({ number, value }) => {
    if (isNaN(number)) return this.invalidNumber(value)
    if (number === null) return this.required()
    return this.setNumber(Math.round(number))
  })

  setNumber (n) {
    const number = this.bound(n)
    return {
      messages: null,
      number,
      value: number
    }
  }

  bound (n) {
    if (n < this.MIN) return this.MIN
    if (n > this.MAX) return this.MAX
    return n
  }

  invalidNumber (value) {
    return {
      messages: [{ text: `'${value}' is not a valid number.`, type: 'error' }]
    }
  }

  required () {
    return {
      messages: [{ text: 'This is required.', type: 'error' }]
    }
  }

  toggleDisabled = (event) => this.setState(({ disabled }) => ({ disabled: !disabled }))

  toggleInline = (event) => this.setState(({ inline }) => ({ inline: !inline }))

  toggleReadOnly = (event) => this.setState(({ readOnly }) => ({ readOnly: !readOnly }))

  toggleShowArrows = (event) => this.setState(({ showArrows }) => ({ showArrows: !showArrows }))

  render () {
    return (
      <FormFieldGroup description="Controlled NumberInput example">
        <Checkbox
          checked={this.state.showArrows}
          label="Show arrows"
          onChange={this.toggleShowArrows}
        />
        <Checkbox
          checked={this.state.disabled}
          label="Disabled"
          onChange={this.toggleDisabled}
        />
        <Checkbox
          checked={this.state.readOnly}
          label="Read only"
          onChange={this.toggleReadOnly}
        />
        <Checkbox
          checked={this.state.inline}
          label="Inline display"
          onChange={this.toggleInline}
        />
        <NumberInput
          renderLabel={`How old are you? (${this.MIN}-${this.MAX})`}
          display={this.state.inline ? 'inline-block' : null}
          messages={this.state.messages}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          onDecrement={this.handleDecrement}
          onIncrement={this.handleIncrement}
          placeholder="Age (in years)"
          interaction={this.state.disabled
            ? 'disabled'
            : this.state.readOnly ? 'readonly' : 'enabled'
          }
          isRequired
          showArrows={this.state.showArrows}
          value={this.state.value}
        />
      </FormFieldGroup>
    )
  }
}

// IE11 doesn't support Number.isInteger
function isInteger (number) {
  return Math.floor(number) === number
}

render(<Example />)
```

> Note: `NumberInput` accepts a string or number as its `value`. However, the value returned by the `onChange` callback is always a string and should be converted to a number before attempting to augment it.

NumberInput comes in 2 sizes. The default size is "medium".

```js
---
example: true
---
<div>
  <NumberInput renderLabel="Default-size input" /><br/>
  <NumberInput size="large" renderLabel="Large-size input" />
</div>
```

### Guidelines

```js
---
guidelines: true
---
<Guidelines>
  <Figure recommendation="yes" title="Do">
    <Figure.Item>Use when the input is limited to a number (integer, rational, or irrational expressed with decimal points)</Figure.Item>
    <Figure.Item>Use labels at the top or to the left of the input field</Figure.Item>
  </Figure>
  <Figure recommendation="no" title="Don't">
    <Figure.Item>Place labels or text strings to the right of the input field</Figure.Item>
    <Figure.Item>Use for alphanumeric input</Figure.Item>
  </Figure>
</Guidelines>
```
