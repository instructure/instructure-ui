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

import React from 'react'
import PropTypes from 'prop-types'

import { controllable } from '@instructure/ui-prop-types'
import { I18nPropTypes } from '@instructure/ui-i18n'
import { FormPropTypes } from '@instructure/ui-form-field'
import { PositionPropTypes } from '@instructure/ui-position'

import type { FormMessage } from '@instructure/ui-form-field'
import type { PropValidators } from '@instructure/shared-types'
import type {
  PlacementPropValues,
  PositionConstraint
} from '@instructure/ui-position'

type TimeSelectOwnProps = {
  renderLabel: React.ReactNode | ((...args: any[]) => any)
  defaultToFirstOption?: boolean
  value?: any // TODO: controllable(I18nPropTypes.iso8601, 'onChange'),
  defaultValue?: string
  id?: string
  format?: string
  step?: 5 | 10 | 15 | 20 | 30 | 60
  interaction?: 'enabled' | 'disabled' | 'readonly'
  placeholder?: string
  isRequired?: boolean
  isInline?: boolean
  width?: string
  optionsMaxWidth?: string
  visibleOptionsCount?: number
  messages?: FormMessage[]
  placement?: PlacementPropValues
  constrain?: PositionConstraint
  onChange?: (...args: any[]) => any
  onFocus?: (...args: any[]) => any
  onBlur?: (...args: any[]) => any
  onShowOptions?: (...args: any[]) => any
  onHideOptions?: (...args: any[]) => any
  inputRef?: (...args: any[]) => any
  listRef?: (...args: any[]) => any
  renderEmptyOption?: React.ReactNode | ((...args: any[]) => any)
  renderBeforeInput?: React.ReactNode | ((...args: any[]) => any)
  renderAfterInput?: React.ReactNode | ((...args: any[]) => any)
  locale?: string
  timezone?: string
}

type PropKeys = keyof TimeSelectOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type TimeSelectProps = TimeSelectOwnProps

const propTypes: PropValidators<PropKeys> = {
  /**
   * The form field label.
   */
  renderLabel: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  /**
   * Whether to default to the first option when `defaultValue` hasn't been specified.
   */
  defaultToFirstOption: PropTypes.bool,
  /**
   * An ISO 8601 formatted date string representing the current selected value. If defined,
   * the component will act controlled and will not manage its own state.
   */
  value: controllable(I18nPropTypes.iso8601, 'onChange'),
  /**
   * An ISO 8601 formatted date string to use if `value` isn't provided.
   */
  defaultValue: I18nPropTypes.iso8601,
  /**
   * The id of the text input. One is generated if not supplied.
   */
  id: PropTypes.string,
  /**
   * The format to use when displaying the possible and currently selected options.
   *
   * See [moment.js formats](https://momentjs.com/docs/#/displaying/format/) for the list of available formats.
   */
  format: PropTypes.string,
  /**
   * The number of minutes to increment by when generating the allowable options.
   */
  step: PropTypes.oneOf([5, 10, 15, 20, 30, 60]),
  /**
   * Specifies if interaction with the input is enabled, disabled, or readonly.
   * When "disabled", the input changes visibly to indicate that it cannot
   * receive user interactions. When "readonly" the input still cannot receive
   * user interactions but it keeps the same styles as if it were enabled.
   */
  interaction: PropTypes.oneOf(['enabled', 'disabled', 'readonly']),
  /**
   * Html placeholder text to display when the input has no value. This should
   * be hint text, not a label replacement.
   */
  placeholder: PropTypes.string,
  /**
   * Whether or not the text input is required.
   */
  isRequired: PropTypes.bool,
  /**
   * Whether the input is rendered inline with other elements or if it
   * is rendered as a block level element.
   */
  isInline: PropTypes.bool,
  /**
   * The width of the text input.
   */
  width: PropTypes.string,
  /**
   * The max width the options list can be before option text wraps. If not
   * set, the list will only display as wide as the text input.
   */
  optionsMaxWidth: PropTypes.string,
  /**
   * The number of options that should be visible before having to scroll.
   */
  visibleOptionsCount: PropTypes.number,
  /**
   * Displays messages and validation for the input. It should be an object
   * with the following shape:
   * `{
   *   text: PropTypes.string,
   *   type: PropTypes.oneOf(['error', 'hint', 'success', 'screenreader-only'])
   * }`
   */
  messages: PropTypes.arrayOf(FormPropTypes.message),
  /**
   * The placement of the options list.
   */
  placement: PositionPropTypes.placement,
  /**
   * The parent in which to constrain the placement.
   */
  constrain: PositionPropTypes.constrain,
  /**
   * Callback fired when a new option is selected.
   * @param {Object} event - the event object
   * @param {Object} data - additional data
   * @param data.value - the value of selected option
   */
  onChange: PropTypes.func,
  /**
   * Callback fired when text input receives focus.
   */
  onFocus: PropTypes.func,
  /**
   * Callback fired when text input loses focus.
   */
  onBlur: PropTypes.func,
  /**
   * Callback fired when the options list is shown.
   */
  onShowOptions: PropTypes.func,
  /**
   * Callback fired when the options list is hidden.
   */
  onHideOptions: PropTypes.func,
  /**
   * A ref to the html `input` element.
   */
  inputRef: PropTypes.func,
  /**
   * A ref to the html `ul` element.
   */
  listRef: PropTypes.func,
  /**
   * Content to display in the list when no options are available.
   */
  renderEmptyOption: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  /**
   * Content to display before the text input. This will commonly be an icon.
   */
  renderBeforeInput: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  /**
   * Content to display after the text input. This content will replace the
   * default arrow icons.
   */
  renderAfterInput: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),

  /* eslint-disable react/require-default-props */
  /**
   * A standard language identifier.
   *
   * See [moment.js i18n](https://momentjs.com/docs/#/i18n/) for more details.
   *
   * This property can also be set via a context property and if both are set then the component property takes
   * precedence over the context property.
   *
   * The web browser's locale will be used if no value is set via a component property or a context
   * property.
   */
  locale: PropTypes.string,
  /**
   * A timezone identifier in the format: Area/Location
   *
   * See [List of tz database time zones](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) for the list
   * of possible options.
   *
   * This property can also be set via a context property and if both are set then the component property takes
   * precedence over the context property.
   *
   * The web browser's timezone will be used if no value is set via a component property or a context
   * property.
   */
  timezone: PropTypes.string
  /* eslint-enable react/require-default-props */
}

const allowedProps: AllowedPropKeys = [
  'renderLabel',
  'defaultToFirstOption',
  'value',
  'defaultValue',
  'id',
  'format',
  'step',
  'interaction',
  'placeholder',
  'isRequired',
  'isInline',
  'width',
  'optionsMaxWidth',
  'visibleOptionsCount',
  'messages',
  'placement',
  'constrain',
  'onChange',
  'onFocus',
  'onBlur',
  'onShowOptions',
  'onHideOptions',
  'inputRef',
  'listRef',
  'renderEmptyOption',
  'renderBeforeInput',
  'renderAfterInput',
  'locale',
  'timezone'
]

export type { TimeSelectProps }
export { propTypes, allowedProps }
