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

import type {
  PropValidators,
  MaskTheme,
  OtherHTMLAttributes
} from '@instructure/shared-types'
import type { WithStyleProps, ComponentStyle } from '@instructure/emotion'

type MaskOwnProps = {
  children?: React.ReactNode
  placement?: 'top' | 'center' | 'bottom' | 'stretch'
  fullscreen?: boolean
  onClick?: (event: React.MouseEvent<HTMLSpanElement>) => void
  /**
   * provides a reference to the underlying html root element
   */
  elementRef?: (element: Element | null) => void
}

type PropKeys = keyof MaskOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type MaskProps = MaskOwnProps &
  WithStyleProps<MaskTheme, MaskStyle> &
  OtherHTMLAttributes<MaskOwnProps>

type MaskStyle = ComponentStyle<'mask'>

const propTypes: PropValidators<PropKeys> = {
  placement: PropTypes.oneOf(['top', 'center', 'bottom', 'stretch']),
  fullscreen: PropTypes.bool,
  children: PropTypes.node,
  onClick: PropTypes.func,
  elementRef: PropTypes.func
}

const allowedProps: AllowedPropKeys = [
  'placement',
  'fullscreen',
  'children',
  'onClick',
  'elementRef'
]

export type { MaskProps, MaskStyle }
export { propTypes, allowedProps }
