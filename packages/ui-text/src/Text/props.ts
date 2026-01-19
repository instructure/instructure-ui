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
  TextTheme,
  OtherHTMLAttributes
} from '@instructure/shared-types'
import type { WithStyleProps, ComponentStyle } from '@instructure/emotion'

type TextOwnProps = {
  /**
   * the element type to render as
   */
  as?: AsElementType
  /**
   * Color of the text
   */
  color?:
    | 'primary'
    | 'secondary'
    | 'brand'
    | 'success'
    | 'danger'
    | 'warning'
    | 'primary-inverse'
    | 'secondary-inverse'
    | 'primary-on' // used on colored surfaces like warning, same color in dark and light themes
    | 'secondary-on' // used on colored surfaces like warning, same color in dark and light themes
    | 'ai-highlight'
  /**
   * Provides a reference to the underlying HTML element
   */
  elementRef?: (element: Element | null) => void
  fontStyle?: 'italic' | 'normal'
  letterSpacing?: 'normal' | 'condensed' | 'expanded'
  /**
   * Line height. Use `variant` if possible instead.
   * `lineHeight100`, `lineHeight125`, `lineHeight150` are deprecated
   */
  lineHeight?:
    | 'default'
    | 'fit'
    | 'condensed'
    | 'double'
    | 'lineHeight100'
    | 'lineHeight125'
    | 'lineHeight150'
  /**
   * Size of the text. Use `variant` if possible instead.
   * `descriptionPage`, `descriptionSection`, `content`, `contentSmall`,
   * `legend` are deprecated
   */
  size?:
    | 'x-small'
    | 'small'
    | 'medium'
    | 'large'
    | 'x-large'
    | 'xx-large'
    | 'descriptionPage'
    | 'descriptionSection'
    | 'content'
    | 'contentSmall'
    | 'legend'
  transform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase'
  /**
   * Sets multiple props at once. (size, fontStyle, lineHeight, weight)
   * If set, these props are not allowed.
   * NOTE: this is the recommended way of setting these values
   */
  variant?:
    | 'descriptionPage'
    | 'descriptionSection'
    | 'content'
    | 'contentImportant'
    | 'contentQuote'
    | 'contentSmall'
    | 'legend'
  /**
   * Weight of the text. Use `variant` if possible instead.
   * `weightRegular`, `weightImportant` are deprecated
   */
  weight?: 'normal' | 'light' | 'bold' | 'weightRegular' | 'weightImportant'
  wrap?: 'normal' | 'break-word'
  children?: React.ReactNode
}

type PropKeys = keyof TextOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type TextProps = TextOwnProps &
  WithStyleProps<TextTheme, TextStyle> &
  OtherHTMLAttributes<TextOwnProps>

type TextStyle = ComponentStyle<'text'>
const allowedProps: AllowedPropKeys = [
  'as',
  'children',
  'color',
  'elementRef',
  'fontStyle',
  'letterSpacing',
  'lineHeight',
  'size',
  'transform',
  'variant',
  'weight',
  'wrap'
]

export type { TextProps, TextStyle }
export { allowedProps }
