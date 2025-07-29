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
import type { ViewProps } from '@instructure/ui-view'
import type {
  Spacing,
  WithStyleProps,
  ComponentStyle
} from '@instructure/emotion'
import type {
  OtherHTMLAttributes,
  
  TagTheme
} from '@instructure/shared-types'

type TagOwnProps = {
  className?: string
  text: string | React.ReactNode
  /**
   * @deprecated since version 10
   * Use of the title attribute is highly problematic due to accessibility concerns
   */
  title?: string
  /**
   * Whether or not to disable the tag
   */
  disabled?: boolean
  /**
   * Works just like disabled but keeps the same styles as if it were active
   */
  readOnly?: boolean
  dismissible?: boolean
  /**
   * Valid values are `0`, `none`, `auto`, `xxxx-small`, `xx-small`, `x-small`,
   * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
   * familiar CSS-like shorthand. For example: `margin="small auto large"`.
   */
  margin?: Spacing
  /**
   * If you add an onClick prop, Tag renders as a clickable button
   */
  onClick?: (event: React.MouseEvent<ViewProps & Element>) => void
  /**
   * Provides a reference to the underlying html root element
   */
  elementRef?: (element: Element | null) => void
  size?: 'small' | 'medium' | 'large'
  variant?: 'default' | 'inline'
}

type PropKeys = keyof TagOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type TagProps = TagOwnProps &
  WithStyleProps<TagTheme, TagStyle> &
  OtherHTMLAttributes<TagOwnProps>

type TagStyle = ComponentStyle<'tag' | 'text' | 'icon'>
const allowedProps: AllowedPropKeys = [
  'className',
  'text',
  'title',
  'disabled',
  'readOnly',
  'dismissible',
  'margin',
  'onClick',
  'elementRef',
  'size',
  'variant'
]

export type { TagProps, TagStyle }
export { allowedProps }
