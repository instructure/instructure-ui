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
import type {
  Spacing,
  WithStyleProps,
  ComponentStyle
} from '@instructure/emotion'
import type {
  OtherHTMLAttributes,
  TabsPanelTheme
} from '@instructure/shared-types'

type TabsPanelOwnProps = {
  /**
   * The content that will be rendered in the corresponding <Tab /> and will label
   * this `<Tabs.Panel />` for screen readers
   */
  renderTitle: React.ReactNode | (() => React.ReactNode)
  children?: React.ReactNode
  variant?: 'default' | 'secondary'
  isSelected?: boolean
  isDisabled?: boolean
  maxHeight?: string | number
  minHeight?: string | number
  id?: string
  labelledBy?: string
  padding?: Spacing
  textAlign?: 'start' | 'center' | 'end'
  /**
   * provides a reference to the underlying html root element
   */
  elementRef?: (element: HTMLDivElement | null) => void
  /**
   * Only one `<Tabs.Panel />` can be marked as active. The marked panel's content is rendered
   * for all the `<Tabs.Panel />`s.
   */
  active?: boolean
  /**
   * When set to false, the tabPanel only will be hidden, but not dismounted when not active
   */
  unmountOnExit?: boolean
  /**
   * The tabIndex of the tabpanel element. Set to 0 for text-only panels to make them
   * accessible to keyboard and screen reader users.
   */
  tabIndex?: number
}

type PropKeys = keyof TabsPanelOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type TabsPanelProps = TabsPanelOwnProps &
  WithStyleProps<TabsPanelTheme, TabsPanelStyle> &
  OtherHTMLAttributes<TabsPanelOwnProps>

type TabsPanelStyle = ComponentStyle<'panel' | 'content'>
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
  'elementRef',
  'active',
  'unmountOnExit',
  'tabIndex'
]

export type { TabsPanelProps, TabsPanelStyle }
export { allowedProps }
