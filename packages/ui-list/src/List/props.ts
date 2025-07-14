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
import { Children as ChildrenPropTypes } from '@instructure/ui-prop-types'

import { ListItem } from './ListItem'

import type {
  Spacing,
  WithStyleProps,
  ComponentStyle
} from '@instructure/emotion'
import type {
  ListTheme,
  OtherHTMLAttributes
} from '@instructure/shared-types'

type ListOwnProps = {
  /**
   * Only accepts `<List.Item>` as a child
   */
  children?: React.ReactNode // TODO: oneOf([ListItem])
  as?: 'ul' | 'ol'
  /**
   * One of: none, dashed, solid
   */
  delimiter?: 'none' | 'dashed' | 'solid'
  /**
   * When set, renders the List Items without a list style type.
   */
  isUnstyled?: boolean
  /**
   * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
   * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
   * familiar CSS-like shorthand. For example: `margin="small auto large"`.
   */
  margin?: Spacing
  size?: 'small' | 'medium' | 'large'
  /**
   * Sets the margin separating each ListItem.
   */
  itemSpacing?:
    | 'none'
    | 'xxx-small'
    | 'xx-small'
    | 'x-small'
    | 'small'
    | 'medium'
    | 'large'
    | 'x-large'
    | 'xx-large'
  /**
   * provides a reference to the underlying html root element
   */
  elementRef?: (element: Element | null) => void
}

type PropKeys = keyof ListOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type ListProps = ListOwnProps &
  WithStyleProps<ListTheme, ListStyle> &
  OtherHTMLAttributes<ListOwnProps>

type ListStyle = ComponentStyle<'list'>
const allowedProps: AllowedPropKeys = [
  'children',
  'as',
  'delimiter',
  'isUnstyled',
  'margin',
  'size',
  'itemSpacing',
  'elementRef'
]

export type { ListProps, ListStyle }
export { allowedProps }
