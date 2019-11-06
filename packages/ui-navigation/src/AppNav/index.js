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

import React, { Children, Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { themeable, ThemeablePropTypes } from '@instructure/ui-themeable'
import { Children as ChildrenPropTypes } from '@instructure/ui-prop-types'

import { addResizeListener, getBoundingClientRect } from '@instructure/ui-dom-utils'
import { callRenderProp, omitProps } from '@instructure/ui-react-utils'
import { px } from '@instructure/ui-utils'
import { debounce } from '@instructure/debounce'
import { testable } from '@instructure/ui-testable'

import { View } from '@instructure/ui-view'
import { Menu } from '@instructure/ui-menu'
import { Item } from './Item'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components
experimental: true
---
**/
@testable()
@themeable(theme, styles)
class AppNav extends Component {
  static propTypes = {
    /**
    * Screenreader label for the overall navigation
    */
    screenReaderLabel: PropTypes.string.isRequired,
    /**
     * Only accepts `AppNav.Item` as children
     */
    children: ChildrenPropTypes.oneOf([Item]),
    /**
    * The rate (in ms) the component responds to container resizing or
    * an update to one of its child items
    */
    debounce: PropTypes.number,
    /**
    * Content to display before the navigation items, such as a logo
    */
    renderBeforeItems: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    /**
    * Content to display after the navigation items, aligned to the far end
    * of the navigation
    */
    renderAfterItems: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    /**
    * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
    * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
    * familiar CSS-like shorthand. For example: `margin="small auto large"`.
    */
    margin: ThemeablePropTypes.spacing,
    /**
    * Provides a reference to the underlying nav element
    */
    elementRef: PropTypes.func,
    /**
    * Customize the text displayed in the menu trigger when links overflow
    * the overall nav width.
    */
    renderTruncateLabel: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    /**
    * Called whenever the navigation items are updated or the size of
    * the navigation changes. Passes in the `visibleItemsCount` as
    * a parameter.
    */
    onUpdate: PropTypes.func,
    /**
    * Sets the number of navigation items that are visible.
    */
    visibleItemsCount: PropTypes.number
  }

  static defaultProps = {
    children: null,
    debounce: 300,
    margin: '0',
    renderBeforeItems: undefined,
    renderAfterItems: undefined,
    elementRef: (el) => {},
    renderTruncateLabel: () => 'More',
    onUpdate: () => {},
    visibleItemsCount: 0
  }

  static Item = Item

  state = {
    isMeasuring: false
  }

  _list = null
  _menuTrigger = null

  componentDidMount () {
    this._debounced = debounce(this.handleResize, this.props.debounce, { leading: true, trailing: true })
    this._resizeListener = addResizeListener(this._list, this._debounced)

    this.handleResize()
  }

  componentWillUnmount () {
    if (this._resizeListener) {
      this._resizeListener.remove()
    }

    if (this._debounced) {
      this._debounced.cancel()
    }
  }

  // TODO: remove this when INSTUI-2262 is resolved
  handleMenuDismiss = () => {
    this._menuTrigger && this._menuTrigger.focus()
  }

  measureItems = () => {
    const menuTriggerWidth = px(this.theme.menuTriggerWidth)
    let visibleItemsCount = 0

    if (this._list) {
      let { width: navWidth } = getBoundingClientRect(this._list)

      const itemWidths = Array.from(this._list.getElementsByTagName('li')).map((item) => {
        const { width } = getBoundingClientRect(item)
        return width
      })

      let currentWidth = 0

      for (let i = 0; i < itemWidths.length; i++) {
        currentWidth += itemWidths[i]

        if (currentWidth <= (navWidth - menuTriggerWidth)) {
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

      this.props.onUpdate({ visibleItemsCount })
      this.setState({ isMeasuring: false })
    })
  }

  renderListItem (item, isMenuTrigger, key) {
    return (
      <li
        key={key}
        className={classnames({
          [styles.listItem]: true,
          [styles['listItem--isMenuTrigger']]:
            isMenuTrigger && this.props.visibleItemsCount > 0
        })}
      >
        {item}
      </li>
    )
  }

  renderMenu (items) {
    const menu = (
      <Menu
        onDismiss={this.handleMenuDismiss} // TODO: remove when INSTUI-2262 is resolved
        trigger={
          <AppNav.Item
            elementRef={(el) => { this._menuTrigger = el }}
            renderLabel={callRenderProp(this.props.renderTruncateLabel)}
          />
        }
      >
        {items.map((item, index) => {
          return (
            <Menu.Item
              href={item.props.href ? item.props.href : null}
              onClick={(item.props.onClick && !item.props.href) ? item.props.onClick : null}
              key={index}>
                {callRenderProp(item.props.renderLabel)}
            </Menu.Item>
          )})
        }
      </Menu>
    )

    return this.renderListItem(menu, true, null)
  }

  render () {
    const {
      children,
      visibleItemsCount,
      screenReaderLabel,
      margin,
      elementRef
    } = this.props

    const passthroughProps = View.omitViewProps(
      omitProps(this.props, AppNav.propTypes),
      AppNav
    )

    const { isMeasuring } = this.state
    const childrenArray = Children.toArray(children)
    const visibleChildren = isMeasuring ? children : childrenArray.splice(0, visibleItemsCount)
    const hiddenChildren = isMeasuring ? [] : childrenArray
    const renderBeforeItems = callRenderProp(this.props.renderBeforeItems)
    const renderAfterItems = callRenderProp(this.props.renderAfterItems)
    const hasRenderedContent = renderBeforeItems || renderAfterItems

    return (
      <View
        {...passthroughProps}
        as="nav"
        className={classnames({
          [styles.root]: true,
          [styles['root--hasRenderedContent']]: hasRenderedContent
        })}
        margin={margin}
        display={hasRenderedContent ? 'flex' : 'block'}
        elementRef={elementRef}
      >
        {renderBeforeItems &&
          <span className={styles.renderBefore}>
            {renderBeforeItems}
          </span>
        }
        <ul
          ref={el => this._list = el}
          className={styles.list}
          aria-label={callRenderProp(screenReaderLabel)}
        >
          {visibleChildren.map((child, index) => {
            return this.renderListItem(child, false, index)
          })}
          {hiddenChildren.length > 0 && this.renderMenu(hiddenChildren)}
        </ul>
        {renderAfterItems &&
          <span className={styles.renderAfter}>
            {renderAfterItems}
          </span>
        }
      </View>
    )
  }
}

export { AppNav }
export default AppNav
