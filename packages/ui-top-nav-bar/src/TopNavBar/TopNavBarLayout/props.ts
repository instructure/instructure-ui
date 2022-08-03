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
  Children as ChildrenPropTypes,
  element
} from '@instructure/ui-prop-types'

import type { WithStyleProps, ComponentStyle } from '@instructure/emotion'
import type {
  TopNavBarLayoutTheme,
  OtherHTMLAttributes,
  PropValidators
} from '@instructure/shared-types'

import type { TrayProps } from '@instructure/ui-tray'

import { TopNavBarActionItems } from '../TopNavBarActionItems'
import { TopNavBarBrand } from '../TopNavBarBrand'
import { TopNavBarMenuItems } from '../TopNavBarMenuItems'
import { TopNavBarUser } from '../TopNavBarUser'

import type { ActionItemsChild } from '../TopNavBarActionItems/props'
import type { BrandChild } from '../TopNavBarBrand/props'
import type { MenuItemsChild } from '../TopNavBarMenuItems/props'
import type { UserChild } from '../TopNavBarUser/props'

import { TopNavBarLayout } from './index'

type LayoutChild = React.ComponentElement<TopNavBarLayoutProps, TopNavBarLayout>

type TopNavBarLayoutOwnProps = {
  /**
   * TODO: desc
   */
  renderBrand?: BrandChild

  /**
   * TODO: desc
   */
  renderMenuItems?: MenuItemsChild

  /**
   * TODO: desc
   */
  renderActionItems?: ActionItemsChild

  /**
   * TODO: desc
   */
  renderUser?: UserChild

  /**
   * TODO: desc - it is used for the small viewport layout!
   */
  trayMountNode?: TrayProps['mountNode']

  /**
   * A function that returns a reference to root HTML element
   */
  elementRef?: (el: Element | null) => void
}

type PropKeys = keyof TopNavBarLayoutOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type TopNavBarLayoutProps = TopNavBarLayoutOwnProps &
  WithStyleProps<TopNavBarLayoutTheme, TopNavBarLayoutStyle> &
  OtherHTMLAttributes<TopNavBarLayoutOwnProps>

type TopNavBarLayoutStyle = ComponentStyle<'topNavBarLayout'>

type TopNavBarLayoutState = {
  // state comes here
}

type TopNavBarLayoutStyleProps = {
  // props passed to makeStyles come here
}

const propTypes: PropValidators<PropKeys> = {
  renderBrand: ChildrenPropTypes.oneOf([TopNavBarBrand]),
  renderMenuItems: ChildrenPropTypes.oneOf([TopNavBarMenuItems]),
  renderActionItems: ChildrenPropTypes.oneOf([TopNavBarActionItems]),
  renderUser: ChildrenPropTypes.oneOf([TopNavBarUser]),
  trayMountNode: PropTypes.oneOfType([element, PropTypes.func]),
  elementRef: PropTypes.func
}

const allowedProps: AllowedPropKeys = [
  'renderBrand',
  'renderMenuItems',
  'renderActionItems',
  'renderUser',
  'trayMountNode',
  'elementRef'
]

export type {
  LayoutChild,
  TopNavBarLayoutProps,
  TopNavBarLayoutStyle,
  TopNavBarLayoutState,
  TopNavBarLayoutStyleProps
}
export { propTypes, allowedProps }
