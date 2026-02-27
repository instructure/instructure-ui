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
  OtherHTMLAttributes,
  ToggleDetailsTheme
} from '@instructure/shared-types'
import type { WithStyleProps, ComponentStyle } from '@instructure/emotion'
import type { ViewProps } from '@instructure/ui-view'

type ToggleDetailsOwnProps = {
  variant?: 'default' | 'filled'
  /**
   * The summary that displays and can be interacted with
   */
  summary: React.ReactNode
  /**
   * Whether the content is expanded or hidden
   */
  expanded?: boolean // TODO: controllable(PropTypes.bool, 'onToggle', 'defaultExpanded')
  /**
   * Whether the content is initially expanded or hidden (uncontrolled)
   */
  defaultExpanded?: boolean
  onToggle?: (
    event: React.KeyboardEvent<ViewProps> | React.MouseEvent<ViewProps>,
    expanded: boolean
  ) => void
  /**
   * The icon to display next to the summary text when content is hidden
   */
  icon?: (...args: any[]) => React.ReactElement
  /**
   * The icon to display when content is expanded
   */
  iconExpanded?: (...args: any[]) => React.ReactElement
  /**
   * Icon position at the start or end of the summary text
   */
  iconPosition?: 'start' | 'end'
  /**
   * should the summary fill the width of its container
   */
  fluidWidth?: boolean
  /**
   * Choose a size for the expand/collapse icon
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * The toggleable content passed inside the ToggleDetails component
   */
  children?: React.ReactNode
}

type PropKeys = keyof ToggleDetailsOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type ToggleDetailsProps = ToggleDetailsOwnProps &
  WithStyleProps<ToggleDetailsTheme, ToggleDetailsStyle> &
  OtherHTMLAttributes<ToggleDetailsOwnProps>

type ToggleDetailsStyle = ComponentStyle<
  | 'toggleDetails'
  | 'summary'
  | 'summaryText'
  | 'toggle'
  | 'icon'
  | 'details'
  | 'content'
>

type ToggleDetailsStyleProps = {
  animate: boolean
}
const allowedProps: AllowedPropKeys = [
  'variant',
  'summary',
  'expanded',
  'defaultExpanded',
  'onToggle',
  'icon',
  'iconExpanded',
  'iconPosition',
  'fluidWidth',
  'children',
  'size'
]

export type { ToggleDetailsProps, ToggleDetailsStyleProps, ToggleDetailsStyle }
export { allowedProps }
