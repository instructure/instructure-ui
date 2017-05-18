import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import CustomPropTypes from '../../util/CustomPropTypes'

import themeable from '../../themeable'
import {browserTimeZone, parseMoment, now} from '../../util/time'
import {browserLocale} from '../../util/locale'

import PresentationContent from '../PresentationContent'
import ScreenReaderContent from '../ScreenReaderContent'

import Slider from './Slider'
import styles from './styles.css'
import theme from './theme.js'

/**
  The DatePicker component is used to select a date from a calendar.
  You may want to use a [DateInput](#DateInput) instead.

  ```jsx_example
  <DatePicker previousLabel="previous month" nextLabel="next month" />
  ```

  The calendar display respects the specified locale, which can supplied either
  as properties or with [ApplyLocale](#ApplyLocale)

  ```js_example
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
          <DatePicker previousLabel="previous month" nextLabel="next month" locale={this.state.locale} />
        </div>
      )
    }
  }

  <Example />
  ```
**/
@themeable(theme, styles)
export default class DatePicker extends Component {
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
      Called with an ISO 8601 formatted string.
    **/
    onSelectedChange: PropTypes.func,
    /**
      Called with an ISO 8601 formatted string.
    **/
    onRenderedChange: PropTypes.func
  }

  static contextTypes = {
    locale: PropTypes.string,
    timezone: PropTypes.string
  }

  constructor (props, context) {
    super(props, context)

    let todayValue = props.todayValue
    if (todayValue == null) {
      todayValue = now(this.locale(), this.timezone()).format()
    }

    let selectedValue = props.selectedValue || props.defaultSelectedValue
    if (selectedValue == null) {
      selectedValue = todayValue
    }

    let renderedValue = props.renderedValue || props.defaultRenderedValue
    if (renderedValue == null) {
      renderedValue = selectedValue
    }

    this.state = {selectedValue, renderedValue, todayValue}
  }

  locale () {
    return this.props.locale || this.context.locale || browserLocale()
  }

  timezone () {
    return this.props.timezone || this.context.timezone || browserTimeZone()
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

  handleSliderPrev = () => {
    const sliderMoment = parseMoment(this.state.renderedValue, this.locale(), this.timezone())
    const sliderString = sliderMoment.subtract(1, 'months').format()
    this.setState({renderedValue: sliderString})
    this.fireRenderedChange(sliderString)
  }

  handleSliderNext = () => {
    const sliderMoment = parseMoment(this.state.renderedValue, this.locale(), this.timezone())
    const sliderString = sliderMoment.add(1, 'months').format()
    this.setState({renderedValue: sliderString})
    this.fireRenderedChange(sliderString)
  }

  handleDateClick = (clickedString) => {
    this.setState({selectedValue: clickedString})
    this.fireSelectedChange(clickedString)
  }

  fireRenderedChange (newRenderedString) {
    if (typeof this.props.onRenderedChange === 'function') {
      this.props.onRenderedChange(newRenderedString)
    }
  }

  fireSelectedChange (newSelectedString) {
    if (typeof this.props.onSelectedChange === 'function') {
      this.props.onSelectedChange(newSelectedString)
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
      <th className={styles.cell} key={day.dayOfYear()}>
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

  renderDayCell (day, today, selected, rendered) {
    const classes = {
      [styles.cell]: true,
      [styles.today]: this.isSameDay(day, today),
      [styles.selected]: this.isSameDay(day, selected),
      [styles.outside]: !this.isSameMonth(day, rendered)
    }

    const handleDateClick = () => this.handleDateClick(day.format())
    return (
      <td key={day.dayOfYear()}>
        <button className={classnames(classes)} onClick={handleDateClick}>
          { day.format('D') }
        </button>
      </td>
    )
  }

  renderWeekRow (firstDay, today, selected, rendered) {
    return (
      <tr key={firstDay.week()}>
        {
          [0, 1, 2, 3, 4, 5, 6].map(n => {
            return this.renderDayCell(firstDay.clone().add(n, 'd'), today, selected, rendered)
          })
        }
      </tr>
    )
  }

  renderCalendar (today, selected, rendered) {
    const firstDay = rendered.clone().startOf('month').startOf('week')
    return [0, 7, 14, 21, 28, 35].map((weekIncrement) => {
      const firstOfWeek = firstDay.clone().add(weekIncrement, 'd')
      return this.renderWeekRow(firstOfWeek, today, selected, rendered)
    })
  }

  render () {
    const locale = this.locale()
    const timezone = this.timezone()
    const today = parseMoment(this.state.todayValue, locale, timezone)
    const selected = parseMoment(this.state.selectedValue, locale, timezone)
    const rendered = parseMoment(this.state.renderedValue, locale, timezone)

    return (
      <div className={styles.root}>
        <Slider
          previousLabel={this.props.previousLabel}
          nextLabel={this.props.nextLabel}
          onPrev={this.handleSliderPrev}
          onNext={this.handleSliderNext}
        >
          <div className={styles.label}>
            <div>{rendered.format('MMMM')}</div>
            <div>{rendered.format('YYYY')}</div>
          </div>
        </Slider>
        <div className={styles.calendar}>
          <table>
            <thead>
              {this.renderHeader(rendered)}
            </thead>
            <tbody>
              {this.renderCalendar(today, selected, rendered)}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
