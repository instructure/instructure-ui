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
import { Children as ChildrenPropTypes } from '@instructure/ui-prop-types'
import type { WithStyleProps, ComponentStyle } from '@instructure/emotion'
import type { WithDeterministicIdProps } from '@instructure/ui-react-utils'
import type {
  TopNavBarActionItemsTheme,
  OtherHTMLAttributes,
  
  ChildrenOfType
} from '@instructure/shared-types'

import { TopNavBarItem } from '../TopNavBarItem'
import { topNavBarItemTooltipPropType } from '../TopNavBarItem/props'
import type {
  ItemChild,
  TopNavBarItemTooltipType
} from '../TopNavBarItem/props'
import type { TopNavBarContextType } from '../TopNavBarContext'

import { TopNavBarActionItems } from './index'

type ActionItemsChild = React.ComponentElement<
  TopNavBarActionItemsProps,
  TopNavBarActionItems
>

type TopNavBarActionItemsOwnProps = {
  /**
   * Children of type: `<TopNavBar.Item>`.
   *
   * Items in small viewport mode are __required__ to have the `renderIcon` prop,
   * because only the icons are displayed due to the lack of space.
   */
  children?: ChildrenOfType<ItemChild>

  /**
   * An 'aria-label' for the action items list.
   */
  listLabel?: string

  /**
   * In __smallViewport__ mode, a __required__ label for the trigger item
   * of the hidden list items menu, used as an accessible screen reader label.
   * (The list is not truncated in __desktop__ mode.)
   *
   * When there is not enough room to list all the action items,
   * they will be accessible via a dropdown menu at the end of the list.
   */
  renderHiddenItemsMenuTriggerLabel:
    | string
    | ((hiddenChildrenCount: number) => string)

  /**
   * In __smallViewport__ mode, an optional tooltip for the trigger item
   * of the hidden list items menu.
   * (The list is not truncated in __desktop__ mode.)
   *
   * When there is not enough room to list all the action items,
   * they will be accessible via a dropdown menu at the end of the list.
   */
  renderHiddenItemsMenuTriggerTooltip?:
    | TopNavBarItemTooltipType
    | ((hiddenChildrenCount: number) => TopNavBarItemTooltipType)

  /**
   * A function that returns a reference to root HTML element
   */
  elementRef?: (el: HTMLUListElement | null) => void
}

type PropKeys = keyof TopNavBarActionItemsOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type TopNavBarActionItemsProps = TopNavBarActionItemsOwnProps &
  WithStyleProps<TopNavBarActionItemsTheme, TopNavBarActionItemsStyle> &
  OtherHTMLAttributes<TopNavBarActionItemsOwnProps> &
  WithDeterministicIdProps

type TopNavBarActionItemsStyle = ComponentStyle<
  | 'topNavBarActionItems'
  | 'listItem'
  | 'dropdownMenuOption'
  | 'dropdownMenuOptionActive'
>

type TopNavBarActionItemsState = {
  key: number
  visibleActionItemsCount?: number
}

type TopNavBarActionItemsStyleProps = {
  layout?: TopNavBarContextType['layout']
}
const allowedProps: AllowedPropKeys = [
  'children',
  'listLabel',
  'renderHiddenItemsMenuTriggerLabel',
  'renderHiddenItemsMenuTriggerTooltip',
  'elementRef'
]

export type {
  ActionItemsChild,
  TopNavBarActionItemsProps,
  TopNavBarActionItemsOwnProps,
  TopNavBarActionItemsState,
  TopNavBarActionItemsStyleProps,
  TopNavBarActionItemsStyle
}
export { allowedProps }
