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

import { ThemeablePropTypes } from '@instructure/emotion'

import type {
  AsElementType,
  PropValidators,
  FlexTheme
} from '@instructure/shared-types'
import type {
  Spacing,
  WithStyleProps,
  ComponentStyle
} from '@instructure/emotion'

type FlexOwnProps = {
  children?: React.ReactNode | ((...args: any[]) => React.ReactNode)
  as?: AsElementType
  elementRef?: (element: Element | null) => void
  height?: string | number
  width?: string | number
  margin?: Spacing
  padding?: Spacing
  display?: 'flex' | 'inline-flex'
  textAlign?: 'start' | 'center' | 'end'
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse'
  alignItems?: 'center' | 'start' | 'end' | 'stretch'
  justifyItems?: 'center' | 'start' | 'end' | 'space-around' | 'space-between'
  wrap?: 'wrap' | 'no-wrap' | 'wrap-reverse'
  withVisualDebug?: boolean
}

type PropKeys = keyof FlexOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type FlexProps = FlexOwnProps & WithStyleProps<FlexTheme, FlexStyle>

type FlexStyle = ComponentStyle<'flex'>

const propTypes: PropValidators<PropKeys> = {
  /**
   * It's recommended that you use `Flex.Item` for children, but you can also pass any markup or a function
   * returning markup. Note that if you do not use `Flex.Item`, the `withVisualDebug` and `direction` props
   * will not automatically be set on the children.
   */
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  /**
   * the element type to render as
   */
  as: PropTypes.elementType,
  /**
   * provides a reference to the underlying html root element
   */
  elementRef: PropTypes.func,
  /**
   * Sets the height of the component's container (optional)
   */
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * Sets the width of the component's container (optional)
   */
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
   * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
   * familiar CSS-like shorthand. For example: `margin="small auto large"`.
   */
  margin: ThemeablePropTypes.spacing,
  /**
   * Valid values are `0`, `none`, `xxx-small`, `xx-small`, `x-small`,
   * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
   * familiar CSS-like shorthand. For example: `padding="small x-large large"`.
   */
  padding: ThemeablePropTypes.spacing,
  /**
   * Sets the CSS display rule for the component's container
   */
  display: PropTypes.oneOf(['flex', 'inline-flex']),
  /**
   * Designates the text alignment
   */
  textAlign: PropTypes.oneOf(['start', 'center', 'end']),
  /**
   * Sets the flex-direction to row (horizontal) or column (vertical)
   */
  direction: PropTypes.oneOf([
    'row',
    'column',
    'row-reverse',
    'column-reverse'
  ]),
  /**
   * Aligns Flex.Items on the vertical axis (horizontal if direction is column)
   */
  alignItems: PropTypes.oneOf(['center', 'start', 'end', 'stretch']),
  /**
   * Aligns Flex.Items on the horizontal axis (vertical if direction is column)
   */
  justifyItems: PropTypes.oneOf([
    'center',
    'start',
    'end',
    'space-around',
    'space-between'
  ]),
  /**
   * Determines if the Flex.Items should wrap when they exceed their container's width
   */
  wrap: PropTypes.oneOf(['wrap', 'no-wrap', 'wrap-reverse']),
  /**
   * Activate a dotted outline around the component to make building your
   * layout easier
   */
  withVisualDebug: PropTypes.bool
}

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
export { propTypes, allowedProps }
