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

import React, { Component } from 'react'

import { error } from '@instructure/console'
import { testable } from '@instructure/ui-testable'
import { px } from '@instructure/ui-utils'
import { matchComponentTypes } from '@instructure/ui-react-utils'

import { Responsive } from '@instructure/ui-responsive'

import { TopNavBarActionItems } from './TopNavBarActionItems'
import { TopNavBarBrand } from './TopNavBarBrand'
import { TopNavBarItem } from './TopNavBarItem'
import { TopNavBarLayout } from './TopNavBarLayout'
import { TopNavBarMenuItems } from './TopNavBarMenuItems'
import { TopNavBarUser } from './TopNavBarUser'

import { TopNavBarContext } from './TopNavBarContext'
import type { TopNavBarLayouts } from './TopNavBarContext'

import { propTypes, allowedProps } from './props'
import type { TopNavBarProps } from './props'

/**
---
category: components
---
@tsProps
**/
@testable()
class TopNavBar extends Component<TopNavBarProps> {
  static readonly componentId = 'TopNavBar'

  // TODO: mention in docs
  static ActionItems = TopNavBarActionItems
  static Brand = TopNavBarBrand
  static Item = TopNavBarItem
  static Layout = TopNavBarLayout
  static MenuItems = TopNavBarMenuItems
  static User = TopNavBarUser

  static contextType = TopNavBarContext

  static propTypes = propTypes
  static allowedProps = allowedProps
  static defaultProps = {
    breakpoint: 1024,
    mediaQueryMatch: 'media',
    inverseColor: false
  }

  ref: HTMLDivElement | null = null

  handleRef = (el: HTMLDivElement | null) => {
    const { elementRef } = this.props

    this.ref = el

    if (typeof elementRef === 'function') {
      elementRef(el)
    }
  }

  get breakpoint() {
    return px(this.props.breakpoint!)
  }

  render() {
    const { children, mediaQueryMatch, inverseColor } = this.props

    return (
      <Responsive
        elementRef={this.handleRef}
        match={mediaQueryMatch}
        query={{
          smallViewport: { maxWidth: this.breakpoint - 1 },
          desktop: { minWidth: this.breakpoint }
        }}
        render={(_props, matches) => {
          const layout = matches
            ? (matches[0] as TopNavBarLayouts)
            : 'smallViewport'

          const isInverseColor =
            typeof inverseColor === 'function'
              ? inverseColor(layout)
              : !!inverseColor

          const content = children({
            currentLayout: layout,
            inverseColor: isInverseColor
          })

          if (!matchComponentTypes(content, [TopNavBarLayout])) {
            error(
              false,
              'The `children` function prop of TopNavBar has to return a child of type <TopNavBar.Layout>, but it returned:',
              content
            )
          }

          return (
            <TopNavBarContext.Provider
              value={{
                layout,
                inverseColor: isInverseColor
              }}
            >
              {content}
            </TopNavBarContext.Provider>
          )
        }}
      />
    )
  }
}

export { TopNavBar }
export default TopNavBar
