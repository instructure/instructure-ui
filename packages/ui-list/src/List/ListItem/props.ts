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

import { ThemeablePropTypes } from '@instructure/emotion'

import type {
  Spacing,
  WithStyleProps,
  ComponentStyle
} from '@instructure/emotion'
import type {
  PropValidators,
  ListItemTheme,
  OtherHTMLAttributes
} from '@instructure/shared-types'

type ListItemOwnProps = {
  children: React.ReactNode | ((...args: any[]) => React.ReactNode)
  delimiter?: 'none' | 'dashed' | 'solid'
  size?: 'small' | 'medium' | 'large'
  margin?: Spacing
  padding?: Spacing
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
  elementRef?: (element: Element | null) => void
}

type PropKeys = keyof ListItemOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type ListItemProps = ListItemOwnProps &
  WithStyleProps<ListItemTheme, ListItemStyle> &
  OtherHTMLAttributes<ListItemOwnProps>

type ListItemStyle = ComponentStyle<'listItem'>

const propTypes: PropValidators<PropKeys> = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  /**
   * Inherits delimiter from the parent List component.
   */
  delimiter: PropTypes.oneOf(['none', 'dashed', 'solid']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
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
   * Inherits itemSpacing from the parent List component
   */
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
  /**
   * provides a reference to the underlying html root element
   */
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

export type { ListItemProps, ListItemStyle }
export { propTypes, allowedProps }
