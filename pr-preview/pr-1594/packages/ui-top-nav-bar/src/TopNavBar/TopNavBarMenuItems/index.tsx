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

import {
  omitProps,
  safeCloneElement,
  withDeterministicId
} from '@instructure/ui-react-utils'
import { warn, error } from '@instructure/console'
import { testable } from '@instructure/ui-testable'

import { withStyle, jsx } from '@instructure/emotion'

import { Drilldown } from '@instructure/ui-drilldown'
import { TruncateList } from '@instructure/ui-truncate-list'

import { TopNavBarContext } from '../TopNavBarContext'
import { TopNavBarItem } from '../TopNavBarItem'
import type { ItemChild } from '../TopNavBarItem/props'

import {
  mapItemsForDrilldown,
  renderMappedItemDrilldownSubpages,
  renderMappedItemsAsDrilldownOptions
} from '../utils/mapItemsForDrilldown'
import type { RenderOptionContent } from '../utils/mapItemsForDrilldown'

import generateStyle from './styles'
import generateComponentTheme from './theme'

import { propTypes, allowedProps } from './props'
import type { TopNavBarMenuItemsProps, TopNavBarMenuItemsState } from './props'

/**
---
parent: TopNavBar
id: TopNavBar.MenuItems
---
@module TopNavBarMenuItems
**/
@withDeterministicId()
@withStyle(generateStyle, generateComponentTheme)
@testable()
class TopNavBarMenuItems extends Component<
  TopNavBarMenuItemsProps,
  TopNavBarMenuItemsState
> {
  static readonly componentId = 'TopNavBar.MenuItems'

  static propTypes = propTypes
  static allowedProps = allowedProps
  static defaultProps = {}

  declare context: React.ContextType<typeof TopNavBarContext>
  static contextType = TopNavBarContext

  private readonly _hiddenMenuItemsMenuTriggerId: string
  private readonly _hiddenItemsMenuId: string

  ref: HTMLUListElement | Element | null = null

  handleRef = (el: HTMLUListElement | null) => {
    const { elementRef } = this.props

    this.ref = el

    if (typeof elementRef === 'function') {
      elementRef(el)
    }
  }

  constructor(props: TopNavBarMenuItemsProps) {
    super(props)

    this._hiddenMenuItemsMenuTriggerId = props.deterministicId!(
      'TopNavBarMenuItems-hiddenMenuItemsMenuTrigger'
    )
    this._hiddenItemsMenuId = props.deterministicId!(
      'TopNavBarSmallViewportLayout-drilldown'
    )

    this.state = {
      key: 0,
      visibleItemsCount: undefined
    }
  }

  componentDidMount() {
    this.props.makeStyles?.()
  }

  componentDidUpdate(prevProps: TopNavBarMenuItemsProps) {
    this.props.makeStyles?.()

    if (
      React.Children.count(prevProps.children) !== this.childrenArray.length
    ) {
      this.setState({ key: this.state.key + 1 })
    }
  }

  get childrenArray() {
    return React.Children.toArray(this.props.children) as ItemChild[]
  }

  renderOptionContent: RenderOptionContent = (children, itemProps) => {
    const { styles } = this.props

    return (
      <span
        css={
          itemProps?.status === 'active'
            ? styles?.submenuOptionActive
            : styles?.submenuOption
        }
      >
        {children}
      </span>
    )
  }

  renderHiddenItemsMenu(hiddenItems: ItemChild[]) {
    const { renderHiddenItemsMenuTriggerLabel, currentPageId } = this.props

    if (!hiddenItems.length) {
      return <span></span>
    }

    const mappedItems = mapItemsForDrilldown(hiddenItems, {
      renderOptionContent: this.renderOptionContent,
      currentPageId
    })
    const subPages = renderMappedItemDrilldownSubpages(mappedItems)
    const options = renderMappedItemsAsDrilldownOptions(mappedItems)

    const hasActiveChild = hiddenItems.find(
      (child) => child.props.status === 'active'
    )

    return (
      <TopNavBarItem
        id={this._hiddenMenuItemsMenuTriggerId}
        status={hasActiveChild ? 'active' : 'default'}
        renderSubmenu={
          <Drilldown rootPageId={this._hiddenItemsMenuId}>
            {[
              <Drilldown.Page
                id={this._hiddenItemsMenuId}
                key={this._hiddenItemsMenuId}
              >
                {options}
              </Drilldown.Page>,
              ...subPages
            ]}
          </Drilldown>
        }
      >
        {renderHiddenItemsMenuTriggerLabel(hiddenItems.length)}
      </TopNavBarItem>
    )
  }

  renderChildren() {
    const { currentPageId } = this.props

    return this.childrenArray.map((child) => {
      if (!child) {
        return
      }

      const { id, status, variant, renderSubmenu, renderAvatar } = child.props
      const isCurrentPage = currentPageId === id

      if (renderAvatar) {
        error(
          false,
          `Items in <TopNavBar.MenuItems> are not allowed to have avatars, but item with id: "${id}" has \`renderAvatar\` prop.`
        )
        return null
      }

      if (!isCurrentPage) {
        return child
      } else {
        if (variant !== 'default') {
          warn(
            false,
            `Only \`variant="default"\` items can be set to current/active, but the item with id "${id}" is "${variant}" variant.`
          )

          return child
        }

        if (status === 'disabled') {
          warn(
            false,
            `Disabled items can not be set to current/active, but the item with id "${id}" is disabled.`
          )

          return child
        }

        return safeCloneElement(child, {
          status: 'active',
          // if it has submenu, the root item cannot be current,
          // just a link inside the submenu
          'aria-current': renderSubmenu ? undefined : 'page'
        })
      }
    })
  }

  render() {
    const { listLabel, styles } = this.props

    if (!this.childrenArray.length) {
      return null
    }

    if (this.context.layout === 'smallViewport') {
      // in smallViewport mode it is rendered as a Drilldown
      return null
    }

    return (
      <TruncateList
        {...omitProps(this.props, allowedProps)}
        key={this.state.key} // rerender if child count changes
        elementRef={this.handleRef}
        css={styles?.topNavBarMenuItems}
        visibleItemsCount={this.state.visibleItemsCount}
        onUpdate={({ visibleItemsCount }) => {
          this.setState({ visibleItemsCount })
        }}
        renderHiddenItemMenu={(hiddenChildren) =>
          this.renderHiddenItemsMenu(hiddenChildren as ItemChild[])
        }
        {...(styles?.itemSpacing && {
          itemSpacing: styles.itemSpacing
        })}
        aria-label={listLabel}
      >
        {this.renderChildren()}
      </TruncateList>
    )
  }
}

export { TopNavBarMenuItems }
export default TopNavBarMenuItems
