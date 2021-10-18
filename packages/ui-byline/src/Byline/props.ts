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
  BylineTheme,
  OtherHTMLAttributes
} from '@instructure/shared-types'

type BylineOwnProps = {
  /**
   * the Byline visual/object
   */
  children: React.ReactNode
  /**
   * the Byline title
   */
  title?: React.ReactNode
  /**
   * the Byline description
   */
  description?: string | React.ReactNode
  /**
   * how should the title and description align
   */
  alignContent?: 'top' | 'center'
  /**
   * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
   * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
   * familiar CSS-like shorthand. For example: `margin="small auto large"`.
   */
  margin?: Spacing
  /*
   * Determines the `max-width` of this element.
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * Provides a reference to the underlying html root element
   */
  elementRef?: (element: Element | null) => void
}

type PropKeys = keyof BylineOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type BylineProps = BylineOwnProps &
  WithStyleProps<BylineTheme, BylineStyle> &
  OtherHTMLAttributes<BylineOwnProps>

type BylineStyle = ComponentStyle<
  'byline' | 'figure' | 'caption' | 'title' | 'description' | 'maxWidth'
>

const propTypes: PropValidators<PropKeys> = {
  children: PropTypes.node.isRequired,
  title: PropTypes.node,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  alignContent: PropTypes.oneOf(['top', 'center']),
  margin: ThemeablePropTypes.spacing,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  elementRef: PropTypes.func
}

const allowedProps: AllowedPropKeys = [
  'alignContent',
  'children',
  'description',
  'elementRef',
  'margin',
  'size',
  'title'
]

export type { BylineProps, BylineStyle }
export { propTypes, allowedProps }
