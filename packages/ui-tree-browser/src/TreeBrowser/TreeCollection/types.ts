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

export type TreeBrowserCollectionProps = {
  makeStyles?: (...args: any[]) => any
  styles?: any
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
