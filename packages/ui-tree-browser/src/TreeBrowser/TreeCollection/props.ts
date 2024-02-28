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

import PropTypes from 'prop-types'

import { Children } from '@instructure/ui-prop-types'

import { TreeNode } from '../TreeNode'
import type { CollectionData } from '../props'

import type {
  PropValidators,
  TreeBrowserCollectionTheme
} from '@instructure/shared-types'
import type { WithStyleProps, ComponentStyle } from '@instructure/emotion'
import { CollectionProps, TreeBrowserBaseProps } from '../props'

type TreeBrowserCollectionOwnProps = {
  level: number
  onKeyDown?: (e: React.KeyboardEvent, data: CollectionData) => void
  // TODO it would be nice to use the same handler as in TreeBrowser
  onItemClick?: (e: React.MouseEvent, data: CollectionData) => void
  numChildren?: number
  position?: number
  selection?: string
} & CollectionProps &
  TreeBrowserBaseProps

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
  level: PropTypes.number.isRequired,
  position: PropTypes.number,
  renderBeforeItems: Children.oneOf([TreeNode]),
  renderAfterItems: Children.oneOf([TreeNode]),
  containerRef: PropTypes.func,
  isCollectionFlattened: PropTypes.bool,
  renderContent: PropTypes.func,
  compareFunc: PropTypes.func
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
