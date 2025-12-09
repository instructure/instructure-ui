---
describes: DateInput2
---

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
          Input Value: <code>{inputValue}</code>
          <br />
          UTC Date String: <code>{dateString}</code>
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
      <p>US locale with default format:</p>
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
      <p>US locale with german date format:</p>
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
      <p>US locale with ISO date format:</p>
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
          Input Value: <code>{inputValue}</code>
          <br />
          UTC Date String: <code>{dateString}</code>
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
        type: 'newError',
        text: 'This is not a valid date'
      }])
    } else if (date < new Date('1990-01-01')) {
      setMessages([{
        type: 'newError',
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
