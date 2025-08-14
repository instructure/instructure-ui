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

import type {
  OtherHTMLAttributes,
  SelectTheme
} from '@instructure/shared-types'
import type { FormMessage } from '@instructure/ui-form-field'
import type { WithStyleProps, ComponentStyle } from '@instructure/emotion'
import type {
  PlacementPropValues,
  PositionConstraint,
  PositionMountNode
} from '@instructure/ui-position'
import type { WithDeterministicIdProps } from '@instructure/ui-react-utils'
import { Renderable } from '@instructure/shared-types'

type SelectOwnProps = {
  /**
   * Custom data attribute for testing and identification
   */
  'data-cid'?: string

  /**
   * The id of the text input. One is generated if not supplied.
   */
  id?: string

  /**
   * Additional helpful text to provide to screen readers about the operation
   * of the component.
   */
  assistiveText?: string

  /**
   * Specifies if interaction with the input is enabled, disabled, or readonly.
   * When "disabled", the input changes visibly to indicate that it cannot
   * receive user interactions. When "readonly" the input still cannot receive
   * user interactions but it keeps the same styles as if it were enabled.
   */
  interaction?: 'enabled' | 'disabled' | 'readonly'

  /**
   * Whether the input is rendered inline with other elements or if it
   * is rendered as a block level element.
   */
  isInline?: boolean

  /**
   * The number of options that should be visible before having to scroll. Works best when the options are the same height.
   */
  visibleOptionsCount?: number

  /**
   * Whether or not the content of the selected `Select.Option`'s `renderBeforeLabel` and `renderAfterLabel` appear in the input field.
   *
   * If the selected `Select.Option` has both `renderBeforeLabel` and `renderAfterLabel` content, both will be displayed in the input field.
   *
   * One of the `Select.Option`'s `isSelected` prop should be `true` in order to display the content in the input field.
   *
   * `Select.Option`'s `renderBeforeLabel` and `renderAfterLabel` content will not be displayed, if `Select`'s `inputValue` is an empty value, null or undefined.
   *
   * If `true` and the selected `Select.Option` has a `renderAfterLabel` value, it will replace the default arrow icon.
   *
   * If `true` and `Select`'s `renderBeforeInput` or `renderAfterInput` prop is set, it will display the selected `Select.Option`'s `renderBeforeLabel` and `renderAfterLabel` instead of `Select`'s `renderBeforeInput` or `renderAfterInput` value.
   *
   * If the selected `Select.Option`'s `renderAfterLabel` value is empty, default arrow icon will be rendered.
   */
  isOptionContentAppliedToInput?: boolean

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

  // Passed directly to TextInput as `value`
  /**
   * The value to display in the text input.
   */
  inputValue?: string

  // Passed directly to TextInput as `onChange`
  /**
   * Callback fired when text input value changes.
   */
  onInputChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => void

  /**
   * A ref to the html `ul` element.
   */
  listRef?: (listElement: HTMLUListElement | null) => void

  /**
   * Enable/disable auto scroll to the highlighted option on every re-render
   */
  scrollToHighlightedOption?: boolean

  /**
   * Children of type `<Select.Option />` or `<Select.Group />`.
   */
  children?: React.ReactNode // TODO: ChildrenPropTypes.oneOf([Group, Option])
} & PropsFromSelectable &
  PropsFromTextInput &
  PropsFromPopover

// These props are directly passed to Selectable
// TODO: import these from Selectable once TS types can be imported
type PropsFromSelectable = {
  /**
   * Whether or not to show the options list.
   */
  isShowingOptions?: boolean

  /**
   * Callback fired requesting that the options list be shown.
   */
  onRequestShowOptions?: (event: React.SyntheticEvent) => void

  /**
   * Callback fired requesting that the options list be hidden.
   */
  onRequestHideOptions?: (event: React.SyntheticEvent) => void

  /**
   * Callback fired requesting a particular option be highlighted.
   */
  onRequestHighlightOption?: (
    event: React.SyntheticEvent,
    data: { id?: string; direction?: 1 | -1 }
  ) => void

  /**
   * Callback fired requesting a particular option be selected.
   */
  onRequestSelectOption?: (
    event: React.SyntheticEvent,
    data: { id?: string }
  ) => void
}

// These props are directly passed to TextInput
// TODO: import these from TextInput once TS types can be imported
type PropsFromTextInput = {
  /**
   * The form field label.
   */
  renderLabel: Renderable

  /**
   * The size of the text input.
   */
  size?: 'small' | 'medium' | 'large'

  /**
   * Html placeholder text to display when the input has no value. This should
   * be hint text, not a label replacement.
   */
  placeholder?: string

  /**
   * Whether or not the text input is required.
   */
  isRequired?: boolean

  /**
   * The width of the text input.
   */
  width?: string

  /**
   * The width of the input (integer value 0 or higher), if a width is not explicitly
   * provided via the `width` prop.
   *
   * Only applicable if `isInline={true}`.
   *
   * For more see https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/size
   */
  htmlSize?: number

  /**
   * Displays messages and validation for the input. It should be an object
   * with the following shape:
   * `{
   *   text: React.ReactNode,
   *   type: One of: ['newError', 'error', 'hint', 'success', 'screenreader-only']
   * }`
   */
  messages?: FormMessage[]

  /**
   * Callback fired when text input receives focus.
   */
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void

  /**
   * Callback fired when text input loses focus.
   */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void

  /**
   * A ref to the html `input` element.
   */
  inputRef?: (inputElement: HTMLInputElement | null) => void

  /**
   * Content to display before the text input. This will commonly be an icon or
   * tags to show multiple selections.
   */
  renderBeforeInput?: Renderable

  /**
   * Content to display after the text input. This content will replace the
   * default arrow icons.
   */
  renderAfterInput?: Renderable

  /**
   * Prevents the default behavior of wrapping the input and rendered content
   * when available space is exceeded.
   */
  shouldNotWrap?: boolean

  /**
   * In `stacked` mode the input is below the label.
   *
   * In `inline` mode the input is to the right/left (depending on text direction) of the label,
   * and the layout will look like `stacked` for small screens.
   */
  layout?: 'stacked' | 'inline'
}

// These props are directly passed to Popover
// TODO: import these from Popover once TS types can be imported
type PropsFromPopover = {
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
}

type PropKeys = keyof SelectOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type SelectProps = SelectOwnProps &
  WithStyleProps<SelectTheme, SelectStyle> &
  OtherHTMLAttributes<
    SelectOwnProps,
    InputHTMLAttributes<SelectOwnProps & Element>
  > &
  WithDeterministicIdProps

type SelectStyle = ComponentStyle<
  'select' | 'icon' | 'assistiveText' | 'popoverBorderWidth'
>

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
  'visibleOptionsCount',
  'isOptionContentAppliedToInput',
  'optionsMaxHeight',
  'optionsMaxWidth',
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
  'shouldNotWrap',
  'scrollToHighlightedOption',
  'layout'
]

export type { SelectProps, SelectOwnProps, SelectStyle }
export { allowedProps }
