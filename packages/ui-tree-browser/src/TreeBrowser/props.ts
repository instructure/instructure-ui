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

import { controllable } from '@instructure/ui-prop-types'

import type {
  PropValidators,
  TreeBrowserTheme
} from '@instructure/shared-types'
import type { WithStyleProps, ComponentStyle } from '@instructure/emotion'

type TreeBrowserOwnProps = {
  collections: any
  items: any
  rootId?: string | number
  expanded?: any // TODO: controllable( PropTypes.arrayOf( PropTypes.oneOfType([PropTypes.string, PropTypes.number]) ), 'onCollectionToggle' )
  defaultExpanded?: (string | number)[]
  selectionType?: 'none' | 'single'
  size?: 'small' | 'medium' | 'large'
  variant?: 'folderTree' | 'indent'
  collectionIcon?: React.ReactNode | ((...args: any[]) => any)
  collectionIconExpanded?: React.ReactNode | ((...args: any[]) => any)
  itemIcon?: React.ReactNode | ((...args: any[]) => any)
  getItemProps?: (...args: any[]) => any
  getCollectionProps?: (...args: any[]) => any
  showRootCollection?: boolean
  onCollectionClick?: (...args: any[]) => any
  onCollectionToggle?: (...args: any[]) => any
  onItemClick?: (...args: any[]) => any
  treeLabel?: string
  renderContent?: (...args: any[]) => any
  sortOrder?: (arg1: any, arg2: any) => number
}

type PropKeys = keyof TreeBrowserOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

// For now it doesn't need the OtherHTMLAttributes, because the extra props
// get passed to TreeCollection and it doesn't handle them
type TreeBrowserProps = TreeBrowserOwnProps &
  WithStyleProps<TreeBrowserTheme, TreeBrowserStyle>

type TreeBrowserStyle = ComponentStyle<'treeBrowser'>

const propTypes: PropValidators<PropKeys> = {
  /**
   * a normalized hash of collections, keyed by id, that contain an
   * :id, :name, :items (an array of item ids), :collections (an array of
   * collection ids), optional :descriptor text, optional :containerRef function,
   * an optional :renderBeforeItems TreeNode, and an optional :renderAfterItems TreeNode.
   * Each collection must have a unique id.
   */
  collections: PropTypes.object.isRequired,
  /**
   * a hash of items, keyed by id, that contain an :id, :name,
   * optional :descriptor text, and optional :thumbnail url
   */
  items: PropTypes.object.isRequired,
  /**
   * specifies the id of the root level collection, if present.
   * if no root is specified, all collections will be rendered
   * at the top level
   **/
  rootId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * an array of expanded collection ids, must be accompanied by an 'onCollectionToggle' prop
   */
  expanded: controllable(
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    ),
    'onCollectionToggle'
  ),
  /**
   * an array of collection ids to expand by default
   */
  defaultExpanded: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),
  // There are 2 types of tree selection:  single and multi.
  // This is set up to allow for "multi" in the future without having to deprecate the old API.
  selectionType: PropTypes.oneOf(['none', 'single']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  variant: PropTypes.oneOf(['folderTree', 'indent']),
  collectionIcon: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  collectionIconExpanded: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  itemIcon: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  /**
   * A function called with each item's props as an argument. The return value of this function is a
   * props object which will be passed to the item when it is rendered. This is useful for situations where
   * you need to render the item differently depending on it's props. For example, if you would like to
   * display a different icon for items with a certain name.
   */
  getItemProps: PropTypes.func,
  /**
   * A function called with each collection's props as an argument. The return value of this function is a
   * props object which will be passed to the collection when it is rendered. This is useful for situations where
   * you need to render the collection differently depending on it's props. For example, if you would like to
   * display a different icon for collections with a certain name.
   */
  getCollectionProps: PropTypes.func,
  /**
   * whether or not to show the root collection specified in rootId prop or
   * to begin with its immediate subcollections and items instead
   */
  showRootCollection: PropTypes.bool,
  onCollectionClick: PropTypes.func,
  onCollectionToggle: PropTypes.func,
  onItemClick: PropTypes.func,
  /**
   * An optional label to assist visually impaired users
   */
  treeLabel: PropTypes.string,
  renderContent: PropTypes.func,
  /**
   * An optional compare function to specify order of the collections and the items
   */
  sortOrder: PropTypes.func
}

const allowedProps: AllowedPropKeys = [
  'collections',
  'items',
  'rootId',
  'expanded',
  'defaultExpanded',
  'selectionType',
  'size',
  'variant',
  'collectionIcon',
  'collectionIconExpanded',
  'itemIcon',
  'getItemProps',
  'getCollectionProps',
  'showRootCollection',
  'onCollectionClick',
  'onCollectionToggle',
  'onItemClick',
  'treeLabel',
  'renderContent',
  'sortOrder'
]

export type { TreeBrowserProps, TreeBrowserStyle }
export { propTypes, allowedProps }
