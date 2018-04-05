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

import Popover, { PopoverTrigger, PopoverContent } from '@instructure/ui-overlays/lib/components/Popover'

import generateElementId from '@instructure/ui-utils/lib/dom/generateElementId'
import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'
import LayoutPropTypes from '@instructure/ui-layout/lib/utils/LayoutPropTypes'
import { pickProps } from '@instructure/ui-utils/lib/react/passthroughProps'
import createChainedFunction from '@instructure/ui-utils/lib/createChainedFunction'
import safeCloneElement from '@instructure/ui-utils/lib/react/safeCloneElement'
import containsActiveElement from '@instructure/ui-utils/lib/dom/containsActiveElement'
import shallowEqual from '@instructure/ui-utils/lib/shallowEqual'
import requestAnimationFrame from '@instructure/ui-utils/lib/dom/requestAnimationFrame'
import themeable from '@instructure/ui-themeable'
import deprecated from '@instructure/ui-utils/lib/react/deprecated'

import Menu, { MenuItem, MenuItemGroup, MenuItemSeparator, MenuItemFlyout } from '../Menu'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components/navigation
---
**/

@deprecated('3.0.0', {
  focusTriggerOnClose: 'shouldFocusTriggerOnClose'
})
@deprecated('5.0.0', null, 'Use @instructure/ui-menu/src/components/Menu instead')
@themeable(theme, styles)
export default class PopoverMenu extends Component {
  static propTypes = {
    /**
    * the trigger element
    */
    trigger: PropTypes.node.isRequired,

    placement: LayoutPropTypes.placement,

    /**
    * children of type `MenuItem`, `MenuItemGroup`, or `MenuItemSeparator`
    */
    children: CustomPropTypes.Children.oneOf([MenuItem, MenuItemGroup, MenuItemSeparator, MenuItemFlyout]),
    /**
    * should the menu be open for the initial render
    */
    defaultShow: PropTypes.bool,

    /**
    * is the menu open (should be accompanied by `onToggle`)
    */
    show: CustomPropTypes.controllable(PropTypes.bool, 'onToggle', 'defaultShow'),

    /**
    * Call this function when the menu is toggled open/closed. When used with `show`,
    * the component will not control its own state.
    */
    onToggle: PropTypes.func,

    onSelect: PropTypes.func,
    onClose: PropTypes.func,
    onFocus: PropTypes.func,
    /**
     * A function that returns a reference to the content element
     */
    contentRef: PropTypes.func,
    /**
    * Should the trigger receive focus after close
    */
    shouldFocusTriggerOnClose: PropTypes.bool
  }

  static defaultProps = {
    placement: 'bottom center',
    defaultShow: false,
    contentRef: function (el) {},
    shouldFocusTriggerOnClose: true
  }

  constructor (props) {
    super()

    this.state = {}

    if (props.show === undefined) {
      this.state.show = props.defaultShow
    }

    this.labelId = generateElementId('PopoverMenu')
    this.raf = []
  }

  shouldComponentUpdate (nextProps, nextState) {
    return !(shallowEqual(this.props, nextProps) && shallowEqual(this.state, nextState))
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.props.show !== prevProps.show || this.state.show !== prevState.show) {
      this.maybeFocusTrigger()
    }
  }

  componentWillUnmount () {
    this._unmounted = true
    this.raf.forEach(request => {
      request.cancel()
    })
    this.raf = []
  }

  get show () {
    return this.props.show === undefined ? this.state.show : this.props.show
  }

  maybeFocusTrigger () {
    if (!this.show && this.props.shouldFocusTriggerOnClose) {
      this.focusTrigger()
    }
  }

  toggleShow (callback) {
    let show
    this.setState(
      (state, props) => {
        show = props.show === undefined ? !state.show : !props.show
        return { show }
      },
      () => {
        if (typeof callback === 'function') {
          callback()
        }

        if (typeof this.props.onToggle === 'function') {
          this.props.onToggle(show)
        }

        if (!show && typeof this.props.onClose === 'function') {
          this.props.onClose()
        }
      }
    )
  }

  handleToggle = show => {
    if (show !== this.show) {
      this.toggleShow()
    }
  }

  handleMenuDismiss = e => {
    this.toggleShow()
  }

  handleMenuSelect = (e, value, selected) => {
    this.toggleShow(args => {
      if (typeof this.props.onSelect === 'function') {
        this.props.onSelect(e, value, selected)
      }
    })
  }

  handleFocus = () => {
    // focus the menu on the next render
    this.focusMenu()
  }

  handlePopoverShown = () => {
    // Focus on Menu has to happen after it's been positioned or else
    // document will scroll to the bottom where Popover initially
    // inserts into the DOM.
    this.raf.push(
      requestAnimationFrame(() => {
        this.focusMenu()
      })
    )
  }

  focusMenu () {
    // Don't focus the menu if it already has focus
    if (this._unmounted || (this._menu && containsActiveElement(this._menu))) {
      return
    }

    if (this.show) {
      this._menu.focus()
    }
  }

  focusTrigger () {
    if (!this.show) {
      this._trigger.focus()
    }
  }

  focus () {
    if (this.show) {
      this.focusMenu()
    } else {
      this.focusTrigger()
    }
  }

  render () {
    const { onFocus, children } = this.props

    const menu = (
      <div className={styles.menu}>
        <Menu
          labelledBy={this.labelId}
          hidden={!this.show}
          ref={el => {
            this._menu = el
          }}
          onSelect={this.handleMenuSelect}
          onDismiss={this.handleMenuDismiss}
        >
          {children}
        </Menu>
      </div>
    )

    return (
      <Popover
        {...pickProps(this.props, Popover.propTypes)}
        show={this.show}
        on={['click']}
        onToggle={this.handleToggle}
        onFocus={createChainedFunction(onFocus, this.handleFocus)}
        onShow={this.handlePopoverShown}
        shouldCloseOnEscape={false}
      >
        <PopoverTrigger>
          {safeCloneElement(this.props.trigger, {
            role: 'button',
            tabIndex: 0,
            ref: c => {
              this._trigger = c
            },
            'aria-haspopup': true,
            id: this.labelId
          })}
        </PopoverTrigger>
        <PopoverContent aria-expanded={this.show}>
          {menu}
        </PopoverContent>
      </Popover>
    )
  }
}

export { MenuItem, MenuItemGroup, MenuItemSeparator, MenuItemFlyout } from '../Menu'
