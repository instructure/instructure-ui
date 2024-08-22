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
import { I18nPropTypes } from '@instructure/ui-i18n'

import type {
  AsElementType,
  PropValidators,
  CalendarDayTheme,
  OtherHTMLAttributes
} from '@instructure/shared-types'
import type { WithStyleProps, ComponentStyle } from '@instructure/emotion'
import { KeyboardEvent, MouseEvent } from 'react'
import type { ViewProps } from '@instructure/ui-view'
import { Renderable } from '@instructure/shared-types'

type CalendarDayOwnProps = {
  /**
   * The rendered representation of the corresponding date.
   */
  children?: Renderable
  /**
   * An ISO 8601 formatted string representing the date corresponding to
   * this `<Calendar.Day />`
   */
  date: string
  /**
   * Accessible label to provide more context for the date to assistive
   * technologies. This should consist of more than just a numerical date value.
   * It should also include the month and the year. Ex. instead of just `1`,
   * provide `1 August 2019`.
   */
  label: string
  /**
   * Is the `<Calendar.Day />` disabled
   */
  interaction?: 'enabled' | 'disabled'
  /**
   * Is the `<Calendar.Day />` selected
   */
  isSelected?: boolean
  /**
   * Is the `<Calendar.Day />` today
   */
  isToday?: boolean
  /**
   * Is the `<Calendar.Day />` located outside the current rendered month
   */
  isOutsideMonth?: boolean
  /**
   * Callback fired on click.
   * @param {Object} event - the click event
   * @param {Object} data - additional data
   * @param data.date - the date of the corresponding `<Calendar.Day />`
   */
  onClick?: (
    event: MouseEvent<ViewProps & Element>,
    date: { date: string }
  ) => void
  /**
   * Callback fired on key down.
   * @param {Object} event - the key down event
   * @param {Object} data - additional data
   * @param data.date - the date of the corresponding `<Calendar.Day />`
   */
  onKeyDown?: (
    event: KeyboardEvent<ViewProps & Element>,
    data: { date: string }
  ) => void
  /**
   * A ref function for the underlying DOM element.
   */
  elementRef?: (element: Element | null) => void
  /**
   * the element type to render as
   */
  as?: AsElementType
}

type CalendarDayStyleProps = {
  isDisabled: boolean
}

type PropKeys = keyof CalendarDayOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type CalendarDayProps = CalendarDayOwnProps &
  WithStyleProps<CalendarDayTheme, CalendarDayStyle> &
  OtherHTMLAttributes<CalendarDayOwnProps>

type CalendarDayStyle = ComponentStyle<'calendarDay' | 'day'>

const propTypes: PropValidators<PropKeys> = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  date: I18nPropTypes.iso8601.isRequired,
  label: PropTypes.string.isRequired,
  interaction: PropTypes.oneOf(['enabled', 'disabled']),
  isSelected: PropTypes.bool,
  isToday: PropTypes.bool,
  isOutsideMonth: PropTypes.bool,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  elementRef: PropTypes.func,
  as: PropTypes.elementType
}

const allowedProps: AllowedPropKeys = [
  'children',
  'date',
  'label',
  'interaction',
  'isSelected',
  'isToday',
  'isOutsideMonth',
  'onClick',
  'onKeyDown',
  'elementRef',
  'as'
]

export type { CalendarDayProps, CalendarDayStyleProps, CalendarDayStyle }
export { propTypes, allowedProps }
