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

/** @jsx jsx */
import { Component } from 'react'

import { testable } from '@instructure/ui-testable'
import { px } from '@instructure/ui-utils'

import { withStyle, jsx } from '@instructure/emotion'

import { Responsive } from '@instructure/ui-responsive'

import { TopNavBarActionItems } from './TopNavBarActionItems'
import { TopNavBarBrand } from './TopNavBarBrand'
import { TopNavBarItem } from './TopNavBarItem'
import { TopNavBarLayout } from './TopNavBarLayout'
import { TopNavBarMenuItems } from './TopNavBarMenuItems'
import { TopNavBarSmallViewportLayout } from './TopNavBarSmallViewportLayout'
import { TopNavBarUser } from './TopNavBarUser'

import { TopNavBarContext } from './TopNavBarContext'
import type { TopNavBarLayouts } from './TopNavBarContext'

import generateStyle from './styles'
import generateComponentTheme from './theme'

import { propTypes, allowedProps } from './props'
import type {
  TopNavBarProps,
  TopNavBarState,
  TopNavBarStyleProps
} from './props'
import { pickProps } from '@instructure/ui-react-utils'

/**
---
category: components/WIP
---
@isWIP
**/
@withStyle(generateStyle, generateComponentTheme)
@testable()
class TopNavBar extends Component<TopNavBarProps, TopNavBarState> {
  static readonly componentId = 'TopNavBar'

  // TODO: mention in docs
  static ActionItems = TopNavBarActionItems
  static Brand = TopNavBarBrand
  static Item = TopNavBarItem
  static Layout = TopNavBarLayout
  static MenuItems = TopNavBarMenuItems
  static SmallViewportLayout = TopNavBarSmallViewportLayout
  static User = TopNavBarUser

  static contextType = TopNavBarContext

  static propTypes = propTypes
  static allowedProps = allowedProps
  static defaultProps = {
    breakpoint: 950, // TODO: what should be the default?
    mediaQueryMatch: 'element'
  }

  ref: HTMLDivElement | Element | null = null

  handleRef = (el: HTMLDivElement | null) => {
    const { elementRef } = this.props

    this.ref = el

    if (typeof elementRef === 'function') {
      elementRef(el)
    }
  }

  constructor(props: TopNavBarProps) {
    super(props)

    this.state = {
      /**
       * FIXME: If needed, state goes here
       */
    }
  }

  componentDidMount() {
    this.props.makeStyles?.(this.makeStylesVariables)
  }

  componentDidUpdate() {
    this.props.makeStyles?.(this.makeStylesVariables)
  }

  get makeStylesVariables(): TopNavBarStyleProps {
    return {
      /**
       * FIXME: If needed, props that gets passed to makeStyles come here
       */
    }
  }

  get breakpoint() {
    return px(this.props.breakpoint!)
  }

  get desktopLayout() {
    const { renderLayout } = this.props

    return renderLayout
  }

  get smallViewportLayout() {
    const { renderSmallViewportLayout } = this.props

    if (!renderSmallViewportLayout) {
      return (
        <TopNavBarSmallViewportLayout
          {...pickProps(
            this.desktopLayout.props,
            TopNavBarSmallViewportLayout.allowedProps
          )}
        />
      )
    }

    return renderSmallViewportLayout
  }

  render() {
    const { mediaQueryMatch } = this.props

    return (
      <Responsive
        elementRef={this.handleRef}
        match={mediaQueryMatch}
        query={{
          smallViewPort: { maxWidth: this.breakpoint - 1 },
          desktop: { minWidth: this.breakpoint }
        }}
        render={(_props, matches) => {
          const layout = matches
            ? (matches[0] as TopNavBarLayouts)
            : 'smallViewport'

          return (
            <TopNavBarContext.Provider value={{ layout }}>
              {layout === 'desktop'
                ? this.desktopLayout
                : this.smallViewportLayout}
            </TopNavBarContext.Provider>
          )
        }}
      />
    )
  }
}

export { TopNavBar }
export default TopNavBar
