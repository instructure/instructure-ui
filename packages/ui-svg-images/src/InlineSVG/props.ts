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
import { SVGAttributes } from 'react'
import PropTypes from 'prop-types'

import type {
  PropValidators,
  InlineSVGTheme,
  OtherHTMLAttributes
} from '@instructure/shared-types'
import type { WithStyleProps, ComponentStyle } from '@instructure/emotion'
import type { WithDeterministicIdProps } from '@instructure/ui-react-utils'

type InlineSVGOwnProps = {
  children?: React.ReactNode
  src?: string
  title?: string
  description?: string
  focusable?: boolean
  /**
   * Width of the SVG. Accepts valid CSS unit strings like '1rem'
   * To let the SVG expand to fill its container, use "`auto`"
   */
  width?: string | number
  /**
   * Height of the SVG. Accepts valid CSS unit strings like '1rem'
   * To let the SVG expand to fill its container, use "`auto`"
   */
  height?: string | number
  inline?: boolean
  color?:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'primary-inverse'
    | 'secondary-inverse'
    | 'success'
    | 'error'
    | 'alert'
    | 'warning'
    | 'brand'
    | 'auto'
  /**
   * provides a reference to the underlying html root element
   */
  elementRef?: (element: Element | null) => void
}

type PropKeys = keyof InlineSVGOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type InlineSVGProps = InlineSVGOwnProps &
  WithStyleProps<InlineSVGTheme, InlineSVGStyle> &
  OtherHTMLAttributes<InlineSVGOwnProps, SVGAttributes<InlineSVGOwnProps>> &
  WithDeterministicIdProps

type InlineSVGStyle = ComponentStyle<'inlineSVG'>

const propTypes: PropValidators<PropKeys> = {
  children: PropTypes.node,
  src: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  focusable: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  inline: PropTypes.bool,
  color: PropTypes.oneOf([
    'inherit',
    'primary',
    'secondary',
    'primary-inverse',
    'secondary-inverse',
    'success',
    'error',
    'alert',
    'warning',
    'brand',
    'auto'
  ]),
  elementRef: PropTypes.func
}

const allowedProps: AllowedPropKeys = [
  'children',
  'src',
  'title',
  'description',
  'focusable',
  'width',
  'height',
  'inline',
  'color',
  'elementRef'
]

export type { InlineSVGProps, InlineSVGOwnProps, InlineSVGStyle }
export { propTypes, allowedProps }
