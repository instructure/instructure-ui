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
import type { PropValidators, TabsPanelTheme } from '@instructure/shared-types'

type TabsPanelOwnProps = {
  renderTitle: React.ReactNode | ((...args: any[]) => any)
  variant?: 'default' | 'secondary'
  isSelected?: boolean
  isDisabled?: boolean
  maxHeight?: string | number
  minHeight?: string | number
  id?: string
  labelledBy?: string
  padding?: Spacing
  textAlign?: 'start' | 'center' | 'end'
  elementRef?: (...args: any[]) => any
  children?: React.ReactNode
}

type PropKeys = keyof TabsPanelOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type TabsPanelProps = TabsPanelOwnProps &
  WithStyleProps<TabsPanelTheme, TabsPanelStyle>

type TabsPanelStyle = ComponentStyle<'panel' | 'content'>

const propTypes: PropValidators<PropKeys> = {
  /**
   * The content that will be rendered in the corresponding <Tab /> and will label
   * this `<Tabs.Panel />` for screen readers
   */
  renderTitle: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  children: PropTypes.node,
  variant: PropTypes.oneOf(['default', 'secondary']),
  isSelected: PropTypes.bool,
  isDisabled: PropTypes.bool,
  maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  minHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  id: PropTypes.string,
  labelledBy: PropTypes.string,
  padding: ThemeablePropTypes.spacing,
  textAlign: PropTypes.oneOf(['start', 'center', 'end']),
  elementRef: PropTypes.func
}

const allowedProps: AllowedPropKeys = [
  'renderTitle',
  'children',
  'variant',
  'isSelected',
  'isDisabled',
  'maxHeight',
  'minHeight',
  'id',
  'labelledBy',
  'padding',
  'textAlign',
  'elementRef'
]

export type { TabsPanelProps, TabsPanelStyle }
export { propTypes, allowedProps }
