---
describes: DateTimeInput
---

A DateTimeInput component is used to enter a date-time value. It is built as a composition
of the [DateInput](#DateInput) and [TimeSelect](#TimeSelect) components.

A DateTimeInput with `column` layout and a default value:

```js
---
example: true
render: false
---
class Example extends React.Component {
  render () {
    return (
      <div style= { {height: 350,width: '40em'}}>
        <DateTimeInput
          description="Pick a date and time"
          datePlaceholder="Choose a date"
          dateLabel="Date"
          invalidDateTimeMessage="Invalid date!"
          timeLabel="Time"
          prevMonthLabel='Previous month'
          nextMonthLabel='Next month'
          layout="columns"
          defaultValue="2018-01-18T13:30"
        />
    </div>)
  }
}
render(<Example />)
```

A required DateInput with `stacked` layout that warns if the value in the past:

```js
---
example: true
render: false
---

class Example extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value: undefined,
      messages: []
    }
  }

  onChange = (e, isoDate) => {
    const now = new Date()
    const newValue = new Date(isoDate)
    let messages = []
    if ( newValue.valueOf() <= now.valueOf()) {
      messages = [{text: 'That date-time is in the past', type: 'hint'}]
    }
    this.setState({ value: isoDate, messages })
  }

  render () {
    const text = this.state.value ? new Date(this.state.value).toString() : 'N/A'
    return (
      <div style={{width: '20em'}}>
        <div style={{marginBottom: '1em', fontStyle: 'italic'}}>You entered:<br/>{text}</div>
        <div style={{height: 350}}>
          <DateTimeInput
            description={<ScreenReaderContent>Pick a date and time</ScreenReaderContent>}
            datePlaceholder="Choose"
            dateLabel="Date"
            timeLabel="Time"
            prevMonthLabel='Previous month'
            nextMonthLabel='Next month'
            onChange={this.onChange}
            layout="stacked"
            value={this.state.value}
            invalidDateTimeMessage="Invalid date!"
            messages={this.state.messages}
            isRequired
          />
        </div>
      </div>
    )
  }
}
render(<Example />)
```

A disabled DateTimeInput:

```js
---
example: true
render: true
---
<DateTimeInput
  description="Pick a date and time"
  datePlaceholder="Choose a date"
  dateLabel="Date"
  timeLabel="Time"
  prevMonthLabel='Previous month'
  nextMonthLabel='Next month'
  invalidDateTimeMessage={(dvalue) => { return `'${dvalue} is not valid.` }}
  layout="columns"
  defaultValue="2018-01-18T13:30"
  interaction="disabled"
/>
```

A DateTimeInput in a different locale:

```js
---
example: true
render: false
---
class Example extends React.Component {

  render() {
    return (
      <div style={{ height: 350, width: '40em' }}>
        <DateTimeInput
          description="Pick a date and time"
          datePlaceholder="Choose a date"
          dateLabel="Date"
          timeLabel="Time"
          prevMonthLabel='Previous month'
          nextMonthLabel='Next month'
          invalidDateTimeMessage={(dvalue) => {
            return `'${dvalue} is not valid.`
          }}
          layout="columns"
          defaultValue="2018-01-18T16:00"
          locale="fr"
        />
      </div>)
  }
}
render(<Example />)
```

The properties of DateTimeInput prefaced with _date_ are passed to the underlying [DateInput](#DateInput)
(e.g. _dateLabel_ is DateInput's _label_), while the properties prefaced
with _time_ are forwarded to the underlying
[TimeSelect](#TimeSelect). Others are either shared by both sub-components (e.g. locale), or
are unique to DateTimeInput (e.g. description).
