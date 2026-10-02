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
  OtherHTMLAttributes
} from '@instructure/shared-types'
import type {
  ComponentStyle,
  NewThemeOverrideProp,
  Spacing
} from '@instructure/emotion'
import type { FormMessage } from '../../utils/v1/FormPropTypes'
import type { WithDeterministicIdProps } from '@instructure/ui-react-utils'
import type { NewComponentTypes } from '@instructure/ui-themes'

type FormFieldLayoutChildrenParams = {
  /**
   * The id of the rendered messages, or `undefined` when no messages are
   * shown. Add it to the control's `aria-describedby`.
   */
  describedBy?: string
}

type FormFieldLayoutChildren =
  | React.ReactNode
  | ((params: FormFieldLayoutChildrenParams) => React.ReactNode)

type FormFieldLayoutOwnProps = {
  /**
   * The label text. Will be appended by a `*` if this field is required.
   */
  label: React.ReactNode
  /**
   * The id of the form control (=the child of this component). It's applied as the
   * [for](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/for)
   * attribute of the label, so the control needs to have the same `id`.
   * Not used when rendering as a `fieldset` (group)
   */
  id: string
  /**
   * The element type to render as, `div` be default.
   *
   * Also determines how the `label` will be rendered:
   * If its value is `fieldset` (for form groups), it be rendered in a
   * [legend](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/legend),
   * for all other cases it will be in a
   * [label](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/label).
   */
  as?: AsElementType
  /**
   * Array of objects with shape: `{
   *   text: React.ReactNode,
   *   type: One of: ['newError', 'error', 'hint', 'success', 'screenreader-only']
   * }`
   */
  messages?: FormMessage[]
  /**
   * id for the form field messages
   */
  messagesId?: string
  /**
   * `id` for the label/legend element. Useful when the control is not a
   * [labelable](https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Content_categories#labelable)
   * element (e.g. a custom widget), and needs to reference the label via
   * `aria-labelledby`.
   */
  labelId?: string
  /**
   * The form control(s). Can be a function that receives
   * `{ describedBy }`, so the control can reference the messages via
   * `aria-describedby`.
   */
  children?: FormFieldLayoutChildren
  /**
   * If `true` use an inline layout -- content will flow on the left/right side
   * of this component
   */
  inline?: boolean
  /**
   * In `stacked` mode the container is below the label, in `inline` mode the
   * container is to the right/left (depending on text direction)
   */
  layout?: 'stacked' | 'inline'
  /**
   * The horizontal alignment of the label. Only works in `inline` layout
   */
  labelAlign?: 'start' | 'end'
  /**
   * The vertical alignment of the label and the controls.
   * "top" by default
   */
  vAlign?: 'top' | 'middle' | 'bottom'
  width?: string
  /**
   * Provides a reference to the container that holds the input element
   * @param element The element that holds the input control as its children
   */
  inputContainerRef?: (element: HTMLElement | null) => void
  /**
   * provides a reference to the underlying html root element
   */
  elementRef?: (element: Element | null) => void
  isGroup?: boolean
  /**
   * If `true`, displays an asterisk after the label to indicate the field is required
   */
  isRequired?: boolean

  /**
   * Valid values are `0`, `none`, `auto`, and Spacing token values,
   * see https://instructure.design/layout-spacing. Apply these values via
   * familiar CSS-like shorthand. For example, `margin="general.spaceMd auto"`.
   */
  margin?: Spacing
  /**
   * Whether the field is disabled. When true, error and success messages will be hidden.
   */
  disabled?: boolean
  /**
   * Whether the field is read-only. When true, error and success messages will be hidden.
   */
  readOnly?: boolean
}

type PropKeys = keyof FormFieldLayoutOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type FormFieldLayoutProps = FormFieldLayoutOwnProps &
  NewThemeOverrideProp<ReturnType<NewComponentTypes['FormFieldLayout']>> &
  OtherHTMLAttributes<FormFieldLayoutOwnProps> &
  WithDeterministicIdProps

type FormFieldLayoutStyle = ComponentStyle<
  | 'formFieldLayout'
  | 'formFieldLabel'
  | 'formFieldChildren'
  | 'requiredAsterisk'
>
const allowedProps: AllowedPropKeys = [
  'label',
  'id',
  'as',
  'messages',
  'messagesId',
  'labelId',
  'children',
  'inline',
  'layout',
  'labelAlign',
  'width',
  'inputContainerRef',
  'elementRef',
  'margin',
  'vAlign',
  'isRequired',
  'disabled',
  'readOnly'
]

type FormFieldStyleProps = {
  hasMessages: boolean
  hasVisibleMessage: boolean
  hasVisibleLabel: boolean
  isGroup: boolean
}

export type {
  FormFieldLayoutChildren,
  FormFieldLayoutChildrenParams,
  FormFieldStyleProps,
  FormFieldLayoutProps,
  FormFieldLayoutStyle,
  FormFieldLayoutOwnProps
}
export { allowedProps }
