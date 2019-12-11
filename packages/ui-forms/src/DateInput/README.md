---
describes: DeprecatedDateInput
id: DeprecatedDateInput__README
---

**DEPRECATED:** Use the controlled [DateInput from ui-date-input](#DateInput) instead. View that [documentation](#DateInput) for examples of managing state for a `DateInput`.
***

A DateInput component is used to input a date either with a
[DatePicker](#DatePicker) in a [Popover](#Popover), or by typing a date into a
[TextInput](#TextInput).
- A `placeholder` prop is available to be used as hint text in the input.
- A `defaultDateValue` can be used that will override the placeholder text.
- Input can be set to `disabled`.

```js
---
example: true
---
<DeprecatedDateInput
  previousLabel="previous month"
  nextLabel="next month"
  placeholder="Select a date"
  label="Date"
  onDateChange={(event, isoValue, rawValue, rawConversionFailed) => { console.log(event, isoValue, rawValue, rawConversionFailed) }}
  invalidDateMessage={(value) => { return `'${value}' is not a valid date` }}
/>
```

A disabled DateInput:

```js
---
example: true
---
<DeprecatedDateInput
  previousLabel="previous month"
  nextLabel="next month"
  placeholder="Select a date"
  label="Date"
  onDateChange={(event, isoValue, rawValue, rawConversionFailed) => { console.log(event, isoValue, rawValue, rawConversionFailed) }}
  invalidDateMessage={(value) => { return `'${value}' is not a valid date` }}
  defaultDateValue={new Date()}
  disabled
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

  onDateChange = (e, isoDate, rawValue, rawConversionFailed, dateIsDisabled) => {
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
        <DeprecatedDateInput
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
          disabledDateMessage={(date) => `Date is disabled`}
          disabledDaysOfWeek={[0, 6]}
          required
        />
      </FormFieldGroup>
    )
  }
}
render(<Example />)
```

A DateInput with a `disabledDaysOfWeek` prop disabling weekends:

```js
---
example: true
---
<DeprecatedDateInput
  previousLabel="previous month"
  nextLabel="next month"
  placeholder="Select a date"
  label="Date"
  onDateChange={() => { console.log(arguments) }}
  invalidDateMessage={(value) => { return `'${value}' is not a valid date` }}
  disabledDaysOfWeek={[0, 6]}
/>
```

A DateInput with a `disabledDays` array

```js
---
example: true
---
<DeprecatedDateInput
  previousLabel="previous month"
  nextLabel="next month"
  placeholder="Select a date"
  label="Date"
  onDateChange={() => { console.log(arguments) }}
  invalidDateMessage={(value) => { return `'${value}' is not a valid date` }}
  disabledDays={[new Date(2018, 3, 20), new Date(2018, 3, 1)]}
/>
```


A DateInput with a `disabledDays` callback function

```js
---
example: true
---
<DeprecatedDateInput
  previousLabel="previous month"
  nextLabel="next month"
  placeholder="Select a date"
  label="Date"
  onDateChange={() => { console.log(arguments) }}
  invalidDateMessage={(value) => { return `'${value}' is not a valid date` }}
  disabledDays={(day) => day > new Date()}
/>
```

DateInput passes most properties through to the underlying [TextInput](#TextInput).
It does not pass through `type`, `defaultValue`, `disabledDays`, `disabledDaysOfWeek`
or `value`.

When the DatePicker value changes, the new date is displayed in the TextInput
according to the specified format.

As characters are typed into the TextInput, the DateInput attempts to parse
the string according to the specified locale. The results are passed to the
TextInput as a success or fail message. When successful, typing `ENTER` will replace
the TextInput value with the formatted date.
