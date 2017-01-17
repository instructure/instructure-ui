import React, { Children, PropTypes, Component } from 'react'
import CustomPropTypes from '../../util/CustomPropTypes'
import createChainedFunction from '../../util/createChainedFunction'
import safeCloneElement from '../../util/safeCloneElement'
import { omitProps } from '../../util/passthroughProps'
import matchComponentTypes from '../../util/matchComponentTypes'
import keycode from 'keycode'

import MenuItem from './MenuItem'
import MenuItemSeparator from './MenuItemSeparator'
import MenuItemGroup from './MenuItemGroup'

import themeable from '../../util/themeable'

import styles from './styles.css'
import theme from './theme.js'

/**
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
    <MenuItem type="toggle" value="bar">Toggle Me</MenuItem>
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
    <MenuItemSeparator />
    <MenuItem value="baz">Open grading history...</MenuItem>
  </Menu>
  ```
**/
@themeable(theme, styles)
class Menu extends Component {
  static propTypes = {
    /**
    * children of type `MenuItem`
    */
    children: CustomPropTypes.Children.oneOf([MenuItem, MenuItemSeparator, MenuItemGroup]),
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
    * should the first menu item receive focus?
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
    switch (event.keyCode) {
      case keycode.codes.down:
        this.moveFocus(1)
        event.preventDefault()
        break
      case keycode.codes.up:
        this.moveFocus(-1)
        event.preventDefault()
        break
      case keycode.codes.esc:
        this.props.onClose(event)
        break
      case keycode.codes.tab:
        this.props.onClose(event)
        break
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
    this._menuitems[0] && this._menuitems[0].focus()
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

    const current = this.focusedIndex

    const next = (current + count + step) % count

    if (items[next] && items[next].focus) {
      items[next].focus()
    }
  }

  renderChildren () {
    const {
      children,
      disabled,
      controls
    } = this.props

    this._menuitems = []

    let count = 0

    const items = Children.map(children, (child) => {
      if (!matchComponentTypes(child, [MenuItem, MenuItemGroup])) {
        return child
      }

      count++

      const {
        onSelect,
        onFocus,
        onBlur,
        ...childProps
      } = child.props

      const ref = (c) => {
        if (c) {
          this._menuitems.push(c)
        }
      }

      const props = {
        controls: controls,
        ...childProps, // child 'controls' prop should override parent
        disabled: (disabled || child.props.disabled),
        onFocus: createChainedFunction(onFocus, this.handleItemFocus, this.props.onFocus),
        onBlur: createChainedFunction(onBlur, this.handleItemBlur, this.props.onBlur),
        onSelect: createChainedFunction(onSelect, this.props.onSelect)
      }

      const isTabbable = !this.state.hasFocus && count === 1

      if (matchComponentTypes(child, [MenuItem])) {
        return safeCloneElement(child, {
          ...props,
          tabIndex: isTabbable ? 0 : -1,
          ref
        })
      } if (matchComponentTypes(child, [MenuItemGroup])) {
        return safeCloneElement(child, {
          ...props,
          itemRef: ref,
          isTabbable
        })
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
      <div
        {...props}
        role="menu"
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
      </div>
    )
  }
}

export default Menu
export { default as MenuItem } from './MenuItem'
export { default as MenuItemGroup } from './MenuItemGroup'
export { default as MenuItemSeparator } from './MenuItemSeparator'
