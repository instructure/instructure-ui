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

import { controllable } from '@instructure/ui-prop-types'

import {
  AsElementType,
  OtherHTMLAttributes,
  PropValidators
} from '@instructure/shared-types'

type ToggleGroupOwnProps = {
  /**
   * the content to show and hide
   */
  children: React.ReactNode
  /**
   * the content area next to the toggle button
   */
  summary: React.ReactNode
  /**
   * provides a screenreader label for the toggle button
   * (takes `expanded` as an argument if a function)
   */
  toggleLabel: React.ReactNode | ((...args: any[]) => any)
  /**
   * the element type to render as
   */
  as?: AsElementType
  /**
   * provides a reference to the underlying html root element
   */
  elementRef?: (element: Element | null) => void
  size?: 'small' | 'medium' | 'large'
  /**
   * Whether the content is expanded or hidden
   */
  expanded?: boolean // TODO: controllable(PropTypes.bool, 'onToggle', 'defaultExpanded')
  /**
   * Whether the content is initially expanded or hidden (uncontrolled)
   */
  defaultExpanded?: boolean
  /**
   * Fired when the content display is toggled
   */
  onToggle?: (event: React.MouseEvent, expanded: boolean) => void
  /**
   * The icon displayed in the toggle button when the content is hidden
   */
  icon?: React.ReactNode | ((...args: any[]) => React.ReactElement)
  /**
   * The icon displayed in the toggle button when the content is showing
   */
  iconExpanded?: React.ReactNode | ((...args: any[]) => React.ReactElement)
  /**
   * Transition content into view
   */
  transition?: boolean
  /**
   * Toggle the border around the component
   */
  border?: boolean
}

type PropKeys = keyof ToggleGroupOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type ToggleGroupProps = ToggleGroupOwnProps &
  OtherHTMLAttributes<ToggleGroupOwnProps>

const propTypes: PropValidators<PropKeys> = {
  children: PropTypes.node.isRequired,
  summary: PropTypes.node.isRequired,
  toggleLabel: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  as: PropTypes.elementType,
  elementRef: PropTypes.func,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  expanded: controllable(PropTypes.bool, 'onToggle', 'defaultExpanded'),
  defaultExpanded: PropTypes.bool,
  onToggle: PropTypes.func,
  icon: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  iconExpanded: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  transition: PropTypes.bool,
  border: PropTypes.bool
}

const allowedProps: AllowedPropKeys = [
  'children',
  'summary',
  'toggleLabel',
  'as',
  'elementRef',
  'size',
  'expanded',
  'defaultExpanded',
  'onToggle',
  'icon',
  'iconExpanded',
  'transition',
  'border'
]

export type { ToggleGroupProps }
export { propTypes, allowedProps }
