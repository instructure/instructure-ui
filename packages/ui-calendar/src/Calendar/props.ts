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

import type {
  AsElementType,
  CalendarTheme,
  OtherHTMLAttributes
} from '@instructure/shared-types'
import type { WithStyleProps, ComponentStyle } from '@instructure/emotion'
import { ReactElement } from 'react'
import type { CalendarDayProps } from './Day/props'
import { Renderable } from '@instructure/shared-types'
import type { Moment } from '@instructure/ui-i18n'

type CalendarOwnProps = {
  /**
   * The element to render as the `Calendar` root, `span` by default
   */
  as?: AsElementType
  /**
   * children of type `<Calendar.Day />` There should be exactly 42 provided (6
   * weeks).
   */
  children?: ReactElement<CalendarDayProps>[]
  /**
   * ISO date string for the current date if necessary. Defaults to the current
   * date in the user's timezone.
   */
  currentDate?: string
  /*
   * Specify which date(s) will be shown as disabled in the calendar.
   * You can either supply an array of ISO8601 timeDate strings or
   * a function that will be called for each date shown in the calendar.
   */
  disabledDates?: string[] | ((isoDateToCheck: string) => boolean)
  /**
   * A standard language identifier.
   *
   * See [Moment.js](https://momentjs.com/timezone/docs/#/using-timezones/parsing-in-zone/) for
   * more details.
   *
   * This property can also be set via a context property and if both are set
   * then the component property takes precedence over the context property.
   *
   * The web browser's locale will be used if no value is set via a component
   * property or a context property.
   **/
  locale?: string
  /**
   * Callback fired when a day has been selected.
   */
  onDateSelected?: (
    dateString: string,
    momentDate: Moment,
    e: React.MouseEvent
  ) => void
  /**
   * Callback fired when the next month button is clicked in the navigation
   * header, requesting to render the next month.
   */
  onRequestRenderNextMonth?: (
    e: React.MouseEvent,
    requestedMonth: string
  ) => void
  /**
   * Callback fired when the previous month button is clicked in the navigation
   * header, requesting to render the previous month.
   */
  onRequestRenderPrevMonth?: (
    e: React.MouseEvent,
    requestedMonth: string
  ) => void
  /**
   * Content to render in the navigation header. The recommendation is to include
   * the name of the current rendered month along with the year.
   */
  renderNavigationLabel?: Renderable
  /**
   * A button to render in the navigation header. The recommendation is to
   * compose it with the [IconButton](#IconButton) component by setting the `size`
   * prop to `small`, `withBorder` and `withBackground` to `false`, and setting
   * `renderIcon` to [IconArrowOpenEnd](#icons).
   */
  renderNextMonthButton?: Renderable
  /**
   * A button to render in the navigation header. The recommendation is to
   * compose it with the [IconButton](#Button) component by setting the `size`
   * prop to `small`, `withBorder` and `withBackground` to `false`, and setting
   * `renderIcon` to [IconArrowOpenStart](#icons).
   */
  renderPrevMonthButton?: Renderable
  /**
   * An array of labels containing the name of each day of the week. The visible
   * portion of the label should be abbreviated (no longer than three characters).
   * Note that screen readers will read this content preceding each date as the
   * `<Calendar />` is navigated. Consider using
   * [AccessibleContent](#AccessibleContent) with the `alt` prop containing the
   * full day name for assistive technologies and the children containing the
   * abbreviation. ex. `[<AccessibleContent alt="Sunday">Sun</AccessibleContent>, ...]`
   */
  renderWeekdayLabels?: Renderable[]
  /**
   * The role of the underlying table. This can be set to 'listbox' when
   * assistive technologies need to read the `<Calendar.Day />` children as a list.
   */
  role?: 'table' | 'listbox'
  /**
   * ISO date string for the selected date. It needs onDateSelected to be specified too.
   */
  selectedDate?: string
  /**
   * A timezone identifier in the format: *Area/Location*
   *
   * See [List of tz database time zones](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) for the list
   * of possible options.
   *
   * This property can also be set via a context property and if both are set
   * then the component property takes precedence over the context property.
   *
   * The web browser's timezone will be used if no value is set via a component
   * property or a context property.
   */
  timezone?: string
  /**
   * Visible month for the rendered calendar. Formatted as an ISO date string.
   */
  visibleMonth?: string

  /**
   * If set, years can be picked from a dropdown.
   * It accepts an object.
   * screenReaderLabel: string // e.g.: i18n("pick a year")
   *
   * onRequestYearChange?:(e: React.MouseEvent,requestedYear: number): void // if set, on year change, only this will be called and no internal change will take place
   *
   * startYear: number // e.g.: 2001, sets the start year of the selectable list
   *
   * endYear: number // e.g.: 2030, sets the end year of the selectable list
   */
  withYearPicker?: {
    screenReaderLabel: string
    onRequestYearChange?: (e: any, requestedYear: number) => void
    startYear: number
    endYear: number
  }
}

type PropKeys = keyof CalendarOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type CalendarProps = CalendarOwnProps &
  WithStyleProps<CalendarTheme, CalendarStyle> &
  OtherHTMLAttributes<CalendarOwnProps>

type CalendarStyle = ComponentStyle<
  'navigation' | 'navigationWithButtons' | 'weekdayHeader' | 'yearPicker'
>
const allowedProps: AllowedPropKeys = [
  'as',
  'children',
  'currentDate',
  'disabledDates',
  'locale',
  'onDateSelected',
  'onRequestRenderNextMonth',
  'onRequestRenderPrevMonth',
  'renderNavigationLabel',
  'renderNextMonthButton',
  'renderPrevMonthButton',
  'renderWeekdayLabels',
  'role',
  'selectedDate',
  'timezone',
  'visibleMonth'
]

type CalendarState = {
  visibleMonth: Moment
  today: Moment
}

export type { CalendarProps, CalendarStyle, CalendarState }
export { allowedProps }
