---
describes: DateInput
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
            startYear: 1999,
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
          startYear: 1999,
          endYear: 2024
        }}
      />
    )
  }

  render(<Example />)
  ```
