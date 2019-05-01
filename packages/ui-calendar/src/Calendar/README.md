---
describes: Calendar
---

The `Calendar` component provides a visual interface for date data.

### Composing a Calendar in your Application
By design, the `Calendar` component does not dictate which date libraries or
formats you use in your application. The following example demonstrates how a
basic `Calendar` might be created using utilities from
[Moment.js](https://momentjs.com/docs/#/parsing/).

```javascript
---
example: true
render: false
---

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
      date.add(1, 'days')
      return currentDate
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

  renderDay (date) {
    const {
      renderedDate,
      todayDate,
    } = this.state

    return (
      <Calendar.Day
        key={date.toISOString()}
        date={date.toISOString()}
        isOutsideMonth={!date.isSame(renderedDate, 'month')}
        isToday={date.isSame(todayDate, 'day')}
        label={`${date.format('D')} ${date.format('MMMM')} ${date.format('YYYY')}`}
      >
        {date.format('D')}
      </Calendar.Day>
    )
  }

  render () {
    const date = parseDate(this.state.renderedDate)

    const buttonProps = (type = 'prev') => ({
      size: 'small',
      variant: 'icon',
      icon: type === 'prev'
        ? <IconArrowOpenStartSolid color="primary" />
        : <IconArrowOpenEndSolid color="primary" />,
      children: (
        <ScreenReaderContent>
          {type === 'prev' ? 'Previous month' : 'Next month'}
        </ScreenReaderContent>
      )
    })

    return (
      <Calendar
        renderPrevMonthButton={<Button {...buttonProps('prev')} />}
        renderNextMonthButton={<Button {...buttonProps('next')} />}
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
        {this.generateMonth().map(date => this.renderDay(date))}
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

#### Some dates to keep track of
* `todayDate` - the date that represents today
* `renderedDate` - the date that the user is viewing as they navigate the `Calendar`

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
[Button](#Button) component with `variant` set to `icon`, the `size` prop set to
`small`, and the `icon` prop set to [IconArrowOpenStart](#iconography) or
[IconArrowOpenEnd](#iconography).
