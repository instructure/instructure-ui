import React, { Children, Component, PropTypes } from 'react'
import CustomPropTypes from '../../util/CustomPropTypes'
import createChainedFunction from '../../util/createChainedFunction'
import safeCloneElement from '../../util/safeCloneElement'
import { omitProps } from '../../util/passthroughProps'
import keycode from 'keycode'

import findIndex from 'lodash/findIndex'

import MenuItem from './MenuItem'
import MenuItemSeparator from './MenuItemSeparator'

import themeable from '../../util/themeable'

import styles from './styles.css'
import theme from './theme.js'

/**
  The `<Menu/>` component provides a list of actionable
  `<MenuItems/>`that are keyboard accessible. A `<Menu/>`
  is typically used in a `<Popover/>`, so you may be looking for the [PopoverMenu](#PopoverMenu) component.

  ```jsx_example
  <Menu labelledBy="foobar"
    onSelect={function () { console.log('select') }}
    onClose={function () { console.log('close') }}
  >
    <MenuItem>Default (Grid view)</MenuItem>
    <MenuItem>Learning Mastery</MenuItem>
    <MenuItem disabled>Individual (List view)</MenuItem>
    <MenuItem type="radio" defaultChecked>
      Select me
    </MenuItem>
    <MenuItem type="radio">
      Or select me
    </MenuItem>
    <MenuItem type="checkbox" defaultChecked>
      Include Anchor Standards
    </MenuItem>
    <MenuItemSeparator />
    <MenuItem>Open grading history...</MenuItem>
  </Menu>
  ```
**/
@themeable(theme, styles)
class Menu extends Component {
  static propTypes = {
    /**
    * children of type `MenuItem`
    */
    children: CustomPropTypes.validChildren([MenuItem, MenuItemSeparator]),
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
    /**
    * should the first menu item receive focus?
    */
    focus: PropTypes.bool,
    /**
    * call this function when a menu item is selected
    */
    onSelect: PropTypes.func,
    /**
    * call this function when the menu item is closed (via ESC, TAB key or item selected)
    */
    onClose: PropTypes.func
  }

  static defaultProps = {
    focus: false,
    onClose: function () {}
  }

  constructor (props) {
    super(props)

    this.state = {
      needsFocus: props.focus
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

  focus () {
    this._menuitems[0] && this._menuitems[0].focus()
  }

  get focusedIndex () {
    return findIndex(this._menuitems, { focused: true })
  }

  moveFocus (step) {
    if (this._menuitems.length <= 0) {
      return
    }

    const count = this._menuitems.length
    const current = this.focusedIndex
    const next = (current + count + step) % count

    this._menuitems[next].focus()
  }

  renderChildren () {
    const {
      children,
      controls
    } = this.props

    this._menuitems = []

    const items = Children.map(children, (child) => {
      if (child.type === MenuItem) {
        const {
          onKeyDown,
          onSelect,
          ...childProps
        } = child.props

        return safeCloneElement(child, {
          controls: controls,
          ...childProps, // child 'controls' prop should override parent
          ref: (c) => {
            if (c) {
              this._menuitems.push(c)
            }
          },
          onKeyDown: createChainedFunction(onKeyDown, this.handleKeyDown),
          onSelect: createChainedFunction(onSelect, this.props.onSelect)
        })
      } else {
        return child
      }
    })

    return items
  }

  render () {
    const {
      labelledBy,
      hidden,
      controls,
      title
    } = this.props
    const props = omitProps(this.props, Menu.propTypes)

    return (
      <ul
        {...props}
        role="menu"
        className={styles.root}
        aria-hidden={hidden}
        aria-labelledby={labelledBy}
        aria-controls={controls}
        title={title}
        onKeyDown={this.handleKeyDown}
      >
        {this.renderChildren()}
      </ul>
    )
  }
}

export default Menu
export { default as MenuItem } from './MenuItem'
export { default as MenuItemSeparator } from './MenuItemSeparator'
