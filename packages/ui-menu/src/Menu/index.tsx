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
import React, { Children, Component, ReactElement } from 'react'
import keycode from 'keycode'

import { Popover } from '@instructure/ui-popover'
import {
  safeCloneElement,
  matchComponentTypes,
  withSSR
} from '@instructure/ui-react-utils'
import { logError as error } from '@instructure/console'
import { containsActiveElement } from '@instructure/ui-dom-utils'
import { testable } from '@instructure/ui-testable'
import { generateId } from '@instructure/ui-utils'

import { MenuContext } from '../MenuContext'
import { MenuItem } from './MenuItem'
import type { MenuItemProps } from './MenuItem/props'
import { MenuItemGroup } from './MenuItemGroup'
import type { MenuGroupProps } from './MenuItemGroup/props'
import { MenuItemSeparator } from './MenuItemSeparator'
import type { MenuSeparatorProps } from './MenuItemSeparator/props'
import { withStyle, jsx } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'

import { propTypes, allowedProps } from './props'
import type { MenuProps } from './props'

type MenuChild = React.ComponentElement<MenuProps, Menu>
type MenuItemChild = React.ComponentElement<MenuItemProps, MenuItem>
type MenuGroupChild = React.ComponentElement<MenuGroupProps, MenuItemGroup>
type MenuSeparatorChild = React.ComponentElement<
  MenuSeparatorProps,
  MenuItemSeparator
>

/**
---
category: components
---
@tsProps
**/
@withSSR()
@withStyle(generateStyle, generateComponentTheme)
@testable()
class Menu extends Component<MenuProps> {
  static readonly componentId = 'Menu'
  static propTypes = propTypes
  static allowedProps = allowedProps
  static defaultProps = {
    label: null,
    disabled: false,
    trigger: null,
    placement: 'bottom center',
    defaultShow: false,
    mountNode: null,
    constrain: 'window',
    shouldHideOnSelect: true,
    shouldFocusTriggerOnClose: true,
    withArrow: true,
    offsetX: 0,
    offsetY: 0
  }

  static Item = MenuItem
  static Group = MenuItemGroup
  static Separator = MenuItemSeparator

  state = { hasFocus: false }
  _rootNode = null
  _menuItems: MenuItem[] = []
  _popover: Popover | null = null
  _trigger: MenuItem | (React.ReactInstance & { focus?: () => void }) | null =
    null
  _menu: HTMLUListElement | null = null
  //@ts-expect-error ssr
  _labelId = generateId('Menu__label', this.props.instanceMapCounter)

  _activeSubMenu?: Menu | null
  _id: string

  ref: Element | null = null

  handleRef = (el: HTMLUListElement | null) => {
    const { menuRef } = this.props
    this._menu = el
    if (typeof menuRef === 'function') {
      menuRef(el)
    }
  }

  constructor(props: MenuProps) {
    super(props)
    //@ts-expect-error ssr

    this._id = this.props.id || generateId('Menu', props.instanceMapCounter)
  }
  componentDidMount() {
    this.props.makeStyles?.()
  }

  componentDidUpdate() {
    this.props.makeStyles?.()
  }

  static contextType = MenuContext

  registerMenuItem = (item: MenuItem) => {
    this._menuItems.push(item)
  }

  removeMenuItem = (item: MenuItem) => {
    const index = this.getMenuItemIndex(item)
    error(index >= 0, '[Menu] Could not find registered menu item.')
    if (index >= 0) {
      this._menuItems.splice(index, 1)
    }
  }

  get menuItems() {
    return this._menuItems
  }

  getMenuItemIndex = (item: MenuItem) => {
    return this._menuItems.findIndex((i) => i === item)
  }

  handleTriggerKeyDown = (event: React.KeyboardEvent) => {
    if (this.props.type === 'flyout' && event.keyCode === keycode.codes.right) {
      event.persist()
      this.show(event)
    }
  }

  handleTriggerMouseOver = (event: React.MouseEvent) => {
    if (this.props.type === 'flyout') {
      this.show(event)
    }
  }

  handleToggle = (shown: boolean) => {
    if (typeof this.props.onToggle === 'function') {
      this.props.onToggle(shown, this)
    }
  }

  handleMenuKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
    const key = event && event.keyCode
    const { down, up, tab, left } = keycode.codes
    const pgdn = keycode.codes['page down']
    const pgup = keycode.codes['page up']

    if (key === down || key === pgdn) {
      event.preventDefault()
      event.stopPropagation()
      this.moveFocus(1)
      this.hideActiveSubMenu(event)
    } else if (key === up || key === pgup) {
      event.preventDefault()
      event.stopPropagation()
      this.moveFocus(-1)
      this.hideActiveSubMenu(event)
    } else if (key === tab || key === left) {
      event.persist()
      this.hide(event)
    }

    if (typeof this.props.onKeyDown === 'function') {
      this.props.onKeyDown(event)
    }
  }

  handleMenuItemSelect: MenuProps['onSelect'] = (
    event,
    value,
    selected,
    item
  ) => {
    if (this.props.shouldHideOnSelect) {
      this.hide(event)
    }

    if (typeof this.props.onSelect === 'function') {
      this.props.onSelect(event, value, selected, item)
    }
  }

  handleMenuItemFocus = () => {
    this.setState({ hasFocus: true })
  }

  handleMenuItemBlur = () => {
    this.setState({ hasFocus: this.focusedIndex >= 0 })
  }

  handleMenuItemMouseOver: MenuItemProps['onMouseOver'] = (event, menuItem) => {
    if (this._activeSubMenu && menuItem !== this._activeSubMenu._trigger) {
      this.hideActiveSubMenu(event)
    }
  }

  hideActiveSubMenu = (event: React.MouseEvent | React.KeyboardEvent) => {
    if (this._activeSubMenu) {
      this._activeSubMenu.hide(event)
      this._activeSubMenu = null
    }
  }

  handleSubMenuToggle: MenuProps['onToggle'] = (shown, subMenu) => {
    if (shown) {
      this._activeSubMenu = subMenu
    }
  }

  handleSubMenuDismiss = (
    event: React.UIEvent | React.FocusEvent,
    documentClick: boolean
  ) => {
    if (
      (event && (event as React.KeyboardEvent).keyCode === keycode.codes.tab) ||
      documentClick
    ) {
      this.hide(event)
    }
  }

  hide = (event: React.UIEvent | React.FocusEvent) => {
    if (this._popover) {
      this._popover.hide(event)
    }
  }

  show = (event: React.MouseEvent | React.KeyboardEvent) => {
    if (this._popover) {
      this._popover.show(event)
    }
  }

  focus() {
    if (this.shown) {
      error(!!this._menu?.focus, '[Menu] Could not focus the menu.')
      this._menu!.focus()
    } else {
      error(!!this._trigger?.focus, '[Menu] Could not focus the trigger.')
      this._trigger!.focus!()
    }
  }

  focused() {
    if (this.shown) {
      return containsActiveElement(this._menu) || this.state.hasFocus
    } else {
      return containsActiveElement(this._trigger)
    }
  }

  get focusedIndex() {
    return this.menuItems.findIndex((item) => {
      return item && item.focused === true
    })
  }

  moveFocus(step: number) {
    const count = this.menuItems ? this.menuItems.length : 0

    if (count <= 0) {
      return
    }

    const current = this.focusedIndex < 0 && step < 0 ? 0 : this.focusedIndex

    const nextItem = this.menuItems[(current + count + step) % count]

    error(
      typeof nextItem !== 'undefined' && typeof nextItem.focus !== 'undefined',
      '[Menu] Could not focus next menu item.'
    )

    nextItem.focus()
  }

  get shown() {
    return this._popover ? this._popover.shown : true
  }

  renderChildren() {
    const { children, disabled } = this.props

    let count = 0

    return Children.map(
      children as
        | MenuChild
        | MenuItemChild
        | MenuGroupChild
        | MenuSeparatorChild,
      (child) => {
        if (
          !matchComponentTypes(child, [
            'MenuItemSeparator',
            'MenuItem',
            'MenuItemGroup',
            'Menu'
          ])
        ) {
          return
        }

        count += 1

        const isTabbable = !this.state.hasFocus && count === 1

        if (
          matchComponentTypes<MenuSeparatorChild>(child, ['MenuItemSeparator'])
        ) {
          return <li role="none">{child}</li>
        }

        const menuItemChild = child

        const controls =
          menuItemChild.props['aria-controls'] ||
          menuItemChild.props.controls ||
          this.props['aria-controls'] ||
          this.props.controls

        if (matchComponentTypes<MenuItemChild>(child, ['MenuItem'])) {
          return (
            <li role="none">
              {safeCloneElement(child, {
                controls,
                children: child.props.children,
                disabled: disabled || child.props.disabled,
                onFocus: this.handleMenuItemFocus,
                onBlur: this.handleMenuItemBlur,
                onSelect: this.handleMenuItemSelect,
                onMouseOver: this.handleMenuItemMouseOver,
                tabIndex: isTabbable ? 0 : -1
              })}
            </li>
          )
        }

        if (matchComponentTypes<MenuGroupChild>(child, ['MenuItemGroup'])) {
          return (
            <li role="none">
              {safeCloneElement(child, {
                label: child.props.label,
                controls,
                disabled: disabled || child.props.disabled,
                onFocus: this.handleMenuItemFocus,
                onBlur: this.handleMenuItemBlur,
                onSelect: this.handleMenuItemSelect,
                onMouseOver: this.handleMenuItemMouseOver,
                isTabbable
              })}
            </li>
          )
        }

        if (matchComponentTypes(child, ['Menu'])) {
          const submenuDisabled = disabled || child.props.disabled

          return (
            <li role="none">
              {safeCloneElement(child, {
                type: 'flyout',
                controls,
                disabled: submenuDisabled,
                onSelect: this.handleMenuItemSelect,
                placement: 'end top',
                offsetX: -5,
                offsetY: 5,
                withArrow: false,
                onToggle: this.handleSubMenuToggle,
                onDismiss: this.handleSubMenuDismiss,
                trigger: (
                  <MenuItem
                    onMouseOver={this.handleMenuItemMouseOver}
                    onFocus={this.handleMenuItemFocus}
                    onBlur={this.handleMenuItemBlur}
                    tabIndex={isTabbable ? 0 : -1}
                    type="flyout"
                    disabled={submenuDisabled}
                  >
                    {child.props.title || child.props.label}
                  </MenuItem>
                )
              })}
            </li>
          )
        }
        return
      }
    )
  }

  renderMenu() {
    const { disabled, label, trigger, onKeyUp } = this.props

    const labelledBy = this.props['aria-labelledby']
    const controls = this.props['aria-controls']

    return (
      <MenuContext.Provider
        value={{
          removeMenuItem: this.removeMenuItem,
          registerMenuItem: this.registerMenuItem
        }}
      >
        <ul
          role="menu"
          aria-label={label}
          tabIndex={0}
          css={this.props.styles?.menu}
          aria-labelledby={labelledBy || (trigger ? this._labelId : undefined)}
          aria-controls={controls}
          aria-disabled={disabled ? 'true' : undefined}
          onKeyDown={this.handleMenuKeyDown}
          onKeyUp={onKeyUp}
          ref={this.handleRef}
        >
          {this.renderChildren()}
        </ul>
      </MenuContext.Provider>
    )
  }

  render() {
    const {
      show,
      defaultShow,
      placement,
      withArrow,
      trigger,
      mountNode,
      popoverRef,
      disabled,
      onDismiss,
      onFocus,
      onMouseOver,
      offsetX,
      offsetY
    } = this.props

    return trigger ? (
      <Popover
        isShowingContent={show}
        defaultIsShowingContent={defaultShow}
        onHideContent={(event, { documentClick }) => {
          if (typeof onDismiss === 'function') {
            onDismiss(event, documentClick)
          }
          this.handleToggle(false)
        }}
        onShowContent={() => this.handleToggle(true)}
        mountNode={mountNode}
        placement={placement}
        withArrow={withArrow}
        id={this._id}
        on={['click']}
        shouldContainFocus
        shouldReturnFocus
        onFocus={onFocus}
        onMouseOver={onMouseOver}
        offsetX={offsetX}
        offsetY={offsetY}
        ref={(el) => {
          this._popover = el
          if (typeof popoverRef === 'function') {
            popoverRef(el)
          }
        }}
        renderTrigger={safeCloneElement(trigger as ReactElement, {
          ref: (el: (React.ReactInstance & { ref?: Element }) | null) => {
            this._trigger = el
            this.ref = el?.ref || (el as Element)
          },
          'aria-haspopup': true,
          id: this._labelId,
          onMouseOver: this.handleTriggerMouseOver,
          onKeyDown: this.handleTriggerKeyDown,
          disabled: (trigger as ReactElement).props.disabled || disabled
        })}
      >
        {this.renderMenu()}
      </Popover>
    ) : (
      this.renderMenu()
    )
  }
}

export default Menu
export { Menu, MenuItem, MenuItemGroup, MenuItemSeparator }
