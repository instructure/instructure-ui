# DateTimeInput


A DateTimeInput component is used to enter a date-time value. It is built as a composition
of the [DateInput](DateInput) and [TimeSelect](TimeSelect) components.

The properties of DateTimeInput prefaced with _date_ are passed to the underlying [DateInput](DateInput)
(e.g. _dateLabel_ is DateInput's _label_), while the properties prefaced
with _time_ are forwarded to the underlying
[TimeSelect](TimeSelect). Others are either shared by both sub-components (e.g. locale), or
are unique to DateTimeInput (e.g. description).

### Localization

The component is localized via its `locale` and `timezone` parameters. Both are read from `props`, `context` and from the browser's locale in this priority order. `locale` determines the language and format dates and time are displayed in (e.g. month names, AM/PM or 24-hour format) and the beginning of the week (e.g. Monday in Germany, Sunday in the U.S.) in the dropdown calendar.

### Examples

#### A DateTimeInput with `columns` layout and a default value:

```js
---
type: example
---
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

```js
---
type: example
---
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

```js
---
type: example
---
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

```js
---
type: example
---
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

```js
---
type: example
---
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


### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| DateTimeInput | description | `React.ReactNode` | Yes | - | The label over the composite `DateTimeInput` component |
| DateTimeInput | dateRenderLabel | `Renderable` | Yes | - | The label over the DateInput |
| DateTimeInput | prevMonthLabel | `string` | Yes | - | The screen reader label for the calendar navigation header's prev month button |
| DateTimeInput | nextMonthLabel | `string` | Yes | - | The screen reader label for the calendar navigation header's next month button |
| DateTimeInput | datePlaceholder | `string` | No | - | HTML placeholder text to display when the date input has no value. This should be hint text, not a label replacement. |
| DateTimeInput | timePlaceholder | `string` | No | - | HTML placeholder text to display when the time input has no value. This should be hint text, not a label replacement. |
| DateTimeInput | dateFormat | `string` | No | `'LL'` | The format of the date shown in the `DateInput` when a date is selected. Valid formats are compatible with [Moment formats](https://momentjs.com/docs/#/displaying/format/), including localized formats. If omitted, it will use 'LL' which is a localized date with full month, e.g. "August 6, 2014" |
| DateTimeInput | timeRenderLabel | `Renderable` | Yes | - | The label over the time input |
| DateTimeInput | timeStep | `5 \| 10 \| 15 \| 20 \| 30 \| 60` | No | `30` | The number of minutes to increment by when generating the allowable time options. |
| DateTimeInput | timeFormat | `string` | No | - | The format of the time shown in the `TimeSelect` when a time is selected. Valid formats are compatible with [Moment formats](https://momentjs.com/docs/#/displaying/format/), including localized formats. If omitted, defers to the underlying `TimeSelect`'s default. |
| DateTimeInput | locale | `string` | No | - | A standard language identifier. See [Moment.js](https://momentjs.com/timezone/docs/#/using-timezones/parsing-in-zone/) for more details. This property can also be set via a context property and if both are set then the component property takes precedence over the context property. The web browser's locale will be used if no value is set via a component property or a context property. |
| DateTimeInput | timezone | `string` | No | - | A timezone identifier in the format: *Area/Location* See [List of tz database time zones](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) for the list of possible options. This property can also be set via a context property and if both are set then the component property takes precedence over the context property. The web browser's timezone will be used if no value is set via a component property or a context property. |
| DateTimeInput | invalidDateTimeMessage | `string \| ((rawDateValue: string) => string)` | Yes | - | The message shown to the user when the data is invalid. If a string, shown to the user anytime the input is invalid. If a function, receives a single parameter: - *rawDateValue*: the string entered as a date by the user. Currently, times must be selected from a list, it can never be incorrect, Though `invalidDateTimeMessage()` will be called if the user selects a time without setting the date. |
| DateTimeInput | showMessages | `boolean` | No | `true` | Toggles whether to show built-in messages (the date/time, or the `invalidDateTimeMessage`). Even when set to `false` the component will show user supplied messages by the `messages` prop. @default true |
| DateTimeInput | messages | `FormMessage[]` | No | - | Extra message(s) to be displayed. |
| DateTimeInput | messageFormat | `string` | No | `'LLLL'` | This format of the composite date-time when displayed in messages. Valid formats are defined in the [Moment docs](https://momentjs.com/docs/#/displaying/format/) |
| DateTimeInput | layout | `'stacked' \| 'columns' \| 'inline'` | No | `'inline'` | The layout of this component. Vertically stacked, horizontally arranged in 2 columns, or inline (default). See [FormFieldGroup](FormFieldGroup) for details. |
| DateTimeInput | rowSpacing | `'none' \| 'small' \| 'medium' \| 'large'` | No | `'small'` | Controls the spacing between the inputs when they are in a vertical layout. |
| DateTimeInput | colSpacing | `'none' \| 'small' \| 'medium' \| 'large'` | No | `'medium'` | Controls the spacing between the inputs when they are in a horizontal layout. |
| DateTimeInput | value | `string` | No | - | An ISO 8601 formatted date string representing the current date-time (must be accompanied by an onChange prop). |
| DateTimeInput | defaultValue | `string` | No | - | An ISO 8601 formatted date string to use if `value` isn't provided. |
| DateTimeInput | renderWeekdayLabels | `( \| React.ReactNode \| ((...args: any[]) => React.ReactNode) )[]` | No | - | An array of labels containing the name of each day of the week. The visible portion of the label should be abbreviated (no longer than three characters). Note that screen readers will read this content preceding each date as the `<Calendar />` is navigated. Consider using [AccessibleContent](AccessibleContent) with the `alt` prop containing the full day name for assistive technologies and the children containing the abbreviation. ex. `[<AccessibleContent alt="Monday">Mon</AccessibleContent>, ...]` You must render set the starting day of the week to the one specified by the current locale (e.g. Sunday in the US, Monday in Germany), dates are already displayed this way. By default it will render accessible, localized, abbreviated weekdays with week starts according to the current locale. |
| DateTimeInput | isRequired | `boolean` | No | `false` | Specifies if the input is required (its passed down to the native DOM elements). If its `true` then an empty input will produce an error message (`invalidDateTimeMessage`) |
| DateTimeInput | interaction | `InteractionType` | No | - | Specifies if interaction with the input is enabled, disabled, or readonly. When "disabled", the input changes visibly to indicate that it cannot receive user interactions. When "readonly" the input still cannot receive user interactions but it keeps the same styles as if it were enabled. |
| DateTimeInput | onChange | `(event: SyntheticEvent, isoValue?: string) => void` | No | - | Called when the date-time value has changed. The passed in parameters are: - *event*: The triggering event (which may be from the underlying `DateInput` or `TimeSelect`) - *isoValue*: The new date value in ISO8601 format, undefined if its invalid |
| DateTimeInput | dateInputRef | `(el: HTMLInputElement \| null) => void` | No | - | The HTML `input` element where the date is entered. |
| DateTimeInput | timeInputRef | `(el: HTMLInputElement \| null) => void` | No | - | The HTML `input` element where the time is entered. |
| DateTimeInput | onBlur | `(e: SyntheticEvent) => void` | No | - | onBlur event handler for when focus leaves DateTimeInput. Does not fire when focus moves between DateInput and TimeSelect within the component |
| DateTimeInput | disabledDates | `string[] \| ((isoDateToCheck: string) => boolean)` | No | - |  |
| DateTimeInput | disabledDateTimeMessage | `string \| ((rawDateValue: string) => string)` | No | - | Error message shown to the user if they enter a date that is disabled. If not specified the component will show the `invalidDateTimeMessage`. |
| DateTimeInput | allowNonStepInput | `boolean` | No | `false` | Whether to allow the user to enter non-step divisible values in the time input field. Note that even if this is set to false one can enter non-step divisible values programmatically. The user will need to enter the value exactly (except for lower/uppercase) as specified by the `timeFormat` prop for it to be accepted. Default is `undefined` which equals to `false` |
| DateTimeInput | initialTimeForNewDate | `string` | No | - | The default time to be prefilled if a day is selected. The time input has to be empty for this to be applied. An error is thrown if the time format is not HH:MM. |
| DateTimeInput | reset | `(reset: () => void) => void` | No | - | Used for getting the internal reset function of DateTimeInput. If that function is called, the component will reset to its default inner state. The callback function will be called in componentDidMount NOTE: this won't call onChange, so you have to reset the value manually when calling reset |

### Usage

Install the package:

```shell
npm install @instructure/ui-date-time-input
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { DateTimeInput } from '@instructure/ui-date-time-input'
```

