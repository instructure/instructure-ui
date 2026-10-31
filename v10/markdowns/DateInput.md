# DateInput


> _Note:_ we recommend to update to the new [`DateInput2`](/#DateInput2) which is easier to configure for developers, has a better UX, better accessibility features and a year picker. `DateInput` will be deprecated in the future.

The `DateInput` component provides a visual interface for inputting date data.

### Composing a DateInput in your Application

`DateInput` uses `Calendar` internally. See [Calendar](#Calendar) for more detailed
documentation and guided examples. `DateInput` shares many of the same `Calendar`
props and it is created the same way with some additional attributes and callback
methods for the input. The following example is configured similar to the `Calendar`
examples using [Moment.js](https://momentjs.com/docs/#/parsing/).

```javascript
---
type: example
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
      date.add({days: 1})

      // This workaround is needed because moment's `.add({days: 1})` function has a bug that happens when the date added lands perfectly onto the DST cutoff,
      // in these cases adding 1 day results in 23 hours added instead,
      // so `moment.tz('2024-09-07T00:00:00', 'America/Santiago').add({days: 1})` results
      // in "Sat Sep 07 2024 23:00:00 GMT-0400" instead of "Sun Sep 08 2024 00:00:00 GMT-0400".
      // which would cause duplicate dates in the calendar.
      // More info on the bug: https://github.com/moment/moment/issues/4743
      // Please note that this causes one hour of time difference in the affected timezones/dates and to
      // fully solve this bug we need to change to something like luxon which handles this properly
      if (currentDate.clone().format('HH') === '23') {
        return currentDate.clone().add({hours: 1})
      }

      return currentDate.clone()
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
    this.setState(({ selectedDate, value }) => {
      // We don't have a selectedDate but we have a value. That means that the value
      // could not be parsed and so the date is invalid
      if (!selectedDate && value) {
        return {
          messages: [{ type: 'error', text: 'This date is invalid' }],
        }
      }
      // Display a message if the user has typed in a value that corresponds to a
      // disabledDate
      if (this.isDisabledDate(parseDate(selectedDate))) {
        return {
          messages: [{ type: 'error', text: 'This date is disabled' }],
        }
      }
    })
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
        <DateInput.Day
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
        </DateInput.Day>
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
      withBackground: false,
      withBorder: false,
      renderIcon: type === 'prev'
        ? <IconArrowOpenStartSolid color="primary" />
        : <IconArrowOpenEndSolid color="primary" />,
      screenReaderLabel: type === 'prev' ? 'Previous month' : 'Next month'
    })

    return (
      <DateInput
        renderLabel="Choose a date"
        assistiveText="Type a date or use arrow keys to navigate date picker."
        value={value}
        onChange={this.handleChange}
        width="20rem"
        isInline
        messages={messages}
        isShowingCalendar = {this.state.isShowingCalendar}
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
        renderPrevMonthButton={<IconButton {...buttonProps('prev')} />}
        renderNextMonthButton={<IconButton {...buttonProps('next')} />}
        renderWeekdayLabels={this.renderWeekdayLabels()}
      >
        {this.renderDays()}
      </DateInput>
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

- `todayDate` - the date that represents today
- `selectedDate` - the user's selected date
- `renderedDate` - the date that the user is viewing as they navigate the `Calendar`
- `disabledDates` - any dates that are disabled

#### Rendering `DateInput.Day` children

`DateInput` accepts children of type `DateInput.Day`. Both `DateInput.Day` and
`Calendar.Day` are exporting the same `Day` component. The documentation for
`Day` can be found in [Calendar](#Calendar).

#### Handling onChange

When the `DateInput` fires an `onChange` event:

- The value should be updated and any messages should be cleared
- Verify if the value can be parsed as a date
- If it can be parsed, update the `selectedDate` and `renderedDate` with that date
- If it cannot be parsed, the `selectedDate` is set to null and the `renderedDate`
  stays the same

#### Handling onRequestHideCalendar

When the `DateInput` fires `onRequestHideCalendar`:

- The calendar should be hidden
- The value should be updated with a formatted version of the `selectedDate` if
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


### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| DateInput | renderLabel | `\| keyof ReactHTML \| keyof ReactSVG \| ClassType<P, ClassicComponent<P, ComponentState>, ClassicComponentClass<P>> \| ComponentClass \| ReactNode \| ((data: P) => ReactNode \| Element) \| (() => ReactNode \| Element) \| Element` | Yes | - | Specifies the input label. |
| DateInput | value | `string` | No | `''` | Specifies the input value. |
| DateInput | size | `'small' \| 'medium' \| 'large'` | No | `'medium'` | Specifies the input size. |
| DateInput | placeholder | `string` | No | - | Html placeholder text to display when the input has no value. This should be hint text, not a label replacement. |
| DateInput | onChange | `( event: React.ChangeEvent<HTMLInputElement>, value: { value: string } ) => void` | No | - | Callback executed when the input fires a change event. @param {Object} event - the event object @param {Object} data - additional data @param data.value - the new value |
| DateInput | onBlur | `(event: React.SyntheticEvent) => void` | No | `() => {}` | Callback executed when the input fires a blur event. |
| DateInput | interaction | `'enabled' \| 'disabled' \| 'readonly'` | No | - | Specifies if interaction with the input is enabled, disabled, or readonly. When "disabled", the input changes visibly to indicate that it cannot receive user interactions. When "readonly" the input still cannot receive user interactions but it keeps the same styles as if it were enabled. |
| DateInput | isRequired | `boolean` | No | `false` | Specifies if the input is required. |
| DateInput | isInline | `boolean` | No | `false` | Controls whether the input is rendered inline with other elements or if it is rendered as a block level element. |
| DateInput | assistiveText | `string` | No | - | Additional helpful text to provide to screen readers about the operation of the component. |
| DateInput | layout | `'stacked' \| 'inline'` | No | `'stacked'` | Controls the layout. When set to `stacked`, the label rests on top of the input. When set to `inline` the label is next to the input. |
| DateInput | width | `string` | No | - | Specifies the width of the input. |
| DateInput | display | `'inline-block' \| 'block'` | No | `'inline-block'` | Specifies the display property of the container. |
| DateInput | inputRef | `(element: HTMLInputElement \| null) => void` | No | - | Provides a ref to the underlying input element. |
| DateInput | messages | `FormMessage[]` | No | - | Displays messages and validation for the input. It should be an object with the following shape: `{ text: PropTypes.node, type: PropTypes.oneOf(['error', 'hint', 'success', 'screenreader-only']) }` |
| DateInput | placement | `PlacementPropValues` | No | `'bottom center'` | The placement of the calendar in relation to the input. |
| DateInput | isShowingCalendar | `boolean` | No | `false` | Controls whether the calendar is showing. |
| DateInput | onRequestValidateDate | `( event: SyntheticEvent, dateString?: string, validation?: FormMessage[] ) => void \| FormMessage[]` | No | - | Callback fired when the input is blurred. Feedback should be provided to the user when this function is called if the selected date or input value is not valid. The component calculates date validity and if it's disabled or nor and passes that information to this callback. |
| DateInput | onRequestShowCalendar | `(event: SyntheticEvent) => void` | No | - | Callback fired requesting the calendar be shown. |
| DateInput | onRequestHideCalendar | `(event: SyntheticEvent) => void` | No | - | Callback fired requesting the calendar be hidden. |
| DateInput | onRequestSelectNextDay | `(event: SyntheticEvent) => void` | No | - | Callback fired requesting the next day be selected. If no date is currently selected should default to the first day of the currently rendered month. |
| DateInput | onRequestSelectPrevDay | `(event: SyntheticEvent) => void` | No | - | Callback fired requesting the previous day be selected. If no date is currently selected should default to the first day of the currently rendered month. |
| DateInput | onRequestRenderNextMonth | `(e: React.MouseEvent) => void` | No | - | Callback fired requesting the next month be rendered. |
| DateInput | onRequestRenderPrevMonth | `(e: React.MouseEvent) => void` | No | - | Callback fired requesting the previous month be rendered. |
| DateInput | renderNavigationLabel | `React.ReactNode \| (() => React.ReactNode)` | No | - | Content to render in the calendar navigation header. The recommendation is to include the name of the current rendered month along with the year. |
| DateInput | renderWeekdayLabels | `(React.ReactNode \| (() => React.ReactNode))[]` | No | - | An array of labels containing the name of each day of the week. The visible portion of the label should be abbreviated (no longer than three characters). Note that screen readers will read this content preceding each date as the `<Calendar />` is navigated. Consider using [AccessibleContent](#AccessibleContent) with the `alt` prop containing the full day name for assistive technologies and the children containing the abbreviation. ex. `[<AccessibleContent alt="Sunday">Sun</AccessibleContent>, ...]` |
| DateInput | renderNextMonthButton | `\| keyof ReactHTML \| keyof ReactSVG \| ClassType<P, ClassicComponent<P, ComponentState>, ClassicComponentClass<P>> \| ComponentClass \| ReactNode \| ((data: P) => ReactNode \| Element) \| (() => ReactNode \| Element) \| Element` | No | - | A button to render in the calendar navigation header. The recommendation is to compose it with the [Button](#Button) component, setting the `variant` prop to `icon`, the `size` prop to `small`, and setting the `icon` prop to [IconArrowOpenEnd](#icons). |
| DateInput | renderPrevMonthButton | `\| keyof ReactHTML \| keyof ReactSVG \| ClassType<P, ClassicComponent<P, ComponentState>, ClassicComponentClass<P>> \| ComponentClass \| ReactNode \| ((data: P) => ReactNode \| Element) \| (() => ReactNode \| Element) \| Element` | No | - | A button to render in the calendar navigation header. The recommendation is to compose it with the [Button](#Button) component, setting the `variant` prop to `icon`, the `size` prop to `small`, and setting the `icon` prop to [IconArrowOpenStart](#icons). |
| DateInput | children | `ReactElement<CalendarDayProps>[]` | No | - | children of type `<DateInput.Day />` There should be exactly 42 provided (6 weeks). |
| DateInput | disabledDates | `string[] \| ((isoDateToCheck: string) => boolean)` | No | - |  |
| DateInput | currentDate | `string` | No | - | ISO date string for the current date if necessary. Defaults to the current date in the user's timezone. |
| DateInput | disabledDateErrorMessage | `string \| ((rawDateValue: string) => FormMessage)` | No | - | Error message shown to the user if they enter a date that is disabled. If not specified the component will show the `invalidDateTimeMessage`. |
| DateInput | invalidDateErrorMessage | `string \| ((rawDateValue: string) => FormMessage)` | No | - | The message shown to the user when the data is invalid. If a string, shown to the user anytime the input is invalid. If a function, receives a single parameter: - *rawDateValue*: the string entered as a date by the user. |
| DateInput | locale | `string` | No | - | A standard language identifier. See [Moment.js](https://momentjs.com/timezone/docs/#/using-timezones/parsing-in-zone/) for more details. This property can also be set via a context property and if both are set then the component property takes precedence over the context property. The web browser's locale will be used if no value is set via a component property or a context property. |
| DateInput | timezone | `string` | No | - | A timezone identifier in the format: *Area/Location* See [List of tz database time zones](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) for the list of possible options. This property can also be set via a context property and if both are set then the component property takes precedence over the context property. The web browser's timezone will be used if no value is set via a component property or a context property. |
| DateInput | withYearPicker | `{ screenReaderLabel: string onRequestYearChange?: (e: any, requestedYear: number) => void startYear: number endYear: number }` | No | - | If set, years can be picked from a dropdown. It accepts an object. screenReaderLabel: string // e.g.: i18n("pick a year") onRequestYearChange?:(e: React.MouseEvent,requestedYear: number): void // if set, on year change, only this will be called and no internal change will take place startYear: number // e.g.: 2001, sets the start year of the selectable list endYear: number // e.g.: 2030, sets the end year of the selectable list |

### Usage

Install the package:

```shell
npm install @instructure/ui-date-input
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { DateInput } from '@instructure/ui-date-input'
```

