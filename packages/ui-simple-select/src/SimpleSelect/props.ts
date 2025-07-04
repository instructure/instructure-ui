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
import PropTypes from 'prop-types'

import { Children as ChildrenPropTypes } from '@instructure/ui-prop-types'
import { FormPropTypes } from '@instructure/ui-form-field'
import { PositionPropTypes } from '@instructure/ui-position'

import { Group } from './Group'
import { Option } from './Option'

import type { FormMessage } from '@instructure/ui-form-field'
import type {
  OtherHTMLAttributes,
  PickPropsWithExceptions,
  PropValidators
} from '@instructure/shared-types'
import type {
  PlacementPropValues,
  PositionConstraint,
  PositionMountNode
} from '@instructure/ui-position'
import type { SelectOwnProps } from '@instructure/ui-select'
import type { WithDeterministicIdProps } from '@instructure/ui-react-utils'
import { Renderable } from '@instructure/shared-types'

type SimpleSelectOwnProps = PropsPassedToSelect & {
  /**
   * The value corresponding to the value of the selected option. If defined,
   * the component will act controlled and will not manage its own state.
   */
  value?: string | number // TODO: it was using the "controllable" util, in the TS migration mimic that behaviour

  /**
   * The value of the option to select by default, when uncontrolled.
   */
  defaultValue?: string

  /**
   * Callback fired when a new option is selected.
   */
  onChange?: (
    event: React.SyntheticEvent,
    data: {
      value?: string | number
      id?: string
    }
  ) => void

  // passed to Select as onRequestShowOptions
  /**
   * Callback fired when the options list is shown.
   */
  onShowOptions?: (event: React.SyntheticEvent) => void

  // passed to Select as onRequestHideOptions
  /**
   * Callback fired when the options list is hidden.
   */
  onHideOptions?: (event: React.SyntheticEvent) => void

  /**
   * Content to display in the list when no options are available.
   */
  renderEmptyOption?: Renderable

  /**
   * Children of type `<SimpleSelect.Option />` or `<SimpleSelect.Group />`.
   */
  children?: React.ReactNode // TODO: ChildrenPropTypes.oneOf([Group, Option])
}

type PropsPassedToSelect = {
  /**
   * The form field label.
   */
  renderLabel: Renderable

  /**
   * The id of the text input. One is generated if not supplied.
   */
  id?: string

  /**
   * The size of the text input.
   */
  size?: 'small' | 'medium' | 'large'

  /**
   * Additional helpful text to provide to screen readers about the operation
   * of the component. Provided via aria-describedby.
   */
  assistiveText?: string

  /**
   * Html placeholder text to display when the input has no value. This should
   * be hint text, not a label replacement.
   */
  placeholder?: string

  /**
   * Specifies if interaction with the input is enabled, disabled, or readonly.
   * When "disabled", the input changes visibly to indicate that it cannot
   * receive user interactions. When "readonly" the input still cannot receive
   * user interactions but it keeps the same styles as if it were enabled.
   */
  interaction?: 'enabled' | 'disabled' | 'readonly'

  /**
   * Whether or not the text input is required.
   */
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
   * The number of options that should be visible before having to scroll. Works best when the options are the same height.
   */
  visibleOptionsCount?: number

  /**
   * The max height the options list can be before having to scroll. If
   * set, it will __override__ the `visibleOptionsCount` prop.
   */
  optionsMaxHeight?: string

  /**
   * The max width the options list can be before option text wraps. If not
   * set, the list will only display as wide as the text input.
   */
  optionsMaxWidth?: string

  /**
   * Displays messages and validation for the input. It should be an array of
   * objects with the following shape:
   * `{
   *   text: ReactNode,
   *   type: One of: ['newError', 'error', 'hint', 'success', 'screenreader-only']
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
   * A ref to the html `input` element.
   */
  inputRef?: (inputElement: HTMLInputElement | null) => void

  /**
   * A ref to the html `ul` element.
   */
  listRef?: (listElement: HTMLUListElement | null) => void

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
   * Callback fired when text input receives focus.
   */
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void

  /**
   * Callback fired when text input loses focus.
   */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
  /**
   * Whether or not the content of the selected `SimpleSelect.Option`'s `renderBeforeLabel` and `renderAfterLabel` appear in the input field.
   *
   * If the selected `SimpleSelect.Option` has both `renderBeforeLabel` and `renderAfterLabel` content, both will be displayed in the input field.
   *
   * `SimpleSelect.Option`'s `renderBeforeLabel` and `renderAfterLabel` content will not be displayed, if `SimpleSelect`'s `inputValue` is an empty value, null or undefined.
   *
   * If `true` and the selected `SimpleSelect.Option` has a `renderAfterLabel` value, it will replace the default arrow icon.
   *
   * If `true` and `SimpleSelect`'s `renderBeforeInput` or `renderAfterInput` prop is set, it will display the selected `SimpleSelect.Option`'s `renderBeforeLabel` and `renderAfterLabel` instead of `SimpleSelect`'s `renderBeforeInput` or `renderAfterInput` value.
   *
   * If the selected `SimpleSelect.Option`'s `renderAfterLabel` value is empty, default arrow icon will be rendered.
   */
  isOptionContentAppliedToInput?: boolean

  /**
   * In `stacked` mode the input is below the label.
   *
   * In `inline` mode the input is to the right/left (depending on text direction) of the label,
   * and the layout will look like `stacked` for small screens.
   */
  layout?: 'stacked' | 'inline'
}

type PropKeys = keyof SimpleSelectOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type SimpleSelectProps = PickPropsWithExceptions<
  SelectOwnProps,
  | keyof PropsPassedToSelect
  | 'children'
  | 'onRequestShowOptions'
  | 'onRequestHideOptions'
  | 'onRequestHighlightOption'
  | 'onRequestSelectOption'
  | 'inputValue'
  | 'isShowingOptions'
  | 'layout'
> &
  SimpleSelectOwnProps &
  OtherHTMLAttributes<
    SimpleSelectOwnProps,
    InputHTMLAttributes<SimpleSelectOwnProps & Element>
  > &
  WithDeterministicIdProps

type SimpleSelectState = {
  inputValue?: string
  isShowingOptions: boolean
  highlightedOptionId?: string
  selectedOptionId?: string
}

const propTypes: PropValidators<PropKeys> = {
  renderLabel: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  // TODO: it was using the "controllable" util, in the TS migration mimic that behaviour
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultValue: PropTypes.string,
  id: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  assistiveText: PropTypes.string,
  placeholder: PropTypes.string,
  interaction: PropTypes.oneOf(['enabled', 'disabled', 'readonly']),
  isRequired: PropTypes.bool,
  isInline: PropTypes.bool,
  width: PropTypes.string,
  visibleOptionsCount: PropTypes.number,
  optionsMaxHeight: PropTypes.string,
  optionsMaxWidth: PropTypes.string,
  messages: PropTypes.arrayOf(FormPropTypes.message),
  placement: PositionPropTypes.placement,
  constrain: PositionPropTypes.constrain,
  mountNode: PositionPropTypes.mountNode,
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
  children: ChildrenPropTypes.oneOf([Group, Option]),
  isOptionContentAppliedToInput: PropTypes.bool,
  layout: PropTypes.oneOf(['stacked', 'inline'])
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
  'visibleOptionsCount',
  'optionsMaxHeight',
  'optionsMaxWidth',
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
  'children',
  'layout'
]

export type { SimpleSelectProps, SimpleSelectState }
export { propTypes, allowedProps }
