---
describes: DateInput2
---

This component is an updated version of [`DateInput`](/#DateInput) that's easier to configure for developers, has a better UX, better accessibility features and a year picker. We recommend using this instead of `DateInput` which will be deprecated in the future.

### Minimal config

- ```js
  class Example extends React.Component {
    state = { value: '' }

    render() {
      return (
        <DateInput2
          renderLabel="Choose a date"
          screenReaderLabels={{
            calendarIcon: 'Calendar',
            nextMonthButton: 'Next month',
            prevMonthButton: 'Previous month'
          }}
          value={this.state.value}
          width="20rem"
          onChange={(e, value) => this.setState({ value })}
          invalidDateErrorMessage="Invalid date"
        />
      )
    }
  }

  render(<Example />)
  ```

- ```js
  const Example = () => {
    const [value, setValue] = useState('')
    return (
      <DateInput2
        renderLabel="Choose a date"
        screenReaderLabels={{
          calendarIcon: 'Calendar',
          nextMonthButton: 'Next month',
          prevMonthButton: 'Previous month'
        }}
        value={value}
        width="20rem"
        onChange={(e, value) => setValue(value)}
        invalidDateErrorMessage="Invalid date"
      />
    )
  }

  render(<Example />)
  ```

### With year picker

- ```js
  class Example extends React.Component {
    state = { value: '' }

    render() {
      return (
        <DateInput2
          renderLabel="Choose a date"
          screenReaderLabels={{
            calendarIcon: 'Calendar',
            nextMonthButton: 'Next month',
            prevMonthButton: 'Previous month'
          }}
          width="20rem"
          value={this.state.value}
          onChange={(e, value) => this.setState({ value })}
          invalidDateErrorMessage="Invalid date"
          withYearPicker={{
            screenReaderLabel: 'Year picker',
            startYear: 1900,
            endYear: 2024
          }}
        />
      )
    }
  }

  render(<Example />)
  ```

- ```js
  const Example = () => {
    const [value, setValue] = useState('')

    return (
      <DateInput2
        renderLabel="Choose a date"
        screenReaderLabels={{
          calendarIcon: 'Calendar',
          nextMonthButton: 'Next month',
          prevMonthButton: 'Previous month'
        }}
        width="20rem"
        value={value}
        onChange={(e, value) => setValue(value)}
        invalidDateErrorMessage="Invalid date"
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

### Date validation

By default `DateInput2` only does date validation if the `invalidDateErrorMessage` prop is provided. This uses the browser's `Date` object to try an parse the user provided date and displays the error message if it fails. Validation is only triggered on the blur event of the input field.

If you want to do a more complex validation than the above (e.g. only allow a subset of dates) you can use the `onRequestValidateDate` prop to pass a validation function. This function will run on blur or on selecting the date from the picker. The result of the internal validation will be passed to this function. Then you have to set the error messages accordingly. Check the following example for more details:

```js
---
type: example
---
const Example = () => {
  const [value, setValue] = useState('')
  const [messages, setMessages] = useState([])

  const handleDateValidation = (dateString, isValidDate) => {
    if (!isValidDate) {
      setMessages([{
        type: 'error',
        text: 'This is not a valid date'
      }])
    } else if (new Date(dateString) < new Date('January 1, 1900')) {
      setMessages([{
        type: 'error',
        text: 'Use date after January 1, 1900'
      }])
    } else {
      setMessages([])
    }
  }

  return (
    <DateInput2
      renderLabel="Choose a date after January 1, 1900"
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

### Date formatting

The display format of the dates can be set via the `formatDate` property. It will be applied if the user clicks on a date in the date picker of after blur event from the input field.
Something to pay attention to is that the date string passed back in the callback function **is in UTC timezone**.

```js
---
type: example
---
const Example = () => {
  const [value1, setValue1] = useState('')
  const [value2, setValue2] = useState('')
  const [value3, setValue3] = useState('')

  const shortDateFormatFn = (dateString, locale, timezone) => {
    return new Date(dateString).toLocaleDateString(locale, {
      month: 'numeric',
      year: 'numeric',
      day: 'numeric',
      timeZone: timezone,
    })
  }

  const isoDateFormatFn = (dateString, locale, timezone) => {
    // this is a simple way to get ISO8601 date in a specific timezone but should not be used in production
    // please use a proper date library instead like date-fns, luxon or dayjs
    const localeDate = new Date(dateString).toLocaleDateString('sv', {
      month: 'numeric',
      year: 'numeric',
      day: 'numeric',
      timeZone: timezone,
    })

    return localeDate
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
        <DateInput2
          renderLabel="Default format"
          screenReaderLabels={{
            calendarIcon: 'Calendar',
            nextMonthButton: 'Next month',
            prevMonthButton: 'Previous month'
          }}
          isInline
          width="20rem"
          value={value1}
          onChange={(e, value) => setValue1(value)}
          withYearPicker={{
            screenReaderLabel: 'Year picker',
            startYear: 1900,
            endYear: 2024
          }}
        />
        <DateInput2
          renderLabel="Short format in current locale"
          screenReaderLabels={{
            calendarIcon: 'Calendar',
            nextMonthButton: 'Next month',
            prevMonthButton: 'Previous month'
          }}
          isInline
          width="20rem"
          value={value2}
          onChange={(e, value) => setValue2(value)}
          formatDate={shortDateFormatFn}
          withYearPicker={{
            screenReaderLabel: 'Year picker',
            startYear: 1900,
            endYear: 2024
          }}
        />
        <DateInput2
          renderLabel="ISO8601"
          screenReaderLabels={{
            calendarIcon: 'Calendar',
            nextMonthButton: 'Next month',
            prevMonthButton: 'Previous month'
          }}
          isInline
          width="20rem"
          value={value3}
          onChange={(e, value) => setValue3(value)}
          formatDate={isoDateFormatFn}
          withYearPicker={{
            screenReaderLabel: 'Year picker',
            startYear: 1900,
            endYear: 2024
          }}
        />
    </div>
  )
}

render(<Example />)
```
