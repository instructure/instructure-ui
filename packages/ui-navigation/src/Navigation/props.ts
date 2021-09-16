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

import {
  controllable,
  Children as ChildrenPropTypes
} from '@instructure/ui-prop-types'

import { NavigationItem } from './NavigationItem'

import type { PropValidators, NavigationTheme } from '@instructure/shared-types'
import type { WithStyleProps, ComponentStyle } from '@instructure/emotion'

type NavigationOwnProps = {
  minimized?: any // TODO: controllable(PropTypes.bool, 'onMinimized', 'defaultMinimized')
  defaultMinimized?: boolean
  onMinimized?: (...args: any[]) => any
  label: string
  toggleLabel: {
    expandedLabel?: string
    minimizedLabel?: string
  }
  href?: string
  onClick?: (...args: any[]) => any
  children?: React.ReactNode
}

type NavigationState = {
  minimized: boolean
}

type PropKeys = keyof NavigationOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type NavigationProps = NavigationOwnProps &
  WithStyleProps<NavigationTheme, NavigationStyle>

type NavigationStyle = ComponentStyle<
  'navigation' | 'list' | 'content' | 'toggle' | 'toggleIcon'
>

const propTypes: PropValidators<PropKeys> = {
  /**
   * children of type Navigation.Item
   */
  children: ChildrenPropTypes.oneOf([NavigationItem]),
  /**
   * When minimized is set to true, the `<Navigation />` shows icons only while the text becomes a tooltip. When it is set to false, the `<Navigation />` shows text in addition to the icons
   */
  minimized: controllable(PropTypes.bool, 'onMinimized', 'defaultMinimized'),
  /**
   * Whether the `<Navigation />` is initially minimized (uncontrolled)
   */
  defaultMinimized: PropTypes.bool,
  onMinimized: PropTypes.func,
  /**
   * Screen reader label for the main Navigation
   */
  label: PropTypes.string.isRequired,
  /**
   * Screen reader label for the toggle button expanded/minimized state
   */
  toggleLabel: PropTypes.shape({
    expandedLabel: PropTypes.string,
    minimizedLabel: PropTypes.string
  }).isRequired,
  /**
   * If the `<Navigation.Item>` goes to a new page, pass an href
   */
  href: PropTypes.string,
  /**
   * If the `<Navigation.Item>` does not go to a new page pass an onClick
   */
  onClick: PropTypes.func
}

const allowedProps: AllowedPropKeys = [
  'children',
  'minimized',
  'defaultMinimized',
  'onMinimized',
  'label',
  'toggleLabel',
  'href',
  'onClick'
]

export type { NavigationProps, NavigationState, NavigationStyle }
export { propTypes, allowedProps }
