/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 - present Instructure, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { Children, Component, ReactElement, MouseEvent } from 'react'

import { View } from '@instructure/ui-view'
import {
  safeCloneElement,
  callRenderProp,
  omitProps,
  withDeterministicId
} from '@instructure/ui-react-utils'
import { createChainedFunction } from '@instructure/ui-utils'
import { logError as error } from '@instructure/console'
import { AccessibleContent } from '@instructure/ui-a11y-content'

import { withStyleRework as withStyle } from '@instructure/emotion'

import { Locale, DateTime, ApplyLocaleContext } from '@instructure/ui-i18n'
import type { Moment } from '@instructure/ui-i18n'

import generateStyle from './styles'
import generateComponentTheme from './theme'

import { Day } from './Day'

import { allowedProps } from './props'
import type { CalendarProps, CalendarState } from './props'
import { Renderable } from '@instructure/shared-types'

import { IconButton } from '@instructure/ui-buttons'
import {
  IconArrowOpenStartSolid,
  IconArrowOpenEndSolid
} from '@instructure/ui-icons'

import { SimpleSelect } from '@instructure/ui-simple-select'

/**
---
category: components
---
**/
@withDeterministicId()
@withStyle(generateStyle, generateComponentTheme)
class Calendar extends Component<CalendarProps, CalendarState> {
  static readonly componentId = 'Calendar'

  declare context: React.ContextType<typeof ApplyLocaleContext>
  static contextType = ApplyLocaleContext
  static Day = Day
  static DAY_COUNT = 42 // 6 weeks visible

  static allowedProps = allowedProps
  static defaultProps = {
    as: 'span',
    role: 'table'
  }

  ref: Element | null = null
  private _weekdayHeaderIds

  constructor(props: CalendarProps) {
    super(props)
    this._weekdayHeaderIds = (
      this.props.renderWeekdayLabels || this.defaultWeekdays
    ).reduce((ids: Record<number, string>, _label, i) => {
      return { ...ids, [i]: this.props.deterministicId!('weekday-header') }
    }, {})
    this.state = this.calculateState(
      this.locale(),
      this.timezone(),
      props.currentDate
    )
  }

  handleRef = (el: Element | null) => {
    this.ref = el
  }

  componentDidMount() {
    this.props.makeStyles?.()
  }

  componentDidUpdate(prevProps: CalendarProps) {
    this.props.makeStyles?.()

    const isUpdated =
      prevProps.locale !== this.props.locale ||
      prevProps.timezone !== this.props.timezone ||
      prevProps.visibleMonth !== this.props.visibleMonth

    if (isUpdated) {
      this.setState(() => {
        return {
          ...this.calculateState(
            this.locale(),
            this.timezone(),
            this.props.currentDate
          )
        }
      })
    }
  }

  calculateState = (locale: string, timezone: string, currentDate?: string) => {
    const visibleMonth = this.props.visibleMonth || currentDate

    return {
      visibleMonth: visibleMonth
        ? DateTime.parse(visibleMonth, locale, timezone)
        : DateTime.now(locale, timezone),
      today: currentDate
        ? DateTime.parse(currentDate, locale, timezone)
        : DateTime.now(locale, timezone)
    }
  }

  get role() {
    return this.props.role === 'listbox' ? this.props.role : undefined
  }

  get hasPrevMonth() {
    // this is needed for locales that doesn't use the latin script for numbers e.g.: arabic
    const yearNumber = Number(
      this.state.visibleMonth
        .clone()
        .locale('en')
        .subtract({ months: 1 })
        .format('YYYY')
    )
    return (
      !this.props.withYearPicker ||
      (this.props.withYearPicker &&
        yearNumber >= this.props.withYearPicker.startYear)
    )
  }

  get hasNextMonth() {
    // this is needed for locales that doesn't use the latin script for numbers e.g.: arabic
    const yearNumber = Number(
      this.state.visibleMonth
        .clone()
        .locale('en')
        .add({ months: 1 })
        .format('YYYY')
    )
    return (
      !this.props.withYearPicker ||
      (this.props.withYearPicker &&
        yearNumber <= this.props.withYearPicker.endYear)
    )
  }

  renderMonthNavigationButtons = () => {
    const { renderNextMonthButton, renderPrevMonthButton } = this.props

    return {
      prevButton: renderPrevMonthButton ? (
        callRenderProp(renderPrevMonthButton)
      ) : (
        <IconButton
          size="small"
          withBackground={false}
          withBorder={false}
          renderIcon={<IconArrowOpenStartSolid color="primary" />}
          screenReaderLabel="Previous month"
        />
      ),
      nextButton: renderNextMonthButton ? (
        callRenderProp(renderNextMonthButton)
      ) : (
        <IconButton
          size="small"
          withBackground={false}
          withBorder={false}
          renderIcon={<IconArrowOpenEndSolid color="primary" />}
          screenReaderLabel="Next month"
        />
      )
    }
  }

  handleMonthChange = (direction: 'prev' | 'next') => (e: React.MouseEvent) => {
    const { onRequestRenderNextMonth, onRequestRenderPrevMonth } = this.props
    const { visibleMonth } = this.state
    const newDate = visibleMonth.clone()
    if (direction === 'prev') {
      if (!this.hasPrevMonth) {
        return
      }
      if (onRequestRenderPrevMonth) {
        onRequestRenderPrevMonth(
          e,
          newDate.subtract({ months: 1 }).format('YYYY-MM')
        )
        return
      }
      newDate.subtract({ months: 1 })
    } else {
      if (!this.hasNextMonth) {
        return
      }
      if (onRequestRenderNextMonth) {
        onRequestRenderNextMonth(
          e,
          newDate.add({ months: 1 }).format('YYYY-MM')
        )
        return
      }
      newDate.add({ months: 1 })
    }
    this.setState({ visibleMonth: newDate })
  }

  handleYearChange = (
    e: React.SyntheticEvent<Element, Event>,
    year: string
  ) => {
    const { withYearPicker } = this.props
    const { visibleMonth } = this.state
    const yearNumber = Number(
      DateTime.parse(year, this.locale(), this.timezone())
        .locale('en')
        .format('YYYY')
    )
    const newDate = visibleMonth.clone()
    if (withYearPicker?.onRequestYearChange) {
      withYearPicker.onRequestYearChange(e, yearNumber)
      return
    }
    newDate.year(yearNumber)
    this.setState({ visibleMonth: newDate })
  }

  renderHeader() {
    const { renderNavigationLabel, styles, withYearPicker } = this.props
    const { visibleMonth } = this.state
    const { prevButton, nextButton } = this.renderMonthNavigationButtons()

    const cloneButton = (
      button: ReactElement<any>,
      onClick?: (e: React.MouseEvent) => void
    ) =>
      safeCloneElement(button, {
        onClick: createChainedFunction(
          button.props.onClick as React.MouseEventHandler,
          onClick
        )
      })

    const style = [
      styles?.navigation,
      ...(prevButton || nextButton ? [styles?.navigationWithButtons] : [])
    ]

    const yearList: string[] = []

    if (withYearPicker) {
      const { startYear, endYear } = withYearPicker
      for (let year = endYear; year >= startYear!; year--) {
        // add the years to the list with the correct locale
        yearList.push(
          DateTime.parse(
            year.toString(),
            this.locale(),
            this.timezone()
          ).format('YYYY')
        )
      }
    }

    return (
      <div>
        <div css={style}>
          {prevButton &&
            cloneButton(prevButton, this.handleMonthChange('prev'))}
          {renderNavigationLabel ? (
            callRenderProp(renderNavigationLabel)
          ) : (
            <span>
              <div>{visibleMonth.format('MMMM')}</div>
              {!withYearPicker ? (
                <div>{visibleMonth.format('YYYY')}</div>
              ) : null}
            </span>
          )}
          {nextButton &&
            cloneButton(nextButton, this.handleMonthChange('next'))}
        </div>

        {withYearPicker ? (
          <div css={styles?.yearPicker}>
            <SimpleSelect
              width="90px"
              renderLabel=""
              placeholder="--"
              assistiveText={withYearPicker.screenReaderLabel}
              value={visibleMonth.format('YYYY')}
              onChange={(
                e: React.SyntheticEvent<Element, Event>,
                {
                  value
                }: {
                  value?: string | number | undefined
                  id?: string | undefined
                }
              ) => this.handleYearChange(e, `${value}`)}
            >
              {yearList.map((year) => (
                <SimpleSelect.Option key={year} id={`opt-${year}`} value={year}>
                  {`${year}`}
                </SimpleSelect.Option>
              ))}
            </SimpleSelect>
          </div>
        ) : null}
      </div>
    )
  }

  renderBody() {
    return (
      <table role={this.role}>
        <thead>{this.renderWeekdayHeaders()}</thead>
        <tbody>{this.renderDays()}</tbody>
      </table>
    )
  }

  renderWeekdayHeaders() {
    const { styles } = this.props
    const renderWeekdayLabels =
      this.props.renderWeekdayLabels || this.defaultWeekdays
    const { length } = renderWeekdayLabels
    error(
      length === 7,
      `[Calendar] \`renderWeekdayLabels\` should be an array with 7 labels (one for each weekday). ${length} provided.`
    )
    return (
      <tr>
        {renderWeekdayLabels.map((label, i) => {
          return (
            <th
              key={i}
              scope="col"
              css={styles?.weekdayHeader}
              id={this._weekdayHeaderIds[i]}
            >
              {callRenderProp(label)}
            </th>
          )
        })}
      </tr>
    )
  }

  get defaultWeekdays() {
    const shortDayNames = DateTime.getLocalDayNamesOfTheWeek(
      this.locale(),
      'short'
    )
    const longDayNames = DateTime.getLocalDayNamesOfTheWeek(
      this.locale(),
      'long'
    )
    return [
      <AccessibleContent key={1} alt={longDayNames[0]}>
        {shortDayNames[0]}
      </AccessibleContent>,
      <AccessibleContent key={2} alt={longDayNames[1]}>
        {shortDayNames[1]}
      </AccessibleContent>,
      <AccessibleContent key={3} alt={longDayNames[2]}>
        {shortDayNames[2]}
      </AccessibleContent>,
      <AccessibleContent key={4} alt={longDayNames[3]}>
        {shortDayNames[3]}
      </AccessibleContent>,
      <AccessibleContent key={5} alt={longDayNames[4]}>
        {shortDayNames[4]}
      </AccessibleContent>,
      <AccessibleContent key={6} alt={longDayNames[5]}>
        {shortDayNames[5]}
      </AccessibleContent>,
      <AccessibleContent key={7} alt={longDayNames[6]}>
        {shortDayNames[6]}
      </AccessibleContent>
    ] as Renderable<never>[]
  }

  renderDays() {
    const { children } = this.props
    const childrenArr = Children.toArray(
      children ? children : this.renderDefaultdays()
    ) as ReactElement[]
    const { length } = childrenArr
    const role = this.role === 'listbox' ? 'presentation' : undefined

    error(
      length === Calendar.DAY_COUNT,
      `[Calendar] should have exactly ${Calendar.DAY_COUNT} children. ${length} provided.`
    )

    return childrenArr
      .reduce((days: ReactElement<any>[][], day, i) => {
        const index = Math.floor(i / 7)
        if (!days[index]) days.push([])
        days[index].push(day)
        return days // 7xN 2D array of `Day`s
      }, [])
      .map((row) => (
        <tr key={`row${row[0].props.date}`} role={role}>
          {row.map((day, i) => (
            <td key={day.props.date} role={role}>
              {role === 'presentation'
                ? safeCloneElement(day, {
                    'aria-describedby': this._weekdayHeaderIds[i]
                  })
                : day}
            </td>
          ))}
        </tr>
      ))
  }

  locale(): string {
    if (this.props.locale) {
      return this.props.locale
    } else if (this.context && this.context.locale) {
      return this.context.locale
    }
    return Locale.browserLocale()
  }

  timezone() {
    if (this.props.timezone) {
      return this.props.timezone
    } else if (this.context && this.context.timezone) {
      return this.context.timezone
    }
    return DateTime.browserTimeZone()
  }

  // date is returned as an ISO string, like 2021-09-14T22:00:00.000Z
  handleDayClick = (event: MouseEvent<any>, { date }: { date: string }) => {
    if (this.props.onDateSelected) {
      const parsedDate = DateTime.parse(date, this.locale(), this.timezone())
      this.props.onDateSelected(parsedDate.toISOString(), parsedDate, event)
    }
  }

  isDisabledDate(date: Moment) {
    const disabledDates = this.props.disabledDates
    if (!disabledDates) {
      return false
    }
    if (Array.isArray(disabledDates)) {
      for (const aDisabledDate of disabledDates) {
        if (date.isSame(aDisabledDate, 'day')) {
          return true
        }
      }
      return false
    }
    return disabledDates(date.toISOString())
  }

  renderDefaultdays() {
    const { selectedDate } = this.props
    const { visibleMonth, today } = this.state
    // Sets it to the first local day of the week counting back from the start of the month.
    // Note that first day depends on the locale, e.g. it's Sunday in the US and
    // Monday in most of the EU.
    const currDate = DateTime.getFirstDayOfWeek(
      visibleMonth.clone().startOf('month')
    )

    const arr: Moment[] = []
    for (let i = 0; i < Calendar.DAY_COUNT; i++) {
      // This workaround is needed because moment's `.add({days: 1})` function has a bug that happens when the date added lands perfectly onto the DST cutoff,
      // in these cases adding 1 day results in 23 hours added instead,
      // so `moment.tz('2024-09-07T00:00:00', 'America/Santiago').add({days: 1})` results
      // in "Sat Sep 07 2024 23:00:00 GMT-0400" instead of "Sun Sep 08 2024 00:00:00 GMT-0400".
      // which would cause duplicate dates in the calendar.
      // More info on the bug: https://github.com/moment/moment/issues/4743
      // Please note that this causes one hour of time difference in the affected timezones/dates and to
      // fully solve this bug we need to change to something like luxon which handles this properly
      if (currDate.clone().format('HH') === '23') {
        arr.push(currDate.clone().add({ hours: 1 }))
      } else {
        arr.push(currDate.clone())
      }

      currDate.add({ days: 1 })
    }
    return arr.map((date) => {
      const dateStr = date.toISOString()
      return (
        <Calendar.Day
          key={dateStr}
          date={dateStr}
          isSelected={selectedDate ? date.isSame(selectedDate, 'day') : false}
          isToday={date.isSame(today, 'day')}
          isOutsideMonth={!date.isSame(visibleMonth, 'month')}
          label={date.format('D MMMM YYYY')} // used by screen readers
          onClick={this.handleDayClick}
          interaction={this.isDisabledDate(date) ? 'disabled' : 'enabled'}
        >
          {date.format('DD')}
        </Calendar.Day>
      )
    })
  }

  render() {
    const passthroughProps = View.omitViewProps(
      omitProps(this.props, Calendar.allowedProps),
      Calendar
    )

    return (
      <View
        {...passthroughProps}
        as={this.props.as}
        display="inline-block"
        padding="small"
        background="primary"
        elementRef={this.handleRef}
        data-cid="Calendar"
      >
        {this.renderHeader()}
        {this.renderBody()}
      </View>
    )
  }
}

export default Calendar
export { Calendar }
