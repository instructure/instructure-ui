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
import type { WithStyleProps, ComponentStyle } from '@instructure/emotion'
import type {
  TreeBrowserButtonTheme
} from '@instructure/shared-types'
import type { TreeBrowserCommonProps } from '../props'

type TreeBrowserButtonOwnProps = {
  id?: string | number
  name?: string
  descriptor?: string
  type?: 'collection' | 'item' | string // | string is for custom type
  thumbnail?: string
  /**
   * Called when this button is clicked
   */
  onClick?: (e: React.MouseEvent) => void
  expanded?: boolean
  selected?: boolean
  focused?: boolean
  level?: number
  /**
   * A function that returns a reference to the parent li element
   */
  containerRef?: (el: HTMLElement | null) => void
} & TreeBrowserCommonProps

type PropKeys = keyof TreeBrowserButtonOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type TreeBrowserButtonProps = TreeBrowserButtonOwnProps &
  WithStyleProps<TreeBrowserButtonTheme, TreeBrowserButtonStyle>

type TreeBrowserButtonStyle = ComponentStyle<
  | 'treeButton'
  | 'layout'
  | 'text'
  | 'textName'
  | 'textDescriptor'
  | 'icon'
  | 'thumbnail'
  | 'node'
>
const allowedProps: AllowedPropKeys = [
  'id',
  'name',
  'descriptor',
  'type',
  'size',
  'variant',
  'collectionIcon',
  'collectionIconExpanded',
  'itemIcon',
  'thumbnail',
  'onClick',
  'expanded',
  'selected',
  'focused',
  'level',
  'containerRef',
  'renderContent'
]

export type { TreeBrowserButtonProps, TreeBrowserButtonStyle }
export { allowedProps }
