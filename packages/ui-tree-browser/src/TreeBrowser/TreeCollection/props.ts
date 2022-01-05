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

import React, { ReactElement } from 'react'
import PropTypes from 'prop-types'

import { Children } from '@instructure/ui-prop-types'

import { TreeNode } from '../TreeNode'
import type { CollectionData, CollectionItem } from '../props'

import type {
  PropValidators,
  TreeBrowserCollectionTheme
} from '@instructure/shared-types'
import type { WithStyleProps, ComponentStyle } from '@instructure/emotion'
import { CollectionProps } from '../props'

type TreeBrowserCollectionOwnProps = {
  id?: string | number //!!
  name?: string //!!
  descriptor?: string //!!
  size?: 'small' | 'medium' | 'large'
  variant?: 'folderTree' | 'indent'
  collectionIcon?: React.ReactNode | ((props: unknown) => React.ReactNode)
  collectionIconExpanded?:
    | React.ReactNode
    | ((props: unknown) => React.ReactNode)
  itemIcon?: React.ReactNode | ((props: unknown) => React.ReactNode)
  expanded?: boolean //!!
  level?: number
  containerRef?: (el: HTMLElement | null) => void
  renderContent?: (props: any) => JSX.Element
  // until this line its almost the same as TreeButton, just
  // type, thumbnail, onClick, selected, focused are missing
  items?: CollectionItem[] //!!
  collections?: CollectionProps[] //!!
  selection?: string
  getItemProps?: (props: Record<string, any>) => Record<string, any> // cant use generics here :/
  getCollectionProps?: (props: Record<string, any>) => Record<string, any>
  onItemClick?: (e: React.MouseEvent, data: CollectionData) => void
  onCollectionClick?: (e: React.MouseEvent, data: CollectionData) => void
  onKeyDown?: (e: React.KeyboardEvent, data: CollectionData) => void
  numChildren?: number
  position?: number
  renderBeforeItems?: ReactElement // TODO: Children.oneOf([TreeNode]) //!!
  renderAfterItems?: ReactElement // TODO: Children.oneOf([TreeNode])  //!!
  isCollectionFlattened?: boolean //!!
} // TODO use CollectionProps here!!

type PropKeys = keyof TreeBrowserCollectionOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type TreeBrowserCollectionProps = TreeBrowserCollectionOwnProps &
  WithStyleProps<TreeBrowserCollectionTheme, TreeBrowserCollectionStyle>

type TreeBrowserCollectionStyle = ComponentStyle<
  'treeCollection' | 'list' | 'item'
>

const propTypes: PropValidators<PropKeys> = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string,
  descriptor: PropTypes.string,
  items: PropTypes.array,
  collections: PropTypes.array,
  expanded: PropTypes.bool,
  selection: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  variant: PropTypes.oneOf(['folderTree', 'indent']),
  collectionIcon: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  collectionIconExpanded: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  itemIcon: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  getItemProps: PropTypes.func,
  getCollectionProps: PropTypes.func,
  onItemClick: PropTypes.func,
  onCollectionClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  numChildren: PropTypes.number,
  level: PropTypes.number,
  position: PropTypes.number,
  /**
   * children of type TreeNode
   */
  renderBeforeItems: Children.oneOf([TreeNode]),
  /**
   * children of type TreeNode
   */
  renderAfterItems: Children.oneOf([TreeNode]),
  containerRef: PropTypes.func,
  isCollectionFlattened: PropTypes.bool,
  renderContent: PropTypes.func
}

const allowedProps: AllowedPropKeys = [
  'id',
  'name',
  'descriptor',
  'items',
  'collections',
  'expanded',
  'selection',
  'size',
  'variant',
  'collectionIcon',
  'collectionIconExpanded',
  'itemIcon',
  'getItemProps',
  'getCollectionProps',
  'onItemClick',
  'onCollectionClick',
  'onKeyDown',
  'numChildren',
  'level',
  'position',
  'renderBeforeItems',
  'renderAfterItems',
  'containerRef',
  'isCollectionFlattened',
  'renderContent'
]

type TreeCollectionState = { focused: string }

export type {
  TreeBrowserCollectionProps,
  TreeBrowserCollectionStyle,
  TreeCollectionState
}
export { propTypes, allowedProps }
