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

import { ReactNode } from 'react'
import PropTypes from 'prop-types'

import type { PropValidators, MetricTheme } from '@instructure/shared-types'
import type { WithStyleProps, ComponentStyle } from '@instructure/emotion'

type MetricOwnProps = {
  textAlign: 'start' | 'center' | 'end'
  renderLabel?: ((props?: any) => ReactNode) | ReactNode
  renderValue?: ((props?: any) => ReactNode) | ReactNode
  /**
   * Set to true when a child of MetricGroup so the appropriate
   * aria labels get set
   */
  isGroupChild: boolean
}

type PropKeys = keyof MetricOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type MetricProps = MetricOwnProps & WithStyleProps<MetricTheme, MetricStyle>

type MetricStyle = ComponentStyle<'metric' | 'label' | 'value'>

const propTypes: PropValidators<PropKeys> = {
  textAlign: PropTypes.oneOf(['start', 'center', 'end']),
  renderLabel: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  renderValue: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  isGroupChild: PropTypes.bool
}

const allowedProps: AllowedPropKeys = [
  'textAlign',
  'renderLabel',
  'renderValue',
  'isGroupChild'
]

export type { MetricProps, MetricStyle }
export { propTypes, allowedProps }
