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

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import keycode from 'keycode'

import Popover, { PopoverTrigger, PopoverContent } from '@instructure/ui-overlays/lib/components/Popover'

import createChainedFunction from '@instructure/ui-utils/lib/createChainedFunction'
import uid from '@instructure/ui-utils/lib/uid'
import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'
import LayoutPropTypes from '@instructure/ui-layout/lib/utils/LayoutPropTypes'
import { pickProps } from '@instructure/ui-utils/lib/react/passthroughProps'
import safeCloneElement from '@instructure/ui-utils/lib/react/safeCloneElement'
import themeable from '@instructure/ui-themeable'

import MenuList from '../MenuList'
import MenuItem from '../MenuItem'
import MenuItemFlyout from '../MenuItemFlyout'
import MenuItemGroup from '../MenuItemGroup'
import MenuItemSeparator from '../MenuItemSeparator'

import styles from './styles.css'
import theme from './theme'

/**
---
parent: Menu
---
**/

@themeable(theme, styles)
export default class MenuPopover extends Component {
  static propTypes = {
    /**
     * The trigger element
     */
    trigger: PropTypes.node.isRequired,
    /**
     * The placement of the menu in relation to the trigger
     */
    placement: LayoutPropTypes.placement,
    /**
     * children of type `MenuItem`, `MenuItemGroup`, or `MenuItemSeparator`
     */
    children: CustomPropTypes.Children.oneOf([MenuItem, MenuItemGroup, MenuItemSeparator, MenuItemFlyout]),
    /**
     * Whether or not the `<MenuPopover />` should be rendered on initial render.
     */
    defaultShow: PropTypes.bool,
    /**
     * Whether or not the `<MenuPopover />` is shown (should be accompanied by `onToggle`)
     */
    show: CustomPropTypes.controllable(PropTypes.bool, 'onToggle', 'defaultShow'),
    /**
     * Callback fired when the `<MenuPopover />` is toggled open/closed. When used with `show`,
     * the component will not control its own state.
     */
    onToggle: PropTypes.func,
    /**
     * Callback fired when a menu item within the `<MenuPopover />` is selected
     */
    onSelect: PropTypes.func,
    /**
     * Callback fired when the `<MenuPopover />` is dismissed
     */
    onDismiss: PropTypes.func,
    /**
     * Callback fired when trigger is focused
     */
    onFocus: PropTypes.func,
    onKeyDown: PropTypes.func,
    /**
     * A function that returns a reference to the content element
     */
    contentRef: PropTypes.func,
    /*
     * A function that returns a reference to the `<MenuList />`
     */
    menuRef: PropTypes.func,
    /**
     * A function that returns a reference to the `<Popover />`
     */
    popoverRef: PropTypes.func,
    /**
     * Should the trigger receive focus after close
     */
    shouldFocusTriggerOnClose: PropTypes.bool,
    /**
     * Should the `<MenuPopover />` display with an arrow pointing to the trigger
     */
    withArrow: PropTypes.bool,
    /**
     * The horizontal offset for the positioned menu
     */
    offsetX: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /**
     * The vertical offset for the positioned menu
     */
    offsetY: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /**
     * An element or a function returning an element to use as the mount node
     * for the `<MenuPopover />` (defaults to `document.body`)
     */
    mountNode: PropTypes.oneOfType([CustomPropTypes.element, PropTypes.func]),
    /**
     * An element, function returning an element, or array of elements that will not be hidden from
     * the screen reader when the `<MenuPopover />` is open
     */
    liveRegion: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element, PropTypes.func])
  }

  static defaultProps = {
    placement: 'bottom center',
    defaultShow: false,
    show: undefined,
    onToggle: show => {},
    onSelect: (event, value, selected) => {},
    onDismiss: (event, documentClick) => {},
    onFocus: event => {},
    onKeyDown: event => {},
    contentRef: el => {},
    menuRef: el => {},
    popoverRef: el => {},
    shouldFocusTriggerOnClose: true,
    withArrow: true,
    offsetX: 0,
    offsetY: 0,
    mountNode: null,
    liveRegion: null
  }

  constructor (props) {
    super(props)

    this._popover = null
    this._trigger = null
    this._menu = null
    this._labelId = `MenuPopover__${uid()}`
  }

  handleMenuSelect = (event, value, selected) => {
    this.hide(event)
    this.props.onSelect(event, value, selected)
  }

  handleMenuKeyDown = (event) => {
    if (event && event.keyCode === keycode.codes.tab) {
      // Persist this event so that we can still use it in the parent menu
      // if this instance of <MenuPopover /> is being used as a flyout
      event.persist()
      this.hide(event)
    }
  }

  handleFlyoutDismiss = (event, documentClick) => {
    if ((event && event.keyCode === keycode.codes.tab) || documentClick) {
      this.hide(event)
    }
  }

  hide = (event) => {
    if (this._popover) {
      this._popover.hide(event)
    }
  }

  focused () {
    return this._menu && this._menu.focused()
  }

  get focusedIndex () {
    return this._menu && this._menu.focusedIndex
  }

  render () {
    const {
      children,
      menuRef,
      popoverRef,
      onKeyDown
    } = this.props

    const menu = (
      <div className={styles.menu}>
        <MenuList
          labelledBy={this._labelId}
          onSelect={this.handleMenuSelect}
          onKeyDown={createChainedFunction(onKeyDown, this.handleMenuKeyDown)}
          onFlyoutDismiss={this.handleFlyoutDismiss}
          ref={el => {
            this._menu = el
            menuRef(el)
          }}
        >
          {children}
        </MenuList>
      </div>
    )

    return (
      <Popover
        {...pickProps(this.props, Popover.propTypes)}
        on={['click']}
        shouldContainFocus={true}
        shouldReturnFocus={true}
        ref={el => {
          this._popover = el
          popoverRef(el)
        }}
      >
        <PopoverTrigger>
          {safeCloneElement(this.props.trigger, {
            role: 'button',
            ref: el => { this._trigger = el },
            'aria-haspopup': true,
            id: this._labelId
          })}
        </PopoverTrigger>
        <PopoverContent aria-expanded={this.show}>
          {menu}
        </PopoverContent>
      </Popover>
    )
  }
}
