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

import type {
  PropValidators,
  NavigationTheme,
  OtherHTMLAttributes
} from '@instructure/shared-types'
import type { WithStyleProps, ComponentStyle } from '@instructure/emotion'

type NavigationOwnProps = {
  /**
   * When minimized is set to true, the `<Navigation />` shows icons only while the text becomes a tooltip. When it is set to false, the `<Navigation />` shows text in addition to the icons
   */
  minimized?: boolean
  /**
   * Whether the `<Navigation />` is initially minimized (uncontrolled)
   */
  defaultMinimized?: boolean
  onMinimized?: (event: React.SyntheticEvent, minimized: boolean) => void
  /**
   * Screen reader label for the main Navigation
   */
  label: string
  /**
   * Screen reader label for the toggle button expanded/minimized state
   */
  toggleLabel: {
    expandedLabel?: string
    minimizedLabel?: string
  }
  /**
   * If the `<Navigation.Item>` goes to a new page, pass an href
   */
  href?: string
  /**
   * If the `<Navigation.Item>` does not go to a new page pass an onClick
   */
  onClick?: (event: React.MouseEvent) => void
  /**
   * children of type Navigation.Item
   */
  children?: React.ReactNode
}

type NavigationState = {
  minimized: boolean
}

type PropKeys = keyof NavigationOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type NavigationProps = NavigationOwnProps &
  WithStyleProps<NavigationTheme, NavigationStyle> &
  OtherHTMLAttributes<NavigationOwnProps>

type NavigationStyle = ComponentStyle<
  'navigation' | 'list' | 'content' | 'toggle' | 'toggleIcon'
>

const propTypes: PropValidators<PropKeys> = {
  children: ChildrenPropTypes.oneOf([NavigationItem]),
  minimized: controllable(PropTypes.bool, 'onMinimized', 'defaultMinimized'),
  defaultMinimized: PropTypes.bool,
  onMinimized: PropTypes.func,
  label: PropTypes.string.isRequired,
  toggleLabel: PropTypes.shape({
    expandedLabel: PropTypes.string,
    minimizedLabel: PropTypes.string
  }).isRequired,
  href: PropTypes.string,
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
