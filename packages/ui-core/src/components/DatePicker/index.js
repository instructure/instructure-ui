import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import keycode from 'keycode'

import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'

import themeable from '@instructure/ui-themeable'
import DateTime from '@instructure/ui-utils/lib/i18n/DateTime'
import Locale from '@instructure/ui-utils/lib/i18n/Locale'

import PresentationContent from '../PresentationContent'
import ScreenReaderContent from '../ScreenReaderContent'

import DatePickerPagination from './DatePickerPagination'
import styles from './styles.css'
import theme from './theme'

/**
---
category: components
---
  The DatePicker component is used to select a date from a calendar.
  You may want to use a [DateInput](#DateInput) instead.

  ```jsx_example
  <DatePicker
    previousLabel="previous month"
    nextLabel="next month"
    onSelectedChange={function () { console.log(arguments) }}
    onRenderedChange={function () { console.log(arguments) }}
  />
  ```

  The calendar display respects the specified locale, which can be supplied either
  as properties or with [ApplyLocale](#ApplyLocale)

```jsx_example
---
render: false
---
class Example extends React.Component {
  constructor (props) {
    super(props)
    this.state = { locale: 'en' }
  }

  render () {
    return (
      <div>
        <Container as="div" padding="small 0" >
          <Select
            inline
            label="Choose Locale"
            onChange={e => this.setState({locale: e.target.value})}>
              {moment.locales().map(loc => <option key={loc} value={loc}>{loc}</option>)}
          </Select>
        </Container>
        <DatePicker
          previousLabel="previous month"
          nextLabel="next month"
          locale={this.state.locale}
          onSelectedChange={function () { console.log(arguments) }}
          onRenderedChange={function () { console.log(arguments) }}
        />
      </div>
    )
  }
}

render(<Example />)
```
**/
@themeable(theme, styles)
export default class DatePicker extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    /**
      The label to put on the previous month button of the calendar.
    **/
    previousLabel: PropTypes.string.isRequired,
    /**
      The label to put on the next month button of the calendar.
    **/
    nextLabel: PropTypes.string.isRequired,

    /**
      An ISO 8601 formatted string. The selected value on initial render.
    **/
    defaultSelectedValue: CustomPropTypes.iso8601,
    /**
      An ISO 8601 formatted string. Must be accompanied by an onSelectedChange property.
      Defaults to today's date.
    **/
    selectedValue: CustomPropTypes.controllable(CustomPropTypes.iso8601,
      'onSelectedChange', 'defaultSelectedValue'),

    /**
      An ISO 8601 formatted string. The rendered value on initial render.
    **/
    defaultRenderedValue: CustomPropTypes.iso8601,

    /**
      An ISO 8601 formatted string. Must be accompanied by an onRenderedChange property.
      Defaults to today's date.
    **/
    renderedValue: CustomPropTypes.controllable(CustomPropTypes.iso8601,
      'onRenderedChange', 'defaultRenderedValue'),

    /**
      An ISO 8601 formatted string. Defaults to the current date. DatePicker doesn't
      attempt to change this value. Defaults to today's date.
    **/
    todayValue: CustomPropTypes.iso8601,

    /**
      A standard language id
    **/
    locale: PropTypes.string,
    /**
      A timezone identifier in the format: Area/Location
    **/
    timezone: PropTypes.string,

    /**
      Called with the triggering event followed by an ISO 8601 formatted string.
    **/
    onSelectedChange: PropTypes.func,
    /**
      Called with the triggering event followed by an ISO 8601 formatted string.
    **/
    onRenderedChange: PropTypes.func
  }
  /* eslint-enable react/require-default-props */

  static contextTypes = {
    locale: PropTypes.string,
    timezone: PropTypes.string
  }

  constructor (props, context) {
    super(props, context)

    let todayValue = props.todayValue
    if (todayValue == null) {
      todayValue = DateTime.now(this.locale(), this.timezone())
        .hour(0)
        .minute(0)
        .second(0)
        .millisecond(0)
        .format()
    }

    let selectedValue = props.selectedValue || props.defaultSelectedValue
    if (selectedValue == null) {
      selectedValue = todayValue
    }

    let renderedValue = props.renderedValue || props.defaultRenderedValue
    if (renderedValue == null) {
      renderedValue = selectedValue
    }

    const focusedValue = selectedValue

    this.state = {selectedValue, renderedValue, todayValue, focusedValue}
  }

  locale () {
    return this.props.locale || this.context.locale || Locale.browserLocale()
  }

  timezone () {
    return this.props.timezone || this.context.timezone || DateTime.browserTimeZone()
  }

  todayValue () {
    return this.state.todayValue
  }

  selectedValue () {
    return this.state.selectedValue
  }

  renderedValue () {
    return this.state.renderedValue
  }

  focusedValue () {
    return this.state.focusedValue
  }

  componentWillReceiveProps (nextProps) {
    if (
      nextProps.selectedValue !== this.props.selectedValue ||
      nextProps.renderedValue !== this.props.renderedValue ||
      nextProps.todayValue !== this.props.todayValue
    ) {
      this.setState({
        selectedValue: nextProps.selectedValue,
        renderedValue: nextProps.renderedValue,
        todayValue: nextProps.todayValue
      })
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if ((this.state.focusedValue !== prevState.focusedValue) && this._focusedDay) {
      this._focusedDay.focus()
    }
  }

  handleCalendarKeyDown = (e) => {
    const {
      up,
      down,
      left,
      right
    } = keycode.codes

    if (!(e.keyCode === up ||
          e.keyCode === down ||
          e.keyCode === left ||
          e.keyCode === right)) {
      return
    }

    e.preventDefault()
    e.stopPropagation()

    const focusedMoment = DateTime.parse(this.state.focusedValue, this.locale(), this.timezone())
    switch (e.keyCode) {
      case (left):
        focusedMoment.subtract(1, 'days')
        break
      case (right):
        focusedMoment.add(1, 'days')
        break
      case (up):
        focusedMoment.subtract(7, 'days')
        break
      case (down):
        focusedMoment.add(7, 'days')
        break
    }

    const newFocusedString = focusedMoment.format()
    this.updatePagination(newFocusedString)
    this.setState({focusedValue: newFocusedString})
  }

  updatePagination (newValueString) {
    const newValueMoment = DateTime.parse(newValueString, this.locale(), this.timezone())
    const newMonth = newValueMoment.month()
    const newYear = newValueMoment.year()

    const renderedMoment = DateTime.parse(this.state.renderedValue, this.locale(), this.timezone())
    const renderedMonth = renderedMoment.month()
    const renderedYear = renderedMoment.year()

    if (newYear < renderedYear) {
      this.handlePaginationPrev()
      return
    }

    if (newYear > renderedYear) {
      this.handlePaginationNext()
      return
    }

    if (newMonth < renderedMonth) {
      this.handlePaginationPrev()
    }

    if (newMonth > renderedMonth) {
      this.handlePaginationNext()
    }
  }

  handlePaginationPrev = (e) => {
    const sliderMoment = DateTime.parse(this.state.renderedValue, this.locale(), this.timezone())
    const sliderString = sliderMoment.subtract(1, 'months').format()
    this.setState({renderedValue: sliderString})
    this.fireRenderedChange(e, sliderString)
  }

  handlePaginationNext = (e) => {
    const sliderMoment = DateTime.parse(this.state.renderedValue, this.locale(), this.timezone())
    const sliderString = sliderMoment.add(1, 'months').format()
    this.setState({renderedValue: sliderString})
    this.fireRenderedChange(e, sliderString)
  }

  handleDateClick = (e, clickedString) => {
    this.updatePagination(clickedString)
    this.setState({selectedValue: clickedString})
    this.fireSelectedChange(e, clickedString)
  }

  handleDateFocus = (focusedString) => {
    this.setState({focusedValue: focusedString})
  }

  fireRenderedChange (e, newRenderedString) {
    if (typeof this.props.onRenderedChange === 'function') {
      this.props.onRenderedChange(e, newRenderedString)
    }
  }

  fireSelectedChange (e, newSelectedString) {
    if (typeof this.props.onSelectedChange === 'function') {
      this.props.onSelectedChange(e, newSelectedString)
    }
  }

  isSameDay (a, b) {
    return this.isSameMonth(a, b) && a.isSame(b, 'day')
  }

  isSameMonth (a, b) {
    return a.isSame(b, 'year') && a.isSame(b, 'month')
  }

  renderHeaderCell (day) {
    return (
      <th className={styles.header} key={day.dayOfYear()}>
        <PresentationContent>{day.format('dd')}</PresentationContent>
        <ScreenReaderContent>{day.format('dddd')}</ScreenReaderContent>
      </th>
    )
  }

  renderHeader (rendered) {
    const firstDay = rendered.clone().startOf('week')
    const days = [0, 1, 2, 3, 4, 5, 6].map(n => firstDay.clone().add(n, 'd'))
    return (
      <tr>
        {days.map(d => this.renderHeaderCell(d))}
      </tr>
    )
  }

  renderDayCell (day, today, selected, rendered, focused) {
    const classes = {
      [styles.cell]: true,
      [styles.today]: this.isSameDay(day, today),
      [styles.selected]: this.isSameDay(day, selected),
      [styles.outside]: !this.isSameMonth(day, rendered)
    }

    const handleDateClick = (e) => this.handleDateClick(e, day.format())
    const handleDateFocus = () => this.handleDateFocus(day.format())
    return (
      <td key={day.dayOfYear()}>
        <button
          type="button"
          className={classnames(classes)}
          tabIndex={this.isSameMonth(day, rendered) ? '0' : '-1'}
          ref={(c) => { if (this.isSameDay(day, focused)) { this._focusedDay = c } }}
          onClick={handleDateClick}
          onFocus={handleDateFocus}
        >
          { day.format('D') }
        </button>
      </td>
    )
  }

  renderWeekRow (firstDay, today, selected, rendered, focused) {
    return (
      <tr key={firstDay.week()}>
        {
          [0, 1, 2, 3, 4, 5, 6].map(n => {
            return this.renderDayCell(firstDay.clone().add(n, 'd'), today, selected, rendered, focused)
          })
        }
      </tr>
    )
  }

  renderCalendar (today, selected, rendered, focused) {
    const firstDay = rendered.clone().startOf('month').startOf('week')
    if (selected) {  // Copy selected value's time so we don't change it on the user
      firstDay
        .hour(selected.hour())
        .minute(selected.minute())
        .second(selected.second())
        .millisecond(selected.millisecond())
    }
    return [0, 7, 14, 21, 28, 35].map((weekIncrement) => {
      const firstOfWeek = firstDay.clone().add(weekIncrement, 'd')
      return this.renderWeekRow(firstOfWeek, today, selected, rendered, focused)
    })
  }

  render () {
    const locale = this.locale()
    const timezone = this.timezone()
    const today = DateTime.parse(this.state.todayValue, locale, timezone)
    const selected = DateTime.parse(this.state.selectedValue, locale, timezone)
    const rendered = DateTime.parse(this.state.renderedValue, locale, timezone)
    const focused = DateTime.parse(this.state.focusedValue, locale, timezone)

    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return (
      <div className={styles.root}>
        <DatePickerPagination
          previousLabel={this.props.previousLabel}
          nextLabel={this.props.nextLabel}
          onPrev={this.handlePaginationPrev}
          onNext={this.handlePaginationNext}
        >
          <div className={styles.label}>
            <div>{rendered.format('MMMM')}</div>
            <div>{rendered.format('YYYY')}</div>
          </div>
        </DatePickerPagination>
        <div
          ref={(c) => { this._calendar = c }}
          className={styles.calendar}
          onKeyDown={this.handleCalendarKeyDown}
        >
          <table className={styles.table}>
            <thead>
              {this.renderHeader(rendered)}
            </thead>
            <tbody>
              {this.renderCalendar(today, selected, rendered, focused)}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
  /* eslint-enable jsx-a11y/no-static-element-interactions */
}
