---
describes: DateInput
---

This component is an updated version of [`DateInput`](/#DateInput) that's easier to configure for developers and use for end users. It has better accessibility and a year picker option. We recommend using this one instead and in our next major release (v10) it will replace `DateInput`.

### Minimal config

- ```js
  class Example extends React.Component {
    state = { value: '' }

    render() {
      return (
        <DateInput2
          renderLabel="Choose a date"
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
          assistiveText="Type a date or use arrow keys to navigate date picker."
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
        assistiveText="Type a date or use arrow keys to navigate date picker."
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
