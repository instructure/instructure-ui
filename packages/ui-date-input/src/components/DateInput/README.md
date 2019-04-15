---
describes: DateInputControlled
id: DateInputControlled__README
---

The `DateInput` component provides a visual interface for inputting date data.

### Composing a DateInput in your Application
`DateInput` uses `Calendar` internally. See [Calendar](#Calendar) for more detailed
documentation and guided examples. `DateInput` shares many of the same `Calendar`
props and it is created the same way with some additional attributes and callback
methods for the input. The following example is configured similar to the `Calendar`
examples using [Moment.js](https://momentjs.com/docs/#/parsing/).

```javascript
---
example: true
render: false
---

class Example extends React.Component {
  state = {
    value: '',
    isShowingCalendar: false,
    todayDate: parseDate('2019-08-28').toISOString(),
    selectedDate: null,
    renderedDate: parseDate('2019-08-01').toISOString(),
    disabledDates: [
      parseDate('2019-08-14').toISOString(),
      parseDate('2019-08-19').toISOString(),
      parseDate('2019-08-29').toISOString()
    ],
    messages: []
  }

  generateMonth = (renderedDate = this.state.renderedDate) => {
    const date = parseDate(renderedDate)
      .startOf('month')
      .startOf('week')

    return Array.apply(null, Array(Calendar.DAY_COUNT)).map(() => {
      const currentDate = date.clone()
      date.add(1, 'days')
      return currentDate
    })
  }

  formatDate = (dateInput) => {
    const date = parseDate(dateInput)
    return `${date.format('MMMM')} ${date.format('D')}, ${date.format('YYYY')}`
  }

  handleChange = (event, { value }) => {
    const newDateStr = parseDate(value).toISOString()

    this.setState(({ renderedDate }) => ({
      value,
      selectedDate: newDateStr,
      renderedDate: newDateStr || renderedDate,
      messages: []
    }))
  }

  handleShowCalendar = (event) => {
    this.setState({ isShowingCalendar: true })
  }

  handleHideCalendar = (event) => {
    this.setState(({ selectedDate, disabledDates, value }) => ({
      isShowingCalendar: false,
      value: selectedDate ? this.formatDate(selectedDate) : value
    }))
  }

  handleValidateDate = (event) => {
    const { selectedDate, value } = this.state

    // We don't have a selectedDate but we have a value. That means that the value
    // could not be parsed and so the date is invalid
    if (!selectedDate && value) {
      this.setState({
        messages: [{ type: 'error', text: 'This date is invalid' }]
      })
    }

    // Display a message if the user has typed in a value that corresponds to a
    // disabledDate
    if (this.isDisabledDate(parseDate(selectedDate))) {
      this.setState({
        messages: [{ type: 'error', text: 'This date is disabled' }]
      })
    }
  }

  handleDayClick = (event, { date }) => {
    this.setState({
      selectedDate: date,
      renderedDate: date,
      messages: []
    })
  }

  handleSelectNextDay = (event) => {
    this.modifySelectedDate('day', 1)
  }

  handleSelectPrevDay = (event) => {
    this.modifySelectedDate('day', -1)
  }

  handleRenderNextMonth = (event) => {
    this.modifyRenderedDate('month', 1)
  }

  handleRenderPrevMonth = (event) => {
    this.modifyRenderedDate('month', -1)
  }

  modifyRenderedDate = (type, step) => {
    this.setState(({ renderedDate }) => {
      return { renderedDate: this.modifyDate(renderedDate, type, step) }
    })
  }

  modifySelectedDate = (type, step) => {
    this.setState(({ selectedDate, renderedDate }) => {
      // We are either going to increase or decrease our selectedDate by 1 day.
      // If we do not have a selectedDate yet, we'll just select the first day of
      // the currently rendered month instead.
      const newDate = selectedDate
        ? this.modifyDate(selectedDate, type, step)
        : parseDate(renderedDate).startOf('month').toISOString()

      return {
        selectedDate: newDate,
        renderedDate: newDate,
        value: this.formatDate(newDate),
        messages: []
      }
    })
  }

  modifyDate = (dateStr, type, step) => {
    const date = parseDate(dateStr)
    date.add(step, type)
    return date.toISOString()
  }

  isDisabledDate = (date, disabledDates = this.state.disabledDates) => {
    return disabledDates.reduce((result, disabledDate) => {
      return result || date.isSame(disabledDate, 'day')
    }, false)
  }

  renderWeekdayLabels = () => {
    const date = parseDate(this.state.renderedDate).startOf('week')

    return Array.apply(null, Array(7)).map(() => {
      const currentDate = date.clone()
      date.add(1, 'day')

      return (
        <AccessibleContent alt={currentDate.format('dddd')}>
          {currentDate.format('dd')}
        </AccessibleContent>
      )
    })
  }

  renderDays () {
    const {
      renderedDate,
      selectedDate,
      todayDate,
    } = this.state

    return this.generateMonth().map((date) => {
      const dateStr = date.toISOString()

      return (
        <DateInputControlled.Day
          key={dateStr}
          date={dateStr}
          interaction={this.isDisabledDate(date) ? 'disabled' : 'enabled'}
          isSelected={date.isSame(selectedDate, 'day')}
          isToday={date.isSame(todayDate, 'day')}
          isOutsideMonth={!date.isSame(renderedDate, 'month')}
          label={`${date.format('D')} ${date.format('MMMM')} ${date.format('YYYY')}`}
          onClick={this.handleDayClick}
        >
          {date.format('D')}
        </DateInputControlled.Day>
      )
    })
  }

  render () {
    const {
      value,
      isShowingCalendar,
      renderedDate,
      messages
    } = this.state

    const date = parseDate(this.state.renderedDate)

    const buttonProps = (type = 'prev') => ({
      size: 'small',
      variant: 'icon',
      icon: type === 'prev'
        ? <IconArrowOpenStart.Solid color="primary" />
        : <IconArrowOpenEnd.Solid color="primary" />,
      children: (
        <ScreenReaderContent>
          {type === 'prev' ? 'Previous month' : 'Next month'}
        </ScreenReaderContent>
      )
    })

    return (
      <DateInputControlled
        label="Choose a date"
        value={value}
        onChange={this.handleChange}
        width="20rem"
        isInline
        messages={messages}
        isShowingCalendar={isShowingCalendar}
        onRequestValidateDate={this.handleValidateDate}
        onRequestShowCalendar={this.handleShowCalendar}
        onRequestHideCalendar={this.handleHideCalendar}
        onRequestSelectNextDay={this.handleSelectNextDay}
        onRequestSelectPrevDay={this.handleSelectPrevDay}
        onRequestRenderNextMonth={this.handleRenderNextMonth}
        onRequestRenderPrevMonth={this.handleRenderPrevMonth}
        renderNavigationLabel={
          <span>
            <div>{date.format('MMMM')}</div>
            <div>{date.format('YYYY')}</div>
          </span>
        }
        renderPrevMonthButton={<Button {...buttonProps('prev')} />}
        renderNextMonthButton={<Button {...buttonProps('next')} />}
        renderWeekdayLabels={this.renderWeekdayLabels()}
      >
        {this.renderDays()}
      </DateInputControlled>
    )
  }
}

const locale = 'en-us'
const timezone = 'America/Denver'

const parseDate = (dateStr) => {
  return moment.tz(dateStr, [moment.ISO_8601, 'llll', 'LLLL', 'lll', 'LLL', 'll', 'LL', 'l', 'L'], locale, timezone)
}

render(<Example />)
```

#### Some dates to keep track of
* `todayDate` - the date that represents today
* `selectedDate` - the user's selected date
* `renderedDate` - the date that the user is viewing as they navigate the `Calendar`
* `disabledDates` - any dates that are disabled

#### Rendering `DateInput.Day` children
`DateInput` accepts children of type `DateInput.Day`. Both `DateInput.Day` and
`Calendar.Day` are exporting the same `Day` component. The documentation for
`Day` can be found in [Calendar](#Calendar).

#### Handling onChange
When the `DateInput` fires an `onChange` event:
* The value should be updated and any messages should be cleared
* Verify if the value can be parsed as a date
* If it can be parsed, update the `selectedDate` and `renderedDate` with that date
* If it cannot be parsed, the `selectedDate` is set to null and the `renderedDate`
stays the same

#### Handling onRequestHideCalendar
When the `DateInput` fires `onRequestHideCalendar`:
* The calendar should be hidden
* The value should be updated with a formatted version of the `selectedDate` if
it exists. See "Formatting user input" below

#### Formatting user input
Date formats can vary widely (ex. '8-9-19' vs '8/9/19'). When the `Calendar` is
hidden, the input value should be converted to a consistent, standardized format.
The formatted result of the raw input '8/9/19'
could be "August 9, 2019".

#### Handling onRequestValidateDate
When the `DateInput` fires `onRequestValidateDate`, the provided user input
should be validated. If the value cannot be parsed as a valid date, or if the
`selectedDate` is disabled, the user should be notified via the `messages` prop.
