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

import {
  omitProps,
  passthroughProps,
  safeCloneElement,
  withDeterministicId
} from '@instructure/ui-react-utils'
import { warn, error } from '@instructure/console'

import { withStyle } from '@instructure/emotion'

import { Drilldown } from '@instructure/ui-drilldown'
import { IconMoreLine } from '@instructure/ui-icons'
import { TruncateList } from '@instructure/ui-truncate-list'

import { TopNavBarItem } from '../TopNavBarItem'
import type { ItemChild } from '../TopNavBarItem/props'
import {
  mapItemsForDrilldown,
  renderMappedItemDrilldownSubpages,
  renderMappedItemsAsDrilldownOptions
} from '../utils/mapItemsForDrilldown'
import type { RenderOptionContent } from '../utils/mapItemsForDrilldown'

import { TopNavBarContext } from '../TopNavBarContext'

import generateStyle from './styles'
import generateComponentTheme from './theme'

import { allowedProps, TopNavBarActionItemsStyleProps } from './props'
import type {
  TopNavBarActionItemsProps,
  TopNavBarActionItemsState
} from './props'

/**
---
parent: TopNavBar
id: TopNavBar.ActionItems
---
@module TopNavBarActionItems
**/
@withDeterministicId()
@withStyle(generateStyle, generateComponentTheme)
class TopNavBarActionItems extends Component<
  TopNavBarActionItemsProps,
  TopNavBarActionItemsState
> {
  static readonly componentId = 'TopNavBar.ActionItems'

  static allowedProps = allowedProps
  static defaultProps = {}

  declare context: React.ContextType<typeof TopNavBarContext>
  static contextType = TopNavBarContext

  ref: HTMLUListElement | null = null

  private readonly _hiddenActionItemsMenuId: string
  private readonly _hiddenActionItemsMenuTriggerId: string

  handleRef = (el: HTMLUListElement | null) => {
    const { elementRef } = this.props

    this.ref = el

    if (typeof elementRef === 'function') {
      elementRef(el)
    }
  }

  constructor(props: TopNavBarActionItemsProps) {
    super(props)

    this._hiddenActionItemsMenuId = props.deterministicId!(
      'TopNavBarActionItems-hiddenActionItemsMenu'
    )
    this._hiddenActionItemsMenuTriggerId = props.deterministicId!(
      'TopNavBarActionItems-hiddenActionItemsMenuTrigger'
    )

    this.state = {
      key: 0,
      visibleActionItemsCount: undefined
    }
  }

  componentDidMount() {
    this.props.makeStyles?.(this.makeStylesVariables)
  }

  componentDidUpdate(prevProps: TopNavBarActionItemsProps) {
    this.props.makeStyles?.(this.makeStylesVariables)

    if (
      this.context.layout === 'smallViewport' &&
      Children.count(prevProps.children) !== Children.count(this.props.children)
    ) {
      this.setState({ key: this.state.key + 1 })
    }
  }

  get makeStylesVariables(): TopNavBarActionItemsStyleProps {
    return {
      layout: this.context.layout
    }
  }

  get childrenArray() {
    const children = Children.toArray(this.props.children) as ItemChild[]

    return children.map((child) => {
      if (!child?.props) {
        return null
      }

      const { id, renderAvatar, renderIcon, variant } = child.props

      if (renderAvatar) {
        warn(
          false,
          `Items in <TopNavBar.ActionItems> are not allowed to have avatars, please remove it from item with the id "${id}".`
        )
        return safeCloneElement(child, {
          renderAvatar: undefined,
          variant: 'default'
        })
      }

      if (this.context.layout === 'smallViewport' && variant !== 'icon') {
        if (!renderIcon) {
          error(
            false,
            `Items in <TopNavBar.ActionItems> are required to have the \`renderIcon\` prop, because only the icons are displayed due to the lack of space. Please add an icon to the item with the id "${id}".`
          )
          return null
        }

        return safeCloneElement(child, {
          variant: variant === 'forceIconWithLabel' ? 'default' : 'icon'
        })
      }

      return child
    }) as ItemChild[]
  }

  renderOptionContent: RenderOptionContent = (children, itemProps) => {
    const { styles } = this.props
    const { status } = itemProps

    return (
      <span
        css={
          status === 'active'
            ? styles?.dropdownMenuOptionActive
            : styles?.dropdownMenuOption
        }
      >
        {children}
      </span>
    )
  }

  renderHiddenActionItemsMenu(hiddenItems: ItemChild[]) {
    const {
      renderHiddenItemsMenuTriggerLabel,
      renderHiddenItemsMenuTriggerTooltip
    } = this.props

    const mappedItems = mapItemsForDrilldown(hiddenItems, {
      renderOptionContent: this.renderOptionContent
    })
    const subPages = renderMappedItemDrilldownSubpages(mappedItems)
    const options = renderMappedItemsAsDrilldownOptions(mappedItems)

    const label =
      typeof renderHiddenItemsMenuTriggerLabel === 'function'
        ? renderHiddenItemsMenuTriggerLabel(hiddenItems.length)
        : renderHiddenItemsMenuTriggerLabel
    const tooltip =
      typeof renderHiddenItemsMenuTriggerTooltip === 'function'
        ? renderHiddenItemsMenuTriggerTooltip(hiddenItems.length)
        : renderHiddenItemsMenuTriggerTooltip

    return (
      <TopNavBarItem
        id={this._hiddenActionItemsMenuTriggerId}
        renderIcon={IconMoreLine}
        variant="icon"
        tooltip={tooltip}
        showSubmenuChevron={false}
        renderSubmenu={
          <Drilldown
            shouldSetAriaExpanded={false}
            rootPageId={this._hiddenActionItemsMenuId}
          >
            {[
              <Drilldown.Page
                id={this._hiddenActionItemsMenuId}
                key={this._hiddenActionItemsMenuId}
              >
                {options}
              </Drilldown.Page>,
              ...subPages
            ]}
          </Drilldown>
        }
      >
        {label}
      </TopNavBarItem>
    )
  }

  renderTruncatedActionItemList() {
    const { listLabel, styles } = this.props

    return (
      <TruncateList
        {...passthroughProps(omitProps(this.props, allowedProps))}
        key={this.state.key} // rerender if child count changes
        elementRef={this.handleRef}
        css={styles?.topNavBarActionItems}
        visibleItemsCount={this.state.visibleActionItemsCount}
        onUpdate={({ visibleItemsCount }) => {
          this.setState({ visibleActionItemsCount: visibleItemsCount })
        }}
        renderHiddenItemMenu={(hiddenChildren) =>
          this.renderHiddenActionItemsMenu(hiddenChildren as ItemChild[])
        }
        aria-label={listLabel}
      >
        {this.childrenArray}
      </TruncateList>
    )
  }

  render() {
    const { listLabel, styles } = this.props

    if (!this.childrenArray.length) {
      return null
    }

    if (this.context.layout === 'smallViewport') {
      return this.renderTruncatedActionItemList()
    }

    return (
      <ul
        {...omitProps(this.props, allowedProps)}
        ref={this.handleRef}
        css={styles?.topNavBarActionItems}
        aria-label={listLabel}
        data-cid="TopNavBarActionItems"
      >
        {this.childrenArray.map((item) => (
          <li css={styles?.listItem} key={item.props.id}>
            {item}
          </li>
        ))}
      </ul>
    )
  }
}

export { TopNavBarActionItems }
export default TopNavBarActionItems
