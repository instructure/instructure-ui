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
import type { TreeBrowserButtonTheme } from '@instructure/shared-types'
import type { WithStyleProps } from '@instructure/emotion'

import type {
  TreeBrowserButtonProps,
  TreeBrowserButtonStyle
} from '../TreeButton/props'
import { CollectionData } from '../props'

type TreeBrowserNodeOwnProps = Pick<
  TreeBrowserButtonProps,
  | 'id'
  | 'size'
  | 'variant'
  | 'selected'
  | 'focused'
  | 'itemIcon'
  | 'thumbnail'
  | 'level'
  | 'containerRef'
  | 'onClick'
> & {
  onKeyDown?: (e: React.KeyboardEvent, data: CollectionData) => void
  /**
   * The children to be rendered within the `<TreeNode />`
   */
  children?: React.ReactNode
  /**
   * Whether the node should show hover effects.
   * Set to false to disable hover styling when the node contains custom interactive content.
   * @default true
   */
  hoverable?: boolean
}

type PropKeys = keyof TreeBrowserNodeOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type TreeBrowserNodeProps = TreeBrowserNodeOwnProps &
  WithStyleProps<TreeBrowserButtonTheme, TreeBrowserButtonStyle>
const allowedProps: AllowedPropKeys = [
  'id',
  'size',
  'variant',
  'selected',
  'focused',
  'itemIcon',
  'thumbnail',
  'level',
  'children',
  'containerRef',
  'onKeyDown',
  'onClick',
  'hoverable'
]

export type { TreeBrowserNodeProps }
export { allowedProps }
