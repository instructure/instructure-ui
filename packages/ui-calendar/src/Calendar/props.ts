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

import PropTypes from 'prop-types'

import { Children as ChildrenPropTypes } from '@instructure/ui-prop-types'
import { Day } from './Day'

import type { AsElementType, PropValidators } from '@instructure/shared-types'
import type { WithStyleProps } from '@instructure/emotion'

type CalendarOwnProps = {
  children?: React.ReactNode // TODO: oneOf([Day])
  renderNextMonthButton?: React.ReactNode | ((...args: any[]) => any)
  renderPrevMonthButton?: React.ReactNode | ((...args: any[]) => any)
  renderNavigationLabel?: React.ReactNode | ((...args: any[]) => any)
  renderWeekdayLabels: (React.ReactNode | ((...args: any[]) => any))[]
  onRequestRenderNextMonth?: (...args: any[]) => any
  onRequestRenderPrevMonth?: (...args: any[]) => any
  as?: AsElementType
  role?: 'table' | 'listbox'
}

type PropKeys = keyof CalendarOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type CalendarProps = CalendarOwnProps & WithStyleProps

const propTypes: PropValidators<PropKeys> = {
  /**
   * children of type `<Calendar.Day />` There should be exactly 42 provided (6
   * weeks).
   */
  children: ChildrenPropTypes.oneOf([Day]),
  /**
   * A button to render in the navigation header. The recommendation is to
   * compose it with the [IconButton](#IconButton) component by setting the `size`
   * prop to `small`, `withBorder` and `withBackground` to `false`, and setting
   * `renderIcon` to [IconArrowOpenEnd](#iconography).
   */
  renderNextMonthButton: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  /**
   * A button to render in the navigation header. The recommendation is to
   * compose it with the [IconButton](#Button) component by setting the `size`
   * prop to `small`, `withBorder` and `withBackground` to `false`, and setting
   * `renderIcon` to [IconArrowOpenStart](#iconography).
   */
  renderPrevMonthButton: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  /**
   * Content to render in the navigation header. The recommendation is to include
   * the name of the current rendered month along with the year.
   */
  renderNavigationLabel: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  /**
   * An array of labels containing the name of each day of the week. The visible
   * portion of the label should be abbreviated (no longer than three characters).
   * Note that screen readers will read this content preceding each date as the
   * `<Calendar />` is navigated. Consider using
   * [AccessibleContent](#AccessibleContent) with the `alt` prop containing the
   * full day name for assistive technologies and the children containing the
   * abbreviation. ex. `[<AccessibleContent alt="Sunday">Sun</AccessibleContent>, ...]`
   */
  renderWeekdayLabels: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.node, PropTypes.func])
  ).isRequired,
  /**
   * Callback fired when the next month button is clicked in the navigation
   * header, requesting to render the next month.
   */
  onRequestRenderNextMonth: PropTypes.func,
  /**
   * Callback fired when the previous month button is clicked in the navigation
   * header, requesting to render the previous month.
   */
  onRequestRenderPrevMonth: PropTypes.func,
  /**
   * The element to render as the `Calendar` root, `span` by default
   */
  as: PropTypes.elementType,
  /**
   * The role of the underlying table. This can be set to 'listbox' when
   * assistive technologies need to read the `<Calendar.Day />` children as a list.
   */
  role: PropTypes.oneOf(['table', 'listbox'])
}

const allowedProps: AllowedPropKeys = [
  'children',
  'renderNextMonthButton',
  'renderPrevMonthButton',
  'renderNavigationLabel',
  'renderWeekdayLabels',
  'onRequestRenderNextMonth',
  'onRequestRenderPrevMonth',
  'as',
  'role'
]

export type { CalendarProps }
export { propTypes, allowedProps }
