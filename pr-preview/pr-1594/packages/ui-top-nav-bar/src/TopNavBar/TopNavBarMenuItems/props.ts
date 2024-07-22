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

import type { WithDeterministicIdProps } from '@instructure/ui-react-utils'
import type { WithStyleProps, ComponentStyle } from '@instructure/emotion'
import type {
  TopNavBarMenuItemsTheme,
  OtherHTMLAttributes,
  PropValidators,
  ChildrenOfType
} from '@instructure/shared-types'

import { TopNavBarItem } from '../TopNavBarItem'
import type { ItemChild } from '../TopNavBarItem/props'

import { TopNavBarMenuItems } from './index'

type MenuItemsChild = React.ComponentElement<
  TopNavBarMenuItemsProps,
  TopNavBarMenuItems
>

type TopNavBarMenuItemsOwnProps = {
  /**
   * Children of type: `<TopNavBar.Item>`.
   *
   * In __desktop__ mode the items are listed on the navbar. See `renderHiddenItemsMenuTriggerLabel` prop description for overflow logic.
   *
   * In __smallViewport__ mode the items are accessible under the main "hamburger" menu.
   */
  children?: ChildrenOfType<ItemChild>

  /**
   * The `id` of the link to the current page. Marks the item by setting `aria-current="page"` attribute on it and setting its status to 'active'.
   *
   * (Note: only non-disabled, `variant="default"` items can be set to current/active.)
   */
  currentPageId?: string

  /**
   * In __desktop__ mode, required label for the trigger item of the hidden list items menu.
   *
   * When there is not enough room to list all the menu items,
   * they will be accessible via a dropdown menu at the end of the list.
   */
  renderHiddenItemsMenuTriggerLabel: (
    hiddenChildrenCount: number
  ) => React.ReactNode

  /**
   * In __desktop__ mode, 'aria-label' for the `<ul>` container.
   */
  listLabel?: string

  /**
   * A function that returns a reference to root HTML element
   */
  elementRef?: (el: HTMLUListElement | null) => void
}

type PropKeys = keyof TopNavBarMenuItemsOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type TopNavBarMenuItemsProps = TopNavBarMenuItemsOwnProps &
  WithStyleProps<TopNavBarMenuItemsTheme, TopNavBarMenuItemsStyle> &
  WithDeterministicIdProps &
  OtherHTMLAttributes<TopNavBarMenuItemsOwnProps>

type TopNavBarMenuItemsStyle = ComponentStyle<
  'topNavBarMenuItems' | 'submenuOption' | 'submenuOptionActive'
> & {
  itemSpacing: string
}

type TopNavBarMenuItemsState = {
  key: number
  visibleItemsCount?: number
}

const propTypes: PropValidators<PropKeys> = {
  children: ChildrenPropTypes.oneOf([TopNavBarItem]),
  currentPageId: PropTypes.string,
  renderHiddenItemsMenuTriggerLabel: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string
  ]).isRequired,
  listLabel: PropTypes.string,
  elementRef: PropTypes.func
}

const allowedProps: AllowedPropKeys = [
  'children',
  'currentPageId',
  'renderHiddenItemsMenuTriggerLabel',
  'listLabel',
  'elementRef'
]

export type {
  MenuItemsChild,
  TopNavBarMenuItemsProps,
  TopNavBarMenuItemsOwnProps,
  TopNavBarMenuItemsStyle,
  TopNavBarMenuItemsState
}
export { propTypes, allowedProps }
