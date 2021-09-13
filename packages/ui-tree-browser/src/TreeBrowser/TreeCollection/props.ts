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
import { Children } from '@instructure/ui-prop-types'

import type { PropValidators } from '@instructure/shared-types'

import { TreeNode } from '../TreeNode'
import type { WithStyleProps } from '@instructure/emotion'

type TreeBrowserCollectionOwnProps = {
  id?: string | number
  name?: string
  descriptor?: string
  items?: any[]
  collections?: any[]
  expanded?: boolean
  selection?: string
  size?: 'small' | 'medium' | 'large'
  variant?: 'folderTree' | 'indent'
  collectionIcon?: React.ReactNode | ((...args: any[]) => any)
  collectionIconExpanded?: React.ReactNode | ((...args: any[]) => any)
  itemIcon?: React.ReactNode | ((...args: any[]) => any)
  getItemProps?: (...args: any[]) => any
  getCollectionProps?: (...args: any[]) => any
  onItemClick?: (...args: any[]) => any
  onCollectionClick?: (...args: any[]) => any
  onKeyDown?: (...args: any[]) => any
  numChildren?: number
  level?: number
  position?: number
  renderBeforeItems?: any // TODO: Children.oneOf([TreeNode])
  renderAfterItems?: any // TODO: Children.oneOf([TreeNode])
  containerRef?: (...args: any[]) => any
  isCollectionFlattened?: boolean
  renderContent?: (...args: any[]) => any
}

type PropKeys = keyof TreeBrowserCollectionOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type TreeBrowserCollectionProps = TreeBrowserCollectionOwnProps & WithStyleProps

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

export type { TreeBrowserCollectionProps }
export { propTypes, allowedProps }
