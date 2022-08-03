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

import { Children as ChildrenPropTypes } from '@instructure/ui-prop-types'

import type { WithStyleProps, ComponentStyle } from '@instructure/emotion'
import type { WithDeterministicIdProps } from '@instructure/ui-react-utils'
import type {
  TopNavBarItemTheme,
  OtherHTMLAttributes,
  PropValidators
} from '@instructure/shared-types'

import { Drilldown } from '@instructure/ui-drilldown'
import type { DrilldownProps } from '@instructure/ui-drilldown'

import { TopNavBarContextType } from '../TopNavBarContext'
import { TopNavBarItem } from './index'

type ItemChild = React.ComponentElement<TopNavBarItemProps, TopNavBarItem>
type DrilldownSubmenu = React.ComponentElement<DrilldownProps, Drilldown>

type TopNavBarItemOwnProps = {
  /**
   * FIXME: description of the id prop goes here
   */
  id: string

  /**
   * FIXME: description of the children prop goes here
   */
  children?: React.ReactNode

  /**
   * FIXME: description of the isActive prop goes here
   */
  isActive?: boolean

  /**
   * FIXME: description of the renderSubmenu prop goes here
   */
  renderSubmenu?: DrilldownSubmenu

  /**
   * A function that returns a reference to root HTML element
   */
  elementRef?: (el: Element | null) => void
}

type PropKeys = keyof TopNavBarItemOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type TopNavBarItemProps = TopNavBarItemOwnProps &
  WithStyleProps<TopNavBarItemTheme, TopNavBarItemStyle> &
  OtherHTMLAttributes<TopNavBarItemOwnProps> &
  WithDeterministicIdProps

type TopNavBarItemStyle = ComponentStyle<
  'topNavBarItem' | 'content' | 'triggerContainer' | 'globalStyles'
>

type TopNavBarItemState = {
  submenuContainerSelector?: string
}

type TopNavBarItemStyleProps = {
  layout: TopNavBarContextType['layout']
  submenuContainerSelector?: string
}

const propTypes: PropValidators<PropKeys> = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node,
  isActive: PropTypes.bool,
  renderSubmenu: ChildrenPropTypes.oneOf([Drilldown]),
  elementRef: PropTypes.func
}

const allowedProps: AllowedPropKeys = [
  'id',
  'children',
  'isActive',
  'renderSubmenu',
  'elementRef'
]

export type {
  ItemChild,
  TopNavBarItemProps,
  TopNavBarItemStyle,
  TopNavBarItemState,
  TopNavBarItemStyleProps,
  DrilldownSubmenu
}
export { propTypes, allowedProps }
