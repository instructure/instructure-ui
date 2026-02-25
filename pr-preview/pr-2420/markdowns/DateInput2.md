# DateInput2


> _Info_: `DateInput2` is an upgrade to the [`DateInput`](/#DateInput) component, offering easier configuration, better UX, improved accessibility, and a year picker. Please consider updating to this for WCAG compatiblity and an overall better experience (for both devs and users).

### Minimal config

```js
---
type: example
---
  const Example = () => {
    const [inputValue, setInputValue] = useState('')
    const [dateString, setDateString] = useState('')
    return (
      <div>
        <DateInput2
          renderLabel="Choose a date"
          screenReaderLabels={{
            calendarIcon: 'Calendar',
            nextMonthButton: 'Next month',
            prevMonthButton: 'Previous month'
          }}
          value={inputValue}
          width="20rem"
          onChange={(e, inputValue, dateString) => {
            setInputValue(inputValue)
            setDateString(dateString)
          }}
          invalidDateErrorMessage="Invalid date"
        />
        <p>
          <Text>Input Value: </Text><code>{inputValue}</code>
          <br />
          <Text>UTC Date String: </Text><code>{dateString}</code>
        </p>
      </div>
    )
  }

  render(<Example />)
```

### Parsing and formatting dates

When typing in a date manually (instead of using the included picker), the component tries to parse the date as you type it in. By default parsing is based on the user's locale which determines the order of day, month and year (e.g.: a user with US locale will have MONTH/DAY/YEAR order, and someone with GB locale will have DAY/MONTH/YEAR order).

Any of the following separators can be used when typing a date: `,`, `-`, `.`, `/` or a whitespace however on blur the date will be formatted according to the locale and separators will be changed and leading zeros also adjusted.

If you want different parsing and formatting then the current locale you can use the `dateFormat` prop which accepts either a string with a name of a different locale (so you can use US date format even if the user is France) or a parser and formatter functions.

The default parser also has a limitation of not working with years before `1000` and after `9999`. These values are invalid by default but not with custom parsers.

```js
---
type: example
---
const Example = () => {
  const [value, setValue] = useState('')
  const [value2, setValue2] = useState('')
  const [value3, setValue3] = useState('')

  return (
    <div>
      <Text as="p">US locale with default format:</Text>
      <DateInput2
        renderLabel="Choose a date"
        screenReaderLabels={{
          calendarIcon: 'Calendar',
          nextMonthButton: 'Next month',
          prevMonthButton: 'Previous month'
        }}
        width="20rem"
        value={value}
        locale="en-us"
        onChange={(e, value) => setValue(value)}
      />
      <Text as="p">US locale with german date format:</Text>
      <DateInput2
        renderLabel="Choose a date"
        screenReaderLabels={{
          calendarIcon: 'Calendar',
          nextMonthButton: 'Next month',
          prevMonthButton: 'Previous month'
        }}
        width="20rem"
        value={value2}
        locale="en-us"
        dateFormat="de-de"
        onChange={(e, value) => setValue2(value)}
      />
      <Text as="p">US locale with ISO date format:</Text>
      <DateInput2
        renderLabel="Choose a date"
        screenReaderLabels={{
          calendarIcon: 'Calendar',
          nextMonthButton: 'Next month',
          prevMonthButton: 'Previous month'
        }}
        width="20rem"
        value={value3}
        locale="en-us"
        dateFormat={{
          parser: (input) => {
            // split input on '.', whitespace, '/', ',' or '-' using regex: /[.\s/.-]+/
            // the '+' allows splitting on consecutive delimiters
            const [year, month, day] = input.split(/[,.\s/.-]+/)
            const newDate = new Date(year, month-1, day)
            return isNaN(newDate) ? '' : newDate
          },
          formatter: (date) => {
            // vanilla js formatter but you could use a date library instead
            const year = date.getFullYear()
            // month is zero indexed so add 1
            const month = `${date.getMonth() + 1}`.padStart(2, '0')
            const day = `${date.getDate()}`.padStart(2, '0')
            return `${year}-${month}-${day}`
          }
        }}
        onChange={(e, value) => setValue3(value)}
      />
    </div>
  )
}

render(<Example />)
```

### Timezones

In the examples above you can see that the `onChange` callback also return a UTC date string. This means it is timezone adjusted. If the timezone is not set via the `timezone` prop, it is calculated/assumed from the user's machine. So if a user chooses September 10th 2024 with the timezone 'Europe/Budapest', the `onChange` function will return `2024-09-09T22:00:00.000Z` because Budapest is two hours ahead of UTC (summertime).

### With year picker

```js
---
type: example
---
  const Example = () => {
    const [inputValue, setInputValue] = useState('')
    const [dateString, setDateString] = useState('')
    return (
      <div>
        <DateInput2
          renderLabel="Choose a date"
          screenReaderLabels={{
            calendarIcon: 'Calendar',
            nextMonthButton: 'Next month',
            prevMonthButton: 'Previous month'
          }}
          value={inputValue}
          width="20rem"
          onChange={(e, inputValue, dateString) => {
            setInputValue(inputValue)
            setDateString(dateString)
          }}
          invalidDateErrorMessage="Invalid date"
          withYearPicker={{
            screenReaderLabel: 'Year picker',
            startYear: 1900,
            endYear: 2024
          }}
        />
        <p>
          <Text>Input Value: </Text><code>{inputValue}</code>
          <br />
          <Text>UTC Date String: </Text><code>{dateString}</code>
        </p>
      </div>
    )
  }

  render(<Example />)
```

### Date validation

By default `DateInput2` only does date validation if the `invalidDateErrorMessage` prop is provided. Validation is triggered on the blur event of the input field. Invalid dates are determined current locale.

If you want to do more complex validation (e.g. only allow a subset of dates) you can use the `onRequestValidateDate` and `messages` props.

```js
---
type: example
---
const Example = () => {
  const [value, setValue] = useState('')
  const [dateString, setDateString] = useState('')
  const [messages, setMessages] = useState([])

  const handleDateValidation = (e, inputValue, utcIsoDate) => {
    // utcIsoDate will be an empty string if the input cannot be parsed as a date

    const date = new Date(utcIsoDate)

    // don't validate empty input
    if (!utcIsoDate && inputValue.length > 0) {
      setMessages([{
        type: 'error',
        text: 'This is not a valid date'
      }])
    } else if (date < new Date('1990-01-01')) {
      setMessages([{
        type: 'error',
        text: 'Select date after January 1, 1990'
      }])
    } else {
      setMessages([])
    }
  }

  return (
    <DateInput2
      renderLabel="Choose a date after January 1, 1990"
      screenReaderLabels={{
        calendarIcon: 'Calendar',
        nextMonthButton: 'Next month',
        prevMonthButton: 'Previous month'
      }}
      width="20rem"
      value={value}
      messages={messages}
      onRequestValidateDate={handleDateValidation}
      onChange={(e, value) => setValue(value)}
      withYearPicker={{
        screenReaderLabel: 'Year picker',
        startYear: 1900,
        endYear: 2024
      }}
    />
  )
}

render(<Example />)
```

### Date format hint

If the `placeholder` property is undefined it will display a hint for the date format (like `DD/MM/YYYY`). Usually it is recommended to leave it as it is for a better user experience.

### Disabling dates

You can use the `disabledDates` prop to disable specific dates. It accepts either an array of ISO8601 date strings or a function. Keep in mind that this will only disable the dates in the calendar and does not prevent the user the enter them into the input field. To validate those values please use the `onRequestValidateDate` prop.

```js
---
type: example
---
const Example = () => {
  const [inputValue, setInputValue] = useState('2/5/2025')
  const [dateString, setDateString] = useState('')
  return (
    <DateInput2
      renderLabel="Choose a date"
      disabledDates={['2025-02-11', '2025-02-12', '2025-02-13']}
      screenReaderLabels={{
        calendarIcon: 'Calendar',
        nextMonthButton: 'Next month',
        prevMonthButton: 'Previous month'
      }}
      value={inputValue}
      locale="en-us"
      width="20rem"
      onChange={(e, inputValue, dateString) => {
        setInputValue(inputValue)
        setDateString(dateString)
      }}
      invalidDateErrorMessage="Invalid date"
    />
  )
}

render(<Example />)
```


### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| DateInput2 | renderLabel | `Renderable` | Yes | - | Specifies the input label. |
| DateInput2 | screenReaderLabels | `{ calendarIcon: string prevMonthButton: string nextMonthButton: string }` | Yes | - |  |
| DateInput2 | value | `string` | No | - | Specifies the input value. |
| DateInput2 | placeholder | `string` | No | - | Placeholder text for the input field. If it's left undefined it will display a hint for the date format (like `DD/MM/YYYY`). |
| DateInput2 | onChange | `( event: React.SyntheticEvent, inputValue: string, utcDateString: string ) => void` | No | - | Callback fired when the input changes. |
| DateInput2 | onBlur | `( event: React.SyntheticEvent, value: string, utcDateString: string ) => void` | No | - | Callback executed when the input fires a blur event. |
| DateInput2 | interaction | `'enabled' \| 'disabled' \| 'readonly'` | No | `'enabled'` | Specifies if interaction with the input is enabled, disabled, or readonly. When "disabled", the input changes visibly to indicate that it cannot receive user interactions. When "readonly" the input still cannot receive user interactions but it keeps the same styles as if it were enabled. |
| DateInput2 | isRequired | `boolean` | No | `false` | Specifies if the input is required. |
| DateInput2 | isInline | `boolean` | No | `false` | Controls whether the input is rendered inline with other elements or if it is rendered as a block level element. |
| DateInput2 | width | `string` | No | - | Specifies the width of the input. |
| DateInput2 | messages | `FormMessage[]` | No | - | Displays informational and error messages, used for input validation, can also display screenreader-only messages. Also changes the border color of the component on success/error. This is automatically set to `invalidDateErrorMessage` when the date is invalid |
| DateInput2 | invalidDateErrorMessage | `string` | No | - | The message shown to the user when the date is invalid. If this prop is not set, validation is bypassed. If it's set to an empty string, validation happens and the input border changes to red if validation hasn't passed. |
| DateInput2 | locale | `string` | No | - | A standard language identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#locales) for more details. This property can also be set via a context property and if both are set then the component property takes precedence over the context property. The web browser's locale will be used if no value is set via a component property or a context property. |
| DateInput2 | timezone | `string` | No | - | A timezone identifier in the format: *Area/Location* See [List of tz database time zones](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) for the list of possible options. This property can also be set via a context property and if both are set then the component property takes precedence over the context property. The system timezone will be used if no value is set via a component property or a context property. |
| DateInput2 | withYearPicker | `{ screenReaderLabel: string onRequestYearChange?: (e: SyntheticEvent, requestedYear: number) => void startYear: number endYear: number }` | No | - | If set, years can be picked from a dropdown. It accepts an object. screenReaderLabel: string // e.g.: i18n("pick a year") onRequestYearChange?:(e: React.MouseEvent,requestedYear: number): void // if set, on year change, only this will be called and no internal change will take place startYear: number // e.g.: 2001, sets the start year of the selectable list endYear: number // e.g.: 2030, sets the end year of the selectable list |
| DateInput2 | dateFormat | `\| { parser: (input: string) => Date \| null formatter: (date: Date) => string } \| string` | No | - | By default the date format is determined by the locale but can be changed via this prop to an alternate locale (passing it in as a string) or a custom parser and formatter (both as functions) |
| DateInput2 | onRequestValidateDate | `( event: React.SyntheticEvent, value: string, utcDateString: string ) => void` | No | - | Callback executed when the input fires a blur event or a date is selected from the picker. |
| DateInput2 | renderCalendarIcon | `Renderable` | No | - | Custom icon for the icon button opening the picker. |
| DateInput2 | margin | `Spacing` | No | - | Margin around the component. Accepts a `Spacing` token. See token values and example usage in [this guide](https://instructure.design/#layout-spacing). |
| DateInput2 | disabledDates | `string[] \| ((isoDateToCheck: string) => boolean)` | No | - |  |
| DateInput2 | inputRef | `(inputElement: HTMLInputElement \| null) => void` | No | - | A function that provides a reference to the inner input element |

### Usage

Install the package:

```shell
npm install @instructure/ui-date-input
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { DateInput2 } from '@instructure/ui-date-input'
```

