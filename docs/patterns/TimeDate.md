---
title: Time and Date Input
category: Patterns
id: TimeDate
---

### Time input
The easiest way to get going with a time input is to use [TimeSelect](#TimeSelect). Should you need more customizability however, you can always configure a [Select](#Select) however you see fit. See that [documentation](#Select) for more examples of configuring a Select. The following example uses [Moment.js](https://momentjs.com/docs/#/parsing/) to demonstrate how you might create a time input in your app.

```js
---
render: false
example: true
---

class CustomTimeInput extends React.Component {
  constructor (props) {
    super(props)

    this._options = this.getOptions()

    this.state = {
      inputValue: '',
      filteredOptions: this._options,
      isShowingOptions: false,
      highlightedOptionId: null,
      selectedOptionId: null
    }  
  }

  _timeStep = 30

  findOptionById = (queryId) => {
    return this._options.find(({ id }) => id === queryId)
  }

  formatDateId = (date) => {
    // ISO8601 strings may contain a space. Remove any spaces before using the
    // date as the id.
    const dateStr = date.toISOString()
    return dateStr ? dateStr.replace(/\s/g,'') : null
  }

  getOptions = () => {
    const date = currentDateTime()
    const options = []

    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60 / this._timeStep; minute++) {
        const minutes = minute * this._timeStep
        date.hour(hour).minute(minutes)
        // store time options
        options.push({
          id: this.formatDateId(date),
          label: formatTime(date)
        })
      }
    }
    return options
  }

  getSelectedOption = () => {
    const { selectedOptionId } = this.state
    return this.findOptionById(selectedOptionId)
  }

  filterOptions = (inputValue) => {
    return this._options.filter(option => (
      option.label.toLowerCase().startsWith(inputValue.toLowerCase())
    ))
  }

  matchValue = () => {
    const {
      inputValue,
      filteredOptions,
      highlightedOptionId,
      selectedOptionId
    } = this.state

    // an option matching user input exists
    if (filteredOptions.length === 1) {
      const onlyOption = filteredOptions[0]
      // automatically select the matching option
      if (onlyOption.label.toLowerCase() === inputValue.toLowerCase()) {
        return {
          inputValue: onlyOption.label,
          selectedOptionId: onlyOption.id,
          filteredOptions: this.filterOptions('')
        }
      }
    }

    // no match found, return selected option label to input
    const selectedOption = this.getSelectedOption()

    if (selectedOption) {
      return { inputValue: selectedOption.label }
    }
    // input value is from highlighted option, not user input
    if (highlightedOptionId) {
      if (inputValue === this.findOptionById(highlightedOptionId).label) {
        return {
          inputValue: '',
          filteredOptions: this.filterOptions('')
        }
      }
    }
  }

  renderOptions () {
    return this.state.filteredOptions.map((option) => {
      const { id, label } = option
      return (
        <Select.Option
          id={id}
          key={id}
          isHighlighted={id === this.state.highlightedOptionId}
          isSelected={id === this.state.selectedOptionId}
        >
          {label}
        </Select.Option>
      )
    })
  }

  render () {
    const {
      inputValue,
      isShowingOptions,
      highlightedOptionId
    } = this.state

    return (
      <Select
        renderLabel="Time"
        width="20rem"
        inputValue={inputValue}
        isShowingOptions={isShowingOptions}
        onRequestShowOptions={(event) => {
          this.setState({ isShowingOptions: true })
        }}
        onRequestHideOptions={(event) => {
          const { selectedOptionId } = this.state
          const option = this.findOptionById(selectedOptionId)

          this.setState({
            isShowingOptions: false,
            highlightedOptionId: null,
            inputValue: selectedOptionId ? option.label : '',
            filteredOptions: this.filterOptions(''),
            ...this.matchValue()
          })
        }}
        onRequestHighlightOption={(event, { id }) => {
          const { type } = event
          const option = this.findOptionById(id).label

          this.setState((state) => ({
            highlightedOptionId: id,
            inputValue: type === 'keydown' ? option : state.inputValue
          }))
        }}
        onRequestSelectOption={(event, { id }) => {
          this.setState({
            isShowingOptions: false,
            selectedOptionId: id,
            inputValue: this.findOptionById(id).label,
            filteredOptions: this.filterOptions('')
          })
        }}
        onInputChange={(event) => {
          const value = event.target.value
          const newOptions = this.filterOptions(value)

          this.setState((state) => ({
            inputValue: value,
            filteredOptions: newOptions,
            highlightedOptionId: newOptions.length > 0 ? newOptions[0].id : null,
            isShowingOptions: true
          }))
        }}
      >
        {isShowingOptions && this.renderOptions()}
      </Select>
    )
  }
}

// Utilities
const locale = 'en-us'
const timezone = 'America/Denver'

const parseDate = (dateStr) => {
  return moment.tz(dateStr, [moment.ISO_8601, 'llll', 'LLLL', 'lll', 'LLL', 'll', 'LL', 'l', 'L'], locale, timezone)
}

const currentDateTime = () => {
  return moment().locale(locale).tz(timezone)
}

const formatTime = (value) => {
  const date = parseDate(value)
  return date.format('LT')
}

render(<CustomTimeInput width="20rem" />)
```


### Date and time
`TimeSelect` can also be used with [DateInput](#DateInput) to create a DateTime component. See the DateInput [documentation](#DateInput) for more information around configuring a DateInput. The following example shows how to compose the two inputs with a [FormFieldGroup](#FormFieldGroup).

> Note: this is a read only example and will not respond to interaction.

```javascript
---
example: true
render: false
---

class CustomDateTimeInput extends React.Component {
  render() {
    return (
      <FormFieldGroup
        description="Pick a date and time"
        colSpacing="medium"
        rowSpacing="small"
        layout="stacked"
        vAlign="top"
      >
        <DateInput
          renderLabel="Date"
          width="20rem"
          interaction="readonly"
          renderWeekdayLabels={[]}
        />
        <TimeSelect
          renderLabel="Time"
          width="20rem"
          interaction="readonly"
        />
      </FormFieldGroup>
    )
  }
}

render(<CustomDateTimeInput />)
```
