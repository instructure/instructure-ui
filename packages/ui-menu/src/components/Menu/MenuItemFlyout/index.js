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

import isActiveElement from '@instructure/ui-utils/lib/dom/isActiveElement'
import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'
import { omitProps } from '@instructure/ui-utils/lib/react/passthroughProps'

import MenuItem from '../MenuItem'
import MenuItemGroup from '../MenuItemGroup'
import MenuItemSeparator from '../MenuItemSeparator'
import { MenuPopover } from '../../Menu'

/**
---
parent: Menu
---
**/
export default class MenuItemFlyout extends Component {
  static propTypes = {
    label: PropTypes.node.isRequired,
    /**
     * children of type `MenuItem`, `MenuItemSeparator`, and `MenuItemGroup`
     */
    children: CustomPropTypes.Children.oneOf([MenuItem, MenuItemSeparator, MenuItemGroup]),
    disabled: PropTypes.bool,
    /**
     * call this function when menu flyout is closed
     */
    onDismiss: PropTypes.func,
    /**
     * call this function when a menu flyout item is selected
     */
    onSelect: PropTypes.func,
    /**
     * call this function when a menu flyout item is toggled
     */
    onToggle: PropTypes.func,
    /**
     * call this function when mouse is over the menu flyout trigger
     */
    onMouseOver: PropTypes.func,
    /**
     * A function that returns a reference to the flyout content
     */
    contentRef: PropTypes.func,
    /**
     * the id of the element that the menu items within flyout will act upon
     */
    controls: PropTypes.string,
    /**
     * the id of the element that contains the text description of the menu flyout
     */
    labelledBy: PropTypes.string,
    title: PropTypes.string
  }

  static defaultProps = {
    disabled: false,
    onDismiss: (event, documentClick) => {},
    onSelect: (event, value, selected) => {},
    onToggle: (show, flyout) => {},
    onMouseOver: event => {},
    contentRef: el => {},
    controls: null,
    labelledBy: null,
    title: null
  }

  _popover = null
  _menu = null
  _trigger = null

  focus () {
    this._trigger && this._trigger.focus()
  }

  get focused () {
    return isActiveElement(this._trigger)
  }

  handleFlyoutToggle = (show) => {
    this.props.onToggle(show, this)
  }

  handleFlyoutKeyDown = (event) => {
    if (event && event.keyCode === keycode.codes.left) {
      event.persist()
      this.hide(event)
    }
  }

  handleTriggerMouseOver = (event) => {
    this.props.onMouseOver(event)
    this.show()
  }

  handleTriggerKeyDown = (event) => {
    if (event.keyCode === keycode.codes.right) {
      this.show()
    }
  }

  hide = (event) => {
    if (this._popover) {
      this._popover.hide(event)
    }
  }

  show = () => {
    if (this._popover) {
      this._popover.show()
    }
  }

  render () {
    const offset = {
      x: -5,
      y: 5
    }

    const {
      children,
      label,
      labelledBy,
      title,
      controls,
      disabled,
      onSelect,
      onDismiss,
      contentRef
    } = this.props

    // We need to pass the props down to the trigger so it can get the
    // tab index from the parent menu
    const props = omitProps(this.props, MenuItemFlyout.propTypes)

    return (
      <MenuPopover
        controls={controls}
        title={title}
        labelledBy={labelledBy}
        onSelect={onSelect}
        onDismiss={onDismiss}
        onToggle={this.handleFlyoutToggle}
        onKeyDown={this.handleFlyoutKeyDown}
        placement="end top"
        offsetX={offset.x}
        offsetY={offset.y}
        withArrow={false}
        popoverRef={el => {
          this._popover = el
        }}
        menuRef={el => {
          this._menu = el
          contentRef(el)
        }}
        trigger={
          <MenuItem // eslint-disable-line jsx-a11y/mouse-events-have-key-events
            {...props}
            type="flyout"
            ref={el => {
              this._trigger = el
            }}
            controls={controls}
            disabled={disabled}
            onMouseOver={this.handleTriggerMouseOver}
            onKeyDown={this.handleTriggerKeyDown}
          >
            {label}
          </MenuItem>
        }
      >
        {children}
      </MenuPopover>
    )
  }
}
