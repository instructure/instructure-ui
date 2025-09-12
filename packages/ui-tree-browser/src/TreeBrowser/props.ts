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

import type { TreeBrowserTheme } from '@instructure/shared-types'
import type { WithStyleProps, ComponentStyle } from '@instructure/emotion'
import React, { ReactElement } from 'react'
import type { TreeBrowserButtonProps } from './TreeButton/props'
import { Renderable } from '@instructure/shared-types'

type TreeBrowserOwnProps = {
  /**
   * a normalized hash of collections, keyed by id, that contains an
   * :id, :name, :items (an array of item ids), :collections (an array of
   * collection ids), optional :descriptor text, optional :containerRef function,
   * an optional :renderBeforeItems TreeNode, and an optional :renderAfterItems TreeNode.
   * Each collection must have a unique id.
   */
  collections: Record<number | string, Collection>
  /**
   * a hash of items, keyed by id, that contain an :id, :name,
   * optional :descriptor text, and optional :thumbnail url
   */
  items: Record<number, CollectionItem>
  /**
   * specifies the id of the root level collection, if present.
   * if no root is specified, all collections will be rendered
   * at the top level
   **/
  rootId?: string | number
  /**
   * an array of expanded collection ids, must be accompanied by an 'onCollectionToggle' prop
   */
  expanded?: (string | number | undefined)[] // TODO: controllable( PropTypes.arrayOf( PropTypes.oneOfType([PropTypes.string, PropTypes.number]) ), 'onCollectionToggle' )
  /**
   * an array of collection ids to expand by default
   */
  defaultExpanded?: (string | number)[]
  /**
   * There are 2 types of tree selection:  single and multi.
   * This is set up to allow for "multi" in the future without having to deprecate the old API.
   */
  selectionType?: 'none' | 'single'
  onCollectionToggle?: (collection: CollectionData) => void
  onItemClick?: (data: CollectionData) => void
  /**
   * Whether or not to show the root collection specified in rootId prop or
   * to begin with its immediate subcollections and items instead
   */
  showRootCollection?: boolean
  /**
   * An optional label to assist visually impaired users
   */
  treeLabel?: string
  /**
   * An optional compare function to specify order of the collections and the items
   */
  sortOrder?: (obj1: any, obj2: any) => number
} & TreeBrowserBaseProps

// props shared between TreeBrowser, TreeCollection
type TreeBrowserBaseProps = {
  /**
   * A function called with each item's props as an argument. The return value of this function is a
   * props object which will be passed to the item when it is rendered. This is useful for situations where
   * you need to render the item differently depending on it's props. For example, if you would like to
   * display a different icon for items with a certain name.
   */
  getItemProps?: (props: Record<string, any>) => Record<string, any> // cant use generics here :/
  /**
   * A function called with each collection's props as an argument. The return value of this function is a
   * props object which will be passed to the collection when it is rendered. This is useful for situations where
   * you need to render the collection differently depending on it's props. For example, if you would like to
   * display a different icon for collections with a certain name.
   */
  getCollectionProps?: (props: Record<string, any>) => TreeBrowserButtonProps
  onCollectionClick?: (e: React.MouseEvent, data: CollectionData) => void
} & TreeBrowserCommonProps

// props shared between TreeBrowser, TreeCollection, TreeButton
type TreeBrowserCommonProps = {
  size?: 'small' | 'medium' | 'large'
  variant?: 'folderTree' | 'indent'
  collectionIcon?: Renderable
  collectionIconExpanded?: Renderable
  itemIcon?: Renderable
  renderContent?: (props: TreeBrowserButtonProps) => React.JSX.Element
}

type PropKeys = keyof TreeBrowserOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

// For now it doesn't need the OtherHTMLAttributes, because the extra props
// get passed to TreeCollection and it doesn't handle them
type TreeBrowserProps = TreeBrowserOwnProps &
  WithStyleProps<TreeBrowserTheme, TreeBrowserStyle>

type TreeBrowserStyle = ComponentStyle<'treeBrowser'>

type CollectionBase = {
  id: number | string
  name: string
  descriptor?: string
  /**
   * A function that returns a reference to the underlying HTML container
   * @param el The DOM HTMLElement
   */
  containerRef?: (el: HTMLElement | null) => void
  /**
   * children of type TreeNode
   */
  renderBeforeItems?: ReactElement // TODO: Children.oneOf([TreeNode])
  /**
   * children of type TreeNode
   */
  renderAfterItems?: ReactElement // TODO: Children.oneOf([TreeNode])
}

type Collection = CollectionBase & {
  items?: number[]
  collections?: (number | string)[]
  compareFunc?: (a: CompareObject, b: CompareObject) => number
}

type CollectionItem = {
  id: number | string
  name: string
  descriptor?: string
  thumbnail?: string
  [key: string]: unknown // allow users to extend it
}

type CollectionProps = {
  collections?: CollectionProps[]
  items?: CollectionItem[]
  expanded?: boolean
  isCollectionFlattened?: boolean
  compareFunc?: (a: CompareObject, b: CompareObject) => number
} & CollectionBase

type CompareCollection = CollectionProps & { type: 'collection' }
type CompareItem = CollectionItem & { type: 'item' }
// this is a sum type, so CompareObject is one of CompareCollection OR CompareItem
type CompareObject = CompareItem | CompareCollection

type CollectionData = {
  id?: number | string
  expanded?: boolean
  type: 'child' | 'collection' | 'item'
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

type TreeBrowserState = {
  selection: string
  expanded?: (string | number | undefined)[]
}

export type {
  TreeBrowserProps,
  TreeBrowserState,
  TreeBrowserStyle,
  CollectionData,
  Collection,
  CollectionItem,
  CompareCollection,
  CompareItem,
  CompareObject,
  CollectionProps,
  TreeBrowserBaseProps,
  TreeBrowserCommonProps
}
export { allowedProps }
