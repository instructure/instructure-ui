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
  
  OptionsItemTheme,
  OtherHTMLAttributes,
  Renderable
} from '@instructure/shared-types'
import type { WithDeterministicIdProps } from '@instructure/ui-react-utils'
import type { WithStyleProps, ComponentStyle } from '@instructure/emotion'

type OptionsItemRenderProps = {
  children?: Renderable
  /**
   * Element type to render as. Will be set to `<a>` if href is provided.
   */
  as?: AsElementType
  /**
   * The style variant of the item
   */
  variant?:
    | 'default'
    | 'highlighted'
    | 'selected'
    | 'disabled'
    | 'highlighted-disabled'
    | 'selected-highlighted'
  /**
   * The ARIA role of the element
   */
  role?: string
}

type OptionsItemOwnProps = OptionsItemRenderProps & {
  /**
   * Content to render before the label
   * (if you pass a function, it has the `props` as its parameter)
   */
  renderBeforeLabel?: Renderable<OptionsItemRenderProps>
  /**
   * Content to render after the label
   * (if you pass a function, it has the `props` as its parameter)
   */
  renderAfterLabel?: Renderable<OptionsItemRenderProps>
  /**
   * Sets the vAlign of renderBeforeLabel content
   */
  beforeLabelContentVAlign?: 'start' | 'center' | 'end'
  /**
   * Sets the vAlign of renderAfterLabel content
   */
  afterLabelContentVAlign?: 'start' | 'center' | 'end'
  /**
   * Additional "secondary" description text
   */
  description?: Renderable
  /**
   * The ARIA role of the description element
   */
  descriptionRole?: string
  /**
   * Providing href will render the option as `<a>`.
   */
  href?: string
  /**
   * Sometimes VoiceOver doesn't announce the role of the highlighted item. This prop forces the role to be on the outer element and should only be used when such an issue arises.
   */
  voiceoverRoleBugWorkaround?: boolean
  /**
   * provides a reference to the underlying html root element
   */
  elementRef?: (element: Element | null) => void
  /**
   * Whether or not this option is selected
   */
  isSelected?: boolean
}

type PropKeys = keyof OptionsItemOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type OptionsItemProps = OptionsItemOwnProps &
  WithStyleProps<OptionsItemTheme, OptionsItemStyle> &
  WithDeterministicIdProps &
  OtherHTMLAttributes<OptionsItemOwnProps>

type OptionsItemStyle = ComponentStyle<
  | 'item'
  | 'container'
  | 'content'
  | 'contentBefore'
  | 'contentAfter'
  | 'description'
>
const allowedProps: AllowedPropKeys = [
  'as',
  'variant',
  'role',
  'renderBeforeLabel',
  'renderAfterLabel',
  'beforeLabelContentVAlign',
  'afterLabelContentVAlign',
  'description',
  'descriptionRole',
  'voiceoverRoleBugWorkaround',
  'href',
  'elementRef',
  'children',
  'isSelected'
]

export type { OptionsItemProps, OptionsItemStyle, OptionsItemRenderProps }
export { allowedProps }
