import React, { Children, Component } from 'react'
import PropTypes from 'prop-types'
import keycode from 'keycode'

import themeable from '@instructure/ui-themeable'
import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'
import createChainedFunction from '@instructure/ui-utils/lib/createChainedFunction'
import safeCloneElement from '@instructure/ui-utils/lib/react/safeCloneElement'
import { omitProps } from '@instructure/ui-utils/lib/react/passthroughProps'
import matchComponentTypes from '@instructure/ui-utils/lib/react/matchComponentTypes'
import containsActiveElement from '@instructure/ui-utils/lib/dom/containsActiveElement'

import MenuItem from './MenuItem'
import MenuItemFlyout from './MenuItemFlyout'
import MenuItemGroup from './MenuItemGroup'
import MenuItemSeparator from './MenuItemSeparator'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components/navigation
---
  The `<Menu/>` component provides a list of actionable
  `<MenuItems/>`that are keyboard accessible. A `<Menu/>`
  is typically used in a `<Popover/>`, so you may be looking for the [PopoverMenu](#PopoverMenu) component.

  ```jsx_example
  <Menu labelledBy="foobar"
    onSelect={function () { console.log(arguments) }}
    onDismiss={function () { console.log(arguments) }}
  >
    <MenuItem href="example.html">Default (Grid view)</MenuItem>
    <MenuItem value="foo">Learning Mastery</MenuItem>
    <MenuItem disabled>Individual (List view)</MenuItem>
    <MenuItemSeparator />
    <MenuItemGroup label="Select one">
      <MenuItem defaultSelected value="one">
        Select me
      </MenuItem>
      <MenuItem value="two">
        Or select me
      </MenuItem>
    </MenuItemGroup>
    <MenuItemSeparator />
    <MenuItemFlyout label="More Options">
      <MenuItemGroup allowMultiple label="Select many">
        <MenuItem defaultSelected value="one">
          Select me
        </MenuItem>
        <MenuItem value="two">
          And select me
        </MenuItem>
        <MenuItem defaultSelected value="three">
          And me
        </MenuItem>
      </MenuItemGroup>
    </MenuItemFlyout>
    <MenuItem value="baz">Open grading history...</MenuItem>
  </Menu>
  ```
**/
@themeable(theme, styles)
class Menu extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    /**
    * children of type `MenuItem`
    */
    children: CustomPropTypes.Children.oneOf([
      MenuItem, MenuItemSeparator, MenuItemGroup, MenuItemFlyout
    ]),
    /**
    * the id of the element that contains the text description of the menu
    */
    labelledBy: PropTypes.string,
    /**
    * the id of the element that the menu items will act upon
    */
    controls: PropTypes.string,
    /**
    * a description of the menu
    */
    title: PropTypes.string,
    /**
    * sets aria-hidden
    */
    hidden: PropTypes.bool,
    disabled: PropTypes.bool,
    /**
    * call this function when a menu item is selected (note: value argument will default to the index)
    */
    onSelect: PropTypes.func,
    /**
    * call this function when the menu item is closed (via ESC, TAB key or item selected)
    */
    onDismiss: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyUp: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func
  }
  /* eslint-enable react/require-default-props */

  static defaultProps = {
    disabled: false,
    onKeyDown: function (e) {},
    onKeyUp: function (e) {},
    onDismiss: function (e) {},
    onFocus: function (e) {},
    onBlur: function (e) {},
    onSelect: function (e, value, selected) {}
  }

  state = {
    hasFocus: false
  }

  _menuitems = []
  _node = null
  _activeMenuItemFlyout = null

  componentWillUnmount () {
    delete this._activeMenuItemFlyout
  }

  handleKeyDown = (event) => {
    const key = event.keyCode
    const {
      down,
      up,
      tab,
      pgup,
      pgdn
    } = keycode.codes

    if (key === down || key === pgdn) {
      this.moveFocus(1)
      event.preventDefault()
      event.stopPropagation()
      this.hideActiveMenuItemFlyout()
    } else if (key === up || key === pgup) {
      this.moveFocus(-1)
      event.preventDefault()
      event.stopPropagation()
      this.hideActiveMenuItemFlyout()
    } else if (tab === key) {
      this.props.onDismiss(event)
    }
  }

  handleKeyUp = (event) => {
    if (event.keyCode === keycode.codes.esc) {
      event.preventDefault()
      this.props.onDismiss(event)
    }
  }

  handleItemFocus = () => this.setState({ hasFocus: true })

  handleItemBlur = () => this.setState({ hasFocus: this.focusedIndex >= 0 })

  focus () {
    this._node && this._node.focus()
  }

  focused () {
    return containsActiveElement(this._node) || this.state.hasFocus
  }

  get focusedIndex () {
    return this._menuitems.findIndex((item) => (item.focused === true))
  }

  moveFocus (step) {
    const items = this._menuitems
    const count = items ? items.length : 0

    if (count <= 0) {
      return
    }

    const current = (this.focusedIndex < 0 && step < 0) ? 0 : this.focusedIndex

    const next = (current + count + step) % count

    if (items[next] && items[next].focus) {
      items[next].focus()
    }
  }

  handleMenuItemMouseOver = (mouseOverItem) => {
    if (
      this._activeMenuItemFlyout &&
      mouseOverItem !== this._activeMenuItemFlyout._menuItemTrigger
    ) {
      this.hideActiveMenuItemFlyout()
    }
  }

  handleFlyoutToggle = (isShown, menuItemFlyout) => {
    if (isShown) {
      this._activeMenuItemFlyout = menuItemFlyout
    }
  }

  hideActiveMenuItemFlyout = () => {
    if (this._activeMenuItemFlyout) {
      this._activeMenuItemFlyout.setShow(false)
      this._activeMenuItemFlyout = null
    }
  }

  handleMenuRef = (node) => {
    this._node = node
  }

  renderChildren () {
    const {
      children,
      disabled,
      controls,
      onDismiss,
      labelledBy,
      title
    } = this.props

    this._menuitems = []

    let count = 0

    const items = Children.map(children, (child, index) => {
      if (!matchComponentTypes(child, [MenuItem, MenuItemGroup, MenuItemFlyout])) {
        return child
      }

      count += 1

      const ref = (node) => {
        if (node) {
          this._menuitems.push(node)
        }
      }

      const props = {
        controls: controls,
        ...child.props.controls, // child 'controls' prop should override parent
        disabled: (disabled || child.props.disabled),
        onFocus: createChainedFunction(this.handleItemFocus, this.props.onFocus),
        onBlur: createChainedFunction(this.handleItemBlur, this.props.onBlur),
        onSelect: this.props.onSelect,
        onMouseOver: this.handleMenuItemMouseOver
      }

      const isTabbable = !this.state.hasFocus && count === 1

      if (matchComponentTypes(child, [MenuItem])) {
        return (
          <li>
            {safeCloneElement(child, {
              ...props,
              tabIndex: isTabbable ? 0 : -1,
              ref,
              key: index
            })}
          </li>
        )
      }

      if (matchComponentTypes(child, [MenuItemFlyout])) {
        return (
          <li>
            {safeCloneElement(child, {
              ...props,
              tabIndex: isTabbable ? 0 : -1,
              onToggle: this.handleFlyoutToggle,
              onParentDismiss: onDismiss,
              labelledBy,
              title,
              ref,
              key: index
            })}
          </li>
        )
      }

      if (matchComponentTypes(child, [MenuItemGroup])) {
        return (
          <li>
            {safeCloneElement(child, {
              ...props,
              itemRef: ref,
              isTabbable,
              key: index
            })}
          </li>
        )
      }
    })

    return items
  }

  render () {
    const {
      labelledBy,
      hidden,
      disabled,
      controls,
      title,
      onKeyDown,
      onKeyUp
    } = this.props
    const props = omitProps(this.props, Menu.propTypes)

    return (
      <ul
        {...props}
        role="menu"
        tabIndex={this.state.hasFocus ? null : '0'}
        ref={this.handleMenuRef}
        className={styles.root}
        aria-hidden={hidden}
        aria-labelledby={labelledBy}
        aria-controls={controls}
        aria-expanded={!hidden}
        aria-disabled={disabled ? 'true' : null}
        title={title}
        onKeyDown={createChainedFunction(onKeyDown, this.handleKeyDown)}
        onKeyUp={createChainedFunction(onKeyUp, this.handleKeyUp)}
      >
        {this.renderChildren()}
      </ul>
    )
  }
}

export default Menu
export { default as MenuItem } from './MenuItem'
export { default as MenuItemGroup } from './MenuItemGroup'
export { default as MenuItemSeparator } from './MenuItemSeparator'
export { default as MenuItemFlyout } from './MenuItemFlyout'
