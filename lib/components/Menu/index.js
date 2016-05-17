import React, { Children, Component, PropTypes } from 'react'
import CustomPropTypes from '../../util/CustomPropTypes'
import createChainedFunction from '../../util/createChainedFunction'
import safeCloneElement from '../../util/safeCloneElement'
import keycode from 'keycode'

import MenuItem from './MenuItem'
import MenuItemSeparator from './MenuItemSeparator'

import styles from './Menu.css'
/**
  The `<Menu/>` component provides a list of actionable
  `<MenuItems/>`that are keyboard accessible. A `<Menu/>`
  is typically used in a `<Popover/>`, so you may be looking for the [PopoverMenu](#PopoverMenu) component.

  ```jsx_example
  <Menu focus labelledBy="foobar">
    <MenuItem><Link>Default (Grid view)</Link></MenuItem>
    <MenuItem><Link>Learning Mastery</Link></MenuItem>
    <MenuItem><Link disabled>Individual (List view)</Link></MenuItem>
    <MenuItem>
      <RadioInput value="foo" name="foobar"
        defaultChecked onChange={function (e) { console.log(e.target.value) }}
        label="Foo" />
    </MenuItem>
    <MenuItem>
      <RadioInput value="bar" name="foobar" label="Bar"/>
    </MenuItem>
    <MenuItem>
      <Checkbox value="anchor"
        defaultChecked onChange={function (e) { console.log(e.target.checked)  }}
        label="Include Anchor Standards" />
    </MenuItem>
    <MenuItemSeparator />
    <MenuItem><Link>Open grading history...</Link></MenuItem>
  </Menu>
  ```
**/
export default class Menu extends Component {
  static propTypes = {
    /**
    * children of type `MenuItem`
    */
    children: CustomPropTypes.validChildren([MenuItem, MenuItemSeparator]),
    labelledBy: PropTypes.string,
    isOpen: PropTypes.bool,
    focus: PropTypes.bool,
    onSelect: PropTypes.func,
    onClose: PropTypes.func
  };

  static defaultProps = {
    focus: false,
    onClose: function () {}
  };

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
        this.focusNext()
        event.preventDefault()
        break
      case keycode.codes.up:
        this.focusPrevious()
        event.preventDefault()
        break
      case keycode.codes.esc:
        this.props.onClose(event)
        break
      case keycode.codes.tab:
        this.props.onClose(event)
        break
      default:
    }
  }

  focus () {
    const items = this.getFocusableItems()
    if (items.length > 0) {
      items[0].focus()
    }
  }

  focusNext () {
    const activeItemIndex = this.getActiveItemIndex()
    const items = this.getFocusableItems()

    if (items.length === 0) {
      return
    }

    if (activeItemIndex === items.length - 1) {
      items[0].focus()
      return
    }

    items[activeItemIndex + 1].focus()
  }

  focusPrevious () {
    const activeItemIndex = this.getActiveItemIndex()
    const items = this.getFocusableItems()

    if (activeItemIndex === 0) {
      items[items.length - 1].focus()
      return
    }

    items[activeItemIndex - 1].focus()
  }

  getActiveItemIndex () {
    const items = this.getFocusableItems()
    let activeItemIndex = 0

    items.forEach((item, index) => {
      if (item.isFocused()) {
        activeItemIndex = index
      }
    })

    return activeItemIndex
  }

  getFocusableItems () {
    return this._menuitems.filter(function (item) {
      return (typeof item.focus === 'function' && typeof item.isFocused === 'function')
    })
  }

  renderChildren () {
    const {
      children
    } = this.props

    this._menuitems = []

    const items = Children.map(children, (child, index) => {
      if (child.type === MenuItem) {
        const {
          onKeyDown,
          onClick,
          ...childProps
        } = child.props

        return safeCloneElement(child, {
          ...childProps,
          ref: (c) => {
            this._menuitems[index] = c
          },
          onKeyDown: createChainedFunction(onKeyDown, this.handleKeyDown),
          onClick: createChainedFunction(onClick, this.props.onSelect)
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
      isOpen
    } = this.props
    return (
      <ul
        role="menu"
        tabIndex={0}
        className={styles.root}
        aria-hidden={isOpen}
        aria-labelledby={labelledBy}>
        {this.renderChildren()}
      </ul>
    )
  }
}

export { default as MenuItem } from './MenuItem'
export { default as MenuItemSeparator } from './MenuItemSeparator'
