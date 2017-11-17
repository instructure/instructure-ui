---
describes: DateInput
---

A DateInput component is used to input a date either with a
[DatePicker](#DatePicker) in a popup, or by typing a date into a
[TextInput](#TextInput).

```js
---
example: true
---
<DateInput
  previousLabel="previous month"
  nextLabel="next month"
  placeholder="Choose"
  label="Birthday"
  onDateChange={function () { console.log(arguments) }}
  invalidDateMessage="Invalid date: Birthday"
/>
```

A controlled (required) DateInput:

```js
---
example: true
render: false
---
class Example extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      isoDate: undefined,
      messages: []
    }
  }

  onInputChange = (e) => {
    this.setState({ messages: [] })
  };

  onDateChange = (e, isoDate, rawValue, rawConversionFailed) => {
    const messages = []

    if (!isoDate) {
      messages.push({
        type: 'error',
        text: 'Date field is required.'
      })
    }

    this.setState({ messages, isoDate })
  };

  onInputBlur = (e) => {
    const messages = []

    if (!e.target.value) {
      messages.push({
        type: 'error',
        text: 'Date field is required.'
      })
    }

    this.setState({ messages })
  };

  randomMonth = () => {
    let m = Math.floor(Math.random() * 12)
    const newDate = new Date(this.state.isoDate || Date.now())
    newDate.setMonth(m)
    this.setState({ isoDate: newDate.toISOString(), messages: [] })
  };

  render () {
    return (
      <FormFieldGroup description={<ScreenReaderContent>DateInput Example</ScreenReaderContent>}>
        <Button margin="small" onClick={this.randomMonth}>Random Month</Button>
        <DateInput
          label="Date"
          placeholder="Pick a date"
          previousLabel="previous month"
          messages={this.state.messages}
          nextLabel="next month"
          placement='bottom center'
          onDateChange={this.onDateChange}
          onChange={this.onInputChange}
          onBlur={this.onInputBlur}
          dateValue={this.state.isoDate}
          required
        />
      </FormFieldGroup>
    )
  }
}
render(<Example />)
```

DateInput passes most properties through to the underlying [TextInput](#TextInput).
It does not pass through `type`, `messages`, `defaultValue`, `value`, `onChange`, or
`onKeyDown`.

When the DatePicker value changes the new date is displayed in the TextInput
according to the specified format.

As characters are typed into the TextInput, the DateInput attempts to parse
the string according to the specified locale. The results are passed to the
TextInput as a success for fail message. When successful, enter will replace
the TextInput value with the formatted date.
