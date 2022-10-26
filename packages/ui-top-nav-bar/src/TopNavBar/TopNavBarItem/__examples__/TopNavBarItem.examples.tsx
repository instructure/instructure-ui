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

import { IconSearchLine } from '@instructure/ui-icons'

import type { StoryConfig } from '@instructure/ui-test-utils'

import { avatarExample, itemSubmenuExample } from '../../utils/exampleHelpers'
import type { TopNavBarItemProps } from '../props'

const getLabel = (props: TopNavBarItemProps) => {
  const labelParts = []

  if (props.renderSubmenu) {
    labelParts.push('Submenu')
  }

  if (props.customPopoverConfig) {
    labelParts.push('Popover')
  }

  if (props.tooltip) {
    labelParts.push('Tooltip')
  }

  if (props.href) {
    labelParts.push('Link')
  }

  if (!labelParts.length) {
    labelParts.push('Item')
  }

  return labelParts.join(' ')
}

export default {
  sectionProp: 'variant',
  propValues: {
    href: [undefined, '/#Href'],
    renderIcon: [undefined, IconSearchLine],
    renderSubmenu: [undefined, itemSubmenuExample],
    renderAvatar: [undefined, avatarExample],
    customPopoverConfig: [
      undefined,
      {
        children: <div>Custom Popover</div>,
        color: 'primary',
        isShowingContent: true,
        placement: 'bottom center'
      }
    ],
    tooltip: [undefined, 'Tooltip']
  },
  getComponentProps: (props) => {
    return {
      id: 'item0',
      children: getLabel(props),
      showSubmenuChevron: props.renderSubmenu
        ? props.showSubmenuChevron
        : undefined
    }
  },
  getExampleProps: () => {
    return {
      background: 'primary-inverse',
      width: '30rem',
      margin: 'small 0'
    }
  },
  filter: (props) => {
    if (props.status === 'active' && props.variant !== 'default') {
      return true
    }

    if (props.variant === 'icon' && !props.renderIcon) {
      return true
    }

    if (props.variant === 'avatar' && !props.renderAvatar) {
      return true
    }

    if (props.renderAvatar) {
      if (props.renderIcon) {
        return true
      }
      if (props.status === 'active') {
        return true
      }
    }

    if (props.customPopoverConfig) {
      if (props.renderSubmenu) {
        return true
      }
      if (props.status !== 'default') {
        return true
      }
    }

    if (props.href) {
      if (props.renderSubmenu) {
        return true
      }
      if (props.renderIcon && props.variant !== 'icon') {
        return true
      }
    }

    return false
  }
} as StoryConfig<TopNavBarItemProps>
