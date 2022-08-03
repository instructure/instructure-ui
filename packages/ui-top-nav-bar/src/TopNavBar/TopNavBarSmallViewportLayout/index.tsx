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
import { Component, Children } from 'react'

import {
  omitProps,
  matchComponentTypes,
  withDeterministicId
} from '@instructure/ui-react-utils'
import { px } from '@instructure/ui-utils'
import { testable } from '@instructure/ui-testable'
import { getBoundingClientRect } from '@instructure/ui-dom-utils'

import { withStyle, jsx, Global } from '@instructure/emotion'

import { Tray } from '@instructure/ui-tray'
import { Drilldown } from '@instructure/ui-drilldown'
import type {
  DrilldownOptionProps,
  DrilldownPageChild,
  DrilldownOptionChild
} from '@instructure/ui-drilldown'

import { TopNavBarItem } from '../TopNavBarItem'
import type { ItemChild, DrilldownSubmenu } from '../TopNavBarItem/props'

import generateStyle from './styles'
import generateComponentTheme from './theme'

import { propTypes, allowedProps } from './props'
import type {
  TopNavBarSmallViewportLayoutProps,
  TopNavBarSmallViewportLayoutState,
  TopNavBarSmallViewportLayoutStyleProps
} from './props'

type MappedItem = {
  item: ItemChild
  optionData: DrilldownOptionProps
  submenuPages?: DrilldownPageChild[]
}

const mapItemsForDrilldown = (itemList?: ItemChild | ItemChild[]) => {
  const submenus: MappedItem[] = []

  Children.forEach(itemList, (item) => {
    if (!item || !matchComponentTypes(item, [TopNavBarItem])) return

    const { renderSubmenu, id, children } = item.props
    const submenu: DrilldownSubmenu | undefined = renderSubmenu
    submenus.push({
      item,
      optionData: {
        id,
        children,
        ...(submenu && {
          subPageId: submenu.props.rootPageId
        })
      },
      ...(submenu && {
        submenuPages: Children.toArray(
          submenu.props.children
        ) as DrilldownPageChild[]
      })
    })
  })

  return submenus
}

/**
---
parent: TopNavBar
id: TopNavBar.SmallViewportLayout
---
@module TopNavBarSmallViewportLayout
@isWIP
**/
@withDeterministicId()
@withStyle(generateStyle, generateComponentTheme)
@testable()
class TopNavBarSmallViewportLayout extends Component<
  TopNavBarSmallViewportLayoutProps,
  TopNavBarSmallViewportLayoutState
> {
  static readonly componentId = 'TopNavBar.SmallViewportLayout'
  // TODO: add to the docs: makeing it static on parent and jsdocs parent/module settings, dont export child on its own

  static propTypes = propTypes
  static allowedProps = allowedProps
  static defaultProps = {
    /**
     * FIXME: defaultProps go here
     */
  }

  ref: HTMLDivElement | Element | null = null

  private readonly _trayContainer: string
  private readonly _drilldownId: string
  private readonly _menuId: string
  private readonly _separatorId: string

  handleRef = (el: HTMLDivElement | null) => {
    const { elementRef } = this.props

    this.ref = el

    if (typeof elementRef === 'function') {
      elementRef(el)
    }
  }

  constructor(props: TopNavBarSmallViewportLayoutProps) {
    super(props)

    this._trayContainer = props.deterministicId!(
      'TopNavBarSmallViewportLayout-trayContainer'
    )
    this._menuId = props.deterministicId!('TopNavBarSmallViewportLayout-menu')
    this._drilldownId = props.deterministicId!(
      'TopNavBarSmallViewportLayout-drilldown'
    )
    this._separatorId = props.deterministicId!(
      'TopNavBarSmallViewportLayout-separator'
    )

    this.state = {
      isDropdownMenuOpen: false,
      menuBottomPosition: px(props.styles?.navbarHeight || 0)
    }
  }

  componentDidMount() {
    this.props.makeStyles?.(this.makeStylesVariables)
    this.updateMenuBottomPosition()
  }

  componentDidUpdate() {
    this.props.makeStyles?.(this.makeStylesVariables)
  }

  get makeStylesVariables(): TopNavBarSmallViewportLayoutStyleProps {
    return {
      drilldownId: this._drilldownId,
      menuBottomPosition: this.state.menuBottomPosition
    }
  }

  get mappedUserOptions() {
    return mapItemsForDrilldown(this.props.renderUser?.props.children)
  }

  get mappedMenuItemsOptions() {
    return mapItemsForDrilldown(this.props.renderMenuItems?.props.children)
  }

  get extractDrilldownSubpages() {
    const subPages = [...this.mappedUserOptions, ...this.mappedMenuItemsOptions]
      .map((option) => option.submenuPages)
      .filter((submenu) => !!submenu) as DrilldownPageChild[][]

    return subPages.flat()
  }

  updateMenuBottomPosition() {
    const boundingRect = getBoundingClientRect(this.ref)
    this.setState({
      menuBottomPosition: boundingRect.top + boundingRect.height
    })
  }

  toggleDropdownMenu() {
    const { isDropdownMenuOpen } = this.state

    if (!isDropdownMenuOpen) {
      this.updateMenuBottomPosition()
    }

    this.setState({ isDropdownMenuOpen: !isDropdownMenuOpen })
  }

  renderDrilldownOptions(mappedItems: MappedItem[]) {
    return mappedItems.map<DrilldownOptionChild>((mappedItem) => {
      const { optionData } = mappedItem
      return (
        <Drilldown.Option {...optionData} key={optionData.id}>
          {optionData.children}
        </Drilldown.Option>
      )
    })
  }

  renderDropdownMenuTrigger() {
    const { renderBrand } = this.props

    // TODO: brand and hamburger and chevron
    return (
      // TODO: toggle button with icons and logic
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
      <div
        style={{ display: 'flex', alignItems: 'center' }}
        onClick={() => this.toggleDropdownMenu()}
      >
        {renderBrand || `> Current page`}
      </div>
    )
  }

  renderDropdownMenu() {
    const { styles } = this.props

    return (
      <Drilldown
        id={this._drilldownId}
        rootPageId={this._menuId}
        width="100%"
        height={styles?.dropdownMenuHeight}
      >
        {[
          <Drilldown.Page id={this._menuId} key={this._menuId}>
            {[
              ...this.renderDrilldownOptions(this.mappedUserOptions),
              <Drilldown.Separator
                id={this._separatorId}
                key={this._separatorId}
              />,
              ...this.renderDrilldownOptions(this.mappedMenuItemsOptions)
            ]}
          </Drilldown.Page>,
          ...this.extractDrilldownSubpages
        ]}
      </Drilldown>
    )
  }

  render() {
    const { renderActionItems, trayMountNode, styles } = this.props

    return (
      <div
        {...omitProps(this.props, allowedProps)}
        ref={this.handleRef}
        css={styles?.topNavBarSmallViewportLayout}
      >
        <Global styles={styles?.globalStyles} />

        <div css={styles?.navbar}>
          {this.renderDropdownMenuTrigger()}
          {renderActionItems}
        </div>

        {/* TODO: solve positioning and sticky, mountnode, etc, user has to have control over where it is rendered */}
        {!trayMountNode && (
          <div css={styles?.trayContainer} id={this._trayContainer}></div>
        )}

        <Tray
          label={'label'} // TODO: label
          open={this.state.isDropdownMenuOpen}
          onDismiss={() => {
            this.setState({ isDropdownMenuOpen: false })
          }}
          shouldCloseOnDocumentClick
          placement="top"
          mountNode={
            trayMountNode || document.getElementById(this._trayContainer)
          }
          themeOverride={{ position: 'absolute' }}
        >
          {this.renderDropdownMenu()}
        </Tray>

        {/*{this.state.isDropdownMenuOpen && (*/}
        {/*  <div css={styles?.trayContainer}>{this.renderDropdownMenu()}</div>*/}
        {/*)}*/}
      </div>
    )
  }
}

export { TopNavBarSmallViewportLayout }
export default TopNavBarSmallViewportLayout
