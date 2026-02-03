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

import { Children, Component } from 'react'

import { omitProps } from '@instructure/ui-react-utils'

import { withStyle } from '@instructure/emotion'

import { TopNavBarContext } from '../../TopNavBarContext'

import generateStyle from './styles'
import generateComponentTheme from './theme'

import { allowedProps } from './props'
import type {
  TopNavBarDesktopLayoutProps,
  TopNavBarDesktopLayoutStyleProps
} from './props'

/**
---
private: true
---
**/
@withStyle(generateStyle, generateComponentTheme)
class TopNavBarDesktopLayout extends Component<TopNavBarDesktopLayoutProps> {
  static readonly componentId = 'TopNavBar.DesktopLayout'

  static allowedProps = allowedProps
  static defaultProps = {}

  declare context: React.ContextType<typeof TopNavBarContext>
  static contextType = TopNavBarContext

  ref: HTMLElement | null = null

  handleRef = (el: HTMLElement | null) => {
    const { elementRef } = this.props

    this.ref = el

    if (typeof elementRef === 'function') {
      elementRef(el)
    }
  }

  componentDidMount() {
    this.props.makeStyles?.(this.makeStylesVariables)
  }

  componentDidUpdate() {
    this.props.makeStyles?.(this.makeStylesVariables)
  }

  get makeStylesVariables(): TopNavBarDesktopLayoutStyleProps {
    return {
      inverseColor: this.context.inverseColor,
      hasBrandBlock: this.hasBrandBlock,
      hasActionItemsBlock: this.hasActionItemsBlock,
      hasUserBlock: this.hasUserBlock
    }
  }

  get hasBrandBlock() {
    const { renderBrand } = this.props
    return !!renderBrand && !!renderBrand.props.renderIcon
  }

  get hasActionItemsBlock() {
    const { renderActionItems } = this.props
    return (
      !!renderActionItems &&
      Children.count(renderActionItems.props.children) > 0
    )
  }

  get hasUserBlock() {
    const { renderUser } = this.props
    return !!renderUser && Children.count(renderUser.props.children) > 0
  }

  get hasMenuItemsBlock() {
    const { renderMenuItems } = this.props
    return (
      !!renderMenuItems && Children.count(renderMenuItems.props.children) > 0
    )
  }

  get hasBreadcrumbBlock() {
    const { renderBreadcrumb } = this.props
    return (
      !!renderBreadcrumb && Children.count(renderBreadcrumb.props.children) > 0
    )
  }

  render() {
    const {
      renderBrand,
      renderMenuItems,
      renderActionItems,
      renderUser,
      renderBreadcrumb,
      navLabel,
      styles
    } = this.props

    // only render breadcrumb if there is no brand or menu items
    const shouldRenderBreadcrumbBlock =
      !(this.hasBrandBlock || this.hasMenuItemsBlock) && this.hasBreadcrumbBlock

    return (
      <nav
        {...omitProps(this.props, allowedProps)}
        ref={this.handleRef}
        css={styles?.topNavBarDesktopLayout}
        aria-label={navLabel}
        data-cid="TopNavBarDesktopLayout"
      >
        {this.hasBrandBlock && (
          <div css={styles?.brandContainer}>{renderBrand}</div>
        )}

        {this.hasMenuItemsBlock && (
          <div css={styles?.menuItemsContainer}>{renderMenuItems}</div>
        )}

        {shouldRenderBreadcrumbBlock && renderBreadcrumb}

        <span css={styles?.spacer} />

        {this.hasActionItemsBlock && (
          <div css={styles?.actionItemsContainer}>{renderActionItems}</div>
        )}

        {this.hasUserBlock && (
          <div css={styles?.userContainer}>{renderUser}</div>
        )}
      </nav>
    )
  }
}

export { TopNavBarDesktopLayout }
export default TopNavBarDesktopLayout
