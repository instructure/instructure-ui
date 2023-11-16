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

import { getLayoutProps } from '../utils/exampleHelpers'

import { TopNavBar } from '../index'
import type { TopNavBarProps } from '../props'

const topNavBarExampleChildren: TopNavBarProps['children'][] = [
  ({ currentLayout, inverseColor }) => (
    <TopNavBar.Layout
      key="default"
      {...getLayoutProps(
        { currentLayout, inverseColor },
        { hideActionsUserSeparator: true, userVariant: 'button' }
      )}
    />
  ),
  ({ currentLayout, inverseColor }) => (
    <TopNavBar.Layout
      {...getLayoutProps(
        { currentLayout, inverseColor },
        {
          hasAlternativeTitle: true,
          menuItemsCount: 3,
          currentPageId: 'Overview',
          actionItemsItemProps: { variant: 'default' },
          userWithSubmenu: true
        }
      )}
    />
  ),
  ({ currentLayout, inverseColor }) => (
    <TopNavBar.Layout
      {...getLayoutProps(
        { currentLayout, inverseColor },
        {
          hideActionsUserSeparator: true,
          brandProps: { renderIcon: undefined },
          hasBrandNameBackground: true,
          currentPageId: 'Maps',
          actionItemsCount: 6,
          userWithAvatar: true
        }
      )}
    />
  ),
  ({ currentLayout, inverseColor }) => (
    <TopNavBar.Layout
      {...getLayoutProps(
        { currentLayout, inverseColor },
        {
          brandProps: { renderName: undefined },
          actionItemsItemProps: { variant: 'button' },
          actionItemsCount: 4,
          menuItemsCount: 0,
          userWithAvatar: true,
          userVariant: 'avatar'
        }
      )}
    />
  ),
  ({ currentLayout, inverseColor }) => (
    <TopNavBar.Layout
      {...getLayoutProps(
        { currentLayout, inverseColor },
        {
          brandProps: { renderName: undefined, renderIcon: undefined },
          actionItemsCount: 0,
          userWithAvatar: true,
          userVariant: 'avatar',
          userWithSubmenu: true
        }
      )}
    />
  ),
  ({ currentLayout, inverseColor }) => (
    <TopNavBar.Layout
      {...getLayoutProps(
        { currentLayout, inverseColor },
        {
          actionItemsCount: 5,
          menuItemsWithSubmenu: true,
          hasRenderInPlaceDialogConfig: true
        }
      )}
      renderUser={undefined}
    />
  ),
  ({ currentLayout, inverseColor }) => (
    <TopNavBar.Layout
      {...getLayoutProps(
        { currentLayout, inverseColor },
        {
          actionItemsCount: 5,
          menuItemsWithSubmenu: true,
          hasRenderInPlaceDialogConfig: true,
          hasRenderBreadcrumb: true
        }
      )}
      renderUser={undefined}
    />
  )
] as TopNavBarProps['children'][]

export default {
  sectionProp: 'breakpoint',
  propValues: {
    breakpoint: [500, 1024],
    inverseColor: [false, true],
    children: topNavBarExampleChildren
  },
  getComponentProps: () => {
    return {
      mediaQueryMatch: 'element'
    }
  },
  getExampleProps: (props) => {
    return {
      width: props.breakpoint === 1024 ? 950 : 414
    }
  }
} as StoryConfig<TopNavBarProps>
