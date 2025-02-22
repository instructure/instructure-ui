---
describes: NumberInput
---

A controlled number input field.
By deafult, it renders a `<intput type="number">` to the DOM. However, if you need any string value, use the `allowStringValue` flag. Only use this if absolutely necessary, since it could be confusing for screenreader users.
Note that this field **does not work
uncontrolled** - you must pass event handlers if you want it to respond to
user input.

This example handles arrow buttons, up/down arrow keys, and typing into
the input. It also includes an `onBlur` handler that displays an error message
if the input is invalid or missing.

- ```js
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

    handleChange = (event, value) =>
      this.setState({
        messages: null,
        number: value ? Number(value) : null,
        value
      })

    handleDecrement = (event) =>
      this.setState(({ number }) => {
        if (isNaN(number)) return
        if (number === null) return this.setNumber(this.MIN)
        if (Number.isInteger(number)) return this.setNumber(number - 1)
        return this.setNumber(Math.floor(number))
      })

    handleIncrement = (event) =>
      this.setState(({ number }) => {
        if (isNaN(number)) return
        if (number === null) return this.setNumber(this.MIN + 1)
        if (Number.isInteger(number)) return this.setNumber(number + 1)
        return this.setNumber(Math.ceil(number))
      })

    handleBlur = (event) =>
      this.setState(({ number, value }) => {
        if (isNaN(number)) return this.invalidNumber(value)
        if (number === null) return this.required()
        return this.setNumber(Math.round(number))
      })

    setNumber(n) {
      const number = this.bound(n)
      return {
        messages: null,
        number,
        value: number
      }
    }

    bound(n) {
      if (n < this.MIN) return this.MIN
      if (n > this.MAX) return this.MAX
      return n
    }

    invalidNumber(value) {
      return {
        messages: [{ text: `'${value}' is not a valid number.`, type: 'error' }]
      }
    }

    required() {
      return {
        messages: [{ text: 'This is required.', type: 'error' }]
      }
    }

    toggleDisabled = (event) =>
      this.setState(({ disabled }) => ({ disabled: !disabled }))

    toggleInline = (event) =>
      this.setState(({ inline }) => ({ inline: !inline }))

    toggleReadOnly = (event) =>
      this.setState(({ readOnly }) => ({ readOnly: !readOnly }))

    toggleShowArrows = (event) =>
      this.setState(({ showArrows }) => ({ showArrows: !showArrows }))

    render() {
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
            interaction={
              this.state.disabled
                ? 'disabled'
                : this.state.readOnly
                ? 'readonly'
                : 'enabled'
            }
            isRequired
            showArrows={this.state.showArrows}
            value={this.state.value}
          />
        </FormFieldGroup>
      )
    }
  }

  render(<Example />)
  ```

- ```js
  const Example = () => {
    const MIN = 0
    const MAX = 999

    const [disabled, setDisabled] = useState(false)
    const [inline, setInline] = useState(false)
    const [messages, setMessages] = useState(null)
    const [number, setNumber] = useState(null)
    const [readOnly, setReadOnly] = useState(false)
    const [showArrows, setShowArrows] = useState(true)
    const [value, setValue] = useState('')

    const handleChange = (event, value) => {
      setMessages(null)
      setNumber(value ? Number(value) : null)
      setValue(value)
    }

    const handleDecrement = (event) => {
      if (!isNaN(number)) {
        const newNumber =
          number === null
            ? MIN
            : Number.isInteger(number)
            ? number - 1
            : Math.floor(number)
        updateNumber(newNumber)
      }
    }

    const handleIncrement = (event) => {
      if (!isNaN(number)) {
        const newNumber =
          number === null
            ? MIN + 1
            : Number.isInteger(number)
            ? number + 1
            : Math.ceil(number)
        updateNumber(newNumber)
      }
    }

    const handleBlur = (event) => {
      if (isNaN(number)) return invalidNumber(value)
      if (number === null) return required()
      return updateNumber(Math.round(number))
    }

    const updateNumber = (n) => {
      const number = bound(n)
      setMessages(null)
      setNumber(number)
      setValue(number)
    }

    const bound = (n) => {
      if (n < MIN) return MIN
      if (n > MAX) return MAX
      return n
    }

    const invalidNumber = (value) => {
      setMessages([
        { text: `'${value}' is not a valid number.`, type: 'error' }
      ])
    }

    const required = () => {
      setMessages([{ text: 'This is required.', type: 'error' }])
    }

    const toggleDisabled = (event) => {
      setDisabled((prevDisabled) => !prevDisabled)
    }

    const toggleInline = (event) => {
      setInline((prevInline) => !prevInline)
    }

    const toggleReadOnly = (event) => {
      setReadOnly((prevReadOnly) => !prevReadOnly)
    }

    const toggleShowArrows = (event) => {
      setShowArrows((prevShowArrows) => !prevShowArrows)
    }

    return (
      <FormFieldGroup description="Controlled NumberInput example">
        <Checkbox
          checked={showArrows}
          label="Show arrows"
          onChange={toggleShowArrows}
        />
        <Checkbox
          checked={disabled}
          label="Disabled"
          onChange={toggleDisabled}
        />
        <Checkbox
          checked={readOnly}
          label="Read only"
          onChange={toggleReadOnly}
        />
        <Checkbox
          checked={inline}
          label="Inline display"
          onChange={toggleInline}
        />
        <NumberInput
          renderLabel={`How old are you? (${MIN}-${MAX})`}
          display={inline ? 'inline-block' : null}
          messages={messages}
          onBlur={handleBlur}
          onChange={handleChange}
          onDecrement={handleDecrement}
          onIncrement={handleIncrement}
          placeholder="Age (in years)"
          interaction={
            disabled ? 'disabled' : readOnly ? 'readonly' : 'enabled'
          }
          isRequired
          showArrows={showArrows}
          value={value}
        />
      </FormFieldGroup>
    )
  }

  render(<Example />)
  ```

> Note: `NumberInput` accepts a string or number as its `value`. However, the value returned by the `onChange` callback is always a string and should be converted to a number before attempting to augment it.

NumberInput comes in 2 sizes. The default size is "medium".

```js
---
type: example
---
<div>
  <NumberInput renderLabel="Default-size input" /><br/>
  <NumberInput size="large" renderLabel="Large-size input" />
</div>
```

### Guidelines

```js
---
type: embed
---
<Guidelines>
  <Figure recommendation="yes" title="Do">
    <Figure.Item>Use when you need increment/decrement functionality</Figure.Item>
    <Figure.Item>Use labels at the top or to the left of the input field</Figure.Item>
  </Figure>
  <Figure recommendation="no" title="Don't">
    <Figure.Item>Place labels or text strings to the right of the input field</Figure.Item>
  </Figure>
</Guidelines>
```
