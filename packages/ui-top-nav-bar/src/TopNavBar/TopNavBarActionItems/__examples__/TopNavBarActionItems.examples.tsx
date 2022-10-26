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

import {
  IconSearchLine,
  IconQuestionLine,
  IconAlertsLine
} from '@instructure/ui-icons'

import type { StoryConfig } from '@instructure/ui-test-utils'

import { itemSubmenuExample } from '../../utils/exampleHelpers'
import { TopNavBarItem } from '../../TopNavBarItem'
import type { TopNavBarItemProps } from '../../TopNavBarItem/props'

import type { TopNavBarActionItemsProps } from '../props'

const items = [
  {
    id: 'search',
    label: 'Search',
    icon: IconSearchLine
  },
  {
    id: 'info',
    label: 'Info',
    icon: IconQuestionLine
  },
  {
    id: 'alerts',
    label: 'Alerts',
    icon: IconAlertsLine
  }
]

const itemVariants: Partial<TopNavBarItemProps>[] = [
  { variant: 'icon' },
  { variant: 'icon', renderSubmenu: itemSubmenuExample },
  { variant: 'default', renderIcon: undefined },
  {
    variant: 'default',
    renderIcon: undefined,
    renderSubmenu: itemSubmenuExample
  },
  { variant: 'default' },
  { variant: 'default', renderSubmenu: itemSubmenuExample },
  { variant: 'button', renderIcon: undefined },
  {
    variant: 'button',
    renderIcon: undefined,
    renderSubmenu: itemSubmenuExample
  },
  { variant: 'button' },
  { variant: 'button', renderSubmenu: itemSubmenuExample }
]

export const actionItemChildren = itemVariants.map((variantProps, idx) =>
  items.map((item) => {
    const { label, icon } = item
    const id = `${item.id}_${idx}`
    return (
      <TopNavBarItem
        id={id}
        key={id}
        renderIcon={
          'renderIcon' in variantProps ? variantProps.renderIcon : icon
        }
        {...variantProps}
      >
        {label}
      </TopNavBarItem>
    )
  })
)

export default {
  propValues: {
    children: actionItemChildren
  },
  getComponentProps: () => {
    return {
      renderHiddenItemsMenuTriggerLabel: (hiddenChildrenCount) =>
        `${hiddenChildrenCount} more actions`
    }
  },
  getExampleProps: () => {
    return {
      background: 'primary-inverse',
      width: '30rem',
      margin: 'small 0'
    }
  }
} as StoryConfig<TopNavBarActionItemsProps>
