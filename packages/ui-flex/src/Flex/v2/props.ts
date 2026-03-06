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
  FlexTheme,
  OtherHTMLAttributes,
  Renderable
} from '@instructure/shared-types'
import type {
  Spacing,
  WithStyleProps,
  ComponentStyle
} from '@instructure/emotion'

type FlexOwnProps = {
  /**
   * It's recommended that you use `Flex.Item` for children, but you can also
   * pass any markup or a function returning markup.
   *
   * Note that if you do not use `Flex.Item`, the `withVisualDebug` and
   * `direction` props will not automatically be set on the children.
   */
  children?: Renderable

  /**
   * the element type to render as
   */
  as?: AsElementType

  /**
   * provides a reference to the underlying html root element
   */
  elementRef?: (element: Element | null) => void

  /**
   * Sets the height of the component's container (optional)
   */
  height?: string | number

  /**
   * Sets the width of the component's container (optional)
   */
  width?: string | number

  /**
   * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
   * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
   * familiar CSS-like shorthand. For example: `margin="small auto large"`.
   */
  margin?: Spacing

  /**
   * Valid values are `0`, `none`, `auto`, and Spacing token values,
   * see https://instructure.design/layout-spacing. Apply these values via
   * familiar CSS-like shorthand. For example, `gap="small auto large"`.
   */
  gap?: Spacing

  /**
   * Valid values are `0`, `none`, `xxx-small`, `xx-small`, `x-small`,
   * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
   * familiar CSS-like shorthand. For example: `padding="small x-large large"`.
   */
  padding?: Spacing

  /**
   * Sets the CSS display rule for the component's container
   */
  display?: 'flex' | 'inline-flex'

  /**
   * Designates the text alignment
   */
  textAlign?: 'start' | 'center' | 'end'

  /**
   * Sets the flex-direction to row (horizontal) or column (vertical)
   */
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse'

  /**
   * Aligns Flex.Items on the vertical axis (horizontal if direction is column)
   */
  alignItems?: 'center' | 'start' | 'end' | 'stretch'

  /**
   * Aligns Flex.Items on the horizontal axis (vertical if direction is column)
   */
  justifyItems?: 'center' | 'start' | 'end' | 'space-around' | 'space-between'

  /**
   * Determines if the Flex.Items should wrap when they exceed their container's width
   */
  wrap?: 'wrap' | 'no-wrap' | 'wrap-reverse'

  /**
   * Activate a dotted outline around the component to make building your
   * layout easier
   */
  withVisualDebug?: boolean
}

type PropKeys = keyof FlexOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type FlexProps = FlexOwnProps &
  WithStyleProps<FlexTheme, FlexStyle> &
  OtherHTMLAttributes<FlexOwnProps>

type FlexStyle = ComponentStyle<'flex'>
const allowedProps: AllowedPropKeys = [
  'children',
  'as',
  'elementRef',
  'height',
  'width',
  'margin',
  'padding',
  'display',
  'textAlign',
  'direction',
  'alignItems',
  'justifyItems',
  'wrap',
  'withVisualDebug'
]

export type { FlexProps, FlexStyle }
export { allowedProps }
