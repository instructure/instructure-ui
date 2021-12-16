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
import PropTypes from 'prop-types'

import { deprecated } from '@instructure/ui-react-utils'

import type {
  PropValidators,
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
   *
   * __Deprecated__: The `warning` color variant will be removed in version 9.0.0, because it doesn't have sufficient color contrast with the background (4.5:1) required for text.
   */
  color?:
    | 'primary'
    | 'secondary'
    | 'brand'
    | 'success'
    | 'danger'
    | 'alert'
    | 'primary-inverse'
    | 'secondary-inverse'
    | 'warning' // TODO: 'warning' is deprecated, remove in v9.
  /**
   * Provides a reference to the underlying HTML element
   */
  elementRef?: (element: Element | null) => void
  fontStyle?: 'italic' | 'normal'
  letterSpacing?: 'normal' | 'condensed' | 'expanded'
  lineHeight?: 'default' | 'fit' | 'condensed' | 'double'
  size?: 'x-small' | 'small' | 'medium' | 'large' | 'x-large' | 'xx-large'
  transform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase'
  weight?: 'normal' | 'light' | 'bold'
  wrap?: 'normal' | 'break-word'
  children?: React.ReactNode
}

type PropKeys = keyof TextOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type TextProps = TextOwnProps &
  WithStyleProps<TextTheme, TextStyle> &
  OtherHTMLAttributes<TextOwnProps>

type TextStyle = ComponentStyle<'text'>

const propTypes: PropValidators<PropKeys> = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  color: deprecated.deprecatePropValues(
    PropTypes.oneOf([
      'primary',
      'secondary',
      'brand',
      'success',
      'warning',
      'danger',
      'alert',
      'primary-inverse',
      'secondary-inverse'
    ]),
    ['warning'],
    "The `warning` color variant will be removed in version 9.0.0, because it doesn't have sufficient color contrast with the background (4.5:1) required for text."
  ),
  elementRef: PropTypes.func,
  fontStyle: PropTypes.oneOf(['italic', 'normal']),
  letterSpacing: PropTypes.oneOf(['normal', 'condensed', 'expanded']),
  lineHeight: PropTypes.oneOf(['default', 'fit', 'condensed', 'double']),
  size: PropTypes.oneOf([
    'x-small',
    'small',
    'medium',
    'large',
    'x-large',
    'xx-large'
  ]),
  transform: PropTypes.oneOf(['none', 'capitalize', 'uppercase', 'lowercase']),
  weight: PropTypes.oneOf(['normal', 'light', 'bold']),
  wrap: PropTypes.oneOf(['normal', 'break-word'])
}

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
  'weight',
  'wrap'
]

export type { TextProps, TextStyle }
export { propTypes, allowedProps }
