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

import { ComponentElement, Component } from 'react'

import { withStyleLegacy as withStyle } from '@instructure/emotion'

import { callRenderProp, omitProps } from '@instructure/ui-react-utils'

import { View } from '@instructure/ui-view'
import { Menu } from '@instructure/ui-menu'
import { Item } from './Item'

import generateStyle from './styles'
import generateComponentTheme from './theme'
import type { AppNavProps } from './props'
import { allowedProps } from './props'
import { AppNavItemProps } from './Item/props'

import { TruncateList } from '@instructure/ui-truncate-list'

/**
---
category: components
---
**/
@withStyle(generateStyle, generateComponentTheme)
class AppNav extends Component<AppNavProps> {
  static readonly componentId = 'AppNav'

  static allowedProps = allowedProps

  static defaultProps = {
    children: null,
    debounce: 300,
    margin: '0',
    renderTruncateLabel: () => 'More',
    visibleItemsCount: 0
  }

  static Item = Item

  state = {
    isMeasuring: false
  }

  ref: Element | null = null

  componentDidMount() {
    this.props.makeStyles?.()
  }

  componentDidUpdate() {
    this.props.makeStyles?.()
  }

  handleRef = (el: Element | null) => {
    const { elementRef } = this.props

    this.ref = el

    if (typeof elementRef === 'function') {
      elementRef(el)
    }
  }

  renderMenu(items: ComponentElement<AppNavItemProps, Item>[]) {
    return (
      <Menu
        trigger={
          <AppNav.Item
            renderLabel={callRenderProp(this.props.renderTruncateLabel)}
          />
        }
      >
        {(items as ComponentElement<AppNavItemProps, Item>[]).map(
          (item, index) => {
            return (
              <Menu.Item
                href={item.props.href ? item.props.href : undefined}
                onClick={
                  item.props.onClick && !item.props.href
                    ? item.props.onClick
                    : undefined
                }
                key={index}
              >
                {callRenderProp(item.props.renderLabel)}
              </Menu.Item>
            )
          }
        )}
      </Menu>
    )
  }

  render() {
    const { visibleItemsCount, screenReaderLabel, margin, debounce, styles } =
      this.props

    const passthroughProps = View.omitViewProps(
      omitProps(this.props, AppNav.allowedProps),
      AppNav
    )

    const renderBeforeItems = callRenderProp(this.props.renderBeforeItems)
    const renderAfterItems = callRenderProp(this.props.renderAfterItems)
    const hasRenderedContent = renderBeforeItems || renderAfterItems

    return (
      <View
        {...passthroughProps}
        as="nav"
        css={[styles?.appNav, hasRenderedContent ? styles?.alignCenter : '']}
        margin={margin}
        display={hasRenderedContent ? 'flex' : 'block'}
        elementRef={this.handleRef}
        data-cid="AppNav"
      >
        {renderBeforeItems && <span>{renderBeforeItems}</span>}

        <TruncateList
          visibleItemsCount={visibleItemsCount}
          debounce={debounce}
          onUpdate={this.props.onUpdate}
          renderHiddenItemMenu={(hiddenChildren) =>
            this.renderMenu(
              hiddenChildren as ComponentElement<AppNavItemProps, Item>[]
            )
          }
          itemSpacing={styles?.horizontalMargin}
          fixMenuTriggerWidth={styles?.menuTriggerWidth}
          css={styles?.list}
          aria-label={callRenderProp(screenReaderLabel)}
        >
          {this.props.children}
        </TruncateList>

        {renderAfterItems && <span>{renderAfterItems}</span>}
      </View>
    )
  }
}

export { AppNav }
export default AppNav
