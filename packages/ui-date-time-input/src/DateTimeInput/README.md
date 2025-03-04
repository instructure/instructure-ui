---
describes: DateTimeInput
---

A DateTimeInput component is used to enter a date-time value. It is built as a composition
of the [DateInput](#DateInput) and [TimeSelect](#TimeSelect) components.

The properties of DateTimeInput prefaced with _date_ are passed to the underlying [DateInput](#DateInput)
(e.g. _dateLabel_ is DateInput's _label_), while the properties prefaced
with _time_ are forwarded to the underlying
[TimeSelect](#TimeSelect). Others are either shared by both sub-components (e.g. locale), or
are unique to DateTimeInput (e.g. description).

### Localization

The component is localized via its `locale` and `timezone` parameters. Both are read from `props`, `context` and from the browser's locale in this priority order. `locale` determines the language and format dates and time are displayed in (e.g. month names, AM/PM or 24-hour format) and the beginning of the week (e.g. Monday in Germany, Sunday in the U.S.) in the dropdown calendar.

### Examples

#### A DateTimeInput with `columns` layout and a default value:

- ```js
  class Example extends React.Component {
    render() {
      return (
        <div style={{ height: '15rem' }}>
          <DateTimeInput
            description="Pick a date and time"
            datePlaceholder="Choose a date"
            dateRenderLabel="Date"
            timeRenderLabel="Time"
            invalidDateTimeMessage="Invalid date!"
            prevMonthLabel="Previous month"
            nextMonthLabel="Next month"
            defaultValue="2018-01-18T13:30"
            layout="columns"
          />
        </div>
      )
    }
  }
  render(<Example />)
  ```

- ```js
  const Example = () => {
    return (
      <div style={{ height: '15rem' }}>
        <DateTimeInput
          description="Pick a date and time"
          datePlaceholder="Choose a date"
          dateRenderLabel="Date"
          timeRenderLabel="Time"
          invalidDateTimeMessage="Invalid date!"
          prevMonthLabel="Previous month"
          nextMonthLabel="Next month"
          defaultValue="2018-01-18T13:30"
          layout="columns"
        />
      </div>
    )
  }

  render(<Example />)
  ```

#### A required DateInput with `stacked` layout that warns if the value in the past:

This sample code also allows the user to enter an arbitrary time value by setting `allowNonStepInput` to `true`.

- ```js
  class Example extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        value: undefined,
        messages: []
      }
    }

    onChange = (e, isoDate) => {
      let messages = []
      if (!isoDate) {
        // this happens if an invalid date is entered
        this.setState({ messages: messages, value: undefined })
        return
      }
      const now = new Date()
      const newValue = new Date(isoDate)
      if (newValue.valueOf() <= now.valueOf()) {
        messages = [{ text: 'That date-time is in the past', type: 'hint' }]
      }
      this.setState({ value: isoDate, messages })
    }

    render() {
      const text = this.state.value
        ? new Date(this.state.value).toString()
        : 'N/A'
      return (
        <div>
          <div style={{ marginBottom: '1em', fontStyle: 'italic' }}>
            You entered:
            <br />
            {text}
          </div>
          <div style={{ height: '14rem' }}>
            <DateTimeInput
              description={
                <ScreenReaderContent>Pick a date and time</ScreenReaderContent>
              }
              datePlaceholder="Choose"
              dateRenderLabel="Date"
              timeRenderLabel="Time"
              prevMonthLabel="Previous month"
              nextMonthLabel="Next month"
              onChange={this.onChange}
              layout="stacked"
              value={this.state.value}
              invalidDateTimeMessage="Invalid date!"
              messages={this.state.messages}
              allowNonStepInput={true}
              isRequired
            />
          </div>
        </div>
      )
    }
  }
  render(<Example />)
  ```

- ```js
  const Example = () => {
    const [value, setValue] = useState(undefined)
    const [messages, setMessages] = useState([])

    const onChange = (e, isoDate) => {
      let newMessages = []
      if (!isoDate) {
        // this happens if an invalid date is entered
        setValue(undefined)
        setMessages(newMessages)
        return
      }
      const now = new Date()
      const newValue = new Date(isoDate)
      if (newValue.valueOf() <= now.valueOf()) {
        newMessages = [{ text: 'That date-time is in the past', type: 'hint' }]
      }
      setValue(isoDate)
      setMessages(newMessages)
    }

    const text = value ? new Date(value).toString() : 'N/A'

    return (
      <div>
        <div style={{ marginBottom: '1em', fontStyle: 'italic' }}>
          You entered:
          <br />
          {text}
        </div>
        <div style={{ height: '14rem' }}>
          <DateTimeInput
            description={
              <ScreenReaderContent>Pick a date and time</ScreenReaderContent>
            }
            datePlaceholder="Choose"
            dateRenderLabel="Date"
            timeRenderLabel="Time"
            prevMonthLabel="Previous month"
            nextMonthLabel="Next month"
            onChange={onChange}
            layout="stacked"
            value={value}
            invalidDateTimeMessage="Invalid date!"
            messages={messages}
            allowNonStepInput={true}
            isRequired
          />
        </div>
      </div>
    )
  }

  render(<Example />)
  ```

#### A disabled DateTimeInput:

```js
---
type: example
---
<DateTimeInput
  description="Pick a date and time"
  datePlaceholder="Choose a date"
  dateRenderLabel="Date"
  timeRenderLabel="Time"
  prevMonthLabel='Previous month'
  nextMonthLabel='Next month'
  invalidDateTimeMessage={(dvalue) => { return `'${dvalue} is not valid.` }}
  layout="columns"
  defaultValue="2018-01-18T13:30"
  interaction="disabled"
/>
```

#### A DateTimeInput in a different locale and timezone where these are set from the React `context`:

- ```js
  class Example extends React.Component {
    render() {
      return (
        <ApplyLocale locale="fr" timezone="Africa/Nairobi">
          <div style={{ height: '14rem' }}>
            <DateTimeInput
              description="Pick a date and time"
              datePlaceholder="Choose a date"
              dateRenderLabel="Date"
              timeRenderLabel="Time"
              prevMonthLabel="Previous month"
              nextMonthLabel="Next month"
              invalidDateTimeMessage={(dvalue) => {
                return `'${dvalue} is not valid.`
              }}
              layout="columns"
              defaultValue="2018-01-18T16:00"
            />
          </div>
        </ApplyLocale>
      )
    }
  }
  render(<Example />)
  ```

- ```js
  const Example = () => {
    return (
      <ApplyLocale locale="fr" timezone="Africa/Nairobi">
        <div style={{ height: '14rem' }}>
          <DateTimeInput
            description="Pick a date and time"
            datePlaceholder="Choose a date"
            dateRenderLabel="Date"
            timeRenderLabel="Time"
            prevMonthLabel="Previous month"
            nextMonthLabel="Next month"
            invalidDateTimeMessage={(dvalue) => {
              return `'${dvalue} is not valid.`
            }}
            layout="columns"
            defaultValue="2018-01-18T16:00"
          />
        </div>
      </ApplyLocale>
    )
  }

  render(<Example />)
  ```

#### A `DateTimeInput` with some disabled dates that are supplied via a `string` array:

```js
---
type: example
---
<DateTimeInput
  description="Pick a date and time"
  datePlaceholder="Choose a date"
  dateRenderLabel="Date"
  timeRenderLabel="Time"
  invalidDateTimeMessage="Invalid date"
  disabledDateTimeMessage="Disabled date"
  prevMonthLabel="Previous month"
  nextMonthLabel="Next month"
  defaultValue="2022-04-08T13:30"
  layout="columns"
  disabledDates={['2022-04-01T13:30', '2022-04-03T13:30', '2022-04-04T13:30']}
  locale="en-us"
  timezone="America/Denver"
/>
```

#### A `DateTimeInput` with some disabled dates that are supplied via a `function`:

- ```js
  const locale = 'en-us'
  const timezone = 'America/Denver'

  class Example extends React.Component {
    getDisabledDates(isoDateToCheck) {
      const parsed = moment.tz(
        isoDateToCheck,
        [moment.ISO_8601],
        locale,
        timezone
      )
      const now = moment().locale(locale).tz(timezone)
      return parsed.isBefore(now)
    }
    render() {
      return (
        <div style={{ height: '15rem' }}>
          <DateTimeInput
            description="Pick a date and time"
            datePlaceholder="Choose a date"
            dateRenderLabel="Date"
            timeRenderLabel="Time"
            invalidDateTimeMessage={(rawDateValue) =>
              'Invalid date: ' + rawDateValue
            }
            disabledDateTimeMessage={(rawDateValue) =>
              'Disabled date: ' + rawDateValue
            }
            prevMonthLabel="Previous month"
            nextMonthLabel="Next month"
            defaultValue="2022-04-08T13:30"
            layout="columns"
            disabledDates={this.getDisabledDates}
            locale={locale}
            timezone={timezone}
          />
        </div>
      )
    }
  }

  render(<Example />)
  ```

- ```js
  const Example = () => {
    const locale = 'en-us'
    const timezone = 'America/Denver'

    const getDisabledDates = (isoDateToCheck) => {
      const parsed = moment.tz(
        isoDateToCheck,
        [moment.ISO_8601],
        locale,
        timezone
      )
      const now = moment().locale(locale).tz(timezone)
      return parsed.isBefore(now)
    }

    return (
      <div style={{ height: '15rem' }}>
        <DateTimeInput
          description="Pick a date and time"
          datePlaceholder="Choose a date"
          dateRenderLabel="Date"
          timeRenderLabel="Time"
          invalidDateTimeMessage={(rawDateValue) =>
            'Invalid date: ' + rawDateValue
          }
          disabledDateTimeMessage={(rawDateValue) =>
            'Disabled date: ' + rawDateValue
          }
          prevMonthLabel="Previous month"
          nextMonthLabel="Next month"
          defaultValue="2022-04-08T13:30"
          layout="columns"
          disabledDates={getDisabledDates}
          locale={locale}
          timezone={timezone}
        />
      </div>
    )
  }

  render(<Example />)
  ```

#### Programatically reset `DateTimeInput`

Due to `onChange` not being called on every typing event, and `value` isn't representing the inner value-state of the component, it's not possible to reset the `DateTimeInput` by setting the `value` to `undefined`. Instead, you can use the `reset` function that is passed to the `DateTimeInput` as a prop.

- ```js
  class Example extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        date: ''
      }
    }

    resetFn = null

    render() {
      return (
        <div>
          <DateTimeInput
            description="Pick a date and time"
            datePlaceholder="Choose a date"
            dateRenderLabel="Date"
            timeRenderLabel="Time"
            invalidDateTimeMessage="Invalid date!"
            prevMonthLabel="Previous month"
            nextMonthLabel="Next month"
            value={this.state.date}
            onChange={(e, newDate) => this.setState({ date: newDate })}
            reset={(reset) => (this.resetFn = reset)}
          />
          <Button onClick={() => this.resetFn()}>Clear</Button>
          <p>{this.state.date}</p>
        </div>
      )
    }
  }
  render(<Example />)
  ```

- ```js
  const Example = () => {
    const [date, setDate] = useState('')
    const resetFn = useRef()

    return (
      <div>
        <DateTimeInput
          description="Pick a date and time"
          datePlaceholder="Choose a date"
          dateRenderLabel="Date"
          timeRenderLabel="Time"
          invalidDateTimeMessage="Invalid date!"
          prevMonthLabel="Previous month"
          nextMonthLabel="Next month"
          value={date}
          onChange={(e, newDate) => setDate(newDate)}
          reset={(reset) => (resetFn.current = reset)}
        />
        <Button onClick={() => resetFn.current()}>Clear</Button>
        <p>{date}</p>
      </div>
    )
  }
  render(<Example />)
  ```
