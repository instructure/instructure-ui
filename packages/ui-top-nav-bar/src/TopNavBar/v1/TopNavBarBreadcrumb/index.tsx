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

import { Children, Component, ReactElement } from 'react'
import {
  TopNavBarBreadcrumbProps,
  TopNavBarBreadcrumbState,
  allowedProps
} from './props'
import TopNavBar from '../index'
import { withStyleLegacy as withStyle } from '@instructure/emotion'
import generateStyle from '../TopNavBarBreadcrumb/styles'
import {
  IconArrowOpenStartLine,
  IconHamburgerLine
} from '@instructure/ui-icons'
import TopNavBarContext from '../TopNavBarContext'
import { error } from '@instructure/console'
import { Link } from '@instructure/ui-link/v11_6'

/**
---
parent: TopNavBar
id: TopNavBar.Breadcrumb
---
@module TopNavBarBreadcrumb
 **/
@withStyle(generateStyle, null)
class TopNavBarBreadcrumb extends Component<
  TopNavBarBreadcrumbProps,
  TopNavBarBreadcrumbState
> {
  static allowedProps = allowedProps
  static defaultProps = {}

  declare context: React.ContextType<typeof TopNavBarContext>
  static contextType = TopNavBarContext

  ref: HTMLDivElement | null = null

  handleRef = (el: HTMLDivElement | null) => {
    const { elementRef } = this.props

    this.ref = el

    if (typeof elementRef === 'function') {
      elementRef(el)
    }
  }

  componentDidMount() {
    this.props.makeStyles?.({ inverseColor: this.context.inverseColor })
  }

  componentDidUpdate() {
    this.props.makeStyles?.({ inverseColor: this.context.inverseColor })
  }

  renderMenu() {
    const { onClick } = this.props
    return (
      <div css={this.props.styles?.icon}>
        <TopNavBar.Item
          id="iconItem"
          variant="icon"
          renderIcon={<IconHamburgerLine />}
          onClick={onClick}
        >
          Hamburger menu
        </TopNavBar.Item>
      </div>
    )
  }

  render() {
    const { children, styles } = this.props

    if (!this.context.inverseColor) {
      error(
        false,
        `[TopNavBarBreadcrumb] If the inverseColor prop is not set to true, TopNavBarBreadcrumb fails to render.`
      )
    }

    const breadcrumbElement = Children.toArray(children)[0] as ReactElement<any>
    const breadCrumbLinks = breadcrumbElement.props.children
    const lastButOneLink = Children.toArray(breadCrumbLinks)[
      Children.count(breadCrumbLinks) - 2
    ] as ReactElement<any>

    return (
      this.context.inverseColor &&
      (this.context.layout === 'desktop' ? (
        <div
          ref={this.handleRef}
          css={styles?.topNavBarBreadcrumb}
          data-cid="TopNavBarBreadcrumb"
        >
          <div css={styles?.iconContainer}>{this.renderMenu()}</div>
          <div css={styles?.breadcrumbContainer}>{children}</div>
        </div>
      ) : (
        <div
          ref={this.handleRef}
          css={styles?.topNavBarBreadcrumb}
          data-cid="TopNavBarBreadcrumb"
        >
          <div css={styles?.linkContainer}>
            {lastButOneLink && (
              <Link
                href={lastButOneLink.props.href}
                isWithinText={false}
                renderIcon={IconArrowOpenStartLine}
              >
                {lastButOneLink.props.children}
              </Link>
            )}
          </div>
        </div>
      ))
    )
  }
}

export { TopNavBarBreadcrumb }

export default TopNavBarBreadcrumb
