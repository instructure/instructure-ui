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

import type {
  OtherHTMLAttributes,
  PropValidators,
  SelectTheme
} from '@instructure/shared-types'
import type { FormMessage } from '@instructure/ui-form-field'
import type { WithStyleProps, ComponentStyle } from '@instructure/emotion'
import type {
  PlacementPropValues,
  PositionConstraint,
  PositionMountNode
} from '@instructure/ui-position'

type SelectOwnProps = {
  renderLabel: React.ReactNode | ((...args: any[]) => any)
  inputValue?: string
  isShowingOptions?: boolean
  id?: string
  size?: 'small' | 'medium' | 'large'
  assistiveText?: string
  placeholder?: string
  interaction?: 'enabled' | 'disabled' | 'readonly'
  isRequired?: boolean
  isInline?: boolean
  width?: string
  htmlSize?: string | number
  optionsMaxWidth?: string
  visibleOptionsCount?: number
  messages?: FormMessage[]
  placement?: PlacementPropValues
  constrain?: PositionConstraint
  mountNode?: PositionMountNode
  onFocus?: (...args: any[]) => any
  onBlur?: (...args: any[]) => any
  onInputChange?: (...args: any[]) => any
  onRequestShowOptions?: (...args: any[]) => any
  onRequestHideOptions?: (...args: any[]) => any
  onRequestHighlightOption?: (...args: any[]) => any
  onRequestSelectOption?: (...args: any[]) => any
  inputRef?: (...args: any[]) => any
  listRef?: (...args: any[]) => any
  renderBeforeInput?: React.ReactNode | ((...args: any[]) => any)
  renderAfterInput?: React.ReactNode | ((...args: any[]) => any)
  shouldNotWrap?: boolean
  children?: React.ReactNode
}

type PropKeys = keyof SelectOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type SelectProps = SelectOwnProps &
  WithStyleProps<SelectTheme, SelectStyle> &
  OtherHTMLAttributes<SelectOwnProps, InputHTMLAttributes<SelectOwnProps>>

type SelectStyle = ComponentStyle<'select' | 'icon' | 'assistiveText'>

const propTypes: PropValidators<PropKeys> = {
  /**
   * The form field label.
   */
  renderLabel: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  /**
   * The value to display in the text input.
   */
  inputValue: PropTypes.string,
  /**
   * Whether or not to show the options list.
   */
  isShowingOptions: PropTypes.bool,
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
   * of the component.
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
   * The width of the text input, in characters, if a width is not explicitly
   * provided via the `width` prop. Only applicable if `isInline={true}`.
   */
  htmlSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
   *   text: PropTypes.node,
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
   * Callback fired when text input receives focus.
   */
  onFocus: PropTypes.func,
  /**
   * Callback fired when text input loses focus.
   */
  onBlur: PropTypes.func,
  /**
   * Callback fired when text input value changes.
   */
  onInputChange: PropTypes.func,
  /**
   * Callback fired requesting that the options list be shown.
   */
  onRequestShowOptions: PropTypes.func,
  /**
   * Callback fired requesting that the options list be hidden.
   */
  onRequestHideOptions: PropTypes.func,
  /**
   * Callback fired requesting a particular option be highlighted.
   */
  onRequestHighlightOption: PropTypes.func,
  /**
   * Callback fired requesting a particular option be selected.
   */
  onRequestSelectOption: PropTypes.func,
  /**
   * A ref to the html `input` element.
   */
  inputRef: PropTypes.func,
  /**
   * A ref to the html `ul` element.
   */
  listRef: PropTypes.func,
  /**
   * Content to display before the text input. This will commonly be an icon or
   * tags to show multiple selections.
   */
  renderBeforeInput: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  /**
   * Content to display after the text input. This content will replace the
   * default arrow icons.
   */
  renderAfterInput: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  /**
   * Children of type `<Select.Option />` or `<Select.Group />`.
   */
  children: ChildrenPropTypes.oneOf([Group, Option]),
  /**
   * Prevents the default behavior of wrapping the input and rendered content
   * when available space is exceeded.
   */
  shouldNotWrap: PropTypes.bool
}

const allowedProps: AllowedPropKeys = [
  'renderLabel',
  'inputValue',
  'isShowingOptions',
  'id',
  'size',
  'assistiveText',
  'placeholder',
  'interaction',
  'isRequired',
  'isInline',
  'width',
  'htmlSize',
  'optionsMaxWidth',
  'visibleOptionsCount',
  'messages',
  'placement',
  'constrain',
  'mountNode',
  'onFocus',
  'onBlur',
  'onInputChange',
  'onRequestShowOptions',
  'onRequestHideOptions',
  'onRequestHighlightOption',
  'onRequestSelectOption',
  'inputRef',
  'listRef',
  'renderBeforeInput',
  'renderAfterInput',
  'children',
  'shouldNotWrap'
]

export type { SelectProps, SelectStyle }
export { propTypes, allowedProps }
