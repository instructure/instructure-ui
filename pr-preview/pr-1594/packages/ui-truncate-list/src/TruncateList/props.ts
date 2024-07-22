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

import type { WithStyleProps, ComponentStyle } from '@instructure/emotion'
import type {
  OtherHTMLAttributes,
  PropValidators
} from '@instructure/shared-types'

type TruncateListOwnProps = {
  /**
   * List of items in the truncated list
   */
  children?: React.ReactNode

  /**
   * Sets the number of navigation items that are visible.
   * If not set, the list is not truncated.
   */
  visibleItemsCount?: number

  /**
   * When there are list items hidden, an optional element
   * (dropdown menu, link, etc.) can be provided to display them
   * (renders at the end of the list).
   */
  renderHiddenItemMenu?: (
    hiddenChildren: Exclude<React.ReactNode, boolean | null | undefined>[]
  ) => React.ReactElement

  /**
   * Called whenever the navigation items are updated or the size of
   * the navigation changes. Passes in the `visibleItemsCount` as
   * a parameter.
   */
  onUpdate?: (visibleItemsCount: { visibleItemsCount: number }) => void

  /**
   * The spacing between list items (in 'rem', 'em' or 'px')
   */
  itemSpacing?: string

  /**
   * Fix width of the Menu trigger (in 'rem', 'em' or 'px')
   */
  fixMenuTriggerWidth?: string

  /**
   * The rate (in ms) the component responds to container resizing or
   * an update to one of its child items
   */
  debounce?: number

  /**
   * Provides a reference to the underlying ul element
   */
  elementRef?: (element: HTMLUListElement | null) => void
}

type PropKeys = keyof TruncateListOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type TruncateListProps = TruncateListOwnProps &
  WithStyleProps<null, TruncateListStyle> &
  OtherHTMLAttributes<TruncateListOwnProps>

type TruncateListStyle = ComponentStyle<
  'truncateList' | 'listItem' | 'menuTrigger'
>

type TruncateListState = {
  isMeasuring: boolean
  menuTriggerWidth?: number
}

const propTypes: PropValidators<PropKeys> = {
  children: PropTypes.node,
  visibleItemsCount: PropTypes.number,
  onUpdate: PropTypes.func,
  renderHiddenItemMenu: PropTypes.func,
  itemSpacing: PropTypes.string,
  fixMenuTriggerWidth: PropTypes.string,
  debounce: PropTypes.number,
  elementRef: PropTypes.func
}

const allowedProps: AllowedPropKeys = [
  'children',
  'renderHiddenItemMenu',
  'visibleItemsCount',
  'itemSpacing',
  'fixMenuTriggerWidth',
  'debounce',
  'onUpdate',
  'elementRef'
]

export type { TruncateListProps, TruncateListStyle, TruncateListState }
export { propTypes, allowedProps }
