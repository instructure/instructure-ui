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
import {
  Children,
  Component,
  ReactChild,
  ReactFragment,
  ReactPortal
} from 'react'

import { withStyle, jsx } from '@instructure/emotion'

import { getBoundingClientRect } from '@instructure/ui-dom-utils'
import { callRenderProp, omitProps } from '@instructure/ui-react-utils'
import { px } from '@instructure/ui-utils'
import { debounce } from '@instructure/debounce'
import type { Debounced } from '@instructure/debounce'
import { testable } from '@instructure/ui-testable'

import { View } from '@instructure/ui-view'
import { Menu } from '@instructure/ui-menu'
import { Item } from './Item'

import generateStyle from './styles'
import generateComponentTheme from './theme'
import type { AppNavProps } from './props'
import { allowedProps, propTypes } from './props'

/**
---
category: components
---
@tsProps
**/
@withStyle(generateStyle, generateComponentTheme)
@testable()
class AppNav extends Component<AppNavProps> {
  static readonly componentId = 'AppNav'

  static allowedProps = allowedProps
  static propTypes = propTypes

  static defaultProps = {
    children: null,
    debounce: 300,
    margin: '0',
    elementRef: (_el: Element | null) => {},
    renderTruncateLabel: () => 'More',
    onUpdate: () => {},
    visibleItemsCount: 0
  }

  static Item = Item

  state = {
    isMeasuring: false
  }

  ref: Element | null = null
  _list: Element | null = null
  _debounced: Debounced | null = null
  _resizeListener: ResizeObserver | null = null

  componentDidMount() {
    this.props.makeStyles?.()
    const { width: origWidth } = getBoundingClientRect(this._list)

    this._debounced = debounce(this.handleResize, this.props.debounce, {
      leading: true,
      trailing: true
    })
    this._resizeListener = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width } = entry.contentRect

        if (origWidth !== width) {
          this._debounced!()
        }
      }
    })

    this._resizeListener.observe(this._list!)

    this.handleResize()
  }

  componentDidUpdate() {
    this.props.makeStyles?.()
  }

  componentWillUnmount() {
    if (this._resizeListener) {
      this._resizeListener.disconnect()
    }

    if (this._debounced) {
      this._debounced.cancel()
    }
  }

  measureItems = () => {
    const menuTriggerWidth = px(this.props.styles?.menuTriggerWidth as number)
    let visibleItemsCount = 0

    if (this._list) {
      const { width: navWidth } = getBoundingClientRect(this._list)

      const itemWidths = Array.from(this._list.getElementsByTagName('li')).map(
        (item) => {
          // Todo: if item's type isn't `unknown`, can remove `Element`
          const { width } = getBoundingClientRect(item as Element)
          return width
        }
      )

      let currentWidth = 0

      for (let i = 0; i < itemWidths.length; i++) {
        currentWidth += itemWidths[i]

        if (currentWidth <= navWidth - menuTriggerWidth) {
          visibleItemsCount++
        } else {
          break
        }
      }
    }

    return { visibleItemsCount }
  }

  handleResize = () => {
    this.setState({ isMeasuring: true }, () => {
      const { visibleItemsCount } = this.measureItems()

      this.props.onUpdate!({ visibleItemsCount })
      this.setState({ isMeasuring: false })
    })
  }

  handleRef = (el: Element | null) => {
    const { elementRef } = this.props

    this.ref = el

    if (typeof elementRef === 'function') {
      elementRef(el)
    }
  }

  renderListItem(
    item: ReactChild | ReactFragment | ReactPortal,
    isMenuTrigger: boolean,
    key: number | null
  ) {
    return (
      <li
        key={key}
        css={
          isMenuTrigger
            ? this.props.styles?.listItemWithMenuTrigger
            : this.props.styles?.listItem
        }
      >
        {item}
      </li>
    )
  }
  renderMenu(items: (ReactChild | ReactFragment | ReactPortal | Item)[]) {
    const menu = (
      <Menu
        trigger={
          <AppNav.Item
            renderLabel={callRenderProp(this.props.renderTruncateLabel)}
          />
        }
      >
        {items.map((item, index) => {
          return (
            <Menu.Item
              href={
                (item as Item).props.href
                  ? (item as Item).props.href
                  : undefined
              }
              onClick={
                (item as Item).props.onClick && !(item as Item).props.href
                  ? (item as Item).props.onClick
                  : () => {}
              }
              key={index}
            >
              {callRenderProp((item as Item).props.renderLabel)}
            </Menu.Item>
          )
        })}
      </Menu>
    )

    return this.renderListItem(menu, true, null)
  }

  render() {
    const { children, visibleItemsCount, screenReaderLabel, margin } =
      this.props

    const passthroughProps = View.omitViewProps(
      omitProps(this.props, AppNav.allowedProps),
      AppNav
    )

    const { isMeasuring } = this.state
    const childrenArray = Children.toArray(children)
    const visibleChildren = isMeasuring
      ? childrenArray
      : childrenArray.splice(0, visibleItemsCount)
    const hiddenChildren = isMeasuring ? [] : childrenArray
    const renderBeforeItems = callRenderProp(this.props.renderBeforeItems)
    const renderAfterItems = callRenderProp(this.props.renderAfterItems)
    const hasRenderedContent = renderBeforeItems || renderAfterItems

    return (
      <View
        {...passthroughProps}
        as="nav"
        css={[
          this.props.styles?.appNav,
          hasRenderedContent ? this.props.styles?.alignCenter : ''
        ]}
        margin={margin}
        display={hasRenderedContent ? 'flex' : 'block'}
        elementRef={this.handleRef}
      >
        {renderBeforeItems && <span>{renderBeforeItems}</span>}
        <ul
          ref={(el) => (this._list = el)}
          css={this.props.styles?.list}
          aria-label={callRenderProp(screenReaderLabel)}
        >
          {visibleChildren.map((child, index) => {
            return this.renderListItem(child, false, index)
          })}
          {hiddenChildren.length > 0 && this.renderMenu(hiddenChildren)}
        </ul>
        {renderAfterItems && <span>{renderAfterItems}</span>}
      </View>
    )
  }
}

export { AppNav }
export default AppNav
