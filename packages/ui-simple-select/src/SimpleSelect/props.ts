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

import { Children as ChildrenPropTypes } from '@instructure/ui-prop-types'
import { FormPropTypes } from '@instructure/ui-form-field'
import { PositionPropTypes } from '@instructure/ui-position'

import { Group } from './Group'
import { Option } from './Option'

import type { FormMessage } from '@instructure/ui-form-field'
import type {
  OtherHTMLAttributes,
  PropValidators
} from '@instructure/shared-types'
import type {
  PlacementPropValues,
  PositionConstraint,
  PositionMountNode
} from '@instructure/ui-position'

type SimpleSelectOwnProps = {
  renderLabel: React.ReactNode | ((...args: any[]) => any)
  value?: string | number // TODO: it was using the "controllable" util, in the TS migration mimic that behaviour
  defaultValue?: string
  id?: string
  size?: 'small' | 'medium' | 'large'
  assistiveText?: string
  placeholder?: string
  interaction?: 'enabled' | 'disabled' | 'readonly'
  isRequired?: boolean
  isInline?: boolean
  width?: string
  optionsMaxWidth?: string
  visibleOptionsCount?: number
  messages?: FormMessage[]
  placement?: PlacementPropValues
  constrain?: PositionConstraint
  mountNode?: PositionMountNode
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
  children?: React.ReactNode
}

type PropKeys = keyof SimpleSelectOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type SimpleSelectProps = SimpleSelectOwnProps &
  OtherHTMLAttributes<
    SimpleSelectOwnProps,
    InputHTMLAttributes<SimpleSelectOwnProps>
  >

const propTypes: PropValidators<PropKeys> = {
  /**
   * The form field label.
   */
  renderLabel: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  /**
   * The value corresponding to the value of the selected option. If defined,
   * the component will act controlled and will not manage its own state.
   */
  // TODO: it was using the "controllable" util, in the TS migration mimic that behaviour
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * The value of the option to select by default, when uncontrolled.
   */
  defaultValue: PropTypes.string,
  /**
   * The id of the text input. One is generated if not supplied.
   */
  id: PropTypes.string,
  /**
   * The size of the text input.
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /**
   * Additional helpful text to provide to screen readers about the operation
   * of the component. Provided via aria-describedby.
   */
  assistiveText: PropTypes.string,
  /**
   * Html placeholder text to display when the input has no value. This should
   * be hint text, not a label replacement.
   */
  placeholder: PropTypes.string,
  /**
   * Specifies if interaction with the input is enabled, disabled, or readonly.
   * When "disabled", the input changes visibly to indicate that it cannot
   * receive user interactions. When "readonly" the input still cannot receive
   * user interactions but it keeps the same styles as if it were enabled.
   */
  interaction: PropTypes.oneOf(['enabled', 'disabled', 'readonly']),
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
   * An element or a function returning an element to use mount the options
   * list to in the DOM (defaults to `document.body`)
   */
  mountNode: PositionPropTypes.mountNode,
  /**
   * Callback fired when a new option is selected.
   * @param {Object} event - the event object
   * @param {Object} data - additional data
   * @param data.value - the value of selected option
   * @param data.id - the id of the selected option
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
  /**
   * Children of type `<SimpleSelect.Option />` or `<SimpleSelect.Group />`.
   */
  children: ChildrenPropTypes.oneOf([Group, Option])
}

const allowedProps: AllowedPropKeys = [
  'renderLabel',
  'value',
  'defaultValue',
  'id',
  'size',
  'assistiveText',
  'placeholder',
  'interaction',
  'isRequired',
  'isInline',
  'width',
  'optionsMaxWidth',
  'visibleOptionsCount',
  'messages',
  'placement',
  'constrain',
  'mountNode',
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
  'children'
]

export type { SimpleSelectProps }
export { propTypes, allowedProps }
