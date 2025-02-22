---
describes: Calendar
---

The `Calendar` component provides a visual interface for date data.

### Default config

For ease of use in most situations, the `Calendar` component provides a default
configuration. The default configuration can be overridden by providing props
to the `Calendar` component.

```js
---
type: example
---
<Calendar/>
```

### Default config with additional props

- ```js
  class Example extends React.Component {
    state = {
      selectedDate: '',
      visibleMonth: '2025-05'
    }

    render = () => (
      <Calendar
        visibleMonth={this.state.visibleMonth}
        currentDate="2023-12-15"
        disabledDates={['2023-12-22', '2023-12-12', '2023-12-11']}
        selectedDate={this.state.selectedDate}
        onRequestRenderNextMonth={(_e, requestedMonth) =>
          this.setState({ visibleMonth: requestedMonth })
        }
        onRequestRenderPrevMonth={(_e, requestedMonth) =>
          this.setState({ visibleMonth: requestedMonth })
        }
        onDateSelected={(date) => {
          this.setState({ selectedDate: date })
        }}
      />
    )
  }
  render(<Example />)
  ```

- ```js
  const Example = () => {
    const [selectedDate, setSelectedDate] = useState('')
    const [visibleMonth, setVisibleMonth] = useState('2025-05')

    return (
      <Calendar
        visibleMonth={visibleMonth}
        currentDate="2023-12-15"
        disabledDates={['2023-12-22', '2023-12-12', '2023-12-11']}
        selectedDate={selectedDate}
        onRequestRenderNextMonth={(_e, requestedMonth) =>
          setVisibleMonth(requestedMonth)
        }
        onRequestRenderPrevMonth={(_e, requestedMonth) =>
          setVisibleMonth(requestedMonth)
        }
        onDateSelected={(date) => {
          setSelectedDate(date)
        }}
      />
    )
  }
  render(<Example />)
  ```

### With year picker

- ```js
  class Example extends React.Component {
    state = {
      selectedDate: '',
      visibleMonth: '2024-02'
    }

    render = () => (
      <Calendar
        visibleMonth={this.state.visibleMonth}
        currentDate="2024-02-29"
        disabledDates={['2023-12-22', '2023-12-12', '2023-12-11']}
        selectedDate={this.state.selectedDate}
        onRequestRenderNextMonth={(_e, requestedMonth) =>
          this.setState({ visibleMonth: requestedMonth })
        }
        onRequestRenderPrevMonth={(_e, requestedMonth) =>
          this.setState({ visibleMonth: requestedMonth })
        }
        onDateSelected={(date) => {
          this.setState({ selectedDate: date })
        }}
        withYearPicker={{
          screenReaderLabel: 'Year picker',
          startYear: 1999,
          endYear: 2024,
          maxHeight: '200px'
        }}
      />
    )
  }
  render(<Example />)
  ```

- ```js
  const Example = () => {
    const [selectedDate, setSelectedDate] = useState('')
    const [visibleMonth, setVisibleMonth] = useState('2024-02')

    return (
      <Calendar
        visibleMonth={visibleMonth}
        currentDate="2024-02-29"
        disabledDates={['2023-12-22', '2023-12-12', '2023-12-11']}
        selectedDate={selectedDate}
        onRequestRenderNextMonth={(_e, requestedMonth) =>
          setVisibleMonth(requestedMonth)
        }
        onRequestRenderPrevMonth={(_e, requestedMonth) =>
          setVisibleMonth(requestedMonth)
        }
        onDateSelected={(date) => {
          setSelectedDate(date)
        }}
        withYearPicker={{
          screenReaderLabel: 'Year picker',
          startYear: 1999,
          endYear: 2024,
          maxHeight: '200px'
        }}
      />
    )
  }
  render(<Example />)
  ```

### Composing a Calendar in your Application

By design, the `Calendar` component does not dictate which date libraries or
formats you use in your application. The following example demonstrates how a
basic `Calendar` might be created using utilities from
[Moment.js](https://momentjs.com/docs/#/parsing/).

- ```js
  class Example extends React.Component {
    state = {
      todayDate: parseDate('2019-08-16').toISOString(),
      renderedDate: parseDate('2019-08-02').toISOString()
    }

    generateMonth = () => {
      const date = parseDate(this.state.renderedDate)
        .startOf('month')
        .startOf('week')

      return Array.apply(null, Array(Calendar.DAY_COUNT)).map(() => {
        const currentDate = date.clone()
        date.add({ days: 1 })

        // This workaround is needed because moment's `.add({days: 1})` function has a bug that happens when the date added lands perfectly onto the DST cutoff,
        // in these cases adding 1 day results in 23 hours added instead,
        // so `moment.tz('2024-09-07T00:00:00', 'America/Santiago').add({days: 1})` results
        // in "Sat Sep 07 2024 23:00:00 GMT-0400" instead of "Sun Sep 08 2024 00:00:00 GMT-0400".
        // which would cause duplicate dates in the calendar.
        // More info on the bug: https://github.com/moment/moment/issues/4743
        // Please note that this causes one hour of time difference in the affected timezones/dates and to
        // fully solve this bug we need to change to something like luxon which handles this properly
        if (currentDate.clone().format('HH') === '23') {
          return currentDate.clone().add({ hours: 1 })
        }

        return currentDate.clone()
      })
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

    handleRenderNextMonth = (event) => {
      this.modifyRenderedMonth(1)
    }

    handleRenderPrevMonth = (event) => {
      this.modifyRenderedMonth(-1)
    }

    modifyRenderedMonth = (step) => {
      this.setState(({ renderedDate }) => {
        const date = parseDate(renderedDate)
        date.add(step, 'month')
        return { renderedDate: date.toISOString() }
      })
    }

    renderDay(date) {
      const { renderedDate, todayDate } = this.state

      return (
        <Calendar.Day
          key={date.toISOString()}
          date={date.toISOString()}
          isOutsideMonth={!date.isSame(renderedDate, 'month')}
          isToday={date.isSame(todayDate, 'day')}
          label={`${date.format('D')} ${date.format('MMMM')} ${date.format(
            'YYYY'
          )}`}
        >
          {date.format('D')}
        </Calendar.Day>
      )
    }

    render() {
      const date = parseDate(this.state.renderedDate)

      const buttonProps = (type = 'prev') => ({
        size: 'small',
        withBackground: false,
        withBorder: false,
        renderIcon:
          type === 'prev' ? (
            <IconArrowOpenStartSolid color="primary" />
          ) : (
            <IconArrowOpenEndSolid color="primary" />
          ),
        screenReaderLabel: type === 'prev' ? 'Previous month' : 'Next month'
      })

      return (
        <Calendar
          renderPrevMonthButton={<IconButton {...buttonProps('prev')} />}
          renderNextMonthButton={<IconButton {...buttonProps('next')} />}
          renderNavigationLabel={
            <span>
              <div>{date.format('MMMM')}</div>
              <div>{date.format('YYYY')}</div>
            </span>
          }
          renderWeekdayLabels={this.renderWeekdayLabels()}
          onRequestRenderNextMonth={this.handleRenderNextMonth}
          onRequestRenderPrevMonth={this.handleRenderPrevMonth}
        >
          {this.generateMonth().map((date) => this.renderDay(date))}
        </Calendar>
      )
    }
  }

  const locale = 'en-us'
  const timezone = 'America/Denver'

  const parseDate = (dateStr) => {
    return moment.tz(dateStr, [moment.ISO_8601], locale, timezone)
  }

  render(<Example />)
  ```

- ```js
  const Example = () => {
    const [renderedDate, setRenderedDate] = useState(
      parseDate('2019-08-02').toISOString()
    )

    const todayDate = parseDate('2019-08-16').toISOString()
    const generateMonth = () => {
      const date = parseDate(renderedDate).startOf('month').startOf('week')

      return Array.apply(null, Array(Calendar.DAY_COUNT)).map(() => {
        const currentDate = date.clone()
        date.add({ days: 1 })

        // This workaround is needed because moment's `.add({days: 1})` function has a bug that happens when the date added lands perfectly onto the DST cutoff,
        // in these cases adding 1 day results in 23 hours added instead,
        // so `moment.tz('2024-09-07T00:00:00', 'America/Santiago').add({days: 1})` results
        // in "Sat Sep 07 2024 23:00:00 GMT-0400" instead of "Sun Sep 08 2024 00:00:00 GMT-0400".
        // which would cause duplicate dates in the calendar.
        // More info on the bug: https://github.com/moment/moment/issues/4743
        // Please note that this causes one hour of time difference in the affected timezones/dates and to
        // fully solve this bug we need to change to something like luxon which handles this properly
        if (currentDate.clone().format('HH') === '23') {
          return currentDate.clone().add({ hours: 1 })
        }

        return currentDate.clone()
      })
    }

    const renderWeekdayLabels = () => {
      const date = parseDate(renderedDate).startOf('week')

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

    const handleRenderNextMonth = (event) => {
      modifyRenderedMonth(1)
    }

    const handleRenderPrevMonth = (event) => {
      modifyRenderedMonth(-1)
    }

    const modifyRenderedMonth = (step) => {
      const date = parseDate(renderedDate)
      date.add(step, 'month')
      setRenderedDate(date.toISOString())
    }

    const renderDay = (date) => {
      return (
        <Calendar.Day
          key={date.toISOString()}
          date={date.toISOString()}
          isOutsideMonth={!date.isSame(renderedDate, 'month')}
          isToday={date.isSame(todayDate, 'day')}
          label={`${date.format('D')} ${date.format('MMMM')} ${date.format(
            'YYYY'
          )}`}
        >
          {date.format('D')}
        </Calendar.Day>
      )
    }

    const date = parseDate(renderedDate)

    const buttonProps = (type = 'prev') => ({
      size: 'small',
      withBackground: false,
      withBorder: false,
      renderIcon:
        type === 'prev' ? (
          <IconArrowOpenStartSolid color="primary" />
        ) : (
          <IconArrowOpenEndSolid color="primary" />
        ),
      screenReaderLabel: type === 'prev' ? 'Previous month' : 'Next month'
    })

    return (
      <Calendar
        renderPrevMonthButton={<IconButton {...buttonProps('prev')} />}
        renderNextMonthButton={<IconButton {...buttonProps('next')} />}
        renderNavigationLabel={
          <span>
            <div>{date.format('MMMM')}</div>
            <div>{date.format('YYYY')}</div>
          </span>
        }
        renderWeekdayLabels={renderWeekdayLabels()}
        onRequestRenderNextMonth={handleRenderNextMonth}
        onRequestRenderPrevMonth={handleRenderPrevMonth}
      >
        {generateMonth().map((date) => renderDay(date))}
      </Calendar>
    )
  }

  const locale = 'en-us'
  const timezone = 'America/Denver'

  const parseDate = (dateStr) => {
    return moment.tz(dateStr, [moment.ISO_8601], locale, timezone)
  }

  render(<Example />)
  ```

#### Some dates to keep track of

- `todayDate` - the date that represents today
- `renderedDate` - the date that the user is viewing as they navigate the `Calendar`

#### Generating a month

We generate a month based on the `renderedDate` value. The `Calendar` always
displays 6 weeks or 42 days (42 is defined as a constant `Calendar.DAY_COUNT`),
so we pad our month values with days from the previous and next month if
necessary. The complete implementation can be seen in the `generateMonth` function
in our example.

#### Rendering days

Using the month data, we can now map it to children of type `Calendar.Day`.
As we render each day, if it is outside the current month we can set the
`isOutsideMonth` prop. We can also set the `isToday` prop if it is the current
date. For accessibility, it is recommended that you provide more information to
each `Calendar.Day` using the label prop. This label will help screen readers to
have important context as the `Calendar` is navigated. It should include the day,
month, and the year (Ex. instead of `1` we would provide `1 August 2019`).

#### Rendering weekday labels

`Calendar` requires you to provide an array of 7 labels that correspond to each
day of the week via the `renderWeekdayLabels` prop. The visible portion of the
label should be abbreviated (no longer than three characters). Note that screen
readers will read this content preceding each date as the `Calendar` is navigated.
Consider using [AccessibleContent](#AccessibleContent) with the `alt` prop
containing the full day name for assistive technologies and the children containing
the abbreviation. ex. `[<AccessibleContent alt="Sunday">Sun</AccessibleContent>, ...]`

#### Rendering next and previous month buttons

The `renderNextMonthButton` and `renderPrevMonthButton` can be supplied using the
[IconButton](#IconButton) component with the `size` prop set to
`small`, the `withBackground` and `withBorder` props both set to `false`, and the `renderIcon` prop set to [IconArrowOpenStart](#icons) or
[IconArrowOpenEnd](#icons).
