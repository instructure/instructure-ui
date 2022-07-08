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

import React, { InputHTMLAttributes } from 'react'
import PropTypes from 'prop-types'

import { controllable } from '@instructure/ui-prop-types'
import { I18nPropTypes } from '@instructure/ui-i18n'
import { FormPropTypes } from '@instructure/ui-form-field'
import { PositionPropTypes } from '@instructure/ui-position'

import type { FormMessage } from '@instructure/ui-form-field'
import type {
  OtherHTMLAttributes,
  PropValidators
} from '@instructure/shared-types'
import type {
  PlacementPropValues,
  PositionConstraint
} from '@instructure/ui-position'
import type { WithDeterministicIdProps } from '@instructure/ui-react-utils'
import { Renderable } from '@instructure/shared-types'

type PropKeys = keyof TimeSelectOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type TimeSelectProps = TimeSelectOwnProps &
  OtherHTMLAttributes<
    TimeSelectOwnProps,
    InputHTMLAttributes<TimeSelectOwnProps>
  > &
  WithDeterministicIdProps

type TimeSelectOwnProps = {
  /**
   * The form field label.
   */
  renderLabel: Renderable
  /**
   * Whether to default to the first option when `defaultValue` hasn't been specified.
   */
  defaultToFirstOption?: boolean
  /**
   * An ISO 8601 formatted date string representing the current selected value. If defined,
   * the component will act controlled and will not manage its own state.
   */
  value?: string // TODO: controllable(I18nPropTypes.iso8601, 'onChange'),
  /**
   * An ISO 8601 formatted date string to use if `value` isn't provided.
   */
  defaultValue?: string
  /**
   * The id of the text input. One is generated if not supplied.
   */
  id?: string
  /**
   * The format to use when displaying the possible and currently selected options.
   *
   * See [moment](https://momentjs.com/docs/#/displaying/format/) for the list
   * of available formats.
   */
  format?: string
  /**
   * The number of minutes to increment by when generating the allowable options.
   */
  step?: 5 | 10 | 15 | 20 | 30 | 60
  /**
   * Specifies if interaction with the input is enabled, disabled, or readonly.
   * When "disabled", the input changes visibly to indicate that it cannot
   * receive user interactions. When "readonly" the input still cannot receive
   * user interactions, but it keeps the same styles as if it were enabled.
   */
  interaction?: 'enabled' | 'disabled' | 'readonly'
  /**
   * Html placeholder text to display when the input has no value. This should
   * be hint text, not a label replacement.
   */
  placeholder?: string
  isRequired?: boolean
  /**
   * Whether the input is rendered inline with other elements or if it
   * is rendered as a block level element.
   */
  isInline?: boolean
  /**
   * The width of the text input.
   */
  width?: string
  /**
   * The max width the options list can be before option text wraps. If not
   * set, the list will only display as wide as the text input.
   */
  optionsMaxWidth?: string
  /**
   * The number of options that should be visible before having to scroll.
   */
  visibleOptionsCount?: number
  /**
   * Displays messages and validation for the input. It should be an array of
   * objects with the following shape:
   * `{
   *     text: ReactNode,
   *     type: One of: ['error', 'hint', 'success', 'screenreader-only']
   * }`
   */
  messages?: FormMessage[]
  /**
   * The placement of the options list.
   */
  placement?: PlacementPropValues
  /**
   * The parent in which to constrain the placement.
   */
  constrain?: PositionConstraint
  /**
   * Callback fired when a new option is selected.
   * @param event - the event object
   * @param data - additional data
   */
  onChange?: (
    event: React.SyntheticEvent,
    data: { value?: string; inputText: string }
  ) => void
  /**
   * Callback fired when text input receives focus.
   */
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void
  /**
   * Callback fired when text input loses focus.
   */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
  /**
   * Callback fired when the options list is shown.
   */
  onShowOptions?: (event: React.SyntheticEvent) => void
  /**
   * Callback fired when the options list is hidden.
   */
  onHideOptions?: (event: React.SyntheticEvent) => void
  /**
   * A ref to the html `input` element.
   */
  inputRef?: (inputElement: HTMLInputElement | null) => void
  /**
   * A ref to the html `ul` element.
   */
  listRef?: (listElement: HTMLUListElement | null) => void
  /**
   * Content to display in the list when no options are available.
   */
  renderEmptyOption?: Renderable
  /**
   * Content to display before the text input. This will commonly be an icon.
   */
  renderBeforeInput?: Renderable
  /**
   * Content to display after the text input. This content will replace the
   * default arrow icons.
   */
  renderAfterInput?: Renderable
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
  locale?: string
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
  timezone?: string
}

const propTypes: PropValidators<PropKeys> = {
  renderLabel: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  defaultToFirstOption: PropTypes.bool,
  value: controllable(I18nPropTypes.iso8601, 'onChange'),
  defaultValue: I18nPropTypes.iso8601,
  id: PropTypes.string,
  format: PropTypes.string,
  step: PropTypes.oneOf([5, 10, 15, 20, 30, 60]),
  interaction: PropTypes.oneOf(['enabled', 'disabled', 'readonly']),
  placeholder: PropTypes.string,
  isRequired: PropTypes.bool,
  isInline: PropTypes.bool,
  width: PropTypes.string,
  optionsMaxWidth: PropTypes.string,
  visibleOptionsCount: PropTypes.number,
  messages: PropTypes.arrayOf(FormPropTypes.message),
  placement: PositionPropTypes.placement,
  constrain: PositionPropTypes.constrain,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onShowOptions: PropTypes.func,
  onHideOptions: PropTypes.func,
  inputRef: PropTypes.func,
  listRef: PropTypes.func,
  renderEmptyOption: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  renderBeforeInput: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  renderAfterInput: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  locale: PropTypes.string,
  timezone: PropTypes.string
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

type TimeSelectOptions = {
  id?: string
  value?: string
  label: string
}

type TimeSelectState = {
  inputValue: string
  options: TimeSelectOptions[]
  filteredOptions: TimeSelectOptions[]
  isShowingOptions: boolean
  highlightedOptionId?: string
  selectedOptionId?: string
}

export type { TimeSelectProps, TimeSelectState, TimeSelectOptions }
export { propTypes, allowedProps }
