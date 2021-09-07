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

import type { Spacing, WithStyleProps } from '@instructure/emotion'
import type { PropValidators, AsElementType } from '@instructure/shared-types'

type PillOwnProps = {
  as?: AsElementType
  color?: 'primary' | 'success' | 'danger' | 'info' | 'warning' | 'alert'
  elementRef?: (...args: any[]) => any
  margin?: Spacing
  children: React.ReactNode
}
type PropKeys = keyof PillOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type PillProps = PillOwnProps & WithStyleProps

const propTypes: PropValidators<PropKeys> = {
  as: PropTypes.elementType, // eslint-disable-line react/require-default-props
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf([
    'primary',
    'success',
    'danger',
    'info',
    'warning',
    'alert'
  ]),
  elementRef: PropTypes.func,
  /**
   * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
   * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
   * familiar CSS-like shorthand. For example: `margin="small auto large"`.
   */
  margin: ThemeablePropTypes.spacing
}

const allowedProps: AllowedPropKeys = [
  'as',
  'children',
  'color',
  'elementRef',
  'margin'
]

export type { PillProps }
export { propTypes, allowedProps }
