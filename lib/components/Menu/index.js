import React, { Children, Component } from 'react'
import PropTypes from 'prop-types'
import keycode from 'keycode'
import CustomPropTypes from '../../util/CustomPropTypes'
import createChainedFunction from '../../util/createChainedFunction'
import safeCloneElement from '../../util/safeCloneElement'
import { omitProps } from '../../util/passthroughProps'
import matchComponentTypes from '../../util/matchComponentTypes'
import isActiveElement from '../../util/dom/isActiveElement'

import MenuItem from './MenuItem'
import MenuItemFlyout from './MenuItemFlyout'
import MenuItemGroup from './MenuItemGroup'
import MenuItemSeparator from './MenuItemSeparator'

import themeable from '../../themeable'

import styles from './styles.css'
import theme from './theme'

/**
---
category: navigation
---
  The `<Menu/>` component provides a list of actionable
  `<MenuItems/>`that are keyboard accessible. A `<Menu/>`
  is typically used in a `<Popover/>`, so you may be looking for the [PopoverMenu](#PopoverMenu) component.

  ```jsx_example
  <Menu labelledBy="foobar"
    onSelect={function () { console.log(arguments) }}
    onClose={function () { console.log(arguments) }}
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
    children: CustomPropTypes.Children.oneOf([MenuItem, MenuItemSeparator, MenuItemGroup, MenuItemFlyout]),
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
    * should the menu receive focus?
    */
    focus: PropTypes.bool,
    /**
    * call this function when a menu item is selected (note: value argument will default to the index)
    */
    onSelect: PropTypes.func,
    /**
    * call this function when the menu item is closed (via ESC, TAB key or item selected)
    */
    onClose: PropTypes.func,
    onKeyDown: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func
  }
  /* eslint-enable react/require-default-props */

  static defaultProps = {
    disabled: false,
    focus: false,
    onKeyDown: function (e) {},
    onClose: function (e) {},
    onFocus: function (e) {},
    onBlur: function (e) {},
    onSelect: function (e, value, selected) {}
  }

  constructor (props) {
    super(props)

    this.state = {
      needsFocus: props.focus,
      hasFocus: false
    }

    this._menuitems = []
  }

  componentDidMount () {
    this.focusIfNeeded()
  }

  componentWillUnmount () {
    delete this._activeMenuItemFlyout
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.focus !== this.props.focus) {
      this.setState({ needsFocus: nextProps.focus })
    }
  }

  componentDidUpdate () {
    this.focusIfNeeded()
  }

  focusIfNeeded () {
    if (this.state.needsFocus) {
      this.state.needsFocus = false // avoid setState here so we don't trigger a re-render
      this.focus()
    }
  }

  handleKeyDown = (event) => {
    const key = event.keyCode
    const {
      down,
      up,
      esc,
      tab,
      pgup,
      pgdn
    } = keycode.codes

    if ([down, pgdn].includes(key)) {
      this.moveFocus(1)
      event.preventDefault()
      event.stopPropagation()
      this.hideActiveMenuItemFlyout()
    } else if ([up, pgup].includes(key)) {
      this.moveFocus(-1)
      event.preventDefault()
      event.stopPropagation()
      this.hideActiveMenuItemFlyout()
    } else if ([esc, tab].includes(key)) {
      this.props.onClose(event)
    }
  }

  handleItemFocus = () => {
    this.setState({
      hasFocus: true
    })
  }

  handleItemBlur = () => {
    this.setState({
      hasFocus: this.focusedIndex >= 0
    })
  }

  focus () {
    this._node && this._node.focus()
  }

  focused () {
    return isActiveElement(this._node)
  }

  get focusedIndex () {
    return this._menuitems.findIndex((item) => { return item.focused === true })
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
    if (this._activeMenuItemFlyout &&
        mouseOverItem !== this._activeMenuItemFlyout._menuItemTrigger) {
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

  renderChildren () {
    const {
      children,
      disabled,
      controls,
      onClose,
      labelledBy,
      title
    } = this.props

    this._menuitems = []

    let count = 0

    const items = Children.map(children, (child, index) => {
      if (!matchComponentTypes(child, [MenuItem, MenuItemGroup, MenuItemFlyout])) {
        return child
      }

      count++

      const ref = (c) => {
        if (c) {
          this._menuitems.push(c)
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
        return (<li> {
          safeCloneElement(child, {
            ...props,
            tabIndex: isTabbable ? 0 : -1,
            ref,
            key: index
          })
        } </li>)
      }

      if (matchComponentTypes(child, [MenuItemFlyout])) {
        return (<li> {
          safeCloneElement(child, {
            ...props,
            tabIndex: isTabbable ? 0 : -1,
            onToggle: this.handleFlyoutToggle,
            onParentClose: onClose,
            labelledBy,
            title,
            ref,
            key: index
          })
        } </li>)
      }

      if (matchComponentTypes(child, [MenuItemGroup])) {
        return (<li> {
          safeCloneElement(child, {
            ...props,
            itemRef: ref,
            isTabbable,
            key: index
          })
        } </li>)
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
      onKeyDown
    } = this.props
    const props = omitProps(this.props, Menu.propTypes)

    return (
      <ul
        {...props}
        role="menu"
        tabIndex={this.state.hasFocus ? null : '0'}
        ref={(c) => { this._node = c }}
        className={styles.root}
        aria-hidden={hidden}
        aria-labelledby={labelledBy}
        aria-controls={controls}
        aria-expanded={!hidden}
        aria-disabled={disabled ? 'true' : null}
        title={title}
        onKeyDown={createChainedFunction(onKeyDown, this.handleKeyDown)}
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
