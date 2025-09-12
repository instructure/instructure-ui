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
import type {
  AsElementType,
  OtherHTMLAttributes
} from '@instructure/shared-types'
import type {
  Spacing,
  WithStyleProps,
  ComponentStyle
} from '@instructure/emotion'

type FlexItemOwnProps = {
  /**
   * The children to render inside the Item
   */
  children?: React.ReactNode

  /**
   * the element type to render as
   */
  as?: AsElementType

  /**
   * provides a reference to the underlying html root element
   */
  elementRef?: (element: Element | null) => void

  /**
   * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
   * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
   * familiar CSS-like shorthand. For example: `margin="small auto large"`.
   */
  margin?: Spacing

  /**
   * Valid values are `0`, `none`, `xxx-small`, `xx-small`, `x-small`,
   * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
   * familiar CSS-like shorthand. For example: `padding="small x-large large"`.
   */
  padding?: Spacing

  /**
   * overrides the parent Flex's alignItems prop, if needed
   */
  align?: 'center' | 'start' | 'end' | 'stretch'

  /**
   * Inherits from the parent Flex component
   */
  direction?: 'row' | 'column'

  /**
   * Designates the text alignment inside the Item
   */
  textAlign?: 'start' | 'center' | 'end'

  /**
   * Handles horizontal overflow
   */
  overflowX?: 'auto' | 'hidden' | 'visible'

  /**
   * Handles vertical overflow
   */
  overflowY?: 'auto' | 'hidden' | 'visible'

  /**
   * Should the FlexItem grow to fill any available space?
   */
  shouldGrow?: boolean

  /**
   * Should the FlexItem shrink (stopping at its `size`)?
   */
  shouldShrink?: boolean

  /**
   * Sets the base size of the FlexItem (width if direction is `row`; height if direction is `column`)
   */
  size?: string

  /**
   * Places dashed lines around the component's borders to help debug your layout
   */
  withVisualDebug?: boolean
  /**
   * Specifies the order of the `Flex.Item` inside the `Flex` component.
   *
   * Utilizes the order flex CSS property.
   */
  order?: number
}

type PropKeys = keyof FlexItemOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type FlexItemProps = FlexItemOwnProps &
  WithStyleProps<null, FlexItemStyle> &
  OtherHTMLAttributes<FlexItemOwnProps>

type FlexItemStyle = ComponentStyle<'flexItem'>
const allowedProps: AllowedPropKeys = [
  'children',
  'as',
  'elementRef',
  'margin',
  'padding',
  'align',
  'direction',
  'textAlign',
  'overflowX',
  'overflowY',
  'shouldGrow',
  'shouldShrink',
  'size',
  'withVisualDebug',
  'order'
]

export type { FlexItemProps, FlexItemStyle }
export { allowedProps }
