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

import PropTypes from 'prop-types'

import { childrenOrValue } from '@instructure/ui-prop-types'
import { ThemeablePropTypes } from '@instructure/emotion'

import type {
  AsElementType,
  PropValidators,
  HeadingTheme,
  OtherHTMLAttributes
} from '@instructure/shared-types'
import type {
  Spacing,
  WithStyleProps,
  ComponentStyle
} from '@instructure/emotion'

type HeadingLevel<U extends keyof JSX.IntrinsicElements> = U

type HeadingOwnProps = {
  /**
   * The text content of the Heading
   */
  children?: React.ReactNode // TODO: childrenOrValue or is it even needed?
  /**
   * Add a top- or bottom-border to the Heading
   */
  border?: 'none' | 'top' | 'bottom'
  /**
   * The font color to render
   */
  color?:
    | 'primary'
    | 'secondary'
    | 'primary-inverse'
    | 'secondary-inverse'
    | 'inherit'
  /**
   * The *visual* appearance of the Heading: h1 is largest; h5 is smallest.
   */
  level?: HeadingLevel<'h1' | 'h2' | 'h3' | 'h4' | 'h5'> | 'reset'
  /**
   * Choose the element Heading should render as. Will default to the `level` prop
   * if not specified.
   */
  as?: AsElementType
  /**
   * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
   * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
   * familiar CSS-like shorthand. For example: `margin="small auto large"`.
   */
  margin?: Spacing
  /**
   * Provides a ref to the underlying HTML element
   */
  elementRef?: (element: Element | null) => void
}

type PropKeys = keyof HeadingOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type HeadingProps = HeadingOwnProps &
  WithStyleProps<HeadingTheme, HeadingStyle> &
  OtherHTMLAttributes<HeadingOwnProps>

type HeadingStyle = ComponentStyle<'heading'>

const propTypes: PropValidators<PropKeys> = {
  border: PropTypes.oneOf(['none', 'top', 'bottom']),
  children: childrenOrValue,
  color: PropTypes.oneOf([
    'primary',
    'secondary',
    'primary-inverse',
    'secondary-inverse',
    'inherit'
  ]),
  level: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'reset']),
  as: PropTypes.elementType, // eslint-disable-line react/require-default-props
  margin: ThemeablePropTypes.spacing,
  elementRef: PropTypes.func
}

const allowedProps: AllowedPropKeys = [
  'border',
  'children',
  'color',
  'level',
  'as',
  'margin',
  'elementRef'
]

export type { HeadingProps, HeadingStyle }
export { propTypes, allowedProps }
