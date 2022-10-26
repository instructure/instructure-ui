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

import type { StoryConfig } from '@instructure/ui-test-utils'

import { TopNavBarItem } from '../../TopNavBarItem'
import { itemSubmenuExample } from '../../utils/exampleHelpers'

import type { TopNavBarMenuItemsProps } from '../props'

const itemIndexWithSubmenu = 1

const baseItemVariants = [
  { id: 'Overview', label: 'Overview', href: '/#Overview' },
  { id: 'Admin', label: 'Admin', href: '/#Admin' },
  { id: 'Settings', label: 'Settings', href: '/#Settings' },
  { id: 'Data', label: 'Data', href: '/#Data' }
]
const itemsWithASubmenu = baseItemVariants.map((variant, idx) => {
  if (idx === itemIndexWithSubmenu) {
    return { ...variant, renderSubmenu: itemSubmenuExample, href: undefined }
  }
  return variant
})
const extraItems = Array.from(Array(10)).map((_item, idx) => {
  const label = `Item${idx + 1}`
  return {
    id: label,
    label,
    href: `/#${label}`
  }
})

const itemVariants = [
  baseItemVariants,
  itemsWithASubmenu,
  [...baseItemVariants, ...extraItems],
  [...itemsWithASubmenu, ...extraItems]
]

const menuItemsExampleChildren = itemVariants.map((variantChildren) =>
  variantChildren.map((item) => {
    const { id, label, href } = item
    return (
      <TopNavBarItem
        id={id}
        key={id}
        href={href}
        renderSubmenu={(item as any).renderSubmenu}
      >
        {label}
      </TopNavBarItem>
    )
  })
)

export default {
  propValues: {
    children: menuItemsExampleChildren,
    currentPageId: [undefined, 'Admin', 'Item2', 'Item8']
  },
  getComponentProps: () => {
    return {
      renderHiddenItemsMenuTriggerLabel: (hiddenChildrenCount) =>
        `${hiddenChildrenCount} More`
    }
  },
  getExampleProps: () => {
    return {
      background: 'primary-inverse',
      width: '52rem',
      margin: 'small 0'
    }
  },
  filter: (props) => {
    if (
      React.Children.count(props.children) < 5 &&
      props.currentPageId?.includes('Item')
    ) {
      return true
    }

    return false
  }
} as StoryConfig<TopNavBarMenuItemsProps>
