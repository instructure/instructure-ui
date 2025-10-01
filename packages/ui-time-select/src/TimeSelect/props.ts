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

import { InputHTMLAttributes } from 'react'

import type { FormMessage } from '@instructure/ui-form-field'
import type { OtherHTMLAttributes } from '@instructure/shared-types'
import type {
  PlacementPropValues,
  PositionConstraint,
  PositionMountNode
} from '@instructure/ui-position'
import type { WithDeterministicIdProps } from '@instructure/ui-react-utils'
import { Renderable } from '@instructure/shared-types'
import type { Moment } from 'moment-timezone'

type PropKeys = keyof TimeSelectOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type TimeSelectProps = TimeSelectOwnProps &
  OtherHTMLAttributes<
    TimeSelectOwnProps,
    InputHTMLAttributes<TimeSelectOwnProps & Element>
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
   * This component currently rounds seconds down to the minute.
   * Defaults to `LT`, which is localized time without seconds, e.g. "16:45" or
   * "4:45 PM"
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
   *     type: One of: ['newError', 'error', 'hint', 'success', 'screenreader-only']
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
   * An element or a function returning an element to use mount the options
   * list to in the DOM (defaults to `document.body`)
   */
  mountNode?: PositionMountNode
  /**
   * Callback fired when a new option is selected. This can happen in the
   * following ways:
   * 1. User clicks/presses enter on an option in the dropdown and focuses away
   * 2. User enters a valid time manually and focuses away
   * @param event - the event object
   * @param data - additional data containing the value and the input string
   */
  onChange?: (
    event: React.SyntheticEvent,
    data: { value: string; inputText: string }
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
  /**
   * Whether to allow the user to enter non-step divisible values in the input field.
   * Note that even if this is set to `false` one can enter non-step divisible values programatically.
   * The user will need to enter the value exactly (except for lower/uppercase) as specified by the `format` prop  for
   * it to be accepted.
   *
   * Default is `false`
   */
  allowNonStepInput?: boolean
  /**
   * Callback fired when text input value changes.
   */
  onInputChange?: (
    /**
     * The raw HTML input event
     */
    event: React.ChangeEvent<HTMLInputElement>,
    /**
     * The text value in the input field.
     */
    value: string,
    /**
     * Current value as ISO datetime string, undefined it its a non-valid value.
     */
    valueAsISOString?: string
  ) => void
  /**
   * Whether to allow for the user to clear the selected option in the input field.
   * If `false`, the input field will return the last selected option after the input is cleared and loses focus.
   */
  allowClearingSelection?: boolean
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
  'mountNode',
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
  'timezone',
  'allowNonStepInput',
  'onInputChange',
  'allowClearingSelection'
]

type TimeSelectOptions = {
  // the ID of this option, ISO date without spaces
  id: string
  // the actual date value
  value: Moment
  // the label shown to the user
  label: string
}

type TimeSelectState = {
  /**
   * The current value in the input field, not necessarily a valid time
   */
  inputValue: string
  /**
   * All possible options. Filtered down because if `allowNonStepInput` is true
   * it'd be 24*60 options and filtered by user input.
   */
  options: TimeSelectOptions[]
  /**
   * The options shown in the options list.
   */
  filteredOptions: TimeSelectOptions[]
  /**
   * Whether to show the options list.
   */
  isShowingOptions: boolean
  /**
   * The highlighted option in the dropdown e.g. by hovering,
   * not necessarily selected
   */
  highlightedOptionId?: string
  /**
   * The ID of the selected option in the options list dropdown
   */
  selectedOptionId?: string
  /**
   * fire onChange event when the popup closes?
   */
  fireChangeOnBlur?: TimeSelectOptions
  /**
   * Whether to selected option is cleared
   */
  isInputCleared: boolean
}

export type { TimeSelectProps, TimeSelectState, TimeSelectOptions }
export { allowedProps }
