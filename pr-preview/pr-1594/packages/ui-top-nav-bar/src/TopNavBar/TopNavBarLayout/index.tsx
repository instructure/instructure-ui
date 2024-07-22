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
import React, { Component } from 'react'

import { testable } from '@instructure/ui-testable'

import { withStyle, jsx } from '@instructure/emotion'

import type {
  TopNavBarLayoutDesktopTheme,
  TopNavBarLayoutSmallViewportTheme
} from '@instructure/shared-types'

import { TopNavBarContext } from '../TopNavBarContext'

import generateComponentTheme from './theme'

import { TopNavBarSmallViewportLayout } from './SmallViewportLayout'
import type { TopNavBarSmallViewportLayoutProps } from './SmallViewportLayout/props'
import { TopNavBarDesktopLayout } from './DesktopLayout'
import type { TopNavBarDesktopLayoutProps } from './DesktopLayout/props'

import { propTypes, allowedProps } from './props'
import type { TopNavBarLayoutProps } from './props'

/**
---
parent: TopNavBar
id: TopNavBar.Layout
---
@module TopNavBarLayout
**/
@withStyle(null, generateComponentTheme)
@testable()
class TopNavBarLayout extends Component<TopNavBarLayoutProps> {
  static readonly componentId = 'TopNavBar.Layout'

  static propTypes = propTypes
  static allowedProps = allowedProps
  static defaultProps = {
    smallViewportConfig: {}
  }

  declare context: React.ContextType<typeof TopNavBarContext>
  static contextType = TopNavBarContext

  ref: HTMLElement | null = null

  componentDidMount() {
    // TODO: Remove this in v10!
    if ('desktopConfig' in this.props) {
      console.error(
        'Warning: `desktopConfig` prop on [TopNavBar.Layout] is deprecated, please remove it from your code. Further info: https://instructure.design/#v9-upgrade-guide/#deprecated-properties'
      )
    }
  }

  handleRef = (el: HTMLElement | null) => {
    const { elementRef } = this.props

    this.ref = el

    if (typeof elementRef === 'function') {
      elementRef(el)
    }
  }

  get sortedThemeOverride() {
    const { themeOverride } = this.props

    // TODO: try to type better, the themeOverride types are not prepared to be inherited and sorted

    if (!themeOverride || typeof themeOverride === 'function') {
      return {
        desktopThemeOverride: themeOverride as any,
        smallViewportThemeOverride: themeOverride as any
      }
    }

    const desktopThemeOverride: Partial<TopNavBarLayoutDesktopTheme> = {}
    const smallViewportThemeOverride: Partial<TopNavBarLayoutSmallViewportTheme> =
      {}

    for (const key in themeOverride) {
      if (key.startsWith('smallViewport')) {
        const variable = key as keyof TopNavBarLayoutSmallViewportTheme
        smallViewportThemeOverride[variable] = themeOverride[variable] as any
      } else if (
        (key as keyof TopNavBarLayoutDesktopTheme).startsWith('desktop')
      ) {
        const variable = key as keyof TopNavBarLayoutDesktopTheme
        desktopThemeOverride[variable] = themeOverride[variable] as any
      }
    }

    return { desktopThemeOverride, smallViewportThemeOverride }
  }

  render() {
    const {
      smallViewportConfig,
      // @ts-expect-error prevents it to be passed
      styles,
      // @ts-expect-error prevents it to be passed
      makeStyles,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ...restProps
    } = this.props

    if (this.context.layout === 'smallViewport') {
      return (
        <TopNavBarSmallViewportLayout
          {...smallViewportConfig}
          {...(restProps as TopNavBarSmallViewportLayoutProps)}
          themeOverride={this.sortedThemeOverride.smallViewportThemeOverride}
          elementRef={this.handleRef}
        />
      )
    }

    return (
      <TopNavBarDesktopLayout
        {...(restProps as TopNavBarDesktopLayoutProps)}
        themeOverride={this.sortedThemeOverride.desktopThemeOverride}
        elementRef={this.handleRef}
      />
    )
  }
}

export { TopNavBarLayout }
export default TopNavBarLayout
