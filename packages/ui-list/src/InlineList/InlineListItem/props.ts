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

import { PropsWithChildren } from 'react'
import PropTypes from 'prop-types'

import type {
  Spacing,
  WithStyleProps,
  ComponentStyle
} from '@instructure/emotion'
import type {
  PropValidators,
  InlineListItemTheme,
  OtherHTMLAttributes
} from '@instructure/shared-types'

type InlineListItemOwnProps = {
  /**
   * Inherits delimiter from the parent InlineList component
   */
  delimiter?: 'none' | 'pipe' | 'slash' | 'arrow'
  size?: 'small' | 'medium' | 'large'
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
   * Inherits itemSpacing from the parent InlineList component
   */
  spacing?:
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
} & PropsWithChildren<unknown> // <unknown> is needed for React 17 compatibility

type PropKeys = keyof InlineListItemOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type InlineListItemProps = InlineListItemOwnProps &
  WithStyleProps<InlineListItemTheme, InlineListItemStyle> &
  OtherHTMLAttributes<InlineListItemOwnProps>

type InlineListItemStyle = ComponentStyle<'inlineListItem' | 'delimiter'>

const propTypes: PropValidators<PropKeys> = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  delimiter: PropTypes.oneOf(['none', 'pipe', 'slash', 'arrow']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  margin: PropTypes.string,
  padding: PropTypes.string,
  spacing: PropTypes.oneOf([
    'none',
    'xxx-small',
    'xx-small',
    'x-small',
    'small',
    'medium',
    'large',
    'x-large',
    'xx-large'
  ]),
  elementRef: PropTypes.func
}

const allowedProps: AllowedPropKeys = [
  'children',
  'delimiter',
  'size',
  'margin',
  'padding',
  'spacing',
  'elementRef'
]

export type { InlineListItemProps, InlineListItemStyle }
export { propTypes, allowedProps }
