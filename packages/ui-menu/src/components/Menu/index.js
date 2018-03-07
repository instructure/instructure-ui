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

import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'
import LayoutPropTypes from '@instructure/ui-layout/lib/utils/LayoutPropTypes'
import { pickProps } from '@instructure/ui-utils/lib/react/passthroughProps'

import MenuPopover from './MenuPopover'
import MenuList from './MenuList'
import MenuItem from './MenuItem'
import MenuItemFlyout from './MenuItemFlyout'
import MenuItemGroup from './MenuItemGroup'
import MenuItemSeparator from './MenuItemSeparator'


/**
---
category: components/navigation
---
**/
export default class Menu extends Component {
  static propTypes = {
    /**
    * Children of type `MenuItem`
    */
    children: CustomPropTypes.Children.oneOf([
      MenuItem, MenuItemSeparator, MenuItemGroup, MenuItemFlyout
    ]),
    /**
    * The id of the element that contains the text description of the menu
    */
    labelledBy: PropTypes.string,
    /**
    * The id of the element that the menu items will act upon
    */
    controls: PropTypes.string,
    /**
    * A description of the menu
    */
    title: PropTypes.string,
    disabled: PropTypes.bool,
    /**
    * The trigger element. Declaring a trigger will create a menu in a popover.
    */
    trigger: PropTypes.node,
    /**
    * The placement of the popover
    */
    placement: LayoutPropTypes.placement,
    /**
    * Should the menu popover be shown by default
    */
    defaultShow: PropTypes.bool,
    /**
    * Is the menu open (should be accompanied by `onToggle`)
    */
    show: CustomPropTypes.controllable(PropTypes.bool, 'onToggle', 'defaultShow'),
    /**
     * A function that returns a reference to the content element
    */
    contentRef: PropTypes.func,
    /**
     * If a trigger is provided, a function that returns a reference to the popover
     */
    popoverRef: PropTypes.func,
    /**
    * Should the trigger receive focus after close
    */
    shouldFocusTriggerOnClose: PropTypes.bool,
    /**
     * An element or a function returning an element to use as the mount node for the `<Menu />`
     * when a trigger is provided (defaults to `document.body`)
     */
    mountNode: PropTypes.oneOfType([CustomPropTypes.element, PropTypes.func]),
    /**
     * An element, function returning an element, or array of elements that will not be hidden from
     * the screen reader when a trigger is provided and the `<Menu />` is open
     */
    liveRegion: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element, PropTypes.func]),
    /**
    * Call this function when a menu item is selected (note: value argument will default to the index)
    */
    onSelect: PropTypes.func,
    /**
    * Call this function when the menu popover is dismissed (via ESC, TAB key or item selected)
    */
    onDismiss: PropTypes.func,
    /**
    * Only applicable with a MenuPopover. Call this function when the menu is toggled open/closed. When used with `show`,
    * the component will not control its own state.
    */
    onToggle: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyUp: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func
  }

  static defaultProps = {
    trigger: null,
    disabled: false,
    onKeyDown: function (e) {},
    onKeyUp: function (e) {},
    onDismiss: function (e) {},
    onFocus: function (e) {},
    onBlur: function (e) {},
    onSelect: function (e, value, selected) {}
  }

  focus () {
    this._subComponent && this._subComponent.focus()
  }

  focused () {
    return this._subComponent && this._subComponent.focused()
  }

  get focusedIndex () {
    return this._subComponent && this._subComponent.focusedIndex
  }

  get show () {
    if (this._subComponent && this._subComponent._popover) {
      return this._subComponent._popover.shown
    }
  }

  handleRef = node => {
    this._subComponent = node
  }

  render () {
    const { show, ...props } = this.props
    if (this.props.trigger) {
      return (
        <MenuPopover
          {...pickProps(props, MenuPopover.propTypes)}
          show={show}
          ref={this.handleRef}
        />
      )
    } else {
      return (
        <MenuList
          {...pickProps(props, MenuList.propTypes)}
          ref={this.handleRef}
        />
      )
    }
  }
}

export { default as MenuItem } from './MenuItem'
export { default as MenuList } from './MenuList'
export { default as MenuPopover } from './MenuPopover'
export { default as MenuItemGroup } from './MenuItemGroup'
export { default as MenuItemSeparator } from './MenuItemSeparator'
export { default as MenuItemFlyout } from './MenuItemFlyout'
