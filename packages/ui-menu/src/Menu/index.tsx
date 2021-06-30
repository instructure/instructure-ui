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
import { Children, Component, ReactElement } from 'react'
import PropTypes from 'prop-types'
import keycode from 'keycode'

import { Popover } from '@instructure/ui-popover'
import { uid } from '@instructure/uid'
import {
  controllable,
  Children as ChildrenPropTypes
} from '@instructure/ui-prop-types'
import {
  PositionConstaint,
  PositionMountNode,
  PositionPlacement,
  PositionPropTypes
} from '@instructure/ui-position'
import {
  safeCloneElement,
  matchComponentTypes
} from '@instructure/ui-react-utils'
import { logError as error } from '@instructure/console'
import { containsActiveElement } from '@instructure/ui-dom-utils'
import { testable } from '@instructure/ui-testable'

import { MenuContext } from '../MenuContext'
import { MenuItem } from './MenuItem'
import { MenuItemGroup } from './MenuItemGroup'
import { MenuItemSeparator } from './MenuItemSeparator'
import { withStyle, jsx } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'

type Props = {
  makeStyles?: (...args: any[]) => any
  styles?: any
  label?: string
  disabled?: boolean
  trigger?: React.ReactNode
  placement?: PositionPlacement
  defaultShow?: boolean
  show?: any // TODO: controllable(PropTypes.bool, 'onToggle', 'defaultShow')
  onToggle?: (...args: any[]) => any
  onSelect?: (...args: any[]) => any
  onDismiss?: (...args: any[]) => any
  onBlur?: (...args: any[]) => any
  onFocus?: (...args: any[]) => any
  onMouseOver?: (...args: any[]) => any
  onKeyDown?: (...args: any[]) => any
  onKeyUp?: (...args: any[]) => any
  menuRef?: (...args: any[]) => any
  popoverRef?: (...args: any[]) => any
  mountNode?: PositionMountNode
  constrain?: PositionConstaint
  liveRegion?:
    | React.ReactElement[]
    | React.ReactElement
    | ((...args: any[]) => any)
  shouldHideOnSelect?: boolean
  shouldFocusTriggerOnClose?: boolean
  type?: 'flyout'
  id?: string
  withArrow?: boolean
  offsetX?: string | number
  offsetY?: string | number
}

/**
---
category: components
---
**/
@withStyle(generateStyle, generateComponentTheme)
@testable()
class Menu extends Component<Props> {
  static componentId = 'Menu'

  static propTypes = {
    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object,
    /**
     * Children of type `Menu.Item`, `Menu.Group`, `Menu.Separator`, or `Menu`
     */
    children: ChildrenPropTypes.oneOf([
      'MenuItem',
      'MenuItemGroup',
      'MenuItemSeparator',
      'Menu'
    ]),
    /**
     * Description of the `<Menu />`
     */
    label: PropTypes.string,
    /**
     * Is the `<Menu />` disabled
     */
    disabled: PropTypes.bool,
    /**
     * The trigger element, if the `<Menu />` is to render as a popover
     */
    trigger: PropTypes.node,
    /**
     * If a trigger is supplied, where should the `<Menu />` be placed (relative to the trigger)
     */
    placement: PositionPropTypes.placement,
    /**
     * Should the `<Menu />` be open for the initial render
     */
    defaultShow: PropTypes.bool,
    /**
     * Is the `<Menu />` open (should be accompanied by `onToggle`)
     */
    show: controllable(PropTypes.bool, 'onToggle', 'defaultShow'),
    /**
     * Callback fired when the `<Menu />` is toggled open/closed. When used with `show`,
     * the component will not control its own state.
     */
    onToggle: PropTypes.func,
    /**
     * Callback fired when an item within the `<Menu />` is selected
     */
    onSelect: PropTypes.func,
    /**
     * If a trigger is supplied, callback fired when the `<Menu />` is closed
     */
    onDismiss: PropTypes.func,
    /**
     * If a trigger is supplied, callback fired when the `<Menu />` trigger is blurred
     */
    onBlur: PropTypes.func,
    /**
     * If a trigger is supplied, callback fired when the `<Menu />` trigger is focused
     */
    onFocus: PropTypes.func,
    /**
     * If a trigger is supplied, callback fired onMouseOver for the `<Menu />` trigger
     */
    onMouseOver: PropTypes.func,
    /**
     * Callback fired on the onKeyDown of the `<Menu />`
     */
    onKeyDown: PropTypes.func,
    /**
     * Callback fired on the onKeyUp of the `<Menu />`
     */
    onKeyUp: PropTypes.func,
    /*
     * A function that returns a reference to the `<Menu />`
     */
    menuRef: PropTypes.func,
    /**
     * A function that returns a reference to the `<Popover />`
     */
    popoverRef: PropTypes.func,
    /**
     * If a trigger is supplied, an element or a function returning an element to use as the mount node
     * for the `<Menu />` (defaults to `document.body`)
     */
    mountNode: PositionPropTypes.mountNode,
    /**
     * The parent in which to constrain the menu.
     * One of: 'window', 'scroll-parent', 'parent', 'none', an element,
     * or a function returning an element
     */
    constrain: PositionPropTypes.constrain,
    /**
     * If a trigger is supplied, an element, function returning an element, or array of elements that will not
     * be hidden from the screen reader when the `<Menu />` is open
     */
    liveRegion: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.element),
      PropTypes.element,
      PropTypes.func
    ]),
    /**
     * If a trigger is supplied, should the `<Menu />` hide when an item is selected
     */
    shouldHideOnSelect: PropTypes.bool,
    /**
     * If a trigger is supplied, should the `<Menu />` focus the trigger on after closing
     */
    shouldFocusTriggerOnClose: PropTypes.bool,
    /**
     * The type of `<Menu />`
     */
    type: PropTypes.oneOf(['flyout']),
    id: PropTypes.string,
    /**
     * Whether or not an arrow pointing to the trigger should be rendered
     */
    withArrow: PropTypes.bool,
    /**
     * The horizontal offset for the positioned content.
     * Works only if `trigger` is provided.
     */
    offsetX: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /**
     * The vertical offset for the positioned content.
     * Works only if `trigger` is provided.
     */
    offsetY: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }

  static defaultProps = {
    children: null,
    label: null,
    disabled: false,
    trigger: null,
    placement: 'bottom center',
    defaultShow: false,
    // @ts-expect-error ts-migrate(6133) FIXME: 'shown' is declared but its value is never read.
    onToggle: (shown, menu) => {},
    // @ts-expect-error ts-migrate(6133) FIXME: 'event' is declared but its value is never read.
    onSelect: (event, value, selected, item) => {},
    // @ts-expect-error ts-migrate(6133) FIXME: 'event' is declared but its value is never read.
    onDismiss: (event, documentClick) => {},
    // @ts-expect-error ts-migrate(6133) FIXME: 'event' is declared but its value is never read.
    onBlur: (event) => {},
    // @ts-expect-error ts-migrate(6133) FIXME: 'event' is declared but its value is never read.
    onFocus: (event) => {},
    // @ts-expect-error ts-migrate(6133) FIXME: 'event' is declared but its value is never read.
    onMouseOver: (event) => {},
    // @ts-expect-error ts-migrate(6133) FIXME: 'event' is declared but its value is never read.
    onKeyDown: (event) => {},
    // @ts-expect-error ts-migrate(6133) FIXME: 'event' is declared but its value is never read.
    onKeyUp: (event) => {},
    // @ts-expect-error ts-migrate(6133) FIXME: 'el' is declared but its value is never read.
    menuRef: (el) => {},
    // @ts-expect-error ts-migrate(6133) FIXME: 'el' is declared but its value is never read.
    popoverRef: (el) => {},
    mountNode: null,
    constrain: 'window',
    liveRegion: null,
    shouldHideOnSelect: true,
    shouldFocusTriggerOnClose: true,
    show: undefined,
    id: undefined,
    type: undefined,
    withArrow: true,
    offsetX: 0,
    offsetY: 0
  }

  static Item = MenuItem
  static Group = MenuItemGroup
  static Separator = MenuItemSeparator

  state = { hasFocus: false }
  _rootNode = null
  _menuItems = []
  _popover = null
  _trigger = null
  _menu = null
  _labelId = uid('Menu__label')
  _activeSubMenu = null

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
  constructor(props) {
    super(props)
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_id' does not exist on type 'Menu'.
    this._id = this.props.id || uid('Menu')
  }

  componentDidMount() {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles()
  }

  // @ts-expect-error ts-migrate(6133) FIXME: 'prevProps' is declared but its value is never rea... Remove this comment to see the full error message
  componentDidUpdate(prevProps) {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles()
  }

  static contextType = MenuContext

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
  registerMenuItem = (item) => {
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'any' is not assignable to parame... Remove this comment to see the full error message
    this._menuItems.push(item)
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
  removeMenuItem = (item) => {
    const index = this.getMenuItemIndex(item)
    error(index >= 0, '[Menu] Could not find registered menu item.')
    if (index >= 0) {
      this._menuItems.splice(index, 1)
    }
  }

  get menuItems() {
    return this._menuItems
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
  getMenuItemIndex = (item) => {
    return this._menuItems.findIndex((i) => i === item)
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
  handleTriggerKeyDown = (event) => {
    if (this.props.type === 'flyout' && event.keyCode === keycode.codes.right) {
      event.persist()
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
      this.show()
    }
  }

  handleTriggerMouseOver = () => {
    if (this.props.type === 'flyout') {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
      this.show()
    }
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'shown' implicitly has an 'any' type.
  handleToggle = (shown) => {
    if (typeof this.props.onToggle === 'function') {
      this.props.onToggle(shown, this)
    }
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
  handleMenuKeyDown = (event) => {
    const key = event && event.keyCode
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'pgup' does not exist on type 'CodesMap'.
    const { down, up, pgup, pgdn, tab, left } = keycode.codes

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

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
  handleMenuItemSelect = (event, value, selected, item) => {
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

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
  handleMenuItemMouseOver = (event, menuItem) => {
    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    if (this._activeSubMenu && menuItem !== this._activeSubMenu._trigger) {
      this.hideActiveSubMenu(event)
    }
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
  hideActiveSubMenu = (event) => {
    if (this._activeSubMenu) {
      // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
      this._activeSubMenu.hide(event)
      this._activeSubMenu = null
    }
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'shown' implicitly has an 'any' type.
  handleSubMenuToggle = (shown, subMenu) => {
    if (shown) {
      this._activeSubMenu = subMenu
    }
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
  handleSubMenuDismiss = (event, documentClick) => {
    if ((event && event.keyCode === keycode.codes.tab) || documentClick) {
      this.hide(event)
    }
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
  hide = (event) => {
    if (this._popover) {
      // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
      this._popover.hide(event)
    }
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
  show = (event) => {
    if (this._popover) {
      // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
      this._popover.show(event)
    }
  }

  focus() {
    if (this.shown) {
      // @ts-expect-error ts-migrate(2555) FIXME: Expected at least 5 arguments, but got 2.
      error(this._menu && this._menu.focus, '[Menu] Could not focus the menu.')
      // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
      this._menu.focus()
    } else {
      error(
        // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
        this._trigger && this._trigger.focus,
        '[Menu] Could not focus the trigger.'
      )
      // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
      this._trigger.focus()
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
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'focused' does not exist on type 'never'.
      return item && item.focused === true
    })
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'step' implicitly has an 'any' type.
  moveFocus(step) {
    const count = this.menuItems ? this.menuItems.length : 0

    if (count <= 0) {
      return
    }

    const current = this.focusedIndex < 0 && step < 0 ? 0 : this.focusedIndex

    const nextItem = this.menuItems[(current + count + step) % count]

    // @ts-expect-error ts-migrate(2555) FIXME: Expected at least 5 arguments, but got 2.
    error(nextItem && nextItem.focus, '[Menu] Could not focus next menu item.')

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'focus' does not exist on type 'never'.
    nextItem.focus()
  }

  get shown() {
    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    return this._popover ? this._popover.shown : true
  }

  renderChildren() {
    const { children, disabled } = this.props

    let count = 0

    // @ts-expect-error ts-migrate(7030) FIXME: Not all code paths return a value.
    return Children.map(children, (child) => {
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

      if (matchComponentTypes(child, ['MenuItemSeparator'])) {
        return <li role="none">{child}</li>
      }

      const controls =
        // @ts-expect-error ts-migrate(2533) FIXME: Object is possibly 'null' or 'undefined'.
        child.props['aria-controls'] ||
        // @ts-expect-error ts-migrate(2533) FIXME: Object is possibly 'null' or 'undefined'.
        child.props.controls ||
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        this.props['aria-controls'] || // eslint-disable-line react/prop-types
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'controls' does not exist on type 'Readon... Remove this comment to see the full error message
        this.props.controls // eslint-disable-line react/prop-types

      if (matchComponentTypes(child, ['MenuItem'])) {
        return (
          <li role="none">
            {safeCloneElement(child as ReactElement, {
              controls,
              // @ts-expect-error ts-migrate(2533) FIXME: Object is possibly 'null' or 'undefined'.
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

      if (matchComponentTypes(child, ['MenuItemGroup'])) {
        return (
          <li role="none">
            {safeCloneElement(child as ReactElement, {
              controls,
              // @ts-expect-error ts-migrate(2533) FIXME: Object is possibly 'null' or 'undefined'.
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
        // @ts-expect-error ts-migrate(2533) FIXME: Object is possibly 'null' or 'undefined'.
        const submenuDisabled = disabled || child.props.disabled

        return (
          <li role="none">
            {safeCloneElement(child as ReactElement, {
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
                  // @ts-expect-error ts-migrate(2322) FIXME: Type '{ children: any; onMouseOver: (event: any, m... Remove this comment to see the full error message
                  onFocus={this.handleMenuItemFocus}
                  onBlur={this.handleMenuItemBlur}
                  tabIndex={isTabbable ? 0 : -1}
                  type="flyout"
                  disabled={submenuDisabled}
                >
                  {/* @ts-expect-error ts-migrate(2533) FIXME: Object is possibly 'null' or 'undefined'. */}
                  {child.props.title || child.props.label}
                </MenuItem>
              )
            })}
          </li>
        )
      }
    })
  }

  renderMenu() {
    const {
      menuRef,
      disabled,
      label,
      trigger,
      onKeyUp,
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'contentRef' does not exist on type 'Read... Remove this comment to see the full error message
      contentRef // eslint-disable-line react/prop-types
    } = this.props

    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    const labelledBy = this.props['aria-labelledby'] // eslint-disable-line react/prop-types
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    const controls = this.props['aria-controls'] // eslint-disable-line react/prop-types

    return (
      <MenuContext.Provider
        value={{
          // @ts-expect-error ts-migrate(2322) FIXME: Type '(item: any) => void' is not assignable to ty... Remove this comment to see the full error message
          removeMenuItem: this.removeMenuItem,
          // @ts-expect-error ts-migrate(2322) FIXME: Type '(item: any) => void' is not assignable to ty... Remove this comment to see the full error message
          registerMenuItem: this.registerMenuItem
        }}
      >
        <ul
          role="menu"
          aria-label={label}
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'number | ... Remove this comment to see the full error message
          tabIndex="0"
          css={this.props.styles.menu}
          aria-labelledby={labelledBy || (trigger && this._labelId)}
          aria-controls={controls}
          // @ts-expect-error ts-migrate(2322) FIXME: Type '"true" | null' is not assignable to type 'bo... Remove this comment to see the full error message
          aria-disabled={disabled ? 'true' : null}
          onKeyDown={this.handleMenuKeyDown}
          onKeyUp={onKeyUp}
          ref={(el) => {
            // @ts-expect-error ts-migrate(2322) FIXME: Type 'HTMLUListElement | null' is not assignable t... Remove this comment to see the full error message
            this._menu = el
            if (typeof menuRef === 'function') {
              menuRef(el)
            }
            if (typeof contentRef === 'function') {
              contentRef(el)
            }
          }}
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
          // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
          onDismiss(event, documentClick)
          this.handleToggle(false)
        }}
        onShowContent={() => this.handleToggle(true)}
        mountNode={mountNode}
        placement={placement}
        withArrow={withArrow}
        // @ts-expect-error ts-migrate(2339) FIXME: Property '_id' does not exist on type 'Menu'.
        id={this._id}
        on={['click']}
        shouldContainFocus
        shouldReturnFocus
        onFocus={onFocus}
        onMouseOver={onMouseOver}
        offsetX={offsetX}
        offsetY={offsetY}
        ref={(el) => {
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'Popover | null' is not assignable to type 'n... Remove this comment to see the full error message
          this._popover = el
          if (typeof popoverRef === 'function') {
            popoverRef(el)
          }
        }}
        renderTrigger={safeCloneElement(trigger as ReactElement, {
          // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'el' implicitly has an 'any' type.
          ref: (el) => {
            this._trigger = el
          },
          'aria-haspopup': true,
          id: this._labelId,
          onMouseOver: this.handleTriggerMouseOver,
          onKeyDown: this.handleTriggerKeyDown,
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type 'string | ... Remove this comment to see the full error message
          disabled: trigger.props.disabled || disabled
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
